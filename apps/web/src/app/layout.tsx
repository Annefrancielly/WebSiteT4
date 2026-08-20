import type { Metadata } from "next";
import { Rubik, Saira_Condensed } from "next/font/google";
import "./globals.css";
import { Navbar } from "../features/components/layout/Navbar";
import { Footer } from "@/features/components/layout/Footer";

/**
 * Sistema tipográfico T4.
 *
 * Saira Condensed (display) -> headlines, nomes de curso, seções e botões.
 *   Escolhida por coerência com o logotipo TORQUATO, que é uma grotesca de
 *   esqueleto quadrado: a Saira repete essa geometria e ainda mantém a largura
 *   condensada que uma headline de conversão precisa. Nove pesos disponíveis,
 *   o que permite hierarquia real entre h1, h2 e h3 — algo impossível com uma
 *   display de peso único.
 *
 * Rubik (texto) -> descrições, preços, informações e conteúdo corrido. Cantos
 *   sutilmente arredondados dão leitura relaxada sem infantilizar, contrastando
 *   com a rigidez do display. Nítida a 13-14px, o corpo usado nas informações
 *   dos cards de curso.
 *
 * Ambas carregadas por next/font: self-hosted no build, sem requisição ao
 * Google em runtime e sem FOUT.
 */
const fontSans = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Saira_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "T4 Surf | Metodologia Comprovada",
  description: "Aprenda a surfar com segurança e evolução rápida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-br"
      className={`${fontSans.variable} ${fontDisplay.variable} scroll-smooth`}
    >
      <body className="font-sans bg-brand-beige text-brand-black antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
