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
import { SqlCustomerRepository } from './infrastructure/persistence/sqlCustomer.repostory';
import { CustomerController } from './infrastructure/http/customer.controller';
import { QueryBuilder } from './infrastructure/helper/queryBuilder.helper';
import { SqlTicketRepository } from './infrastructure/persistence/sqlTicket.repository';
import { TicketService } from './core/service/ticket.service';
import { TicketController } from './infrastructure/http/ticket.controller';
import { SqlPropertyRepository } from './infrastructure/persistence/sqlProperty.repository';
import { PropertyService } from './core/service/property.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [
    UserController, 
    AuthController, 
    CustomerController,
    TicketController,
    PropertyController
  ],
  providers: [
    UserService,
    AuthService,
    CustomerService,
    QueryBuilder,
    TicketService,
    PropertyService,
    Exception,
    {
      provide: 'IUserRepository',
      useClass: SqlUserRepository
    },
    {
      provide: 'ICustomerRepository',
      useClass: SqlCustomerRepository
    },
    {
      provide: 'ITicketRepostiory',
      useClass: SqlTicketRepository
    },
    {
      provide: 'IPropertyRepository',
      useClass: SqlPropertyRepository
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
