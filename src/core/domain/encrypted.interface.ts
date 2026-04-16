export interface IEncryptedService{
  generateHashedPassword(password: string): Promise<string>

  validatePassword(password: string, hashedPassword: string): Promise<Boolean>
}