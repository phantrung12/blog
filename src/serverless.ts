import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import { IncomingMessage, ServerResponse } from 'http';
import express from 'express';
import { AppModule } from './app.module.js';
import { setupSwagger } from './config/swagger.config.js';

const expressApp = express();
let cachedApp: INestApplication;

async function bootstrapServer(): Promise<INestApplication> {
  if (cachedApp) {
    return cachedApp;
  }

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  const configService = app.get(ConfigService);

  // CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global prefix and versioning
  const apiPrefix = configService.get<string>('apiPrefix') || 'api';
  app.setGlobalPrefix(apiPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global serializer interceptor
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Swagger documentation
  setupSwagger(app);

  await app.init();

  cachedApp = app;
  return app;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  await bootstrapServer();
  expressApp(req, res);
}
