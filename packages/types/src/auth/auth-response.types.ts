export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isEmailVerified: boolean;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}
