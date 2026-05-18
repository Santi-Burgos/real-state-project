import { ticketUpdateDTO } from "../dto/ticketReq.dto";
import { TicketStatusType } from "./enums/ticketStatus.entity";
import { TicketType } from "./enums/ticketTypeId.entity";
import { v4 as uuid } from 'uuid';

export class Ticket {
  private _id: string;
  private _description: string;
  private _title: string;
  private _createdAt: Date;
  private _customerId: string;
  private _ticketDisplayId: string;
  private _ticketStatusId: TicketStatusType;
  private _ticketTypeId: TicketType;

  constructor(
    title: string,
    description: string,
    ticketDisplayId: string,
    ticketStatusId: TicketStatusType | string | number,
    ticketTypeId: TicketType | string | number,
    customerId: string,
    createdAt?: Date,
    id?: string
  ) {
    this._title = title;
    this._description = description;
    this._ticketDisplayId = ticketDisplayId; 
    this._ticketStatusId = TicketStatusType.ensure(ticketStatusId);
    this._ticketTypeId = TicketType.ensure(ticketTypeId);
    this._customerId = customerId;
    this._createdAt = createdAt ?? new Date();
    this._id = id ?? uuid();
  }

  public getId(): string {
    return this._id;
  }

  public getTitle(): string{
    return this._title;
  }

  public setTitle(title: string): void{
    this._title = title;
  }

  public getDescription(): string {
    return this._description;
  }

  public setDescription(description: string): void {
    this._description = description;
  }

  public getTicketDisplayId(): string{
    return this._ticketDisplayId;
  }

  public setTicketDisplayId(ticketDisplayId: string): void{
    this._ticketDisplayId = ticketDisplayId;
  }

  public getCreatedAt(): Date {
    return this._createdAt;
  }

  public getCustomerId(): string {
    return this._customerId;
  }
  public setCustomerId(customerId: string): void {
    this._customerId = customerId;
  }

  public getTicketStatusId(): number{
    return this._ticketStatusId.getId();
  }

  public getTicketStatusName(): string{
    return this._ticketStatusId.getName();
  }

  public getTicketTypeId(): number {
    return this._ticketTypeId.getId();
  }

  public getTicketTypeName(): string {
    return this._ticketTypeId.getName();
  } 

  public setTicketType(ticketTypeId: TicketType | string | number): void {
    this._ticketTypeId = ticketTypeId instanceof TicketType
      ? ticketTypeId : new TicketType(ticketTypeId);
  }

  public setTicketStatusId(ticketStatusId: TicketStatusType | string | number): void {
    this._ticketStatusId = ticketStatusId instanceof TicketStatusType
      ? ticketStatusId : new TicketStatusType(ticketStatusId);
  }

  public merge(request: ticketUpdateDTO): void{
    if(request.description) this.setDescription(request.description);
    if(request.ticketStatusId) this.setTicketStatusId(request.ticketStatusId);
    if(request.ticketTypeId) this.setTicketType(request.ticketTypeId);
  }
}