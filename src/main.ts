import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  // Logging environment variables (use with caution!)
  logger.debug(`POSTGRES_DB: ${process.env.POSTGRES_DB}`);
  logger.debug(`POSTGRES_USER: ${process.env.POSTGRES_USER}`);
  logger.debug(`POSTGRES_PASSWORD: ${process.env.POSTGRES_PASSWORD}`);
  logger.debug(`POSTGRES_PORT_HOST: ${process.env.POSTGRES_PORT_HOST}`);
  logger.debug(`POSTGRES_PORT: ${process.env.POSTGRES_PORT}`);
  logger.debug(`POSTGRES_HOST: ${process.env.POSTGRES_HOST}`);
  
  logger.debug(`BACKEND_PORT_HOST: ${process.env.BACKEND_PORT_HOST}`);
  logger.debug(`BACKEND_PORT: ${process.env.BACKEND_PORT}`);
  
  logger.debug(`JWT_SECRET: ${process.env.JWT_SECRET}`);
  logger.debug(`JWT_EXPIRATION_TIME: ${process.env.JWT_EXPIRATION_TIME}`);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  });
  app.enableVersioning();
  await app.listen(3000);
}

bootstrap();
