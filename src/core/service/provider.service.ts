import { Inject } from "@nestjs/common";
import { ProviderReqDTO, ProviderUpdateDTO } from "../dto/providerReq.dto";
import { Provider } from "../entity/provider.entity";
import { IProviderRepository } from "../domain/provider.interface";
import { IException } from "../domain/exception.interface";
import { ProviderResDTO } from "../dto/providerRes.dto";

export class ProviderService{
  constructor(
    @Inject('IProviderRepository') private readonly providerRespository: IProviderRepository,
    @Inject("IException") private readonly exception: IException
  ){ }

  async registerProvider(providerDate: ProviderReqDTO): Promise<ProviderResDTO>{
    const newProvider = new Provider(
      providerDate.providerEmail,
      providerDate.providerPhone,
      providerDate.providerName,
      providerDate.providerService
    );

    await this.providerRespository.create(newProvider); 
    return new ProviderResDTO(newProvider);
  }

  async deleteProvider(providerId: string): Promise<string>{
    const rowsAffected = await this.providerRespository.delete(providerId);
    if(rowsAffected == null){
      throw this.exception.BadRequestException("Error al eliminar provider");
    }

    return `Se han eliminado ${rowsAffected} celdas`;
  }

  async updateProvider(providerId: string, providerData: ProviderUpdateDTO): Promise<ProviderResDTO>{
    const foundProvider = await this.providerRespository.findProviderById(providerId);
    if(foundProvider == null){
      throw this.exception.BadRequestException("No se ha encontrado al proveedor para editar");
    }

    foundProvider.merge(providerData);
    await this.providerRespository.update(foundProvider);

    return new ProviderResDTO(foundProvider);
  }

  async findAllProvider(): Promise<ProviderResDTO[]>{
    const allProviders = await this.providerRespository.getAllProvider();
    if(allProviders == null){
      return []
    }
    return allProviders.map((provider) => new ProviderResDTO(provider));
  }

}