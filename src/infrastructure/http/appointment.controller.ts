import { Body, Controller, Post } from "@nestjs/common";
import { AppointmentService } from "../../core/service/appointment.service";
import { AppointmentReqDTO } from "../../core/dto/appointmenReq.dto";

@Controller('appointment')
export class AppointmentController{
  constructor(private readonly appointmentService: AppointmentService){ }

  @Post()
  async createAppointment(@Body() body: AppointmentReqDTO){
    const appointment = await this.appointmentService.createAppointment(body);
  }
}