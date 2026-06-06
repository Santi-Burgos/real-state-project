export enum AppointmentStatusEnum{
  "PENDING" = 1,
  "CANCEL" = 2,
  "APPROVED" = 3, 
  "FINISHED" = 4,
}

export class AppointmentStatus{
  private readonly _id: number;
  private readonly _name: string;

  constructor(value: AppointmentStatusEnum | string | number){
    const id = typeof value === "string" ? AppointmentStatusEnum[value as keyof typeof AppointmentStatusEnum]  : (value as number);
    const name = typeof value === "string" ? value : AppointmentStatusEnum[value as number];
  
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

  static create(value: AppointmentStatusEnum | string | number): AppointmentStatus{
    return new AppointmentStatus(value);
  }

  static ensure(value: AppointmentStatus | AppointmentStatusEnum | string | number): AppointmentStatus {
    if (value && typeof value === 'object' && '_id' in value) {
      return value as AppointmentStatus;
    }
    return new AppointmentStatus(value);
  }
}