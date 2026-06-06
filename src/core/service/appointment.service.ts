import { Inject } from "@nestjs/common";
import { IAppointmentRepository } from "../domain/appointment.interface";
import { IException } from "../domain/exception.interface";

export class AppointmentService{
  constructor(
    @Inject('') private readonly appointmentRepository: IAppointmentRepository,
    @Inject('IException') private readonly exception: IException,
  ){ }

  async createAppointment(): Promise<string>{
    return ""
  }

  async modifyAppointment(): Promise<void>{

  }

  async findAllAppointments(): Promise<void>{

  }

  async deleteAppointments(): Promise<void>{
    
  }



}