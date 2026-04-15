import {Property} from "../entity/property.entity"

export interface IPropertyRepository {
  save(property: Property): Promise<Property>;

  findAll(): Promise<Property[]>;

  findById(id: string): Promise<Property | null>;

  update(property: Property): Promise<Property>;
  
  delete(id: string): Promise<boolean>;
}