import api from "./axiosInstance";
import type {
  LoginResponse,
  RegisterResponse,
  SyncAuthRequest,
  SyncAuthResponse,
} from "../types/auth";
import { withCatch } from "./withCatch";

export const login = (
  email: string,
  password: string
): Promise<LoginResponse> =>
  withCatch<LoginResponse>(
    api.post("/api/auth/login", null, {
      params: { email, password },
    }),
    "login"
  );

export const registerUser = (
  email: string,
  password: string,
  username: string
): Promise<RegisterResponse> =>
  withCatch<RegisterResponse>(
    api.post("/api/users/", {
      email,
      password,
      username,
    }),
    "registerUser"
  );

export const syncAuth = (
  data: SyncAuthRequest,
  token: string
): Promise<SyncAuthResponse> =>
  withCatch<SyncAuthResponse>(
    api.post("/api/auth/sync", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    "syncAuth"
  );
