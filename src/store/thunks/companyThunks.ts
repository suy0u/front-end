import { createAsyncThunk } from "@reduxjs/toolkit";
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
