import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { PropertyService } from '../../core/service/property.service';
import { CreatePropertyRequestDTO, UpdatePropertyRequestDTO } from '../../core/dto/propertyReq.dto';
import { ApiResponse } from '../../core/dto/apiRes.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  async getAll() {
    const getAllProperties = await this.propertyService.getAll();
    return ApiResponse.success(getAllProperties, "Get properties successfully");
  }

  @Get(':id')
  async getById(@Param('id') id:string) {
    const getPropertyById = await this.propertyService.getById(id);
    return ApiResponse.success(getPropertyById, "Get property successfully");
  }

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyRequestDTO) {
    const createdProperty = await this.propertyService.createProperty(createPropertyDto);
    return ApiResponse.success(createPropertyDto, "Create property successfully");
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyRequestDTO
  ){
    const updatedPropety = await this.propertyService.updateProperty(id, updatePropertyDto);
    return ApiResponse.success(updatedPropety, "Updated property successfully")
  }

  @Delete(':id')
  async delete( @Param('id') id: string ){
    const deletedProperty = await this.propertyService.deleteProperty(id);
    return ApiResponse.success(deletedProperty);
  }
}