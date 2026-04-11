import { Badge } from "@/features/components/ui/badge";
import { Medal } from "lucide-react";

export function OnlineCoursesIntro() {
  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#2FB1B3]/20 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-black/30 z-10" />

        <div
          className="w-full h-full bg-cover bg-[center_30%]"
          style={{ backgroundImage: "url('/Alongamento.jpg')" }}
        />
      </div>

      <div className="relative z-20 container px-4 text-center">
        <div className="flex justify-center mb-8">
          <Badge className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-5 py-2 gap-2 hover:bg-white/30">
            <Medal className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-xs md:text-sm">
              Aprendizado Profissional
            </span>
          </Badge>
        </div>

        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 drop-shadow-lg leading-tight">
          Método T4 Online
        </h2>

        <p className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto font-medium leading-relaxed drop-shadow-md">
          Do iniciante ao profissional. Aprenda com metodologia comprovada e
          suporte personalizado para acelerar seu progresso no surf.
        </p>
      </div>
    </section>
  );
}
