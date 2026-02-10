import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import configuration from './config/configuration';
import { getDatabaseConfig } from './config/database.config';
import { HttpExceptionFilter } from './common/filters';
import { TransformInterceptor } from './common/interceptors';
import { JwtAuthGuard } from './modules/auth/guards';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { PagesModule } from './modules/pages/pages.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TagsModule } from './modules/tags/tags.module';
import { CommentsModule } from './modules/comments/comments.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () => getDatabaseConfig(),
    }),

    // Rate Limiting
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>('throttle.ttl') || 60000,
          limit: configService.get<number>('throttle.limit') || 100,
        },
      ],
    }),

    // Feature Modules
    AuthModule,
    UsersModule,
    PostsModule,
    PagesModule,
    CategoriesModule,
    TagsModule,
    CommentsModule,
    SearchModule,
  ],
  providers: [
    // Global JWT Auth Guard (all routes protected by default)
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Global Rate Limiting Guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // Global Exception Filter
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // Global Response Transform
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
