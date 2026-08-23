import { HeroSection } from "@/features/components/home/HeroSection";
import { StatsStrip } from "@/features/components/home/StatsStrip";
import { MethodVideoSection } from "@/features/components/home/MethodVideoSection";
import { CommonMistakesSection } from "@/features/components/home/CommonMistakesSection";
import { LevelSelector } from "@/features/components/home/LevelSelector";
import { CoursesShowcase } from "@/features/components/courses/CoursesShowcase";
import { MobileBuyBar } from "@/features/components/home/MobileBuyBar";
import { PlansSection } from "@/features/components/home/PlansSection";
import { InstructorSection } from "@/features/components/home/InstructorSection";
import { TestimonialsSection } from "@/features/components/home/TestimonialSection";
import { FaqContactSection } from "@/features/components/home/FaqContactSection";

/**
 * Home.
 *
 * A ordem das seções é a própria sequência da decisão de compra, e cada passo
 * responde à objeção que o passo anterior levanta:
 *
 *   Hero                 a promessa: 3 meses no lugar de 3 anos
 *      ↓                 "será que é verdade?"
 *   StatsStrip           os números
 *      ↓                 "por que comigo seria diferente?"
 *   MethodVideoSection   o Ricardo explicando
 *      ↓                 "e qual é o meu caso?"
 *   CommonMistakesSection  os 4 erros — o visitante reconhece o dele
 *      ↓                 "então qual curso é o meu?"
 *   LevelSelector        ele declara a situação
 *      ↓
 *   CoursesShowcase      a oferta
 *
 * Nenhuma dessas posições é decorativa. Trocar duas de lugar quebra a cadeia:
 * o Método antes dos números pede fé sem prova; o seletor antes dos erros pede
 * uma decisão de quem ainda não sabe qual é o problema dele; e a vitrine antes
 * do seletor torna o atalho inútil, porque o visitante já percorreu os cards.
 *
 * Da PlansSection para baixo ainda é o site antigo. A costura entre o bloco
 * escuro e o creme é o limite exato de até onde a refatoração chegou.
 */
export default function Home() {
  return (
    // <div> e não <main>: o layout já envolve as páginas em um <main>, e dois
    // elementos main no mesmo documento quebram a navegação por marcos dos
    // leitores de tela. O min-h-screen também já vem de lá.
    <div className="bg-brand-beige">
      <HeroSection />

      <StatsStrip />

      <MethodVideoSection />

      <CommonMistakesSection />

      <LevelSelector />

      <CoursesShowcase id="cursos" className="pt-16 md:pt-20" />

      <PlansSection />

      <InstructorSection />
      <TestimonialsSection />
      <FaqContactSection />

      {/*
        Fica por último no JSX porque é sobreposição, não conteúdo: assim ela é
        o último elemento na ordem de tabulação, depois de tudo que a página
        realmente tem a dizer.
      */}
      <MobileBuyBar />
    </div>
  );
}
