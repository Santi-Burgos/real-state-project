export interface IJWTService{
  generateAccessToken(payload: object): Promise<string>

  generateRefreshToken(payload: object): Promise<string>

  verifyToken(token: string): Promise<any>
}