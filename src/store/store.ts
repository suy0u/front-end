import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/userSlice.ts";
import companiesReducer from "./slices/companySlice.ts";
import membershipReducer from "./slices/membershipSlice.ts";
import quizReducer from "./slices/quizSlice.ts";
import analyticsReducer from "./slices/analyticsSlice.ts";
import exportReducer from "./slices/exportSlice.ts";
import notificationsReducer from "./slices/notificationsSlice.ts";
import uiReducer from "./slices/uiSlice.ts";
import toastReducer from "./slices/toastSlice.ts";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
    users: usersReducer,
    companies: companiesReducer,
    membership: membershipReducer,
    quiz: quizReducer,
    analytics: analyticsReducer,
    export: exportReducer,
    notifications: notificationsReducer,
    ui: uiReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
