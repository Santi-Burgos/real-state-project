import { Inject, Injectable } from "@nestjs/common";
import { CreateUserRequestDTO, UpdateUserReqDTO } from "../dto/userReq.dto";
import { UserResponseDTO } from "../dto/userRes.dto";
import { User } from "../entity/user.entity";
import { IUserRepository } from "../domain/user.interface";
import { IJWTService } from "../domain/jwt.interface";
import { IException } from "../domain/exception.interface";
import { IEncrypted } from "../domain/encrypted.interface";


@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IJWTService') private readonly jwtService: IJWTService,
    @Inject('IException') private readonly exception: IException,
    @Inject('IEncrypted') private readonly encrypted: IEncrypted
  ) { }

  async createUser(userData: CreateUserRequestDTO): Promise<UserResponseDTO> {
    const findUserByEmail = await this.userRepository.findUserByEmail(userData.email);
    if (findUserByEmail) {
      this.exception.BadRequestException("El email esta en uso");
    }

    const hashedPassword = await this.encrypted.generateHashedPassword(userData.password);

    const userToCreate = new User(
      userData.email,
      hashedPassword,
      userData.username,
      userData.rolId
    );

    const userCreated = await this.userRepository.createUser(userToCreate);
    const tokenPayload = {
      userId: userCreated.getId(),
      email: userCreated.getEmail(),
      role: userCreated.getRoleName(),
    }

    const token = await this.jwtService.generateAccessToken(tokenPayload);

    return new UserResponseDTO(userCreated, token);
  }

  async updateUser(userData: UpdateUserReqDTO, userId: string): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findUserById(userId);
    if (!existingUser) {
      this.exception.NotFoundException("User not found");
    }

    existingUser.mergeUpdate(userData);

    await this.userRepository.updateUser(userId, existingUser);

    return new UserResponseDTO(existingUser);
  }

  async findUserById(userId: string): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findUserById(userId);
    if (!existingUser) {
      this.exception.NotFoundException("User not found");
    }

    return new UserResponseDTO(existingUser);
  }

  async findAllUsers(): Promise<UserResponseDTO[]> {
    const allUsers = await this.userRepository.findAllUsers()
    return allUsers.map(user => new UserResponseDTO(user));
  }

  async deleteUserById(userId: string): Promise<string> {
    const rowsAffected = await this.userRepository.deleteUserById(userId);
    return "Usuario eliminado, celdas afectadas: " + rowsAffected;
  }

}