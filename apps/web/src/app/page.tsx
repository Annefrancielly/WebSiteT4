import { HeroSection } from "@/features/components/home/HeroSection";
import { StatsStrip } from "@/features/components/home/StatsStrip";
import { MethodVideoSection } from "@/features/components/home/MethodVideoSection";
import { CommonMistakesSection } from "@/features/components/home/CommonMistakesSection";
import { LevelSelector } from "@/features/components/home/LevelSelector";
import { CoursesShowcase } from "@/features/components/courses/CoursesShowcase";
import { TestimonialsSection } from "@/features/components/home/TestimonialSection";
import { InstructorSection } from "@/features/components/home/InstructorSection";
import { InPersonBand } from "@/features/components/home/InPersonBand";
import { FaqContactSection } from "@/features/components/home/FaqContactSection";
import { FinalCtaSection } from "@/features/components/home/FinalCtaSection";
import { MobileBuyBar } from "@/features/components/home/MobileBuyBar";

/**
 * Home.
 *
 * A ordem das seções é a própria sequência da decisão de compra, e cada passo
 * responde à objeção que o passo anterior levanta:
 *
 *   HeroSection            a promessa: 3 meses no lugar de 3 anos
 *      ↓                   "será que é verdade?"
 *   StatsStrip             os números
 *      ↓                   "por que comigo seria diferente?"
 *   MethodVideoSection     o Ricardo explicando
 *      ↓                   "e qual é o meu caso?"
 *   CommonMistakesSection  os 4 erros — o visitante reconhece o dele
 *      ↓                   "então qual curso é o meu?"
 *   LevelSelector          ele declara a situação
 *      ↓
 *   CoursesShowcase        a oferta
 *      ↓                   "funciona mesmo?"
 *   TestimonialsSection    alunos gravados antes e depois
 *      ↓                   "e quem é essa pessoa para me ensinar?"
 *   InstructorSection      a autoridade
 *      ↓
 *   InPersonBand           aulas presenciais, para quem mora em Aracaju
 *      ↓                   "ainda tenho uma dúvida"
 *   FaqContactSection      as seis objeções que travam a compra
 *      ↓
 *   FinalCtaSection        o último convite
 *
 * Nenhuma dessas posições é decorativa. Trocar duas de lugar quebra a cadeia:
 * o Método antes dos números pede fé sem prova; o seletor antes dos erros pede
 * decisão de quem ainda não sabe qual é o problema dele; a prova antes da
 * oferta prova algo que o visitante ainda não sabe que quer; e o FAQ depois do
 * último CTA responde uma dúvida que já fez a pessoa ir embora.
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

      <CoursesShowcase id="cursos" />

      <TestimonialsSection />

      <InstructorSection />

      <InPersonBand />

      <FaqContactSection />

      <FinalCtaSection />

      {/*
        Fica por último no JSX porque é sobreposição, não conteúdo: assim ela é
        o último elemento na ordem de tabulação, depois de tudo que a página
        realmente tem a dizer.
      */}
      <MobileBuyBar />
    </div>
  );
}
