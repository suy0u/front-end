import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import api from "./axiosInstance";
import { createTokenRefresher } from "./tokenRefresh";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

export const setupInterceptors = (store: Store<RootState>) => {
  const handleTokenRefresh = createTokenRefresher(store);

  api.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      if (!error.config) {
        return Promise.reject(error);
      }

      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      const status = error.response?.status;

      if (
        status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url?.includes("/api/auth/login")
      ) {
        originalRequest._retry = true;
        return handleTokenRefresh(originalRequest);
      }

      return Promise.reject(error);
    }
  );
};
