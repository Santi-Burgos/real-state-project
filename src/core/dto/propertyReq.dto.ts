
import { IsNotEmpty, IsNumber, IsString, MinLength, IsOptional } from "class-validator";

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


export class UpdatePropertyRequestDTO{
  @IsString()
  @MinLength(5)
  @IsOptional()
  readonly address?: string;

  @IsNumber()
  @IsOptional()
  readonly serviceId!: number;

  @IsNumber()
  @IsOptional()
  readonly statusId!: number;

  @IsNumber()
  @IsOptional()
  readonly typeId!: number;
}