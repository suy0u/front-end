import { useEffect, useState, useCallback, useMemo } from "react";
import { Button, Stack, Typography, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";

import { DataCard } from "../Cards/DataCard";
import { ListSection } from "../Common/ListSection";
import { ListPagination } from "../Common/ListPagination";
import { ConfirmModal } from "../Modals/ConfirmModal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchCompanyMembers,
  removeCompanyMemberThunk,
  promoteToAdminThunk,
  demoteAdminThunk,
} from "../../store/thunks/membershipThunks";

import type { CompanyMember, CompanyRole } from "../../types/membership";
import { getRoleVariant } from "../../utils/companyChips";

const PAGE_SIZE = 10;

interface Props {
  companyId: string;
  isOwner: boolean;
}

const ROLE: Record<CompanyRole, CompanyRole> = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
};

type ConfirmAction = "delete" | "promote" | "demote";

interface ConfirmState {
  member: CompanyMember;
  action: ConfirmAction;
}

export function CompanyMembersList({ companyId, isOwner }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { companyMembers, loading, total } = useAppSelector(
    (s) => s.membership
  );

  const [page, setPage] = useState(1);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);
  const [roleFilter, setRoleFilter] = useState<CompanyRole | "ALL">("ALL");

  const fetchMembers = useCallback(() => {
    dispatch(fetchCompanyMembers({ companyId, page, size: PAGE_SIZE }));
  }, [dispatch, companyId, page]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const membershipActionText: Record<
    ConfirmAction,
    { title: string; confirm: string }
  > = {
    delete: {
      title: t("membership.delete"),
      confirm: t("membership.delete_confirm"),
    },
    promote: {
      title: t("membership.promote"),
      confirm: t("membership.promote_confirm"),
    },
    demote: {
      title: t("membership.demote"),
      confirm: t("membership.demote_confirm"),
    },
  };

  const actionHandlers: Record<
    ConfirmAction,
    (m: CompanyMember) => Promise<CompanyMember | void>
  > = {
    delete: (m) =>
      dispatch(
        removeCompanyMemberThunk({
          companyId,
          userId: m.user_id,
        })
      ).unwrap(),

    promote: (m) =>
      dispatch(
        promoteToAdminThunk({
          companyId,
          memberUserId: m.user_id,
        })
      ).unwrap(),

    demote: (m) =>
      dispatch(
        demoteAdminThunk({
          companyId,
          memberUserId: m.user_id,
        })
      ).unwrap(),
  };

  const handleConfirm = async () => {
    if (!confirm) return;

    await actionHandlers[confirm.action](confirm.member);
    setConfirm(null);
    fetchMembers();
  };

  const filteredMembers = useMemo(() => {
    if (roleFilter === "ALL") return companyMembers;
    return companyMembers.filter((m) => m.role === roleFilter);
  }, [companyMembers, roleFilter]);

  return (
    <>
      <Stack sx={{ mt: 6 }} direction="row" spacing={3}>
        <Chip
          size="md"
          label={t("membership.role.all")}
          variant="roleMember"
          clickable
          onClick={() => setRoleFilter("ALL")}
        />
        <Chip
          size="md"
          label={t("membership.role.admins")}
          variant="roleAdmin"
          clickable
          onClick={() => setRoleFilter(ROLE.ADMIN)}
        />
      </Stack>

      <ListSection
        loading={loading}
        empty={filteredMembers.length === 0}
        emptyText={t("errors.not_found")}
      >
        {filteredMembers.map((m) => (
          <DataCard
            key={m.user_id}
            title={
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ fontWeight: 600 }}>{m.username}</Typography>
                <Chip
                  size="sm"
                  label={m.role}
                  variant={getRoleVariant(m.role)}
                />
              </Stack>
            }
            subtitle={m.email}
            right={
              isOwner &&
              m.role !== ROLE.OWNER && (
                <Stack direction="row" spacing={1}>
                  {m.role === ROLE.MEMBER && (
                    <Button
                      size="sm"
                      variant="green"
                      onClick={() =>
                        setConfirm({ member: m, action: "promote" })
                      }
                    >
                      {t("actions.promote")}
                    </Button>
                  )}

                  {m.role === ROLE.ADMIN && (
                    <Button
                      size="sm"
                      variant="yellow"
                      onClick={() =>
                        setConfirm({ member: m, action: "demote" })
                      }
                    >
                      {t("actions.demote")}
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="orange"
                    onClick={() => setConfirm({ member: m, action: "delete" })}
                  >
                    {t("actions.remove")}
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
          title={membershipActionText[confirm.action].title}
          confirmText={t("actions.confirm")}
          cancelText={t("actions.cancel")}
          onConfirm={handleConfirm}
          onClose={() => setConfirm(null)}
        >
          {membershipActionText[confirm.action].confirm}
        </ConfirmModal>
      )}
    </>
  );
}
