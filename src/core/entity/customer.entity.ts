import { CustomerReqUpdateDTO } from "../dto/customerReq.dto";
import { CustomerPaymentStatus } from "./enums/CustomerPaymentStatus.entity";
import { CustomerType } from "./enums/customerType.entity";
import { v4 as uuidv4 } from "uuid";

export class Customer {
  private _id: string;
  private _email: string;
  private _phone: number;
  private _customerName: string;
  private _customerTypeId: CustomerType;
  private _customerPaymentStatusId: CustomerPaymentStatus;
  private _customersQuantity: number;

  constructor(
    email: string,
    phone: number,
    customerName: string,
    customerTypeId: CustomerType | number | string,
    customerPaymentStatusId: CustomerPaymentStatus | number | string, 
    id?: string,
    customerQuantity?: number
  ) {
    this._id = id ?? uuidv4();
    this._customersQuantity = customerQuantity ?? 0;
    this._email = email;
    this._phone = phone;
    this._customerName = customerName;
    this._customerTypeId = CustomerType.ensure(customerTypeId);
    this._customerPaymentStatusId = CustomerPaymentStatus.ensure(customerPaymentStatusId);
  }

  public getId(): string{
    return this._id
  }

  public getEmail(): string{
    return this._email;
  }

  public setEmail(email: string): void{
    if (!email.includes('@')) {
      throw new Error("Email is not valid");
    }
    this._email = email;
  }

  public getPhone(): number{
    return this._phone;
  }

  public setPhone(phone: number): void{
    this._phone = phone;
  }

  public getCustomerName(): string{
    return this._customerName;
  }

  public setCustomerName(customerName: string): void{
    this._customerName = customerName;
  }

  public getCustomerTypeId(): number {
    return this._customerTypeId.getId();
  }

  public getCustomerTypeName(): string{
    return this._customerTypeId.getName();
  }

  public getCustomerPaymentStatusId(): number{
    return this._customerPaymentStatusId.getId();
  }

  public getCustomerPaymentStatusName(): string{
    return this._customerPaymentStatusId.getName();
  }

  public setCustomerType(customerTypeId: CustomerType | string | number): void{
    this._customerTypeId = customerTypeId instanceof CustomerType ? 
    customerTypeId : new CustomerType(customerTypeId);
  }

  public setCustomerStatusPayment(customerPaymentStatusId: CustomerPaymentStatus | string | number): void{
    this._customerPaymentStatusId = customerPaymentStatusId instanceof CustomerPaymentStatus ?
     customerPaymentStatusId : new CustomerPaymentStatus(customerPaymentStatusId);
  }


  public mergeUpdateCustomer(request: CustomerReqUpdateDTO): void{
    if(request.email) this.setEmail(request.email);
    if(request.phone) this.setPhone(request.phone); 
    if(request.customerName) this.setCustomerName(request.customerName);
    if(request.customerType) this.setCustomerType(request.customerType);
    if(request.customerStatusPayment) this.setCustomerStatusPayment(request.customerStatusPayment);
  }
}