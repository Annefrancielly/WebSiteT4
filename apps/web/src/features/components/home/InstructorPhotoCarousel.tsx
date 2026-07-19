"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/features/components/ui/button";
import { withBasePath } from "@/lib/paths";

type InstructorPhoto = {
  id: number;
  src: string;
  alt: string;
};

const INSTRUCTOR_PHOTOS: InstructorPhoto[] = [
  {
    id: 1,
    src: withBasePath("/instrutor.jpg"),
    alt: "Ricardo Torquato, instrutor do Método T4",
  },
  {
    id: 2,
    src: withBasePath("/Ricardo/Ricardo2.JPG"),
    alt: "Ricardo Torquato durante aula de surf",
  },
  {
    id: 3,
    src: withBasePath("/Ricardo/Ricardo3.JPG"),
    alt: "Ricardo Torquato orientando aluno no surf",
  },
  {
    id: 4,
    src: withBasePath("/Ricardo/Ricardo4.JPG"),
    alt: "Ricardo Torquato surfando",
  },
  {
    id: 5,
    src: withBasePath("/Ricardo/Ricardo5.JPG"),
    alt: "Ricardo Torquato orientando aluno no surf",
  },
  {
    id: 6,
    src: withBasePath("/Ricardo/Ricardo6.JPG"),
    alt: "Ricardo Torquato orientando aluno no surf",
  },
  {
    id: 7,
    src: withBasePath("/Ricardo/Ricardo7.JPG"),
    alt: "Ricardo Torquato orientando aluno no surf",
  }
];

export function InstructorPhotoCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const currentPhoto = INSTRUCTOR_PHOTOS[currentIndex];
  const hasMultiplePhotos = INSTRUCTOR_PHOTOS.length > 1;

  function goToPrevious() {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? INSTRUCTOR_PHOTOS.length - 1 : previousIndex - 1
    );
  }

  function goToNext() {
    setCurrentIndex((previousIndex) =>
      previousIndex === INSTRUCTOR_PHOTOS.length - 1 ? 0 : previousIndex + 1
    );
  }

  function goToPhoto(index: number) {
    setCurrentIndex(index);
  }

  return (
    <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl bg-gray-200 shadow-2xl">
      <div className="relative h-full w-full">
        <Image
          key={currentPhoto.id}
          src={currentPhoto.src}
          alt={currentPhoto.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={95}
          priority={currentIndex === 0}
        />

        {hasMultiplePhotos ? (
          <>
            <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                aria-label="Ver foto anterior do instrutor"
                className="h-10 w-10 rounded-full border-white/60 bg-white/85 text-brand-black shadow-md backdrop-blur-sm hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={goToNext}
                aria-label="Ver próxima foto do instrutor"
                className="h-10 w-10 rounded-full border-white/60 bg-white/85 text-brand-black shadow-md backdrop-blur-sm hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
              {INSTRUCTOR_PHOTOS.map((photo, index) => {
                const isActive = index === currentIndex;

                return (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => goToPhoto(index)}
                    aria-label={`Ver foto ${index + 1} do instrutor`}
                    aria-current={isActive ? "true" : undefined}
                    className={[
                      "h-2.5 rounded-full transition-all duration-200",
                      isActive
                        ? "w-8 bg-brand-orange"
                        : "w-2.5 bg-white/70 hover:bg-white",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
