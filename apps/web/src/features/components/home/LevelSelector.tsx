"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import {
  COURSES,
  DIAGNOSTICOS_POR_NIVEL,
  type CourseLevel,
} from "@/constants/courses";
import { DarkSection } from "@/features/components/shared/DarkSection";
import { Reveal } from "@/features/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * Prefixo das âncoras dos cards da vitrine.
 *
 * Precisa ser o mesmo string usado em CoursesShowcase. Vive aqui, exportado,
 * para que os dois componentes não possam divergir com uma edição distraída —
 * mudar o prefixo em um lugar quebraria a navegação silenciosamente, sem erro
 * de compilação e sem tela vermelha.
 */
export const PREFIXO_ANCORA_CURSO = "card-";

type Opcao = {
  level: CourseLevel;
  situacao: string;
  tituloDoCurso: string;
  ancora: string;
};

/**
 * Cruza o diagnóstico com o curso correspondente.
 *
 * O casamento é por NÍVEL, não por posição no array. Se amanhã a vitrine for
 * reordenada — e ela já foi uma vez, a pedido do cliente — nada aqui quebra.
 * Cruzar por índice teria funcionado hoje e apontado para o curso errado depois.
 */
const OPCOES: Opcao[] = DIAGNOSTICOS_POR_NIVEL.map((diagnostico) => {
  const curso = COURSES.find((c) => c.level === diagnostico.level);

  return {
    level: diagnostico.level,
    situacao: diagnostico.situacao,
    tituloDoCurso: curso
      ? `${curso.titleLead} ${curso.titleAccent}`
      : "Ver os cursos",
    ancora: curso ? `#${PREFIXO_ANCORA_CURSO}${curso.id}` : "#cursos",
  };
});

/**
 * Seletor de nível: "qual é o seu momento no surf?".
 *
 * É a peça que resolve o problema comercial da vitrine. O cliente pediu os
 * cards do avançado para o iniciante, mas a maior parte de quem chega é
 * iniciante — ou seja, o público mais numeroso encontra o card dele por último.
 * Em vez de discutir a ordem, o seletor dá um atalho: o visitante declara a
 * situação e vai direto ao curso certo.
 *
 * Cada opção é um LINK, não um botão. A diferença não é cosmética:
 *
 * - link muda o hash da URL, e é o hash que faz o card destacar via `:target`
 *   no CSS — sem estado compartilhado entre as duas seções, sem transformar a
 *   vitrine em Client Component;
 * - o navegador rola sozinho, com o comportamento nativo da plataforma;
 * - a escolha fica na URL, então o visitante pode mandar o link já apontando
 *   para o curso dele;
 * - o botão direito, o Cmd+clique e o histórico funcionam como em qualquer
 *   link do site, porque é um link de verdade.
 *
 * O estado local guarda só o realce visual da opção escolhida, para quando o
 * visitante rolar de volta. Nada além disso depende de JavaScript.
 */
export function LevelSelector() {
  const [escolhida, setEscolhida] = useState<CourseLevel | null>(null);

  return (
    // Os tons das faixas escuras alternam ao longo da Home — Método (base),
    // Erros (soft), Seletor (base). Um degrau de claridade separa duas seções
    // escuras vizinhas sem precisar de linha divisória: no escuro, hierarquia
    // vem de fundo mais claro, e não de sombra.
    <DarkSection id="nivel" ariaLabelledBy="nivel-title" tone="base">
      <Reveal>
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
          Encontre seu curso
        </p>
      </Reveal>

      <Reveal index={1}>
        <h2
          id="nivel-title"
          className="mt-4 max-w-[18ch] font-display text-4xl uppercase leading-none tracking-tight md:text-5xl"
        >
          Qual é o seu momento no surf?
        </h2>
      </Reveal>

      <Reveal index={2}>
        <p className="mt-4 max-w-[45ch] text-lg">
          Um clique. Eu mostro o curso certo para você.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
        {OPCOES.map((opcao, indice) => {
          const selecionada = escolhida === opcao.level;

          return (
            <Reveal key={opcao.level} index={indice + 3}>
              <a
                href={opcao.ancora}
                onClick={() => setEscolhida(opcao.level)}
                aria-current={selecionada ? "true" : undefined}
                className={cn(
                  "relative grid h-full content-start gap-2.5 rounded-2xl border p-6",
                  "transition-[transform,border-color,background-color] duration-300",
                  "hover:-translate-y-1 hover:border-brand-orange/50",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange",
                  selecionada
                    ? "border-brand-orange bg-brand-orange/10"
                    : "border-white/10 bg-brand-ink-card",
                )}
              >
                {/*
                  O selo cresce do zero em vez de simplesmente aparecer. É o
                  único retorno visual de que o clique foi registrado, já que
                  logo em seguida a página rola para longe daqui.
                */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute right-4 top-4 grid size-6 place-items-center rounded-full bg-brand-orange text-brand-black",
                    "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    selecionada ? "scale-100" : "scale-0",
                  )}
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>

                <span
                  className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-300",
                    selecionada ? "text-brand-orange" : "text-brand-ink-muted",
                  )}
                >
                  {opcao.level}
                </span>

                {/* A frase é o que o visitante lê primeiro: é ela que ele reconhece. */}
                <span className="pr-8 font-display text-xl uppercase leading-tight text-white md:text-2xl">
                  {opcao.situacao}
                </span>

                <span className="mt-1 text-sm text-brand-ink-muted">
                  →{" "}
                  <strong className="font-semibold text-brand-orange">
                    {opcao.tituloDoCurso}
                  </strong>
                </span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </DarkSection>
  );
}
