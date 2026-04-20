import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { PropertyService } from '../../core/service/property.service';
import { CreatePropertyRequestDTO, UpdatePropertyRequestDTO } from '../../core/dto/propertyReq.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async getAll() {
    return await this.propertyService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id:string) {
    return await this.propertyService.getById(id);
  }

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyRequestDTO) {
    try {
      return await this.propertyService.createProperty(createPropertyDto);
    } catch (err: any) {
      return { message: err.message };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyRequestDTO
  ){
    try {
      return await this.propertyService.updateProperty(id, updatePropertyDto);
    } 
    catch (err: any) {
      return { message: err.message };
    }
  }

  @Delete(':id')
  async delete( @Param('id') id: string ){
    try {
      return await this.propertyService.deleteProperty(id);
    } 
    catch (err: any) {
      return { message: err.message };
    }
  }
}