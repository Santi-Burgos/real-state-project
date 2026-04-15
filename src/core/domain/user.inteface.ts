import { User } from "../entity/user.entity";

export interface IUserRepository{
  createUser(user: User): Promise <User | null>;

  findUserByEmail(email: string): Promise<User>;

  findUserById(id: string): Promise<User>;

  findAllUser(): Promise<User[]>;

  updateUser(user: User): Promise<User>;

  deleteUserById(id: string): void;
}