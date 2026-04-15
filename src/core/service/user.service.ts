import { Inject, Injectable } from "@nestjs/common";
import { CreateUserRequestDTO } from "../dto/userReq.dto";
import { UserResponseDTO } from "../dto/userRes.dto";
import { User } from "../entity/user.entity";
import { IUserRepository } from "../domain/user.inteface";
import { Encrypted } from "./bcrypt.service";

@Injectable()
export class UserService{
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ){}

  async createUser(userToCreate: CreateUserRequestDTO): Promise<UserResponseDTO>{
    const findUserByEmail = await this.userRepository.findUserByEmail(userToCreate.email);
    if(findUserByEmail == null){
      throw new Error("El email esta en uso");
    } 
    
    const hashedPassword = await Encrypted.generateHashedPassword(userToCreate.password);
    
    const user = new User(
      userToCreate.email,
      hashedPassword,
      userToCreate.username,
      userToCreate.rolId
    );

    
    await this.userRepository.createUser(user);
    //creación del token

    return new UserResponseDTO(user);
  }


  
}