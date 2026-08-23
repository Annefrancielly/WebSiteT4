import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/features/components/ui/button";
import { withBasePath } from "@/lib/paths";

/**
 * Destinos dos dois CTAs.
 *
 * Isolados aqui porque os dois vão mudar em etapas já previstas:
 *
 * O botão principal leva ao SELETOR, e não direto à vitrine. A diferença é
 * comercial: quem acabou de ler a promessa ainda não sabe qual dos três cursos
 * é o dele, e jogá-lo numa fileira de três produtos transfere a ele um trabalho
 * que o site pode fazer. O seletor pergunta a situação e entrega o card certo.
 *
 * É por isso que o cabeçalho e o Hero apontam para lugares diferentes: a barra
 * fixa serve quem já está decidido e quer ver a oferta; o Hero serve quem
 * acabou de chegar.
 */
const DESTINO_PRIMARIO = "#nivel";
const DESTINO_SECUNDARIO = "#metodo";

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
        Fundo com DIREÇÃO DE ARTE: dois recortes da mesma fotografia, um por
        formato de tela. O navegador baixa só o que serve ao aparelho dele.

          hero-capa.jpg         1920×1280 · 207 KB · deitado, para o desktop
          hero-capa-mobile.jpg  1080×1920 · 157 KB · em pé, para o celular

        Por que dois arquivos e não um só reposicionado por CSS: numa tela de
        celular, o `object-cover` de uma foto 3:2 mostra apenas ~31% da largura
        dela. Não existe valor de `object-position` que resolva — qualquer
        janela tão estreita cai atrás da headline, que ocupa a tela inteira. No
        recorte vertical o surfista é reposicionado no topo, ACIMA de onde o
        texto começa.

        O <picture> é o que torna isso barato: com `media`, o navegador escolhe
        a fonte antes de baixar qualquer byte — o celular nunca vê os 207 KB da
        versão de desktop.

        Sem next/image aqui de propósito. Ele não faz direção de arte, e como o
        `images.unoptimized` está ligado no next.config ele também não
        redimensiona nada: não haveria o que perder. `fetchPriority="high"`
        substitui o `priority`, e é o que garante a prioridade de download desta
        imagem, que é o LCP da Home.

        `alt=""` com aria-hidden porque é fundo decorativo: o conteúdo do Hero é
        a headline. Descrever a foto faria o leitor de tela ler uma legenda
        antes da promessa do produto.

        NOME NOVO A CADA VERSÃO DA FOTO, sempre. Arquivo trocado com o mesmo
        nome continua vindo do cache do navegador — aconteceu durante o ajuste
        deste enquadramento, e aconteceria com o visitante depois de um deploy.
      */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(min-width: 768px)"
            srcSet={withBasePath("/hero-capa.jpg")}
          />

          <img
            src={withBasePath("/hero-capa-mobile.jpg")}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            /*
              `object-[80%_center]` acerta os DOIS recortes: no desktop a janela
              é mais larga que a foto e o valor é ignorado; nas telas estreitas
              ele alinha a janela com o surfista.
            */
            className="animate-in zoom-in-105 absolute inset-0 size-full object-cover object-[80%_center] duration-[9000ms] ease-linear fill-mode-both motion-reduce:animate-none"
          />
        </picture>

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
            APRENDA EM
            </span>
          </span>

          <span className="block overflow-hidden pb-[0.08em] text-brand-orange">
            <span className="block animate-in slide-in-from-bottom-full delay-150 duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both motion-reduce:animate-none">
              3 MESES
            </span>
          </span>

          <span className="block overflow-hidden pb-[0.08em]">
            <span className="block animate-in slide-in-from-bottom-full duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both motion-reduce:animate-none">
            O QUE VOCÊ LEVARIA
            </span>
          </span>

          <span className="block overflow-hidden pb-[0.08em] text-brand-orange">
            <span className="block animate-in slide-in-from-bottom-full delay-150 duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] fill-mode-both motion-reduce:animate-none">
              3 ANOS
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
          Mesmo surfando apenas<strong className="font-bold text-white"> finais de semana </strong> 
          você irá conseguir em{" "}
          <strong className="font-bold text-white">3 meses</strong> aprender
          tudo que precisa saber para evoluir<strong className="font-bold text-white"></strong>
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
