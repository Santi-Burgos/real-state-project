
import { Type, Transform } from 'class-transformer';
import { IsNumber, IsString, MinLength, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreatePropertyRequestDTO {
  @IsString()
  @MinLength(5)
  readonly address!: string;

  @Type(() => Number) 
  @IsNumber()
  @IsNotEmpty()
  readonly serviceId!: number;

  @Type(() => Number) 
  @IsNumber()
  @IsNotEmpty()
  readonly statusId!: number;

  @Type(() => Number) 
  @IsNumber()
  @IsNotEmpty()
  readonly typeId!: number;

  @Type(() => Number)
  @IsNumber()
  readonly bathQuantity!: number;

  @Type(() => Number) 
  @IsNumber()
  readonly roomQuantity!: number;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  readonly electricityService!: boolean;
 
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  readonly waterService!: boolean;

  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  readonly internetService!: boolean;
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

  @IsNumber()
  readonly bathQuantity?: number;

  @IsNumber()
  readonly roomQuantity?: number;

  @IsBoolean()
  readonly electricityService?: boolean;

  @IsBoolean()
  readonly waterService?: boolean;

  @IsBoolean()
  readonly internetService?: boolean;
}