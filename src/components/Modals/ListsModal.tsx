import AppModal from "./AppModal";
import type { ListModalType } from "../../types/common";

import { CompanyMembersList } from "../CompanyPages/CompanyMembersList";
import { CompanyInvitationsList } from "../CompanyPages/CompanyInvitationsList";
import { CompanyRequestsList } from "../CompanyPages/CompanyRequestsList";

import UserCompaniesSection from "../UserPages/UserCompaniesSection";
import { UserInvitationsList } from "../UserPages/UserInvitationsList";
import { UserRequestsList } from "../UserPages/UserRequestsList";

import type { MembershipState } from "../../store/slices/membershipSlice";
import type { MyCompany } from "../../types/company";
import { CompanyQuizzesList } from "../CompanyPages/CompanyQuizzesList";

interface Props {
  open: boolean;
  type: ListModalType;

  companyId?: string;
  isOwner?: boolean;

  membership?: MembershipState;
  onLeaveClick?: (company: MyCompany) => void;

  onClose: () => void;
}

export default function ListsModal({
  open,
  type,
  companyId,
  isOwner,
  membership,
  onLeaveClick,
  onClose,
}: Props) {
  if (!type) return null;

  const titleMap: Record<Exclude<ListModalType, null>, string> = {
    company_members: "Company members",
    company_invitations: "Company invitations",
    company_requests: "Company requests",
    user_companies: "My companies",
    user_invitations: "My invitations",
    user_requests: "My requests",
    company_quizzes: "Company Quizzes",
  };

  return (
    <AppModal open={open} title={titleMap[type]} onClose={onClose}>
      {type === "company_members" && companyId && (
        <CompanyMembersList companyId={companyId} isOwner={!!isOwner} />
      )}

      {type === "company_invitations" && companyId && (
        <CompanyInvitationsList companyId={companyId} />
      )}

      {type === "company_requests" && companyId && (
        <CompanyRequestsList companyId={companyId} />
      )}

      {type === "user_companies" && membership && onLeaveClick && (
        <UserCompaniesSection
          membership={membership}
          onLeaveClick={onLeaveClick}
        />
      )}

      {type === "user_invitations" && <UserInvitationsList />}

      {type === "user_requests" && <UserRequestsList />}

      {type === "company_quizzes" && companyId && (
        <CompanyQuizzesList companyId={companyId} canManage={isOwner} />
      )}
    </AppModal>
  );
}
