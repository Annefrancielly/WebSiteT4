import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/features/components/ui/button";
import { DarkSection } from "@/features/components/shared/DarkSection";
import { Reveal } from "@/features/components/shared/Reveal";

/**
 * Último CTA da Home.
 *
 * Existe porque quem chega ao fim da página é quem leu tudo — e leu tudo quem
 * está interessado. Terminar a Home no FAQ deixaria essa pessoa sem nada para
 * fazer a não ser rolar de volta procurando um botão.
 *
 * A frase de apoio é uma escolha entre dois caminhos, não uma promessa nova:
 * "três anos de tentativa e erro, ou o curso certo para o seu momento". Ela
 * fecha o arco que o Hero abriu, com a mesma unidade de tempo, e não inventa
 * urgência artificial. Nada de contador regressivo, nada de "últimas vagas" —
 * a decisão continua sendo do visitante.
 *
 * Aponta para o SELETOR, e não para a vitrine. Quem chegou aqui sem comprar
 * provavelmente ainda não sabe qual dos três é o dele; mandá-lo de volta para
 * três produtos seria repetir a pergunta que ele não soube responder.
 */
export function FinalCtaSection() {
  return (
    <DarkSection ariaLabelledBy="cta-final-title" tone="soft">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-brand-orange">
            Comece hoje
          </p>
        </Reveal>

        <Reveal index={1}>
          <h2
            id="cta-final-title"
            className="mt-4 font-display text-4xl uppercase leading-none tracking-tight md:text-5xl lg:text-6xl"
          >
            Seu próximo nível{" "}
            <span className="text-brand-orange">começa aqui</span>
          </h2>
        </Reveal>

        <Reveal index={2}>
          <p className="mt-6 text-lg leading-relaxed">
            Três anos de tentativa e erro, ou o curso certo para o seu momento.
          </p>
        </Reveal>

        <Reveal index={3}>
          <Button
            asChild
            size="lg"
            className="group mt-9 h-auto min-h-[52px] rounded-lg bg-brand-orange px-8 font-display text-base uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-orange/90"
          >
            <Link href="#nivel">
              Encontre seu curso
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>

        <Reveal index={4}>
          <p className="mt-5 flex items-center justify-center gap-1.5 text-sm text-brand-ink-muted">
            <ShieldCheck className="size-4" aria-hidden="true" />7 dias de
            garantia · acesso imediato
          </p>
        </Reveal>
      </div>
    </DarkSection>
  );
}
