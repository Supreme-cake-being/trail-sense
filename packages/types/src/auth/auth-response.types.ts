export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}
