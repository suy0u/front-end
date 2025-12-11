export interface LoginResponse {
  token: string;
  userId: number;
  email: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  username: string;
}
