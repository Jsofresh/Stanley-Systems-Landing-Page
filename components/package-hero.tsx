import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export type PackageHeroCard = {
  label: string
  detail?: string
}

type PackageHeroProps = {
  eyebrow: string
  title: string
  subheading: string
  imageSrc: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  cards: PackageHeroCard[]
  primaryHref: string
  primaryLabel: string
  secondaryHref?: string
  secondaryLabel?: string
  children?: ReactNode
  objectPosition?: string
}

const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_42px_rgba(21,128,61,0.24)] transition hover:-translate-y-0.5 hover:bg-[#116832] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFCF7]"
const textButton = "inline-flex min-h-12 items-center justify-center rounded-full px-2 text-sm font-extrabold text-[#116832] underline decoration-[#9ed9b2] underline-offset-4 transition hover:text-[#071D3A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFCF7]"

export function PackageHero({
  eyebrow,
  title,
  subheading,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  cards,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  children,
  objectPosition = "center",
}: PackageHeroProps) {
  return (
    <section
      data-section="package-hero"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#FBFCF7] px-4 pb-12 pt-[7.5rem] text-[#071D3A] sm:px-6 sm:pb-16 lg:px-8 lg:pt-[8rem]"
    >
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_18%,rgba(83,217,134,0.18),transparent_30%),linear-gradient(115deg,#FBFCF7_0%,#FBFCF7_45%,#F4FBF5_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[66%] bg-[linear-gradient(90deg,#FBFCF7_0%,rgba(251,252,247,0.96)_52%,rgba(251,252,247,0.64)_74%,rgba(251,252,247,0)_100%)] lg:block" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10 max-w-[760px]">
          <p className="mb-4 inline-flex rounded-full border border-[#cfe8d5] bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#116832] shadow-[0_10px_24px_rgba(7,29,58,0.05)]">
            {eyebrow}
          </p>
          <h1 className="text-balance text-[2.25rem] font-semibold leading-[0.96] tracking-[-0.045em] text-[#071D3A] sm:text-[3.2rem] lg:text-[4rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-[#334B60] sm:text-xl">
            {subheading}
          </p>
          {children}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={primaryHref} className={greenButton}>
              {primaryLabel} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link href={secondaryHref} className={textButton}>
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[2.2rem] border border-[#d8eadf] bg-white shadow-[0_30px_90px_rgba(7,29,58,0.13)] sm:min-h-[470px] lg:min-h-[620px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(251,252,247,0.58)_0%,rgba(251,252,247,0.24)_28%,rgba(251,252,247,0.02)_58%),linear-gradient(180deg,rgba(251,252,247,0.12)_0%,rgba(251,252,247,0)_40%,rgba(7,29,58,0.18)_100%)]" />
          <div className="pointer-events-none absolute -left-1 top-0 hidden h-full w-[18%] bg-gradient-to-r from-[#FBFCF7] to-transparent lg:block" />

          <div className="absolute inset-x-4 bottom-4 grid gap-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[min(360px,58%)]">
            {cards.map((card, index) => (
              <div
                key={card.label}
                className={`${index > 1 ? "hidden sm:flex" : "flex"} items-start gap-3 rounded-[1.1rem] border border-white/70 bg-white/92 p-3 shadow-[0_16px_38px_rgba(7,29,58,0.14)] backdrop-blur-md`}
              >
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8F7ED] text-[#15803D]">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-extrabold leading-5 text-[#071D3A]">{card.label}</span>
                  {card.detail ? <span className="mt-0.5 block text-xs font-semibold leading-5 text-[#536173]">{card.detail}</span> : null}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
