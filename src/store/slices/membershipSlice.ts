import {
  createSlice,
  isPending,
  isFulfilled,
  isRejectedWithValue,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { MyCompany } from "../../types/company";
import type {
  CompanyInvitation,
  CompanyJoinRequest,
  CompanyMember,
  LeaveCompanyState,
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
  declineCompanyRequestThunk,
  removeCompanyMemberThunk,
  cancelCompanyInvitationThunk,
  promoteToAdminThunk,
  demoteAdminThunk,
} from "../thunks/membershipThunks";

import type { PaginationState } from "../../types/common";

export interface MembershipState extends PaginationState {
  myCompanies: MyCompany[];

  myInvitations: CompanyInvitation[];
  myRequests: CompanyJoinRequest[];

  companyMembers: CompanyMember[];
  companyInvitations: CompanyInvitation[];
  companyRequests: CompanyJoinRequest[];

  companyToLeave: LeaveCompanyState;

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

  companyToLeave: null,

  page: 1,
  size: 20,
  total: 0,

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
  declineCompanyRequestThunk,
  removeCompanyMemberThunk,
  cancelCompanyInvitationThunk,

  promoteToAdminThunk,
  demoteAdminThunk,
] as const;

const membershipSlice = createSlice({
  name: "membership",
  initialState,

  reducers: {
    clearCompanyMembership(state) {
      state.companyMembers = [];
      state.companyInvitations = [];
      state.companyRequests = [];
    },

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
    setCompanyToLeave(state, action: PayloadAction<LeaveCompanyState | null>) {
      state.companyToLeave = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMyCompanies.fulfilled, (state, action) => {
      state.myCompanies = action.payload.items;
    });

    builder
      .addCase(fetchMyInvitations.fulfilled, (state, action) => {
        state.loading = false;
        state.myInvitations = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.size = action.payload.size;
      })

      .addCase(fetchMyRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.myRequests = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.size = action.payload.size;
      })

      .addCase(fetchCompanyMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.companyMembers = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.size = action.payload.size;
      })

      .addCase(fetchCompanyInvitations.fulfilled, (state, action) => {
        state.loading = false;
        state.companyInvitations = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.size = action.payload.size;
      })

      .addCase(fetchCompanyRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.companyRequests = action.payload.items;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.size = action.payload.size;
      })
      .addCase(promoteToAdminThunk.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.companyMembers.findIndex(
          (m) => m.user_id === action.payload.user_id
        );
        if (idx !== -1) {
          state.companyMembers[idx] = action.payload;
        }
      })

      .addCase(demoteAdminThunk.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.companyMembers.findIndex(
          (m) => m.user_id === action.payload.user_id
        );
        if (idx !== -1) {
          state.companyMembers[idx] = action.payload;
        }
      })
      .addCase(cancelMyRequestThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myRequests = state.myRequests.filter(
          (r) => r.id !== action.payload
        );
      })
      .addCase(requestToJoinCompanyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myRequests.unshift(action.payload);
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

export const { clearCompanyMembership, clearMembership, setCompanyToLeave } =
  membershipSlice.actions;

export default membershipSlice.reducer;
