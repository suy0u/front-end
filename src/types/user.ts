export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  auth_provider_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UsersResponse {
  items: User[];
  total: number;
  page: number;
  size: number;
}

export interface UpdateUserPayload {
  username?: string;
  password?: string;
}

export type AuthUser = Pick<User, "id" | "email"> & {
  username?: string | null;
};
