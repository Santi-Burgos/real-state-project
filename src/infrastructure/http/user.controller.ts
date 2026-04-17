import { Body, Controller, Patch, Post } from "@nestjs/common";
import { UserService } from "../../core/service/user.service";
import { CreateUserRequestDTO, UpdateUserReqDTO } from "../../core/dto/userReq.dto";
import { ApiResponse } from "../../core/dto/apiRes.dto";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserRequestDTO) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return ApiResponse.success(user, "User created successfully");
    } catch (err: any) {
      return ApiResponse.error(err.message);
    }
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserReqDTO){
    try{
      const userId = "";
      const user = await this.userService.updateUser(updateUserDto, userId);
      return ApiResponse.success(user, "User updated successfully")
    }catch(err: any){
      return ApiResponse.error(err.message);
    }
  }
}