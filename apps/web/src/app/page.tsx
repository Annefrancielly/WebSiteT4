import { HeroSection } from "@/features/components/home/HeroSection";
import { MethodVideoSection } from "@/features/components/home/MethodVideoSection";
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
 *   promessa -> por que acredito -> isso é para mim? -> a oferta
 *   Hero        MethodVideo        LevelSelector       CoursesShowcase
 *
 * Duas regras de ordem que não devem ser trocadas por conveniência:
 *
 * - o Método vem antes do seletor porque ninguém escolhe um curso de quem ainda
 *   não convenceu. Primeiro a razão para acreditar, depois o pedido de decisão.
 * - o seletor vem antes da vitrine porque ele existe para levar o visitante
 *   direto ao card certo; oferecer o atalho depois que ele já percorreu os três
 *   não serviria para nada.
 */
export default function Home() {
  return (
    // <div> e não <main>: o layout já envolve as páginas em um <main>, e dois
    // elementos main no mesmo documento quebram a navegação por marcos dos
    // leitores de tela. O min-h-screen também já vem de lá.
    <div className="bg-brand-beige">
      <HeroSection />

      <MethodVideoSection />

      <LevelSelector />

      <CoursesShowcase id="cursos" className="pt-16 md:pt-20" />

      <PlansSection />

      <InstructorSection />
      <TestimonialsSection />
      <FaqContactSection />
    </div>
  );
}
