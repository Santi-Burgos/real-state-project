import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CustomerReqDTO{
  @IsEmail()
  readonly email!: string;

  @IsNumber()
  readonly phone!: number;

  @IsString()
  readonly customerName!: string;
  
  @IsNumber()
  @IsNotEmpty()
  readonly customerType!: number;

  @IsNumber()
  readonly customerStatusPayment!: number;  
}

export class CustomerReqUpdateDTO{
  @IsEmail()
  readonly email?: string;

  @IsNumber()
  readonly phone?: number;

  @IsString()
  readonly customerName?: string;
  
  @IsNumber()
  @IsNotEmpty()
  readonly customerType?: number;

  @IsNumber()
  readonly customerStatusPayment?: number;
}