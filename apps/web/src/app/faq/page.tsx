import { FaqSection } from "@/features/components/sections/FaqSection";

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <FaqSection />
      </div>
    </div>
  );
}