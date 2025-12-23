import {
  createSlice,
  isPending,
  isRejectedWithValue,
  isAnyOf,
} from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import {
  fetchUsers,
  fetchUserById,
  updateUserThunk,
  deleteUserThunk,
  uploadAvatarThunk,
  searchUsersThunk,
  searchMembersThunk,
} from "../thunks/userThunks";

interface UserState {
  list: User[];
  user: User | null;

  search: User[];
  searchLoading: boolean;

  loading: boolean;
  error: string | null;
  page: number;
  total: number;
}

const initialState: UserState = {
  list: [],
  user: null,

  search: [],
  searchLoading: false,

  loading: false,
  error: null,
  page: 1,
  total: 0,
};

const userThunks = [
  fetchUsers,
  fetchUserById,
  updateUserThunk,
  deleteUserThunk,
  uploadAvatarThunk,
] as const;

const searchThunks = [searchUsersThunk, searchMembersThunk] as const;

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    clearUser(state) {
      state.user = null;
      state.error = null;
    },
    clearUserSearch(state) {
      state.search = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })

      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.list = state.list.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })

      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;

        state.list = state.list.filter((u) => u.id !== id);
        if (state.user?.id === id) {
          state.user = null;
        }
      })

      .addCase(uploadAvatarThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addMatcher(isPending(...searchThunks), (state) => {
        state.searchLoading = true;
      })

      .addMatcher(
        isAnyOf(...searchThunks.map((t) => t.fulfilled)),
        (state, action) => {
          state.searchLoading = false;
          state.search = action.payload ?? [];
        }
      )

      .addMatcher(isAnyOf(...searchThunks.map((t) => t.rejected)), (state) => {
        state.searchLoading = false;
      })

      .addMatcher(isPending(...userThunks), (state) => {
        state.loading = true;
        state.error = null;
      })

      .addMatcher(isRejectedWithValue(...userThunks), (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Request failed";
      });
  },
});

export const { clearUser, clearUserSearch } = usersSlice.actions;
export default usersSlice.reducer;
