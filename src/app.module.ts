import { Module } from '@nestjs/common';
import { UserService } from './core/service/user.service';
import { SqlUserRepository } from './infrastructure/persistence/sqlUserRepository';
import { JwtService } from './infrastructure/services/jwt.service';
import { Exception } from './infrastructure/services/exception.service';
import { UserController } from './infrastructure/http/user.controller';
import { PropertyController } from './infrastructure/http/property.controller';
import { Encrypted } from './infrastructure/services/bcrypt.service';


@Module({
  imports: [],
  controllers: [UserController, PropertyController],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: SqlUserRepository
    },
    {
      provide: 'IJWTService',
      useClass: JwtService
    },
    {
      provide: 'IException',
      useClass: Exception
    },
    {
      provide: 'IEncrypted',
      useClass: Encrypted
    }
  ],
})
export class AppModule {}
