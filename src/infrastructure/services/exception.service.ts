import { IException } from "../../core/domain/exception.interface";
import { ExceptionMessage } from "../../core/entity/exception.entity";
import { BadRequestException, ConflictException, ForbiddenException, HttpStatus, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";

export class Exception implements IException {
  BadRequestException(message?: string): never {
    const error = new ExceptionMessage(
      message || "Bad request error",
      HttpStatus.BAD_REQUEST
    );
    throw new BadRequestException(error);
  }

  InternalServerErrorException(message?: string): never {
    const error = new ExceptionMessage(
      message || "Internal server error",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    throw new InternalServerErrorException(error);
  }

  ForbiddenException(message?: string): never {
    const error = new ExceptionMessage(
      message || "Forbidden",
      HttpStatus.FORBIDDEN
    );
    throw new ForbiddenException(error);
  }

  UnauthorizedException(message?: string): never {
    const error = new ExceptionMessage(
      message || "Unauthorized",
      HttpStatus.UNAUTHORIZED
    );
    throw new UnauthorizedException(error);
  }

  NotFoundException(message?: string): never {
    const error = new ExceptionMessage(
      message || "Not Found",
      HttpStatus.NOT_FOUND
    );
    throw new NotFoundException(error);
  }

  ConflictException(message?: string): never {
    const error = new ExceptionMessage(
      message || "Conflict",
      HttpStatus.CONFLICT
    );
    throw new ConflictException(error);
  }
}