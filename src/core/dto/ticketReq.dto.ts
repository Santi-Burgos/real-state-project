import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ticketReqDTO{
  @IsString()
  @IsNotEmpty()
  readonly description!: string;

  @IsString()
  @IsNotEmpty()
  readonly customerId!: string;

  @IsNumber()
  readonly ticketStatusId!: number;

  @IsNumber()
  readonly ticketTypeId!: number;
}

export class ticketUpdateDTO{
  @IsString()
  @IsNotEmpty()
  readonly description?: string;

  @IsString()
  @IsNotEmpty()
  readonly customerId?: string;

  @IsNumber()
  readonly ticketStatusId?: number;

  @IsNumber()
  readonly ticketTypeId?: number;
}