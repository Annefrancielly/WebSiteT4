import { XCircle, CheckCircle2, LucideIcon } from "lucide-react";

export function PainPointsSection() {
  return (
    <section className="py-24 bg-brand-beige">
      <div className="container px-4 mx-auto max-w-5xl">
        {/* TÍTULO PROBLEMA */}
        <h2 className="text-3xl md:text-4xl font-black text-brand-black text-center mb-12 leading-tight">
          Você passa a semana toda sonhando com o surf,{" "}
          <br className="hidden md:block" />
          mas quando chega o sábado...
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
          <PainItem
            icon={XCircle}
            color="text-red-500"
            text="Fica só tomando caldo enquanto outros pegam onda atrás de onda."
          />
          <PainItem
            icon={XCircle}
            color="text-red-500"
            text="Sente que não evolui por surfar pouco."
          />
          <PainItem
            icon={XCircle}
            color="text-red-500"
            text="Dropa devagar e perde as ondas..."
          />
          <PainItem
            icon={XCircle}
            color="text-red-500"
            text="Perde as melhores ondas por travamentos no drop."
          />
        </div>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center mb-16">
          <p className="text-red-800 font-medium">
            <span className="font-black text-red-600">Pior:</span> acha que
            nunca vai melhorar por não morar na praia. Mas isso é MITO – o
            problema não é falta de tempo, e sim{" "}
            <span className="font-black uppercase">TÉCNICA!</span>
          </p>
        </div>

        {/* TÍTULO SOLUÇÃO (Azul) */}
        <h3 className="text-2xl md:text-3xl font-bold text-[#2d5a86] text-center mb-12 leading-tight">
          O Método T4 foi criado para surfistas de &apos;finais de semana&apos;{" "}
          <br className="hidden md:block" />
          como você. Com ele, você vai:
        </h3>

        {/* LISTA DE BENEFÍCIOS (Verde) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
          <PainItem
            icon={CheckCircle2}
            color="text-green-500"
            text="Dropar com controle (sem travamentos)."
          />
          <PainItem
            icon={CheckCircle2}
            color="text-green-500"
            text="Evoluir rápido mesmo surfando pouco."
          />
          <PainItem
            icon={CheckCircle2}
            color="text-green-500"
            text="Dropar rápido, sem medo, e já entrar na parede com velocidade..."
          />
          <PainItem
            icon={CheckCircle2}
            color="text-green-500"
            text="Ficar em pé com equilíbrio, sem aquela sensação de instabilidade..."
          />
          <PainItem
            icon={CheckCircle2}
            color="text-green-500"
            text="Aproveitar 100% do seu tempo na água (3x mais ondas por sessão)."
          />
          <PainItem
            icon={CheckCircle2}
            color="text-green-500"
            text="Começar a fazer suas primeiras curvas.."
          />
        </div>

        <div className="bg-[#ECFDF5] border border-green-100 rounded-2xl p-6 text-center">
          <p className="text-[#065F46] font-bold">
            Tudo isso com exercícios simples e objetivos que qualquer iniciante
            faz – na areia ou no mar.
          </p>
        </div>
      </div>
    </section>
  );
}

interface PainItemProps {
  icon: LucideIcon;
  color: string;
  text: string;
}

function PainItem({ icon: Icon, color, text }: PainItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className={`w-6 h-6 shrink-0 ${color}`} />
      <span className="text-gray-600 font-medium leading-relaxed">{text}</span>
    </div>
  );
}
