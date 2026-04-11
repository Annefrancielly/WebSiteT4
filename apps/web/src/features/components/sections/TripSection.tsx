"use client";

import Image from "next/image";
import { MapPin, Calendar, Users, MessageCircle } from "lucide-react";
import { Button } from "@/features/components/ui/button";
import { Badge } from "@/features/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/features/components/ui/dialog";
import Link from "next/link";
import type { SurfTripDto } from "@/types/public-api";

function normalizeImage(src: string): string {
  if (!src) return "/pipa-trip.jpg";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return src;
  return `/${src}`;
}

function toNumber(value: number | string): number {
  if (typeof value === "number") return value;
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function TripSection({ trips }: { trips: SurfTripDto[] }) {
  const whatsappUrl = "https://wa.me/+5579988330770";

  const firstTrip = trips[0];

  return (
    <section id="surf-trips" className="py-12 bg-[#F2F2F0] scroll-mt-24">
      <div className="container px-6 mx-auto text-center">
        <Badge className="bg-orange-600 text-white border-none mb-4 px-3 py-1 text-[10px] font-black uppercase rounded-full">
          Próxima Aventura
        </Badge>

        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Embarque Nessa Experiência!
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto text-sm mb-12 italic font-medium">
          {firstTrip?.description ?? "As próximas surf trips aparecerão aqui automaticamente."}
        </p>

        {/* Mantém o mesmo “visual de card único”, só que repetido */}
        <div className="space-y-10">
          {trips.map((trip, idx) => {
            const price = toNumber(trip.price);
            const imageSrc = normalizeImage(trip.image);
            const levelLabel = trip.levelLabel?.trim() || "Intermediário";
            const aboutText = trip.about?.trim() || trip.description;

            return (
              <div
                key={trip.slug}
                className="max-w-[800px] mx-auto bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 text-left"
              >
                <div className="relative h-64 md:h-80 w-full">
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <Badge className="bg-[#FEF9C3] text-[#854D0E] border-none px-3 py-1 text-[10px] font-bold italic">
                      {levelLabel}
                    </Badge>
                  </div>

                  <Image
                    src={imageSrc}
                    alt={`Capa Surf Trip ${trip.title}`}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-black text-brand-black mb-1 italic uppercase tracking-tighter">
                    {trip.title}
                  </h3>

                  <div className="flex items-center gap-1 text-gray-400 text-xs font-bold mb-6">
                    <MapPin className="w-3 h-3" /> {trip.location}
                  </div>

                  <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 pt-6 border-t border-gray-50">
                    <div>
                      <span className="text-2xl font-black text-brand-turquoise uppercase">
                        R$ {price.toLocaleString("pt-BR")} à vista
                      </span>
                      <p className="text-[10px] text-brand-turquoise font-bold uppercase tracking-widest">
                        ou 10x de R$ {(price / 10).toFixed(0)} no cartão
                      </p>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex-1 md:w-48 h-12 border-brand-turquoise text-brand-turquoise font-black uppercase text-xs rounded-xl hover:bg-teal-50 transition-colors"
                          >
                            Ver Detalhes
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-[480px] p-0 overflow-y-auto max-h-[90vh] rounded-[40px] border-none bg-white t4-scrollbar">
                          <div className="sr-only">
                            <DialogTitle>{trip.title}</DialogTitle>
                            <DialogDescription>Detalhes completos da trip</DialogDescription>
                          </div>

                          <div className="relative h-64 w-full">
                            <div className="absolute top-4 left-4 z-10 flex gap-2">
                              <Badge className="bg-[#FEF9C3] text-[#854D0E] border-none px-3 py-1 text-[10px] font-bold italic">
                                {levelLabel}
                              </Badge>
                            </div>

                            <Image
                              src={imageSrc}
                              alt={`Detalhes ${trip.title}`}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="p-8 space-y-6">
                            <div>
                              <h3 className="text-3xl font-black text-brand-black leading-none italic uppercase tracking-tighter">
                                {trip.title}
                              </h3>
                              <div className="flex items-center gap-1 text-gray-400 text-xs font-bold mt-2 italic uppercase">
                                <MapPin className="w-4 h-4" /> {trip.location}
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-6 border-y border-gray-100 text-center items-center">
                              <div>
                                <Calendar className="w-5 h-5 mx-auto text-brand-turquoise mb-1" />
                                <p className="text-xs font-black uppercase">{trip.duration}</p>
                                <p className="text-[9px] text-gray-400 font-bold uppercase">
                                  {trip.dateRange}
                                </p>
                              </div>

                              <div>
                                <p className="text-xl font-black text-brand-turquoise">
                                  R$ {price.toLocaleString("pt-BR")}
                                </p>
                                <p className="text-[9px] text-gray-400 font-bold uppercase">
                                  por pessoa
                                </p>
                              </div>

                              <div>
                                <Users className="w-5 h-5 mx-auto text-brand-turquoise mb-1" />
                                <p className="text-xs font-black">{trip.remainingSlots} vagas</p>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter italic">
                                  {typeof trip.totalSlots === "number"
                                    ? `de ${trip.totalSlots} totais`
                                    : `de ${trip.remainingSlots} restantes`}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="text-sm font-black text-brand-black uppercase italic tracking-widest">
                                Sobre Esta Experiência
                              </h4>
                              <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                                {aboutText}
                              </p>
                            </div>

                            {trip.includes?.length ? (
                              <div className="space-y-4 pt-2">
                                <h4 className="text-sm font-black text-brand-black uppercase italic tracking-widest">
                                  O Que Está Incluído
                                </h4>

                                <div className="grid grid-cols-2 gap-y-3">
                                  {trip.includes.map((item) => (
                                    <div
                                      key={item}
                                      className="flex items-center gap-2 text-[11px] font-bold text-gray-600"
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-brand-turquoise" />{" "}
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}

                            <Button
                              className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-black h-14 rounded-2xl uppercase text-xs tracking-widest flex gap-2 shadow-lg shadow-green-500/20 transition-all active:scale-95 mt-4"
                              asChild
                            >
                              <Link href={whatsappUrl} target="_blank">
                                <MessageCircle className="w-5 h-5 fill-current" /> Conversar no WhatsApp
                              </Link>
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        className="flex-1 md:w-48 h-12 bg-brand-orange hover:bg-orange-600 text-white font-black uppercase text-xs rounded-xl shadow-lg shadow-orange-500/10 transition-transform active:scale-95"
                        asChild
                      >
                        <Link href={whatsappUrl} target="_blank">
                          Quero Ir!
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
