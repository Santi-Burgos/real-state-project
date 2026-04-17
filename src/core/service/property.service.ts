import { Injectable, Inject } from '@nestjs/common';
import { Property } from '../entity/property.entity';
import type { IPropertyRepository }  from '../domain/property.interface';
import { CreatePropertyRequestDTO, UpdatePropertyRequestDTO } from '../dto/propertyReq.dto';

@Injectable()
export class PropertyService {
  constructor(
    @Inject('IPropertyRepository') 
    private readonly propertyRepository: IPropertyRepository
  ) {}

  async createProperty(propertyToCreate: CreatePropertyRequestDTO): Promise<Property> {
    const newProperty = new Property(
      propertyToCreate.address,
      propertyToCreate.serviceId as any, //tipo object ServiceEntity
      propertyToCreate.statusId as any, 
      propertyToCreate.typeId as any
    );
    return await this.propertyRepository.create(newProperty);
  }

  async getAll(): Promise<Property[]> {
    return await this.propertyRepository.findAll();
  }
  async getById(id: string): Promise<Property | null> {
    return await this.propertyRepository.findById(id);
  }

  async updateProperty(id: string, dataToUpdate: UpdatePropertyRequestDTO): Promise<Property> {
    const existingProperty = await this.propertyRepository.findById(id);
    if (!existingProperty) {
      throw new Error(`La propiedad: ${id} no existe.`);
    }

    existingProperty.updateEntity(dataToUpdate);

    return await this.propertyRepository.update(existingProperty);
  }
  
  async deleteProperty(id: string): Promise<boolean> {
    const existingProperty = await this.propertyRepository.findById(id);
    if (!existingProperty) {
      throw new Error(`La propiedad: ${id} no existe.`);
    }

    return await this.propertyRepository.delete(id);
  }
}