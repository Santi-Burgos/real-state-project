import { Inject } from "@nestjs/common";
import { ITicketRepository } from "../../core/domain/ticket.interface";
import { Pool } from "pg";
import { Ticket } from "../../core/entity/ticket.entity";

export class SqlTicketRepository implements ITicketRepository {
  constructor(
    @Inject('PG_CONNECTION') private readonly conn: Pool,
  ) { }

  private mapToEntity(row: any): Ticket | null {
    if (!row) return null;
    return new Ticket(
      row.ticket_title,
      row.ticket_description,
      row.ticket_status_id,
      row.ticket_type_id,
      row.customer_id,
      row.created_at,
      row.ticket_id
    );
  }

  async create(ticket: Ticket): Promise<Ticket | null> {
    const queryCreate = `
      INSERT INTO tickets(
        ticket_id,
        ticket_title,
        ticket_description, 
        created_at, 
        ticket_status_id, 
        ticket_type_id, 
        customer_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`
    try {
      const { rows } = await this.conn.query(queryCreate, [
        ticket.getId(),
        ticket.getTitle(),
        ticket.getDescription(),
        ticket.getCreatedAt(),
        ticket.getTicketStatusId(),
        ticket.getTicketTypeId(),
        ticket.getCustomerId()
      ])
      return this.mapToEntity(rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findAll(): Promise<Ticket[] | null> {
    const queryFindAll = `
      SELECT * FROM tickets
    `
    try {
      const { rows } = await this.conn.query(queryFindAll);
      return rows
        .map((row) => this.mapToEntity(row))
        .filter((ticket): ticket is Ticket => ticket !== null);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findByTicketId(ticketId: string): Promise<Ticket | null> {
    const queryTicketById = `
      SELECT * FROM ticket 
      WHERE ticket_id = $1
    `
    try {
      const { rows } = await this.conn.query(queryTicketById, [ticketId]);
      return this.mapToEntity(rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findAllTicketsByCustomer(customerId: string): Promise<Ticket[] | null> {
    const queryAllTicketCustomer = `
      SELECT * FROM tickets
      WHERE customer_id = $1
    `
    try {
      const { rows } = await this.conn.query(queryAllTicketCustomer, [customerId]);
      return rows
        .map(row => this.mapToEntity(row))
        .filter((ticket): ticket is Ticket => ticket !== null);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateTicket(ticket: Ticket): Promise<Ticket | null> {
    const queryUpdate = `
      UPDATE tickets
      SET ticket_title = $2,
      ticket_description = $3, 
      ticket_status_id = $4, 
      ticket_type_id = $5
      WHERE ticket_id = $1
      RETURNING *`
    try {
      const { rows } = await this.conn.query(queryUpdate, [
        ticket.getId(),
        ticket.getDescription(),
        ticket.getTicketStatusId(),
        ticket.getTicketTypeId()
      ])
      return this.mapToEntity(rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}