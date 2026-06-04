import {Property} from "../entity/property.entity"
import { PropertyImage } from "../entity/propertyImages.entity";
import { PropertyWithImages } from "./propertyWithImg.interface";

export interface IPropertyRepository {
  create(property: Property, images: PropertyImage[]): Promise<Property | null>;

  findAll(): Promise<PropertyWithImages[] | null>;

  findById(id: string): Promise<PropertyWithImages | null>;

  update(property: Property): Promise<Property | null>;
  
  delete(id: string): Promise<number | null>;
}