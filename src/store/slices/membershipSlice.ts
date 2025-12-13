import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyCompanies, leaveCompany } from "../../api/memberships";
import type { MyCompany, MyCompaniesResponse } from "../../types/company";

export interface MembershipState {
  myCompanies: MyCompany[];
  loading: boolean;
  error: string | null;
}

const initialState: MembershipState = {
  myCompanies: [],
  loading: false,
  error: null,
};

export const fetchMyCompanies = createAsyncThunk<
  MyCompaniesResponse,
  void,
  { rejectValue: string }
>("membership/fetchMyCompanies", async (_, thunkAPI) => {
  try {
    return await getMyCompanies();
  } catch {
    return thunkAPI.rejectWithValue("Failed to load companies");
  }
});
export const leaveCompanyThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("membership/leaveCompany", async (companyId, thunkAPI) => {
  try {
    await leaveCompany(companyId);
    return companyId;
  } catch {
    return thunkAPI.rejectWithValue("Failed to leave company");
  }
});

const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.myCompanies = action.payload.items;
      })
      .addCase(fetchMyCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error";
      })
      .addCase(leaveCompanyThunk.fulfilled, (state, action) => {
        state.myCompanies = state.myCompanies.filter(
          (c) => c.company_id !== action.payload
        );
      });
  },
});

export default membershipSlice.reducer;
