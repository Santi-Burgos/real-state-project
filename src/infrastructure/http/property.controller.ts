import { Controller, Post, Get, Patch, Delete, Body, Param, UploadedFile, ParseFilePipe, MaxFileSizeValidator, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PropertyService } from '../../core/service/property.service';
import { CreatePropertyRequestDTO, UpdatePropertyRequestDTO } from '../../core/dto/propertyReq.dto';
import { ApiResponse } from '../../core/dto/apiRes.dto';
import { MulterOptions } from './multer/multer.config';
import { UploadedFileDTO } from '../../core/dto/typesPropertyImg.dto';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }

  @Get()
  async getAll() {
    const getAllProperties = await this.propertyService.getAll();
    return ApiResponse.success(getAllProperties, "Get properties successfully");
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const getPropertyById = await this.propertyService.getById(id);
    return ApiResponse.success(getPropertyById, "Get property successfully");
  }

  @Post()
  @UseInterceptors(FilesInterceptor(
    'images', 
    10,
    MulterOptions
  ))
  async create(
    @Body() createPropertyDto: CreatePropertyRequestDTO,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 }),
        ]
      })
    ) files: Express.Multer.File[]){
    const uploadedImages: UploadedFileDTO[] =
      files.map(file => ({
        buffer: file.buffer,
        path: file.path,
        fileName: file.filename,
        mimeType: file.mimetype,
      }));
    const createdProperty = await this.propertyService.createProperty(createPropertyDto, uploadedImages);
    return ApiResponse.success(createdProperty, "Create property successfully");
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyRequestDTO
  ) {
    const updatedPropety = await this.propertyService.updateProperty(id, updatePropertyDto);
    return ApiResponse.success(updatedPropety, "Updated property successfully")
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedProperty = await this.propertyService.deleteProperty(id);
    return ApiResponse.success(deletedProperty);
  }
}