import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProviderReqDTO{  
  @IsString()
  readonly providerEmail!: string;

  @IsNumber()
  readonly providerPhone!: number;

  @IsString()
  @IsNotEmpty()
  readonly providerName!: string;

  @IsNotEmpty()
  @IsNumber()
  readonly providerService!: number
}

export class ProviderUpdateDTO{
  @IsString()
  readonly providerEmail?: string;

  @IsNumber()
  readonly providerPhone?: number;

  @IsString()
  readonly providerName?: string;

  @IsNumber()
  readonly providerService?: number
}