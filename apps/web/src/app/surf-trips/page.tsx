import { TripSection } from "@/features/components/sections/TripSection";
import { TripMemoriesCarousel } from "@/features/components/sections/TripMemoriesCarousel";
import { Badge } from "@/features/components/ui/badge";
import { getSurfTrips } from "@/lib/public-api";
import { SurfTripDto } from "@/types/public-api";
import { withBasePath } from "@/lib/paths";

export default async function SurfTripsPage() {
  let trips: SurfTripDto[] = [];
  let tripsLoadFailed = false;

  try {
    trips = await getSurfTrips();
  } catch (error) {
    tripsLoadFailed = true;
    console.error("Failed to load surf trips:", error);
  }

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

      {tripsLoadFailed ? (
        <section className="bg-[#F2F2F0] py-20">
          <div className="container mx-auto px-6 text-center">
            <Badge className="mb-4 border-none bg-red-100 px-4 py-1 text-xs font-bold uppercase tracking-wide text-red-700">
              Instabilidade temporária
            </Badge>

            <h2 className="mb-3 text-2xl font-bold text-brand-dark md:text-3xl">
              Não foi possível carregar as surf trips agora
            </h2>

            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
              Houve uma falha temporária ao buscar as viagens disponíveis.
              Tente novamente em instantes.
            </p>
          </div>
        </section>
      ) : (
        <TripSection trips={trips} />
      )}

      <TripMemoriesCarousel />
    </section>
  );
}