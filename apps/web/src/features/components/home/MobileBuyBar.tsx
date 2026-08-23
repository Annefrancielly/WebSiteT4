"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { COURSES } from "@/constants/courses";
import { useScrolledPast } from "@/hooks/use-scrolled-past";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Distância a partir da qual a barra aparece.
 *
 * 600px passa da dobra em praticamente qualquer celular. O ponto importa: se a
 * barra surgisse já no topo, cobriria o CTA do próprio Hero e brigaria com ele.
 * Ela existe para quem já desceu — para quem está no topo, o Hero já cumpre o
 * papel.
 */
const APARECE_DEPOIS_DE = 600;

/**
 * Menor preço da vitrine, calculado a partir dos cursos.
 *
 * Deliberadamente NÃO é um preço escrito à mão. O "a partir de" tem que
 * acompanhar a tabela: um valor fixo aqui viraria propaganda enganosa no dia em
 * que o Ricardo reajustasse um curso e ninguém lembrasse desta linha.
 */
const MENOR_PRECO_EM_CENTAVOS = Math.min(
  ...COURSES.map((curso) => curso.priceCents),
);

/**
 * Barra de compra fixa no rodapé, só no celular.
 *
 * O problema que ela resolve é de aritmética: no celular a Home tem vários
 * metros de rolagem, e durante quase todos eles não existe nenhum botão de
 * compra na tela. Toda vez que o visitante decide comprar longe de um CTA, ele
 * precisa procurar um — e procurar é onde se perde venda.
 *
 * O que ela NÃO é: um pop-up, uma contagem regressiva ou um aviso de vaga
 * acabando. Não usamos dark patterns neste projeto. É só o botão que já existe
 * na página, disponível o tempo todo.
 *
 * Só aparece no celular (`lg:hidden`): no desktop o cabeçalho fica fixo no topo
 * com o mesmo CTA, e duas barras fixas roubariam tela sem acrescentar nada.
 */
export function MobileBuyBar() {
  const visivel = useScrolledPast(APARECE_DEPOIS_DE);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 lg:hidden",
        "border-t border-white/10 bg-brand-ink/95 backdrop-blur-lg",
        // pb-[env(safe-area-inset-bottom)] afasta a barra da faixa do gesto de
        // "home" nos iPhones sem botão. Sem isso, o botão fica embaixo da
        // barrinha do sistema e o toque cai no lugar errado.
        "pb-[env(safe-area-inset-bottom)]",
        "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        // Sai deslizando para baixo em vez de sumir: `translate-y-full` mantém a
        // barra fora da tela sem tirá-la do DOM, então não há salto de layout
        // quando ela volta.
        visivel ? "translate-y-0" : "translate-y-full",
        "motion-reduce:transition-none",
      )}
      /*
        `inert` enquanto escondida. Sem isso, o botão continua alcançável pelo
        Tab e pelo leitor de tela mesmo estando fora da tela — o visitante que
        navega por teclado cairia num link invisível.
      */
      inert={!visivel}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-ink-muted">
            {COURSES.length} cursos online
          </p>

          <p className="truncate font-display text-lg uppercase leading-tight text-white">
            a partir de {formatBRL(MENOR_PRECO_EM_CENTAVOS)}
          </p>
        </div>

        <Link
          href="#nivel"
          className="group inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-lg bg-brand-orange px-5 font-display text-sm uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-orange/90"
        >
          Ver cursos
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
