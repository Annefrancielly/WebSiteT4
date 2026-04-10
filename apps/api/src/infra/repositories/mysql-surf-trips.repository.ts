import { Inject, Injectable } from '@nestjs/common';
import type { Pool, RowDataPacket } from 'mysql2/promise';

import { MYSQL_POOL } from '../mysql/mysql.constants';

import { SurfTripDto } from '../../modules/public/dto/surf-trip.dto';
import type { SurfTripsRepository } from '../../modules/public/ports/surf-trips.repository';

type SurfTripRow = RowDataPacket & {
  public_id: string;
  slug: string;
  title: string;
  location: string;
  date_range: string;
  duration: string;
  total_slots: number;
  remaining_slots: number;
  price: number;
  description: string;
  about: string | null;
  image: string;
  level_label: string | null;
  includes_json: unknown;
};

function safeStringArray(value: unknown): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map(String);
  }

  if (typeof value === 'string') {
    try {
      const parsed: unknown = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }

  return [];
}

@Injectable()
export class MySqlSurfTripsRepository implements SurfTripsRepository {
  constructor(
    @Inject(MYSQL_POOL)
    private readonly pool: Pool,
  ) {}

  async listActive(): Promise<SurfTripDto[]> {
    const [rows] = await this.pool.query<SurfTripRow[]>(
      `
      SELECT
        public_id,
        slug,
        title,
        location,
        date_range,
        duration,
        total_slots,
        remaining_slots,
        price,
        description,
        about,
        image,
        level_label,
        includes_json
      FROM surf_trips
      WHERE is_active = 1
      ORDER BY sort_order ASC, start_date ASC, id ASC
      `,
    );

    return rows.map((row) => this.mapRow(row));
  }

  async findActiveBySlug(slug: string): Promise<SurfTripDto | null> {
    const [rows] = await this.pool.query<SurfTripRow[]>(
      `
      SELECT
        public_id,
        slug,
        title,
        location,
        date_range,
        duration,
        total_slots,
        remaining_slots,
        price,
        description,
        about,
        image,
        level_label,
        includes_json
      FROM surf_trips
      WHERE is_active = 1 AND slug = ?
      LIMIT 1
      `,
      [slug],
    );

    const row = rows[0];
    if (!row) return null;

    return this.mapRow(row);
  }

  private mapRow(row: SurfTripRow): SurfTripDto {
    return {
      id: row.public_id,
      slug: row.slug,
      title: row.title,
      location: row.location,
      dateRange: row.date_range,
      duration: row.duration,
      totalSlots: row.total_slots,
      remainingSlots: row.remaining_slots,
      price: row.price,
      description: row.description,
      about: row.about,
      image: row.image,
      levelLabel: row.level_label,
      includes: safeStringArray(row.includes_json),
    };
  }
}
