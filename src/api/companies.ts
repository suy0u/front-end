import api from "./axiosInstance";
import { withCatch } from "./withCatch";
import type {
  Company,
  CompaniesResponse,
  CreateCompanyPayload,
  UpdateCompanyPayload,
} from "../types/company";

export const getCompanies = (page = 1, size = 20): Promise<CompaniesResponse> =>
  withCatch(
    api.get("/api/companies/", { params: { page, size } }),
    "getCompanies"
  );

export const getCompanyById = (id: string): Promise<Company> =>
  withCatch(api.get(`/api/companies/${id}`), "getCompanyById");

export const createCompany = (data: CreateCompanyPayload): Promise<Company> =>
  withCatch(api.post("/api/companies/", data), "createCompany");

export const updateCompany = (
  id: string,
  data: UpdateCompanyPayload
): Promise<Company> =>
  withCatch(api.patch(`/api/companies/${id}`, data), "updateCompany");

export const deleteCompany = (id: string): Promise<void> =>
  withCatch(api.delete(`/api/companies/${id}`), "deleteCompany");
