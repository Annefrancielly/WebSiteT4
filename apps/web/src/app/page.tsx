import { Hero } from "@/features/components/home/Hero";
import { PlansSection } from "@/features/components/home/PlansSection";
import { CoursesSection } from "@/features/components/sections/CoursesSection";
import { InstructorSection } from "@/features/components/home/InstructorSection";
import { TestimonialsSection } from "@/features/components/home/TestimonialSection";
import { FaqContactSection } from "@/features/components/home/FaqContactSection";


export default function Home() {
  return (
    <main className="min-h-screen bg-brand-beige">
      <Hero />
      <PlansSection />
      <CoursesSection />

      <InstructorSection />
      <TestimonialsSection />
      <FaqContactSection />
    </main>
  );
}
