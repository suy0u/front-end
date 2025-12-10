import axios from "axios";
import { store } from "../store/store";
import { logout } from "../store/slices/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    if (status === 401) {
      if (url === "/api/auth/login") {
        return Promise.reject(error);
      }

      store.dispatch(logout());
      window.location.href = "/login";
    }

    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
