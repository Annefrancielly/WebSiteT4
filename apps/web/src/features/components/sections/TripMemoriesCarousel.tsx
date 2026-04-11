"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/features/components/ui/badge";
import { Button } from "@/features/components/ui/button";

type TripMemory = {
  id: number;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
};

const TRIP_MEMORIES: TripMemory[] = [
  {
    id: 1,
    src: "/trip/trip9.jpeg",
    alt: "Recordação de surf trip da T4 em Pipa",
    title: "Memórias Pipa 2026",
    subtitle: "Ondas, conexão e evolução",
  },
  {
    id: 2,
    src: "/trip/trip2.jpeg",
    alt: "Recordação de surf trip da T4 com vista do mar",
    title: "Memórias Pipa 2026",
    subtitle: "Experiências marcantes",
  },
  {
    id: 3,
    src: "/trip/trip3.jpeg",
    alt: "Recordação de surf trip da T4 com grupo reunido",
    title: "Memórias Pipa 2026",
    subtitle: "Dias intensos no mar",
  },
  {
    id: 4,
    src: "/trip/trip4.jpeg",
    alt: "Recordação de surf trip da T4 em clima de viagem",
    title: "Memórias Pipa 2026",
    subtitle: "Mais aventuras chegando",
  },
  {
    id: 5,
    src: "/trip/trip5.jpeg",
    alt: "Recordação de surf trip da T4 em clima de viagem",
    title: "Memórias Pipa 2026",
    subtitle: "Momentos inesquecíveis de aprendizado e diversão",
  },
  {
    id: 6,
    src: "/trip/trip6.jpeg",
    alt: "Recordação de surf trip da T4 em clima de viagem",
    title: "Memórias Pipa 2026",
    subtitle: "A energia do mar e a vibe da galera",
  },
  {
    id: 7,
    src: "/trip/trip7.jpeg",
    alt: "Recordação de surf trip da T4 em clima de viagem",
    title: "Memórias Pipa 2026",
    subtitle: "A melhor vibe de surf",
  },
  {
    id: 8,
    src: "/trip/trip8.jpeg",
    alt: "Recordação de surf trip da T4 em clima de viagem",
    title: "Memórias Pipa 2026",
    subtitle: "O melhor do surf, da conexão e da vibe",
  },
  {
    id: 9,
    src: "/trip/trip1.jpeg",
    alt: "Recordação de surf trip da T4 em clima de viagem",
    title: "Memórias Pipa 2026",
    subtitle: "Conhecer novos amigos e aprender com eles",
  },
];

function useSlidesPerViewTripMemories() {
  const [slidesPerView, setSlidesPerView] = React.useState(1);

  React.useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const xl = window.matchMedia("(min-width: 1280px)");

    const compute = () => {
      if (xl.matches) return 3;
      if (md.matches) return 2;
      return 1;
    };

    const update = () => setSlidesPerView(compute());

    update();
    md.addEventListener("change", update);
    xl.addEventListener("change", update);

    return () => {
      md.removeEventListener("change", update);
      xl.removeEventListener("change", update);
    };
  }, []);

  return slidesPerView;
}

export function TripMemoriesCarousel() {
  const slidesPerView = useSlidesPerViewTripMemories();
  const [startIndex, setStartIndex] = React.useState(0);

  const maxStart = React.useMemo(
    () => Math.max(0, TRIP_MEMORIES.length - slidesPerView),
    [slidesPerView]
  );

  React.useEffect(() => {
    setStartIndex((prev) => Math.min(prev, maxStart));
  }, [maxStart]);

  const pageStarts = React.useMemo(() => {
    const starts: number[] = [];
    for (let i = 0; i <= maxStart; i += slidesPerView) starts.push(i);
    if (starts.length === 0) starts.push(0);
    if (starts[starts.length - 1] !== maxStart) starts.push(maxStart);
    return starts;
  }, [maxStart, slidesPerView]);

  const currentPage = React.useMemo(() => {
    const idx = pageStarts.findIndex((value) => value === startIndex);
    return idx >= 0 ? idx : 0;
  }, [pageStarts, startIndex]);

  const canPrev = startIndex > 0;
  const canNext = startIndex < maxStart;

  function prev() {
    setStartIndex((prev) => Math.max(0, prev - slidesPerView));
  }

  function next() {
    setStartIndex((prev) => Math.min(maxStart, prev + slidesPerView));
  }

  function goToPage(page: number) {
    const safePage = Math.max(0, Math.min(page, pageStarts.length - 1));
    setStartIndex(pageStarts[safePage]);
  }

  const translatePct = (startIndex * 100) / slidesPerView;

  if (!TRIP_MEMORIES.length) return null;

  return (
    <section className="bg-[#F2F2F0] pb-24">
      <div className="container mx-auto px-6">
        <div className="mb-10 space-y-3 text-center">
          <Badge className="border-none bg-brand-dark px-4 py-1 text-white hover:bg-brand-dark/90">
            Recordações
          </Badge>

          <h3 className="text-2xl font-bold text-brand-dark md:text-4xl">
            Recordações Trips
          </h3>

          <p className="mx-auto max-w-2xl text-gray-600">
            Momentos de outras trips para reviver a energia, a conexão e a vibe
            de cada experiência.
          </p>
        </div>

        <div className="relative">
          <div className="mb-6 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Voltar recordações"
              onClick={prev}
              disabled={!canPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="Avançar recordações"
              onClick={next}
              disabled={!canNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="overflow-hidden">
            <div
              className="-mx-3 flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${translatePct}%)` }}
            >
              {TRIP_MEMORIES.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 basis-full px-3 md:basis-1/2 xl:basis-1/3"
                >
                  <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all hover:shadow-lg">
                    <div className="relative aspect-[37/31] w-full bg-zinc-100">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                        priority={item.id <= 2}
                      />
                    </div>

                    <div className="space-y-1 p-4 text-left">
                      <p className="text-sm font-bold text-brand-dark">
                        {item.title}
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {pageStarts.map((_, idx) => {
              const active = idx === currentPage;

              return (
                <button
                  key={`trip-memory-dot-${idx}`}
                  type="button"
                  aria-label={`Ir para página ${idx + 1} das recordações`}
                  onClick={() => goToPage(idx)}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    active
                      ? "w-8 bg-brand-orange"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400",
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}