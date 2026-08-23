import { Instagram } from "lucide-react";

import {
  INSTAGRAM_URL,
  PROFESSOR_FRASE,
  PROFESSOR_TRAJETORIA_YOUTUBE_URL,
} from "@/constants/site-data";
import { Button } from "@/features/components/ui/button";
import { DarkSection } from "@/features/components/shared/DarkSection";
import { RelatosVideoDialog } from "@/features/components/shared/RelatosVideoDialog";
import { Reveal } from "@/features/components/shared/Reveal";

import { InstructorPhotoCarousel } from "./InstructorPhotoCarousel";

/**
 * Credenciais do Ricardo.
 *
 * Todas já publicadas pelo site hoje: "21 anos de experiência com surf" e
 * "500+ alunos" vinham do texto desta própria seção; a nota do Google foi
 * confirmada por ele em 23/08.
 *
 * São NÚMEROS, e não adjetivos, de propósito: "instrutor experiente" é opinião
 * e todo concorrente diz o mesmo; "21 anos" é verificável e ninguém copia sem
 * ter vivido.
 */
const CREDENCIAIS = [
  { valor: "21", rotulo: "anos de mar" },
  { valor: "500+", rotulo: "alunos formados" },
  { valor: "5,0", rotulo: "no Google" },
];

/**
 * Seção de autoridade.
 *
 * Responde à pergunta que fica de pé depois de o visitante ver preço e
 * conteúdo: "quem é essa pessoa para me ensinar?". Por isso vem depois da
 * vitrine, e não antes — currículo antes da oferta é conversa sobre o vendedor;
 * depois da oferta, é a garantia de que ela vale.
 *
 * O título é pergunta pelo mesmo motivo da seção do Método: "Quem vai guiar sua
 * evolução?" faz o visitante querer a resposta. "Sobre o instrutor" faz ele
 * rolar direto.
 *
 * Mantém o id="sobre" — é o destino do menu, e trocá-lo quebraria links já
 * existentes, inclusive os que o Ricardo talvez tenha compartilhado.
 */
export function InstructorSection() {
  return (
    <DarkSection id="sobre" ariaLabelledBy="sobre-title" tone="base">
      <Reveal>
        <p className="text-center font-display text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
          Autoridade
        </p>
      </Reveal>

      <Reveal index={1}>
        <h2
          id="sobre-title"
          className="mx-auto mt-4 max-w-[14ch] text-center font-display text-4xl uppercase leading-none tracking-tight md:text-5xl lg:text-6xl"
        >
          Quem vai guiar sua evolução?
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <Reveal index={2}>
          {/*
            O carrossel de fotos é o componente que já existe, sem alteração.
            Ele já resolve navegação e troca de imagem; reescrever aqui só para
            mudar a moldura seria jogar fora trabalho testado.
          */}
          <div className="min-h-[420px] w-full overflow-hidden rounded-2xl lg:min-h-[520px]">
            <InstructorPhotoCarousel />
          </div>
        </Reveal>

        <div>
          <Reveal index={3}>
            {/*
              <dl> e não <div>: cada número é a definição de um rótulo. O rótulo
              vai em sr-only dentro do <dt> para o leitor de tela anunciar
              "anos de mar: 21" em vez de dois textos soltos.
            */}
            <dl className="grid grid-cols-3 gap-4 border-b border-white/10 pb-8">
              {CREDENCIAIS.map((credencial) => (
                <div key={credencial.rotulo}>
                  <dt className="sr-only">{credencial.rotulo}</dt>

                  <dd>
                    <span className="block font-display text-4xl uppercase leading-none tracking-tight text-white md:text-5xl">
                      {credencial.valor}
                    </span>

                    <span
                      aria-hidden="true"
                      className="mt-2 block text-[10px] font-bold uppercase tracking-[0.13em] text-brand-ink-muted"
                    >
                      {credencial.rotulo}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {PROFESSOR_FRASE ? (
            <Reveal index={4}>
              <blockquote className="mt-8">
                <p className="font-display text-2xl uppercase leading-tight text-white md:text-3xl">
                  {PROFESSOR_FRASE}
                </p>

                <footer className="mt-4 text-sm text-brand-ink-muted">
                  <cite className="not-italic">
                    Ricardo Torquato — criador do Método T4
                  </cite>
                </footer>
              </blockquote>
            </Reveal>
          ) : null}

          {/*
            Reescrita comercial da copy original, autorizada pelo cliente em
            23/08. Todos os fatos foram preservados — 21 anos, 500+ alunos,
            surf análise, simulador, outside, criador do método —, mas cada
            parágrafo passou a carregar um argumento em vez de um currículo.

            A mudança de fundo: o texto anterior falava do que a T4 tem; este
            fala do que o visitante ganha. A ordem também mudou — diagnóstico,
            solução, promessa —, que é a mesma cadeia da página inteira.

            E corrige a contradição que existia aqui: dizia "cerca de 2 meses"
            enquanto o Hero promete 3. Uma página com duas promessas diferentes
            não tem promessa nenhuma.
          */}
          <Reveal index={5}>
            <div className="mt-8 space-y-4 leading-relaxed">
              <p>
                Foram{" "}
                <strong className="font-semibold text-white">
                  21 anos de mar
                </strong>{" "}
                e mais de{" "}
                <strong className="font-semibold text-white">
                  500 alunos formados
                </strong>{" "}
                para chegar a uma constatação simples: quase ninguém evolui
                devagar por falta de tempo na água. Evolui devagar porque
                ninguém nunca mostrou onde está o erro.
              </p>

              <p>
                É isso que o Método T4 faz.{" "}
                <strong className="font-semibold text-white">
                  Surf análise
                </strong>{" "}
                para você ver o próprio erro,{" "}
                <strong className="font-semibold text-white">simulador</strong>{" "}
                para corrigir o movimento na areia e{" "}
                <strong className="font-semibold text-white">
                  orientação no outside
                </strong>{" "}
                para levar o movimento certo até a onda. Em 3 meses você chega
                onde levaria 3 anos tentando adivinhar sozinho.
              </p>

              <p>
                Criador do método, o Ricardo transformou duas décadas de água em
                um caminho que dá para seguir — do primeiro drop até a primeira
                manobra executada de verdade.
              </p>
            </div>
          </Reveal>

          <Reveal index={6}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/*
                Mesmo componente de diálogo que já roda na página de Cursos, com
                o mesmo vídeo — muda só o rótulo, como o cliente pediu. Zero
                código novo: o comportamento de "clica e assiste" que ele quis
                preservar é literalmente o que já está em produção.
              */}
              <RelatosVideoDialog
                youtubeUrl={PROFESSOR_TRAJETORIA_YOUTUBE_URL}
                triggerLabel="Conhecer a história da T4"
                dialogTitle="A história da T4"
                dialogDescription="Conheça a trajetória, a experiência e a visão do Ricardo por trás do Método T4."
                triggerClassName="border-white/15 bg-transparent text-white hover:bg-white/10"
              />

              <Button
                asChild
                variant="ghost"
                className="h-12 rounded-full px-5 font-medium text-brand-ink-text hover:bg-white/10 hover:text-white"
              >
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="size-5" aria-hidden="true" />
                  Ver no Instagram
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </DarkSection>
  );
}
