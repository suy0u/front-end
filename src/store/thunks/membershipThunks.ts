import { createAsyncThunk } from "@reduxjs/toolkit";

import type { MyCompaniesResponse } from "../../types/company";

import {
  getMyCompanies,
  getMyInvitations,
  getMyRequests,
  getCompanyMembers,
  getCompanyInvitations,
  getCompanyRequests,
  leaveCompany,
  acceptInvitation,
  declineInvitation,
  requestToJoinCompany,
  removeCompanyMember,
  acceptCompanyRequest,
  cancelMyRequest,
  rejectCompanyRequest,
} from "../../api/memberships";

import type {
  CompanyInvitation,
  CompanyJoinRequest,
  CompanyMember,
} from "../../types/membership";

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

export const fetchMyInvitations = createAsyncThunk<
  CompanyInvitation[],
  void,
  { rejectValue: string }
>("membership/fetchMyInvitations", async (_, thunkAPI) => {
  try {
    return await getMyInvitations();
  } catch {
    return thunkAPI.rejectWithValue("Failed to load invitations");
  }
});

export const fetchMyRequests = createAsyncThunk<
  CompanyJoinRequest[],
  void,
  { rejectValue: string }
>("membership/fetchMyRequests", async (_, thunkAPI) => {
  try {
    return await getMyRequests();
  } catch {
    return thunkAPI.rejectWithValue("Failed to load requests");
  }
});

export const fetchCompanyMembers = createAsyncThunk<
  CompanyMember[],
  string,
  { rejectValue: string }
>("membership/fetchCompanyMembers", async (companyId, thunkAPI) => {
  try {
    return await getCompanyMembers(companyId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load members");
  }
});

export const fetchCompanyInvitations = createAsyncThunk<
  CompanyInvitation[],
  string,
  { rejectValue: string }
>("membership/fetchCompanyInvitations", async (companyId, thunkAPI) => {
  try {
    return await getCompanyInvitations(companyId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load invitations");
  }
});

export const fetchCompanyRequests = createAsyncThunk<
  CompanyJoinRequest[],
  string,
  { rejectValue: string }
>("membership/fetchCompanyRequests", async (companyId, thunkAPI) => {
  try {
    return await getCompanyRequests(companyId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to load requests");
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

export const acceptInvitationThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("membership/acceptInvitation", async (invitationId, thunkAPI) => {
  try {
    await acceptInvitation(invitationId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to accept invitation");
  }
});

export const declineInvitationThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("membership/declineInvitation", async (invitationId, thunkAPI) => {
  try {
    await declineInvitation(invitationId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to decline invitation");
  }
});

export const requestToJoinCompanyThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("membership/requestToJoinCompany", async (companyId, thunkAPI) => {
  try {
    await requestToJoinCompany(companyId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to send join request");
  }
});

export const cancelMyRequestThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("membership/cancelMyRequest", async (requestId, thunkAPI) => {
  try {
    await cancelMyRequest(requestId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to cancel request");
  }
});

export const acceptCompanyRequestThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("membership/acceptCompanyRequest", async (requestId, thunkAPI) => {
  try {
    await acceptCompanyRequest(requestId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to accept request");
  }
});

export const rejectCompanyRequestThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("membership/rejectCompanyRequest", async (requestId, thunkAPI) => {
  try {
    await rejectCompanyRequest(requestId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to reject request");
  }
});

export const removeCompanyMemberThunk = createAsyncThunk<
  void,
  { companyId: string; userId: string },
  { rejectValue: string }
>("membership/removeCompanyMember", async ({ companyId, userId }, thunkAPI) => {
  try {
    await removeCompanyMember(companyId, userId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to remove member");
  }
});
