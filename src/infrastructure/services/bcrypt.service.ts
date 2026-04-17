import * as bcrypt from 'bcrypt';
import { IEncrypted } from '../../core/domain/encrypted.interface';

export class Encrypted implements IEncrypted{
  
  async generateHashedPassword(password: string): Promise<string>{
    try{
      const saltRounds = 12;
      return bcrypt.hash(password, saltRounds);
    }catch(error){
      throw new Error()
    }
  }

  async validatePassword(password: string, hashedPassword: string): Promise<Boolean>{
    try{
      return bcrypt.compare(password, hashedPassword);
    }catch(error){
      throw new Error();
    }
  }
}