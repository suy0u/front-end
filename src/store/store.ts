import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/userSlice.ts";
import companiesReducer from "./slices/companySlice.ts";
import membershipReducer from "./slices/membershipSlice.ts";
import quizReducer from "./slices/quizSlice.ts";
import analyticsReducer from "./slices/analyticsSlice.ts";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
    users: usersReducer,
    companies: companiesReducer,
    membership: membershipReducer,
    quiz: quizReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
