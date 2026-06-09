import { Inject } from "@nestjs/common";
import { IAppointmentRepository } from "../../core/domain/appointment.interface";
import { Pool } from "pg";
import { AppointmentSimpleView } from "../../core/domain/appointmentSimpleView.interface";
import { Appointment } from "../../core/entity/appointments.entity";

export class SqlAppointmentRepository implements IAppointmentRepository {
  constructor(
    @Inject('PG_CONNECTION') private readonly conn: Pool
  ) { }

  async findAll(): Promise<AppointmentSimpleView[] | null> {
    const queryFindAll = `
      SELECT 
        a.status_appointment_id,
        a.appointments_start_at,
        a.appointments_date,
        c.email AS customer_email,
        u.username AS user_username,
		    p.property_address AS property_ubication
      FROM appointments a
      JOIN customer c
        ON c.customer_id = a.customer_id
      JOIN users u
        ON u.user_id = a.user_id
      JOIN property p
        ON p.property_id = a.property_id
    `;
    try {
      const { rows } = await this.conn.query(queryFindAll);
      if (rows == null) {
        return null;
      }

      return rows.map(row => ({
        propertyUbication: row.property_ubication,
        customerEmail: row.customer_email,
        username: row.user_username,
        appointmentDate: row.appointments_date,
        appointmentStartAt: row.appointments_start_at,
        appointmentStatus: row.status_appointment_id
      }))
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async registerAppointment(value: Appointment): Promise<Appointment> {
    const queryCreate = `
      INSERT INTO appointments(appointments_id, property_id, customer_id, user_id, status_appointment, appointments_date, appotinments_start_at)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`
    try {
      const { rows } = await this.conn.query(queryCreate, [
        value.getId(),
        value.getPropetyId(),
        value.getCustomerId(),
        value.getuserId(),
        value.getAppointmentStatusId(),
        value.getAppointmentDate(),
        value.getAppointmentStartAt()
      ])
      const valueRows = rows[0];

      return new Appointment(
        valueRows.property_id,
        valueRows.customer_id,
        valueRows.user_id,
        valueRows.status_appointment_id,
        valueRows.appointments_date,
        valueRows.appointments_start_at,
        valueRows.appointment_id
      )
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

}