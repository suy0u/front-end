import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DataCard } from "../Cards/DataCard";
import { ListSection } from "../Common/ListSection";
import { ListPagination } from "../Common/ListPagination";
import { ConfirmModal } from "../Modals/ConfirmModal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchMyRequests,
  cancelMyRequestThunk,
} from "../../store/thunks/membershipThunks";

import type { CompanyJoinRequest } from "../../types/membership";

interface ConfirmCancelState {
  request: CompanyJoinRequest;
}

export function UserRequestsList() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { myRequests, loading, page, size, total } = useAppSelector(
    (s) => s.membership
  );

  const [confirmCancel, setConfirmCancel] = useState<ConfirmCancelState | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchMyRequests({ page: 1, size }));
  }, [dispatch, size]);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchMyRequests({ page: newPage, size }));
  };

  const handleConfirmCancel = async () => {
    if (!confirmCancel) return;

    await dispatch(cancelMyRequestThunk(confirmCancel.request.id)).unwrap();

    setConfirmCancel(null);
    dispatch(fetchMyRequests({ page, size }));
  };

  return (
    <>
      <ListSection
        title={`${t("common.my")} ${t("request.requests")}`}
        loading={loading}
        empty={myRequests.length === 0}
        emptyText={t("errors.not_found")}
      >
        {myRequests.map((request) => (
          <DataCard
            key={request.id}
            title={request.company_name}
            to={`/companies/${request.company_id}`}
            right={
              <Button
                size="sm"
                variant="orange"
                onClick={(e) => {
                  e.preventDefault();
                  setConfirmCancel({ request });
                }}
              >
                {t("actions.cancel")}
              </Button>
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

      {confirmCancel && (
        <ConfirmModal
          open
          title={t("request.cancel")}
          confirmText={t("actions.confirm")}
          cancelText={t("actions.cancel")}
          onConfirm={handleConfirmCancel}
          onClose={() => setConfirmCancel(null)}
        >
          {t("request.cancel_confirm", {
            name: confirmCancel.request.company_name,
          })}
        </ConfirmModal>
      )}
    </>
  );
}
