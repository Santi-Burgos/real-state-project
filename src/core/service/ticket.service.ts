import { Inject, Injectable } from "@nestjs/common";
import { TicketResDTO } from "../dto/ticketRes.dto";
import { ITicketRepository } from "../domain/ticket.interface";
import { ticketReqDTO, ticketUpdateDTO } from "../dto/ticketReq.dto";
import { Ticket } from "../entity/ticket.entity";
import { IException } from "../domain/exception.interface";
import { QueryParamDTO } from "../dto/queryParam.dto";
import { TicketCountRowsRes } from "../dto/ticketCountRowsRes.dto";
import { count } from "console";

@Injectable()
export class TicketService{
  constructor(
    @Inject('ITicketRepostiory') private readonly ticketRepository: ITicketRepository,
    @Inject('IException') private readonly exception: IException
  ){ }

  async updateTicket(ticketId: string, updateTicket: ticketUpdateDTO): Promise<TicketResDTO>{ 
    const ticketOnDB = await this.ticketRepository.findByTicketId(ticketId);
    if(!ticketOnDB){
      this.exception.NotFoundException('Ticket no encontrado');
    }
    ticketOnDB.merge(updateTicket);
    await this.ticketRepository.updateTicket(ticketOnDB);

    return new TicketResDTO(ticketOnDB)
  }

  async getOneTicket(ticketId: string): Promise<TicketResDTO>{
    const ticket = await this.ticketRepository.findByTicketId(ticketId);
    if(!ticket){
      this.exception.NotFoundException('Ticket no encontrado')
    }
    return new TicketResDTO(ticket);
  }

  async findAllTicket(queryParam: QueryParamDTO): Promise<{tickets: TicketResDTO[], counts: TicketCountRowsRes}>{
    const countTicket = await this.ticketRepository.countTickets();

    const countTicketRes = new TicketCountRowsRes(
      countTicket.totalTickets,
      countTicket.ticketsPending,
      countTicket.ticketsInProgress,
      countTicket.ticketsResolve
    );
    const allTickets = await this.ticketRepository.findAll(queryParam);
    
    if(allTickets == null){
      return {
        tickets: [],
        counts: countTicketRes
      };
    } 

    return {
      tickets: allTickets.map(ticket => new TicketResDTO(ticket)),
      counts: countTicketRes
    };
  }

  async getAllTicketByCustomer(customerId: string): Promise<TicketResDTO[]>{
    const ticketsByCustomer = await this.ticketRepository.findAllTicketsByCustomer(customerId);
    if(ticketsByCustomer == null){
      return [];
    }

    return ticketsByCustomer.map(ticket => new TicketResDTO(ticket));
  }

  async createTicket(request: ticketReqDTO): Promise<TicketResDTO>{
    const ticketId = await this.ticketRepository.createUniqueId();
    const ticket = new Ticket(
      request.title,
      request.description,
      ticketId,
      request.ticketStatusId,
      request.ticketTypeId,
      request.customerId,
    );
  
    await this.ticketRepository.create(ticket);
    return new TicketResDTO(ticket);
  }
}