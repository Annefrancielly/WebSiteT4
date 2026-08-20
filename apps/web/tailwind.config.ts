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
            // Tipografia oficial T4: Montserrat para texto, Anton para titulos.
            // As variaveis sao injetadas no <html> por next/font (app/layout.tsx).
            fontFamily: {
                sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
                display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
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
