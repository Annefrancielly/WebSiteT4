import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AULAS_PRESENCIAIS_A_PARTIR_DE_CENTAVOS } from "@/constants/site-data";
import { Button } from "@/features/components/ui/button";
import { DarkSection } from "@/features/components/shared/DarkSection";
import { Reveal } from "@/features/components/shared/Reveal";
import { formatBRL } from "@/lib/format";

/**
 * Faixa das aulas presenciais na Home.
 *
 * Substitui a PlansSection inteira — carrossel, cinco planos, lista de
 * benefícios —, que foi MOVIDA para /agendar-aula, onde ela sempre deveria ter
 * estado. Duas coisas se resolvem de uma vez:
 *
 * 1. A Home volta a vender uma coisa só. O produto principal é o curso online,
 *    vendido para o Brasil inteiro; uma tabela de cinco planos presenciais no
 *    meio dela disputava atenção com a oferta e ainda entregava preço de aula
 *    de Aracaju para quem mora em outro estado.
 *
 * 2. A página /agendar-aula deixa de ser um beco. Até hoje ela pedia contato
 *    por WhatsApp sem mostrar um único preço — quem clicava em "Agendar Aula"
 *    tinha que perguntar quanto custava para descobrir.
 *
 * A faixa é curta de propósito: ela não vende a aula, ela QUALIFICA. Quem não
 * mora perto lê "Mora em Aracaju?" e segue em frente sem perder tempo; quem
 * mora tem cidade, formato e preço inicial em uma linha.
 */
export function InPersonBand() {
  return (
    <DarkSection tone="base" className="py-10 md:py-14">
      <Reveal>
        <div className="mx-auto grid max-w-5xl gap-6 rounded-2xl border border-white/10 bg-brand-ink-card p-7 transition-colors duration-300 hover:border-white/20 md:grid-cols-[1fr_auto] md:items-center md:gap-9 md:p-9">
          <div>
            {/*
              A pergunta geográfica vem ANTES do título. É ela que faz o filtro:
              sem esse recorte, "Aulas presenciais com o Ricardo" parece uma
              oferta para todo mundo, e a maior parte dos visitantes do site não
              mora em Aracaju.
            */}
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-brand-orange">
              Mora em Aracaju?
            </p>

            <h2 className="mt-2.5 font-display text-2xl uppercase leading-tight md:text-3xl">
              Aulas presenciais com o Ricardo
            </h2>

            <p className="mt-2.5 max-w-[52ch] text-[15px] leading-relaxed text-brand-ink-muted">
              O mesmo método, na água, com correção ao vivo. Para quem quer
              acelerar ainda mais ou complementar o curso online.
            </p>

            <p className="mt-3 text-sm text-brand-ink-text">
              A partir de{" "}
              <strong className="font-semibold text-white">
                {formatBRL(AULAS_PRESENCIAIS_A_PARTIR_DE_CENTAVOS)}
              </strong>{" "}
              — pacote de 5 aulas
            </p>
          </div>

          <Button
            asChild
            className="group h-auto min-h-[48px] w-full rounded-lg bg-brand-orange px-6 font-display text-base uppercase tracking-wide text-brand-black hover:bg-brand-orange/90 md:w-auto"
          >
            <Link href="/agendar-aula/">
              Conhecer aulas
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </DarkSection>
  );
}
