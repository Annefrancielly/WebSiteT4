import Image from 'next/image';
import { Badge } from '@/features/components/ui/badge';
import { RelatosVideoDialog } from '@/features/components/shared/RelatosVideoDialog';
import { PROFESSOR_TRAJETORIA_YOUTUBE_URL } from '@/constants/site-data';
import { Star, Trophy, Target, Users, LucideIcon, Instagram } from 'lucide-react';
import { Button } from '../ui/button';

export function InstructorSection() {
  return (
    <section id="sobre" className="py-24 bg-brand-beige">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 space-y-8">
            <div>
              <Badge className="bg-brand-orange hover:bg-orange-600 text-white mb-6 px-4 py-1 text-xs border-none uppercase font-bold">
                Sobre o Instrutor
              </Badge>
              <h2 className="text-3xl md:text-5xl font-black text-brand-black leading-tight">
                Método Torquato: O Atalho para o Seu Surf Evoluir.
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
              <p>
                Com mais de{' '}
                <strong className="text-brand-black">21 anos de experiência com surf</strong> e{' '}
                <strong className="text-brand-black">500+ alunos</strong> formados, desenvolvemos um
                sistema comprovado que acelera de forma consistente seu aprendizado, o que muitos
                levariam até 3 anos para aprender sozinhos, você desenvolve em cerca de 2 meses com
                o Método T4.
              </p>
              <p>
                Nossas aulas combinam surf análise, simulador de surf e orientação prática no
                outside, eliminando erros comuns, encurtando o caminho e fazendo você aproveitar ao
                máximo cada sessão no mar.
              </p>
              <p>
                Criador do <strong className="text-brand-black">Método T4</strong>, Torquato
                estruturou um método direto e eficiente que simplifica o surf, gera confiança e
                coloca você em evolução real desde as primeiras aulas.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-8 pt-6">
              <CredentialItem icon={Trophy} title="21+ Anos" subtitle="Experiência" />
              <CredentialItem icon={Users} title="500+" subtitle="Alunos Treinados" />
              <CredentialItem icon={Target} title="Método T4" subtitle="Criador" />
              <CredentialItem icon={Star} title="5/5" subtitle="Avaliação" highlight />
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Button
                className="h-12 rounded-full bg-brand-orange px-6 font-semibold text-white hover:bg-brand-orange/90"
                asChild
              >
                <a
                  href="https://www.instagram.com/t4_surf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Conhecer o professor no Instagram"
                  className="flex items-center gap-2"
                >
                  <Instagram className="h-5 w-5" />
                  Conhecer o Professor
                </a>
              </Button>

              <RelatosVideoDialog
                youtubeUrl={PROFESSOR_TRAJETORIA_YOUTUBE_URL}
                triggerLabel="Ver trajetória"
                dialogTitle="Trajetória do professor"
                dialogDescription="Conheça um pouco mais sobre a trajetória, experiência e visão do professor no vídeo abaixo."
              />
            </div>
          </div>

          <div className="flex-1 w-full lg:h-auto min-h-[500px] relative">
            <div className="aspect-[4/5] w-full bg-gray-200 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden">
              <Image
                src="/instrutor.jpg"
                alt="Ricardo Torquato"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={95}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Interfaces e Subcomponentes
interface CredentialItemProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  highlight?: boolean;
}

function CredentialItem({ icon: Icon, title, subtitle, highlight }: CredentialItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg ${highlight ? 'text-yellow-500' : 'text-brand-orange'}`}>
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <h4 className="text-xl font-bold text-brand-black">{title}</h4>
        <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
      </div>
    </div>
  );
}
