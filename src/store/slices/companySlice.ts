import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../../api/companies";
import type {
  Company,
  CompaniesResponse,
  CreateCompanyPayload,
  UpdateCompanyPayload,
} from "../../types/company";

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

export const fetchCompanies = createAsyncThunk<
  CompaniesResponse,
  { page: number; size: number },
  { rejectValue: string }
>("companies/fetchAll", async ({ page, size }, thunkAPI) => {
  try {
    return await getCompanies(page, size);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load companies");
  }
});

export const fetchCompanyById = createAsyncThunk<
  Company,
  string,
  { rejectValue: string }
>("companies/fetchById", async (id, thunkAPI) => {
  try {
    return await getCompanyById(id);
  } catch {
    return thunkAPI.rejectWithValue("Company not found");
  }
});

export const createCompanyThunk = createAsyncThunk<
  Company,
  CreateCompanyPayload,
  { rejectValue: string }
>("companies/create", async (data, thunkAPI) => {
  try {
    return await createCompany(data);
  } catch {
    return thunkAPI.rejectWithValue("Create company failed");
  }
});

export const updateCompanyThunk = createAsyncThunk<
  Company,
  { id: string; data: UpdateCompanyPayload },
  { rejectValue: string }
>("companies/update", async ({ id, data }, thunkAPI) => {
  try {
    return await updateCompany(id, data);
  } catch {
    return thunkAPI.rejectWithValue("Update company failed");
  }
});

export const deleteCompanyThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("companies/delete", async (id, thunkAPI) => {
  try {
    await deleteCompany(id);
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Delete company failed");
  }
});

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
      // LIST
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
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to load companies";
      })

      // GET BY ID
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.company = null;
        state.error = action.payload ?? "Company not found";
      })

      // CREATE
      .addCase(createCompanyThunk.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateCompanyThunk.fulfilled, (state, action) => {
        state.company = action.payload;
        state.list = state.list.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
      })

      // DELETE
      .addCase(deleteCompanyThunk.fulfilled, (state, action) => {
        const id = action.payload;
        state.list = state.list.filter((c) => c.id !== id);
        if (state.company?.id === id) {
          state.company = null;
        }
      });
  },
});

export const { clearCompany } = companiesSlice.actions;
export default companiesSlice.reducer;
