import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import NotFoundPage from "../NotFoundPage";

import UserProfileHeader from "../../components/UserPages/UserProfileHeader";
import UserAnalyticsSection from "../../components/UserPages/UserAnalyticsSection";
import { ManageCard } from "../../components/Cards/ManageCard";

import DeleteAccountModal from "../../components/Modals/Users/DeleteAccountModal";
import LeaveCompanyModal from "../../components/Modals/LeaveCompanyModal";
import ListsModal from "../../components/Modals/ListsModal";

import { useUserProfilePage } from "./hooks/useUserProfilePage";
import { useUserProfileAnalytics } from "./hooks/useUserProfileAnalytics";

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
    listModal,

    actions,
  } = useUserProfilePage(id);

  const { myLastCompletions } = useUserProfileAnalytics(isSelf);

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
        <>
          <ManageCard>
            <Stack direction="row" spacing={5} alignItems="flex-start">
              <Stack spacing={1} alignItems="flex-start">
                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  Management
                </Typography>

                <Button
                  size="sm"
                  variant="blue"
                  onClick={() => actions.setListModal("user_companies")}
                >
                  My Companies
                </Button>

                <Button
                  size="sm"
                  variant="blue"
                  onClick={() => actions.setListModal("user_invitations")}
                >
                  Invitations
                </Button>

                <Button
                  size="sm"
                  variant="blue"
                  onClick={() => actions.setListModal("user_requests")}
                >
                  Requests
                </Button>
              </Stack>
            </Stack>
          </ManageCard>

          <Box sx={{ mt: 6 }}>
            <UserAnalyticsSection myLastAttempts={myLastCompletions} />
          </Box>
        </>
      )}

      <ListsModal
        open={!!listModal}
        type={listModal}
        membership={membership}
        onLeaveClick={actions.setCompanyToLeave}
        onClose={() => actions.setListModal(null)}
      />

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
