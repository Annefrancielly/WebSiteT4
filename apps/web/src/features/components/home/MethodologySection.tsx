import { CheckCircle2, Target, Waves } from "lucide-react";
import { Badge } from "@/features/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/features/components/ui/card";

type PhaseItemData = {
  title: string;
  items: string[];
};

type PhaseCardData = {
  heading: string;
  subheading?: string;
  items: PhaseItemData[];
};

type Props = {
  badgeLabel?: string;
  sectionTitle?: string;
  phase1?: PhaseCardData;
  phase2?: PhaseCardData;
};

const DEFAULT_PHASE_1: PhaseCardData = {
  heading: "Fase 1 - Preparação Inteligente",
  subheading: "Na Areia",
  items: [
    {
      title: "Descubra Sua Base Natural (Regular ou Goofy) em 5 Minutos",
      items: [
        "Nada de adivinhar ou copiar os outros!",
        "Teste prático infalível + como treinar o 'pop-up' na areia.",
      ],
    },
    {
      title: "Leitura do Mar para Iniciantes",
      items: [
        "Pare de ficar perdido no lineup!",
        "Identifique correntezas, direção das ondas e as MELHORES espumas.",
      ],
    },
    {
      title: "Segurança Antes de Tudo",
      items: [
        "Surfe sem medo de se machucar!",
        "Como cair corretamente (mãos na cabeça) e evitar pedras.",
      ],
    },
  ],
};

const DEFAULT_PHASE_2: PhaseCardData = {
  heading: "Fase 2 - Domínio Prático",
  subheading: "No Mar",
  items: [
    {
      title: "Escolha a Onda Perfeita",
      items: [
        "Pare de remar para ondas que não valem a pena!",
        "Técnica para identificar espumas ideais para iniciantes.",
      ],
    },
    {
      title: "Posicionamento no Mar",
      items: [
        "Chega de ficar 'fora do pico'!",
        "Onde se posicionar para pegar 3x mais ondas sem esforço extra.",
      ],
    },
    {
      title: "Pop-Up na Água (Sem Travamentos!)",
      items: [
        "O segredo para um drop fluido e rápido!",
        "Remada eficiente + timing perfeito do 'pop-up'.",
      ],
    },
    {
      title: "Elimine os 4 Erros que Travam Seu Progresso",
      items: [
        "Por que 90% dos iniciantes caem?",
        "Olhar para baixo, joelho esticado e quadril desalinhado.",
      ],
    },
  ],
};

export function MethodologySection({
  badgeLabel = "Benefícios",
  sectionTitle = "O Que Você Vai Aprender",
  phase1 = DEFAULT_PHASE_1,
  phase2 = DEFAULT_PHASE_2,
}: Props) {
  return (
    <section className="py-24 bg-brand-beige">
      <div className="container px-4 mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <Badge className="bg-brand-orange text-white hover:bg-orange-600 border-none mb-6 px-6 py-2 text-xs font-bold uppercase tracking-widest">
            {badgeLabel}
          </Badge>

          <h2 className="text-3xl md:text-5xl font-black text-brand-black uppercase tracking-tight">
            {sectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CARD FASE 1 (Turquesa/Azul) — ✅ conversão forçada */}
          <Card
            data-force-convert="true"
            className="border-none shadow-xl bg-white rounded-3xl overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-turquoise" />
            <CardHeader className="pt-10 pb-2 px-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-turquoise/10 flex items-center justify-center text-brand-turquoise shrink-0">
                  <Target className="w-6 h-6" />
                </div>

                <h3 className="text-xl md:text-2xl font-black text-brand-turquoise uppercase leading-tight">
                  {phase1.heading}
                  {phase1.subheading ? (
                    <>
                      {" "}
                      <br />({phase1.subheading})
                    </>
                  ) : null}
                </h3>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-10 space-y-8">
              {phase1.items.map((block, idx) => (
                <PhaseItem
                  key={`p1-${idx}`}
                  title={block.title}
                  items={block.items}
                />
              ))}
            </CardContent>
          </Card>

          {/* CARD FASE 2 (Laranja) — ✅ conversão forçada */}
          <Card
            data-force-convert="true"
            className="border-none shadow-xl bg-white rounded-3xl overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-orange" />
            <CardHeader className="pt-10 pb-2 px-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-brand-orange shrink-0">
                  <Waves className="w-6 h-6" />
                </div>

                <h3 className="text-xl md:text-2xl font-black text-brand-orange uppercase leading-tight">
                  {phase2.heading}
                  {phase2.subheading ? (
                    <>
                      {" "}
                      <br />({phase2.subheading})
                    </>
                  ) : null}
                </h3>
              </div>
            </CardHeader>

            <CardContent className="px-8 pb-10 space-y-8">
              {phase2.items.map((block, idx) => (
                <PhaseItem
                  key={`p2-${idx}`}
                  title={block.title}
                  items={block.items}
                  variant="orange"
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Subcomponente de Item
function PhaseItem({
  title,
  items,
  variant = "turquoise",
}: {
  title: string;
  items: string[];
  variant?: "turquoise" | "orange";
}) {
  const iconColor =
    variant === "orange" ? "text-brand-orange" : "text-brand-turquoise";

  return (
    <div>
      <div className="flex items-start gap-3 mb-3">
        <CheckCircle2 className={`w-6 h-6 ${iconColor} shrink-0`} />
        <h4 className="font-bold text-lg text-brand-black leading-tight">
          {title}
        </h4>
      </div>

      <ul className="pl-9 space-y-2">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="text-gray-500 text-sm leading-relaxed relative pl-4 border-l border-gray-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
