import api from "./axiosInstance";
import { withCatch } from "./withCatch";
import type { MyCompaniesResponse } from "../types/company";
import type {
  ChangeAdminRoleParams,
  CompanyMember,
  CompanyInvitationsResponse,
  CompanyRequestsResponse,
  MyInvitationsResponse,
  CompanyMembersResponse,
  InviteUsersBulkPayload,
  BulkInviteResponse,
  CompanyJoinRequest,
} from "../types/membership";
import type { PaginationParams } from "../types/common";

export const getMyCompanies = (
  params: PaginationParams = {}
): Promise<MyCompaniesResponse> =>
  withCatch(
    api.get("/api/memberships/me/companies", { params }),
    "getMyCompanies"
  );

export const getMyInvitations = (
  params: PaginationParams = {}
): Promise<MyInvitationsResponse> =>
  withCatch(
    api.get("/api/memberships/me/invitations", { params }),
    "getMyInvitations"
  );

export const getMyRequests = (
  params: PaginationParams = {}
): Promise<CompanyRequestsResponse> =>
  withCatch(
    api.get("/api/memberships/me/requests", { params }),
    "getMyInvitations"
  );

export const cancelMyRequest = (requestId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/requests/${requestId}/cancel`),
    "cancelMyRequest"
  );

export const getCompanyMembers = (
  companyId: string,
  params?: PaginationParams
): Promise<CompanyMembersResponse> =>
  withCatch(
    api.get(`/api/memberships/members/${companyId}`, {
      params,
    }),
    "getCompanyMembers"
  );

export const getCompanyInvitations = (
  companyId: string,
  params: PaginationParams = {}
): Promise<CompanyInvitationsResponse> =>
  withCatch(
    api.get(`/api/memberships/invitations/${companyId}`, { params }),
    "getCompanyInvitations"
  );

export const getCompanyRequests = (
  companyId: string,
  params: PaginationParams = {}
): Promise<CompanyRequestsResponse> =>
  withCatch(
    api.get(`/api/memberships/requests/${companyId}`, { params }),
    "getCompanyRequests"
  );

export const removeCompanyMember = (
  companyId: string,
  memberUserId: string
): Promise<void> =>
  withCatch(
    api.delete(`/api/memberships/members/${companyId}/${memberUserId}`),
    "removeCompanyMember"
  );

export const inviteUsersToCompanyBulk = (
  payload: InviteUsersBulkPayload
): Promise<BulkInviteResponse> =>
  withCatch(
    api.post(`/api/memberships/invitations/${payload.companyId}/bulk`, {
      user_ids: payload.userIds,
    }),
    "inviteUsersToCompanyBulk"
  );

export const cancelCompanyInvitation = (invitationId: string): Promise<void> =>
  withCatch(
    api.post<void>(`/api/memberships/invitations/${invitationId}/cancel`),
    "cancelCompanyInvitation"
  );

export const acceptInvitation = (invitationId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/invitations/${invitationId}/accept`),
    "acceptInvitation"
  );

export const declineInvitation = (invitationId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/invitations/${invitationId}/decline`),
    "declineInvitation"
  );

export const requestToJoinCompany = (
  companyId: string
): Promise<CompanyJoinRequest> =>
  withCatch(
    api.post(`/api/memberships/requests/${companyId}`),
    "requestToJoinCompany"
  );

export const cancelJoinRequest = (requestId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/requests/${requestId}/cancel`),
    "cancelJoinRequest"
  );

export const acceptJoinRequest = (requestId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/requests/${requestId}/accept`),
    "acceptJoinRequest"
  );

export const declineJoinRequest = (requestId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/requests/${requestId}/decline`),
    "declineJoinRequest"
  );

export const leaveCompany = (companyId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/members/${companyId}/leave`),
    "leaveCompany"
  );

export const acceptCompanyRequest = (requestId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/requests/${requestId}/accept`),
    "acceptCompanyRequest"
  );

export const rejectCompanyRequest = (requestId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/requests/${requestId}/reject`),
    "rejectCompanyRequest"
  );
export const promoteToAdmin = (
  params: ChangeAdminRoleParams
): Promise<CompanyMember> =>
  withCatch(
    api.post(
      `/api/memberships/admins/${params.companyId}/${params.memberUserId}/promote`
    ),
    "promoteToAdmin"
  );

export const demoteAdmin = (
  params: ChangeAdminRoleParams
): Promise<CompanyMember> =>
  withCatch(
    api.post(
      `/api/memberships/admins/${params.companyId}/${params.memberUserId}/demote`
    ),
    "demoteAdmin"
  );
