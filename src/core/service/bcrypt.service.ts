import * as bcrypt from 'bcrypt';

export class Encrypted{
  static async generateHashedPassword(password: string): Promise<string>{
    try{
      const saltRounds = 12;
      return bcrypt.hash(password, saltRounds);
    }catch(error){
      throw new Error()
    }
  }

  static async validatePassword(password: string, hashedPassword: string): Promise<Boolean>{
    try{
      return bcrypt.compare(password, hashedPassword);
    }catch(error){
      throw new Error();
    }
  }

}