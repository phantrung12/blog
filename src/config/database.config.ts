import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  const databaseUrl = process.env.DATABASE_URL;

  const baseConfig: Partial<TypeOrmModuleOptions> = {
    type: 'postgres',
    schema: 'public',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    autoLoadEntities: true,
  };

  // Vercel / Production: use DATABASE_URL with SSL (Neon, Supabase, etc.)
  if (databaseUrl) {
    return {
      ...baseConfig,
      type: 'postgres',
      url: databaseUrl,
      ssl: { rejectUnauthorized: false },
      extra: {
        options: '-c search_path=public',
      },
    };
  }

  // Local development: use individual credentials, no SSL
  return {
    ...baseConfig,
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'blog',
  };
};
