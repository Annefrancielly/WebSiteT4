import { withBasePath } from '@/lib/paths';

const COURSES_HERO_DESKTOP_IMAGE = withBasePath("/courses/Banner-Desktop-T4.png");
const COURSES_HERO_MOBILE_IMAGE = withBasePath("/courses/Banner-Mobile-T4.png");

// Mesma arte, em WebP. O PNG continua como fallback nos <source> seguintes:
// o navegador escolhe o primeiro formato que sabe exibir, então nada quebra
// em quem não suporta WebP.
const COURSES_HERO_DESKTOP_WEBP = withBasePath("/courses/Banner-Desktop-T4.webp");
const COURSES_HERO_MOBILE_WEBP = withBasePath("/courses/Banner-Mobile-T4.webp");

export function OnlineCoursesIntro() {
  return (
    <section
      aria-labelledby="online-courses-hero-title"
      className="w-full overflow-hidden bg-brand-black"
    >
      <h1 id="online-courses-hero-title" className="sr-only">
        Método T4 — Aprenda a surfar
      </h1>

      <picture className="block w-full">
        <source media="(max-width: 767px)" type="image/webp" srcSet={COURSES_HERO_MOBILE_WEBP} />
        <source media="(max-width: 767px)" srcSet={COURSES_HERO_MOBILE_IMAGE} />

        <source media="(min-width: 768px)" type="image/webp" srcSet={COURSES_HERO_DESKTOP_WEBP} />
        <source media="(min-width: 768px)" srcSet={COURSES_HERO_DESKTOP_IMAGE} />

        <img
          src={COURSES_HERO_DESKTOP_IMAGE}
          alt="Método T4 — Aprenda a surfar em 3 meses o que você levaria 3 anos"
          className="block h-auto w-full"
          loading="eager"
          decoding="async"
        />
      </picture>
    </section>
  );
}
