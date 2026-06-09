import { AppointmentStatus } from "../entity/enums/appointmentStatus.entity";

export interface AppointmentSimpleView{
  propertyUbication: string,
  customerEmail: string,
  username: string,
  appointmentDate: string,
  appointmentStartAt: string,
  appointmentStatus: AppointmentStatus
}