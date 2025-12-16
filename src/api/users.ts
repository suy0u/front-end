import api from "./axiosInstance";
import { withCatch } from "./withCatch";
import type { User, UpdateUserPayload, UsersResponse } from "../types/user";

export const getUsers = (page = 1, size = 20): Promise<UsersResponse> =>
  withCatch<UsersResponse>(
    api.get("/api/users/", {
      params: { page, size },
    }),
    "getUsers"
  );

export const getUserById = (id: number): Promise<User> =>
  withCatch<User>(api.get(`/api/users/${id}`), "getUserById");

export const updateUser = (payload: UpdateUserPayload): Promise<User> =>
  withCatch<User>(api.patch(`/api/users/`, payload), "updateUser");

export const deleteUser = (): Promise<void> =>
  withCatch<void>(api.delete(`/api/users/`), "deleteUser");

export const uploadUserAvatar = (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("file", file);

  return withCatch<User>(
    api.post("api/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    "uploadUserAvatar"
  );
};
