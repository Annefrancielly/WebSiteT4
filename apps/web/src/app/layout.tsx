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

/**
 * Metadata raiz.
 *
 * O `template` faz cada página declarar só a sua parte do título e receber o
 * sufixo da marca automaticamente. Sem ele, página nova nasce herdando o título
 * genérico — foi o que aconteceu com Home, FAQ, Surf Trips e Agendar Aula, que
 * ficaram todas com o mesmo <title> nos resultados de busca.
 *
 * `metadataBase` permite Open Graph e canonical com caminho relativo.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://t4surf.com.br"),
  title: {
    default: "T4 Surf | Aprenda a Surfar do Zero ao Avançado",
    template: "%s | T4 Surf",
  },
  description:
    "Em 3 meses o que você levaria 3 anos para aprender sozinho. Cursos de surf online com o Método T4, do iniciante ao avançado.",
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
        {/*
          Rede de segurança da animação de entrada.

          O componente Reveal entrega o conteúdo transparente e o revela por
          JavaScript. Sem script — extensão bloqueando, rede caindo no meio do
          bundle, navegador antigo — o texto continuaria no HTML, porém
          invisível: uma página comercial em branco.

          Estas duas linhas devolvem tudo à vista nesse cenário. Custam zero
          para quem tem JavaScript: o navegador nem lê o conteúdo de <noscript>.
        */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
