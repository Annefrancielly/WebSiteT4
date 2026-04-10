import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import helmet from 'helmet';
import compression from 'compression';

import { AppModule } from './app.module';

function parseAllowedOrigins(value: string): string[] {
  return (value || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

type CorsCallback = (err: Error | null, allow?: boolean) => void;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Segurança e performance baseline
  app.use(helmet());
  app.use(compression());

  // Validação forte de payload
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS allowlist (separado por vírgula)
  const allowedOrigins = parseAllowedOrigins(
    config.get<string>('CORS_ORIGIN', ''),
  );

  app.enableCors({
    origin: (origin: string | undefined, cb: CorsCallback) => {
      // chamadas server-to-server podem não ter origin
      if (!origin) return cb(null, true);

      // se allowlist não está configurada, libera (útil em dev)
      if (allowedOrigins.length === 0) return cb(null, true);

      if (allowedOrigins.includes(origin)) return cb(null, true);

      return cb(new Error('Not allowed by CORS'), false);
    },
    credentials: false,
  });

  // Swagger condicional
  const swaggerEnabled = config.get<boolean>('SWAGGER_ENABLED', true);
  if (swaggerEnabled) {
    const swaggerPath = config.get<string>('SWAGGER_PATH', 'docs');

    const docConfig = new DocumentBuilder()
      .setTitle('T4 Surf API')
      .setDescription('Public API para consumo do front-end')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, docConfig);
    SwaggerModule.setup(swaggerPath, app, document);
  }

  const port = config.get<number>('PORT', 3333);
  await app.listen(port);
}

void bootstrap();
