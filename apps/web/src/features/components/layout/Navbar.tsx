"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/features/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/features/components/ui/sheet";
import { CURSOS_CONVERSAO_KIWIFY_URL } from "@/constants/site-data";
import { withBasePath } from "@/lib/paths";

type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

const NAV_LINKS: NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Cursos", href: "/cursos" },
  { label: "Surf Trips", href: "/surf-trips" },
  { label: "Agendar Aula", href: "/agendar-aula" },
  { label: "Sobre", href: "#sobre" },
  { label: "FAQ", href: "/faq" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCursosConversion = pathname === "/cursos" || pathname.startsWith("/cursos/");

  if (isCursosConversion) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-brand-black py-2 transition-all duration-300">
        <div className="container mx-auto flex items-center justify-between px-6">
          <Link
            href="/"
            className="relative block h-14 w-48 shrink-0 md:h-20 md:w-80"
            aria-label="Ir para a página inicial"
          >
            <Image
              src={withBasePath("/logo.png")}
              alt="T4 Surf Logo"
              fill
              className="object-contain object-left"
              priority
              unoptimized
            />
          </Link>
  
          <Button
            className="rounded-full bg-brand-orange px-8 py-6 font-extrabold text-white transition-transform hover:scale-105 hover:bg-orange-600"
            asChild
          >
            <a
              href={CURSOS_CONVERSAO_KIWIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Comprar agora na Kiwify"
            >
              Comprar agora
            </a>
          </Button>
        </div>
      </header>
    );
  }
  
  const getHref = (href: string) => {
    if (href.startsWith("#") && !isHome) return `/${href}`;
    return href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black border-b border-white/10 py-2 transition-all duration-300">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="relative w-48 h-14 md:w-80 md:h-20 block shrink-0"
          aria-label="Ir para a página inicial"
        >
          <Image
            src={withBasePath("/logo.png")}
            alt="T4 Surf Logo"
            fill
            className="object-contain object-left"
            priority
            unoptimized
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isExternal = Boolean(link.external);

            return (
              <Link
                key={link.label}
                href={getHref(link.href)}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-sm font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-wide whitespace-nowrap"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block shrink-0">
          <Button
            className="bg-brand-orange hover:bg-orange-600 text-white font-extrabold rounded-full px-8 py-6 transition-transform hover:scale-105"
            asChild
          >
            <Link href={getHref("#comecar")}>Começar Agora</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                aria-label="Abrir menu"
              >
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-brand-black border-gray-800 text-white w-3/4"
            >
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <div className="h-full flex flex-col px-6 py-8">
                <div className="mx-auto w-full max-w-[320px] flex flex-col gap-8">
                  <div className="relative w-40 h-12 mx-auto">
                    <Image
                      src="/logo.png"
                      alt="T4 Surf"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <nav className="flex flex-col gap-6">
                    {NAV_LINKS.map((link) => {
                      const isExternal = Boolean(link.external);

                      return (
                        <Link
                          key={link.label}
                          href={getHref(link.href)}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="text-base font-bold text-gray-200 hover:text-brand-orange transition-colors"
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                  <Button
                    className="bg-brand-orange hover:bg-orange-600 w-full font-extrabold py-4 rounded-xl text-base"
                    asChild
                  >
                    <Link href={getHref("#comecar")}>Começar Agora</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
