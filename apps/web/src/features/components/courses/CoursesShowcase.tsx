import { COURSES } from "@/constants/courses";
import { cn } from "@/lib/utils";

import { CourseCard } from "./CourseCard";

type Props = {
  /**
   * Âncora da seção. Recebe valor por prop porque o mesmo bloco é montado na
   * Home e na página de Cursos, e dois elementos com o mesmo id na mesma
   * página quebram navegação por âncora e leitores de tela.
   */
  id?: string;
  eyebrow?: string;
  title?: string;

  /**
   * Ajuste de espaçamento por contexto: na página de Cursos a vitrine encosta
   * no vídeo, na Home ela vem logo depois do Hero e precisa de mais respiro.
   * É só isso que muda entre os dois usos — o resto é idêntico de propósito.
   */
  className?: string;
};

/**
 * Vitrine dos cursos: a oferta comercial principal do site.
 *
 * A faixa mantém o creme do site. A separação entre card e superfície vem da
 * elevação (sombra em duas camadas) e não de uma inversão de fundo — assim a
 * seção não corta a página ao meio. O preto fica reservado ao título.
 */
export function CoursesShowcase({
  id = "nossos-cursos",
  eyebrow = "Escolha seu caminho",
  title = "Nossos cursos",
  className,
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("bg-brand-beige pt-8 pb-16 md:pb-24", className)}
    >
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center md:mb-12">
          <p className="font-display text-[16px] font-bold uppercase tracking-[0.18em] text-brand-orange">
            {eyebrow}
          </p>

          <h2
            id={`${id}-title`}
            className="mt-2 text-[32px] font-extrabold uppercase leading-tight text-brand-black"
          >
            {title}
          </h2>
        </div>

        {/*
          No celular a vitrine vira um trilho deslizante; do md para cima volta a
          ser exatamente o grid de antes.

          Usa scroll-snap nativo em vez de biblioteca: a inércia do gesto já é do
          sistema operacional, funciona sem JavaScript e não adiciona peso ao
          bundle. Uma biblioteca de carrossel aqui só reimplementaria, pior, o
          que o navegador entrega de graça.

          `w-[86%]` é a decisão que faz o padrão funcionar comercialmente: deixa
          14% do próximo card à mostra. Card ocupando a largura inteira vira uma
          parede — o visitante não descobre que existem outros dois, e carrossel
          que esconde produto vende menos que lista que mostra.
        */}
        <div
          role="region"
          aria-label="Cursos disponíveis"
          tabIndex={0}
          className={cn(
            "mx-auto w-full max-w-6xl gap-3",
            // mobile: trilho horizontal com encaixe
            "-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-4",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            // md+: o grid original, sem nenhuma mudança
            "md:mx-auto md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0",
            "lg:grid-cols-3",
          )}
        >
          {COURSES.map((course) => (
            /*
              O `id` é o alvo do seletor de nível, e a variante `target:` é o
              que destaca o card escolhido.

              Vale registrar por quê: `:target` é uma pseudo-classe do CSS que
              casa com o elemento apontado pelo hash da URL. Isso significa que
              o realce acontece SEM estado compartilhado entre o seletor e a
              vitrine — sem contexto, sem elevar estado, e sem transformar esta
              seção em Client Component. O navegador já sabe qual elemento foi
              escolhido; só faltava perguntar a ele.

              `scroll-mt-28` compensa o cabeçalho fixo, senão a âncora para com
              o topo do card debaixo da barra.
            */
            <div
              key={course.id}
              id={`card-${course.id}`}
              className={cn(
                "w-[86%] shrink-0 snap-center scroll-mt-28 md:w-auto md:shrink",
                "rounded-card ring-brand-orange ring-offset-4 ring-offset-brand-beige transition-shadow duration-300",
                "target:ring-2",
              )}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {/*
          Substitui os indicadores de posição por uma frase. Resolve a mesma
          dúvida — quantos existem — sem transformar a vitrine em Client
          Component só para rastrear o card ativo.
        */}
        <p className="mt-1 text-center text-sm text-brand-black/50 md:hidden">
          Deslize para ver os {COURSES.length} cursos →
        </p>
      </div>
    </section>
  );
}
