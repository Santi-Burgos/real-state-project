import { Provider } from "../entity/provider.entity";

export interface IProviderRepository{
  create(provider: Provider): Promise<Provider | null>;

  update(provider: Provider): Promise<Provider | null>;

  delete(providerId: string): Promise<number | null>;
  
  getAllProvider(): Promise<Provider[] | null>;

  findProviderById(providerId: string): Promise<Provider | null>;
}