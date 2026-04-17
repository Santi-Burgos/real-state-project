import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, IsOptional } from "class-validator";

export class CreateUserRequestDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password!: string;

  @IsString()
  @IsNotEmpty()
  readonly username!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rolId!: number;
}

export class UpdateUserReqDTO {
  @IsEmail()
  @IsOptional()
  readonly email?: string;
  @IsString()
  @MinLength(8)
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsOptional()
  readonly username?: string;

  @IsNumber()
  @IsOptional()
  readonly rolId?: number;
}