import { COURSES } from "@/constants/courses";
import { cn } from "@/lib/utils";

import { CourseCard } from "./CourseCard";

type Props = {
  /**
   * Âncora da seção. Recebe valor por prop porque o mesmo bloco é montado na
   * Home e na página de Cursos, e dois elementos com o mesmo id na mesma
   * página quebram navegação por âncora e leitores de tela.
   */
  id?: string;
  eyebrow?: string;
  title?: string;

  /**
   * Ajuste de espaçamento por contexto: na página de Cursos a vitrine encosta
   * no vídeo, na Home ela vem logo depois do Hero e precisa de mais respiro.
   * É só isso que muda entre os dois usos — o resto é idêntico de propósito.
   */
  className?: string;
};

/**
 * Vitrine dos cursos: a oferta comercial principal do site.
 *
 * A faixa mantém o creme do site. A separação entre card e superfície vem da
 * elevação (sombra em duas camadas) e não de uma inversão de fundo — assim a
 * seção não corta a página ao meio. O preto fica reservado ao título.
 */
export function CoursesShowcase({
  id = "nossos-cursos",
  eyebrow = "Escolha seu caminho",
  title = "Nossos cursos",
  className,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("bg-brand-beige pt-8 pb-16 md:pb-24", className)}
    >
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center md:mb-12">
          <p className="font-display text-[16px] font-bold uppercase tracking-[0.18em] text-brand-orange">
            {eyebrow}
          </p>

          <h2
            id={`${id}-title`}
            className="mt-2 text-[32px] font-extrabold uppercase leading-tight text-brand-black"
          >
            {title}
          </h2>
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-3 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
