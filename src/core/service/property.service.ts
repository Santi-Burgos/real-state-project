import { Injectable, Inject } from '@nestjs/common';
import { Property } from '../entity/property.entity';
import type { IPropertyRepository }  from '../domain/property.interface';
import { CreatePropertyRequestDTO, UpdatePropertyRequestDTO } from '../dto/propertyReq.dto';
import { IException } from '../domain/exception.interface';
import { UploadedFileDTO } from '../dto/typesPropertyImg.dto';
import { PropertyImage } from '../entity/propertyImages.entity';
import { PropertySimpleViewResDTO } from '../dto/propertyRes.dto';
import { constants } from 'fs';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class PropertyService {
  constructor(
    @Inject('IPropertyRepository') private readonly propertyRepository: IPropertyRepository,
    @Inject('IException') private readonly exception: IException
  ){}

  async createProperty(propertyToCreate: CreatePropertyRequestDTO, files: UploadedFileDTO[]): Promise<Property> {
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
    
    const images = files.map((file, index) => new PropertyImage(
      file.path,
      file.fileName,
      index + 1
    ));

    await this.propertyRepository.create(newProperty, images);
    return newProperty;
  }

  async getAll(): Promise<PropertySimpleViewResDTO[]> {
    const propertyData = await this.propertyRepository.findAll();

    if(propertyData == null){
      return [];
    }

    return propertyData?.map(
      property => new PropertySimpleViewResDTO(property)
    );
  }

  async getById(id: string): Promise<PropertySimpleViewResDTO | null> {
    const findOnePropertyById = await this.propertyRepository.findById(id);
    if(findOnePropertyById?.property == null){
      return null
    }

    return new PropertySimpleViewResDTO(findOnePropertyById)
  }

  // async updateProperty(id: string, dataToUpdate: UpdatePropertyRequestDTO): Promise<Property> {
  //   const existingProperty = await this.propertyRepository.findById(id);
  //   if (!existingProperty) {
  //     throw this.exception.NotFoundException(`La propiedad: ${id} no existe.`);
  //   }
    
  //   existingProperty.property?.updateEntity(dataToUpdate);
  //   const updateProperty = await this.propertyRepository.update(existingProperty);
    
  //   if(updateProperty == null){
  //     throw this.exception.BadRequestException("No se ha podido actualizar la propiedad");
  //   }

  //   return existingProperty;
  // }
  
  async deleteProperty(id: string): Promise<string> {
    const existingProperty = await this.propertyRepository.findById(id);
    if (!existingProperty) {
      throw this.exception.NotFoundException(`La propiedad: ${id} no existe.`);
    }

    const propertyImages = existingProperty?.propertyImage;
    if(propertyImages != null){
      for(const image of propertyImages){
        const filePath = path.join(__dirname, image.getUrlImage());
        console.log(filePath);
        try{
          await fs.access(filePath, constants.F_OK)      
          await fs.unlink(filePath);
        }catch(error){
          if (error && typeof error === 'object' && 'code' in error){
            continue;
          }
          throw this.exception.ConflictException('Cant delete images');
        }
      }
    }
    
    const rowsAffected = await this.propertyRepository.delete(id);
    const message = `Han sido afectadas ${rowsAffected} celdas`;
    return message;
  }
}