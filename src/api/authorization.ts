import api from "./axiosInstance";
import type { LoginResponse, RegisterResponse } from "../types/auth";

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
