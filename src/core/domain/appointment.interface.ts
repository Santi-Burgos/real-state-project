import { Appointment } from "../entity/appointments.entity";

export interface IAppointmentRepository{
  findAll(): Promise<Appointment | null>;

  registerAppointment(valeu: Appointment): Promise<Appointment>;

  modifyAppointment(): Promise<Appointment>;

  deleteAppointment(value: string): Promise<number>;

  viewSpecificAppointment(): Promise<object>; //definir correctamente
}