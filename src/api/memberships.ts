import api from "./axiosInstance";
import { withCatch } from "./withCatch";
import type { MyCompaniesResponse } from "../types/company";
import type {
  CompanyInvitation,
  CompanyJoinRequest,
  CompanyMember,
} from "../types/membership";

/* ---------- MY ---------- */
export const getMyCompanies = (
  page = 1,
  size = 20
): Promise<MyCompaniesResponse> =>
  withCatch(
    api.get("/api/memberships/me/companies", { params: { page, size } }),
    "getMyCompanies"
  );

export const getMyInvitations = (): Promise<CompanyInvitation[]> =>
  withCatch(api.get("/api/memberships/me/invitations"), "getMyInvitations");

export const getMyRequests = (): Promise<CompanyJoinRequest[]> =>
  withCatch(api.get("/api/memberships/me/requests"), "getMyRequests");

export const cancelMyRequest = (requestId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/requests/${requestId}/cancel`),
    "cancelMyRequest"
  );

/* ---------- COMPANY ---------- */

export const getCompanyMembers = (
  companyId: string
): Promise<CompanyMember[]> =>
  withCatch(
    api.get(`/api/memberships/companies/${companyId}/members`),
    "getCompanyMembers"
  );

export const getCompanyInvitations = (
  companyId: string
): Promise<CompanyInvitation[]> =>
  withCatch(
    api.get(`/api/memberships/companies/${companyId}/invitations`),
    "getCompanyInvitations"
  );

export const getCompanyRequests = (
  companyId: string
): Promise<CompanyJoinRequest[]> =>
  withCatch(
    api.get(`/api/memberships/companies/${companyId}/requests`),
    "getCompanyRequests"
  );

export const removeCompanyMember = (
  companyId: string,
  userId: string
): Promise<void> =>
  withCatch(
    api.post(
      `/api/memberships/companies/${companyId}/members/${userId}/remove`
    ),
    "removeCompanyMember"
  );

/* ---------- ACTIONS ---------- */

export const inviteUserToCompany = (
  companyId: string,
  email: string
): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/${companyId}/invitations`, { email }),
    "inviteUserToCompany"
  );

export const cancelInvitation = (invitationId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/companies/invitations/${invitationId}/cancel`),
    "cancelInvitation"
  );

export const acceptInvitation = (invitationId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/companies/invitations/${invitationId}/accept`),
    "acceptInvitation"
  );

export const declineInvitation = (invitationId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/companies/invitations/${invitationId}/decline`),
    "declineInvitation"
  );

export const requestToJoinCompany = (companyId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/companies/${companyId}/requests`),
    "requestToJoinCompany"
  );

export const cancelJoinRequest = (requestId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/companies/requests/${requestId}/cancel`),
    "cancelJoinRequest"
  );

export const acceptJoinRequest = (requestId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/companies/requests/${requestId}/accept`),
    "acceptJoinRequest"
  );

export const declineJoinRequest = (requestId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/companies/requests/${requestId}/decline`),
    "declineJoinRequest"
  );

export const leaveCompany = (companyId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/companies/${companyId}/leave`),
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
