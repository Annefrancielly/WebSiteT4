export type PlanoDeAula = {
    id: string;                 // chave estável (render/analytics)
    titulo: string;             // nome do plano no card
    subtitulo?: string;         // apoio (opcional)
    precoLabel?: string;        // ex: "R$ 297" ou "12x de R$ 29,70" (opcional)
    bullets: string[];          // lista do que inclui
    destaque?: boolean;         // “recomendado/mais vendido”
  };
  
  export const PLANOS_DE_AULA: PlanoDeAula[] = [
    {
      id: "plano-1",
      titulo: "Plano 1 (trocar pelo nome real)",
      subtitulo: "Subtítulo opcional",
      precoLabel: "R$ ---",
      bullets: [
        "Item 1 (trocar pelo conteúdo real)",
        "Item 2",
        "Item 3",
      ],
      destaque: true,
    },
    {
      id: "plano-2",
      titulo: "Plano 2 (trocar pelo nome real)",
      precoLabel: "R$ ---",
      bullets: ["Item 1", "Item 2"],
    },
  ];
  