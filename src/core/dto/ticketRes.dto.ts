import { Ticket } from "../entity/ticket.entity";

export class TicketResDTO {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  customerId: string;
  ticketStatusId: string;
  ticketTypeId: string;

  constructor(ticket: Ticket) {
    this.id = ticket.getId();
    this.title = ticket.getTitle();
    this.description = ticket.getDescription();
    this.createdAt = ticket.getCreatedAt();
    this.customerId = ticket.getCustomerId();
    this.ticketStatusId = ticket.getTicketStatusName();
    this.ticketTypeId = ticket.getTicketTypeName();
  }
}