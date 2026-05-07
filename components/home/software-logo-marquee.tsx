type LogoLockup = {
  name: string
  markSrc: string
  source: "official-site" | "simple-icons" | "wikimedia"
  markClass?: string
  textClass?: string
}

const logos: LogoLockup[] = [
  {
    name: "ServiceTitan",
    markSrc: "/brand-logos/marks/servicetitan.ico",
    source: "official-site",
    textClass: "font-extrabold tracking-[-0.055em] [font-family:var(--font-manrope),Arial,sans-serif]",
  },
  {
    name: "Housecall Pro",
    markSrc: "/brand-logos/marks/housecall-pro.png",
    source: "official-site",
    textClass: "font-extrabold tracking-[-0.04em] [font-family:var(--font-manrope),Arial,sans-serif]",
  },
  {
    name: "QuickBooks",
    markSrc: "/brand-logos/marks/quickbooks-mark.svg",
    source: "simple-icons",
    textClass: "font-bold tracking-[-0.035em] [font-family:var(--font-nunito-sans),Arial,sans-serif]",
  },
  {
    name: "OpenAI",
    markSrc: "/brand-logos/marks/openai-mark.svg",
    source: "wikimedia",
    textClass: "font-semibold tracking-[-0.035em] [font-family:var(--font-manrope),Arial,sans-serif]",
  },
  {
    name: "Anthropic",
    markSrc: "/brand-logos/marks/anthropic-mark.svg",
    source: "simple-icons",
    textClass: "font-semibold tracking-[-0.04em] [font-family:Georgia,serif]",
  },
  {
    name: "Xero",
    markSrc: "/brand-logos/marks/xero-mark.svg",
    source: "simple-icons",
    textClass: "font-bold tracking-[-0.04em] [font-family:var(--font-nunito-sans),Arial,sans-serif]",
  },
  {
    name: "FreshBooks",
    markSrc: "/brand-logos/marks/freshbooks.svg",
    source: "official-site",
    textClass: "font-bold tracking-[-0.045em] [font-family:var(--font-manrope),Arial,sans-serif]",
  },
  {
    name: "Nous Research",
    markSrc: "/brand-logos/marks/nous-research.svg",
    source: "official-site",
    textClass: "font-bold tracking-[-0.035em] [font-family:var(--font-work-sans),Arial,sans-serif]",
  },
]

export const fallbackLogoNames: string[] = []
export const omittedLogoNames = ["FieldPulse", "Workiz", "FieldEdge", "Service Fusion", "Jobber", "ServiceM8", "Yardbook"]
export const logoSourceSummary = logos.map((logo) => `${logo.name}: ${logo.source}`)

function LogoGroup() {
  return (
    <div className="flex shrink-0 items-center gap-4 pr-4 md:gap-5 md:pr-5">
      {logos.map((logo) => (
        <div key={logo.name} className="flex h-10 shrink-0 items-center justify-center opacity-90 transition-opacity duration-300 md:h-12">
          <span className="flex items-center gap-1.5 md:gap-2">
            <img
              src={logo.markSrc}
              alt=""
              loading="eager"
              decoding="async"
              className={`h-6 w-6 shrink-0 object-contain brightness-0 invert grayscale md:h-7 md:w-7 ${logo.markClass ?? ""}`}
            />
            <span className={`whitespace-nowrap text-[1.4rem] leading-none text-white md:text-[1.68rem] ${logo.textClass ?? "font-bold"}`}>
              {logo.name}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

export function SoftwareLogoMarquee() {
  return (
    <div
      className="software-logo-marquee mx-auto w-full max-w-[92rem] overflow-hidden px-4 [mask-image:linear-gradient(90deg,transparent_0%,black_6%,black_94%,transparent_100%)] sm:px-6 lg:px-8"
      aria-label="Workflow platforms Stanley Systems can work around"
    >
      <div className="software-logo-marquee__track flex w-max items-center" aria-hidden="true">
        <LogoGroup />
        <LogoGroup />
      </div>
      <span className="sr-only">{logos.map((logo) => logo.name).join(", ")}</span>
    </div>
  )
}
