import type { CompanyRole } from "./company";

export interface CompanyInvitation {
  id: string;
  company_id: string;
  company_name: string;
  created_at: string;
}

export interface CompanyJoinRequest {
  id: string;
  company_id: string;
  company_name: string;
  created_at: string;
}

export interface CompanyMember {
  user_id: string;
  username: string;
  role: CompanyRole;
}
