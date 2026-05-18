import { User } from "../entity/user.entity";

export class UserResponseDTO{
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly rolName: string;
  readonly token?: string;

  constructor(user: User, token?: string){
    this.id = user.getId();
    this.email = user.getEmail();
    this.username = user.getUsername();
    this.rolName = user.getRoleName();
    this.token = token;
  }
}