import { AppointmentStatus } from "../entity/enums/appointmentStatus.entity";
import { AppointmentSimpleView } from "../domain/appointmentSimpleView.interface";

export class AppointmentSimpleViewDTO{
  readonly customerEmail: string;
  readonly propertyUbication: string;
  readonly username: string;
  readonly appointmentDate: string;
  readonly appointmentStartAt: string;
  readonly appointmentStatus: AppointmentStatus

  constructor(
    data: AppointmentSimpleView
  ){
    this.customerEmail = data.customerEmail;
    this.propertyUbication = data.propertyUbication;
    this.username = data.username;
    this.appointmentDate = data.appointmentDate;
    this.appointmentStartAt = data.appointmentStartAt;
    this.appointmentStatus = data.appointmentStatus
  }

}