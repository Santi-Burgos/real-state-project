import { Controller, Post, Get, Body } from '@nestjs/common';
import { PropertyService } from '../../core/service/property.service';
import { CreatePropertyRequestDTO } from '../../core/dto/propertyReq.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyRequestDTO) {
    try {
      return await this.propertyService.create(createPropertyDto);
    } catch (err: any) {
      return { message: err.message };
    }
  }

  @Get()
  async getAll() {
    return await this.propertyService.getAll();
  }
}