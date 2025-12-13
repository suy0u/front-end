import api from "./axiosInstance";
import { withCatch } from "./withCatch";
import type { MyCompaniesResponse } from "../types/company";

export const getMyCompanies = (
  page = 1,
  size = 20
): Promise<MyCompaniesResponse> =>
  withCatch(
    api.get("/api/memberships/me/companies", { params: { page, size } }),
    "getMyCompanies"
  );

export const leaveCompany = (companyId: string): Promise<void> =>
  withCatch(
    api.post(`/api/memberships/companies/${companyId}/leave`),
    "leaveCompany"
  );
