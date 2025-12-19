import { createAsyncThunk } from "@reduxjs/toolkit";
import * as quizApi from "../../api/quiz";

import type {
  Quiz,
  CreateQuizPayload,
  UpdateQuizPayload,
  SubmitQuizPayload,
  QuizSubmission,
  QuizStat,
  QuizDetails,
} from "../../types/quiz";

export const createQuizThunk = createAsyncThunk<
  Quiz,
  { companyId: string; payload: CreateQuizPayload },
  { rejectValue: string }
>("quiz/create", async ({ companyId, payload }, thunkAPI) => {
  try {
    return await quizApi.createQuiz(companyId, payload);
  } catch {
    return thunkAPI.rejectWithValue("Failed to create quiz");
  }
});

export const listQuizzesThunk = createAsyncThunk<
  { items: Quiz[]; total: number; page: number; size: number },
  { companyId: string },
  { rejectValue: string }
>("quiz/list", async ({ companyId }, thunkAPI) => {
  try {
    return await quizApi.listQuizzes(companyId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load quizzes");
  }
});

export const getQuizThunk = createAsyncThunk<
  QuizDetails,
  { quizId: string; companyId: string },
  { rejectValue: string }
>("quiz/get", async ({ quizId, companyId }, thunkAPI) => {
  try {
    return await quizApi.getQuiz(quizId, companyId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load quiz");
  }
});

export const updateQuizThunk = createAsyncThunk<
  QuizDetails,
  { quizId: string; companyId: string; payload: UpdateQuizPayload },
  { rejectValue: string }
>("quiz/update", async ({ quizId, companyId, payload }, thunkAPI) => {
  try {
    return await quizApi.updateQuiz(quizId, companyId, payload);
  } catch {
    return thunkAPI.rejectWithValue("Failed to update quiz");
  }
});

export const deleteQuizThunk = createAsyncThunk<
  void,
  { quizId: string; companyId: string },
  { rejectValue: string }
>("quiz/delete", async ({ quizId, companyId }, thunkAPI) => {
  try {
    await quizApi.deleteQuiz(quizId, companyId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete quiz");
  }
});

export const submitQuizThunk = createAsyncThunk<
  QuizSubmission,
  { quizId: string; companyId: string; payload: SubmitQuizPayload },
  { rejectValue: string }
>("quiz/submit", async ({ quizId, companyId, payload }, thunkAPI) => {
  try {
    return await quizApi.submitQuiz(quizId, companyId, payload);
  } catch {
    return thunkAPI.rejectWithValue("Failed to submit quiz");
  }
});

export const getMyQuizStatsThunk = createAsyncThunk<
  QuizStat[],
  void,
  { rejectValue: string }
>("quiz/myStats", async (_, thunkAPI) => {
  try {
    return await quizApi.getMyQuizStats();
  } catch {
    return thunkAPI.rejectWithValue("Failed to load quiz stats");
  }
});

export const getMyQuizSubmissionsThunk = createAsyncThunk<
  QuizSubmission[],
  { quizId: string },
  { rejectValue: string }
>("quiz/mySubmissions", async ({ quizId }, thunkAPI) => {
  try {
    return await quizApi.getMyQuizSubmissions(quizId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load submissions");
  }
});

export const getCompanyQuizSubmissionsThunk = createAsyncThunk<
  QuizSubmission[],
  { quizId: string },
  { rejectValue: string }
>("quiz/companySubmissions", async ({ quizId }, thunkAPI) => {
  try {
    return await quizApi.getCompanyQuizSubmissions(quizId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load company submissions");
  }
});
