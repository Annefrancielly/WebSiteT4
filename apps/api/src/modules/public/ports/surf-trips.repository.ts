import { SurfTripDto } from '../dto/surf-trip.dto';

export const SURF_TRIPS_REPOSITORY = 'SURF_TRIPS_REPOSITORY';

export interface SurfTripsRepository {
  listActive(): Promise<SurfTripDto[]>;
  findActiveBySlug(slug: string): Promise<SurfTripDto | null>;
}
