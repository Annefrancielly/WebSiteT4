import {
  Play,
  FileText,
  MessageCircle,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";

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
    image: "/curso.jpeg",
    videoThumb: "/curso.jpeg",
    //videoUrl: "https://youtu.be/oWz-Lu7y268?si=YeO6nFfyQyeh3O7x",
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

export const CURSOS_CONVERSAO_KIWIFY_URL = "https://pay.kiwify.com.br/inoxL34";

export const PROFESSOR_TRAJETORIA_YOUTUBE_URL = "https://youtu.be/GI9on9VKkOA";

