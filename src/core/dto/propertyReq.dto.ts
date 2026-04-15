
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreatePropertyRequestDTO{
  @IsString()
  @MinLength(5)
  readonly address!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly serviceId!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly statusId!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly typeId!: number;
}