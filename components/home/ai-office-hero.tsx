"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { HERO_EXPERIMENT_KEY, HERO_VARIANT_STORAGE_KEY, HERO_VARIANTS, readHeroVariant, type HeroLanguageVariant } from "@/lib/experiments/homepage-hero-language"
import { trackStanleyEvent } from "@/lib/posthog-attribution"

const desktopImages = [
  { src: "/images/uploaded/homepage/hero-slideshow/hero-tech-van-outside.jpg", position: "60% center" },
  { src: "/images/uploaded/homepage/hero-slideshow/hero-payment-confirmation-office.jpg", position: "center" },
  { src: "/images/uploaded/homepage/hero-slideshow/hero-tech-van-outside.jpg", position: "center" },
]

const mobileImages = [
  { src: "/images/uploaded/homepage/mobile-hero-slideshow/field-service-owner-by-van-with-tablet.jpg", position: "70% top" },
  { src: "/images/uploaded/homepage/mobile-hero-slideshow/service-owner-in-office-checking-payments.jpg", position: "65% top" },
]

export function AiOfficeHero() {
  const [variant, setVariant] = useState<HeroLanguageVariant>("message")

  useEffect(() => {
    const selected = readHeroVariant(window.location.search)
    setVariant(selected)
    try { window.localStorage.setItem(HERO_VARIANT_STORAGE_KEY, selected) } catch {}
    document.documentElement.dataset.heroVariant = selected
    trackStanleyEvent("hero_variant_viewed", { event_source: HERO_EXPERIMENT_KEY, hero_variant: selected })
  }, [])

  const copy = HERO_VARIANTS[variant]

  return (
    <section id="hero" data-audit-page="/" data-audit-section="home.hero" data-audit-purpose="Approved reference inspected before build: the previously approved full-bleed Stanley Systems hero preview. Canonical DESIGN.md research applied. Approved reference structure and pre-build design interpretation: preserve one full-bleed field-service photograph, a dark readability wash, oversized outcome-first type, brand-green emphasis, a visibly qualified capacity illustration, and two plain next-step CTAs. Keep the outcome and primary Admin Drag Calculator next step inside the first phone viewport. Show that Stanley Systems multiplies the current office team rather than replacing it." data-audit-offer="Admin Drag Calculator | AI Office Installation Sprint" data-nav-theme="dark" data-hero-variant={variant} className="relative isolate flex min-h-[100svh] items-start overflow-hidden bg-[#071422] px-5 pb-12 pt-[19rem] text-white sm:items-center sm:px-8 sm:py-28 lg:px-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[#071422]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden lg:hidden">
        {mobileImages.map((image, index) => <Image key={image.src} src={image.src} alt="" fill priority={index === 0} sizes="100vw" className="stanley-hero-slideshow-image stanley-hero-slideshow-image--mobile object-cover" style={{ animationDelay: `${index * 6}s`, objectPosition: image.position }} />)}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,.84)_48%,rgba(7,20,34,.22)_100%),linear-gradient(180deg,rgba(7,20,34,.28)_0%,rgba(7,20,34,.34)_32%,rgba(7,20,34,.9)_56%,#071422_100%)]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[72%] overflow-hidden lg:block">
        {desktopImages.map((image, index) => <Image key={`${image.src}-${index}`} src={image.src} alt="" fill priority={index === 0} sizes="72vw" className="stanley-hero-slideshow-image object-cover" style={{ animationDelay: `${index * 5}s`, objectPosition: image.position }} />)}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,.94)_20%,rgba(7,20,34,.55)_48%,rgba(7,20,34,.12)_75%,rgba(7,20,34,.4)_100%),linear-gradient(0deg,#071422_0%,transparent_30%)]" />
      </div>
      <div className="mx-auto w-full max-w-[96rem]">
        <div className="relative z-10 max-w-[1360px]">
          <h1 className="text-[clamp(3.35rem,7.35vw,6.65rem)] font-bold leading-[0.93] tracking-[-0.025em] lg:origin-left lg:text-[clamp(3.015rem,6.615vw,5.985rem)] lg:[transform:scaleX(1.025)]">
            <span className="block">Give your office team</span>
            <span className="block"><span className="text-[#53D986]">up to 520 hours back</span></span>
            <span className="block">every year.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-white/82 sm:mt-7 sm:text-xl sm:leading-relaxed lg:text-2xl">
            Stanley Systems installs AI office workflows around your current tools, so the same team processes more jobs, keeps cleaner records, and follows up faster.
          </p>
          <p className="mt-3 text-xs font-semibold leading-5 text-white/62 sm:text-sm">Illustration: 10 office hours per week × 52 weeks. Actual results vary by workflow.</p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <CTALink href="/ai-office-capacity-calculator" kind="systems" location="home_hero_primary" analyticsEvent="hero_primary_cta_clicked" analyticsSource={HERO_EXPERIMENT_KEY} ctaLabel={copy.cta} className="inline-flex min-h-[64px] items-center justify-center whitespace-nowrap rounded-full bg-[#15803D] px-9 py-[1.125rem] text-lg font-extrabold leading-none text-white shadow-[0_22px_52px_rgba(10,85,38,.4)] transition hover:-translate-y-1 hover:bg-[#116832] hover:shadow-[0_28px_64px_rgba(10,85,38,.5)] focus:outline-none focus:ring-2 focus:ring-[#53D986] focus:ring-offset-2 focus:ring-offset-[#071422]">{copy.cta}<ArrowRight className="ml-2 h-5 w-5 shrink-0" /></CTALink>
            <CTALink href="/systems-installation-sprint" kind="systems" location="home_hero_secondary" ctaLabel="View Installation Sprint" className="inline-flex min-h-[64px] items-center justify-center whitespace-nowrap rounded-full border border-white/25 bg-white/8 px-9 py-[1.125rem] text-lg font-extrabold leading-none text-white transition hover:-translate-y-1 hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-white">View Installation Sprint</CTALink>
          </div>
        </div>
      </div>
    </section>
  )
}
