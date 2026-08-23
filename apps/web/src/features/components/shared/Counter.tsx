"use client";

import { useEffect, useMemo, useState } from "react";

import { useInView } from "@/hooks/use-in-view";

const DEFAULT_DURATION_MS = 1200;

type Props = {
  /** Valor final. É ele, e não o zero inicial, que vai para o HTML estático. */
  to: number;

  /** Casas decimais. `4.9` precisa de 1; `500` precisa de 0. */
  decimals?: number;

  /** Texto colado antes/depois do número: "R$ ", "+", "%". */
  prefix?: string;
  suffix?: string;

  durationMs?: number;
  className?: string;
};

/**
 * Número que conta até o valor final quando entra na tela.
 *
 * Por que existe: um número parado é informação; um número que sobe é prova
 * social. O olho acompanha o movimento e o dado fica registrado. É o único
 * lugar do site onde animação tem função comercial e não decorativa.
 *
 * Três decisões que evitam problema:
 *
 * 1. O valor FINAL é o que sai no HTML gerado no build. Como o site é export
 *    estático, é esse HTML que o Google lê e que aparece se o JavaScript
 *    falhar. Um contador que nasce em "0" publicaria "0 alunos" para o
 *    buscador.
 *
 * 2. A contagem só recomeça do zero quando o elemento entra na tela — nunca na
 *    montagem. Assim o número nunca "volta" na frente do visitante.
 *
 * 3. `requestAnimationFrame` em vez de `setInterval`: o navegador sincroniza com
 *    o quadro da tela e congela a contagem quando a aba está em segundo plano,
 *    em vez de acumular atualizações para descarregar todas de uma vez.
 *
 * O leitor de tela recebe apenas o valor final, via `sr-only`. Texto mudando 60
 * vezes por segundo em região viva seria anunciado repetidamente.
 */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = DEFAULT_DURATION_MS,
  className,
}: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });

  /**
   * O estado guarda o PROGRESSO da animação (0 a 1), não o número exibido.
   *
   * A diferença resolve três coisas de uma vez:
   * - começa em 1, então a primeira renderização — a do HTML estático — já sai
   *   com o valor final;
   * - o número exibido é derivado de `to` a cada render, então mudar a prop
   *   nunca deixa um valor velho na tela;
   * - dispensa "zerar" o contador antes de animar, o que exigiria um setState
   *   síncrono dentro do efeito.
   */
  const [progresso, setProgresso] = useState(1);

  const formatar = useMemo(() => {
    const formatador = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return (numero: number) => formatador.format(numero);
  }, [decimals]);

  useEffect(() => {
    if (!inView) return;

    const prefereMenosMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Nada a fazer: o progresso já está em 1, ou seja, no valor final.
    if (prefereMenosMovimento) return;

    let quadro = 0;
    let inicio: number | null = null;

    const passo = (agora: number) => {
      if (inicio === null) inicio = agora;

      const decorrido = Math.min((agora - inicio) / durationMs, 1);

      // Cubic ease-out: começa rápido e desacelera até parar. A curva importa —
      // com progresso linear a contagem parece um relógio digital; com
      // desaceleração ela parece chegar a um resultado.
      setProgresso(1 - Math.pow(1 - decorrido, 3));

      if (decorrido < 1) quadro = requestAnimationFrame(passo);
    };

    quadro = requestAnimationFrame(passo);

    return () => cancelAnimationFrame(quadro);
  }, [inView, durationMs]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${prefix}${formatar(to)}${suffix}`}</span>

      <span aria-hidden="true">
        {prefix}
        {formatar(to * progresso)}
        {suffix}
      </span>
    </span>
  );
}
