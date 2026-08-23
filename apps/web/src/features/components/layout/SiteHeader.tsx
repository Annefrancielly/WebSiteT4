"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, MessageCircle } from "lucide-react";

import { Button } from "@/features/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/features/components/ui/sheet";
import { criarUrlWhatsApp } from "@/constants/site-data";
import { useScrolledPast } from "@/hooks/use-scrolled-past";
import { withBasePath } from "@/lib/paths";
import { cn } from "@/lib/utils";

type LinkNav = {
  label: string;
  href: string;
};

/**
 * NÍVEL 1 — o caminho comercial.
 *
 * Aparece na barra do desktop e no topo do menu. São só quatro porque menu
 * grande não é menu: quando tudo tem o mesmo peso, nada tem prioridade, e o
 * visitante que chegou para comprar um curso gasta atenção decidindo onde
 * clicar. Estes quatro são as etapas da decisão de compra, na ordem.
 */
const LINKS_PRINCIPAIS: LinkNav[] = [
  { label: "Cursos", href: "#cursos" },
  { label: "Método", href: "#metodo" },
  { label: "Resultados", href: "#resultados" },
  { label: "Sobre", href: "#sobre" },
];

/**
 * NÍVEL 2 — "Também na T4".
 *
 * Só dentro do menu. Não é conteúdo de segunda classe: é conteúdo que atende
 * quem já decidiu outra coisa (quer aula presencial, quer viajar, tem dúvida).
 * Tirar da barra não é escondê-lo, é parar de disputar atenção com a venda.
 */
const LINKS_SECUNDARIOS: LinkNav[] = [
  { label: "Aulas presenciais", href: "/agendar-aula/" },
  { label: "Surf Trips", href: "/surf-trips/" },
  { label: "Perguntas frequentes", href: "/faq/" },
];

/**
 * Destino do botão do cabeçalho.
 *
 * Decisão do cliente em 23/08: o botão para de vender um curso específico e
 * passa a levar para a seção que mostra os três. Antes ele apontava direto para
 * um checkout da Kiwify — o que, numa barra presente em TODAS as páginas,
 * significava empurrar o mesmo produto para quem talvez precisasse de outro.
 *
 * O rótulo acompanhou a mudança: "Ver os cursos" descreve o que acontece ao
 * clicar. Botão que promete uma coisa e faz outra queima confiança logo no
 * primeiro clique.
 */
const DESTINO_CTA = "#cursos";

const MENSAGEM_WHATSAPP =
  "Olá! Vim pelo site da T4 Surf e queria tirar uma dúvida.";

/**
 * Rotas cuja primeira seção é escura.
 *
 * Existe porque o cabeçalho começa transparente para o Hero aparecer inteiro —
 * e a logo da T4 é branca. Numa página de fundo creme, cabeçalho transparente
 * significaria logo branca sobre creme: invisível. Aqui a lista é a fonte da
 * verdade; página nova com hero escuro precisa entrar nela.
 */
const ROTAS_COM_HERO_ESCURO = ["/", "/surf-trips"];

function temHeroEscuro(pathname: string): boolean {
  // O projeto usa trailingSlash, então "/surf-trips/" e "/surf-trips" são a
  // mesma rota. Normalizar evita depender de qual das duas o Next entregou.
  const semBarraFinal = pathname.replace(/\/+$/, "") || "/";

  return ROTAS_COM_HERO_ESCURO.includes(semBarraFinal);
}

/** Ponto em que o cabeçalho deixa de ser transparente. */
const LIMITE_DE_ROLAGEM = 40;

/**
 * Cabeçalho do site, em dois níveis.
 *
 * Substitui o `Navbar` atual, que tinha seis links de peso igual na barra e uma
 * ramificação inteira só para a página de Cursos. Aqui a barra carrega o
 * caminho de compra e o resto vive atrás de "Mais" — o mesmo painel que o botão
 * de menu abre no celular.
 *
 * Um painel, dois gatilhos. Não existe versão "desktop" e versão "mobile" do
 * menu para manter em sincronia: é o mesmo `Sheet`, com dois botões que o
 * abrem. Item novo entra uma vez só.
 *
 * O `Sheet` do Shadcn (Radix Dialog) foi preferido a um painel próprio porque
 * já traz prisão de foco, fechamento com ESC, trava de rolagem do fundo e os
 * atributos ARIA corretos. Reimplementar isso à mão é onde nascem os menus que
 * o teclado não consegue fechar.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const rolou = useScrolledPast(LIMITE_DE_ROLAGEM);

  const transparente = temHeroEscuro(pathname) && !rolou;

  /** Âncora só funciona na página onde a seção está; fora dela, volta para a Home. */
  const resolverHref = (href: string) =>
    href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  const ehPaginaAtual = (href: string) =>
    !href.startsWith("#") &&
    pathname.replace(/\/+$/, "") === href.replace(/\/+$/, "");

  return (
    <Sheet>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          transparente
            ? "border-transparent bg-transparent"
            : "border-white/10 bg-brand-ink/85 backdrop-blur-lg",
        )}
      >
        <div className="container mx-auto flex h-[70px] items-center justify-between gap-4 px-4 lg:h-[84px]">
          <Link
            href="/"
            aria-label="T4 Surf — página inicial"
            className="relative block h-11 w-[150px] shrink-0 lg:h-[60px] lg:w-[200px]"
          >
            <Image
              src={withBasePath("/logo.png")}
              alt="T4 Surf"
              fill
              sizes="200px"
              priority
              className="object-contain object-left"
            />
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-7 lg:flex"
          >
            {LINKS_PRINCIPAIS.map((link) => (
              <Link
                key={link.label}
                href={resolverHref(link.href)}
                aria-current={ehPaginaAtual(link.href) ? "page" : undefined}
                className="group relative py-1 text-sm font-medium text-brand-ink-text transition-colors hover:text-white aria-[current=page]:text-white"
              >
                {link.label}

                {/*
                  Sublinhado por transform, e não por mudança de largura ou de
                  borda: transform é resolvido pela GPU e não obriga o navegador
                  a recalcular o layout do cabeçalho a cada passagem do mouse.
                */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand-orange transition-transform duration-300 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
                />
              </Link>
            ))}

            <SheetTrigger asChild>
              <button
                type="button"
                className="py-1 text-sm font-medium text-brand-ink-text transition-colors hover:text-white"
              >
                Mais
              </button>
            </SheetTrigger>
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <Button
              asChild
              className="group h-auto min-h-[44px] rounded-lg bg-brand-orange px-4 font-display text-[13px] uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-orange/90 sm:px-5 sm:text-sm"
            >
              <Link href={resolverHref(DESTINO_CTA)}>
                Ver os cursos
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>

            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu"
                className="grid size-11 shrink-0 place-items-center rounded-lg border border-white/10 text-white transition-colors hover:border-white/30 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
          </div>
        </div>
      </header>

      <SheetContent
        side="right"
        className="flex w-[min(88vw,380px)] flex-col border-l border-white/10 bg-brand-ink-soft p-0 text-brand-ink-text"
      >
        <SheetTitle className="sr-only">Menu de navegação</SheetTitle>

        <div className="flex min-h-[70px] items-center border-b border-white/10 px-5">
          <div className="relative h-10 w-[150px]">
            <Image
              src={withBasePath("/logo.png")}
              alt="T4 Surf"
              fill
              sizes="150px"
              className="object-contain object-left"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <nav aria-label="Navegação principal" className="grid">
            {LINKS_PRINCIPAIS.map((link) => (
              /*
                SheetClose com asChild transforma o próprio link no botão que
                fecha o painel. Sem isso, navegar por âncora deixaria o menu
                aberto por cima da seção recém-rolada — o visitante clica em
                "Sobre" e continua olhando para o menu.
              */
              <SheetClose asChild key={link.label}>
                <Link
                  href={resolverHref(link.href)}
                  aria-current={ehPaginaAtual(link.href) ? "page" : undefined}
                  className="border-b border-white/5 py-3.5 font-display text-2xl uppercase text-white transition-colors hover:text-brand-orange aria-[current=page]:text-brand-orange"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>

          <p className="mt-8 mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-ink-muted">
            Também na T4
          </p>

          <nav aria-label="Outras páginas" className="grid">
            {LINKS_SECUNDARIOS.map((link) => (
              <SheetClose asChild key={link.label}>
                <Link
                  href={resolverHref(link.href)}
                  aria-current={ehPaginaAtual(link.href) ? "page" : undefined}
                  className="py-2.5 text-[15px] transition-colors hover:text-white aria-[current=page]:text-white"
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>

        <div className="grid gap-3 border-t border-white/10 p-5">
          <SheetClose asChild>
            <Button
              asChild
              className="h-auto min-h-[48px] w-full rounded-lg bg-brand-orange font-display text-base uppercase tracking-wide text-brand-black hover:bg-brand-orange/90"
            >
              <Link href={resolverHref(DESTINO_CTA)}>Ver os cursos</Link>
            </Button>
          </SheetClose>

          <a
            href={criarUrlWhatsApp(MENSAGEM_WHATSAPP)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-white/15 text-sm font-medium text-brand-ink-text transition-colors hover:border-white/35 hover:text-white"
          >
            <MessageCircle className="size-4" />
            Falar no WhatsApp
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
