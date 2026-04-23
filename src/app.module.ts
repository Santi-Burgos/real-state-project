import { Module } from '@nestjs/common';
import { UserService } from './core/service/user.service';
import { SqlUserRepository } from './infrastructure/persistence/sqlUserRepository';
import { JwtService } from './infrastructure/services/jwt.service';
import { Exception } from './infrastructure/services/exception.service';
import { UserController } from './infrastructure/http/user.controller';
import { PropertyController } from './infrastructure/http/property.controller';
import { Encrypted } from './infrastructure/services/bcrypt.service';
import { DatabaseModule } from './infrastructure/persistence/config/db.module';
import { AuthController } from './infrastructure/http/auth.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, AuthController],
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
export class AppModule { }
