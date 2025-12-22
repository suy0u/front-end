import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DataCard } from "../Cards/DataCard";
import { ListSection } from "../Common/ListSection";
import { ListPagination } from "../Common/ListPagination";
import { ConfirmModal } from "../Modals/ConfirmModal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchMyInvitations,
  acceptInvitationThunk,
  declineInvitationThunk,
} from "../../store/thunks/membershipThunks";

import type { CompanyInvitation } from "../../types/membership";

interface ConfirmActionState {
  invitation: CompanyInvitation;
  action: "accept" | "decline";
}

export function UserInvitationsList() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { myInvitations, loading, page, size, total } = useAppSelector(
    (s) => s.membership
  );

  const [confirmAction, setConfirmAction] = useState<ConfirmActionState | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchMyInvitations({ page: 1, size }));
  }, [dispatch, size]);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchMyInvitations({ page: newPage, size }));
  };

  const handleConfirm = async () => {
    if (!confirmAction) return;

    const { invitation, action } = confirmAction;

    if (action === "accept") {
      await dispatch(acceptInvitationThunk(invitation.id)).unwrap();
    } else {
      await dispatch(declineInvitationThunk(invitation.id)).unwrap();
    }

    setConfirmAction(null);
    dispatch(fetchMyInvitations({ page, size }));
  };

  return (
    <>
      <ListSection
        loading={loading}
        empty={myInvitations.length === 0}
        emptyText={t("errors.not_found")}
      >
        {myInvitations.map((invitation) => (
          <DataCard
            key={invitation.id}
            title={invitation.company_name}
            subtitle={`ID: ${invitation.company_id}`}
            to={`/companies/${invitation.company_id}`}
            right={
              <Stack direction="row" spacing={1}>
                <Button
                  size="sm"
                  variant="green"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmAction({
                      invitation,
                      action: "accept",
                    });
                  }}
                >
                  {t("actions.accept")}
                </Button>

                <Button
                  size="sm"
                  variant="orange"
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmAction({
                      invitation,
                      action: "decline",
                    });
                  }}
                >
                  {t("actions.decline")}
                </Button>
              </Stack>
            }
          />
        ))}
      </ListSection>

      <ListPagination
        page={page}
        total={total}
        limit={size}
        onChange={handlePageChange}
      />

      {confirmAction && (
        <ConfirmModal
          open
          title={
            confirmAction.action === "accept"
              ? t("invitation.accept")
              : t("invitation.decline")
          }
          confirmText={t("actions.confirm")}
          cancelText={t("actions.cancel")}
          confirmVariant={
            confirmAction.action === "accept" ? "green" : "orange"
          }
          onConfirm={handleConfirm}
          onClose={() => setConfirmAction(null)}
        >
          {confirmAction.action === "accept"
            ? t("invitation.accept_confirm")
            : t("invitation.decline_confirm")}
        </ConfirmModal>
      )}
    </>
  );
}
