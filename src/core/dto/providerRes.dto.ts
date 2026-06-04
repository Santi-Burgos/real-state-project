import { Provider } from "../entity/provider.entity";

export class ProviderResDTO{
  providerId: string;
  email: string;
  phone: number;
  name: string;
  serviceTypeId: string;

  constructor(provider: Provider){
    this.providerId = provider.getId();
    this.email = provider.getEmail();
    this.phone = provider.getPhone();
    this.name = provider.getProviderName();
    this.serviceTypeId = provider.getProviderServiceName();
  }
}