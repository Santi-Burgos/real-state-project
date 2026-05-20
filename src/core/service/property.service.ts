import { Injectable, Inject } from '@nestjs/common';
import { Property } from '../entity/property.entity';
import type { IPropertyRepository }  from '../domain/property.interface';
import { CreatePropertyRequestDTO, UpdatePropertyRequestDTO } from '../dto/propertyReq.dto';
import { IException } from '../domain/exception.interface';

@Injectable()
export class PropertyService {
  constructor(
    @Inject('IPropertyRepository') private readonly propertyRepository: IPropertyRepository,
    @Inject('IException') private readonly exception: IException
  ) {}

  async createProperty(propertyToCreate: CreatePropertyRequestDTO): Promise<Property> {
    const newProperty = new Property(
      propertyToCreate.address,
      propertyToCreate.serviceId,
      propertyToCreate.statusId, 
      propertyToCreate.typeId,
      propertyToCreate.bathQuantity,
      propertyToCreate.roomQuantity,
      propertyToCreate.electricityService,
      propertyToCreate.waterService,
      propertyToCreate.internetService
    );

    await this.propertyRepository.create(newProperty);
    return newProperty;
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
      throw this.exception.NotFoundException(`La propiedad: ${id} no existe.`);
    }

    existingProperty.updateEntity(dataToUpdate);

    return await this.propertyRepository.update(existingProperty);
  }
  
  async deleteProperty(id: string): Promise<boolean> {
    const existingProperty = await this.propertyRepository.findById(id);
    if (!existingProperty) {
      throw this.exception.NotFoundException(`La propiedad: ${id} no existe.`);
    }

    return await this.propertyRepository.delete(id);
  }
}