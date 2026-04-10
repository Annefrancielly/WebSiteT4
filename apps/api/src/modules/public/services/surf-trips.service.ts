import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SurfTripDto } from '../dto/surf-trip.dto';
import { SURF_TRIPS_SEED } from '../data/surf-trips.seed';
import { SURF_TRIPS_REPOSITORY } from '../ports/surf-trips.repository';
import type { SurfTripsRepository } from '../ports/surf-trips.repository';

@Injectable()
export class SurfTripsService {
  constructor(
    private readonly config: ConfigService,
    @Inject(SURF_TRIPS_REPOSITORY)
    private readonly repo: SurfTripsRepository,
  ) {}

  async list(): Promise<SurfTripDto[]> {
    const driver = this.config.get<string>('SURF_TRIPS_DRIVER', 'seed');

    if (driver === 'seed') {
      return SURF_TRIPS_SEED;
    }

    return this.repo.listActive();
  }

  async findBySlug(slug: string): Promise<SurfTripDto | null> {
    const driver = this.config.get<string>('SURF_TRIPS_DRIVER', 'seed');

    if (driver === 'seed') {
      return SURF_TRIPS_SEED.find((t) => t.slug === slug) ?? null;
    }

    return this.repo.findActiveBySlug(slug);
  }
}
