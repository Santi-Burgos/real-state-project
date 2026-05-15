import { Controller, Post, Body, Param, Get, Patch, Query } from "@nestjs/common";
import { TicketService } from "../../core/service/ticket.service";
import { ticketReqDTO, ticketUpdateDTO } from "../../core/dto/ticketReq.dto";
import { TicketResDTO } from "../../core/dto/ticketRes.dto";
import { QueryParamDTO } from "../../core/dto/queryParam.dto";
import { TicketCountRowsRes } from "../../core/dto/ticketCountRowsRes.dto";

@Controller('tickets')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService
  ) { }

  @Post()
  async create(@Body() ticket: ticketReqDTO): Promise<TicketResDTO> {
    return await this.ticketService.createTicket(ticket);
  }

  @Get()
  async findAll(@Query() queryParam: QueryParamDTO): Promise<{tickets: TicketResDTO[], counts: TicketCountRowsRes}> {
    return await this.ticketService.findAllTicket(queryParam);
  }

  @Get(':ticketId')
  async findByTicketId(@Param('ticketId') ticketId: string): Promise<TicketResDTO> {
    return await this.ticketService.getOneTicket(ticketId);
  }

  @Get('customer/:customerId')
  async findAllTicketsByCustomer(@Param('customerId') customerId: string): Promise<TicketResDTO[]> {
    return await this.ticketService.getAllTicketByCustomer(customerId);
  }

  @Patch(':ticketId')
  async update(@Param('ticketId') ticketId: string, @Body() ticket: ticketUpdateDTO): Promise<TicketResDTO> {
    return await this.ticketService.updateTicket(ticketId, ticket);
  }
}