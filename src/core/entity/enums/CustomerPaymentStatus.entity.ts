export enum CustomerPaymentStatusEnum{
  "NULL" = 0,
  "PENDING" = 1,
  "UNPAID" = 2,
  "PAID" = 3
}

export class CustomerPaymentStatus{
  private readonly _id: number;
    private readonly _name: string;
    
    constructor(value: CustomerPaymentStatusEnum | string | number){
      const id = typeof value === "string" ? CustomerPaymentStatusEnum[value as keyof typeof CustomerPaymentStatusEnum]  : (value as number);
      const name = typeof value === "string" ? value : CustomerPaymentStatusEnum[value as number];
    
      if(!name || isNaN(id)){
        throw new Error(`Id o nombre de rol no válido: ${value}`);
      }
    
      this._id = Number(id);
      this._name = String(name);
    }
  
    public getId():  number{
      return this._id;
    }
  
    public getName(): string{
      return this._name;
    }
  
    static create(value: CustomerPaymentStatusEnum | string | number): CustomerPaymentStatus{
      return new CustomerPaymentStatus(value);
    }
  
    static ensure(value: CustomerPaymentStatus | CustomerPaymentStatusEnum | string | number): CustomerPaymentStatus {
      if (value && typeof value === 'object' && '_id' in value) {
        return value as CustomerPaymentStatus;
      }
      return new CustomerPaymentStatus(value);
    }
}