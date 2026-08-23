import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "base" | "soft";

type Props = {
  /**
   * Âncora da seção. Opcional porque nem toda faixa escura é destino de menu.
   */
  id?: string;

  /**
   * Id do heading que dá nome à seção. Uma faixa escura costuma ser um bloco
   * de conteúdo com título próprio; sem isso, o leitor de tela anuncia apenas
   * "região", que não ajuda ninguém a navegar.
   */
  ariaLabelledBy?: string;

  /**
   * Alterna entre os dois fundos escuros. Duas faixas escuras seguidas com o
   * mesmo tom viram um bloco único de 200vh; alternar base/soft devolve o
   * limite entre elas sem precisar de linha divisória.
   */
  tone?: Tone;

  /** Ajuste de espaçamento/vertical por contexto. */
  className?: string;

  /** Ajuste do container interno (largura, alinhamento). */
  containerClassName?: string;

  children: ReactNode;
};

const TONE_BACKGROUND: Record<Tone, string> = {
  base: "bg-brand-ink",
  soft: "bg-brand-ink-soft",
};

/**
 * Faixa de conteúdo sobre fundo escuro.
 *
 * Existe para que o escuro entre no site em UM lugar. Sem isso, cada seção
 * nova repetiria a mesma tripla — fundo, cor de texto e cor de título — e o
 * dia em que o tom mudar viraria uma varredura por dezenas de arquivos.
 *
 * Define a cor de texto do bloco (`text-brand-ink-text`) e a dos headings,
 * porque a regra global de globals.css pinta todo heading de preto — sobre
 * fundo escuro isso seria texto invisível. A sobrescrita fica aqui, e não em
 * cada seção, pelo mesmo motivo acima.
 *
 * Os headings são listados um a um em vez de `[&_:is(h1,h2,h3)]` para não
 * depender de como o Tailwind escapa vírgulas dentro de variante arbitrária:
 * quatro classes previsíveis valem mais que uma classe engenhosa que só
 * falharia no build.
 *
 * É Server Component: não tem estado nem evento. Animação de entrada é
 * responsabilidade de quem for colocado dentro dela, não da faixa.
 */
export function DarkSection({
  id,
  ariaLabelledBy,
  tone = "base",
  className,
  containerClassName,
  children,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        TONE_BACKGROUND[tone],
        "text-brand-ink-text",
        "[&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white",
        "py-16 md:py-24 lg:py-32",
        className,
      )}
    >
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
