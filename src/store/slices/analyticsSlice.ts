import {
  createSlice,
  isPending,
  isFulfilled,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import type {
  GlobalQuizRating,
  MyQuizAverage,
  CompanyMemberWeeklyScore,
  CompanyUserWeeklyQuizScore,
  CompanyUserLastAttempt,
  MyLastQuizCompletion,
} from "../../types/analytics";
import {
  getMyGlobalQuizRatingThunk,
  getMyQuizAveragesThunk,
  getCompanyMembersScoresWeeklyThunk,
  getCompanyUserQuizScoresWeeklyThunk,
  getCompanyUsersLastAttemptsThunk,
  getMyLastQuizCompletionsThunk,
} from "../thunks/analyticsThunks";

interface AnalyticsState {
  globalRating: GlobalQuizRating | null;
  myQuizAverages: MyQuizAverage[];

  companyMembersWeekly: CompanyMemberWeeklyScore[];
  companyUserWeekly: CompanyUserWeeklyQuizScore[];
  companyLastAttempts: CompanyUserLastAttempt[];

  myLastCompletions: MyLastQuizCompletion[];

  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  globalRating: null,
  myQuizAverages: [],

  companyMembersWeekly: [],
  companyUserWeekly: [],
  companyLastAttempts: [],

  myLastCompletions: [],

  loading: false,
  error: null,
};

const analyticsThunks = [
  getMyGlobalQuizRatingThunk,
  getMyQuizAveragesThunk,
  getCompanyMembersScoresWeeklyThunk,
  getCompanyUserQuizScoresWeeklyThunk,
  getCompanyUsersLastAttemptsThunk,
  getMyLastQuizCompletionsThunk,
] as const;

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyGlobalQuizRatingThunk.fulfilled, (s, a) => {
        s.globalRating = a.payload;
      })
      .addCase(getMyQuizAveragesThunk.fulfilled, (s, a) => {
        s.myQuizAverages = a.payload;
      })
      .addCase(getCompanyMembersScoresWeeklyThunk.fulfilled, (s, a) => {
        s.companyMembersWeekly = a.payload;
      })
      .addCase(getCompanyUserQuizScoresWeeklyThunk.fulfilled, (s, a) => {
        s.companyUserWeekly = a.payload;
      })
      .addCase(getCompanyUsersLastAttemptsThunk.fulfilled, (s, a) => {
        s.companyLastAttempts = a.payload;
      })
      .addCase(getMyLastQuizCompletionsThunk.fulfilled, (s, a) => {
        s.myLastCompletions = a.payload;
      })

      .addMatcher(isPending(...analyticsThunks), (s) => {
        s.loading = true;
        s.error = null;
      })
      .addMatcher(isFulfilled(...analyticsThunks), (s) => {
        s.loading = false;
      })
      .addMatcher(isRejectedWithValue(...analyticsThunks), (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      });
  },
});

export default analyticsSlice.reducer;
