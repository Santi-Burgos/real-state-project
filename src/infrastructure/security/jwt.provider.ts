import { IJWTService } from "../../core/domain/jwt.interface";
import * as jwt from 'jsonwebtoken'


export class JwtService implements IJWTService{
  private readonly jwtSecretKey: string;

  constructor(){
    const secretKey = process.env.JWT_SECRET;
    
    if(!secretKey){
      throw new Error("JWT_SERVICE is not defined")
    }
    this.jwtSecretKey = secretKey;
  }

  async generateAccessToken(payload: object): Promise<string> {
    try{
      const token = jwt.sign(
        {payload},
        this.jwtSecretKey,
        {expiresIn: '1h'}
      );
      return token;

    }catch(err: any){
      throw new Error("Error generate Token: " + err.message());
    }
  }
  //spoki inicialemtnen son iguales, pero es hasta que implementemos los refreshtokens
  async generateRefreshToken(payload: object): Promise<string> {
    try{
      const token = jwt.sign(
        {payload},
        this.jwtSecretKey,
        {expiresIn: '1h'}
      );
      return token;

    }catch(err: any){
      throw new Error("Error generate Token: " + err.message());
    }
  }
  //Esta bien el tipo any? 
  async verifyToken(token: string): Promise<any> {
    try{
      const decoded = jwt.verify(
        token,
        this.jwtSecretKey
      );

      return decoded;
    }catch(err: any){
      throw new Error("Error verify token: " + err.message());
    }
  }
}