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
import { ProviderController } from './infrastructure/http/provider.controller';
import { ProviderService } from './core/service/provider.service';
import { SqlProviderRepository } from './infrastructure/persistence/sqlProvider.repository';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppointmentController } from './infrastructure/http/appointment.controller';
import { AppointmentService } from './core/service/appointment.service';
import { SqlAppointmentRepository } from './infrastructure/persistence/sqlAppointment.repository';

@Module({
  imports: [
    DatabaseModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: '/uploads'
    }),
    MulterModule.register({
      dest: './uploads'
    })
  ],
  controllers: [
    UserController, 
    AuthController, 
    CustomerController,
    TicketController,
    PropertyController,
    ProviderController,
    AppointmentController
  ],
  providers: [
    UserService,
    AuthService,
    CustomerService,
    QueryBuilder,
    TicketService,
    PropertyService,
    ProviderService,
    AppointmentService,
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
      provide: 'IProviderRepository',
      useClass: SqlProviderRepository
    },
    {
      provide: 'IAppointmentsRepository',
      useClass: SqlAppointmentRepository 
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
