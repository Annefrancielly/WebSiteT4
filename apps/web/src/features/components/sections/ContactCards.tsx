import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/features/components/ui/button";

export const ContactCards = () => {
  const PHONE_NUMBER = "+55 (79) 98833-0770"; 

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
        <Button className="w-full bg-[#4ADE80] hover:bg-[#3dbf6e] text-white font-bold h-12 rounded-xl">
          <MessageCircle className="mr-2" size={20} /> Agendar via WhatsApp
        </Button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-[#40B5AD] rounded-full flex items-center justify-center mb-4 text-white">
          <Phone size={32} fill="currentColor" />
        </div>
        <h3 className="font-bold text-slate-800 text-xl mb-1">Telefone</h3>
        <p className="text-slate-500 text-sm mb-4">
        </p>
        <span className="text-lg font-bold text-slate-900 mb-6">
          {PHONE_NUMBER}
        </span>
        <Button
          variant="outline"
          className="w-full border-[#40B5AD] text-[#40B5AD] hover:bg-[#40B5AD]/5 font-bold h-12 rounded-xl"
        >
          <Phone className="mr-2" size={20} /> Ligar Agora
        </Button>
      </div>
    </div>
  );
};
