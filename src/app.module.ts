import { Module } from '@nestjs/common';
import { UserService } from './core/service/user.service';
import { SqlUserRepository } from './infrastructure/persistence/sqlUserRepository';
import { JwtService } from './infrastructure/security/jwt.provider';


@Module({
  imports: [],
  controllers: [],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: SqlUserRepository
    },
    {
      provide: 'IJWTService',
      useClass: JwtService
    }
  ],
})
export class AppModule {}
