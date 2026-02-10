import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global prefix and versioning
  const apiPrefix = configService.get<string>('apiPrefix') || 'api';
  const apiVersion = configService.get<string>('apiVersion') || 'v1';

  app.setGlobalPrefix(`${apiPrefix}`);

  // Enable URI versioning (optional, for future version support)
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

  // Global serializer interceptor - enables @Exclude() decorator
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Swagger documentation
  setupSwagger(app);

  // Start server
  const port = configService.get<number>('port') || 3000;
  await app.listen(port);

  console.log(`🚀 Blog API is running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api/docs`);
  console.log(`🔒 API prefix: /${apiPrefix}/${apiVersion}`);
}

bootstrap();
