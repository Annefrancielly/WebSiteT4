import { withBasePath } from '@/lib/paths';

const COURSES_HERO_DESKTOP_IMAGE = withBasePath('/courses/banner-desktop-t4.png');
const COURSES_HERO_MOBILE_IMAGE = withBasePath('/courses/banner-mobile-t4.png');

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
        <source media="(max-width: 767px)" srcSet={COURSES_HERO_MOBILE_IMAGE} />
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