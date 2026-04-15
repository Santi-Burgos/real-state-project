export enum TypeEnum {
    "HOUSE" = 1,
    "APARTMENT" = 2,
    "LAND" = 3,
}

export class PropertyType {
  private readonly _id: number;
  private readonly _name: string;
  constructor( value: TypeEnum | string | number){
    const id = typeof value === "string" ? TypeEnum[value as keyof typeof TypeEnum] : (value as number);
    const name = typeof value === "string" ? value : TypeEnum[value as number];
    if (!name || !id || isNaN(Number(id))) {
      throw new Error(`ID o Nombre de rol no válido: ${value}`);
    }
    this._id = id;
    this._name = name;
  }

  static create(value: TypeEnum | string | number): PropertyType {
    return new PropertyType(value);
  }
  public getName(): string {
    return this._name;
  }
  public getId(): number {
    return this._id;
  }
}