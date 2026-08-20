import { withBasePath } from "@/lib/paths";

/**
 * Fonte única de verdade dos cursos online.
 *
 * Vive em arquivo próprio, separado de site-data.ts, porque a área de Cursos é
 * a que mais recebe alteração do cliente: isolar esses dados reduz o raio de
 * impacto de cada edição e evita conflito com FAQ, trips e demais conteúdos.
 */

/** Nível declarado — é por ele que o visitante se auto-seleciona. */
export type CourseLevel = "Iniciante" | "Intermediário" | "Avançado";

export type Course = {
  id: string;

  /**
   * O título vem quebrado em duas partes porque a identidade aplica cores
   * diferentes a cada uma: a primeira em preto, a segunda no laranja da marca.
   * Guardar já separado evita que o componente precise adivinhar onde cortar.
   */
  titleLead: string;
  titleAccent: string;

  description: string;
  lessons: number;
  level: CourseLevel;

  image: string;
  imageAlt: string;

  /**
   * Valores em CENTAVOS, inteiros. Dinheiro em ponto flutuante acumula erro
   * de arredondamento; a formatação para reais acontece só na borda de exibição.
   */
  priceCents: number;
  oldPriceCents: number | null;

  /** Parcelamento. Opcional: fica oculto enquanto o valor real da Kiwify não vier. */
  installments?: string;

  checkoutUrl: string;
};

/**
 * Links de checkout centralizados. Nenhum componente deve conter URL da Kiwify
 * escrita à mão — trocar um produto passa a ser uma edição em um lugar só.
 */
export const CHECKOUT_URLS = {
  zero: "https://pay.kiwify.com.br/vqTiCnu",
  evolucao: "https://pay.kiwify.com.br/uxqCF4b",
  progressivo: "https://pay.kiwify.com.br/CiUI8jJ",
} as const;

export const COURSES: Course[] = [
  {
    id: "aprendendo-a-surfar-do-zero",
    titleLead: "Aprendendo a",
    titleAccent: "Surfar do Zero",
    description:
      "Aprenda do absoluto zero e pegue suas primeiras ondas com segurança.",
    lessons: 34,
    level: "Iniciante",
    // PROVISÓRIA — substituir pela fotografia definitiva do curso.
    image: withBasePath("/curso-iniciante.jpg"),
    imageAlt: "Aluno iniciante pegando sua primeira onda em aula do Método T4",
    priceCents: 9700,
    oldPriceCents: 19700,
    installments: "12x de R$ 10,03",
    checkoutUrl: CHECKOUT_URLS.zero,
  },
  {
    id: "evolucao-intermediario-avancado",
    titleLead: "Evolução",
    titleAccent: "Intermediário Avançado",
    description:
      "Evolua suas manobras e surfe ondas maiores com confiança.",
    lessons: 37,
    level: "Intermediário",
    // PROVISÓRIA — substituir pela fotografia definitiva do curso.
    image: withBasePath("/AulaSimulador.JPG"),
    imageAlt: "Treino de manobras no simulador de surf do Método T4",
    priceCents: 12700,
    // Sem preco anterior: o briefing usava R$ 127,00 como valor "de", que e
    // exatamente o que a Kiwify cobra hoje. Riscar o proprio preco cobrado
    // seria desconto ficticio.
    oldPriceCents: null,
    installments: "12x de R$ 13,14",
    checkoutUrl: CHECKOUT_URLS.evolucao,
  },
  {
    id: "curso-progressivo",
    titleLead: "Curso",
    titleAccent: "Progressivo",
    description:
      "Domine manobras avançadas e leve seu surf para o próximo nível.",
    lessons: 38,
    level: "Avançado",
    // PROVISÓRIA — substituir pela fotografia definitiva do curso.
    image: withBasePath("/curso.jpeg"),
    imageAlt: "Surfista executando manobra avançada durante o Curso Progressivo",
    priceCents: 14700,
    // Mesmo caso do card 2.
    oldPriceCents: null,
    installments: "12x de R$ 15,20",
    checkoutUrl: CHECKOUT_URLS.progressivo,
  },
];
