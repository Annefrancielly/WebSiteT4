/* eslint-disable prettier/prettier */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SurfTripDto {
  @ApiProperty({ example: 'pipa-2026' })
  id!: string;

  @ApiProperty({ example: 'pipa-baia-formosa' })
  slug!: string;

  @ApiProperty({ example: 'Pipa + Baía Formosa Experiência' })
  title!: string;

  @ApiProperty({ example: 'Rio Grande do Norte' })
  location!: string;

  @ApiProperty({ example: '13 Mar - 17 Mar' })
  dateRange!: string;

  @ApiProperty({ example: '5 dias' })
  duration!: string;

  @ApiProperty({ example: 30 })
  totalSlots!: number;

  @ApiProperty({ example: 12 })
  remainingSlots!: number;

  @ApiProperty({ example: 1287.0 })
  price!: number;

  @ApiProperty({ example: 'Texto curto para seção/card.' })
  description!: string;

  @ApiPropertyOptional({ example: 'Texto longo para o dialog.', nullable: true })
  about?: string | null;

  @ApiProperty({ example: '/pipa-trip.jpg' })
  image!: string;

  @ApiPropertyOptional({ example: 'Intermediário', nullable: true })
  levelLabel?: string | null;

  @ApiProperty({ isArray: true, example: ['Acomodação', 'Fotos e vídeos'] })
  includes!: string[];
}
