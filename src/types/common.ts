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
