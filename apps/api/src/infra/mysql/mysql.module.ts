import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';

import { MYSQL_POOL } from './mysql.constants';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: MYSQL_POOL,
      inject: [ConfigService],
      useFactory: async (config: ConfigService): Promise<Pool> => {
        const driver = config.get<string>('SURF_TRIPS_DRIVER', 'seed');

        if (driver !== 'mysql') {
          return {
            query: () => {
              throw new Error(
                'MYSQL_POOL indisponível porque SURF_TRIPS_DRIVER não está configurado como mysql.',
              );
            },
          } as unknown as Pool;
        }

        const host = config.get<string>('DB_HOST');
        const user = config.get<string>('DB_USER');
        const password = config.get<string>('DB_PASSWORD');
        const database = config.get<string>('DB_NAME');
        const port = Number(config.get<string>('DB_PORT') ?? '3306');
        const connectionLimit = Number(
          config.get<string>('DB_CONN_LIMIT') ?? '10',
        );
        const connectTimeout = Number(
          config.get<string>('DB_CONNECT_TIMEOUT_MS') ?? '5000',
        );

        if (!host || !user || !database) {
          throw new Error(
            'Variáveis DB_HOST, DB_USER e DB_NAME são obrigatórias.',
          );
        }

        const pool = mysql.createPool({
          host,
          user,
          password,
          database,
          port,
          waitForConnections: true,
          connectionLimit,
          queueLimit: 0,
          enableKeepAlive: true,
          keepAliveInitialDelay: 0,
          charset: 'utf8mb4',
          connectTimeout,
        });

        await pool.query('SELECT 1');

        return pool;
      },
    },
  ],
  exports: [MYSQL_POOL],
})
export class MysqlModule {}
