import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import type { Env } from '../config/env.schema';

export const DATABASE_CONNECTION = Symbol('DATABASE_CONNECTION');

export const databaseProvider = {
  provide: DATABASE_CONNECTION,
  inject: [ConfigService],
  useFactory: (configService: ConfigService<Env, true>) => {
    const pool = new Pool({
      host: configService.get('DATABASE_HOST', { infer: true }),
      port: configService.get('DATABASE_PORT', { infer: true }),
      database: configService.get('DATABASE_NAME', { infer: true }),
      user: configService.get('DATABASE_USER', { infer: true }),
      password: configService.get('DATABASE_PASSWORD', { infer: true }),
      ssl: configService.get('DATABASE_SSL', { infer: true })
        ? { rejectUnauthorized: false }
        : false,
    });

    return drizzle(pool);
  },
};
