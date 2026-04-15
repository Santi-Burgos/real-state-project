import { v4 as uuidv4 } from "uuid";
import { Role } from "./enums/role.entity";

export class User {
  private _id: string;
  private _email: string;
  private _password: string;
  private _username: string;
  private _role: Role;

  constructor(
    email: string,
    password: string,
    username: string,
    role: Role | string | number,
    id?: string,
  ) {
    this._id = id ?? uuidv4();
    this._email = email;
    this._password = password;
    this._username = username;
    this._role = role instanceof Role ? role : new Role(role);
  }

  public getId(): string {
    return this._id;
  }

  public getEmail(): string {
    return this._email;
  }
  public setEmail(value: string) {
    if (!value.includes('@')) {
      throw new Error("Invalid email");
    }
    this._email = value.toLowerCase();
  }

  public getPassword(): string {
    return this._password;
  }

  public setPassword(value: string) {
    if (!value) {
      throw new Error("Invalid password");
    }
    if (value.length < 8) {
      throw new Error("Password must 8 characters");
    }
    this._password = value;
  }

  public getUsername(): string {
    return this._username;
  }

  public setUsername(value: string) {
    this._username = value;
  }

  public getRoleId(): number {
    return this._role.getId();
  }

  public getRoleName(): string {
    return this._role.getName();
  }

  public setRole(value: Role | string | number) {
    this._role = value instanceof Role ? value : new Role(value);
  }

  public getRolId(): number {
    return this.getRoleId();
  }
}