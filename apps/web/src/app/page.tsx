import { HeroSection } from "@/features/components/home/HeroSection";
import { LevelSelector } from "@/features/components/home/LevelSelector";
import { CoursesShowcase } from "@/features/components/courses/CoursesShowcase";
import { PlansSection } from "@/features/components/home/PlansSection";
import { InstructorSection } from "@/features/components/home/InstructorSection";
import { TestimonialsSection } from "@/features/components/home/TestimonialSection";
import { FaqContactSection } from "@/features/components/home/FaqContactSection";

/**
 * Home em transição.
 *
 * As três primeiras seções já são as do protótipo aprovado; as de baixo ainda
 * são as antigas. A costura entre o bloco escuro e o creme é visível de
 * propósito — é o limite exato de até onde a refatoração chegou, e some quando
 * as seções restantes forem reconstruídas.
 *
 * A ordem obedece à sequência da decisão de compra:
 *
 *   promessa  ->  "isso é para mim?"  ->  a oferta
 *   Hero          LevelSelector           CoursesShowcase
 *
 * O seletor precisa vir ANTES da vitrine: ele existe para levar o visitante
 * direto ao card certo, e não faria sentido oferecer o atalho depois que ele já
 * percorreu os três.
 */
export default function Home() {
  return (
    // <div> e não <main>: o layout já envolve as páginas em um <main>, e dois
    // elementos main no mesmo documento quebram a navegação por marcos dos
    // leitores de tela. O min-h-screen também já vem de lá.
    <div className="bg-brand-beige">
      <HeroSection />

      <LevelSelector />

      <CoursesShowcase id="cursos" className="pt-16 md:pt-20" />

      <PlansSection />

      <InstructorSection />
      <TestimonialsSection />
      <FaqContactSection />
    </div>
  );
}
