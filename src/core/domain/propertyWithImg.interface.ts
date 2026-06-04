import { Property } from "../entity/property.entity";
import { PropertyImage } from "../entity/propertyImages.entity";

export interface PropertyWithImages{
  property: Property | null, 
  propertyImage: PropertyImage[] | null;
}