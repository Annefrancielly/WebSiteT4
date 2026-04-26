import Image from "next/image";
import { withBasePath } from "@/lib/paths";

export function StatsStrip() {
  return (
    <div className="w-full bg-gradient-to-r from-black via-black to-[#E85D04] py-12 border-t border-gray-800">
      <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-10 md:w-28 md:h-12">
            <Image 
              src={withBasePath("/logo.png")} 
              alt="T4 Surf Logo" 
              fill 
              className="object-contain object-left" 
              priority
              unoptimized
            />
          </div>
          
          <div className="h-10 w-px bg-white/20 hidden md:block" />
          <div>
            <h3 className="text-white font-bold text-lg uppercase tracking-wider">
              Metodologia Comprovada
            </h3>
            <p className="text-gray-400 text-sm">
              Mais de 500 alunos transformados
            </p>
          </div>
        </div>

        {/* Direita: Stats */}
        <div className="flex items-center gap-8 md:gap-16">
          <StatItem value="5+" label="Anos" />
          <StatItem value="500+" label="Alunos" />
          <StatItem value="5+" label="Estados" />
        </div>
      </div>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-black text-white mb-0">
        {value}
      </div>
      <div className="text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}