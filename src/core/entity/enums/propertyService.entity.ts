export enum ServiceEnum {
  "ON_SALE" = 1,
  "RENTABLE" = 2,
  "BOTH" = 3
}

export class PropertyService {
  private readonly _id: number;
  private readonly _name: string;

  constructor( value: ServiceEnum | string | number){
    const id = typeof value === "string" ? ServiceEnum[value as keyof typeof ServiceEnum] : (value as number);
    const name = typeof value === "string" ? value : ServiceEnum[value as number];
    if (!name || !id || isNaN(Number(id))) {
      throw new Error(`ID o Nombre de Service no válido en propertyService: ${value}`);
    }
    this._id = Number(id);
    this._name = String(name);
  }

  static create(value: ServiceEnum | string | number): PropertyService {
    return new PropertyService(value);
  }

  public getId(): number {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  static ensure(value: PropertyService | ServiceEnum | string | number ) : PropertyService{
    if(value && typeof value === 'object' && '_id' in value){
      return value as PropertyService;
    }
    return new PropertyService(value);
  }
}
