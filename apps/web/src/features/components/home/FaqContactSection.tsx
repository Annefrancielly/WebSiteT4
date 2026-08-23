import { Plus } from "lucide-react";

import { criarUrlWhatsApp, FAQ_DECISAO } from "@/constants/site-data";
import { DarkSection } from "@/features/components/shared/DarkSection";
import { Reveal } from "@/features/components/shared/Reveal";

const MENSAGEM_DUVIDA =
  "Olá! Vim pelo site da T4 Surf e fiquei com uma dúvida sobre os cursos.";

/**
 * FAQ da Home: as objeções que impedem a compra.
 *
 * Vem imediatamente antes do último CTA, e essa posição é a razão de a seção
 * existir. Quem chegou até aqui já viu preço, conteúdo e prova — se ainda não
 * comprou, é porque sobrou uma dúvida. As seis perguntas são exatamente as seis
 * dúvidas que sobram.
 *
 * SOBRE O ACORDEÃO: usa <details>/<summary> nativo do navegador, e não o
 * componente Accordion do Shadcn que existe no projeto.
 *
 * A troca é deliberada. O Accordion do Radix é excelente, mas obrigaria esta
 * seção a virar Client Component — ou seja, mandar JavaScript ao navegador para
 * abrir e fechar um texto, que é o que o <details> faz desde sempre, de graça,
 * com acessibilidade e busca do Ctrl+F inclusas.
 *
 * O Accordion continuaria sendo a escolha certa se precisássemos do que o
 * nativo não faz: fechar um item ao abrir outro, animar a altura com precisão,
 * controlar o estado de fora. Nada disso é necessário aqui — e é o tipo de
 * decisão que separa "usar a biblioteca" de "usar a plataforma".
 */
export function FaqContactSection() {
  return (
    <DarkSection id="faq" ariaLabelledBy="faq-title" tone="base">
      <Reveal>
        <p className="text-center font-display text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
          Dúvidas
        </p>
      </Reveal>

      <Reveal index={1}>
        <h2
          id="faq-title"
          className="mt-4 text-center font-display text-4xl uppercase leading-none tracking-tight md:text-5xl lg:text-6xl"
        >
          Antes de decidir
        </h2>
      </Reveal>

      <div className="mx-auto mt-11 max-w-3xl">
        {FAQ_DECISAO.map((item, indice) => (
          <Reveal key={item.id} index={indice + 2}>
            <details
              /*
                A primeira pergunta nasce aberta. Não é enfeite: um acordeão
                todo fechado parece uma lista de títulos, e muita gente não
                descobre que aquilo abre. Com um item aberto o padrão fica
                evidente — e a pergunta que abre é justamente a mais comum.
              */
              open={indice === 0}
              className="group border-b border-white/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-display text-lg uppercase leading-tight text-white transition-colors hover:text-brand-orange md:text-xl">
                {item.pergunta}

                {/*
                  Um ícone só, girando 45° ao abrir: o "+" vira "×". Uma peça em
                  vez de duas evita o salto que acontece quando um ícone é
                  trocado por outro de largura diferente.
                */}
                <Plus
                  aria-hidden="true"
                  className="size-5 shrink-0 text-brand-orange transition-transform duration-300 group-open:rotate-45"
                />
              </summary>

              <div className="pb-5 pr-9 text-[15px] leading-relaxed text-brand-ink-muted">
                {item.resposta}
              </div>
            </details>
          </Reveal>
        ))}
      </div>

      <Reveal index={FAQ_DECISAO.length + 2}>
        {/*
          A saída para quem tem uma dúvida que não está na lista. Sem ela, o
          visitante indeciso não tem para onde ir a não ser para trás — e a
          conversa no WhatsApp é onde o Ricardo fecha venda.
        */}
        <p className="mt-10 text-center text-brand-ink-text">
          Tem outra dúvida?{" "}
          <a
            href={criarUrlWhatsApp(MENSAGEM_DUVIDA)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-orange underline-offset-4 hover:underline"
          >
            Fala comigo no WhatsApp
          </a>
        </p>
      </Reveal>
    </DarkSection>
  );
}
