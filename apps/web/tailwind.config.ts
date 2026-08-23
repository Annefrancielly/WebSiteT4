import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config = {
    // REMOVIDO: darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            // Tipografia oficial T4: Rubik para texto, Anton para titulos.
            // As variaveis sao injetadas no <html> por next/font (app/layout.tsx),
            // que documenta a escolha de cada uma.
            fontFamily: {
                sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
                display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
            },
            // Escalas fluidas do Hero.
            //
            // Ficam aqui, e nao como valor arbitrario no componente, por dois
            // motivos: o clamp carrega junto o line-height e o tracking certos
            // (uma headline de 7rem com line-height 1.5 se desmonta), e quem
            // for reaproveitar a escala em outra pagina usa uma classe em vez
            // de copiar a formula.
            //
            // clamp(min, preferido, max): abaixo de ~375px trava em 44px;
            // acima de ~1400px trava em 112px; no meio cresce com a largura da
            // tela. Substitui a necessidade de tres breakpoints tipograficos.
            fontSize: {
                hero: [
                    "clamp(2.75rem, 1.1rem + 7vw, 7rem)",
                    { lineHeight: "0.88", letterSpacing: "-0.025em" },
                ],
                "hero-sub": [
                    "clamp(1.0625rem, 1.02rem + 0.2vw, 1.25rem)",
                    { lineHeight: "1.5" },
                ],
            },
            colors: {
                // Cores T4
                brand: {
                    orange: "hsl(var(--brand-orange))",
                    beige: "hsl(var(--brand-beige))",
                    black: "hsl(var(--brand-black))",
                    dark: "hsl(var(--brand-black))",
                    turquoise: "hsl(var(--brand-turquoise))",
                    cream: "hsl(var(--brand-beige))",

                    // Turquesa escurecido: usado nos precos, onde o turquesa
                    // puro nao atinge contraste AA sobre o creme.
                    "turquoise-deep": "hsl(var(--brand-turquoise-deep))",

                    // Superficies escuras (ver globals.css). Nao substituem
                    // brand-black: preto puro continua sendo a cor de tipografia
                    // sobre o creme. Estes tokens sao fundo, nunca texto.
                    ink: "hsl(var(--brand-ink))",
                    "ink-soft": "hsl(var(--brand-ink-soft))",
                    "ink-card": "hsl(var(--brand-ink-card))",
                    "ink-card-2": "hsl(var(--brand-ink-card-2))",

                    // Texto sobre superficie escura.
                    "ink-text": "hsl(var(--brand-ink-text))",
                    "ink-muted": "hsl(var(--brand-ink-muted))",
                },
                // Sistema (Mapeado para Light Mode sempre)
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            // Elevacao dos cards: sombra de contato (curta e opaca) somada a uma
            // sombra ambiente (longa e difusa). Duas camadas leem como objeto
            // apoiado numa superficie; uma camada so le como borrao cinza.
            boxShadow: {
                card: "0 1px 2px rgba(0,0,0,0.04), 0 14px 32px -12px rgba(0,0,0,0.18)",
                "card-hover": "0 2px 4px rgba(0,0,0,0.05), 0 22px 44px -14px rgba(0,0,0,0.26)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
                // Raio dos cards de curso definido pelo cliente (item 11).
                card: "14px",
            },
        },
    },
    plugins: [tailwindAnimate],
} satisfies Config;

export default config;
