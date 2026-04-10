import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { SurfTripDto } from './dto/surf-trip.dto';
import { SurfTripsService } from './services/surf-trips.service';

@ApiTags('Public')
@Controller('public')
export class PublicController {
  constructor(private readonly surfTrips: SurfTripsService) {}

  @Get('surf-trips')
  @ApiOkResponse({ type: SurfTripDto, isArray: true })
  async listSurfTrips(): Promise<SurfTripDto[]> {
    return this.surfTrips.list();
  }

  @Get('surf-trips/:slug')
  @ApiParam({ name: 'slug', example: 'pipa-baia-formosa' })
  @ApiOkResponse({ type: SurfTripDto })
  @ApiNotFoundResponse({
    description: 'Surf trip não encontrada (slug inexistente).',
  })
  async findSurfTrip(@Param('slug') slug: string): Promise<SurfTripDto> {
    const trip = await this.surfTrips.findBySlug(slug);

    if (!trip) {
      throw new NotFoundException('Surf trip não encontrada.');
    }

    return trip;
  }
}
