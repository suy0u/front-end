import api from "./axiosInstance";
import type {
  AuthResponse,
  RegisterResponse,
  SyncAuthRequest,
} from "../types/auth";
import { withCatch } from "./withCatch";

export const login = (email: string, password: string): Promise<AuthResponse> =>
  withCatch<AuthResponse>(
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
): Promise<AuthResponse> =>
  withCatch<AuthResponse>(
    api.post("/api/auth/sync", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    "syncAuth"
  );
