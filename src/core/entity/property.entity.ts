import { v4 as uuidv4 } from 'uuid';
import { PropertyService } from "../entity/enums/service.entity"
import { PropertyStatus } from "../entity/enums/status.entity"
import { PropertyType } from "../entity/enums/type.entity"
import { UpdatePropertyRequestDTO } from '../dto/propertyReq.dto';

export class Property{
  private _id: string;
  private _address: string;
  private _service: PropertyService;
  private _status: PropertyStatus;
  private _type: PropertyType;

  constructor(
    address: string,
    service: PropertyService,
    status: PropertyStatus,
    type: PropertyType,
    id?: string
  ){
    this._id = id ?? uuidv4();
    this._address = address;
    this._service = service;
    this._status = status;
    this._type = type;
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

  public setAddress(address: string){
    if(!address || address.length == 0){
      throw new Error("Invalid address!")
    }
    this._address = address;
  }

  public setService(value: PropertyService | string | number) {
    this._service = value instanceof PropertyService ? value : new PropertyService(value);
  }
  public setStatus(value: PropertyStatus | string | number) {
    this._status = value instanceof PropertyStatus ? value : new PropertyStatus(value);
  }
  public setType(value: PropertyType | string | number) {
    this._type = value instanceof PropertyType ? value : new PropertyType(value);
  }

  public updateEntity(data: UpdatePropertyRequestDTO): void {
    if(data.address){ this._address = data.address; }
    if(data.serviceId){ this.setService(data.serviceId) }
    if(data.statusId){ this.setStatus(data.statusId) }
    if(data.typeId){ this.setType(data.typeId) }
  }
}