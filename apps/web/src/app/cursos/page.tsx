import type { Metadata } from 'next';
import Link from 'next/link';
import { OnlineCoursesIntro } from '@/features/components/home/OnlineCoursesIntro';
import { PainPointsSection } from '@/features/components/home/PainPointsSection';
import { FaqContactSection } from '@/features/components/home/FaqContactSection';
import { MethodologySection } from '@/features/components/home/MethodologySection';
import { CoursePreviewSection } from '@/features/components/sections/CoursePreviewSection';
import { CoursesShowcase } from '@/features/components/courses/CoursesShowcase';
import { TestimonialsSection } from '@/features/components/home/TestimonialSection';

/**
 * Metadata própria da página. Antes ela herdava o title genérico do layout,
 * o que desperdiçava a principal página comercial do site nos resultados de
 * busca. Título e descrição reaproveitam a copy já aprovada pelo cliente.
 */
export const metadata: Metadata = {
  // Sem "| T4 Surf": o template do layout já acrescenta o sufixo da marca.
  title: 'Cursos de Surf Online',
  description:
    'Aprenda a surfar do zero ao avançado. O método completo mais prático, rápido e seguro para você dominar o surf de verdade.',
};

export default function CursosPage() {
  return (
    <section className="bg-brand-beige">
      <OnlineCoursesIntro />

      <CoursePreviewSection />
      <CoursesShowcase id="cursos" />
      <PainPointsSection />

      <MethodologySection badgeLabel="Metodologia" sectionTitle="Fase 1 e Fase 2 do Método T4" />
      <TestimonialsSection />
      <FaqContactSection />

      <div className="px-4 pb-10 pt-2">
        <div className="mx-auto flex w-full max-w-7xl justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-brand-black/15 bg-transparent px-5 py-2 text-sm font-medium uppercase tracking-[0.14em] text-brand-black/75 transition-colors duration-200 hover:border-brand-black/30 hover:bg-brand-black/5 hover:text-brand-black"
          >
            início
          </Link>
        </div>
      </div>
    </section>
  );
}
