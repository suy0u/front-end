import {
  Box,
  Typography,
  CircularProgress,
  Stack,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PageCard } from "../../components/Cards/PageCard";
import { ManageCard } from "../../components/Cards/ManageCard";
import CompanyHeader from "../../components/CompanyPages/CompanyHeader";
import CompanyDescription from "../../components/CompanyPages/CompanyDescription";
import CompanyAnalyticsCard from "../../components/CompanyPages/CompanyAnalyticsSection";

import { EditCompanyModal } from "../../components/Modals/EditCompanyModal";
import { DeleteCompanyModal } from "../../components/Modals/DeleteCompanyModal";
import LeaveCompanyModal from "../../components/Modals/LeaveCompanyModal";
import CreateQuizModal from "../../components/Modals/Quiz/CreateQuizModal";

import { useCompanyProfilePage } from "./hooks/useCompanyProfilePage";
import { ListModal } from "../../types/common";

export default function CompanyProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const {
    company,
    loading,
    error,

    isOwner,
    canLeave,
    myMembership,

    canViewQuizzes,
    canManageQuizzes,

    selectedUsers,
    userQuizScores,
    analyticsLoading,

    dateRange,
    companyLastAttempts,

    isEditModalOpen,
    isDeleteModalOpen,
    isCreateQuizOpen,
    companyToLeave,

    actions,
  } = useCompanyProfilePage(id);

  if (loading) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !company) {
    return (
      <Typography sx={{ py: 6, textAlign: "center" }}>
        {t("app.not_found")}
      </Typography>
    );
  }

  return (
    <Box sx={{ py: 6 }}>
      <PageCard>
        <CompanyHeader
          company={company}
          isOwner={isOwner}
          canLeave={canLeave}
          onEdit={() => actions.setIsEditModalOpen(true)}
          onDelete={() => actions.setIsDeleteModalOpen(true)}
          onLeave={() => actions.setCompanyToLeave(myMembership!)}
        />

        <CompanyDescription description={company.description} />
      </PageCard>
      {canViewQuizzes && (
        <ManageCard>
          <Stack direction="row" spacing={5} alignItems="flex-start">
            <Stack spacing={1} alignItems="flex-start">
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                Quizzes
              </Typography>

              {canManageQuizzes && (
                <Button
                  size="sm"
                  variant="mint"
                  onClick={() => actions.setIsCreateQuizOpen(true)}
                >
                  {t("actions.create")}
                </Button>
              )}

              <Button
                size="sm"
                variant="mint"
                onClick={() => actions.openListModal(ListModal.CompanyQuizzes)}
              >
                {t("quiz.list")}
              </Button>
            </Stack>

            {isOwner && (
              <Stack spacing={1} alignItems="flex-start">
                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  Lists
                </Typography>

                <Button
                  size="sm"
                  variant="blue"
                  onClick={() =>
                    actions.openListModal(ListModal.CompanyMembers)
                  }
                >
                  Members
                </Button>

                <Button
                  size="sm"
                  variant="blue"
                  onClick={() =>
                    actions.openListModal(ListModal.CompanyInvitations)
                  }
                >
                  Invitations
                </Button>

                <Button
                  size="sm"
                  variant="blue"
                  onClick={() =>
                    actions.openListModal(ListModal.CompanyRequests)
                  }
                >
                  Requests
                </Button>
              </Stack>
            )}
          </Stack>
        </ManageCard>
      )}

      {canManageQuizzes && (
        <CompanyAnalyticsCard
          companyId={company.id}
          selectedUsers={selectedUsers}
          userQuizScores={userQuizScores}
          loading={analyticsLoading}
          onUsersChange={actions.setSelectedUsers}
          dateRange={dateRange}
          onDateRangeChange={actions.setDateRange}
          companyLastAttempts={companyLastAttempts}
        />
      )}
      {canManageQuizzes && (
        <>
          <EditCompanyModal
            open={isEditModalOpen}
            onClose={() => actions.setIsEditModalOpen(false)}
            company={company}
          />
          <DeleteCompanyModal
            open={isDeleteModalOpen}
            onClose={() => actions.setIsDeleteModalOpen(false)}
            companyId={company.id}
          />
          <CreateQuizModal
            open={isCreateQuizOpen}
            companyId={company.id}
            onClose={() => actions.setIsCreateQuizOpen(false)}
            onSuccess={actions.onQuizCreated}
          />
        </>
      )}

      {canLeave && (
        <LeaveCompanyModal
          company={companyToLeave}
          onClose={() => actions.setCompanyToLeave(null)}
          onConfirm={actions.confirmLeaveCompany}
        />
      )}
    </Box>
  );
}
