import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from "@nestjs/common";
import { UserService } from "../../core/service/user.service";
import { CreateUserRequestDTO, UpdateUserReqDTO } from "../../core/dto/userReq.dto";
import { ApiResponse } from "../../core/dto/apiRes.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserRequestDTO) {
    const user = await this.userService.createUser(createUserDto);
    return ApiResponse.success(user, "User created successfully");
  }

  @Patch()
  async update(
    @Request() req: any,
    @Body() updateUserDto: UpdateUserReqDTO
  ){
    const userId = req.user.userId;
    const user = await this.userService.updateUser(updateUserDto, userId);
    return ApiResponse.success(user, "User updated successfully")
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string){
    const user = await this.userService.findUserById(userId);
    return ApiResponse.success(user, "User found successfully");
  }

  @Get()
  async findAllUser(){
    const allUsers = await this.userService.findAllUsers();
    return ApiResponse.success(allUsers, "All users found successfully");
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string){
    const deleteUser = await this.userService.deleteUserById(userId);
    return ApiResponse.success(deleteUser, "User Deleted successfully")
  }
}