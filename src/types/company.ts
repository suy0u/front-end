import type { CompanyRole } from "./membership";
import type { PaginatedResponse } from "./common";
export interface Company {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  owner_id: string;
}

export type CompaniesResponse = PaginatedResponse<Company>;

export interface CreateCompanyPayload {
  name: string;
  description?: string;
  is_public?: boolean;
}

export interface UpdateCompanyPayload {
  name?: string;
  description?: string;
  is_public?: boolean;
}

export interface MyCompany {
  company_id: string;
  name: string;
  is_public: boolean;
  role: CompanyRole;
}

export type MyCompaniesResponse = PaginatedResponse<MyCompany>;

export interface CompanyPaginationArgs {
  companyId: string;
  page?: number;
  size?: number;
}
