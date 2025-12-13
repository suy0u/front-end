export interface Company {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  owner_id: string;
}

export interface CompaniesResponse {
  items: Company[];
  total: number;
  page: number;
  size: number;
}

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
export type LeaveCompanyState = MyCompany | null;

export type CompanyRole = "OWNER" | "ADMIN" | "MEMBER";

export interface MyCompany {
  company_id: string;
  name: string;
  is_public: boolean;
  role: CompanyRole;
}

export interface MyCompaniesResponse {
  items: MyCompany[];
  total: number;
  page: number;
  size: number;
}
