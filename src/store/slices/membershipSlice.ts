import {
  createSlice,
  isPending,
  isFulfilled,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import type { MyCompany } from "../../types/company";
import type {
  CompanyInvitation,
  CompanyJoinRequest,
  CompanyMember,
} from "../../types/membership";

import {
  fetchMyCompanies,
  fetchMyInvitations,
  fetchMyRequests,
  leaveCompanyThunk,
  fetchCompanyMembers,
  fetchCompanyInvitations,
  fetchCompanyRequests,
  acceptInvitationThunk,
  declineInvitationThunk,
  requestToJoinCompanyThunk,
  cancelMyRequestThunk,
  acceptCompanyRequestThunk,
  rejectCompanyRequestThunk,
  removeCompanyMemberThunk,
} from "../thunks/membershipThunks";

export interface MembershipState {
  myCompanies: MyCompany[];

  myInvitations: CompanyInvitation[];
  myRequests: CompanyJoinRequest[];

  companyMembers: CompanyMember[];
  companyInvitations: CompanyInvitation[];
  companyRequests: CompanyJoinRequest[];

  loading: boolean;
  error: string | null;
}

const initialState: MembershipState = {
  myCompanies: [],
  myInvitations: [],
  myRequests: [],

  companyMembers: [],
  companyInvitations: [],
  companyRequests: [],

  loading: false,
  error: null,
};

const membershipThunks = [
  fetchMyCompanies,
  fetchMyInvitations,
  fetchMyRequests,
  leaveCompanyThunk,

  fetchCompanyMembers,
  fetchCompanyInvitations,
  fetchCompanyRequests,

  acceptInvitationThunk,
  declineInvitationThunk,
  requestToJoinCompanyThunk,
  cancelMyRequestThunk,

  acceptCompanyRequestThunk,
  rejectCompanyRequestThunk,
  removeCompanyMemberThunk,
] as const;

const membershipSlice = createSlice({
  name: "membership",
  initialState,

  reducers: {
    /* clear owner-related data when leaving company page */
    clearCompanyMembership(state) {
      state.companyMembers = [];
      state.companyInvitations = [];
      state.companyRequests = [];
    },

    /* optional: clear all (e.g. on logout) */
    clearMembership(state) {
      state.myCompanies = [];
      state.myInvitations = [];
      state.myRequests = [];

      state.companyMembers = [];
      state.companyInvitations = [];
      state.companyRequests = [];

      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyCompanies.fulfilled, (state, action) => {
        state.myCompanies = action.payload.items;
      })

      .addCase(fetchMyInvitations.fulfilled, (state, action) => {
        state.myInvitations = action.payload;
      })

      .addCase(fetchMyRequests.fulfilled, (state, action) => {
        state.myRequests = action.payload;
      })

      .addCase(fetchCompanyMembers.fulfilled, (state, action) => {
        state.companyMembers = action.payload;
      })

      .addCase(fetchCompanyInvitations.fulfilled, (state, action) => {
        state.companyInvitations = action.payload;
      })

      .addCase(fetchCompanyRequests.fulfilled, (state, action) => {
        state.companyRequests = action.payload;
      })

      .addMatcher(isPending(...membershipThunks), (state) => {
        state.loading = true;
        state.error = null;
      })

      .addMatcher(isFulfilled(...membershipThunks), (state) => {
        state.loading = false;
      })

      .addMatcher(isRejectedWithValue(...membershipThunks), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCompanyMembership, clearMembership } =
  membershipSlice.actions;

export default membershipSlice.reducer;
