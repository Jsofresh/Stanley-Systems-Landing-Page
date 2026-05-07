type LogoLockup = {
  name: string
  markSrc: string
  source: "official-site" | "simple-icons"
  markClass?: string
  textClass?: string
}

const logos: LogoLockup[] = [
  { name: "ServiceTitan", markSrc: "/brand-logos/marks/servicetitan.ico", source: "official-site", textClass: "tracking-[-0.075em]" },
  { name: "Housecall Pro", markSrc: "/brand-logos/marks/housecall-pro.png", source: "official-site", textClass: "tracking-[-0.065em]" },
  { name: "QuickBooks", markSrc: "/brand-logos/marks/quickbooks-mark.svg", source: "simple-icons", textClass: "tracking-[-0.07em]" },
  { name: "FieldPulse", markSrc: "/brand-logos/marks/fieldpulse.png", source: "official-site", markClass: "scale-110", textClass: "tracking-[-0.07em]" },
  { name: "Service Fusion", markSrc: "/brand-logos/marks/service-fusion.png", source: "official-site", textClass: "tracking-[-0.075em]" },
  { name: "Workiz", markSrc: "/brand-logos/marks/workiz.png", source: "official-site", textClass: "tracking-[-0.08em]" },
  { name: "FieldEdge", markSrc: "/brand-logos/marks/fieldedge.png", source: "official-site", textClass: "tracking-[-0.075em]" },
  { name: "Xero", markSrc: "/brand-logos/marks/xero-mark.svg", source: "simple-icons", textClass: "tracking-[-0.075em]" },
  { name: "FreshBooks", markSrc: "/brand-logos/marks/freshbooks.svg", source: "official-site", textClass: "tracking-[-0.075em]" },
  { name: "Nous Research", markSrc: "/brand-logos/marks/nous-research.svg", source: "official-site", textClass: "tracking-[-0.065em]" },
  { name: "Anthropic", markSrc: "/brand-logos/marks/anthropic-mark.svg", source: "simple-icons", textClass: "tracking-[-0.065em]" },
]

export const fallbackLogoNames: string[] = []
export const logoSourceSummary = logos.map((logo) => `${logo.name}: ${logo.source}`)

export function SoftwareLogoMarquee() {
  const repeatedLogos = [...logos, ...logos]

  return (
    <div
      className="software-logo-marquee group mx-auto w-full max-w-[92rem] overflow-hidden px-4 [mask-image:linear-gradient(90deg,transparent_0%,black_6%,black_94%,transparent_100%)] sm:px-6 lg:px-8"
      aria-label="Workflow platforms Stanley Systems can work around"
    >
      <div className="software-logo-marquee__track flex w-max items-center gap-6 pl-16 md:gap-8 md:pl-20" aria-hidden="true">
        {repeatedLogos.map((logo, index) => (
          <div key={`${logo.name}-${index}`} className="flex h-16 shrink-0 items-center justify-center opacity-92 transition-opacity duration-300 group-hover:opacity-100 md:h-[4.85rem]">
            <span className="flex items-center gap-2.5 md:gap-3">
              <img
                src={logo.markSrc}
                alt=""
                loading="eager"
                decoding="async"
                className={`h-9 w-9 shrink-0 object-contain brightness-0 invert grayscale md:h-11 md:w-11 ${logo.markClass ?? ""}`}
              />
              <span className={`whitespace-nowrap text-[2.15rem] font-black leading-none text-white md:text-[2.58rem] ${logo.textClass ?? ""}`}>
                {logo.name}
              </span>
            </span>
          </div>
        ))}
      </div>
      <span className="sr-only">{logos.map((logo) => logo.name).join(", ")}</span>
    </div>
  )
}
