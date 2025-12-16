import api from "./axiosInstance";
import type {
  LoginResponse,
  RegisterResponse,
  SyncAuthRequest,
  SyncAuthResponse,
} from "../types/auth";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/api/auth/login", null, {
    params: { email, password },
  });
  return res.data;
};

export const registerUser = async (
  email: string,
  password: string,
  username: string
): Promise<RegisterResponse> => {
  const res = await api.post<RegisterResponse>("/api/users/", {
    email,
    password,
    username,
  });
  return res.data;
};

export const syncAuth = async (
  data: SyncAuthRequest,
  token: string
): Promise<SyncAuthResponse> => {
  const res = await api.post<SyncAuthResponse>("/api/auth/sync", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
