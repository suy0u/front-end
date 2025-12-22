import {
  createSlice,
  isPending,
  isFulfilled,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import type {
  Quiz,
  QuizSubmission,
  QuizStat,
  QuizDetails,
} from "../../types/quiz";

import {
  createQuizThunk,
  listQuizzesThunk,
  getQuizThunk,
  updateQuizThunk,
  deleteQuizThunk,
  submitQuizThunk,
  getMyQuizStatsThunk,
  getMyQuizSubmissionsThunk,
  getCompanyQuizSubmissionsThunk,
} from "../thunks/quizThunks";

export interface QuizState {
  quizzes: Quiz[];
  currentQuiz: QuizDetails | null;

  myStats: QuizStat[];
  mySubmissions: QuizSubmission[];
  companySubmissions: QuizSubmission[];

  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  currentQuiz: null,

  myStats: [],
  mySubmissions: [],
  companySubmissions: [],

  loading: false,
  error: null,
};

const quizThunks = [
  createQuizThunk,
  listQuizzesThunk,
  getQuizThunk,
  updateQuizThunk,
  deleteQuizThunk,
  submitQuizThunk,
  getMyQuizStatsThunk,
  getMyQuizSubmissionsThunk,
  getCompanyQuizSubmissionsThunk,
] as const;

const quizSlice = createSlice({
  name: "quiz",
  initialState,

  reducers: {
    clearCurrentQuiz(state) {
      state.currentQuiz = null;
    },

    clearQuizState(state) {
      state.quizzes = [];
      state.currentQuiz = null;
      state.myStats = [];
      state.mySubmissions = [];
      state.companySubmissions = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(listQuizzesThunk.fulfilled, (state, action) => {
        state.quizzes = action.payload.items;
      })

      .addCase(getQuizThunk.fulfilled, (state, action) => {
        state.currentQuiz = action.payload;
      })

      .addCase(createQuizThunk.fulfilled, (state, action) => {
        state.quizzes.unshift(action.payload);
      })

      .addCase(updateQuizThunk.fulfilled, (state, action) => {
        state.currentQuiz = action.payload;

        state.quizzes = state.quizzes.map((q) =>
          q.id === action.payload.id
            ? {
                ...q,
                title: action.payload.title,
                description: action.payload.description,
                is_active: action.payload.is_active,
              }
            : q
        );
      })

      .addCase(deleteQuizThunk.fulfilled, (state) => {
        state.currentQuiz = null;
      })

      .addCase(getMyQuizStatsThunk.fulfilled, (state, action) => {
        state.myStats = action.payload;
      })

      .addCase(getMyQuizSubmissionsThunk.fulfilled, (state, action) => {
        state.mySubmissions = action.payload;
      })

      .addCase(getCompanyQuizSubmissionsThunk.fulfilled, (state, action) => {
        state.companySubmissions = action.payload;
      })

      .addMatcher(isPending(...quizThunks), (state) => {
        state.loading = true;
        state.error = null;
      })

      .addMatcher(isFulfilled(...quizThunks), (state) => {
        state.loading = false;
      })

      .addMatcher(isRejectedWithValue(...quizThunks), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentQuiz, clearQuizState } = quizSlice.actions;
export default quizSlice.reducer;
