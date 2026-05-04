export enum CustomerTypeEnum{
  "TENANT" = 1,
  "BUYER" = 2, 
  "PROSPECTIVE TENANT" = 3,
  "PROSPECTIVE BUYER" = 4,
  "CUSTOMER" = 5
}

export class CustomerType {
  private readonly _id: number;
  private readonly _name: string;
  
  constructor(value: CustomerTypeEnum | string | number){
    const id = typeof value === "string" ? CustomerTypeEnum[value as keyof typeof CustomerTypeEnum]  : (value as number);
    const name = typeof value === "string" ? value : CustomerTypeEnum[value as number];
  
    if(!name || !id || isNaN(id)){
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

  static create(value: CustomerTypeEnum | string | number): CustomerType{
    return new CustomerType(value);
  }

  static ensure(value: CustomerType | CustomerTypeEnum | string | number): CustomerType {
    if (value && typeof value === 'object' && '_id' in value) {
      return value as CustomerType;
    }
    return new CustomerType(value);
  }
}