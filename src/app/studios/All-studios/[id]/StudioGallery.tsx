"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/**
 * Gallery carousel.
 * Receives an array of image URLs — currently the studio has a single
 * `imageUrl`, so the page passes a one-item array. Add more URLs later
 * without changing this component.
 */
export function StudioGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-border">
      <Carousel>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${title} — image ${index + 1}`}
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
