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

export type ListModalType =
  | "company_members"
  | "company_invitations"
  | "company_requests"
  | "user_companies"
  | "user_invitations"
  | "user_requests"
  | "company_quizzes"
  | null;
