import { Inject } from "@nestjs/common";
import { ICustomerRespository } from "../../core/domain/customer.interface";
import { Pool } from "pg";
import { Customer } from "../../core/entity/customer.entity";
import { QueryBuilder } from "../helper/queryBuilder.helper";
import { QueryParamDTO } from "../../core/dto/queryParam.dto";

export class SqlCustomerRepository implements ICustomerRespository{
  constructor(
    private readonly queryBuilder: QueryBuilder,
    @Inject('PG_CONNECTION') private readonly conn: Pool,
  ) { }

  private mapToEntity(row: any): Customer | null {
    if (!row) return null;
    const valuePayment = row.status_payment_id === null ? 0 : row.status_payment_id
    return new Customer(
      row.email,
      row.phone,
      row.customer_name,
      row.customer_type_id,
      valuePayment,
      row.customer_id
    );
  }

  async createCustomer(customer: Customer): Promise<Customer | null> {
    const queryCreate = `
      INSERT INTO customer(customer_id, email, phone, customer_name, customer_type_id, status_payment_id)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    try {
      const { rows } = await this.conn.query(queryCreate, [
        customer.getId(),
        customer.getEmail(),
        customer.getPhone(),
        customer.getCustomerName(),
        customer.getCustomerTypeId(),
        customer.getCustomerPaymentStatusId()
      ]);
      return this.mapToEntity(rows[0]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async findCustomerById(id: string): Promise<Customer | null> {
    const queryFindCustomerById = `
      SELECT * FROM customer 
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
      SELECT * FROM customer 
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
      UPDATE customer 
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

  async findAllCustomer(filters: QueryParamDTO): Promise<{data: Customer[] | null, total: number}> {
    const { sql, params, count } = await this.queryBuilder.customerFiltersToSql(filters)
    try {
      const [dataResponse, countResponse] = await Promise.all([
        this.conn.query(sql, params),
        this.conn.query(count)
      ])

      const customers = dataResponse.rows
        .map((row)=>this.mapToEntity(row))
        .filter((customer): customer is Customer => customer !== null);
      
      return{
        data: customers,
        total: parseInt(countResponse?.rows[0]?.total)
      }
      
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