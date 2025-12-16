import api from "./axiosInstance";
import { withCatch } from "./withCatch";

export const checkApp = () =>
  withCatch(api.get("/api/healthcheck"), "checkApp");
export const checkRedis = () => withCatch(api.get("/api/ping"), "checkRedis");
export const checkDb = () => withCatch(api.get("/api/db"), "checkDb");
