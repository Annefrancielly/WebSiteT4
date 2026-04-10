import { SurfTripDto } from '../dto/surf-trip.dto';

export const SURF_TRIPS_SEED: SurfTripDto[] = [
  {
    id: 'pipa-2026',
    slug: 'pipa-baia-formosa',
    title: 'Pipa + Baía Formosa Experiência',
    location: 'Rio Grande do Norte',
    dateRange: '13 Mar - 17 Mar',
    duration: '5 dias',
    totalSlots: 30,
    remainingSlots: 12,
    price: 1287.0,
    description:
      'Uma imersão completa com foco em evolução e segurança no mar.',
    about:
      'Surf trip planejada para evolução real: sessões guiadas, suporte completo e foco em segurança no mar e progressão técnica.',
    image: '/pipa-trip.jpg',
    levelLabel: 'Intermediário',
    includes: [
      'Acomodação premium',
      'Transporte local',
      'Sessões guiadas',
      'Fotos e vídeos',
    ],
  },
  {
    id: 'trip_itacare_2026_10_08',
    slug: 'itacare-2026-10-08',
    title: 'Itacaré',
    location: 'Itacaré - BA',
    dateRange: '08 a 12 de Outubro de 2026',
    duration: '5 dias / 4 noites',
    totalSlots: 40,
    remainingSlots: 40,
    price: 1287.0,
    description:
      'Trip para quem quer evoluir no surf, viver uma vibe incrível e criar conexões que ficam pra vida.',
    about:
      'Pacote com ônibus super luxuoso, hospedagem com café da manhã, café extra na sexta-feira, um almoço, serviço de bordo, brindes com sorteio de vale prancha, 4 transfers, fotos e vídeos e guia acompanhante. Suporte completo no surf com dicas ao vivo dentro da água e análise de vídeo fora da água. Praias do roteiro: Prainha, Engenhoca, Jeribucaçu e Tiririca. Valor total de R$ 1.287, com reserva de R$ 350 não reembolsável e restante de R$ 937 parcelado no boleto de abril a setembro, com última parcela até 20/09/2026. Também disponível entrada + parcelamento no cartão em até 10x de R$ 110 ou à vista no Pix com 10% de desconto. Sorteio do vale prancha para quem garantir a vaga até 20/05/2026. Vagas limitadas.',
    image: '/assets/images/trips/itacare.webp',
    levelLabel: 'Todos os níveis',
    includes: [
      'Ônibus super luxuoso',
      'Hospedagem + café da manhã',
      'Café extra (sexta-feira)',
      'Um almoço',
      'Serviço de bordo',
      'Brindes + sorteio de um vale prancha',
      '4 transfers inclusos',
      'Fotos e vídeos',
      'Guia acompanhante',
      'Suporte no surf com dicas ao vivo dentro da água',
      'Análise de vídeo fora da água',
      'Praias inclusas: Prainha, Engenhoca, Jeribucaçu e Tiririca',
    ],
  },
];
