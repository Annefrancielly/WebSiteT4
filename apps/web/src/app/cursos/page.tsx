import Link from 'next/link';
import { OnlineCoursesIntro } from '@/features/components/home/OnlineCoursesIntro';
import { PainPointsSection } from '@/features/components/home/PainPointsSection';
import { CoursesSection } from '@/features/components/sections/CoursesSection';
import { FaqContactSection } from '@/features/components/home/FaqContactSection';
import { MethodologySection } from '@/features/components/home/MethodologySection';

export default function CursosPage() {
  return (
    <section className="bg-brand-beige">
      <OnlineCoursesIntro />
      <PainPointsSection />

      <MethodologySection badgeLabel="Metodologia" sectionTitle="Fase 1 e Fase 2 do Método T4" />

      <CoursesSection />
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
