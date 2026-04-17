export interface IExeception{
  BadRequestExcepiton(message?: string): void;
  
  InternalServerErrorException(message?: string): void;
  
  ForbiddenException(message?:string): void;

  UnauthorizedException(message?:string):void;

  NotFoundException(message?:string): void;

  ConflictException(message?:string): void;
}