"use client";

import { useEffect, useState } from "react";

/**
 * Diz se a página já rolou além de um ponto.
 *
 * Duas coisas dependem disso — o cabeçalho, que precisa deixar de ser
 * transparente, e a barra de compra do celular, que só deve aparecer depois do
 * Hero. Como a regra é a mesma, ela mora aqui em vez de ser escrita duas vezes.
 *
 * `passive: true` promete ao navegador que não vamos chamar preventDefault, o
 * que o libera para rolar sem esperar o JavaScript. Sem essa promessa, um
 * listener de scroll trava a rolagem no celular.
 *
 * A leitura acontece dentro de requestAnimationFrame, no máximo uma por quadro.
 * O evento de scroll dispara dezenas de vezes por segundo; sem o agendamento,
 * seriam dezenas de renderizações do React por segundo para trocar uma classe.
 */
export function useScrolledPast(limitePx: number): boolean {
  const [passou, setPassou] = useState(false);

  useEffect(() => {
    let agendado = false;

    const avaliar = () => {
      agendado = false;
      setPassou(window.scrollY > limitePx);
    };

    const aoRolar = () => {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(avaliar);
    };

    // A primeira leitura também passa pelo rAF: chamar setState direto no corpo
    // do efeito provoca renderização em cascata. Cobre o caso de a página abrir
    // já rolada — recarregar no meio, ou voltar pelo histórico.
    const primeira = requestAnimationFrame(avaliar);

    window.addEventListener("scroll", aoRolar, { passive: true });

    return () => {
      cancelAnimationFrame(primeira);
      window.removeEventListener("scroll", aoRolar);
    };
  }, [limitePx]);

  return passou;
}
