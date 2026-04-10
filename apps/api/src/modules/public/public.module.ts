import { Module } from '@nestjs/common';

import { MysqlModule } from '../../infra/mysql/mysql.module';
import { MySqlSurfTripsRepository } from '../../infra/repositories/mysql-surf-trips.repository';

import { PublicController } from './public.controller';
import { SurfTripsService } from './services/surf-trips.service';
import { SURF_TRIPS_REPOSITORY } from './ports/surf-trips.repository';

@Module({
  imports: [MysqlModule],
  controllers: [PublicController],
  providers: [
    SurfTripsService,

    {
      provide: SURF_TRIPS_REPOSITORY,
      useClass: MySqlSurfTripsRepository,
    },
  ],
})
export class PublicModule {}
