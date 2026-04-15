export enum ServiceEnum {
    "RENTABLE" = 1,
    "ON SALE" = 2,
    "BOTH" = 3
}

export class PropertyService {
  private readonly _id: number;
  private readonly _name: string;
  constructor( value: ServiceEnum | string | number){
    const id = typeof value === "string" ? ServiceEnum[value as keyof typeof ServiceEnum] : (value as number);
    const name = typeof value === "string" ? value : ServiceEnum[value as number];
    if (!name || !id || isNaN(Number(id))) {
      throw new Error(`ID o Nombre de Service no válido: ${value}`);
    }
    this._id = id;
    this._name = name;
  }

  static create(value: ServiceEnum | string | number): PropertyService {
    return new PropertyService(value);
  }
  public getName(): string {
    return this._name;
  }
  public getId(): number {
    return this._id;
  }
}
