import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import type { RetryableRequest } from "../types/common";
import api from "./axiosInstance";
import { logout, setTokens } from "../store/slices/authSlice";
import { addRequestToQueue, processQueue } from "./requestQueue";

let isRefreshing = false;

export const createTokenRefresher = (store: Store<RootState>) => {
  return async (originalRequest: RetryableRequest) => {
    const refreshToken = store.getState().auth.refreshToken;

    if (!refreshToken) {
      store.dispatch(logout());
      window.location.href = "/login";
      return Promise.reject("No refresh token");
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        addRequestToQueue(resolve, reject);
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      });
    }

    isRefreshing = true;

    try {
      const res = await api.post("/api/auth/refresh", null, {
        params: { refresh_token: refreshToken },
      });

      const { access_token, refresh_token } = res.data;

      store.dispatch(
        setTokens({ access: access_token, refresh: refresh_token })
      );
      processQueue(null, access_token);

      originalRequest.headers.Authorization = `Bearer ${access_token}`;
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      store.dispatch(logout());
      window.location.href = "/login";
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  };
};
