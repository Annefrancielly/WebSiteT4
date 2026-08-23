import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/features/components/ui/button";
import { withBasePath } from "@/lib/paths";

/**
 * Destinos dos dois CTAs.
 *
 * Isolados aqui porque os dois vão mudar em etapas já previstas:
 *
 * DESTINO_PRIMARIO  -> vira "#nivel" quando o seletor de nível existir.
 *                      Hoje aponta para a vitrine, que é a âncora que a Home
 *                      realmente tem. Link quebrado num CTA principal é
 *                      dinheiro perdido, então ele só muda quando o destino
 *                      estiver no ar.
 *
 * DESTINO_SECUNDARIO -> vira "#metodo" quando a seção do vídeo entrar na Home.
 *                      Hoje leva para /cursos, onde a explicação do método já
 *                      existe — a promessa do rótulo é cumprida de qualquer
 *                      forma.
 */
const DESTINO_PRIMARIO = "#cursos";
const DESTINO_SECUNDARIO = "/cursos/";

/**
 * Hero da Home.
 *
 * Substitui a headline antiga ("Aprenda a Surfar com Consciência, Controle e
 * Confiança") pela promessa central aprovada pelo cliente: o que se levaria 3
 * anos para aprender sozinho, em 3 meses. A troca não é estética — a headline
 * anterior descrevia atributos do método, e atributo não vende; a nova declara
 * um resultado com prazo, que é o que faz o visitante continuar rolando.
 *
 * TODA a animação daqui é CSS, via tailwindcss-animate. Nenhum `Reveal`.
 *
 * O motivo é importante: `Reveal` depende de IntersectionObserver, que depende
 * de JavaScript, que depende da hidratação. O Hero é a primeira coisa na tela e
 * precisa aparecer antes disso. Regra do projeto daqui em diante:
 *
 *   acima da dobra -> animação CSS
 *   abaixo da dobra -> Reveal
 *
 * Por isso este arquivo é Server Component: não tem estado, não tem evento,
 * não manda um byte de JavaScript para o navegador.
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-screen min-h-[100svh] items-center overflow-hidden bg-brand-ink pb-16 pt-28 md:pt-32">
      {/*
        Fundo. A fotografia continua sendo a mesma já otimizada e publicada —
        trocar por gradiente puro perderia o único elemento do Hero que mostra
        surf de verdade.

        `priority` mantém o comportamento atual: esta imagem é o LCP da Home e
        precisa do preload. Sem ela, o maior elemento da primeira tela passaria
        a carregar em fila com o resto.
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src={withBasePath("/hero-v2.jpg")}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
          className="animate-in zoom-in-105 object-cover duration-[9000ms] ease-linear fill-mode-both motion-reduce:animate-none"
        />

        {/*
          Duas camadas de escurecimento, não uma:

          - a chapada uniforme garante contraste do texto em qualquer ponto;
          - o gradiente de baixo funde o Hero na próxima seção escura, para que
            a página não tenha uma costura horizontal visível entre as duas.
        */}
        <div className="absolute inset-0 bg-brand-ink/55" />
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-b from-transparent to-brand-ink" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/*
          Sem classe de peso: a Anton tem um desenho só. Pedir `font-bold` aqui
          não deixaria nada mais forte — o navegador está com a síntese de peso
          desligada em globals.css justamente para não falsificar um negrito que
          a fonte não tem.
        */}
        <h1 className="max-w-[15ch] font-display text-hero uppercase text-white">
          {/*
            Revelação por máscara: o pai corta o que transborda, o filho entra
            deslizando de baixo. É o que dá a sensação de a headline "subir para
            a posição" em vez de simplesmente aparecer.

            `fill-mode-both` é o que impede o piscar: sem ele o texto fica
            visível no primeiro quadro, some quando a animação começa e volta.
          */}
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block animate-in slide-in-from-bottom-full duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both motion-reduce:animate-none">
              Aprenda a surfar
            </span>
          </span>

          <span className="block overflow-hidden pb-[0.08em] text-brand-orange">
            <span className="block animate-in slide-in-from-bottom-full delay-150 duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both motion-reduce:animate-none">
              Do zero ao avançado
            </span>
          </span>
        </h1>

        {/*
          `max-w-[34ch]` limita a linha por CARACTERES, não por pixels. Linha
          longa demais faz o olho perder o começo da seguinte; entre 45 e 75
          caracteres é a faixa confortável, e 34ch numa fonte de texto grande
          cai bem dentro dela em qualquer tela.
        */}
        <p className="mt-6 max-w-[34ch] text-hero-sub text-brand-ink-text animate-in fade-in slide-in-from-bottom-4 delay-300 duration-700 fill-mode-both motion-reduce:animate-none">
          Em <strong className="font-bold text-white">3 meses</strong> o que
          você levaria{" "}
          <strong className="font-bold text-white">3 anos</strong> para
          aprender sozinho.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 animate-in fade-in slide-in-from-bottom-4 delay-500 duration-700 fill-mode-both motion-reduce:animate-none">
          {/*
            Texto PRETO sobre o laranja, não branco.

            Branco sobre #F37100 rende 2,9:1 e reprova em WCAG AA; preto rende
            7,2:1. Não é só norma: laranja com branco fica lavado sob sol, que é
            exatamente a condição em que parte deste público abre o site.

            `h-auto` desfaz a altura fixa do size="lg" do Button — os 48px de
            alvo de toque vêm do min-h, que é o mínimo recomendado para dedo.
          */}
          <Button
            asChild
            size="lg"
            className="group h-auto min-h-[48px] rounded-lg bg-brand-orange px-7 py-3.5 font-display text-base uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-orange/90"
          >
            <Link href={DESTINO_PRIMARIO}>
              Encontre seu curso
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>

          {/*
            CTA secundário como link, e não como segundo botão: dois botões com
            o mesmo peso visual dividem a atenção e derrubam o clique no que
            importa. Aqui a hierarquia é explícita — um vende, o outro informa
            quem ainda não está pronto para comprar.
          */}
          <Link
            href={DESTINO_SECUNDARIO}
            className="group relative py-1.5 text-sm font-medium text-brand-ink-text transition-colors hover:text-white"
          >
            Como funciona o Método T4
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand-orange transition-transform duration-300 group-hover:scale-x-100"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
