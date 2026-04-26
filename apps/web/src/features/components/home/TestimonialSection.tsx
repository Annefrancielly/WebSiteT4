'use client';

import * as React from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/features/components/ui/button';
import { Badge } from '@/features/components/ui/badge';
//import { RelatosVideoDialog } from "../shared/RelatosVideoDialog";
//import { RELATOS_YOUTUBE_URL } from "@/constants/site-data";
import { withBasePath } from '@/lib/paths';

type WhatsAppFeedback = {
  id: number;
  src: string;
  alt: string;
  senderName: string;
  caption?: string;
};

const WHATSAPP_FEEDBACKS: WhatsAppFeedback[] = [
  {
    id: 1,
    src: withBasePath("/feedback/whatsapp-0101.jpg"),
    alt: "Print de feedback de aluno no WhatsApp sobre evolução no surf",
    senderName: "Fred",
    caption: "Feedback real (WhatsApp)",
  },
  {
    id: 2,
    src: withBasePath("/feedback/whatsapp-0202.jpg"),
    alt: "Print de depoimento no WhatsApp sobre aulas e metodologia",
    senderName: "Leonardo",
    caption: "Feedback real (WhatsApp)",
  },
  {
    id: 3,
    src: withBasePath("/feedback/relato4.jpg"),
    alt: "Print de conversa no WhatsApp elogiando a evolução nas aulas",
    senderName: "Haniel",
    caption: "Feedback real (WhatsApp)",
  },
  {
    id: 4,
    src: withBasePath("/feedback/Relato3.jpg"),
    alt: "Print de avaliação de aluno no WhatsApp sobre experiência nas aulas",
    senderName: "Seichele Barbosa",
    caption: "Feedback real (Instagram)",
  },
];

function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google"
      role="img"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.06 1.53 7.45 2.81l5.45-5.45C33.64 4.03 29.32 2 24 2 14.73 2 6.84 7.38 3.06 15.22l6.53 5.07C11.24 14.1 17.1 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.2 24.5c0-1.63-.15-3.2-.43-4.72H24v9.02h12.46c-.54 2.93-2.19 5.41-4.68 7.08l7.18 5.58C43.06 37.53 46.2 31.52 46.2 24.5z"
      />
      <path
        fill="#FBBC05"
        d="M9.59 28.29c-.52-1.56-.82-3.23-.82-4.95s.3-3.39.82-4.95l-6.53-5.07C1.73 16.3 1 20.05 1 23.34s.73 7.04 2.06 10.02l6.53-5.07z"
      />
      <path
        fill="#34A853"
        d="M24 44c5.32 0 9.79-1.76 13.06-4.79l-7.18-5.58c-1.99 1.34-4.55 2.13-5.88 2.13-6.9 0-12.76-4.6-14.41-10.79l-6.53 5.07C6.84 40.62 14.73 44 24 44z"
      />
      <path fill="none" d="M1 1h46v46H1z" />
    </svg>
  );
}

function useSlidesPerViewWhatsapp() {
  const [slidesPerView, setSlidesPerView] = React.useState(1);

  React.useEffect(() => {
    const md = window.matchMedia('(min-width: 768px)');
    const lg = window.matchMedia('(min-width: 1024px)');
    const xl = window.matchMedia('(min-width: 1280px)');

    const compute = () => {
      if (xl.matches) return 4;
      if (lg.matches) return 3;
      if (md.matches) return 2;
      return 1;
    };

    const update = () => setSlidesPerView(compute());

    update();
    md.addEventListener('change', update);
    lg.addEventListener('change', update);
    xl.addEventListener('change', update);

    return () => {
      md.removeEventListener('change', update);
      lg.removeEventListener('change', update);
      xl.removeEventListener('change', update);
    };
  }, []);

  return slidesPerView;
}

function WhatsappFeedbackCarousel({ items }: { items: WhatsAppFeedback[] }) {
  const slidesPerView = useSlidesPerViewWhatsapp();
  const [startIndex, setStartIndex] = React.useState(0);

  const maxStart = React.useMemo(
    () => Math.max(0, items.length - slidesPerView),
    [items.length, slidesPerView],
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
    const idx = pageStarts.findIndex((v) => v === startIndex);
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
    const safe = Math.max(0, Math.min(page, pageStarts.length - 1));
    setStartIndex(pageStarts[safe]);
  }

  const translatePct = (startIndex * 100) / slidesPerView;

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label="Voltar feedbacks"
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
          aria-label="Avançar feedbacks"
          onClick={next}
          disabled={!canNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out -mx-3"
          style={{ transform: `translateX(-${translatePct}%)` }}
        >
          {items.map((it) => (
            <div
              key={it.id}
              className="px-3 shrink-0 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all">
                <div className="w-full aspect-[37/62] rounded-t-2xl bg-zinc-50 p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={it.src}
                      alt={it.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-contain"
                      priority={it.id <= 2}
                    />
                  </div>
                </div>

                <div className="p-4 space-y-1">
                  <p className="text-sm font-bold text-brand-dark">{it.senderName}</p>

                  {it.caption ? (
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      {it.caption}
                    </p>
                  ) : null}
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
              key={`dot-${idx}`}
              type="button"
              aria-label={`Ir para página ${idx + 1} dos feedbacks`}
              onClick={() => goToPage(idx)}
              className={[
                'h-2.5 rounded-full transition-all',
                active ? 'w-8 bg-brand-orange' : 'w-2.5 bg-gray-300 hover:bg-gray-400',
              ].join(' ')}
            />
          );
        })}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const hasWhatsapp = WHATSAPP_FEEDBACKS.length > 0;

  return (
    <section className="py-24 bg-[#F2F0EB] relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-brand-orange text-white hover:bg-orange-600 px-4 py-1 border-none">
            Depoimentos
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark">
            O Que Nossos Alunos Dizem
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Histórias reais de transformação e conquistas de quem decidiu embarcar nessa jornada
            conosco.
          </p>
          {/* Botão de relatos em vídeo desativado temporariamente até o cliente disponibilizar o material
        <div className="mt-8 flex justify-center" data-allow-interaction="true">
         <RelatosVideoDialog youtubeUrl={RELATOS_YOUTUBE_URL} />
        </div>
        */}
        </div>

        {/* Card Principal de Resumo (clicável para Google Maps) */}
        <a
          href="https://share.google/hQkaIPZdSZTFQI7Pv"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir avaliações no Google Maps"
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto mb-16 flex flex-col sm:flex-row items-center justify-center gap-6 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md border border-gray-100 shrink-0">
            <GoogleGIcon className="h-7 w-7" />
          </div>

          <div className="text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-1">
              <span className="font-bold text-xl text-brand-dark">T4 Aulas de Surf</span>
              <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded border border-green-100">
                <span className="font-bold text-brand-dark">5.0</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Baseado em <span className="font-bold text-gray-700 underline">34 avaliações</span> no
              Google Maps
            </p>
          </div>
        </a>

        {hasWhatsapp ? (
          <div className="mt-16">
            <div className="text-center mb-10 space-y-3">
              <Badge className="bg-brand-dark text-white hover:bg-brand-dark/90 px-4 py-1 border-none">
                Feedbacks no WhatsApp
              </Badge>

              <h3 className="text-2xl md:text-4xl font-bold text-brand-dark">
                Prints reais de alunos
              </h3>

              <p className="text-gray-600 max-w-2xl mx-auto">
                Feedbacks enviados diretamente após as aulas e treinos.
              </p>
            </div>

            <WhatsappFeedbackCarousel items={WHATSAPP_FEEDBACKS} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
