import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: unknown | null;
  redirectAfterLogin: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: null,
  redirectAfterLogin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{
        access: string;
        refresh?: string | null;
        user?: unknown;
      }>
    ) => {
      state.token = action.payload.access;
      state.refreshToken = action.payload.refresh ?? null;
      state.user = action.payload.user ?? null;

      localStorage.setItem("token", action.payload.access);

      if (action.payload.refresh) {
        localStorage.setItem("refreshToken", action.payload.refresh);
      }

      if (action.payload.user) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },

    setUser: (state, action: PayloadAction<unknown>) => {
      state.user = action.payload;
    },

    setRedirect: (state, action: PayloadAction<string | null>) => {
      state.redirectAfterLogin = action.payload;
    },

    clearRedirect: (state) => {
      state.redirectAfterLogin = null;
    },

    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setTokens, setUser, logout, setRedirect, clearRedirect } =
  authSlice.actions;

export default authSlice.reducer;
