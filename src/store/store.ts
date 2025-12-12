import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/userSlice.ts";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
