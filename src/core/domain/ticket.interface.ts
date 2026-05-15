import { QueryParamDTO } from "../dto/queryParam.dto";
import { Ticket } from "../entity/ticket.entity"

export interface ITicketRepository{
  create(ticket: Ticket): Promise<Ticket | null>;

  findAll(filters: QueryParamDTO): Promise<Ticket[] | null>;

  findByTicketId(ticketId: string): Promise<Ticket | null>;
  
  findAllTicketsByCustomer(customerId: string): Promise<Ticket[] | null>

  updateTicket(updateTicket: Ticket): Promise<Ticket | null>

  createUniqueId(): Promise<string>;
  
  countTickets(): Promise<{totalTickets: number, ticketsPending: number, ticketsResolve: number, ticketsInProgress: number}>
}