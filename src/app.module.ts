import { Module } from '@nestjs/common';
import { UserService } from './core/service/user.service';
import { SqlUserRepository } from './infrastructure/persistence/sqlUser.repository';
import { JwtService } from './infrastructure/services/jwt.service';
import { Exception } from './infrastructure/services/exception.service';
import { UserController } from './infrastructure/http/user.controller';
import { PropertyController } from './infrastructure/http/property.controller';
import { Encrypted } from './infrastructure/services/bcrypt.service';
import { DatabaseModule } from './infrastructure/persistence/config/db.module';
import { AuthController } from './infrastructure/http/auth.controller';
import { AuthService } from './core/service/auth.service';
import { CustomerService } from './core/service/customer.service';
import { SqlCustomerRepository } from './infrastructure/persistence/sqlCustomer.respostory';
import { CustomerController } from './infrastructure/http/customer.controller';
import { QueryBuilder } from './infrastructure/helper/queryBuilder.helper';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, AuthController, CustomerController],
  providers: [
    UserService,
    AuthService,
    CustomerService,
    QueryBuilder,
    {
      provide: 'IUserRepository',
      useClass: SqlUserRepository
    },
    {
      provide: 'ICustomerRepository',
      useClass: SqlCustomerRepository
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
