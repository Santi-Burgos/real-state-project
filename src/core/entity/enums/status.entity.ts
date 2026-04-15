export enum StatusEnum {
    "AVAILABLE" = 1,
    "SOLD" = 2,
    "RENTED" = 3,
    "MAINTENANCE" = 4
}


export class PropertyStatus {
  private readonly _id: number;
  private readonly _name: string;
  constructor( value: StatusEnum | string | number){
    const id = typeof value === "string" ? StatusEnum[value as keyof typeof StatusEnum] : (value as number);
    const name = typeof value === "string" ? value : StatusEnum[value as number];
    if (!name || !id || isNaN(Number(id))) {
      throw new Error(`ID o Nombre de Status no válido: ${value}`);
    }
    this._id = id;
    this._name = name;
  }

  static create(value: StatusEnum | string | number): PropertyStatus {
    return new PropertyStatus(value);
  }
  public getName(): string {
    return this._name;
  }
  public getId(): number {
    return this._id;
  }
}
