import Image from "next/image";
import { PlayCircle } from "lucide-react";

import { COURSE_DETAILS } from "@/constants/site-data";
import { toYouTubeEmbedUrl } from "@/lib/youtube";

function getMainCourse() {
  return Object.values(COURSE_DETAILS)[0];
}

/**
 * Vídeo de apresentação do método.
 *
 * O cabeçalho próprio ("Nossos Cursos" + "Escolha o Curso Ideal Para Você")
 * saiu: ele repetia a chamada da vitrine logo abaixo e trazia uma badge com
 * verde escrito à mão, fora da paleta da marca. A promessa da página continua
 * no banner do topo, e o convite de escolha vive na vitrine.
 *
 * A âncora #cursos migrou para a vitrine, que é onde a oferta realmente está.
 */
export function CoursePreviewSection() {
  const course = getMainCourse();
  const embedUrl = course.videoUrl ? toYouTubeEmbedUrl(course.videoUrl) : null;

  return (
    <section
      aria-label="Vídeo de apresentação do Método T4"
      className="bg-brand-beige pt-12 pb-8 md:pt-16"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-black shadow-xl">
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
                  sizes="(max-width: 1024px) 100vw, 1024px"
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
      </div>
    </section>
  );
}
