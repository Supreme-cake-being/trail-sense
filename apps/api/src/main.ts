import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import type { Env } from './config/env.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<Env, true>);

  const port = configService.get('PORT', { infer: true });
  const apiPrefix = configService.get('API_PREFIX', { infer: true });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.setGlobalPrefix(apiPrefix);

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

  await app.listen(port);

  console.log(
    `🚀 TrailSense API is running at http://localhost:${port}/${apiPrefix}`,
  );
}

void bootstrap();
