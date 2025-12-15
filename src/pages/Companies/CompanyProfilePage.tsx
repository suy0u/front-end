import { Box, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PageCard } from "../../components/Cards/PageCard";
import CompanyHeader from "../../components/CompanyPages/CompanyHeader";
import CompanyDescription from "../../components/CompanyPages/CompanyDescription";
import { CompanyMembersList } from "../../components/CompanyPages/CompanyMembersList";
import { CompanyInvitationsList } from "../../components/CompanyPages/CompanyInvitationsList";
import { CompanyRequestsList } from "../../components/CompanyPages/CompanyRequestsList";

import { EditCompanyModal } from "../../components/Modals/EditCompanyModal";
import { DeleteCompanyModal } from "../../components/Modals/DeleteCompanyModal";
import LeaveCompanyModal from "../../components/Modals/LeaveCompanyModal";

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

    isEditModalOpen,
    isDeleteModalOpen,
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

      {isOwner && (
        <>
          <CompanyMembersList companyId={company.id} isOwner={isOwner} />
          <CompanyInvitationsList companyId={company.id} />
          <CompanyRequestsList companyId={company.id} />
        </>
      )}

      {isOwner && (
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
