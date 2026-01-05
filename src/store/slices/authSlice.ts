import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../../types/user";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  redirectAfterLogin: string | null;
}

const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: Boolean(localStorage.getItem("token")),
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
        user?: AuthUser;
      }>
    ) => {
      state.token = action.payload.access;
      state.refreshToken = action.payload.refresh ?? null;
      state.user = action.payload.user ?? null;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.access);

      if (action.payload.refresh) {
        localStorage.setItem("refreshToken", action.payload.refresh);
      }

      if (action.payload.user) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },

    setUser: (state, action: PayloadAction<AuthUser>) => {
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

      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setTokens, setUser, logout, setRedirect, clearRedirect } =
  authSlice.actions;

export default authSlice.reducer;
