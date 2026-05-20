import { Inject } from "@nestjs/common";
import { ITicketRepository } from "../../core/domain/ticket.interface";
import { Pool } from "pg";
import { Ticket } from "../../core/entity/ticket.entity";
import { QueryParamDTO } from "../../core/dto/queryParam.dto";
import { QueryBuilder } from "../helper/queryBuilder.helper";
import { Exception } from "../services/exception.service";

export class SqlTicketRepository implements ITicketRepository {
  constructor(
    private readonly queryBuilder: QueryBuilder,
    private readonly exception: Exception,
    @Inject('PG_CONNECTION') private readonly conn: Pool,
  ) { }

  private mapToEntity(row: any): Ticket | null {
    if (!row) return null;
    return new Ticket(
      row.ticket_title,
      row.ticket_description,
      row.ticket_display_id,
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
        customer_id,
        ticket_display_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`
    try {
      const { rows } = await this.conn.query(queryCreate, [
        ticket.getId(),
        ticket.getTitle(),
        ticket.getDescription(),
        ticket.getCreatedAt(),
        ticket.getTicketStatusId(),
        ticket.getTicketTypeId(),
        ticket.getCustomerId(),
        ticket.getTicketDisplayId()
      ])
      return this.mapToEntity(rows[0]);
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

  async findAll(filters: QueryParamDTO): Promise<Ticket[] | null> {
    const { sql, params } = await this.queryBuilder.ticketsFilterToSql(filters);
    try {
      const { rows } = await this.conn.query(sql, params);
      return rows
        .map((row) => this.mapToEntity(row))
        .filter((ticket): ticket is Ticket => ticket !== null);
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
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
    }catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
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
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
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
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

  async createUniqueId(): Promise<string> {
    const query = `
      SELECT CONCAT('TK-', LPAD(nextval('tickets_display_id_seq')::text, 5, '0'))
      AS next_id;
    `;
    try {
      const { rows } = await this.conn.query(query);
      return rows[0].next_id; 
    } catch (err: any) {
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

  async countTickets(): Promise<{ totalTickets: number; ticketsPending: number; ticketsResolve: number; ticketsInProgress: number; }> {
    const queryGetTicketsCount = `
      SELECT 
        COUNT(*) FILTER (WHERE ticket_status_id = 1) AS total_pending,
        COUNT(*) FILTER (WHERE ticket_status_id = 2) AS total_inprogress,
        COUNT(*) FILTER (WHERE ticket_status_id = 3) AS total_resolved,
        COUNT(*) AS total_general
      FROM tickets
    `
    try{
      const { rows } = await this.conn.query(queryGetTicketsCount);
      return{
        totalTickets: rows[0].total_general,
        ticketsPending: rows[0].total_pending,
        ticketsInProgress: rows[0].total_inprogress,
        ticketsResolve: rows[0].total_resolved
      }
    }catch(err: any){
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

  async deleteTicket(ticketId: string): Promise<number | null> {
    const queryDelete = `
      DELETE FROM tickets
      WHERE ticket_id = $1`
    try{
      const { rowCount } = await this.conn.query(queryDelete, [ticketId]);
      return rowCount;
    }catch(err: any){
      throw this.exception.InternalServerErrorException("Error al obtener los resultados: " + err.message);
    }
  }

}