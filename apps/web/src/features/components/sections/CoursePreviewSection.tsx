"use client";

import * as React from "react";
import Image from "next/image";
import { Clock, PlayCircle, User } from "lucide-react";

import { Badge } from "@/features/components/ui/badge";
import { Button } from "@/features/components/ui/button";
import { Card, CardContent } from "@/features/components/ui/card";
import { COURSE_DETAILS } from "@/constants/site-data";
import { toYouTubeEmbedUrl } from "@/lib/youtube";

function getMainCourse() {
  return Object.values(COURSE_DETAILS)[0];
}

function formatCurrencyBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function CoursePreviewSection() {
  const course = getMainCourse();
  const embedUrl = course.videoUrl ? toYouTubeEmbedUrl(course.videoUrl) : null;

  return (
    <section
      id="cursos"
      aria-labelledby="course-preview-title"
      className="bg-brand-beige py-24"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <Badge className="mb-4 border-none bg-[#D1FAE5] px-4 py-1 text-xs font-bold uppercase tracking-wide text-[#065F46]">
            Nossos Cursos
          </Badge>

          <h2
            id="course-preview-title"
            className="mb-2 text-3xl font-black tracking-tight text-brand-black md:text-5xl"
          >
            Escolha o Curso Ideal Para Você
          </h2>
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
          <div className="w-full">
            <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-[2rem] bg-black shadow-xl">
              {embedUrl ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={embedUrl}
                  title={`Prévia do curso: ${course.title}`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <>
                  <Image
                    src={course.videoThumb || course.image}
                    alt={`Prévia do curso ${course.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 860px"
                    className="object-cover"
                    priority
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-6 text-center text-white">
                    <PlayCircle className="mb-4 h-14 w-14" aria-hidden="true" />

                    <p className="text-sm font-black uppercase tracking-[0.18em]">
                      Vídeo de prévia em breve
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <Card className="mx-auto w-full max-w-[380px] rounded-[2rem] border-none bg-white shadow-xl">
            <CardContent className="p-6 md:p-8">
              <Badge className="mb-5 border-none bg-brand-turquoise font-black uppercase tracking-wide text-white">
                Prévia do curso
              </Badge>

              <h3 className="mb-4 text-3xl font-black leading-tight text-brand-black md:text-4xl">
                {course.title}
              </h3>

              <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-bold text-gray-500">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{course.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" aria-hidden="true" />
                  <span>{course.instructor}</span>
                </div>
              </div>

              <div className="mb-6 border-y border-gray-100 py-6">
                {course.oldPrice ? (
                  <p className="mb-1 text-sm font-bold text-gray-400 line-through">
                    {formatCurrencyBRL(course.oldPrice)}
                  </p>
                ) : null}

                <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
                  <p className="text-4xl font-black text-brand-turquoise">
                    {formatCurrencyBRL(course.price)}
                  </p>

                  <p className="pb-1 text-xs font-bold uppercase tracking-[0.08em] text-gray-400">
                    {course.installments}
                  </p>
                </div>
              </div>

              <div className="mb-7 space-y-3">
                {course.features.slice(0, 3).map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3">
                    <feature.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-turquoise" />

                    <div>
                      <p className="text-sm font-black text-brand-black">
                        {feature.title}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-500">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                className="h-12 w-full bg-brand-turquoise font-black uppercase tracking-wide text-white hover:bg-[#258E90]"
                asChild
              >
                <a
                  href={course.checkoutLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-allow-interaction="true"
                  aria-label={`Comprar o curso ${course.title}`}
                >
                  Comprar agora
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
