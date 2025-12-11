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
