"use client";

import type { ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Escalonamento entre irmãos: 70ms por posição, com teto na sétima.
 *
 * O teto existe porque atraso cresce linearmente e percepção não: numa lista de
 * doze itens, o último apareceria quase um segundo depois do primeiro e a
 * animação viraria espera. Sete degraus já entregam a leitura de sequência.
 */
const STAGGER_MS = 70;
const MAX_STAGGER_STEPS = 6;

type Props = {
  children: ReactNode;

  /**
   * Posição do elemento entre os irmãos animados. Só serve para escalonar a
   * entrada — não tem relação com ordem de conteúdo nem com acessibilidade.
   */
  index?: number;

  className?: string;
};

/**
 * Faz o conteúdo entrar quando chega à tela.
 *
 * Decisões que valem registrar:
 *
 * 1. Anima OPACITY e TRANSFORM, nada mais. São as duas únicas propriedades que
 *    o navegador resolve na GPU sem recalcular layout. Animar `height`, `top`
 *    ou `margin` obrigaria a um reflow por quadro — é assim que animação bonita
 *    vira travamento em celular intermediário, que é o aparelho do público do
 *    T4.
 *
 * 2. `motion-reduce:` desliga tudo por CSS, não por JavaScript. Quem configurou
 *    o sistema para reduzir movimento recebe o conteúdo direto, sem esperar
 *    hidratação.
 *
 * 3. A classe `reveal` não tem estilo: é só o gancho que o <noscript> do layout
 *    usa para tornar tudo visível quando o JavaScript não roda. Sem ela, uma
 *    falha de script deixaria a página em branco — com o texto presente no HTML,
 *    porém transparente.
 *
 * Isto é envelope de entrada, não estrutura. O elemento renderizado é um `div`;
 * se o filho precisar ser item de grid ou de lista, o `Reveal` é que deve ocupar
 * essa posição, não ser colocado dentro dela.
 */
export function Reveal({ children, index = 0, className }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const delayMs = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_MS;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        "reveal",
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        inView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
