import { createAsyncThunk } from "@reduxjs/toolkit";

import type {
  CompanyPaginationArgs,
  MyCompaniesResponse,
} from "../../types/company";

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
  cancelCompanyInvitation,
  promoteToAdmin,
  demoteAdmin,
  declineJoinRequest,
  inviteUsersToCompanyBulk,
} from "../../api/memberships";

import type {
  CompanyInvitation,
  CompanyJoinRequest,
  CompanyMembersResponse,
  CompanyInvitationsResponse,
  CompanyRequestsResponse,
  CompanyMember,
  ChangeAdminRoleParams,
  BulkInviteResponse,
  InviteUsersBulkPayload,
} from "../../types/membership";
import type { PaginatedResponse, PaginationParams } from "../../types/common";

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
  PaginatedResponse<CompanyInvitation>,
  PaginationParams | void,
  { rejectValue: string }
>("membership/fetchMyInvitations", async (params, thunkAPI) => {
  try {
    return await getMyInvitations(params ?? {});
  } catch {
    return thunkAPI.rejectWithValue("Failed to load invitations");
  }
});

export const fetchMyRequests = createAsyncThunk<
  PaginatedResponse<CompanyJoinRequest>,
  PaginationParams | void,
  { rejectValue: string }
>("membership/fetchMyRequests", async (params, thunkAPI) => {
  try {
    return await getMyRequests(params ?? {});
  } catch {
    return thunkAPI.rejectWithValue("Failed to load requests");
  }
});

export const fetchCompanyMembers = createAsyncThunk<
  CompanyMembersResponse,
  CompanyPaginationArgs,
  { rejectValue: string }
>(
  "membership/fetchCompanyMembers",
  async ({ companyId, ...params }, thunkAPI) => {
    try {
      return await getCompanyMembers(companyId, params);
    } catch {
      return thunkAPI.rejectWithValue("Failed to load company members");
    }
  }
);

export const fetchCompanyInvitations = createAsyncThunk<
  CompanyInvitationsResponse,
  CompanyPaginationArgs,
  { rejectValue: string }
>(
  "membership/fetchCompanyInvitations",
  async ({ companyId, page = 1, size = 20 }, thunkAPI) => {
    try {
      return await getCompanyInvitations(companyId, { page, size });
    } catch {
      return thunkAPI.rejectWithValue("Failed to load company invitations");
    }
  }
);

export const fetchCompanyRequests = createAsyncThunk<
  CompanyRequestsResponse,
  CompanyPaginationArgs,
  { rejectValue: string }
>(
  "membership/fetchCompanyRequests",
  async ({ companyId, page, size }, thunkAPI) => {
    try {
      return await getCompanyRequests(companyId, { page, size });
    } catch {
      return thunkAPI.rejectWithValue("Failed to load company requests");
    }
  }
);

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
  CompanyJoinRequest,
  string,
  { rejectValue: string }
>("membership/requestToJoinCompany", async (companyId, thunkAPI) => {
  try {
    return await requestToJoinCompany(companyId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to send join request");
  }
});

export const cancelMyRequestThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("membership/cancelMyRequest", async (requestId, thunkAPI) => {
  try {
    await cancelMyRequest(requestId);
    return requestId;
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

export const declineCompanyRequestThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("membership/declineCompanyRequest", async (requestId, thunkAPI) => {
  try {
    await declineJoinRequest(requestId);
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

export const cancelCompanyInvitationThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>("membership/cancelCompanyInvitation", async (invitationId, thunkAPI) => {
  try {
    await cancelCompanyInvitation(invitationId);
  } catch {
    return thunkAPI.rejectWithValue("Failed to cancel invitation");
  }
});

export const promoteToAdminThunk = createAsyncThunk<
  CompanyMember,
  ChangeAdminRoleParams,
  { rejectValue: string }
>("membership/promoteToAdmin", async (params, thunkAPI) => {
  try {
    return await promoteToAdmin(params);
  } catch {
    return thunkAPI.rejectWithValue("Failed to promote member to admin");
  }
});

export const demoteAdminThunk = createAsyncThunk<
  CompanyMember,
  ChangeAdminRoleParams,
  { rejectValue: string }
>("membership/demoteAdmin", async (params, thunkAPI) => {
  try {
    return await demoteAdmin(params);
  } catch {
    return thunkAPI.rejectWithValue("Failed to demote admin");
  }
});

export const inviteUsersBulkThunk = createAsyncThunk<
  BulkInviteResponse,
  InviteUsersBulkPayload,
  { rejectValue: string }
>("membership/inviteUsersBulk", async (payload, thunkAPI) => {
  try {
    return await inviteUsersToCompanyBulk(payload);
  } catch {
    return thunkAPI.rejectWithValue("Failed to invite users");
  }
});
