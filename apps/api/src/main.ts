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

function resolveRuntimePort(): number {
  if (process.env.PORT && /^\d+$/.test(process.env.PORT)) {
    return Number(process.env.PORT);
  }

  const portEntry = Object.entries(process.env).find(([key, value]) => {
    return (
      key.startsWith('PORT_') &&
      typeof value === 'string' &&
      /^\d+$/.test(value)
    );
  });

  if (portEntry) {
    return Number(portEntry[1]);
  }

  return 3333;
}

function normalizePortEnv(): void {
  process.env.PORT = String(resolveRuntimePort());
}

type CorsCallback = (err: Error | null, allow?: boolean) => void;

async function bootstrap() {
  normalizePortEnv();

  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(helmet());
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const allowedOrigins = parseAllowedOrigins(
    config.get<string>('CORS_ORIGIN', ''),
  );

  app.enableCors({
    origin: (origin: string | undefined, cb: CorsCallback) => {
      if (!origin) return cb(null, true);

      if (allowedOrigins.length === 0) return cb(null, true);

      if (allowedOrigins.includes(origin)) return cb(null, true);

      return cb(new Error('Not allowed by CORS'), false);
    },
    credentials: false,
  });

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

  const port = resolveRuntimePort();

  await app.listen(port, '0.0.0.0');

  console.log(`[api] T4 Surf API running on 0.0.0.0:${port}`);
}

void bootstrap();
