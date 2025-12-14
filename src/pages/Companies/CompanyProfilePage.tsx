import { Box, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { PageCard } from "../../components/Cards/PageCard";
import { EditCompanyModal } from "../../components/Modals/EditCompanyModal";
import { DeleteCompanyModal } from "../../components/Modals/DeleteCompanyModal";
import LeaveCompanyModal from "../../components/Modals/LeaveCompanyModal";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearCompany } from "../../store/slices/companySlice";
import { fetchCompanyById } from "../../store/thunks/companyThunks";
import { leaveCompanyThunk } from "../../store/thunks/membershipThunks";

import CompanyHeader from "../../components/CompanyPages/CompanyHeader";
import CompanyDescription from "../../components/CompanyPages/CompanyDescription";

import type { MyCompany, LeaveCompanyState } from "../../types/company";

export default function CompanyProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { company, loading, error } = useAppSelector(
    (state) => state.companies
  );
  const authUser = useAppSelector((state) => state.auth.user);
  const myCompanies = useAppSelector((state) => state.membership.myCompanies);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [leaveCompany, setLeaveCompany] = useState<LeaveCompanyState>(null);

  useEffect(() => {
    if (id) dispatch(fetchCompanyById(id));
    return () => {
      dispatch(clearCompany());
    };
  }, [dispatch, id]);

  const myMembership: MyCompany | undefined = useMemo(
    () => myCompanies.find((c) => c.company_id === id),
    [myCompanies, id]
  );

  const isOwner = authUser?.id === company?.owner_id;
  const canLeave = Boolean(myMembership && !isOwner);

  const handleLeaveConfirm = async () => {
    if (!leaveCompany) return;
    await dispatch(leaveCompanyThunk(leaveCompany.company_id)).unwrap();
    setLeaveCompany(null);
  };

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
          onEdit={() => setEditOpen(true)}
          onDelete={() => setDeleteOpen(true)}
          onLeave={() => setLeaveCompany(myMembership!)}
        />

        <CompanyDescription description={company.description} />
      </PageCard>

      {isOwner && (
        <>
          <EditCompanyModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            company={company}
          />
          <DeleteCompanyModal
            open={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            companyId={company.id}
          />
        </>
      )}

      {canLeave && (
        <LeaveCompanyModal
          company={leaveCompany}
          onClose={() => setLeaveCompany(null)}
          onConfirm={handleLeaveConfirm}
        />
      )}
    </Box>
  );
}
