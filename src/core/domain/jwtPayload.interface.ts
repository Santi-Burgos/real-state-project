export interface JwtPayload{
  payload: {
    userId: string,
    email: string,
    role?: string,
  }
  iat?: number;
  exp?: number;
}