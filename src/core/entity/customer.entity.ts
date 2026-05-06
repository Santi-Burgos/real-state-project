import { CustomerReqUpdateDTO } from "../dto/customerReq.dto";
import { CustomerType } from "./enums/customerType.entity";
import { v4 as uuidv4 } from "uuid";

export class Customer {
  private _id: string;
  private _email: string;
  private _phone: number;
  private _customerName: string;
  private _customerTypeId: CustomerType;

  constructor(
    email: string,
    phone: number,
    customerName: string,
    customerTypeId: CustomerType | number | string,
    id?: string
  ) {
    this._id = id ?? uuidv4();
    this._email = email;
    this._phone = phone;
    this._customerName = customerName;
    this._customerTypeId = CustomerType.ensure(customerTypeId);
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

  public setCustomerType(customerTypeId: CustomerType | string | number): void{
    this._customerTypeId = customerTypeId instanceof CustomerType ? 
    customerTypeId : new CustomerType(customerTypeId);
  }

  public getCustomerTypeName(): string{
    return this._customerTypeId.getName();
  }

  public mergeUpdateCustomer(request: CustomerReqUpdateDTO): void{
    if(request.email) this.setEmail(request.email);
    if(request.phone) this.setPhone(request.phone); 
    if(request.customerName) this.setCustomerName(request.customerName);
    if(request.customerType) this.setCustomerType(request.customerType);
  }
}