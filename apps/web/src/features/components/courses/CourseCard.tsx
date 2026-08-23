import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Star } from "lucide-react";

import type { Course } from "@/constants/courses";
import { Button } from "@/features/components/ui/button";
import { formatBRL } from "@/lib/format";

import { CheckoutLink } from "./CheckoutLink";

type Props = {
  course: Course;
};

/**
 * Card comercial de um curso.
 *
 * Server Component: não tem estado nem evento próprio — o único trecho que
 * precisa do browser é o link de checkout, isolado em CheckoutLink. Assim a
 * página não vira Client Component inteira só por causa do CTA.
 *
 * A ordem de leitura é a ordem em que a objeção aparece:
 *
 *   nível          "isso é para o meu momento?"
 *   nome
 *   pitch          "o que muda para mim?"
 *   descrição      "como funciona?"
 *   o que aprende  "o que exatamente eu levo?"
 *   preço          "quanto custa?"          ← só depois de já querer
 *   CTA
 *   garantia       "e se não for para mim?"
 *   cross-sell     "e se eu errei de curso?"
 *
 * O preço vem tarde de propósito. Preço antes de desejo é só um número alto;
 * preço depois de sete linhas de valor é a conta que o visitante já estava
 * fazendo de cabeça.
 */
export function CourseCard({ course }: Props) {
  const fullTitle = `${course.titleLead} ${course.titleAccent}`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-ink-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-orange/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* Proporção fixa: alinha os três cards e elimina layout shift, já que a
          imagem reserva o espaço antes de carregar. */}
      <div className="relative aspect-[16/10] w-full bg-black/40">
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(max-width: 767px) 86vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover"
        />

        {/* Escurece a base da foto para o nível ficar legível sobre qualquer
            imagem — inclusive as que ainda vão ser substituídas. */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-brand-ink-card" />

        <span className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white/85">
          {course.level}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl uppercase leading-[1.05]">
          <span className="block text-white">{course.titleLead}</span>
          <span className="block text-brand-orange">{course.titleAccent}</span>
        </h3>

        <p className="mt-3 text-[15px] font-semibold leading-snug text-white">
          {course.pitch}
        </p>

        <p className="mt-2.5 text-sm leading-relaxed text-brand-ink-muted">
          {course.description}
        </p>

        <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-ink-muted">
          Você vai aprender
        </p>

        <ul className="mt-3 grid gap-2">
          {course.learnings.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm">
              <Check
                className="mt-0.5 size-4 shrink-0 text-brand-orange"
                strokeWidth={3}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}

          {course.bonus ? (
            <li className="flex items-start gap-2.5 text-sm text-white">
              <Star
                className="mt-0.5 size-4 shrink-0 fill-brand-orange text-brand-orange"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-brand-orange">
                  Bônus:
                </strong>{" "}
                {course.bonus}
              </span>
            </li>
          ) : null}
        </ul>

        {/* mt-auto empurra o bloco comercial para a base: com listas de tamanhos
            diferentes, os botões dos três cards continuam na mesma linha. */}
        <div className="mt-auto pt-7">
          <p className="text-xs text-brand-ink-muted">
            {course.lessons} aulas
          </p>

          <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
            {course.oldPriceCents ? (
              <p className="text-sm text-brand-ink-muted line-through">
                {formatBRL(course.oldPriceCents)}
              </p>
            ) : null}

            <p className="font-display text-3xl leading-none text-white">
              {formatBRL(course.priceCents)}
            </p>
          </div>

          {course.installments ? (
            <p className="mt-1.5 text-[13px] text-brand-ink-muted">
              ou {course.installments}
            </p>
          ) : null}

          <Button
            asChild
            className="mt-5 h-auto min-h-[48px] w-full rounded-lg bg-brand-orange font-display text-base uppercase tracking-wide text-brand-black hover:bg-brand-orange/90"
          >
            <CheckoutLink
              href={course.checkoutUrl}
              aria-label={`Comprar o curso ${fullTitle}`}
            >
              Quero este curso
              <ArrowRight className="size-4" aria-hidden="true" />
            </CheckoutLink>
          </Button>

          {/*
            A garantia fica logo abaixo do botão porque é aí que mora a última
            hesitação. Ela não é enfeite: é a resposta a "e se eu não gostar?",
            e vem do que a T4 já pratica (tag "Garantia 7 dias" em site-data).
          */}
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-brand-ink-muted">
            <ShieldCheck className="size-3.5" aria-hidden="true" />7 dias de
            garantia
          </p>

          {course.crossSell ? (
            <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-brand-ink-muted">
              {course.crossSell.pergunta}{" "}
              <Link
                href={`#card-${course.crossSell.alvoId}`}
                className="font-semibold text-brand-orange underline-offset-4 hover:underline"
              >
                {course.crossSell.rotulo}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
