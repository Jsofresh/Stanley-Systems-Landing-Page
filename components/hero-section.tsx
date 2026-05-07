"use client"

import { useState } from "react"
import { ArrowRight, Calculator, ChevronDown, Menu, Phone } from "lucide-react"
import { CTALink } from "@/components/cta-link"

const headline = "make your business more money with less office work"
const subheadline = "Automate your customer to billing pipeline and guarantee repeat customers with Stanley Systems."

const heroVideos = [
  { webm: "/hero-videos/hero-video-1.webm", mp4: "/hero-videos/hero-video-1.mp4" },
  { webm: "/hero-videos/hero-video-2.webm", mp4: "/hero-videos/hero-video-2.mp4" },
]

const navGroups = ["Systems", "Industries", "Workflow Audit", "Resources"]

const logoLockups: Array<{ name: string; fontClass: string }> = [
  { name: "Nous Research",   fontClass: "font-[var(--font-manrope),system-ui,sans-serif]" },
  { name: "Housecall Pro",   fontClass: "font-[var(--font-nunito-sans),system-ui,sans-serif]" },
  { name: "QuickBooks",      fontClass: "font-[var(--font-work-sans),system-ui,sans-serif]" },
  { name: "Jobber",          fontClass: "font-[var(--font-manrope),system-ui,sans-serif]" },
  { name: "ServiceM8",       fontClass: "font-[var(--font-work-sans),system-ui,sans-serif]" },
  { name: "FieldPulse",      fontClass: "font-[var(--font-nunito-sans),system-ui,sans-serif]" },
  { name: "Service Fusion",  fontClass: "font-[var(--font-manrope),system-ui,sans-serif]" },
  { name: "Workiz",          fontClass: "font-[var(--font-work-sans),system-ui,sans-serif]" },
  { name: "CompanyCam",      fontClass: "font-[var(--font-nunito-sans),system-ui,sans-serif]" },
]

function HeroVideoLoop() {
  const [activeVideo, setActiveVideo] = useState(0)
  const video = heroVideos[activeVideo]

  return (
    <video
      key={video.webm}
      data-hero-video="true"
      poster="/hero-videos/hero-video-poster.jpg"
      autoPlay
      muted
      playsInline
      preload="auto"
      className="h-full w-full object-cover"
      onEnded={() => setActiveVideo((current) => (current + 1) % heroVideos.length)}
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  )
}

function DarkEnterpriseHeader() {
  return (
    <header className="relative z-30 border-b border-white/10 bg-[#071422]/92 text-white backdrop-blur">
      <div className="mx-auto flex h-10 max-w-[92rem] items-center justify-between px-4 text-[13px] font-semibold text-white/70 sm:px-6 lg:px-8">
        <a href="tel:+16179586372" className="inline-flex items-center gap-2 transition hover:text-white">
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          +1 (617) 958-6372
        </a>
        <div className="hidden items-center gap-5 md:flex">
          <a href="/invoicing-delay-cash-flow-calculator" className="transition hover:text-white">Calculator</a>
          <a href="/contact" className="transition hover:text-white">Contact</a>
        </div>
      </div>
      <div className="mx-auto flex h-[72px] max-w-[92rem] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-3" aria-label="Stanley Systems home">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white text-sm font-extrabold text-[#071422]">SS</span>
          <span>
            <span className="block text-[18px] font-extrabold leading-none tracking-[-0.02em]">Stanley Systems</span>
            <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#53d986]">Workflow Revenue Control</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <a key={group} href={group === "Workflow Audit" ? "#audit" : group === "Systems" ? "/systems" : "#"} className="inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-bold text-white/78 transition hover:bg-white/8 hover:text-white">
              {group}
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <CTALink
            href="#audit"
            kind="systems"
            location="hero_nav_audit"
            ctaLabel="Book the Workflow Audit"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#16883d] px-5 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(22,136,61,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0f7131]"
          >
            Book the Workflow Audit
          </CTALink>
        </div>
        <button type="button" className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}

export function HeroSection() {
  return (
    <section
      data-audit-page="/"
      data-audit-section="home.hero"
      data-audit-priority="5"
      data-audit-offer="Workflow Audit"
      data-audit-purpose="Make the owner understand that Stanley Systems helps make more money with less office work."
      className="relative isolate overflow-hidden bg-[#071422] text-white"
    >
      <DarkEnterpriseHeader />
      <div className="relative min-h-[690px] overflow-hidden md:min-h-[calc(100svh-112px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(19,147,78,0.28),transparent_34%),radial-gradient(circle_at_42%_10%,rgba(44,101,150,0.18),transparent_36%),linear-gradient(180deg,#071422_0%,#06101d_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[62%] bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.96)_34%,rgba(7,20,34,0.74)_54%,rgba(7,20,34,0)_100%)] md:block" />

        <div className="absolute right-[-3%] top-[1%] z-0 hidden h-[88%] w-[63%] overflow-hidden md:block">
          <div className="absolute inset-x-0 inset-y-[-6%] [mask-image:linear-gradient(90deg,transparent_0%,black_12%,black_84%,transparent_100%)]">
            <HeroVideoLoop />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.58)_8%,rgba(7,20,34,0.22)_18%,rgba(7,20,34,0)_30%),linear-gradient(0deg,#071422_0%,rgba(7,20,34,0.45)_8%,rgba(7,20,34,0)_22%,rgba(7,20,34,0)_78%,rgba(7,20,34,0.45)_94%,#071422_100%)]" />
        </div>

        <div className="relative z-20 mx-auto flex min-h-[570px] max-w-[92rem] items-center px-4 pb-28 pt-16 sm:px-6 lg:px-8">
          <div className="max-w-[38rem]">
            <h1
              aria-label="make your business more money with less office work"
              className="text-balance text-[3.1rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-[4.3rem] md:text-[3.25rem] lg:text-[3.65rem] xl:text-[3.95rem]"
            >
              <span className="md:hidden">{headline}</span>
              <span className="hidden whitespace-nowrap md:block">make your business more money</span>
              <span className="hidden whitespace-nowrap md:block">with less office work</span>
            </h1>
            <p className="mt-7 max-w-[640px] text-pretty text-lg font-semibold leading-8 tracking-[-0.01em] text-[#d3dce7] sm:text-xl">
              {subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTALink
                href="/invoicing-delay-cash-flow-calculator"
                kind="calculator"
                location="home_hero_primary"
                analyticsEvent="calculator_cta_clicked"
                analyticsSource="homepage_hero"
                ctaLabel="Find the Revenue Leaks"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#16883d] px-6 text-base font-extrabold text-white shadow-[0_18px_42px_rgba(22,136,61,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0f7131] focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-[#071422]"
              >
                <Calculator className="mr-2 h-4 w-4" aria-hidden="true" />
                Find the Revenue Leaks
              </CTALink>
              <CTALink
                href="#audit"
                kind="systems"
                location="home_hero_secondary"
                ctaLabel="Book the Workflow Audit"
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/18 bg-white/8 px-6 text-base font-extrabold text-white shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-[#071422]"
              >
                Book the Workflow Audit
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </CTALink>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#071422]/88 py-8 backdrop-blur">
          <div className="mx-auto flex max-w-[92rem] items-center gap-12 overflow-hidden px-4 [mask-image:linear-gradient(90deg,transparent_0%,black_8%,black_92%,transparent_100%)] sm:px-6 lg:px-8">
            {[...logoLockups, ...logoLockups].map((lockup, index) => (
              <span
                key={`${lockup.name}-${index}`}
                className={`shrink-0 text-[22px] font-extrabold tracking-[-0.04em] text-white/72 md:text-[26px] ${lockup.fontClass}`}
              >
                {lockup.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
