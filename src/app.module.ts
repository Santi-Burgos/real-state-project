import { Module } from '@nestjs/common';
import { UserService } from './core/service/user.service';
import { SqlUserRepository } from './infractructure/persistence/sqlUserRepository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: SqlUserRepository
    }
  ],
})
export class AppModule {}
