import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";

import { COURSES } from "@/constants/courses";
import { criarUrlWhatsApp, INSTAGRAM_URL } from "@/constants/site-data";
import { withBasePath } from "@/lib/paths";

const MENSAGEM_RODAPE =
  "Olá! Vim pelo site da T4 Surf e gostaria de falar sobre os cursos.";

/**
 * Contato da desenvolvedora. Fica separado do WhatsApp comercial da T4 de
 * propósito: são dois números, com dois donos e dois propósitos, e misturá-los
 * numa constante só seria pedir para alguém trocar o errado.
 */
const WHATSAPP_DESENVOLVEDORA = "https://wa.me/5579999331339";

type LinkRodape = {
  label: string;
  href: string;
  externo?: boolean;
};

/**
 * Os cursos vêm do array real, não escritos à mão.
 *
 * Assim o rodapé não pode divergir da vitrine: curso novo aparece aqui sozinho,
 * curso renomeado muda de nome aqui junto, e as âncoras continuam apontando
 * para os cards certos porque usam o mesmo `id`.
 *
 * A ordem é invertida em relação à vitrine: aqui a leitura é uma lista, e em
 * lista faz mais sentido começar por onde a pessoa começa a aprender.
 */
const LINKS_CURSOS: LinkRodape[] = [...COURSES]
  .reverse()
  .map((curso) => ({
    label: `${curso.titleLead} ${curso.titleAccent}`,
    href: `/#card-${curso.id}`,
  }));

const LINKS_T4: LinkRodape[] = [
  { label: "O Método T4", href: "/#metodo" },
  { label: "Resultados", href: "/#resultados" },
  { label: "Sobre o Ricardo", href: "/#sobre" },
  { label: "Surf Trips", href: "/surf-trips/" },
];

const LINKS_AJUDA: LinkRodape[] = [
  { label: "Perguntas frequentes", href: "/faq/" },
  { label: "Aulas presenciais", href: "/agendar-aula/" },
  { label: "Falar no WhatsApp", href: criarUrlWhatsApp(MENSAGEM_RODAPE), externo: true },
];

function ColunaDeLinks({
  titulo,
  links,
}: {
  titulo: string;
  links: LinkRodape[];
}) {
  return (
    <nav aria-label={titulo}>
      <h2 className="font-display text-[10px] font-bold uppercase tracking-[0.14em] text-brand-ink-muted">
        {titulo}
      </h2>

      <ul className="mt-4 grid gap-1">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              target={link.externo ? "_blank" : undefined}
              rel={link.externo ? "noopener noreferrer" : undefined}
              className="block py-1.5 text-[14.5px] text-brand-ink-text transition-colors hover:text-brand-orange"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Rodapé do site.
 *
 * Passou para as superfícies escuras do novo sistema e ganhou uma coluna de
 * cursos gerada a partir do array real — antes o rodapé não citava nenhum
 * curso, justamente na área do site em que o visitante que rolou a página
 * inteira procura o caminho de volta para a oferta.
 *
 * Três defeitos foram corrigidos junto, e vale nomeá-los:
 *
 * 1. Havia um <li> solto, fora de qualquer <ul>, no bloco de crédito. HTML
 *    inválido: o navegador conserta na marra e o leitor de tela anuncia "item
 *    de lista" para um texto que não é lista.
 *
 * 2. "Sobre o Instrutor" apontava para "/" — levava para o topo da Home em vez
 *    da seção do Ricardo. Agora é "/#sobre".
 *
 * 3. O número do WhatsApp estava escrito à mão em três lugares deste arquivo.
 *    Agora vem de criarUrlWhatsApp, como no resto do projeto.
 *
 * Server Component: nenhum estado, nenhum evento.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-ink pb-8 pt-14 text-brand-ink-text">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Image
              src={withBasePath("/logo.png")}
              alt="T4 Surf"
              width={190}
              height={56}
              className="h-14 w-auto object-contain object-left"
            />

            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-brand-ink-muted">
              Método de evolução no surf. Cursos online, aulas presenciais e
              surf trips com Ricardo Torquato.
            </p>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da T4 Surf"
              className="mt-5 inline-flex size-10 items-center justify-center rounded-full bg-white/5 text-brand-ink-muted transition-colors duration-300 hover:bg-brand-orange hover:text-brand-black"
            >
              <Instagram className="size-5" aria-hidden="true" />
            </a>
          </div>

          <ColunaDeLinks titulo="Cursos" links={LINKS_CURSOS} />
          <ColunaDeLinks titulo="T4" links={LINKS_T4} />

          <div>
            <ColunaDeLinks titulo="Ajuda" links={LINKS_AJUDA} />

            <a
              href={criarUrlWhatsApp(MENSAGEM_RODAPE)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/15 px-4 text-sm font-medium transition-colors hover:border-white/35 hover:text-white"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp oficial
            </a>

            <p className="mt-3 text-xs text-brand-ink-muted">
              Seg à Sex: 09h às 18h
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-xs text-brand-ink-muted md:flex-row">
          {/*
            O ano é resolvido em tempo de BUILD, porque o site é export
            estático — ele não vira sozinho na virada do ano, só quando houver
            um novo deploy. Como o projeto recebe alterações com frequência,
            isso se resolve na prática; se um dia ficar meses sem publicar, o
            ano é o primeiro lugar a conferir.
          */}
          <p>
            © {new Date().getFullYear()} T4 Surf · Aracaju, SE · Todos os
            direitos reservados.
          </p>

          <a
            href={WHATSAPP_DESENVOLVEDORA}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-brand-orange"
          >
            Desenvolvido por Anne Siqueira
          </a>
        </div>
      </div>
    </footer>
  );
}
