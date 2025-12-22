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

import { EditCompanyModal } from "../../components/Modals/EditCompanyModal";
import { DeleteCompanyModal } from "../../components/Modals/DeleteCompanyModal";
import LeaveCompanyModal from "../../components/Modals/LeaveCompanyModal";
import CreateQuizModal from "../../components/Modals/Quiz/CreateQuizModal";
import ListsModal from "../../components/Modals/ListsModal";

import { useCompanyProfilePage } from "./hooks/useCompanyProfilePage";

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

    isEditModalOpen,
    isDeleteModalOpen,
    isCreateQuizOpen,
    companyToLeave,
    listModal,

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
                onClick={() => actions.setListModal("company_quizzes")}
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
                  onClick={() => actions.setListModal("company_members")}
                >
                  Members
                </Button>

                <Button
                  size="sm"
                  variant="blue"
                  onClick={() => actions.setListModal("company_invitations")}
                >
                  Invitations
                </Button>

                <Button
                  size="sm"
                  variant="blue"
                  onClick={() => actions.setListModal("company_requests")}
                >
                  Requests
                </Button>
              </Stack>
            )}
          </Stack>
        </ManageCard>
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
      <ListsModal
        open={!!listModal}
        type={listModal}
        companyId={company.id}
        isOwner={canManageQuizzes}
        onClose={() => actions.setListModal(null)}
      />

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
