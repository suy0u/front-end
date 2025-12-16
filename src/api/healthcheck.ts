import api from "./axiosInstance";

const withCatch = <T>(
  promise: Promise<{ data: T }>,
  label: string
): Promise<T> =>
  promise
    .then((r) => r.data)
    .catch((err) => {
      console.error(`${label} error:`, err);
      throw err;
    });

export const checkApp = () =>
  withCatch(api.get("/api/healthcheck"), "checkApp");
export const checkRedis = () => withCatch(api.get("/api/ping"), "checkRedis");
export const checkDb = () => withCatch(api.get("/api/db"), "checkDb");
