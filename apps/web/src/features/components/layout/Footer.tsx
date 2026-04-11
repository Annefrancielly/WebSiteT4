import Link from "next/link";
import { Instagram, MessageCircle, LucideIcon } from "lucide-react";
import { Button } from "@/features/components/ui/button";
import { Separator } from "@/features/components/ui/separator";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-brand-dark pb-8 pt-16 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="T4 Surf"
              width={160}
              height={56}
              className="mx-auto block h-12 w-auto object-contain"
            />

            <p className="text-sm leading-relaxed text-gray-400">
              Metodologia comprovada para transformar iniciantes em surfistas
              confiantes. Aulas, cursos online e surf trips para todos os
              níveis.
            </p>

            <div className="flex gap-4 pt-2">
              <SocialLink
                href="https://www.instagram.com/t4_surf/"
                icon={Instagram}
                label="Instagram da T4 Surf"
              />
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-brand-orange">
              Navegação
            </h4>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Início
                </Link>
              </li>

              <li>
                <Link
                  href="/cursos"
                  className="transition-colors hover:text-white"
                >
                  Cursos Online
                </Link>
              </li>

              <li>
                <Link
                  href="/agendar-aula"
                  className="transition-colors hover:text-white"
                >
                  Aulas Presenciais
                </Link>
              </li>

              <li>
                <Link
                  href="/surf-trips"
                  className="transition-colors hover:text-white"
                >
                  Surf Trips
                </Link>
              </li>

              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Sobre o Instrutor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-brand-orange">
              Suporte
            </h4>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-white"
                >
                  Central de Ajuda
                </Link>
              </li>

              <li>
                <Link
                  href="https://wa.me/+5579988330770"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Atendimento no WhatsApp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-bold text-brand-orange">
              Fale Conosco
            </h4>

            <p className="mb-4 text-sm text-gray-400">
              Dúvidas sobre qual o melhor curso ou prancha para você?
            </p>

            <Button
              variant="outline"
              className="w-full gap-2 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="https://wa.me/+5579988330770" target="_blank">
                <MessageCircle className="h-4 w-4 text-green-500" />
                WhatsApp Oficial
              </Link>
            </Button>

            <p className="mt-4 text-xs text-gray-500">Seg à Sex: 09h às 18h</p>
          </div>
        </div>

        <Separator className="mb-8 bg-gray-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} T4 Surf. Todos os direitos
            reservados.
          </p>

          <div className="flex items-center gap-2">
            <span>Desenvolvido com metodologia XP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-all duration-300 hover:bg-brand-orange hover:text-white"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}