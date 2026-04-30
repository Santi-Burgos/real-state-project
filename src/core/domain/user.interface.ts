import { User } from "../entity/user.entity";

export interface IUserRepository {
  createUser(user: User): Promise<User>;

  findUserByEmail(email: string): Promise<User | null>;

  findUserById(id: string): Promise<User | null>;

  findAllUsers(): Promise<User[]>;

  updateUser(userId: string, user: User): Promise<User>;

  deleteUserById(id: string): Promise<string>;
}