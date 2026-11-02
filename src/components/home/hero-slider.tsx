"use client"

import Image from "next/image"
import { Camera, Music, Mic } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import * as React from "react"
import Link from "next/link"


const slides = [
  {
    image: "/image/hero/kobu-agency-O8AtzoQcnY4-unsplash.jpg",
    tag: "Photography Studios",
    title: "Capture Your Perfect Shot",
    description:
      "Book light-filled photography studios equipped for portraits, products, and everything in between.",
    icon: Camera,
  },
  {
    image: "/image/hero/studio-lego-EYQ6vraGu_I-unsplash.jpg",
    tag: "Music Studios",
    title: "Create Without Limits",
    description:
      "Record in professional, soundproofed music studios built for artists, producers, and engineers.",
    icon: Music,
  },
  {
    image: "/image/hero/rodrigo-rodrigues-wolf-r-t-XlKnIuk85y8-unsplash.jpg",
    tag: "Podcast Studios",
    title: "Amplify Your Voice",
    description:
      "Go live from ready-to-use podcast studios with premium mics, acoustics, and streaming gear.",
    icon: Mic,
  },
]

export function HeroSlider() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    return () => {
      api?.off("select", onSelect)
    }
  }, [api])

  return (
    <section className="relative w-full">
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.image}>
              <div className="relative h-[520px] w-full overflow-hidden rounded-2xl md:h-[560px] lg:h-[620px]">
                <Image
                  src={slide.image}
                  alt={slide.tag}
                  fill
                  priority={slide === slides[0]}
                  className="object-cover"
                  sizes="100vw"
                />
                {/* Brand-tinted dark overlay for text legibility */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-[#6D4AFF]/15 mix-blend-multiply"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex h-full items-center">
                  <div className="max-w-2xl px-6 sm:px-10 lg:px-16">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                      <slide.icon
                        className="size-4 text-[#F4A340]"
                        aria-hidden="true"
                      />
                      {slide.tag}
                    </span>

                    <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
                      {slide.description}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                      <Button
                        className="bg-[#6D4AFF] text-white hover:bg-[#5A3BD9]"
                        size="lg"
                      >
                        <Link href="/studios/All-studios">Explore Studios</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white/40 bg-white/10 text-white backdrop-blur-md hover:border-white hover:bg-white/20 hover:text-white"
                      >
                        Host Your Space
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Arrows */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <button
          type="button"
          onClick={() => api?.scrollPrev()}
          aria-label="Previous slide"
          className="pointer-events-auto absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-[#6D4AFF] hover:text-white sm:left-6"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => api?.scrollNext()}
          aria-label="Next slide"
          className="pointer-events-auto absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-[#6D4AFF] hover:text-white sm:right-6"
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Pagination dots */}
      <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-2.5">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              current === index
                ? "w-8 bg-[#6D4AFF]"
                : "w-2 bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </section>
  )
}
