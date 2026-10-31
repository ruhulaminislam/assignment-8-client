"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function StudioGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const galleryImages =
    images.length === 1 ? [images[0], images[0]] : images;

  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-border">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {galleryImages.map((src, index) => (
  <CarouselItem key={`${src}-${index}`}>
    <Image
      src={src}
      alt={`${title} — image ${index + 1}`}
      width={1200}
      height={800}
      className="h-72 w-full object-cover sm:h-96"
    />
  </CarouselItem>
))}
        </CarouselContent>

        <CarouselPrevious className="left-4 border-0 bg-white/90 text-[#6D4AFF] shadow-md hover:bg-white hover:text-[#5A3BD9]" />

        <CarouselNext className="right-4 border-0 bg-white/90 text-[#6D4AFF] shadow-md hover:bg-white hover:text-[#5A3BD9]" />
      </Carousel>
    </div>
  );
}