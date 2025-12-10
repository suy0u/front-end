import api from "./axiosInstance";

export const login = async (email: string, password: string) => {
  const res = await api.post("/api/auth/login", null, {
    params: { email, password },
  });
  return res.data;
};

export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  const res = await api.post("/api/users/", {
    email,
    password,
    username,
  });
  return res.data;
};
