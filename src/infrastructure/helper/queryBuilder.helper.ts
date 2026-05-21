import { Injectable, Param } from '@nestjs/common';
import { QueryParamDTO } from "../../core/dto/queryParam.dto";

@Injectable()
export class QueryBuilder {
  constructor() {}

  async customerFiltersToSql(filters: QueryParamDTO): Promise<{
    sql: string,
    params: any[] 
    count: string,
  }> {
    let baseQuery = `SELECT * FROM customer`;
    const countRows = `SELECT COUNT(*) AS total FROM customer`;
    const conditions: string[] = [];
    const values: any[] = [];
    

    if (filters.type?.startsWith("op_selector")
      && filters?.selector != ""
    ){
      values.push(filters?.selector);
      const index = values.length;
      
      if (filters.type === "op_selector_type") {
        conditions.push(`customer_type_id = $${index}`);
      } else {
        conditions.push(`status_payment_id = $${index}`);
      }
    }

    if (conditions.length > 0) {
      baseQuery += ` WHERE ` + conditions.join();
    }

    if (filters.type?.startsWith("op_sort")) {
      const direction = filters.sort?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
      const column = filters.type === "op_sort_name" ? 'customer_name' : 'created_at';
      baseQuery += ` ORDER BY ${column} ${direction}`;
    }

    return{
      sql: baseQuery,
      params: values,
      count: countRows
    };
  }

  async ticketsFilterToSql(filter: QueryParamDTO): Promise<{sql: string, params: any[]}>{
    let baseQuery = `SELECT * FROM TICKETS`;
    const conditions: string [] = [];
    const values: any[] = [];

    if (filter?.typeValue !== undefined && filter?.typeValue !== null){
      values.push(filter?.typeValue);
      conditions.push(`ticket_type_id = $${values.length}`);
    }
    if(filter?.selector){
      values.push(filter?.selector);
      conditions.push(`ticket_status_id = $${values.length}`)
    }

    if(conditions.length > 0){
      baseQuery += ` WHERE ` + conditions.join(` AND `);
    }

    return {
      sql: baseQuery,
      params: values
    };
  }
}