import Image from "next/image";

import { withBasePath } from "@/lib/paths";

/**
 * Abertura da página de Cursos.
 *
 * Substitui o banner que trazia a headline embutida em uma imagem de 2,7 MB.
 * Passar o título para texto real resolve três problemas de uma vez: o Google
 * volta a enxergar a promessa principal da página, o peso cai praticamente a
 * zero, e a quebra de linha passa a se adaptar à tela em vez de depender de
 * duas artes separadas para desktop e mobile.
 *
 * O fundo usa o preto da marca com o monograma T4 em baixíssima opacidade —
 * o mesmo recurso de padrão que o brand book aplica nas páginas escuras. Custa
 * 29 KB e evita repetir na página de Cursos a mesma fotografia do Hero da Home.
 */
export function CoursesHero() {
  return (
    <section className="relative overflow-hidden bg-brand-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-1/2 w-[560px] max-w-[85%] -translate-y-1/2 opacity-[0.07] md:-right-24 md:w-[820px]"
      >
        <Image
          src={withBasePath("/logo.png")}
          alt=""
          width={682}
          height={435}
          className="h-auto w-full"
        />
      </div>

      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {/*
            O texto é escrito em caixa mista e vira maiúscula por CSS: leitores
            de tela soletram texto todo em caixa alta como se fosse sigla.
          */}
          <h1 className="text-[32px] font-extrabold uppercase leading-[1.08] tracking-tight md:text-[48px]">
            <span className="block text-white">Aprenda a surfar</span>
            <span className="block text-brand-orange">Do zero ao avançado</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-sans text-[15px] font-medium leading-relaxed text-white md:text-[18px]">
            O método completo mais prático, rápido e seguro para você dominar o
            surf de verdade.
          </p>
        </div>
      </div>
    </section>
  );
}
