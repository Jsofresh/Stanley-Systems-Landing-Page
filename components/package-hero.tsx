import Image from "next/image"
import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { ArrowRight } from "lucide-react"

export type PackageHeroCard = {
  label: string
  detail?: string
}

type PackageHeroProps = {
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
  contentAlign?: "left" | "center"
  objectPosition?: string
  mobileObjectPosition?: string
  imageClassName?: string
  imageTransform?: string
  mobileImageTransform?: string
}

const greenButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_42px_rgba(21,128,61,0.26)] transition hover:-translate-y-0.5 hover:bg-[#116832] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFCF7]"
const textButton = "inline-flex min-h-12 items-center justify-center rounded-full px-2 text-sm font-extrabold text-[#116832] underline decoration-[#9ed9b2] underline-offset-4 transition hover:text-[#071D3A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBFCF7]"

export function PackageHero({
  title,
  subheading,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  children,
  contentAlign = "left",
  objectPosition = "center",
  mobileObjectPosition,
  imageClassName = "",
  imageTransform,
  mobileImageTransform,
}: PackageHeroProps) {
  const isCentered = contentAlign === "center"

  const imageStyle = {
    "--package-hero-object-position": objectPosition,
    "--package-hero-object-position-mobile": mobileObjectPosition ?? objectPosition,
    "--package-hero-transform": imageTransform ?? "none",
    "--package-hero-transform-mobile": mobileImageTransform ?? imageTransform ?? "none",
  } as CSSProperties

  return (
    <section
      data-section="package-hero"
      className="relative isolate flex min-h-[720px] overflow-hidden bg-[#FBFCF7] px-4 pb-10 pt-[7.25rem] text-[#071D3A] sm:px-6 sm:pb-14 lg:px-8 lg:pt-[8rem]"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        priority
        sizes="100vw"
        className={`absolute inset-0 -z-30 h-full w-full object-cover [object-position:var(--package-hero-object-position-mobile)] [transform:var(--package-hero-transform-mobile)] sm:[object-position:var(--package-hero-object-position)] sm:[transform:var(--package-hero-transform)] ${imageClassName}`}
        style={imageStyle}
      />

      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,#FBFCF7_0%,rgba(251,252,247,0.99)_18%,rgba(251,252,247,0.90)_34%,rgba(251,252,247,0.58)_50%,rgba(251,252,247,0.22)_66%,rgba(251,252,247,0)_82%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_48%,rgba(251,252,247,0.98)_0%,rgba(251,252,247,0.82)_23%,rgba(251,252,247,0.20)_47%,rgba(251,252,247,0)_68%),linear-gradient(180deg,rgba(251,252,247,0.36)_0%,rgba(251,252,247,0)_30%,rgba(7,29,58,0.10)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_82%_18%,rgba(83,217,134,0.08),transparent_34%),radial-gradient(circle_at_88%_78%,rgba(7,29,58,0.12),transparent_36%)] mix-blend-multiply"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(720px-9rem)] w-full max-w-7xl items-center py-8 sm:py-10 lg:min-h-[calc(720px-10rem)] lg:py-14">
        <div className={isCentered ? "mx-auto max-w-[820px] text-center" : "max-w-[610px]"}>
          <h1 className="text-balance text-[2.55rem] font-semibold leading-[0.93] tracking-[-0.052em] text-[#071D3A] drop-shadow-[0_1px_0_rgba(255,255,255,0.42)] sm:text-[3.8rem] lg:text-[5rem]">
            {title}
          </h1>
          <p className={isCentered ? "mx-auto mt-5 max-w-[680px] text-lg font-semibold leading-8 text-[#2d4052] sm:text-xl" : "mt-5 max-w-[580px] text-lg font-semibold leading-8 text-[#2d4052] sm:text-xl"}>
            {subheading}
          </p>
          {children}
          <div className={isCentered ? "mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap" : "mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"}>
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
      </div>
    </section>
  )
}
