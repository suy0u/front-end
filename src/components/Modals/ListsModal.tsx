import AppModal from "./AppModal";
import type { ListModalType } from "../../types/common";

import { CompanyMembersList } from "../CompanyPages/CompanyMembersList";
import { CompanyInvitationsList } from "../CompanyPages/CompanyInvitationsList";
import { CompanyRequestsList } from "../CompanyPages/CompanyRequestsList";

import UserCompaniesSection from "../UserPages/UserCompaniesSection";
import { UserInvitationsList } from "../UserPages/UserInvitationsList";
import { UserRequestsList } from "../UserPages/UserRequestsList";

import { CompanyQuizzesList } from "../CompanyPages/CompanyQuizzesList";

import { NotificationsList } from "../Notifications/NotificationsList";

import { ListModal } from "../../types/common";
interface Props {
  open: boolean;
  type: ListModalType | null;

  companyId?: string;
  isOwner?: boolean;

  onClose: () => void;
}

export default function ListsModal({
  open,
  type,
  companyId,
  isOwner,
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
    notifications: "Notifications",
  };

  return (
    <AppModal open={open} title={titleMap[type]} onClose={onClose}>
      {type === ListModal.CompanyMembers && companyId && (
        <CompanyMembersList companyId={companyId} isOwner={!!isOwner} />
      )}

      {type === ListModal.CompanyInvitations && companyId && (
        <CompanyInvitationsList companyId={companyId} />
      )}

      {type === ListModal.CompanyRequests && companyId && (
        <CompanyRequestsList companyId={companyId} />
      )}

      {type === ListModal.UserCompanies && <UserCompaniesSection />}

      {type === ListModal.UserInvitations && <UserInvitationsList />}

      {type === ListModal.UserRequests && <UserRequestsList />}

      {type === ListModal.CompanyQuizzes && companyId && (
        <CompanyQuizzesList companyId={companyId} canManage={isOwner} />
      )}

      {type === ListModal.Notifications && <NotificationsList />}
    </AppModal>
  );
}
