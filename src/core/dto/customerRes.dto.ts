import { Customer } from "../entity/customer.entity";

export class CustomerResDTO{
  readonly customerId: string;
  readonly customerEmail: string;
  readonly customerPhone: number;
  readonly customerName: string;
  readonly customerType: string;

  constructor(customer: Customer){
    this.customerId = customer.getId();
    this.customerEmail = customer.getEmail();
    this.customerPhone = customer.getPhone();
    this.customerName = customer.getCustomerName();
    this.customerType = customer.getCustomerTypeName();
  }
}