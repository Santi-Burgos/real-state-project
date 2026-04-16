import { Inject, Injectable } from "@nestjs/common";
import { CreateUserRequestDTO, UpdateUserReqDTO } from "../dto/userReq.dto";
import { UserResponseDTO } from "../dto/userRes.dto";
import { User } from "../entity/user.entity";
import { IUserRepository } from "../domain/user.inteface";
import { Encrypted } from "./bcrypt.service";
import { IJWTService } from "../domain/jwt.interface";

@Injectable()
export class UserService{
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IJWTService') private readonly jwtService: IJWTService
  ){}

  async createUser(userData: CreateUserRequestDTO): Promise<UserResponseDTO>{
    const findUserByEmail = await this.userRepository.findUserByEmail(userData.email);
    if(!findUserByEmail){
      throw new Error("El email esta en uso");
    } 
    
    const hashedPassword = await Encrypted.generateHashedPassword(userData.password);
    
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

  async updateUser(userData: UpdateUserReqDTO, userId: string): Promise<UserResponseDTO>{
    const existingUser = await this.userRepository.findUserById(userId);
    existingUser.mergeUpdate(userData);

    await this.userRepository.updateUser(userId, existingUser);

    return new UserResponseDTO(existingUser);
  }
}