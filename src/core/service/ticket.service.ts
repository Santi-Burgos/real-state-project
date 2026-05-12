import { Inject, Injectable } from "@nestjs/common";
import { TicketResDTO } from "../dto/ticketRes.dto";
import { ITicketRepository } from "../domain/ticket.interface";
import { ticketReqDTO, ticketUpdateDTO } from "../dto/ticketReq.dto";
import { Ticket } from "../entity/ticket.entity";
import { IException } from "../domain/exception.interface";

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

  async findAllTicket(): Promise<TicketResDTO[]>{
    const allTickets = await this.ticketRepository.findAll();
    if(allTickets == null){
      return [];
    } 

    return allTickets.map(ticket => new TicketResDTO(ticket));
  }

  async getAllTicketByCustomer(customerId: string): Promise<TicketResDTO[]>{
    const ticketsByCustomer = await this.ticketRepository.findAllTicketsByCustomer(customerId);
    if(ticketsByCustomer == null){
      return [];
    }

    return ticketsByCustomer.map(ticket => new TicketResDTO(ticket));
  }

  async createTicket(request: ticketReqDTO): Promise<TicketResDTO>{
    console.log(request);
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