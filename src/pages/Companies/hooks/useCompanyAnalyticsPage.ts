import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getCompanyUserQuizScoresWeeklyThunk,
  getCompanyUsersLastAttemptsThunk,
} from "../../../store/thunks/analyticsThunks";
import type { DateRangeParams } from "../../../types/analytics";
import type { MyCompany } from "../../../types/company";

export function useCompanyAnalyticsPage(
  companyId: string | null,
  userId: string | null,
  dateRange: DateRangeParams | null,
  myMembership: MyCompany | null
) {
  const dispatch = useAppDispatch();

  const { companyUserWeekly, companyLastAttempts, loading, error } =
    useAppSelector((s) => s.analytics);

  useEffect(() => {
    if (!companyId || !userId || !dateRange || !myMembership) return;

    dispatch(
      getCompanyUserQuizScoresWeeklyThunk({
        companyId,
        userId,
        params: dateRange,
      })
    );
  }, [dispatch, companyId, userId, dateRange, myMembership]);

  useEffect(() => {
    if (!companyId) return;
    if (!myMembership) return;

    dispatch(getCompanyUsersLastAttemptsThunk({ companyId }));
  }, [dispatch, companyId, myMembership]);

  return {
    userQuizScores: companyUserWeekly,
    companyLastAttempts,
    loading,
    error,
  };
}
