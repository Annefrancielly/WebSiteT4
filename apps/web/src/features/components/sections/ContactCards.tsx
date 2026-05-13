import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/features/components/ui/button";

export const ContactCards = () => {
  const PHONE_NUMBER = "+55 (79) 98833-0770";
  const WHATSAPP_PHONE = "5579988330770";

  const whatsappMessage = encodeURIComponent(
    "Olá! Vim pelo site da T4 Surf e gostaria de agendar uma aula."
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${whatsappMessage}`;
  const phoneUrl = `tel:+5579988330770`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
      <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-[#4ADE80] rounded-full flex items-center justify-center mb-4 text-white">
          <MessageCircle size={32} fill="currentColor" />
        </div>

        <h3 className="font-bold text-slate-800 text-xl mb-1">WhatsApp</h3>

        <p className="text-slate-500 text-sm mb-4">
          Fale diretamente com nosso time
        </p>

        <span className="text-lg font-bold text-slate-900 mb-6">
          {PHONE_NUMBER}
        </span>

        <Button
          asChild
          className="w-full bg-[#4ADE80] hover:bg-[#3dbf6e] text-white font-bold h-12 rounded-xl"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar aula pelo WhatsApp"
          >
            <MessageCircle className="mr-2" size={20} />
            Agendar via WhatsApp
          </a>
        </Button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-[#40B5AD] rounded-full flex items-center justify-center mb-4 text-white">
          <Phone size={32} fill="currentColor" />
        </div>

        <h3 className="font-bold text-slate-800 text-xl mb-1">Telefone</h3>

        <p className="text-slate-500 text-sm mb-4">
          Ligue diretamente para nossa equipe
        </p>

        <span className="text-lg font-bold text-slate-900 mb-6">
          {PHONE_NUMBER}
        </span>

        <Button
          asChild
          variant="outline"
          className="w-full border-[#40B5AD] text-[#40B5AD] hover:bg-[#40B5AD]/5 font-bold h-12 rounded-xl"
        >
          <a href={phoneUrl} aria-label="Ligar para a T4 Surf">
            <Phone className="mr-2" size={20} />
            Ligar Agora
          </a>
        </Button>
      </div>
    </div>
  );
};
