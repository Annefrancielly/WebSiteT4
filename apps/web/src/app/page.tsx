import { Hero } from "@/features/components/home/Hero";
import { CoursesShowcase } from "@/features/components/courses/CoursesShowcase";
import { PlansSection } from "@/features/components/home/PlansSection";
import { InstructorSection } from "@/features/components/home/InstructorSection";
import { TestimonialsSection } from "@/features/components/home/TestimonialSection";
import { FaqContactSection } from "@/features/components/home/FaqContactSection";

export default function Home() {
  return (
    // <div> e não <main>: o layout já envolve as páginas em um <main>, e dois
    // elementos main no mesmo documento quebram a navegação por marcos dos
    // leitores de tela. O min-h-screen também já vem de lá.
    <div className="bg-brand-beige">
      <Hero />

      {/*
        Os cursos passam a abrir a oferta comercial, antes do carrossel de
        planos de aula. Os planos continuam íntegros — apenas deixam de ser a
        primeira coisa que o visitante encontra depois do Hero.
      */}
      <CoursesShowcase id="cursos" className="pt-16 md:pt-20" />

      <PlansSection />

      <InstructorSection />
      <TestimonialsSection />
      <FaqContactSection />
    </div>
  );
}
