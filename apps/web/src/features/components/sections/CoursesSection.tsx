'use client';

import * as React from 'react';
import Image from 'next/image';
import { Star, Clock, User } from 'lucide-react';

import { Button } from '@/features/components/ui/button';
import { Badge } from '@/features/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/features/components/ui/card';
import { COURSE_DETAILS } from '@/constants/site-data';

function toYouTubeEmbedUrl(input: string) {
  try {
    const u = new URL(input);

    if (u.hostname === 'youtu.be') {
      const id = u.pathname.replace('/', '');
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : input;
    }

    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube-nocookie.com/embed/${v}`;

      const shortsMatch = u.pathname.match(/\/shorts\/([^/]+)/);
      if (shortsMatch?.[1]) {
        return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`;
      }

      const embedMatch = u.pathname.match(/\/embed\/([^/]+)/);
      if (embedMatch?.[1]) {
        return `https://www.youtube-nocookie.com/embed/${embedMatch[1]}`;
      }
    }
  } catch {
    // ignore
  }

  return input;
}

export function CoursesSection() {
  const courses = Object.values(COURSE_DETAILS);

  return (
    <section id="cursos" className="bg-brand-beige py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <Badge className="mb-4 border-none bg-[#D1FAE5] px-4 py-1 text-xs font-bold uppercase tracking-wide text-[#065F46]">
            Nossos Cursos
          </Badge>

          <h2 className="mb-2 text-3xl font-black tracking-tight text-brand-black md:text-5xl">
            Escolha o Curso Ideal Para Você
          </h2>
        </div>

        <div className="grid justify-center gap-8 [grid-template-columns:repeat(auto-fit,minmax(320px,560px))]">
          {courses.map((course) => {
            const hasVideo = Boolean(course.videoUrl && course.videoUrl.trim().length > 0);

            const embedBase = hasVideo ? toYouTubeEmbedUrl(course.videoUrl!) : '';
            const src = hasVideo ? `${embedBase}?rel=0&modestbranding=1&playsinline=1` : '';

            return (
              <Card
                key={course.slug}
                className="
                  relative top-0 flex h-full flex-col
                  overflow-hidden rounded-2xl border-none
                  bg-white py-0 gap-0
                  shadow-lg transition-all hover:-top-2 hover:shadow-2xl
                "
              >
                <div className="relative w-full bg-black">
                  <div className="pt-[56.25%]" />

                  <div className="absolute left-4 top-4 z-10">
                    <Badge className="border-none bg-brand-turquoise font-bold italic text-white">
                      {course.category}
                    </Badge>
                  </div>

                  {hasVideo ? (
                    <iframe
                      className="absolute inset-0 block h-full w-full"
                      src={src}
                      title={`Prévia do curso: ${course.title}`}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <Image
                      src={course.image}
                      alt={`Capa do curso ${course.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="absolute inset-0 object-cover"
                      priority
                    />
                  )}
                </div>

                <CardHeader className="pb-3 pt-7">
                  <div className="mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-base font-bold text-brand-black">
                      {course.rating} ({course.students})
                    </span>
                  </div>

                  <h3 className="text-3xl font-black leading-tight text-brand-black">
                    {course.title}
                  </h3>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="mb-5 text-base leading-relaxed text-gray-600">{course.subtitle}</p>

                  <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> {course.duration}
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" /> {course.instructor}
                    </div>
                  </div>

                  <div className="mb-5 space-y-4">
                    {course.features.slice(0, 3).map((f, idx) => (
                      <div key={`${course.slug}-feature-${idx}`} className="flex items-start gap-3">
                        <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-turquoise" />

                        <div className="leading-snug">
                          <p className="text-base font-bold text-brand-black">{f.title}</p>
                          <p className="text-sm text-gray-500">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {course.tags?.length ? (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {course.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={`${course.slug}-tag-${tag}`}
                          className="border-none bg-gray-100 text-[11px] font-bold uppercase tracking-wide text-gray-600"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  <div className="border-t pt-5">
                    <div className="flex items-start justify-between gap-10">
                    <div className="flex flex-1 flex-wrap items-end gap-x-3 gap-y-2 pr-6">
                        <span className="text-4xl font-black text-brand-turquoise">
                          R$ {course.price.toFixed(2).replace('.', ',')}
                        </span>

                        <p className="pb-2 text-xs font-bold uppercase tracking-[0.08em] text-gray-400">
                          {course.installments}
                        </p>
                      </div>

                      {course.offerBadge ? (
                        <Badge className="shrink-0 border-none bg-red-600 font-black text-white">
                          {course.offerBadge}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-6 pb-9">
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
                      COMPRAR AGORA
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}