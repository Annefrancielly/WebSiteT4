"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/features/components/ui/badge";
import { FAQ_DATA } from "@/constants/site-data";
import { withBasePath } from "@/lib/paths";

export function FaqSection() {
  return (
    <section id="faq" className="bg-[#F2F2F0] font-sans">
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-brand-black">
        <Image
          src={withBasePath("/surf-trips-hero.jpg")}
          alt="Capa FAQ"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center container px-6">
          <Badge className="bg-white/10 backdrop-blur-md text-white border border-white/20 mb-6 px-4 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em]">
            Dúvidas Frequentes
          </Badge>
          <h1 className="text-4xl md:text-6xl font-[800] text-white uppercase tracking-tighter mb-4">
            FAQ - Perguntas Frequentes
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed">
            Tire suas principais dúvidas sobre nossos cursos, metodologia e
            serviços.
          </p>
        </div>
      </div>

      <div className="container px-6 mx-auto max-w-5xl py-20 relative z-20">
        <div className="flex flex-col gap-10">
          {FAQ_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100"
            >
              <h3 className="text-[#3DB7B7] font-[800] text-lg md:text-xl flex gap-4 mb-5 items-start uppercase tracking-tighter leading-tight">
                <span className="shrink-0">{item.id}.</span>
                {item.question}
              </h3>
              <p className="text-gray-500 font-[500] text-sm md:text-base leading-relaxed md:pl-10 italic">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center space-y-8">
          <div className="inline-block bg-[#D1EAEA] text-[#3DB7B7] px-5 py-2 text-[11px] font-[800] uppercase rounded-full tracking-[0.2em]">
            Ainda com dúvidas?
          </div>
          <h2 className="text-4xl md:text-6xl font-[800] text-brand-black tracking-tighter uppercase leading-none">
            Entre em Contato Conosco
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg font-[500] italic leading-relaxed">
            Nossa equipe está pronta para esclarecer qualquer dúvida que você
            tenha sobre nossos cursos e serviços.
          </p>
          <Link
            href="https://wa.me/+5579988330770"
            target="_blank"
            className="bg-[#50C76C] hover:bg-[#45b560] text-white font-[800] px-12 py-6 rounded-2xl inline-flex items-center gap-4 transition-all hover:scale-105 shadow-2xl shadow-green-500/20 uppercase text-xs tracking-[0.2em]"
          >
            <MessageCircle className="w-6 h-6 fill-current" /> Falar no WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
