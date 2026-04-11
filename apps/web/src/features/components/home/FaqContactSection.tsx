import { MessageCircle } from "lucide-react";
import { Button } from "@/features/components/ui/button";
import { Badge } from "@/features/components/ui/badge";

export function FaqContactSection() {
  return (
    <section className="py-24 bg-brand-beige">
      <div className="container px-4 mx-auto text-center">
        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none mb-6 px-4 py-1">
          Fale Conosco
        </Badge>

        <h2 className="text-3xl md:text-5xl font-black text-brand-black mb-4">
          Tire Suas Dúvidas Agora!
        </h2>
        <p className="text-gray-600 mb-12 max-w-xl mx-auto">
          Entre em contato direto pelo WhatsApp e receba atendimento
          personalizado da nossa equipe.
        </p>

        {/* Card Branco Central */}
        <div className="bg-white max-w-lg mx-auto rounded-3xl p-10 shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <MessageCircle className="w-8 h-8 text-white fill-white" />
          </div>

          <h3 className="text-2xl font-bold text-brand-black mb-2">WhatsApp</h3>
          <p className="text-gray-500 text-sm mb-8">
            Atendimento rápido e personalizado
          </p>

          <Button
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold h-14 text-lg rounded-xl shadow-lg transition-transform hover:scale-105"
            asChild
          >
            <a href="https://wa.me/+5579988330770" target="_blank">
              Chamar no WhatsApp
            </a>
          </Button>
        </div>

        <div className="mt-12 text-sm text-brand-orange font-bold uppercase tracking-wide">
          Horário de Atendimento:
          <span className="block text-gray-500 font-medium normal-case mt-1">
            Segunda a Sexta: 9h às 18h | Sábados: 9h às 13h
          </span>
        </div>
      </div>
    </section>
  );
}
