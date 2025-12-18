import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { clearCompany } from "../../../store/slices/companySlice";
import { fetchCompanyById } from "../../../store/thunks/companyThunks";
import {
  fetchMyCompanies,
  leaveCompanyThunk,
  fetchMyRequests,
  fetchMyInvitations,
} from "../../../store/thunks/membershipThunks";

import type { LeaveCompanyState } from "../../../types/membership";
import type { MyCompany } from "../../../types/company";

export function useCompanyProfilePage(id?: string) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { company, loading, error } = useAppSelector((s) => s.companies);
  const authUser = useAppSelector((s) => s.auth.user);
  const myCompanies = useAppSelector((s) => s.membership.myCompanies);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [companyToLeave, setCompanyToLeave] = useState<LeaveCompanyState>(null);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchCompanyById(id));
    dispatch(fetchMyCompanies());
    dispatch(fetchMyRequests({ page: 1, size: 10 }));
    dispatch(fetchMyInvitations({ page: 1, size: 10 }));

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

  const confirmLeaveCompany = async () => {
    if (!companyToLeave) return;

    await dispatch(leaveCompanyThunk(companyToLeave.company_id)).unwrap();

    setCompanyToLeave(null);
    navigate("/companies");
  };

  return {
    company,
    loading,
    error,

    isOwner,
    canLeave,
    myMembership,

    isEditModalOpen,
    isDeleteModalOpen,
    companyToLeave,

    actions: {
      setIsEditModalOpen,
      setIsDeleteModalOpen,
      setCompanyToLeave,
      confirmLeaveCompany,
    },
  };
}
