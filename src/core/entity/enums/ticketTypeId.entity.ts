export enum TicketTypeEnum {
  "MAINTENANCE" = 1,
  "COMPLAINT" = 2,
  "REQUEST" = 3,
  "OTHER" = 4
}

export class TicketType {
  private readonly _id: number;
  private readonly _name: string;

  constructor(value: TicketTypeEnum | string | number) {
    const id = typeof value === "string" ? TicketTypeEnum[value as keyof typeof TicketTypeEnum] : (value as number);
    const name = typeof value === "string" ? value : TicketTypeEnum[value as number];

    if (!name || !id || isNaN(id)) {
      throw new Error(`Id o nombre de tipo de ticket no válido: ${value}`);
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

  static create(value: TicketTypeEnum | string | number): TicketType {
    return new TicketType(value);
  }

  static ensure(value: TicketType | TicketTypeEnum | string | number): TicketType {
    if (value && typeof value === 'object' && '_id' in value) {
      return value as TicketType;
    }
    return new TicketType(value);
  }
}