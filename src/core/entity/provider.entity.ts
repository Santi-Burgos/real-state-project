import { v4 as uuidv4 } from "uuid";
import { ProviderServiceType } from "./enums/providerService.entity";
import { ProviderUpdateDTO } from "../dto/providerReq.dto";

export class Provider {
  private _id: string;
  private _email: string;
  private _phone: number;
  private _providerName: string;
  private _providerService: ProviderServiceType;

  constructor(
    email: string,
    phone: number,
    providerName: string,
    providerService: ProviderServiceType | string | number,
    id?: string,
  ){
    this._id = id ?? uuidv4();
    this._email = email;
    this._phone = phone;
    this._providerName = providerName;
    this._providerService = ProviderServiceType.ensure(providerService);
  }

  public getId(): string{ 
    return this._id; 
  }

  public getEmail(): string{
    return this._email; 
  }

  public setEmail(email: string): void{ 
    if(!email.includes('@')){
      throw new Error('Esto no es un email');
    }
    this._email = email; 
  }

  public getPhone(): number{ 
    return this._phone; 
  }

  public setPhone(phone: number): void{ 
    this._phone = phone; 
  }

  public getProviderName(): string{ 
    return this._providerName; 
  }
  
  public setProviderName(providerName: string): void{ 
    this._providerName = providerName; 
  }

  public getProviderServiceId(): number{ 
    return this._providerService.getId(); 
  }

  public getProviderServiceName(): string{
    return this._providerService.getName();
  }

  public setProviderService(providerService: ProviderServiceType | number | string): void{ 
    this._providerService = ProviderServiceType.ensure(providerService); 
  }

  public merge(request: ProviderUpdateDTO): void{
    if(request.providerEmail) this.setEmail(request.providerEmail);
    if(request.providerPhone) this.setPhone(request.providerPhone);
    if(request.providerName) this.setProviderName(request.providerName);
    if(request.providerService) this.setProviderService(request.providerService);
  }
}