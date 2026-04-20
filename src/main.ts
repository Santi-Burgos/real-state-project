import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common'; 
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const logger = new Logger('ServerRun');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`Server running on: http://localhost:${port}`);
}
bootstrap();