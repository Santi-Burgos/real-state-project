import { Inject } from "@nestjs/common";
import { IUserRepository } from "../../core/domain/user.inteface";
import { Pool } from "pg";
import { User } from "../../core/entity/user.entity";

export class SqlUserRepository implements IUserRepository {
  constructor(
    @Inject('PG_CONNECTION') private readonly conn: Pool
  ) { }

  async createUser(user: User): Promise<User> {
    const queryCreateUser = `
      INSERT INTO users(user_id, email, password, username, rol_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `
    try {
      const result = await this.conn.query(queryCreateUser, [
        user.getId(),
        user.getEmail(),
        user.getPassword(),
        user.getUsername(),
        user.getRoleId()
      ]);
      return result.rows[0];
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const queryFindUserByEmail = `
      SELECT * FROM users WHERE email = $1
    `
    try {
      const result = await this.conn.query(queryFindUserByEmail, [email]);
      return result.rows[0];
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findUserById(id: string): Promise<User> {
    const queryFindUserById = `
      SELECT * FROM users WHERE user_id = $1
    `
    try {
      const result = await this.conn.query(queryFindUserById, [id]);
      return result.rows[0];
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findAllUser(): Promise<User[]> {
    const queryFindAllUser = `
      SELECT * FROM users
    `
    try {
      const result = await this.conn.query(queryFindAllUser);
      return result.rows;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateUser(userId: string, user: User): Promise<User> {
    const queryUpdateUser = `
      UPDATE users SET email = $1, password = $2, username = $3, rol_id = $4 WHERE user_id = $5
    `
    try {
      const result = await this.conn.query(queryUpdateUser, [
        user.getEmail(),
        user.getPassword(),
        user.getUsername(),
        user.getRoleId(),
        userId
      ]);
      return result.rows[0];
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async deleteUserById(id: string): Promise<string> {
    const queryDeleteUserById = `
      DELETE FROM users WHERE user_id = $1
    `
    try {
      const result = await this.conn.query(queryDeleteUserById, [id]);
      return result.rows[0];
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}