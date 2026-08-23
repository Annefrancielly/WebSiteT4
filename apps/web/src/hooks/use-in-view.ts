"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fração do elemento que precisa estar visível para disparar. */
  threshold?: number;

  /**
   * Margem aplicada à área de detecção. O valor padrão encolhe 50px na base:
   * o elemento só conta como visto quando entrou de verdade, e não quando
   * encostou a primeira linha de pixels na borda inferior da tela.
   */
  rootMargin?: string;

  /**
   * Dispara uma vez e para de observar. É o comportamento certo para animação
   * de entrada: reanimar a cada rolagem transforma o site num piscar constante
   * e ainda custa CPU no celular.
   */
  once?: boolean;
};

/**
 * Diz se o elemento já entrou na área visível.
 *
 * Base de toda a animação de entrada do site. Fica isolado num hook porque a
 * regra "quando animar" é uma só e não deve ser reescrita em cada componente:
 * o dia em que o threshold precisar mudar, muda aqui.
 *
 * Usa IntersectionObserver em vez de listener de scroll de propósito. Listener
 * de scroll roda no thread principal a cada quadro e é a causa clássica de
 * travamento em celular; o observer é resolvido pelo navegador fora do thread
 * de JavaScript.
 *
 * Degradação: se IntersectionObserver não existir, o conteúdo aparece. Nunca o
 * contrário — conteúdo comercial não pode depender de API de navegador para
 * existir.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.2,
  rootMargin = "0px 0px -50px 0px",
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      // Revela no quadro seguinte, e não aqui direto: setState síncrono no
      // corpo do efeito provoca renderização em cascata — o próprio lint do
      // React barra. Um quadro de atraso é invisível e a regra continua sendo
      // "sem observer, o conteúdo aparece".
      const quadro = requestAnimationFrame(() => setInView(true));

      return () => cancelAnimationFrame(quadro);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
