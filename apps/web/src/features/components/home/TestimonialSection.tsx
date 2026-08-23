import Image from "next/image";
import { Play, Star } from "lucide-react";

import {
  DEPOIMENTOS_EM_VIDEO,
  GOOGLE_AVALIACOES,
  GOOGLE_AVALIACOES_URL,
  GOOGLE_NOTA,
  type DepoimentoEmVideo,
} from "@/constants/site-data";
import { DarkSection } from "@/features/components/shared/DarkSection";
import { RelatosVideoDialog } from "@/features/components/shared/RelatosVideoDialog";
import { Reveal } from "@/features/components/shared/Reveal";
import { withBasePath } from "@/lib/paths";
import { cn } from "@/lib/utils";

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
    caption: "WhatsApp",
  },
  {
    id: 2,
    src: withBasePath("/feedback/whatsapp-0202.jpg"),
    alt: "Print de depoimento no WhatsApp sobre aulas e metodologia",
    senderName: "Leonardo",
    caption: "WhatsApp",
  },
  {
    id: 3,
    src: withBasePath("/feedback/relato4.jpg"),
    alt: "Print de conversa no WhatsApp elogiando a evolução nas aulas",
    senderName: "Haniel",
    caption: "WhatsApp",
  },
  {
    id: 4,
    src: withBasePath("/feedback/Relato3.jpg"),
    alt: "Print de avaliação de aluno no WhatsApp sobre experiência nas aulas",
    senderName: "Seichele Barbosa",
    caption: "Instagram",
  },
];

const TAG_ANTES_E_DEPOIS = "Primeira aula → 3 meses";

/** Logotipo do Google em SVG inline: some do bundle e some da lista de requisições. */
function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
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
    </svg>
  );
}

/**
 * Miolo visual do card: a área do vídeo.
 *
 * A proporção 9/13 é quase a de um vídeo vertical de celular — que é como o
 * Ricardo vai gravar e como o visitante está acostumado a assistir. Fixá-la
 * garante que os três cards fiquem do mesmo tamanho antes de qualquer mídia
 * carregar.
 *
 * O fundo é um gradiente, não uma imagem: enquanto não houver miniatura, um
 * degradê pesa zero byte e não parece um espaço quebrado.
 */
function AreaDoVideo({ interativo }: { interativo: boolean }) {
  return (
    <div className="relative flex aspect-[9/13] items-end bg-[radial-gradient(100%_80%_at_35%_12%,#1a3d4c,transparent_62%),linear-gradient(180deg,#0e1a21,#0a1319)] p-4">
      <span className="rounded-full bg-black/45 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.13em] text-white/55 backdrop-blur-sm">
        {TAG_ANTES_E_DEPOIS}
      </span>

      {interativo ? (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-orange/90 text-brand-black transition-transform duration-300 group-hover:scale-110"
        >
          <Play className="size-5 fill-current" />
        </span>
      ) : (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.15em] text-white/30">
          Em gravação
        </span>
      )}
    </div>
  );
}

/** Rodapé do card: nível, nome e frase do aluno. */
function LegendaDoCard({ depoimento }: { depoimento: DepoimentoEmVideo }) {
  return (
    <div className="p-5 text-left">
      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-brand-orange">
        {depoimento.nivel}
      </p>

      {depoimento.nome ? (
        <p className="mt-2 text-[17px] font-semibold text-white">
          {depoimento.nome}
        </p>
      ) : (
        <p className="mt-2 text-[17px] font-semibold text-white/35">
          Depoimento em breve
        </p>
      )}

      {depoimento.frase ? (
        <p className="mt-2 text-sm leading-relaxed text-brand-ink-muted">
          “{depoimento.frase}”
        </p>
      ) : null}
    </div>
  );
}

/**
 * Depoimentos — "3 meses. Veja você mesmo."
 *
 * Esta é a seção mais importante da página depois da vitrine, e a razão é o
 * formato: no surf o resultado PODE SER FILMADO. Cada aluno gravado na primeira
 * aula e três meses depois, no mesmo pico. Ninguém precisa acreditar em
 * adjetivo — é só assistir.
 *
 * É também a única prova que responde à promessa do Hero na mesma unidade em
 * que ela foi feita. O Hero promete três meses; aqui estão os três meses.
 *
 * Server Component: os cards são markup estático e só o diálogo do vídeo, que
 * já era client, roda no navegador.
 *
 * ESTADO ATUAL: os vídeos ainda não existem. Os cards aparecem em espera, sem
 * nome e sem frase inventados. Assim que o Ricardo enviar o material, é
 * preencher DEPOIMENTOS_EM_VIDEO em site-data.ts e a seção se completa sozinha.
 */
export function TestimonialsSection() {
  return (
    <DarkSection
      id="resultados"
      ariaLabelledBy="resultados-title"
      tone="base"
      className="scroll-mt-24"
    >
      <Reveal>
        <p className="text-center font-display text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
          A prova
        </p>
      </Reveal>

      <Reveal index={1}>
        {/*
          Sem `max-w` em ch: era ele que quebrava o título em duas linhas. A
          frase é curta o bastante para caber inteira até em telas médias, e
          quebrar "3 meses" de "Veja você mesmo" separava a promessa do convite
          — que é justamente o que a frase junta.
        */}
        <h2
          id="resultados-title"
          className="mt-4 text-center font-display text-4xl uppercase leading-none tracking-tight md:text-5xl lg:text-6xl"
        >
          3 meses - Veja você mesmo.
        </h2>
      </Reveal>

      <Reveal index={2}>
        <p className="mx-auto mt-6 max-w-[62ch] text-center text-lg leading-relaxed">
          No surf o resultado pode ser filmado. Cada aluno abaixo foi gravado na
          primeira aula e três meses depois, no mesmo pico.
        </p>
      </Reveal>

      {/*
        Mesma medida do trilho de prints (max-w-5xl). Um bloco de conteúdo por
        seção, sempre na mesma largura: é o que faz a página parecer alinhada
        mesmo quando cada seção tem uma grade diferente.

        Também evita que os cards fiquem enormes: em 1280px sem limite, cada um
        passaria de 400px de largura e, na proporção 9/13, quase 600px de
        altura — os três ocupariam a tela inteira sozinhos.
      */}
      <div className="mx-auto mt-11 grid max-w-5xl gap-5 md:grid-cols-3">
        {DEPOIMENTOS_EM_VIDEO.map((depoimento, indice) => {
          const cartao = (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-brand-ink-card transition-colors duration-300">
              <AreaDoVideo interativo={Boolean(depoimento.youtubeUrl)} />
              <LegendaDoCard depoimento={depoimento} />
            </div>
          );

          return (
            <Reveal key={depoimento.id} index={indice + 3}>
              {depoimento.youtubeUrl ? (
                /*
                  O card inteiro é o gatilho do vídeo — é um <button>, e não uma
                  <div> com onClick: assim ele entra na ordem de tabulação,
                  responde ao Enter e é anunciado como botão. Área de clique
                  grande é decisão de conversão; ser um botão de verdade é o que
                  a torna utilizável por todo mundo.
                */
                <RelatosVideoDialog
                  youtubeUrl={depoimento.youtubeUrl}
                  dialogTitle={`Evolução em 3 meses — nível ${depoimento.nivel}`}
                  dialogDescription="Gravado na primeira aula e três meses depois, no mesmo pico."
                  trigger={
                    <button
                      type="button"
                      className="group block w-full rounded-2xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange"
                      aria-label={`Assistir ao depoimento em vídeo — nível ${depoimento.nivel}`}
                    >
                      {cartao}
                    </button>
                  }
                />
              ) : (
                cartao
              )}
            </Reveal>
          );
        })}
      </div>

      {/*
        As duas provas abaixo são secundárias, mas verificáveis — e é isso que
        as mantém aqui enquanto os vídeos não existem. A nota do Google o
        visitante confere na fonte; os prints são material real que a T4 já
        publica hoje.

        Quando os vídeos entrarem, esta parte pode encolher ou sair: são duas
        remoções isoladas, sem tocar no resto da seção.
      */}
      <Reveal index={6}>
        <div className="mt-16 flex justify-center border-t border-white/10 pt-10">
          <a
            href={GOOGLE_AVALIACOES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-brand-ink-card px-6 py-5 transition-colors duration-300 hover:border-white/25"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white">
              <GoogleGIcon className="size-6" />
            </span>

            <span>
              <span className="flex items-center gap-2">
                <span className="font-display text-2xl uppercase leading-none text-white">
                  {GOOGLE_NOTA.toFixed(1).replace(".", ",")}
                </span>

                <span className="flex" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <Star
                      key={estrela}
                      className="size-4 fill-brand-orange text-brand-orange"
                    />
                  ))}
                </span>
              </span>

              <span className="mt-1 block text-sm text-brand-ink-muted">
                {GOOGLE_AVALIACOES} avaliações no Google — T4 Aulas de Surf
              </span>
            </span>
          </a>
        </div>
      </Reveal>

      <Reveal index={7}>
        <p className="mt-10 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-brand-ink-muted">
          Mensagens de alunos, sem edição
        </p>
      </Reveal>

      {/*
        O trilho precisa de DUAS coisas para ficar centralizado, e é por isso
        que ele tem um invólucro:

        1. `mx-auto max-w-5xl` no invólucro centraliza a faixa dentro da seção.
           Sem ele, quatro prints estreitos num container de 1280px ficavam
           encostados à esquerda com um vão à direita.

        2. `lg:justify-center` no trilho centraliza os cards quando eles cabem
           todos. Só a partir de lg, e a razão é uma armadilha conhecida: com
           `justify-center` em um flex que TRANSBORDA, o navegador corta o
           início do conteúdo e o primeiro item fica inalcançável pela rolagem.
           Abaixo de lg o trilho transborda de propósito, então ali ele
           permanece alinhado à esquerda.
      */}
      <div className="mx-auto mt-4 w-full max-w-5xl">
        <div
          role="region"
          aria-label="Feedbacks de alunos"
          tabIndex={0}
          className={cn(
            "flex gap-4",
            "-mx-4 snap-x snap-mandatory overflow-x-auto px-4 pb-4",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "md:mx-0 md:px-0",
            "lg:justify-center",
          )}
        >
          {WHATSAPP_FEEDBACKS.map((feedback, indice) => (
            <Reveal
              key={feedback.id}
              index={indice + 8}
              className="w-[62%] shrink-0 snap-center sm:w-[38%] lg:w-[calc(25%-0.75rem)]"
            >
              <figure className="h-full overflow-hidden rounded-2xl border border-white/10 bg-brand-ink-card">
                {/*
                  object-contain, e não cover: cortar um print corta justamente
                  a frase que o aluno escreveu.
                */}
                <div className="aspect-[37/62] w-full bg-white/[0.04] p-3">
                  <div className="relative h-full w-full">
                    <Image
                      src={feedback.src}
                      alt={feedback.alt}
                      fill
                      sizes="(max-width: 640px) 62vw, (max-width: 1024px) 38vw, 240px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <figcaption className="border-t border-white/10 px-4 py-3">
                  <p className="text-sm font-semibold text-white">
                    {feedback.senderName}
                  </p>

                  <p className="mt-0.5 text-[11px] uppercase tracking-wide text-brand-ink-muted">
                    {feedback.caption}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}
