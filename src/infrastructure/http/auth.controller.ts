import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "../../core/service/auth.service";
import { ApiResponse } from "../../core/dto/apiRes.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    const { email, password } = body;
    const auth = await this.authService.login(email, password);
    return ApiResponse.success(auth, "User login successfully")
  }
}