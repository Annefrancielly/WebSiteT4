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

  /**
   * Uma frase, na voz do Ricardo, dizendo o que muda para quem faz o curso.
   *
   * É o primeiro texto que o visitante lê depois do nome, e por isso fala do
   * RESULTADO, não do conteúdo. "Pare de apenas tentar manobras. Aprenda a
   * executá-las" vende; "38 aulas sobre manobras" descreve.
   */
  pitch: string;

  description: string;

  /**
   * O que a pessoa sai sabendo fazer. Verbos e habilidades, nunca títulos de
   * módulo — o visitante não compra "Módulo 3", compra saber dropar.
   *
   * Ordem importa: é a sequência em que o curso ensina, e ler de cima para
   * baixo deve dar a sensação de progressão.
   */
  learnings: string[];

  /** Diferencial que não cabe na lista acima. Opcional: nem todo curso tem. */
  bonus?: string;

  /**
   * Ponte para o curso vizinho, para quem abriu o card errado.
   *
   * Existe por um motivo comercial preciso: sem ela, quem percebe que o curso
   * não é o dele fecha a página. Com ela, ele vai para o card certo. É a
   * diferença entre perder a venda e mudar de produto.
   *
   * `alvoId` é o `id` de outro curso deste mesmo array.
   */
  crossSell?: {
    pergunta: string;
    rotulo: string;
    alvoId: string;
  };

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

/**
 * O que o visitante diz sobre SI MESMO, por nível.
 *
 * Existe porque ninguém chega ao site sabendo se é "intermediário". As pessoas
 * sabem descrever o problema delas — "entro atrasado", "não fico de pé". O
 * seletor pergunta pelo problema e devolve o curso; o rótulo técnico vira
 * consequência, não pré-requisito.
 *
 * Frases na primeira pessoa, como no protótipo aprovado: o visitante precisa se
 * reconhecer na frase, e ninguém se reconhece numa descrição em terceira pessoa.
 *
 * A ordem acompanha a da vitrine (avançado -> iniciante), para que a leitura de
 * cima para baixo seja a mesma nas duas seções.
 */
export type DiagnosticoDeNivel = {
  level: CourseLevel;
  situacao: string;
};

export const DIAGNOSTICOS_POR_NIVEL: DiagnosticoDeNivel[] = [
  {
    level: "Avançado",
    situacao: "Já pego a onda e tento manobras, mas não consigo executá-las",
  },
  {
    level: "Intermediário",
    situacao:
      "Já pego ondas, mas perco a parede, entro atrasado ou não gero velocidade",
  },
  {
    level: "Iniciante",
    situacao: "Nunca surfei ou ainda não fico de pé com consistência",
  },
];

/**
 * A ORDEM DESTE ARRAY É A ORDEM EXIBIDA NA VITRINE.
 *
 * Definida pelo cliente em 20/08/2026, do avançado para o iniciante:
 * "A ordem vai ser: 1 progressivo, 2 Evolução, 3 Aprendendo do zero.
 *  Da esquerda para direita."
 *
 * A progressão real do aprendizado é a inversa (Zero → Evolução → Progressivo).
 * O seletor de nível é o que resolve isso: o visitante iniciante não precisa
 * percorrer a vitrine até achar o card dele, ele declara a situação e é levado
 * direto ao curso certo.
 *
 * Ao construir cross-sell ou "próximo passo", NÃO use a posição neste array:
 * ela é decisão de vitrine, não de currículo.
 */
export const COURSES: Course[] = [
  {
    id: "curso-progressivo",
    titleLead: "Curso",
    titleAccent: "Progressivo",
    pitch: "Pare de apenas tentar manobras. Aprenda a executá-las.",
    description:
      "Entenda como seu corpo, seus pés e sua prancha precisam trabalhar para transformar movimentos em cavadas, rasgadas, batidas e cutbacks com mais técnica e controle.",
    learnings: [
      "Postura dos pés",
      "Cavada",
      "Rasgada",
      "Batida",
      "Cutback",
    ],
    bonus: "Primeiros movimentos no simulador",
    crossSell: {
      pergunta: "Ainda não gera velocidade na onda?",
      rotulo: "Comece pelo Evolução",
      alvoId: "evolucao-intermediario-avancado",
    },
    lessons: 38,
    level: "Avançado",
    // PROVISÓRIA — substituir pela fotografia definitiva do curso.
    image: withBasePath("/curso.jpeg"),
    imageAlt: "Surfista executando manobra avançada durante o Curso Progressivo",
    priceCents: 14700,
    // Sem preco anterior: o briefing usava o proprio valor cobrado hoje pela
    // Kiwify como "de". Riscar o preco cobrado seria desconto ficticio.
    oldPriceCents: null,
    installments: "12x de R$ 15,20",
    checkoutUrl: CHECKOUT_URLS.progressivo,
  },
  {
    id: "evolucao-intermediario-avancado",
    titleLead: "Evolução",
    titleAccent: "Intermediário Avançado",
    pitch: "Você já pega ondas. Agora aprenda a aproveitá-las de verdade.",
    description:
      "Se você perde a parede, entra atrasado, rema demais ou não consegue gerar velocidade, este curso vai te mostrar onde está o erro e como corrigir.",
    learnings: [
      "Como escolher a onda certa",
      "Posicionamento no pico",
      "Postura para entrada na onda",
      "Remada eficiente",
      "Drop com direcionamento",
      "Como gerar velocidade",
      "Como passar por baixo das ondas",
    ],
    crossSell: {
      pergunta: "Ainda não pega ondas formadas?",
      rotulo: "Comece pelo Do Zero",
      alvoId: "aprendendo-a-surfar-do-zero",
    },
    lessons: 37,
    level: "Intermediário",
    // PROVISÓRIA — substituir pela fotografia definitiva do curso.
    image: withBasePath("/AulaSimulador.JPG"),
    imageAlt: "Treino de manobras no simulador de surf do Método T4",
    priceCents: 12700,
    // Mesmo caso do card anterior.
    oldPriceCents: null,
    installments: "12x de R$ 13,14",
    checkoutUrl: CHECKOUT_URLS.evolucao,
  },
  {
    id: "aprendendo-a-surfar-do-zero",
    titleLead: "Aprendendo a",
    titleAccent: "Surfar do Zero",
    pitch: "Aprenda a surfar do jeito certo desde o início.",
    description:
      "Um método passo a passo para você chegar ao mar sabendo como remar, levantar, se posicionar, direcionar a prancha e pegar suas primeiras ondas com mais segurança e confiança.",
    learnings: [
      "Base e posicionamento na prancha",
      "Como escolher a prancha ideal",
      "Drop passo a passo",
      "Postura correta",
      "Como direcionar a prancha",
      "Remada eficiente",
    ],
    crossSell: {
      pergunta: "Já pega ondas?",
      rotulo: "Veja o Evolução",
      alvoId: "evolucao-intermediario-avancado",
    },
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
];
