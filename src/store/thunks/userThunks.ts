import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  uploadUserAvatar,
  searchUsers,
} from "../../api/users";
import type { UpdateUserPayload, User, UsersResponse } from "../../types/user";

export const fetchUsers = createAsyncThunk<
  UsersResponse,
  { page: number; limit: number },
  { rejectValue: string }
>("users/fetchAll", async ({ page, limit }, thunkAPI) => {
  try {
    return await getUsers(page, limit);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load users");
  }
});

export const fetchUserById = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("users/fetchById", async (id, thunkAPI) => {
  try {
    return await getUserById(id);
  } catch {
    return thunkAPI.rejectWithValue("User not found");
  }
});

export const updateUserThunk = createAsyncThunk<
  User,
  { id: string; data: UpdateUserPayload },
  { rejectValue: string }
>("users/update", async ({ data }, thunkAPI) => {
  try {
    const user = await updateUser(data);
    return user;
  } catch {
    return thunkAPI.rejectWithValue("Update failed");
  }
});

export const deleteUserThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("users/delete", async (id, thunkAPI) => {
  try {
    await deleteUser();
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Delete failed");
  }
});

export const uploadAvatarThunk = createAsyncThunk<
  User,
  File,
  { rejectValue: string }
>("user/uploadAvatar", async (file, thunkAPI) => {
  try {
    return await uploadUserAvatar(file);
  } catch {
    return thunkAPI.rejectWithValue("Avatar upload failed");
  }
});
export const searchUsersThunk = createAsyncThunk<
  User[],
  { query: string; companyId: string },
  { rejectValue: string }
>("users/search", async ({ query, companyId }, thunkAPI) => {
  try {
    return await searchUsers(query, companyId);
  } catch {
    return thunkAPI.rejectWithValue("Search failed");
  }
});
