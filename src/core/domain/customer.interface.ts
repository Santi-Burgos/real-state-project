import { QueryParamDTO } from "../dto/queryParam.dto";
import { Customer } from "../entity/customer.entity";

export interface ICustomerRespository{
  createCustomer(customer: Customer): Promise<Customer | null>;

  findCustomerById(customerId: string): Promise<Customer | null>;

  findAllCustomer(filters: QueryParamDTO): Promise<Customer[] | null>;

  findCustomerByPhone(customerPhone: number): Promise<Customer | null>;

  updateCustomer(customerId: string, customer: Customer): Promise<Customer | null>;

  deleteCustomerById(customerId: string): Promise<number>;
}