export enum RoleEnum {
  "ADMIN" = 1,
  "GERENT" = 2,
  "STATS" = 3,
}

export class Role {
  private readonly _id: number;
  private readonly _name: string;

  constructor(value: RoleEnum | string | number) {
    const id = typeof value === "string" ? RoleEnum[value as keyof typeof RoleEnum] : (value as number);
    const name = typeof value === "string" ? value : RoleEnum[value as number];

    if (!name || !id || isNaN(Number(id))) {
      throw new Error(`ID o Nombre de rol no válido: ${value}`);
    }

    this._id = Number(id);
    this._name = String(name);
  }

  public getId(): number {
    return this._id;
  }

  public getName(): string {
    return this._name;
  }

  static create(value: RoleEnum | string | number): Role {
    return new Role(value);
  }
}