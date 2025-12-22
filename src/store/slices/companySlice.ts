import { createSlice, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import type { Company } from "../../types/company";
import {
  fetchCompanies,
  fetchCompanyById,
  createCompanyThunk,
  updateCompanyThunk,
  deleteCompanyThunk,
} from "../thunks/companyThunks";

interface CompaniesState {
  list: Company[];
  company: Company | null;
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
}

const initialState: CompaniesState = {
  list: [],
  company: null,
  loading: false,
  error: null,
  page: 1,
  total: 0,
};

const companyThunks = [
  fetchCompanies,
  fetchCompanyById,
  createCompanyThunk,
  updateCompanyThunk,
  deleteCompanyThunk,
] as const;

const companiesSlice = createSlice({
  name: "companies",
  initialState,

  reducers: {
    clearCompany(state) {
      state.company = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })

      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })

      .addCase(createCompanyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })

      .addCase(updateCompanyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
        state.list = state.list.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
      })

      .addCase(deleteCompanyThunk.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.list = state.list.filter((c) => c.id !== id);
        if (state.company?.id === id) {
          state.company = null;
        }
      })

      .addMatcher(isPending(...companyThunks), (state) => {
        state.loading = true;
        state.error = null;
      })

      .addMatcher(isRejectedWithValue(...companyThunks), (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Request failed";
      });
  },
});

export const { clearCompany } = companiesSlice.actions;
export default companiesSlice.reducer;
