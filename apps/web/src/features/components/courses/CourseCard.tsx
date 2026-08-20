import Image from "next/image";

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
 * A hierarquia visual segue a ordem definida pelo cliente:
 * nome > preço atual > CTA > descrição > aulas/nível > preço anterior.
 */
export function CourseCard({ course }: Props) {
  const fullTitle = `${course.titleLead} ${course.titleAccent}`;

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-black/[0.06] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Proporção fixa: garante que os três cards fiquem alinhados e elimina
          layout shift, já que a imagem reserva o espaço antes de carregar. */}
      <div className="relative aspect-[4/3] w-full bg-brand-black/10">
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[27px] font-extrabold uppercase leading-[1.05]">
          <span className="block text-brand-black">{course.titleLead}</span>
          <span className="block text-brand-orange">{course.titleAccent}</span>
        </h3>

        <p className="mt-3 font-sans text-[15px] font-normal leading-relaxed text-brand-black/75">
          {course.description}
        </p>

        <p className="mt-4 font-sans text-[13px] font-medium text-brand-black/60">
          <span>{course.lessons} aulas</span>
          <span aria-hidden="true" className="px-2 text-brand-black/30">
            |
          </span>
          <span>{course.level}</span>
        </p>

        {/* mt-auto empurra preço e CTA para a base: com descrições de tamanhos
            diferentes, os botões dos três cards continuam na mesma linha. */}
        <div className="mt-auto pt-6">
          {course.oldPriceCents ? (
            <p className="font-sans text-[14px] text-brand-black/45 line-through">
              {formatBRL(course.oldPriceCents)}
            </p>
          ) : null}

          <p className="font-sans text-[32px] font-extrabold leading-none text-brand-turquoise-deep">
            {formatBRL(course.priceCents)}
          </p>

          {course.installments ? (
            <p className="mt-1 font-sans text-[13px] text-brand-black/70">
              ou {course.installments}
            </p>
          ) : null}

          <Button
            asChild
            className="mt-5 h-12 w-full rounded-lg font-display text-[18px] font-bold uppercase tracking-wide"
          >
            <CheckoutLink
              href={course.checkoutUrl}
              aria-label={`Comprar o curso ${fullTitle}`}
            >
              Comprar agora
            </CheckoutLink>
          </Button>
        </div>
      </div>
    </article>
  );
}
