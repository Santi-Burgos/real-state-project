import { Inject } from "@nestjs/common";
import { IAppointmentRepository } from "../domain/appointment.interface";
import { IException } from "../domain/exception.interface";
import { Appointment } from "../entity/appointments.entity";
import { AppointmentReqDTO } from "../dto/appointmenReq.dto";
import { AppointmentSimpleViewDTO } from "../dto/appointmentRes.dto";

export class AppointmentService{
  constructor(
    @Inject('IAppointmentsRepository') private readonly appointmentRepository: IAppointmentRepository,
    @Inject('IException') private readonly exception: IException,
  ){ }

  async createAppointment( data: AppointmentReqDTO): Promise<Appointment>{
    const appointmentData = new Appointment(
      data.propertyId,
      data.customerId,
      data.userId,
      data.appointmentDate,
      data.appointmentStartAt,
      data.appointmentStatus
    );
    
    await this.appointmentRepository.registerAppointment(appointmentData);
    return appointmentData
  }

  async modifyAppointment(): Promise<void>{

  }

  async findAllAppointments(): Promise<AppointmentSimpleViewDTO[]>{
    const appointments = await this.appointmentRepository.findAll();
    if(appointments == null){
      return [];
    }
    return appointments.map(data => new AppointmentSimpleViewDTO(data));
  }

  // async deleteAppointments(appointmentId: string): Promise<string>{
  //   const rowsAffected = await this.appointmentRepository.deleteAppointment(appointmentId);
  //   return "Cita eliminada, celdas affectadas: " + rowsAffected;
  // }
}