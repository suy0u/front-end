import type { AuthUser } from "./user";
export interface RegisterResponse {
  id: number;
  email: string;
  username: string;
}

export interface SyncAuthRequest {
  oauth_sub: string;
  email?: string | null;
  username?: string | null;
}

export interface AuthResponse {
  access_token: string;
  access_token_expires_at: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  token_type: string;
  user: AuthUser;
}
