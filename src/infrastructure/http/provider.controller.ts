import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./guards/auth.guard";
import { ProviderService } from "../../core/service/provider.service";
import { ProviderReqDTO, ProviderUpdateDTO } from "../../core/dto/providerReq.dto";
import { ProviderResDTO } from "../../core/dto/providerRes.dto";
import { ApiResponse } from "../../core/dto/apiRes.dto";

@UseGuards(AuthGuard)
@Controller('provider')
export class ProviderController{
  constructor(
    private readonly providerService: ProviderService
  ){ }

  @Post()
  async createProvider(@Body() dataProvider: ProviderReqDTO){
    const createdProvider = await this.providerService.registerProvider(dataProvider);
    return ApiResponse.success(createdProvider, 'Created provider successfully');
  }

  @Get()
  async getAllProvider(){
    const getAllProviders = await this.providerService.findAllProvider();
    return ApiResponse.success(getAllProviders, 'Get providers successfully');
  }

  @Patch(':providerId')
  async updateProvider(@Param('providerId') providerId: string, @Body() dataProvider: ProviderUpdateDTO){
    const updatedProvider = await this.providerService.updateProvider(providerId, dataProvider);
    return ApiResponse.success(updatedProvider);
  }
  

  @Delete(':providerId')
  async deleteProvider(@Param('providerId') providerId: string){
    const deleteProvider = await this.providerService.deleteProvider(providerId)
    return ApiResponse.success(deleteProvider);
  }
}
