import { v4 as uuidv4 } from 'uuid';
import { PropertyService } from "./enums/propertyService.entity"
import { PropertyStatus } from "../entity/enums/status.entity"
import { PropertyType } from "../entity/enums/type.entity"
import { UpdatePropertyRequestDTO } from '../dto/propertyReq.dto';

export class Property{
  private _id: string;
  private _address: string;
  private _service: PropertyService;
  private _status: PropertyStatus;
  private _type: PropertyType;
  private _bathQuantity: number;
  private _roomQuantity: number;
  private _electricityService: boolean;
  private _waterService: boolean;
  private _internetService: boolean;

  constructor(
    address: string,
    service: PropertyService | number | string,
    status: PropertyStatus | number | string,
    type: PropertyType | number | string,
    bathQuantity: number,
    roomQuantity: number,
    electricityService: boolean,
    waterService: boolean,
    internetService: boolean,
    id?: string
  ){
    this._id = id ?? uuidv4();
    this._address = address;
    this._service = PropertyService.ensure(service);
    this._status = PropertyStatus.ensure(status);
    this._type = PropertyType.ensure(type);
    this._bathQuantity = bathQuantity;
    this._roomQuantity = roomQuantity;
    this._electricityService = electricityService;
    this._waterService = waterService;
    this._internetService = internetService;
  }

  public getId(): string{
    return this._id;
  }
  public getAddress(): string{
    return this._address;
  }

  public getServiceId(): number{
    return this._service.getId();
  }
  public getServiceName(): string{
    return this._service.getName();
  }

  public getStatusId(): number{
    return this._status.getId();
  }
  public getStatusName(): string{
    return this._status.getName();
  }

  public getTypeId(): number{
    return this._type.getId();
  }
  public getTypeName(): string{
    return this._type.getName();
  }

  public setAddress(address: string): void{
    if(!address || address.length == 0){
      throw new Error("Invalid address!")
    }
    this._address = address;
  }

  public getBathQuantity(): number{
    return this._bathQuantity;
  }

  public setBathQuantity(value: number): void{
    this._bathQuantity = value;
  }

  public getRoomQuantity(): number{
    return this._roomQuantity;
  }

  public setRoomQuantity(value: number): void{
    this._roomQuantity = value;
  }  

  public getElectricityService(): boolean{
    return this._electricityService;
  }

  public setElectricityService(value: boolean): void{
    this._electricityService = value;
  }

    public getWaterService(): boolean{
    return this._waterService;
  }

  public setWaterService(value: boolean): void{
    this._waterService = value;
  }

  public getInternetService(): boolean{
    return this._internetService;
  }

  public setInternetService(value: boolean): void{
    this._internetService = value;
  }
  
  public setService(value: PropertyService | string | number) {
    this._service = PropertyService.ensure(value);
  }
  public setStatus(value: PropertyStatus | string | number) {
    this._status = PropertyStatus.ensure(value);
  }
  public setType(value: PropertyType | string | number) {
    this._type = PropertyType.ensure(value);
  }

  public updateEntity(data: UpdatePropertyRequestDTO): void {
    if(data.address){ this._address = data.address; }
    if(data.serviceId){ this.setService(data.serviceId) }
    if(data.statusId){ this.setStatus(data.statusId) }
    if(data.typeId){ this.setType(data.typeId) }
  }
}