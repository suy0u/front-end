import axios, { AxiosError } from "axios";
import { store } from "../store/store";
import { handleTokenRefresh } from "./tokenRefresh";
import type { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (!error.config) {
      return Promise.reject(error);
    }
    const originalRequest: InternalAxiosRequestConfig = error.config;
    const status = error.response?.status;

    if (status === 401 && originalRequest?.url !== "/api/auth/login") {
      return handleTokenRefresh(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
