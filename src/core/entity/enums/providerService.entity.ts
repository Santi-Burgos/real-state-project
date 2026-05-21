export enum ProviderServiceEnum {

}

export class ProviderServiceType{
  private readonly _id: number;
  private readonly _name: string;

  constructor(value: ProviderServiceEnum | string | number){
    const id = typeof value === "string" ? ProviderServiceEnum[value as keyof typeof ProviderServiceEnum] : (value as number);
    const name = typeof value === "string" ? value : ProviderServiceEnum[value as number];
    
    if(!name || !id || !isNaN(Number(id))){
      throw new Error(`ID o Nombre de rol no válido: ${value}`);
    }

    this._id = Number(id);
    this._name = String(name);
  }
  
  static create(value: ProviderServiceEnum | string | number): ProviderServiceType {
    return new ProviderServiceType(value);
  }
  
  public getId(): number {
    return this._id;
  }
  
  public getName(): string {
    return this._name;
  }
  
  static ensure(value: ProviderServiceType | ProviderServiceEnum | string | number ) : ProviderServiceType{
    if(value && typeof value === 'object' && '_id' in value){
      return value as ProviderServiceType;
    }
    return new ProviderServiceType(value);
  }
}