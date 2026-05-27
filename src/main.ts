import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common'; 
import { NestFactory } from '@nestjs/core';
import { AllExceptionFilter } from './infrastructure/http/exception/all-exception.filter';

async function bootstrap() {
  const logger = new Logger('ServerRun');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );
  app.useGlobalFilters(new AllExceptionFilter());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: 'GET, PUT, PATCH, POST, DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With', 
  });


  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`Server running on: http://localhost:${port}/api`);
}
bootstrap();