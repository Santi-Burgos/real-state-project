export interface IEncrypted{
  generateHashedPassword(password: string): Promise<string>

  validatePassword(password: string, hashedPassword: string): Promise<Boolean>
}