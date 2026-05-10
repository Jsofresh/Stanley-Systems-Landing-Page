"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

const slides = [
  {
    src: "/images/pain-agitation/phone-rang-nobody-caught-it.png",
    alt: "A missed customer call becomes a job won by another service company.",
  },
  {
    src: "/images/pain-agitation/job-finishes-cash-weeks-later.png",
    alt: "A completed job gets invoiced late and payment arrives weeks later.",
  },
  {
    src: "/images/pain-agitation/estimate-sat-nobody-followed-up.png",
    alt: "An estimate is sent, no follow-up happens, and the customer moves to another company.",
  },
]

export function PainAgitationCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section
      className="scroll-mt-28 bg-white px-4 py-14 text-[#071D3A] sm:px-6 lg:px-8 lg:py-20"
      data-section="pain-agitation-carousel"
      data-nav-theme="light"
      aria-labelledby="pain-agitation-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
          <h2
            id="pain-agitation-heading"
            className="text-3xl font-extrabold tracking-[-0.03em] text-[#071D3A] sm:text-4xl lg:text-5xl"
          >
            You already know these moments.
          </h2>
        </div>

        <div className="relative -mx-4 max-w-none sm:mx-auto sm:max-w-6xl">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {slides.map((slide) => (
                <div className="min-w-0 flex-[0_0_100%] px-0 sm:px-3" key={slide.src}>
                  <div className="relative mx-auto aspect-[1672/941] w-full overflow-hidden bg-white">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={slide.src.includes("phone-rang")}
                      sizes="(min-width: 1280px) 1152px, (min-width: 768px) 92vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#D8E4DD] bg-white text-[#071D3A] transition hover:border-[#28B463] hover:bg-[#F5FBF7] hover:text-[#28B463] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#28B463]/25 lg:flex"
            aria-label="Show previous pain point image"
          >
            <ChevronLeft className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 hidden h-16 w-16 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#D8E4DD] bg-white text-[#071D3A] transition hover:border-[#28B463] hover:bg-[#F5FBF7] hover:text-[#28B463] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#28B463]/25 lg:flex"
            aria-label="Show next pain point image"
          >
            <ChevronRight className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
          <button
            type="button"
            onClick={scrollPrev}
            className="flex h-14 w-20 items-center justify-center rounded-full border-2 border-[#D8E4DD] bg-white text-[#071D3A] transition hover:border-[#28B463] hover:bg-[#F5FBF7] hover:text-[#28B463] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#28B463]/25"
            aria-label="Show previous pain point image"
          >
            <ChevronLeft className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2" aria-label={`Slide ${selectedIndex + 1} of ${slides.length}`}>
            {slides.map((slide, index) => (
              <span
                key={slide.src}
                className={`h-2 rounded-full transition-all ${
                  selectedIndex === index ? "w-7 bg-[#28B463]" : "w-2 bg-[#C9D8D0]"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={scrollNext}
            className="flex h-14 w-20 items-center justify-center rounded-full border-2 border-[#D8E4DD] bg-white text-[#071D3A] transition hover:border-[#28B463] hover:bg-[#F5FBF7] hover:text-[#28B463] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#28B463]/25"
            aria-label="Show next pain point image"
          >
            <ChevronRight className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
