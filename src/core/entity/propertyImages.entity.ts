export class PropertyImage{
  private _id: number | null;
  private _urlImage: string;
  private _nameImage: string;
  private _orderImage: number;

  constructor(
    urlImage: string,
    nameImage: string,
    orderImage: number,
    id?: number, 
  ){
    this._id = id ?? null;
    this._urlImage = urlImage;
    this._nameImage = nameImage;
    this._orderImage = orderImage;
  }

  public getId(): number | null{
    return this._id;
  }

  public setId(id: number): void{
    this._id = id;
  }

  public getUrlImage(): string{
    return this._urlImage;
  }

  public setUrlImage(value: string): void{
    this._urlImage = value;
  }

  public getNameImage(): string{
    return this._nameImage; 
  }

  public setNameImage(value: string): void{
    this._nameImage = value;
  }

  public getOrderImage(): number{
    return this._orderImage; 
  }

  public setOrderImage(value: number): void{
    this._orderImage = value;
  }
}