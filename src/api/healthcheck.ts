import api from "./axiosInstance";

export const checkApp = () => api.get("/api/healthcheck").then((r) => r.data);
export const checkRedis = () => api.get("/api/ping").then((r) => r.data);
export const checkDb = () => api.get("/api/db").then((r) => r.data);
