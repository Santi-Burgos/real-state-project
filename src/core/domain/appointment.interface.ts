import { Appointment } from "../entity/appointments.entity";

export interface IAppointmentRepository{
  findAll(): Promise<Appointment | null>;

  registerAppointment(): Promise<Appointment>;

  modifyAppointment(): Promise<Appointment>;

  deleteAppointment(): Promise<number>;

  viewSpecificAppointment(): Promise<object>; //definir correctamente
}