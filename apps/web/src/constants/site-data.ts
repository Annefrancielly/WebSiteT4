import {
  Play,
  FileText,
  MessageCircle,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import { withBasePath } from "@/lib/paths";

// --- TIPOS ---
export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  videoThumb: string;
  videoUrl?: string;
  rating: string;
  students: string;
  duration: string;
  instructor: string;
  price: number;
  oldPrice: number | null;
  installments: string;
  offerBadge: string;
  tags: string[];
  checkoutLink: string;
  features: { icon: LucideIcon; title: string; desc: string; }[];
}

export interface SurfTrip {
  id: string;
  slug: string;
  title: string;
  location: string;
  dateRange: string;
  duration: string;
  remainingSlots: number;
  price: number;
  description: string;
  image: string;
  includes: string[];
}

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  "Aprendendo a surfar do zero ao intermediário": {
    id: "leitura",
    slug: "Aprendendo-a-surfar-do-zero-ao-intermediario",
    title: "Aprendendo a surfar do zero ao intermediário",
    subtitle: "Pare de remar para onda ruim! O posicionamento certo significa mais ondas e evolução rápida.",
    category: "Intermediário",
    image: withBasePath("/courses/Banner-Desktop-T4.png"), videoThumb: withBasePath("/curso.jpeg"),
    videoUrl: "https://youtu.be/tbGmUWUBvxo?si=Axn2T4Y1YywKxlEn",
    rating: "4.9",
    students: "150",
    duration: "3h 45min",
    instructor: "Ricardo Torquato",
    price: 97.0,
    oldPrice: 190.0,
    offerBadge: "BEST SELLER",
    installments: "12x de R$ 14,70",
    checkoutLink: "https://pay.kiwify.com.br/inoxL34",
    tags: ["Garantia 7 dias", "Acesso 1 ano", "WhatsApp"],
    features: [
      { icon: Play, title: "Aula Extra!", desc: "Aula extra de surf para iniciantes." },
      { icon: FileText, title: "Condições especiais!", desc: "Acesso antecipado a surf trips T4" },
      { icon: MessageCircle, title: "Grupo Alerta", desc: "Melhores condições." },
      { icon: ShieldCheck, title: "Posicionamento", desc: "No lugar certo do pico." },
    ]
  }
};

// --- DADOS DAS TRIPS ---
export const ACTIVE_TRIPS: SurfTrip[] = [
  {
    id: "pipa-2026",
    slug: "pipa-baia-formosa",
    title: "Pipa + Baía Formosa Experiência",
    location: "Rio Grande do Norte",
    dateRange: "13 Mar - 17 Mar",
    duration: "5 dias",
    remainingSlots: 30,
    price: 1287.00,
    description: "Uma experiência única que combina ondas perfeitas com um coaching técnico de alto nível.",
    image: "/trips/pipa-trip.jpg",
    includes: ["Acomodação premium", "Equipamentos inclusos", "Instrutor profissional", "Transporte local"]
  }
];

export const FAQ_DATA = [
  {
    id: 1,
    question: "COMO RECEBO O ACESSO AO CURSO?",
    answer: "Assim que seu pagamento for confirmado, você receberá suas credenciais de acesso via WhatsApp para acessar a plataforma de alunos. Lá, todas as aulas (vídeos, PDFs e bônus) estarão disponíveis 24h/dia, em qualquer dispositivo."
  },
  {
    id: 2,
    question: "PRECISO TER EXPERIÊNCIA PRÉVIA EM SURF?",
    answer: "Não! O Método T4 foi criado especificamente para iniciantes absolutos. Se você nunca subiu em uma prancha ou só tomou \"caldos\", este curso é para você. Começamos do ZERO, com exercícios na areia antes de ir para a água."
  },
  {
    id: 3,
    question: "QUANTO TEMPO PRECISO TREINAR POR DIA?",
    answer: "O curso foi projetado para quem tem pouco tempo. As aulas são curtas e objetivas (de 5 a 15 minutos), e você pode praticar os exercícios em casa ou na praia. Recomendamos apenas 30 minutos, 2x por semana para ver resultados rápidos."
  },
  {
    id: 4,
    question: "PRECISO COMPRAR UMA PRANCHA NOVA?",
    answer: "Não! No Módulo 1, você aprenderá a escolher a prancha IDEAL para seu biótipo (se quiser comprar), alugar a prancha certa (economizando dinheiro) ou adaptar a técnica à prancha que você já tem."
  },
  {
    id: 5,
    question: "O CURSO FUNCIONA PARA QUALQUER TIPO DE ONDA?",
    answer: "Sim! Focamos em ondas pequenas e médias (até 1,5m), as melhores para iniciantes. Você aprenderá a ler o mar e identificar as ondas mais fáceis para praticar, seja no Brasil, Portugal ou qualquer outro lugar."
  },
  {
    id: 6,
    question: "E SE EU NÃO GOSTAR DO CURSO?",
    answer: "Oferecemos garantia incondicional de 7 dias. Se você achar que o método não é para você, basta entrar em contato via WhatsApp e devolveremos 100% do seu dinheiro, sem perguntas."
  },
  {
    id: 7,
    question: "QUAIS OS EQUIPAMENTOS NECESSÁRIOS PARA AS AULAS PRESENCIAIS?",
    answer: "Para as aulas presenciais em Aracaju, nós fornecemos todo o equipamento: pranchas (softboards seguras), lycra e protetor solar. Você só precisa trazer sua disposição e uma toalha."
  },
  {
    id: 8,
    question: "AS AULAS DE SIMULADOR DE SURF AJUDAM MESMO?",
    answer: "Demais! O simulador (skate surf) é a melhor ferramenta fora da água para corrigir postura e treinar a memória muscular das manobras. É onde você repete o movimento 50 vezes sem ter que esperar a onda vir."
  },
  {
    id: 9,
    question: "POSSO REMARCAR UMA AULA CASO PRECISE?",
    answer: "Sim. Pedimos apenas que avise com 24h de antecedência pelo WhatsApp. No caso de condições do mar perigosas, nós mesmos entraremos em contato para remarcar visando sua segurança."
  },
  {
    id: 10,
    question: "EXISTE ALGUMA IDADE MÍNIMA PARA COMEÇAR?",
    answer: "Atendemos desde crianças (a partir de 4 anos) até adultos que decidiram realizar o sonho de surfar aos 50 ou 60 anos. O surf é para todos e o Método T4 adapta o esforço para cada perfil."
  }
];

/**
 * FAQ da Home — dúvidas que travam a COMPRA.
 *
 * Convive de propósito com o FAQ_DATA acima, e a separação não é duplicação:
 * são dois públicos em dois momentos.
 *
 *   FAQ_DATA        página /faq. Suporte e operação: como recebo o acesso,
 *                   posso remarcar aula, quais equipamentos. Quem lê já
 *                   comprou, ou está prestes a.
 *
 *   FAQ_DECISAO     Home, logo antes do último CTA. Só as objeções que fazem
 *                   alguém FECHAR A PÁGINA: qual curso é o meu, funciona por
 *                   vídeo, e se eu errar a escolha.
 *
 * Misturar os dois é o erro clássico de FAQ: uma lista de vinte perguntas em
 * que a dúvida que impedia a compra fica em décimo quarto lugar, depois de
 * "quais equipamentos vocês fornecem".
 */
export type PerguntaFrequente = {
  id: string;
  pergunta: string;
  resposta: string;
};

export const FAQ_DECISAO: PerguntaFrequente[] = [
  {
    id: "qual-curso-iniciante",
    pergunta: "Nunca surfei. Qual curso eu escolho?",
    resposta:
      "O Aprendendo a Surfar do Zero. Ele parte do absoluto zero — base na prancha, escolha do equipamento, remada e o drop passo a passo. Não existe pré-requisito nenhum.",
  },
  {
    id: "evolucao-ou-progressivo",
    pergunta: "Já pego ondas. É o Evolução ou o Progressivo?",
    resposta:
      "Se você pega a onda mas perde a parede, entra atrasado ou não gera velocidade, é o Evolução. Se você já corre a onda com velocidade e o que falta é executar manobra — cavada, rasgada, cutback — é o Progressivo.",
  },
  {
    id: "aprender-por-video",
    pergunta: "Dá para aprender surf de verdade por vídeo?",
    resposta:
      "Boa parte do que trava a evolução acontece antes de entrar na água — leitura de mar, posicionamento, o movimento do pop-up. Isso se aprende melhor em vídeo, revendo quantas vezes precisar, do que numa aula em que a onda não espera.",
  },
  {
    id: "curso-errado",
    pergunta: "E se eu comprar o curso errado?",
    resposta:
      "Você tem 7 dias de garantia. Se não for para o seu momento, devolvemos o valor integral — é o seu direito por lei e nós fazemos questão de deixar claro.",
  },
  {
    id: "prancha-propria",
    pergunta: "Preciso ter prancha própria?",
    resposta:
      "Não para começar. E o curso Do Zero tem uma aula inteira sobre como escolher a prancha ideal, para você não gastar errado na primeira compra.",
  },
  {
    id: "mais-de-um-curso",
    pergunta: "Posso comprar mais de um curso?",
    resposta:
      "Pode. E vale conversar antes: dependendo do seu momento, faz mais sentido começar por um e avançar para o próximo. Chame no WhatsApp que eu te oriento.",
  },
];

/**
 * Menor valor das aulas presenciais, em CENTAVOS.
 *
 * DÉBITO CONHECIDO: a tabela completa de planos ainda vive dentro de
 * PlansSection.tsx, em um array não exportado e com preço em string. Este
 * valor precisa concordar com o menor preço de lá.
 *
 * Está aqui porque a faixa "Mora em Aracaju?" da Home precisa do "a partir de"
 * sem importar a seção inteira de planos. Quando PlansSection for refatorada,
 * a tabela deve subir para cá e esta constante passa a ser derivada dela, como
 * já acontece com os cursos online.
 */
export const AULAS_PRESENCIAIS_A_PARTIR_DE_CENTAVOS = 55_000;

export const CURSOS_CONVERSAO_KIWIFY_URL = "https://pay.kiwify.com.br/inoxL34";

export const PROFESSOR_TRAJETORIA_YOUTUBE_URL = "https://youtu.be/GI9on9VKkOA";

/**
 * Vídeo em que o Ricardo responde à pergunta que dá título à seção do Método:
 * "por que uns levam 3 anos e outros levam 3 meses?".
 *
 * PROVISÓRIO — decisão do cliente em 23/08: usar por enquanto o mesmo vídeo que
 * já roda na página de Cursos. Quando o vídeo definitivo for gravado, é só
 * trocar a URL aqui; aceita "https://youtu.be/XXXX" e
 * "https://www.youtube.com/watch?v=XXXX".
 *
 * A URL está escrita, e não apontando para COURSE_DETAILS, de propósito: são
 * dois vídeos que por ora coincidem, não o mesmo vídeo. Referenciar o outro
 * faria a seção do Método mudar sozinha no dia em que a prévia do curso fosse
 * trocada.
 *
 * Se algum dia esta constante ficar vazia, a seção continua existindo com
 * título e texto e o bloco do vídeo simplesmente não é renderizado — a página
 * nunca fica com cara de inacabada.
 */
export const METODO_VIDEO_YOUTUBE_URL = "https://youtu.be/tbGmUWUBvxo";

/**
 * Números da faixa de prova social, logo abaixo do Hero.
 *
 * PROCEDÊNCIA DE CADA UM — importante, porque número de prova social errado é
 * o tipo de erro que custa credibilidade e não se conserta com deploy:
 *
 *   5,0 no Google    confirmado pelo Ricardo em 23/08
 *   35 avaliações    confirmado pelo Ricardo em 23/08
 *   500+ alunos      já publicado no site (Hero e StatsStrip antigos)
 *   5+ anos          já publicado no site (selo "Instrutor Profissional há 5+ anos")
 *
 * Ficou de fora o "150 alunos / 4.9" que ainda consta em COURSE_DETAILS: ele
 * contradiz o que o site publica e é o dado mais velho dos dois. Vale corrigir
 * lá quando aquela seção for refatorada.
 *
 * Também ficou de fora "5+ estados", do StatsStrip antigo: com a avaliação e a
 * contagem do Google ocupando dois lugares, ele seria o quinto item numa grade
 * de quatro. Nota e número de avaliações vendem mais que cobertura geográfica.
 *
 * `valor` é número, e não texto, porque o contador precisa animar até ele.
 * O "+" e o "★" moram em `sufixo`.
 */
export type ProvaSocial = {
  valor: number;
  casasDecimais?: number;
  sufixo?: string;
  rotulo: string;
};

/** Perfil oficial da T4. Centralizado para não ser reescrito em cada seção. */
export const INSTAGRAM_URL = "https://www.instagram.com/t4_surf/";

/**
 * Ficha da T4 no Google.
 *
 * Nota e quantidade de avaliações confirmadas pelo Ricardo em 23/08.
 *
 * São constantes, e não números escritos nos componentes, porque aparecem em
 * DOIS lugares — a faixa de prova social e a seção de depoimentos. Era
 * exatamente esse tipo de duplicação que mantinha "34 avaliações" na página
 * enquanto o número real já era outro.
 */
export const GOOGLE_NOTA = 5;
export const GOOGLE_AVALIACOES = 35;
export const GOOGLE_AVALIACOES_URL = "https://share.google/hQkaIPZdSZTFQI7Pv";

/**
 * Depoimentos em vídeo — a prova central da seção "Resultados".
 *
 * A ideia é a do protótipo aprovado: cada aluno gravado na PRIMEIRA AULA e
 * TRÊS MESES DEPOIS, no mesmo pico. É a prova mais forte que este produto pode
 * ter, porque no surf o resultado é filmável: ninguém precisa acreditar em
 * adjetivo nenhum, é só assistir.
 *
 * AGUARDANDO MATERIAL. O Ricardo vai gravar e enviar. Para publicar um
 * depoimento basta preencher as quatro informações da entrada correspondente;
 * enquanto `youtubeUrl` estiver vazio o card aparece em estado de espera, sem
 * play e sem texto inventado.
 *
 * `nome` e `frase` ficam VAZIOS de propósito. Frase entre aspas atribuída a um
 * aluno real precisa ter saído da boca dele — inventar depoimento é o tipo de
 * coisa que a T4 não faz, e que nós também não.
 *
 * Um nível por card, cobrindo os três cursos: quem se reconheceu no seletor
 * encontra aqui alguém que estava no mesmo lugar.
 */
export type DepoimentoEmVideo = {
  id: string;

  /** Momento em que o aluno começou. Casa com os níveis dos cursos. */
  nivel: "Iniciante" | "Intermediário" | "Avançado";

  nome: string;
  frase: string;

  /** Vazio enquanto o vídeo não existir. Aceita youtu.be ou youtube.com/watch. */
  youtubeUrl: string;
};

export const DEPOIMENTOS_EM_VIDEO: DepoimentoEmVideo[] = [
  { id: "iniciante", nivel: "Iniciante", nome: "", frase: "", youtubeUrl: "" },
  {
    id: "intermediario",
    nivel: "Intermediário",
    nome: "",
    frase: "",
    youtubeUrl: "",
  },
  { id: "avancado", nivel: "Avançado", nome: "", frase: "", youtubeUrl: "" },
];

/**
 * Frase de assinatura do Ricardo na seção de autoridade.
 *
 * PLACEHOLDER APROVADO. Esta redação é minha, não dele — ele aprovou o
 * protótipo com a marcação "frase a ser escrita por ele". Está aqui isolada
 * numa constante justamente para ele reescrever com as próprias palavras sem
 * ninguém precisar abrir um componente.
 *
 * Se ficar vazia, a seção deixa de exibir a citação e a assinatura. Frase
 * atribuída a uma pessoa real precisa ser dela — melhor não ter do que ter
 * uma inventada.
 */
export const PROFESSOR_FRASE =
  "A maioria trava porque tenta aprender no mar o que deveria ter aprendido na areia.";

export const PROVAS_SOCIAIS: ProvaSocial[] = [
  { valor: GOOGLE_NOTA, casasDecimais: 1, sufixo: "★", rotulo: "nota no Google" },
  { valor: GOOGLE_AVALIACOES, rotulo: "avaliações" },
  { valor: 500, sufixo: "+", rotulo: "alunos formados" },
  { valor: 5, sufixo: "+", rotulo: "anos ensinando" },
];

/**
 * Telefone comercial da T4, só dígitos e com código do país — é o formato que
 * a API do WhatsApp exige em wa.me.
 *
 * Hoje o número está escrito à mão em cinco arquivos diferentes. Trocar de
 * número significaria caçar todos, e o que ficasse para trás mandaria cliente
 * para um contato morto. Componentes novos usam esta constante; os antigos
 * migram quando forem refatorados.
 */
export const WHATSAPP_NUMERO = "5579988330770";

/**
 * Monta o link do WhatsApp com a mensagem já preenchida.
 *
 * `encodeURIComponent` não é detalhe: acento, espaço e emoji quebram a URL se
 * forem enviados crus, e a conversa abre vazia — o visitante que clicou com
 * intenção de comprar chega sem contexto nenhum do outro lado.
 */
export function criarUrlWhatsApp(mensagem: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

