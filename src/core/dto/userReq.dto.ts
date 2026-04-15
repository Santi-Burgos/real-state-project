import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserRequestDTO{
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