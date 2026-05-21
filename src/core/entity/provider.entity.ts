import { v4 as uuidv4 } from "uuid";
import { ProviderServiceType } from "./enums/providerService.entity";

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
  ) {
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

  public getProviderService(): ProviderServiceType{ 
    return this._providerService; 
  }

  public setProviderService(providerService: ProviderServiceType): void{ 
    this._providerService = ProviderServiceType.ensure(providerService); 
  }
}