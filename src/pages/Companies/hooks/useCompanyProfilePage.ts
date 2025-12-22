import { useEffect, useMemo, useState, useCallback } from "react";
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
import { listQuizzesThunk } from "../../../store/thunks/quizThunks";

import type { LeaveCompanyState, CompanyRole } from "../../../types/membership";
import type { MyCompany } from "../../../types/company";
import type { ListModalType } from "../../../types/common";
import type { User } from "../../../types/user";
import type { DateRangeParams } from "../../../types/analytics";
import { useCompanyAnalyticsPage } from "./useCompanyAnalyticsPage";

const ROLE: Record<CompanyRole, CompanyRole> = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
};

export function useCompanyProfilePage(id?: string) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { company, loading, error } = useAppSelector((s) => s.companies);
  const authUser = useAppSelector((s) => s.auth.user);
  const myCompanies = useAppSelector((s) => s.membership.myCompanies);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [companyToLeave, setCompanyToLeave] = useState<LeaveCompanyState>(null);
  const [listModal, setListModal] = useState<ListModalType>(null);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [dateRange, setDateRange] = useState<DateRangeParams>({
    preset: "week",
  });

  const selectedUserId = useMemo(
    () => selectedUsers[0]?.id ?? null,
    [selectedUsers]
  );
  const companyId = useMemo(() => company?.id ?? null, [company]);

  const {
    userQuizScores,
    companyLastAttempts,
    loading: analyticsLoading,
  } = useCompanyAnalyticsPage(
    companyId ?? null,
    selectedUserId ?? null,
    dateRange
  );

  useEffect(() => {
    if (!id) return;

    dispatch(fetchCompanyById(id));
    dispatch(fetchMyCompanies());
    dispatch(fetchMyRequests({ page: 1, size: 10 }));
    dispatch(fetchMyInvitations({ page: 1, size: 10 }));
    dispatch(listQuizzesThunk({ companyId: id }));

    return () => {
      dispatch(clearCompany());
    };
  }, [dispatch, id]);

  const myMembership: MyCompany | undefined = useMemo(
    () => myCompanies.find((c) => c.company_id === id),
    [myCompanies, id]
  );

  const role = myMembership?.role;
  const isOwner = authUser?.id === company?.owner_id;
  const canLeave = Boolean(myMembership && !isOwner);

  const isAdmin = role === ROLE.ADMIN;
  const canViewQuizzes = Boolean(myMembership);

  const canManageQuizzes = isOwner || isAdmin;

  const confirmLeaveCompany = async () => {
    if (!companyToLeave) return;

    await dispatch(leaveCompanyThunk(companyToLeave.company_id)).unwrap();

    setCompanyToLeave(null);
    navigate("/companies");
  };

  const onQuizCreated = useCallback(() => {
    if (!id) return;
    dispatch(listQuizzesThunk({ companyId: id }));
    setIsCreateQuizOpen(false);
  }, [dispatch, id]);

  return {
    company,
    loading,
    error,

    isAdmin,
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
    listModal,

    actions: {
      setSelectedUsers,
      setDateRange,
      setIsEditModalOpen,
      setIsDeleteModalOpen,
      setIsCreateQuizOpen,
      setCompanyToLeave,
      confirmLeaveCompany,
      onQuizCreated,
      setListModal,
    },
  };
}
