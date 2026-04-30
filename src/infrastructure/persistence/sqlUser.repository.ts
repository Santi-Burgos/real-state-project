import { Inject } from "@nestjs/common";
import { IUserRepository } from "../../core/domain/user.interface";
import { Pool } from "pg";
import { User } from "../../core/entity/user.entity";

export class SqlUserRepository implements IUserRepository {
  constructor(
    @Inject('PG_CONNECTION') private readonly conn: Pool,
  ) { }

  private mapToEntity(row: any): User | null {
    if (!row) return null;
    return new User(
      row.email,
      row.password,
      row.username,
      row.rol_id,
      row.user_id,
    );
  }

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
      return this.mapToEntity(result.rows[0])!;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const queryFindUserByEmail = `
      SELECT * FROM users WHERE LOWER(email) = LOWER($1)
    `
    try {
      const { rows } = await this.conn.query(queryFindUserByEmail, [email]);
      return this.mapToEntity(rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findUserById(id: string): Promise<User | null> {
    const queryFindUserById = `
      SELECT * FROM users WHERE user_id = $1
    `
    try {
      const result = await this.conn.query(queryFindUserById, [id]);
      return this.mapToEntity(result.rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findAllUsers(): Promise<User[]> {
    const queryFindAllUser = `
      SELECT * FROM users
    `
    try {
      const result = await this.conn.query(queryFindAllUser);
      return result.rows
        .map(row => this.mapToEntity(row))
        .filter((user): user is User => user !== null);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateUser(userId: string, user: User): Promise<User> {
    const queryUpdateUser = `
      UPDATE users SET email = $1, password = $2, username = $3, rol_id = $4 WHERE user_id = $5
      RETURNING *
    `
    try {
      const result = await this.conn.query(queryUpdateUser, [
        user.getEmail(),
        user.getPassword(),
        user.getUsername(),
        user.getRoleId(),
        userId
      ]);
      return this.mapToEntity(result.rows[0])!;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async deleteUserById(id: string): Promise<string> {
    const queryDeleteUserById = `
      DELETE FROM users WHERE user_id = $1
      RETURNING user_id
    `
    try {
      const result = await this.conn.query(queryDeleteUserById, [id]);
      return result.rows[0]?.user_id || "0";
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}