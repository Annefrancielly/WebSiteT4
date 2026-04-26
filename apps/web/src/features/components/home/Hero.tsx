import Image from "next/image";
import Link from "next/link";
import { Button } from "@/features/components/ui/button";
import { Trophy } from "lucide-react";
import { withBasePath } from "@/lib/paths";

export function Hero() {
  return (
    <section className="relative w-full h-[95vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-black">
      <div className="absolute inset-0 z-0">
        <Image
          src={withBasePath("/hero-v2.jpg")}
          alt="Surfista pegando uma onda"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 inline-flex items-center gap-2 bg-brand-orange px-5 py-2 rounded-full mb-8 shadow-lg">
          <Trophy className="w-5 h-5 text-white" />
          <span className="text-white font-bold uppercase text-xs md:text-sm tracking-widest">
            Instrutor Profissional há 5+ anos
          </span>
        </div>

        <h1 className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tighter max-w-6xl drop-shadow-2xl">
           Aprenda a Surfar com <br className="hidden md:block" />
          <span className="text-brand-orange">Consciência, Controle e Confiança</span>
        </h1>

        <p className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 text-lg md:text-2xl text-gray-200 max-w-3xl mb-12 leading-relaxed font-medium drop-shadow-md">
          Aprenda a surfar do zero ou aprimore suas técnicas com a metodologia
          comprovada que já ajudou mais de 500 alunos a evoluir no surf.
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            asChild
            size="lg"
            className="bg-brand-orange hover:bg-orange-600 text-white font-extrabold text-lg px-10 py-7 rounded-full shadow-orange-900/30 shadow-xl transition-all hover:scale-105"
          >
            <Link href="#cursos">Começar Agora</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20 opacity-50">
        <div className="w-1 h-16 rounded-full bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
}
