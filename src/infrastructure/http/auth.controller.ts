import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../../core/service/auth.service";
import { ApiResponse } from "../../core/dto/apiRes.dto";

@Controller('auth')
export class AuthController{
  constructor(private readonly authService: AuthService){}

  @Post()
  async login(@Body() email: string, password: string){
    try{
      const auth = await this.authService.login(email, password);
      return ApiResponse.success(auth, "User login successfully")
    }catch(err: any){
      return ApiResponse.error(err.message);
    }
  }
}