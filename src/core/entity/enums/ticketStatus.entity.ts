export enum TicketStatus {
  "PENDING" = 1,
  "IN_PROGRESS" = 2,
  "RESOLVE" = 3,
  "REJECT" = 4
}

export class TicketStatusType {
  private readonly _id: number;
  private readonly _name: string;

  constructor(value: TicketStatus | string | number) {
    const id = typeof value === "string" ? TicketStatus[value as keyof typeof TicketStatus] : (value as number);
    const name = typeof value === "string" ? value : TicketStatus[value as number];

    if (!name || !id || isNaN(id)) {
      throw new Error(`Id o nombre de status de ticket no válido: ${value}`);
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

  static create(value: TicketStatus | string | number): TicketStatusType {
    return new TicketStatusType(value);
  }

  static ensure(value: TicketStatusType | TicketStatus | string | number): TicketStatusType {
    if (value && typeof value === 'object' && '_id' in value) {
      return value as TicketStatusType;
    }
    return new TicketStatusType(value);
  }
}