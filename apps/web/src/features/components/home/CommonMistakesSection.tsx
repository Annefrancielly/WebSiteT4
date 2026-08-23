import { DarkSection } from "@/features/components/shared/DarkSection";
import { Reveal } from "@/features/components/shared/Reveal";

type Erro = {
  numero: string;
  titulo: string;
  descricao: string;
};

/**
 * Os quatro erros vieram da copy que o próprio Ricardo usa no WhatsApp para
 * vender o Evolução: "perde a parede, entra atrasado, rema demais ou não gera
 * velocidade". Não foram inventados aqui — as descrições abaixo é que são
 * redação nova sobre o vocabulário dele.
 *
 * Os quatro e a ordem foram confirmados por ele em 23/08.
 */
const ERROS: Erro[] = [
  {
    numero: "01",
    titulo: "Perde a parede",
    descricao: "A onda quebra na frente e a sessão inteira vira remada.",
  },
  {
    numero: "02",
    titulo: "Entra atrasado",
    descricao: "O drop já começa errado, e todo o resto vem atrás.",
  },
  {
    numero: "03",
    titulo: "Rema demais",
    descricao: "Gasta energia onde não precisa e cansa antes da melhor série.",
  },
  {
    numero: "04",
    titulo: "Não gera velocidade",
    descricao: "Fica de pé, mas a onda passa por baixo sem ir a lugar nenhum.",
  },
];

/**
 * Os 4 erros que travam o progresso.
 *
 * Esta é a seção que faz o método valer dinheiro, e o mecanismo é o seguinte:
 * o visitante lê os quatro erros, reconhece o dele, e nesse instante o problema
 * dele deixa de ser vago ("não evoluo") e passa a ter nome. Problema com nome é
 * problema com solução — e a solução está três seções abaixo, à venda.
 *
 * Por isso ela vem depois do vídeo do Método e antes do seletor: primeiro a
 * razão para acreditar, depois o diagnóstico, e só então a escolha do curso.
 *
 * Server Component: é conteúdo estático. O hover é CSS, a entrada é o Reveal.
 */
export function CommonMistakesSection() {
  return (
    <DarkSection id="erros" ariaLabelledBy="erros-title" tone="soft">
      <Reveal>
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
          A causa
        </p>
      </Reveal>

      <Reveal index={1}>
        <h2
          id="erros-title"
          className="mt-4 max-w-[16ch] font-display text-4xl uppercase leading-none tracking-tight md:text-5xl lg:text-6xl"
        >
          Os 4 erros que travam o seu progresso
        </h2>
      </Reveal>

      <Reveal index={2}>
        <p className="mt-6 max-w-[62ch] text-lg leading-relaxed">
          Quem entra atrasado e não sabe que entra atrasado vai entrar atrasado
          outras mil vezes.{" "}
          <strong className="font-semibold text-white">
            A repetição não constrói técnica — constrói vício.
          </strong>{" "}
          O método começa nomeando o erro.
        </p>
      </Reveal>

      {/*
        Grade de divs, e não <ul>/<li>. Chegou a ser lista, mas cada item
        precisaria de `display: contents` para o Reveal virar o item da grade —
        e esse valor já removeu elementos da árvore de acessibilidade em
        navegadores que ainda circulam. Quatro cartões de conteúdo não ganham
        nada em serem uma lista formal; não vale trocar acessibilidade real por
        semântica de enfeite.
      */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ERROS.map((erro, indice) => (
          <Reveal key={erro.numero} index={indice + 3}>
              {/*
                O número é grande e apagado de propósito: ele organiza a leitura
                em sequência sem competir com o nome do erro, que é o que o
                visitante precisa reconhecer. No hover ele acende — a única
                função é confirmar que o cartão inteiro é uma unidade.
              */}
              <div className="group h-full rounded-2xl border border-white/10 bg-brand-ink-card p-6 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-brand-orange/45 hover:bg-brand-ink-card-2">
                <span
                  aria-hidden="true"
                  className="block font-display text-5xl leading-none tracking-tight text-brand-orange/25 transition-colors duration-300 group-hover:text-brand-orange/55 md:text-6xl"
                >
                  {erro.numero}
                </span>

                <h3 className="mt-3 font-display text-xl uppercase leading-tight text-white md:text-2xl">
                  {erro.titulo}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-brand-ink-muted">
                  {erro.descricao}
                </p>
              </div>
          </Reveal>
        ))}
      </div>
    </DarkSection>
  );
}
