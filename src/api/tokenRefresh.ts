import api from "./axiosInstance";
import { store } from "../store/store";
import { logout, setTokens } from "../store/slices/authSlice";
import { addRequestToQueue, processQueue } from "./requestQueue";
import type { InternalAxiosRequestConfig } from "axios";

let isRefreshing = false;

export interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const handleTokenRefresh = async (originalRequest: RetryableRequest) => {
  const refreshToken = store.getState().auth.refreshToken;

  if (!refreshToken) {
    store.dispatch(logout());
    window.location.href = "/login";
    return Promise.reject("No refresh token");
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      addRequestToQueue(resolve, reject);
    }).then((newToken) => {
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    });
  }

  isRefreshing = true;
  originalRequest._retry = true;

  try {
    const res = await api.post("/api/auth/refresh", {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token } = res.data;

    store.dispatch(setTokens({ access: access_token, refresh: refresh_token }));

    processQueue(null, access_token);
    isRefreshing = false;

    originalRequest.headers.Authorization = `Bearer ${access_token}`;
    return api(originalRequest);
  } catch (err) {
    processQueue(err, null);
    isRefreshing = false;

    store.dispatch(logout());
    window.location.href = "/login";
    return Promise.reject(err);
  }
};
