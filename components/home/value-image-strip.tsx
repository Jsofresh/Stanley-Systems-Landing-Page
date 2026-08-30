import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type ImageFeatureProps = {
  src: string
  alt: string
  title: string
  body: string
  ctaHref: string
  ctaLabel: string
  align?: "left" | "right"
}

export function ImageFeature({
  src,
  alt,
  title,
  body,
  ctaHref,
  ctaLabel,
  align = "left",
}: ImageFeatureProps) {
  const rightAligned = align === "right"

  return (
    <section
      data-nav-theme="dark"
      className="relative isolate flex min-h-[76svh] items-end overflow-hidden bg-[#071422] px-5 py-16 text-white sm:min-h-[82svh] md:items-center md:px-8 md:py-24 lg:px-10"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className={`-z-30 object-cover ${rightAligned ? "object-[38%_center] md:object-center" : "object-[62%_center] md:object-center"}`}
      />
      <div
        className={`absolute inset-0 -z-20 ${
          rightAligned
            ? "bg-[linear-gradient(90deg,rgba(7,20,34,.18)_0%,rgba(7,20,34,.7)_54%,#071422_100%),linear-gradient(0deg,#071422_0%,transparent_55%)]"
            : "bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,.78)_44%,rgba(7,20,34,.14)_100%),linear-gradient(0deg,#071422_0%,transparent_55%)]"
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#071422] to-transparent md:hidden" />

      <div className="mx-auto w-full max-w-[88rem]">
        <div className={`max-w-[660px] ${rightAligned ? "md:ml-auto" : ""}`}>
          <h2 className="text-balance text-[clamp(2.85rem,6vw,5.6rem)] font-extrabold leading-[.9] tracking-[-.045em]">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-white/76">{body}</p>
          <Link
            href={ctaHref}
            className="mt-7 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#15803D] px-7 font-extrabold text-white shadow-[0_18px_46px_rgba(21,128,61,.28)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
          >
            {ctaLabel}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
