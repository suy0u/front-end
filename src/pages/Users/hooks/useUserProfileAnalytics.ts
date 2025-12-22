import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { getMyLastQuizCompletionsThunk } from "../../../store/thunks/analyticsThunks";

export function useUserProfileAnalytics(isSelf: boolean) {
  const dispatch = useAppDispatch();

  const { myLastCompletions, loading, error } = useAppSelector(
    (s) => s.analytics
  );

  useEffect(() => {
    if (isSelf) {
      dispatch(getMyLastQuizCompletionsThunk());
    }
  }, [dispatch, isSelf]);

  return {
    myLastCompletions,
    loading,
    error,
  };
}
