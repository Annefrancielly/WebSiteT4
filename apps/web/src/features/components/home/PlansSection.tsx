"use client";

import * as React from "react";
import Link from "next/link";
import {
  Check,
  BarChart3,
  Target,
  Waves,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/features/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/features/components/ui/card";
import { Badge } from "@/features/components/ui/badge";

const AGENDAR_HREF = "/agendar-aula";

const PLANS = [
  {
    title: "Plano Iniciante do Zero",
    price: "550",
    isConsult: false,
    period: "/5 aulas",
    icon: Waves,
    description: "Para quem nunca surfou ou está começando do zero.",
    features: [
      "100% focado em aulas no mar",
      "Aprender base, posicionamento e ficar em pé na onda",
      "Evolução segura e progressiva",
      "Formato: apenas aulas de surf no mar",
      "Opção 10 aulas: R$ 950",
    ],
    highlight: false,
    buttonText: "Agendar",
  },
  {
    title: "Plano Iniciante – Surf + Surfskate",
    price: "550",
    isConsult: false,
    period: "/5 aulas",
    icon: Target,
    description: "Para quem já deu os primeiros passos e quer evoluir mais rápido.",
    features: [
      "Melhora equilíbrio, base e leitura de onda",
      "Acelera o aprendizado dentro da água",
      "Formato (referência): 3 aulas no mar + 1 aula de surfskate (simulador)",
      "Opção 10 aulas: R$ 950",
    ],
    highlight: true,
    buttonText: "Agendar",
  },
  {
    title: "Plano Iniciante Avançado",
    price: "550",
    isConsult: false,
    period: "/5 aulas",
    icon: BarChart3,
    description: "Para quem já surfa, mas quer técnica, controle e evolução real.",
    features: [
      "Correção de erros",
      "Evolução técnica mais rápida",
      "Clareza do que ajustar dentro da água",
      "Formato (referência): 2 mar + 1 surfskate + 1 surfanalyse (vídeo)",
      "Opção 10 aulas: R$ 950",
    ],
    highlight: false,
    buttonText: "Agendar",
  },
  {
    title: "Plano PRO – Performance",
    price: "550",
    isConsult: false,
    period: "/5 aulas",
    icon: Video,
    description: "Para quem quer performance, técnica e evolução consciente.",
    features: [
      "Foco total em movimento, base e leitura técnica",
      "Ideal para quem quer subir nível rápido",
      "Formato (referência): 3 surfskate + 1 surfanalyse (vídeo)",
      "Opção 10 aulas: R$ 950",
    ],
    highlight: false,
    buttonText: "Agendar",
  },
];

function useSlidesPerView() {
  const [slidesPerView, setSlidesPerView] = React.useState(1);

  React.useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");

    const compute = () => {
      if (lg.matches) return 3;
      if (md.matches) return 2;
      return 1;
    };

    const update = () => setSlidesPerView(compute());

    update();

    md.addEventListener("change", update);
    lg.addEventListener("change", update);

    return () => {
      md.removeEventListener("change", update);
      lg.removeEventListener("change", update);
    };
  }, []);

  return slidesPerView;
}

export function PlansSection() {
  const slidesPerView = useSlidesPerView();

  const [startIndex, setStartIndex] = React.useState(0);

  const maxStart = React.useMemo(
    () => Math.max(0, PLANS.length - slidesPerView),
    [slidesPerView],
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
    <section id="planos" className="py-24 bg-brand-beige">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <Badge className="bg-brand-orange text-white hover:bg-orange-600 mb-4 px-4 py-1 border-none uppercase font-bold text-xs">
            Aulas Presenciais
          </Badge>

          <h2 className="text-3xl md:text-5xl font-black text-brand-black mb-4">
            Planos de Aula – Método T4
          </h2>

          <p className="text-gray-600 text-lg font-medium">
            Todos os planos podem ser contratados em 2 formatos:{" "}
            <strong>5 aulas – R$ 550</strong> ou <strong>10 aulas – R$ 950</strong>.
          </p>
        </div>

        <div className="relative">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="text-sm text-gray-500">
              Navegue pelos planos usando as setas.
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full"
                aria-label="Voltar planos"
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
                aria-label="Avançar planos"
                onClick={next}
                disabled={!canNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-hidden overflow-y-visible px-8 py-8">
            <div
              className="flex transition-transform duration-300 ease-out -mx-3"
              style={{ transform: `translateX(-${translatePct}%)` }}
            >
              {PLANS.map((plan) => (
                <div
                  key={plan.title}
                  className="px-3 shrink-0 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    className={`relative flex h-full flex-col border-2 transition-all duration-300 hover:shadow-xl bg-white rounded-2xl ${
                      plan.highlight
                        ? "border-brand-orange shadow-lg lg:scale-105 z-10"
                        : "border-transparent hover:border-gray-200"
                    }`}
                  >
                    {plan.highlight && (
                      <div className="absolute -top-4 right-4 bg-brand-orange text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Mais Popular
                      </div>
                    )}

                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-teal-50 text-brand-turquoise">
                        <plan.icon className="w-6 h-6" />
                      </div>

                      <CardTitle className="text-2xl font-bold text-brand-black">
                        {plan.title}
                      </CardTitle>

                      <div className="mt-2 flex items-baseline gap-1 text-brand-turquoise">
                        {plan.isConsult ? (
                          <span className="text-3xl font-bold tracking-tight">
                            {plan.price}
                          </span>
                        ) : (
                          <>
                            <span className="text-sm font-bold opacity-70">R$</span>
                            <span className="text-4xl font-black">{plan.price}</span>
                            <span className="opacity-70 font-medium text-sm">
                              {plan.period}
                            </span>
                          </>
                        )}
                      </div>

                      <CardDescription className="mt-4 text-gray-500 leading-relaxed min-h-[80px]">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <ul className="space-y-4">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className="w-5 h-5 shrink-0 mt-0.5 text-brand-turquoise" />
                            <span className="text-gray-600 text-sm font-medium">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3 pb-8 pt-4">
                      <Button
                        variant="ghost"
                        className="w-full font-bold h-12 border border-gray-100 hover:bg-teal-50 text-brand-turquoise"
                        asChild
                      >
                        <Link href={AGENDAR_HREF}>Saiba Mais</Link>
                      </Button>

                      <Button
                        className="w-full bg-brand-orange hover:bg-orange-600 text-white font-extrabold h-12 text-md shadow-md"
                        asChild
                      >
                        <Link href={AGENDAR_HREF}>{plan.buttonText}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
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
                  aria-label={`Ir para página ${idx + 1} dos planos`}
                  onClick={() => goToPage(idx)}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    active ? "w-8 bg-brand-orange" : "w-2.5 bg-gray-300 hover:bg-gray-400",
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button
            className="bg-brand-turquoise hover:bg-[#258E90] text-white font-black px-10 py-6 text-lg rounded-lg shadow-xl shadow-teal-500/20 transition-transform hover:scale-105"
            asChild
          >
            <Link href={AGENDAR_HREF}>Agendar Agora</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
