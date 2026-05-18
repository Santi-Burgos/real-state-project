import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../domain/user.interface";
import { IException } from "../domain/exception.interface";
import { IEncrypted } from "../domain/encrypted.interface";
import { IJWTService } from "../domain/jwt.interface";
import { UserResponseDTO } from "../dto/userRes.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IException') private readonly exception: IException,
    @Inject('IEncrypted') private readonly encrypted: IEncrypted,
    @Inject('IJWTService') private readonly jwtService: IJWTService
  ) { }

  async login(email: string, password: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user || user == null) {
      this.exception.UnauthorizedException("Email o password son invalidos")
    }

    if (!this.encrypted.validatePassword(password, user.getPassword())) {
      this.exception.UnauthorizedException("Email o password son invalidos")
    }

    const payload = {
      userId: user.getId(),
      email: user.getEmail(),
      role: user.getRoleName()
    }

    const token = await this.jwtService.generateAccessToken(payload);
    return new UserResponseDTO(user, token);
  }
}