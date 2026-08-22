import type { Metadata } from "next";
import { FaqSection } from "@/features/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "Perguntas Frequentes",
  description:
    "Como funciona o curso, qual nível escolher, equipamento necessário, acesso e garantia. As dúvidas mais comuns sobre o Método T4.",
};

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <FaqSection />
      </div>
    </div>
  );
}