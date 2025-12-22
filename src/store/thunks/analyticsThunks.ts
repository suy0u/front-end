import { createAsyncThunk } from "@reduxjs/toolkit";
import * as analyticsApi from "../../api/analytics";
import type {
  GlobalQuizRating,
  MyQuizAverage,
  CompanyMemberWeeklyScore,
  CompanyUserWeeklyQuizScore,
  CompanyUserLastAttempt,
  DateRangeParams,
  MyLastQuizCompletion,
} from "../../types/analytics";

export const getMyGlobalQuizRatingThunk = createAsyncThunk<
  GlobalQuizRating,
  void,
  { rejectValue: string }
>("analytics/myGlobal", async (_, thunkAPI) => {
  try {
    return await analyticsApi.getMyGlobalQuizRating();
  } catch {
    return thunkAPI.rejectWithValue("Failed to load global rating");
  }
});

export const getMyQuizAveragesThunk = createAsyncThunk<
  MyQuizAverage[],
  DateRangeParams | undefined,
  { rejectValue: string }
>("analytics/myQuizzes", async (params, thunkAPI) => {
  try {
    return await analyticsApi.getMyQuizAverages(params);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load quiz averages");
  }
});

export const getCompanyMembersScoresWeeklyThunk = createAsyncThunk<
  CompanyMemberWeeklyScore[],
  { companyId: string; params?: DateRangeParams },
  { rejectValue: string }
>("analytics/companyMembersWeekly", async ({ companyId, params }, thunkAPI) => {
  try {
    return await analyticsApi.getCompanyMembersScoresWeekly(companyId, params);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load members scores");
  }
});

export const getCompanyUserQuizScoresWeeklyThunk = createAsyncThunk<
  CompanyUserWeeklyQuizScore[],
  { companyId: string; userId: string; params?: DateRangeParams },
  { rejectValue: string }
>(
  "analytics/companyUserWeekly",
  async ({ companyId, userId, params }, thunkAPI) => {
    try {
      return await analyticsApi.getCompanyUserQuizScoresWeekly(
        companyId,
        userId,
        params
      );
    } catch {
      return thunkAPI.rejectWithValue("Failed to load user quiz scores");
    }
  }
);

export const getCompanyUsersLastAttemptsThunk = createAsyncThunk<
  CompanyUserLastAttempt[],
  { companyId: string },
  { rejectValue: string }
>("analytics/companyLastAttempts", async ({ companyId }, thunkAPI) => {
  try {
    return await analyticsApi.getCompanyUsersLastAttempts(companyId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load last attempts");
  }
});

export const getMyLastQuizCompletionsThunk = createAsyncThunk<
  MyLastQuizCompletion[],
  void,
  { rejectValue: string }
>("analytics/myLastCompletions", async (_, thunkAPI) => {
  try {
    return await analyticsApi.getMyLastQuizCompletions();
  } catch {
    return thunkAPI.rejectWithValue("Failed to load last quiz completions");
  }
});
