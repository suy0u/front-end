import { Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NotFoundPage from "../NotFoundPage";

import UserProfileHeader from "../../components/UserPages/UserProfileHeader";
import UserCompaniesSection from "../../components/UserPages/UserCompaniesSection";
import { UserInvitationsList } from "../../components/UserPages/UserInvitationsList";
import { UserRequestsList } from "../../components/UserPages/UserRequestsList";

import DeleteAccountModal from "../../components/Modals/Users/DeleteAccountModal";
import LeaveCompanyModal from "../../components/Modals/LeaveCompanyModal";

import { useUserProfilePage } from "./hooks/useUserProfilePage";

export default function UserProfilePage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const {
    user,
    loading,
    error,
    membership,
    isSelf,

    editMode,
    editData,
    isDeleteModalOpen,
    companyToLeave,

    actions,
  } = useUserProfilePage(id);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !user) {
    return <NotFoundPage message={t("errors.page_not_found")} />;
  }

  return (
    <Box sx={{ py: 6 }}>
      <UserProfileHeader
        user={user}
        isSelf={isSelf}
        editMode={editMode}
        editData={editData}
        onEdit={actions.startEdit}
        onSave={actions.saveProfile}
        onCancel={() => actions.setEditMode(false)}
        onDelete={() => actions.setIsDeleteModalOpen(true)}
        onAvatarUpload={actions.uploadAvatar}
        onChange={actions.setEditData}
      />

      {isSelf && (
        <Box sx={{ mt: 6 }}>
          <UserCompaniesSection
            membership={membership}
            onLeaveClick={actions.setCompanyToLeave}
          />

          <UserInvitationsList />
          <UserRequestsList />
        </Box>
      )}

      <DeleteAccountModal
        open={isDeleteModalOpen}
        onClose={() => actions.setIsDeleteModalOpen(false)}
        onConfirm={actions.deleteAccount}
      />

      <LeaveCompanyModal
        company={companyToLeave}
        onClose={() => actions.setCompanyToLeave(null)}
        onConfirm={actions.leaveSelectedCompany}
      />
    </Box>
  );
}
