import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IJWTService } from "../../../core/domain/jwt.interface";
import { Observable } from "rxjs";
import { IException } from "../../../core/domain/exception.interface";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    @Inject('IJWTService') private readonly jwtService: IJWTService,
    @Inject('IException') private readonly exception: IException,
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    if(!token){
      this.exception.UnauthorizedException('Token no proporcionado');
    }

    try{
      const decoded = await this.jwtService.verifyToken(token);
      req.user = decoded.payload;
    }catch{
      this.exception.UnauthorizedException('Token invalido o experido')
    }
    return true;
  }

  private extractTokenFromHeader(req: any): string | undefined{
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}