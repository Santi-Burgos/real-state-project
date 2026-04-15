import { Injectable, Inject } from '@nestjs/common';
import { Property } from '../entity/property.entity';
import type { IPropertyRepository }  from '../domain/property.interface';
import { CreatePropertyRequestDTO } from '../dto/propertyReq.dto';

@Injectable()
export class PropertyService {
  constructor(
    @Inject('IPropertyRepository') 
    private readonly propertyRepository: IPropertyRepository
  ) {}

  async create(dto: CreatePropertyRequestDTO): Promise<Property> {
    const newProperty = new Property(
      dto.address,
      dto.serviceId as any, //  objeto ServiceEntity
      dto.statusId as any, 
      dto.typeId as any
    );
    return await this.propertyRepository.save(newProperty);
  }

  async getAll(): Promise<Property[]> {
    return await this.propertyRepository.findAll();
  }
}