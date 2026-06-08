import { v4 as uuidv4} from "uuid";
import { AppointmentStatus } from "./enums/appointmentStatus.entity";

export class Appointment{
  private _id: string;
  private _propertyId: string;
  private _customerId: string;
  private _userId: string;
  private _appointmentDate: string; 
  private _appointmentStartAt: string;
  private _appointmentStatus: AppointmentStatus; 

  constructor(
    propertyId: string,
    customerId: string,
    userId: string, 
    appointmentDate: string, 
    appointmentStartAt: string, 
    appointmentStatus: AppointmentStatus | string | number,
    id?: string 
  ){ 
    this._id = id ?? uuidv4();
    this._propertyId = propertyId;
    this._customerId = customerId;
    this._userId = userId;
    this._appointmentDate = appointmentDate;
    this._appointmentStartAt = appointmentStartAt
    this._appointmentStatus = AppointmentStatus.ensure(appointmentStatus);
  }

  public getId(): string{
    return this._id;
  }

  public getPropetyId(): string{
    return this._propertyId;
  }

  public setPropertyId(value: string): void{
    this._propertyId = value;
  }

  public getCustomerId(): string{
    return this._customerId;
  }

  public setCustomerId(value: string): void{
    this._customerId = value;
  }

  public getuserId(): string{
    return this._userId;
  }

  public setUserId(value: string){
    this._userId = value;
  }

  public getAppointmentDate(): string{
    return this._appointmentDate;
  }

  public setAppointmentDate(value: string): void{
    this._appointmentDate = value;
  }

  public getAppointmentStartAt(): string{
    return this._appointmentStartAt;
  }

  public setAppointmentStartAt(value: string): void{
    this._appointmentStartAt = value;
  }

  public getAppointmentStatusId(): number{
    return this._appointmentStatus.getId();
  }

  public getAppointmentStatusName(): string{
    return this._appointmentStatus.getName();
  }

  public setAppointmentStatus(value: AppointmentStatus | string | number): void{
    this._appointmentStatus = AppointmentStatus.ensure(value);
  } 
}