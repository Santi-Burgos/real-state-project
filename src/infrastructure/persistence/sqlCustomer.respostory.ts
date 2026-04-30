import { Inject } from "@nestjs/common";
import { ICustomerRespository } from "../../core/domain/customer.interface";
import { Pool } from "pg";
import { Customer } from "../../core/entity/customer.entity";

export class SqlCustomerRepository implements ICustomerRespository {
  constructor(
    @Inject('PG_CONNECTION') private readonly conn: Pool,
  ) { }

  private mapToEntity(row: any): Customer | null {
    if (!row) return null;
    return new Customer(
      row.email,
      row.phone,
      row.customerName,
      row.customerTypeId,
      row.customerId
    );
  }

  async createCustomer(customer: Customer): Promise<Customer | null> {
    const queryCreate = `
      INSERT INTO customers(customer_id, email, phone, customer_name, customer_type_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `;
    try {
      const { rows } = await this.conn.query(queryCreate, [
        customer.getId(),
        customer.getEmail(),
        customer.getPhone(),
        customer.getCustomerName(),
        customer.getCustomerTypeId()
      ]);
      return this.mapToEntity(rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findCustomerById(id: string): Promise<Customer | null> {
    const queryFindCustomerById = `
      SELECT * FROM customers 
      WHERE customer_id = $1
    `;
    try {
      const { rows } = await this.conn.query(queryFindCustomerById, [id]);
      return this.mapToEntity(rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findCustomerByPhone(phone: number): Promise<Customer | null> {
    const queryFindCustomerByPhone = `
      SELECT * FROM customers 
      WHERE phone = $1
    `;
    try {
      const { rows } = await this.conn.query(queryFindCustomerByPhone, [phone]);
      return this.mapToEntity(rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateCustomer(customerId: string, customer: Customer): Promise<Customer | null> {
    const queryUpdate = `
      UPDATE customers 
      SET email = $1, 
        phone = $2, 
        customer_name = $3, 
        customer_type_id = $4 
      WHERE customer_id = $5 
      RETURNING *
    `;
    try {
      const { rows } = await this.conn.query(queryUpdate, [
        customer.getEmail(),
        customer.getPhone(),
        customer.getCustomerName(),
        customer.getCustomerTypeId(),
        customerId
      ]);

      return this.mapToEntity(rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findAllCustomer(): Promise<Customer[] | null> {
    const queryFindAll = `
      SELECT * FROM customers
    `;
    try {
      const { rows } = await this.conn.query(queryFindAll);
      return rows
        .map((row) => this.mapToEntity(row))
        .filter((customer): customer is Customer => customer !== null);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async deleteCustomerById(customerId: string): Promise<number> {
    const queryDelete = `
      DELETE FROM customer
      WHERE customer_id = $1
    `;
    try {
      const { rowCount } = await this.conn.query(queryDelete, [customerId]);
      return rowCount ? rowCount : 0;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}