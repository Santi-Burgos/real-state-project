import { IsNumber, IsString } from "class-validator";

export class AppointmentReqDTO{
  @IsString()
  readonly propertyId!: string;

  @IsString()
  readonly customerId!: string;

  @IsString()
  readonly userId!: string;
  
  @IsString()
  readonly appointmentDate!: string;

  @IsString()
  readonly appointmentStartAt!: string;

  @IsNumber()
  readonly appointmentStatus!: number;
}