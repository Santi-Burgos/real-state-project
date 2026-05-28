import {Property} from "../entity/property.entity"
import { PropertyImage } from "../entity/propertyImages.entity";

export interface PropertyWithImages{
  property: Property | null, 
  propertyImage: PropertyImage[] | null;
}

export interface IPropertyRepository {
  create(property: Property, images: PropertyImage[]): Promise<Property | null>;

  findAll(): Promise<PropertyWithImages[] | null>;

  findById(id: string): Promise<Property | null>;

  update(property: Property): Promise<Property | null>;
  
  delete(id: string): Promise<number | null>;
}