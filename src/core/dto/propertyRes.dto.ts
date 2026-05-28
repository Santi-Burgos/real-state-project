import { PropertyWithImages } from "../domain/property.interface";

export class PropertySimpleViewResDTO {
  readonly id: string | null;
  readonly address: string | null;
  readonly serviceId: string | number | null;
  readonly statusId: number | string | null;
  readonly typeId: number | string | null;
  readonly imgUrl: string | null;
  readonly imgName: string | null;
  readonly quantityBath: number | null;
  readonly quantityRoom: number | null;

  constructor(pwi: PropertyWithImages | null) {
    this.id = pwi?.property?.getId() || null;
    this.address = pwi?.property?.getAddress() || null;
    this.serviceId = pwi?.property?.getServiceName() || null;
    this.statusId = pwi?.property?.getStatusName() || null;
    this.typeId = pwi?.property?.getTypeName() || null;
    this.quantityBath = pwi?.property?.getBathQuantity() || null;
    this.quantityRoom = pwi?.property?.getRoomQuantity() || null;
    this.imgUrl = pwi?.propertyImage?.[0]?.getUrlImage() || null;
    this.imgName = pwi?.propertyImage?.[0]?.getNameImage() || null;
  }
}