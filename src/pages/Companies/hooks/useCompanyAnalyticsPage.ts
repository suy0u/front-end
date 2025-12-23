import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getCompanyUserQuizScoresWeeklyThunk,
  getCompanyUsersLastAttemptsThunk,
} from "../../../store/thunks/analyticsThunks";
import type { DateRangeParams } from "../../../types/analytics";

export function useCompanyAnalyticsPage(
  companyId: string | null,
  userId: string | null,
  dateRange: DateRangeParams | null
) {
  const dispatch = useAppDispatch();

  const { companyUserWeekly, companyLastAttempts, loading, error } =
    useAppSelector((s) => s.analytics);

  useEffect(() => {
    if (!companyId || !userId || !dateRange) return;

    dispatch(
      getCompanyUserQuizScoresWeeklyThunk({
        companyId,
        userId,
        params: dateRange,
      })
    );
  }, [dispatch, companyId, userId, dateRange]);

  useEffect(() => {
    if (!companyId) return;

    dispatch(getCompanyUsersLastAttemptsThunk({ companyId }));
  }, [dispatch, companyId]);

  return {
    userQuizScores: companyUserWeekly,
    companyLastAttempts,
    loading,
    error,
  };
}
