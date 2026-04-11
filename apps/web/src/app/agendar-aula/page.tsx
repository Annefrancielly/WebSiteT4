import { ContactCards } from "@/features/components/sections/ContactCards";
import { BusinessHours } from "@/features/components/sections/BusinessHours";
import { TrustBar } from "@/features/components/sections/TrustBar";

export default function AgendarAulaPage() {
  return (
    <section className="min-h-screen bg-[#F5F5F0] pt-[160px] pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#40B5AD]/20 text-[#40B5AD] px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            Agendamento
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Agende sua Aula de Surf!
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Entre em contato conosco diretamente via WhatsApp para agendar sua
            aula. Responderemos rapidamente durante nosso horário comercial.
          </p>
        </div>

        <ContactCards />
        <BusinessHours />
        <TrustBar />
      </div>
    </section>
  );
}