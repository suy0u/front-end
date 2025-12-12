export interface LoginResponse {
  access_token: string;
  access_token_expires_at: string;
  refresh_token: string;
  refresh_token_expires_at: string;
  token_type: string;
  user: {
    id: number;
    email: string;
  };
}

export interface RegisterResponse {
  id: number;
  email: string;
  username: string;
}

export interface SyncAuthRequest {
  sub: string;
  email?: string | null;
  username?: string | null;
}

export interface SyncAuthResponse {
  id: number;
  email: string | null;
  auth_provider_id: string | null;
  username: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
