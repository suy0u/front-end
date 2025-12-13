import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/userSlice.ts";
import companiesReducer from "./slices/companySlice.ts";
import membershipReducer from "./slices/membershipSlice.ts";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authReducer,
    users: usersReducer,
    companies: companiesReducer,
    membership: membershipReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
