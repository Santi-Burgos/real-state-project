import { Property } from "../entity/property.entity";

export class PropertySimpleViewResDTO{
  readonly id: string;
  readonly address: string;
  readonly serviceId: string | number;
  readonly statusId: number | string;
  readonly typeId: number | string;
  readonly imgUrl: string;
  readonly imgName: string;
  readonly quantityBath: number;
  readonly quantityRoom: number

  constructor(property: Property){
    this.id = property.getId();
    this.address = property.getAddress();
    this.serviceId = property.getServiceName();
    this.statusId = property.getStatusName();
    this.typeId = property.getTypeName();
  }
}