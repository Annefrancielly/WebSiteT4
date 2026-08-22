import { TripSection } from "@/features/components/sections/TripSection";
import { TripMemoriesCarousel } from "@/features/components/sections/TripMemoriesCarousel";
import { Badge } from "@/features/components/ui/badge";
import { getSurfTrips } from "@/lib/public-api";
import { SurfTripDto } from "@/types/public-api";
import { withBasePath } from "@/lib/paths";
import reservaJson from "@/constants/surf-trips-fallback.json";

/**
 * Instantâneo da própria API, commitado.
 *
 * Sem `as`: a atribuição já é validada estruturalmente contra SurfTripDto. Se o
 * contrato da API mudar e este arquivo ficar para trás, o build acusa.
 *
 * Para atualizar:
 *   curl -s https://api.t4surf.com.br/public/surf-trips \
 *     | python3 -m json.tool > src/constants/surf-trips-fallback.json
 */
const TRIPS_DE_RESERVA: SurfTripDto[] = reservaJson;

/**
 * Esta página é gerada em tempo de build (output: "export"). O que for
 * renderizado aqui fica congelado no HTML — inclusive um estado de erro.
 *
 * Por isso não existe caminho que produza "falha ao carregar": ou vêm os dados
 * da API, ou vem o instantâneo. Um visitante nunca deve ler "tente novamente"
 * numa página que é um arquivo e nunca vai tentar de novo.
 */
async function carregarSurfTrips(): Promise<SurfTripDto[]> {
  try {
    const trips = await getSurfTrips();

    // Lista vazia NÃO é falha: pode não haver trip aberta no momento. Cair no
    // instantâneo aqui anunciaria viagens que já não existem.
    console.log(`[build] surf trips carregadas da API: ${trips.length}`);

    return trips;
  } catch (error) {
    console.warn(
      `[build] API indisponível — usando o instantâneo commitado (${TRIPS_DE_RESERVA.length} trips).`,
      error,
    );

    return TRIPS_DE_RESERVA;
  }
}

export default async function SurfTripsPage() {
  const trips = await carregarSurfTrips();

  return (
    <section className="min-h-screen">
      <section className="relative flex h-[60vh] items-center justify-center overflow-hidden bg-brand-black pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${withBasePath("/surf-trips-hero.jpg")}')` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="container relative z-10 px-6 text-center">
          <Badge className="mb-6 border border-white/20 bg-white/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            Aventuras Épicas
          </Badge>

          <h1 className="mb-4 text-3xl font-black uppercase italic tracking-tighter text-white md:text-5xl">
            Surf Trips Inesquecíveis
          </h1>

          <p className="mx-auto max-w-xl text-sm font-medium leading-relaxed text-white/80 md:text-base">
            Explore os melhores picos do mundo com um instrutor experiente.
            Grupos pequenos, destinos incríveis e muito aprendizado.
          </p>
        </div>
      </section>

      <TripSection trips={trips} />

      <TripMemoriesCarousel />
    </section>
  );
}