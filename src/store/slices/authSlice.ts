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
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
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
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setUser, logout, setRedirect, clearRedirect } =
  authSlice.actions;
export default authSlice.reducer;
