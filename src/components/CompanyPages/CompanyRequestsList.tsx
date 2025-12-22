import { useEffect, useState, useCallback } from "react";
import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DataCard } from "../Cards/DataCard";
import { ListSection } from "../Common/ListSection";
import { ListPagination } from "../Common/ListPagination";
import { ConfirmModal } from "../Modals/ConfirmModal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchCompanyRequests,
  acceptCompanyRequestThunk,
  declineCompanyRequestThunk,
} from "../../store/thunks/membershipThunks";

import type { CompanyJoinRequest } from "../../types/membership";
import type { MembershipStatus } from "../../types/membership";

const PAGE_SIZE = 10;

interface Props {
  companyId: string;
}

type ConfirmAction = "accept" | "decline";

interface ConfirmState {
  request: CompanyJoinRequest;
  action: ConfirmAction;
}

const STATUS: Record<MembershipStatus, MembershipStatus> = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  CANCELED: "CANCELED",
};

export function CompanyRequestsList({ companyId }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { companyRequests, loading, total } = useAppSelector(
    (s) => s.membership
  );

  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);

  const fetchRequests = useCallback(() => {
    dispatch(fetchCompanyRequests({ companyId, page, size: PAGE_SIZE }));
  }, [dispatch, companyId, page]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const actionText: Record<
    ConfirmAction,
    { title: string; confirm: string; buttonVariant: "green" | "orange" }
  > = {
    accept: {
      title: t("request.accept"),
      confirm: t("request.accept_confirm"),
      buttonVariant: "green",
    },
    decline: {
      title: t("request.reject"),
      confirm: t("request.reject_confirm"),
      buttonVariant: "orange",
    },
  };

  const actionHandlers: Record<
    ConfirmAction,
    (req: CompanyJoinRequest) => Promise<void>
  > = {
    accept: (req) => dispatch(acceptCompanyRequestThunk(req.id)).unwrap(),
    decline: (req) => dispatch(declineCompanyRequestThunk(req.id)).unwrap(),
  };

  const handleConfirm = async () => {
    if (!confirm) return;

    await actionHandlers[confirm.action](confirm.request);
    setConfirm(null);
    fetchRequests();
  };

  return (
    <>
      <ListSection
        loading={loading}
        empty={companyRequests.length === 0}
        emptyText={t("errors.not_found")}
      >
        {companyRequests.map((req) => (
          <DataCard
            key={req.id}
            title={req.user_email}
            subtitle={req.status}
            right={
              req.status === STATUS.PENDING && (
                <Stack direction="row" spacing={1}>
                  <Button
                    size="sm"
                    variant="green"
                    onClick={() =>
                      setConfirm({ request: req, action: "accept" })
                    }
                  >
                    {t("actions.accept")}
                  </Button>

                  <Button
                    size="sm"
                    variant="orange"
                    onClick={() =>
                      setConfirm({ request: req, action: "decline" })
                    }
                  >
                    {t("actions.reject")}
                  </Button>
                </Stack>
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
          title={actionText[confirm.action].title}
          confirmText={t("actions.confirm")}
          cancelText={t("actions.cancel")}
          confirmVariant={actionText[confirm.action].buttonVariant}
          onConfirm={handleConfirm}
          onClose={() => setConfirm(null)}
        >
          {actionText[confirm.action].confirm}
        </ConfirmModal>
      )}
    </>
  );
}
