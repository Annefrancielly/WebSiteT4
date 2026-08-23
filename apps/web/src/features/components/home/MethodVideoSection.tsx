import { METODO_VIDEO_YOUTUBE_URL } from "@/constants/site-data";
import { DarkSection } from "@/features/components/shared/DarkSection";
import { Reveal } from "@/features/components/shared/Reveal";
import { toYouTubeEmbedUrl } from "@/lib/youtube";

/**
 * Seção do Método T4 — pergunta no título, vídeo respondendo logo abaixo.
 *
 * Substitui as barras de progresso do protótipo, a pedido do cliente na reunião
 * de 20/08. A troca é melhor do que parece: barra de progresso é uma afirmação
 * que o visitante tem que acreditar; o vídeo é o Ricardo explicando, com a
 * autoridade de quem ensina. Prova social e argumento no mesmo elemento.
 *
 * O título é uma PERGUNTA de propósito. Pergunta abre um laço aberto na cabeça
 * de quem lê — a pessoa quer a resposta e é isso que faz ela dar o play. Um
 * título afirmativo ("O Método T4 acelera seu aprendizado") entregaria a
 * conclusão de graça e o vídeo viraria opcional.
 *
 * Server Component: nenhum estado, nenhum evento. O iframe é markup estático.
 */
export function MethodVideoSection() {
  /*
    A conversão acontece no servidor, em tempo de build. `toYouTubeEmbedUrl`
    valida a URL e devolve null se ela não for um link de YouTube reconhecível —
    então um erro de digitação no site-data vira "sem vídeo", e não um iframe
    apontando para lugar nenhum.

    Usa youtube-nocookie: o YouTube só grava cookie de rastreamento depois que a
    pessoa dá play, o que reduz a coleta de dados de quem só passou pela seção.
  */
  const urlDoEmbed = METODO_VIDEO_YOUTUBE_URL
    ? toYouTubeEmbedUrl(METODO_VIDEO_YOUTUBE_URL)
    : null;

  return (
    <DarkSection id="metodo" ariaLabelledBy="metodo-title" tone="base">
      <Reveal>
        <p className="text-center font-display text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
          O Método T4
        </p>
      </Reveal>

      <Reveal index={1}>
        <h2
          id="metodo-title"
          className="mx-auto mt-4 max-w-[20ch] text-center font-display text-4xl uppercase leading-none tracking-tight md:text-5xl lg:text-6xl"
        >
          Por que uns levam 3 anos e outros levam 3 meses?
        </h2>
      </Reveal>

      <Reveal index={2}>
        <p className="mx-auto mt-6 max-w-[60ch] text-center text-lg leading-relaxed">
          Não é falta de tempo na água. Muita gente surfa todo fim de semana
          durante anos e continua no mesmo lugar.
        </p>
      </Reveal>

      {urlDoEmbed && (
        <Reveal index={3}>
          {/*
            `aspect-video` reserva a altura do bloco antes de o vídeo carregar.
            Sem isso o conteúdo abaixo salta quando o iframe assume tamanho —
            é o layout shift que derruba o CLS e, pior, faz o visitante clicar
            no lugar errado.
          */}
          <div className="mx-auto mt-10 aspect-video w-full max-w-4xl overflow-hidden rounded-3xl bg-black shadow-[0_2px_6px_rgba(0,0,0,0.4),0_24px_60px_-18px_rgba(0,0,0,0.7)]">
            <iframe
              className="h-full w-full"
              src={urlDoEmbed}
              title="Método T4: por que uns levam 3 anos e outros levam 3 meses"
              /*
                `loading="lazy"` é o que segura o peso. Um player do YouTube
                carrega centenas de kB; adiado, ele só entra em cena quando a
                seção se aproxima da tela, e não disputa banda com o Hero.

                Mesmo padrão já usado em CoursePreviewSection — o cliente pediu
                explicitamente que funcione "como já temos na página de cursos".
              */
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </Reveal>
      )}
    </DarkSection>
  );
}
