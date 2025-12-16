import { useState } from "react";
import { Stack, Button, Tooltip, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  fetchCompanyInvitations,
  fetchMyRequests,
} from "../../store/thunks/membershipThunks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import InviteUserModal from "../../components/Modals/InviteUserModal";
import RequestJoinModal from "../../components/Modals/RequestJoinModal";
import type { Company } from "../../types/company";
import { canRequestJoin } from "../../utils/canRequestJoin";
import type { MembershipStatus } from "../../types/membership";
interface Props {
  isOwner: boolean;
  canLeave: boolean;
  company: Company;
  myMembership?: unknown;
  onEdit: () => void;
  onDelete: () => void;
  onLeave: () => void;
}
const STATUS: Record<MembershipStatus, MembershipStatus> = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  CANCELED: "CANCELED",
};

export default function CompanyActions({
  isOwner,
  company,
  canLeave,
  onEdit,
  onDelete,
  onLeave,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { myInvitations, myRequests, myCompanies } = useAppSelector(
    (s) => s.membership
  );
  const [inviteOpen, setInviteOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  const hasPendingRequest = myRequests.some(
    (r) => r.company_id === company.id && r.status === STATUS.PENDING
  );

  const hasInvitation = myInvitations.some((i) => i.company_id === company.id);

  const myMembership = myCompanies.find((c) => c.company_id === company.id);

  const canRequest = canRequestJoin({
    isOwner,
    myMembership,
    hasPendingRequest,
    hasInvitation,
  });
  const shouldShowJoinButton = !isOwner && !myMembership;

  console.log({
    isOwner,
    myMembership,
    hasPendingRequest,
    hasInvitation,
    myRequests,
  });
  return (
    <Stack direction="row" spacing={1}>
      {isOwner && (
        <>
          <Button size="sm" variant="purple" onClick={onEdit}>
            {t("actions.edit")}
          </Button>
          <Button size="sm" variant="orange" onClick={onDelete}>
            {t("actions.delete")}
          </Button>
          <Button size="sm" variant="green" onClick={() => setInviteOpen(true)}>
            {t("actions.invite")}
          </Button>
        </>
      )}

      {canLeave && (
        <Button size="sm" variant="orange" onClick={onLeave}>
          {t("actions.leave")}
        </Button>
      )}
      {shouldShowJoinButton && (
        <Tooltip
          title={
            hasPendingRequest
              ? t("request.already_sent")
              : hasInvitation
              ? t("invitation.exists")
              : ""
          }
          disableHoverListener={canRequest}
        >
          <Box component="span">
            <Button
              size="sm"
              variant="green"
              disabled={!canRequest}
              onClick={() => setRequestOpen(true)}
            >
              {hasPendingRequest
                ? t("request.pending")
                : hasInvitation
                ? t("invitation.invited")
                : t("actions.join")}
            </Button>
          </Box>
        </Tooltip>
      )}

      <InviteUserModal
        open={inviteOpen}
        companyId={company.id}
        onClose={() => setInviteOpen(false)}
        onSuccess={() =>
          dispatch(fetchCompanyInvitations({ companyId: company.id }))
        }
      />
      <RequestJoinModal
        open={requestOpen}
        companyId={company.id}
        onClose={() => setRequestOpen(false)}
        onSuccess={() => {
          dispatch(fetchMyRequests({ page: 1, size: 20 }));
        }}
      />
    </Stack>
  );
}
