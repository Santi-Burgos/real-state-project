export interface IException {
  BadRequestException(message?: string): never;

  InternalServerErrorException(message?: string): never;

  ForbiddenException(message?: string): never;

  UnauthorizedException(message?: string): never;

  NotFoundException(message?: string): never;

  ConflictException(message?: string): never;
}