import { User } from "../entity/user.entity";

export class UserResponseDTO{
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly rolId: number

  constructor(user: User){
    this.id = user.getId();
    this.email = user.getEmail();
    this.username = user.getUsername();
    this.rolId = user.getRolId();
  }
}