import type { MyCompany } from "./company";
import type { PaginatedResponse } from "./common";

export type MembershipStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELED";
export interface CompanyInvitation {
  id: string;
  company_id: string;
  company_name: string;
  invited_user_id: string;
  invited_user_email: string;
  invited_by_id: string;
  status: MembershipStatus;
}

export interface CompanyJoinRequest {
  id: string;
  company_id: string;
  company_name: string;
  user_id: string;
  user_email: string;
  status: MembershipStatus;
  created_at?: string;
}

export type CompanyRole = "OWNER" | "ADMIN" | "MEMBER";
export interface CompanyMember {
  user_id: string;
  email: string;
  username: string;
  role: CompanyRole;
}

export interface ChangeAdminRoleParams {
  companyId: string;
  memberUserId: string;
}

export interface InviteUserPayload {
  companyId: string;
  targetUserId?: string;
  email?: string;
}
export interface InviteUsersBulkPayload {
  companyId: string;
  userIds: string[];
}

export interface BulkInviteResponse {
  invited: string[];
  skipped: string[];
}

export type MyInvitationsResponse = PaginatedResponse<CompanyInvitation>;
export type CompanyInvitationsResponse = PaginatedResponse<CompanyInvitation>;
export type CompanyRequestsResponse = PaginatedResponse<CompanyJoinRequest>;
export type CompanyMembersResponse = PaginatedResponse<CompanyMember>;
export type LeaveCompanyState = MyCompany | null;
