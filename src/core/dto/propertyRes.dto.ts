import { Property } from "../entity/property.entity";

export class PropertyResponseDTO{
  readonly id: string;
  readonly address: string;
  readonly serviceId: number;
  readonly statusId: number;
  readonly typeId: number;

  constructor(property: Property){
    this.id = property.getId();
    this.address = property.getAddress();
    this.serviceId = property.getServiceId();
    this.statusId = property.getStatusId();
    this.typeId = property.getTypeId();
  }
}