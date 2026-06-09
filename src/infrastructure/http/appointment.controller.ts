import { Body, Controller, Get, Post } from "@nestjs/common";
import { AppointmentService } from "../../core/service/appointment.service";
import { AppointmentReqDTO } from "../../core/dto/appointmenReq.dto";
import { ApiResponse } from "../../core/dto/apiRes.dto";

@Controller('appointments')
export class AppointmentController{
  constructor(private readonly appointmentService: AppointmentService){ }

  @Post()
  async createAppointment(@Body() body: AppointmentReqDTO){
    const appointment = await this.appointmentService.createAppointment(body);
  }

  @Get()
  async findAllAppointments(){
    const allAppointments = await this.appointmentService.findAllAppointments();
    return ApiResponse.success(allAppointments, 'OK');
  }
}