export class TicketCountRowsRes{
  readonly ticketsQuantity: number;
  readonly ticketsPending: number;
  readonly ticketsInProgress: number;
  readonly ticketsResolve: number;

  constructor(ticketQuantity: number, ticketPending: number, ticketInProgress: number, ticketResolve: number){
    this.ticketsQuantity = ticketQuantity;
    this.ticketsPending = ticketPending;
    this.ticketsInProgress = ticketInProgress;
    this.ticketsResolve = ticketResolve
  }
}