export class ExceptionMessage{
  private _message: string;
  private _status: number;

  public getMessage(): string{
    return this._message;
  }

  public getStatus(): number{
    return this._status;
  }

  constructor(message: string, status: number){
    this._message = message;
    this._status = status;
  }
}