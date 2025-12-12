import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, getUserById, updateUser, deleteUser } from "../../api/users";
import type { UpdateUserPayload, User, UsersResponse } from "../../types/user";

interface UserState {
  list: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
}

const initialState: UserState = {
  list: [],
  user: null,
  loading: false,
  error: null,
  page: 1,
  total: 0,
};

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
  number,
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
  { id: number; data: UpdateUserPayload },
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
  number,
  number,
  { rejectValue: string }
>("users/delete", async (id, thunkAPI) => {
  try {
    await deleteUser();
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Delete failed");
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    clearUser(state) {
      state.user = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load users";
      })

      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload ?? "User not found";
      })

      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        state.list = state.list.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Update failed";
      })

      .addCase(deleteUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.loading = false;

        const id = action.payload;

        state.list = state.list.filter((u) => u.id !== id);

        if (state.user?.id === id) {
          state.user = null;
        }
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Delete failed";
      });
  },
});

export const { clearUser } = usersSlice.actions;
export default usersSlice.reducer;
