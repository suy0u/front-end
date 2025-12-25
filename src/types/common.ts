import type { InternalAxiosRequestConfig } from "axios";
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}
export interface PaginationParams {
  page?: number;
  size?: number;
}

export interface PaginationState {
  page: number;
  size: number;
  total: number;
}

export const ListModal = {
  CompanyMembers: "company_members",
  CompanyInvitations: "company_invitations",
  CompanyRequests: "company_requests",
  UserCompanies: "user_companies",
  UserInvitations: "user_invitations",
  UserRequests: "user_requests",
  CompanyQuizzes: "company_quizzes",
  Notifications: "notifications",
} as const;

export type ListModalType = (typeof ListModal)[keyof typeof ListModal];

export interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
