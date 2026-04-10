import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';

import { envValidationSchema } from './config/env.validation';
import { HealthController } from './health/health.controller';
import { PublicModule } from './modules/public/public.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),

    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          // v6 trabalha com TTL em ms, por isso usamos seconds()
          ttl: seconds(config.get<number>('THROTTLE_TTL_SECONDS', 60)),
          limit: config.get<number>('THROTTLE_LIMIT', 120),
        },
      ],
    }),

    PublicModule,
  ],
  controllers: [HealthController],
  providers: [
    // Guard global correto via DI
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
