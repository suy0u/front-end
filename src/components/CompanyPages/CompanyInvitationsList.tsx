import { useEffect, useState, useCallback } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DataCard } from "../Cards/DataCard";
import { ListSection } from "../Common/ListSection";
import { ListPagination } from "../Common/ListPagination";
import { ConfirmModal } from "../Modals/ConfirmModal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchCompanyInvitations,
  cancelCompanyInvitationThunk,
} from "../../store/thunks/membershipThunks";

import type {
  CompanyInvitation,
  MembershipStatus,
} from "../../types/membership";

const PAGE_SIZE = 10;

interface Props {
  companyId: string;
}

type ConfirmAction = "cancel";

interface ConfirmState {
  invitation: CompanyInvitation;
  action: ConfirmAction;
}

const STATUS: Record<MembershipStatus, MembershipStatus> = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  CANCELED: "CANCELED",
};

export function CompanyInvitationsList({ companyId }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { companyInvitations, loading, total } = useAppSelector(
    (s) => s.membership
  );

  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);

  const fetchInvitations = useCallback(() => {
    dispatch(fetchCompanyInvitations({ companyId, page, size: PAGE_SIZE }));
  }, [dispatch, companyId, page]);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  const actionHandlers: Record<
    ConfirmAction,
    (inv: CompanyInvitation) => Promise<void>
  > = {
    cancel: (inv) => dispatch(cancelCompanyInvitationThunk(inv.id)).unwrap(),
  };

  const handleConfirm = async () => {
    if (!confirm) return;

    await actionHandlers[confirm.action](confirm.invitation);
    setConfirm(null);
    fetchInvitations();
  };

  return (
    <>
      <ListSection
        title={t("invitation.proposed_invitations")}
        loading={loading}
        empty={companyInvitations.length === 0}
        emptyText={t("errors.not_found")}
      >
        {companyInvitations.map((inv) => (
          <DataCard
            key={inv.id}
            title={inv.invited_user_email}
            subtitle={inv.status}
            right={
              inv.status === STATUS.PENDING && (
                <Button
                  size="sm"
                  variant="orange"
                  onClick={() =>
                    setConfirm({ invitation: inv, action: "cancel" })
                  }
                >
                  {t("actions.cancel")}
                </Button>
              )
            }
          />
        ))}
      </ListSection>

      <ListPagination
        page={page}
        total={total}
        limit={PAGE_SIZE}
        onChange={setPage}
      />

      {confirm && (
        <ConfirmModal
          open
          title={t("invitation.cancel")}
          confirmText={t("actions.confirm")}
          cancelText={t("actions.cancel")}
          onConfirm={handleConfirm}
          onClose={() => setConfirm(null)}
        >
          {t("invitation.cancel_confirm")}
        </ConfirmModal>
      )}
    </>
  );
}
