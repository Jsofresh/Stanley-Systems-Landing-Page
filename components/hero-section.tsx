"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Calculator, ChevronDown, Menu, Phone, X } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { SoftwareLogoMarquee } from "@/components/home/software-logo-marquee"

const headline = "Make Your Business More Money With Less Office Work"
const subheadline = "Move finished work into cash faster, keep repeat revenue from slipping, and give the owner fewer office hours to carry."

const heroVideos = [
  { webm: "/hero-videos/hero-video-1.webm", mp4: "/hero-videos/hero-video-1.mp4" },
  { webm: "/hero-videos/hero-video-2.webm", mp4: "/hero-videos/hero-video-2.mp4" },
]

type MegaMenuItem = {
  label: string
  href: string
  description: string
}

type MegaMenuGroup = {
  label: string
  href: string
  eyebrow: string
  summary: string
  items: MegaMenuItem[]
  featured: {
    title: string
    copy: string
    href: string
    cta: string
  }
}

const navGroups: MegaMenuGroup[] = [
  {
    label: "Systems",
    href: "/systems",
    eyebrow: "Revenue systems",
    summary: "Choose the build by the leak: cash stuck in handoffs or repeat revenue slipping after the job.",
    items: [
      { label: "Cashflow Control System", href: "/systems/cashflow-control", description: "Finished work moves toward invoice, payment, and owner visibility with fewer manual checks." },
      { label: "Repeat Revenue System", href: "/systems/repeat-revenue", description: "Past customers, reviews, referrals, and missed calls stay in motion instead of going stale." },
      { label: "Both Systems", href: "/pricing", description: "Fix cash movement and repeat revenue together when both leaks are costing money." },
    ],
    featured: {
      title: "Find the leak that pays back first.",
      copy: "The Workflow Audit shows which system should move first so the office stops guessing.",
      href: "/invoicing-delay-cash-flow-calculator",
      cta: "Find the Revenue Leaks",
    },
  },
  {
    label: "Industries",
    href: "/who-stanley-systems-helps",
    eyebrow: "Service businesses",
    summary: "Built for owner-led shops where office work, billing lag, and follow-up gaps quietly tax growth.",
    items: [
      { label: "Home service", href: "/who-stanley-systems-helps", description: "Keep jobs, invoices, reminders, and repeat customers from falling between tools." },
      { label: "Field service", href: "/who-stanley-systems-helps", description: "Turn dispatch, job notes, billing, and customer follow-up into a cleaner operating path." },
      { label: "Trade businesses", href: "/who-stanley-systems-helps", description: "Reduce owner cleanup when the team already has work but the office process leaks cash." },
    ],
    featured: {
      title: "If your team is busy, the leak is usually the handoff.",
      copy: "Stanley Systems fixes the revenue path around the software you already use.",
      href: "#audit",
      cta: "Book the Workflow Audit",
    },
  },
  {
    label: "Workflow Audit",
    href: "#audit",
    eyebrow: "First move",
    summary: "A focused business audit to find where money, time, and follow-up are getting trapped.",
    items: [
      { label: "Cash movement map", href: "#audit", description: "See where finished work slows before it becomes collected cash." },
      { label: "Office-hour drain", href: "#audit", description: "Find the repeated checks, retyping, reminders, and owner follow-up costing time." },
      { label: "Build recommendation", href: "#audit", description: "Leave with the clearest first system to buy, not a vague automation wish list." },
    ],
    featured: {
      title: "Stop buying software before you know the leak.",
      copy: "The audit points the build at cash movement, repeat revenue, or both.",
      href: "#audit",
      cta: "Book the Workflow Audit",
    },
  },
  {
    label: "Resources",
    href: "/blog",
    eyebrow: "Owner tools",
    summary: "Calculators and plain-English pages for finding revenue leaks before they become normal.",
    items: [
      { label: "Revenue leak calculator", href: "/invoicing-delay-cash-flow-calculator", description: "Estimate the cash and office-hour cost of delays inside the current workflow." },
      { label: "Stanley Systems case study", href: "/stanley-systems-case-study", description: "See how workflow gaps turn into cash, follow-up, and owner-time problems." },
      { label: "Blog", href: "/blog", description: "Practical notes on cashflow, repeat revenue, and service-business operations." },
    ],
    featured: {
      title: "Make the next move obvious.",
      copy: "Start with the calculator, then use the audit to turn the leak into a build plan.",
      href: "/invoicing-delay-cash-flow-calculator",
      cta: "Calculate the leak",
    },
  },
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
      className="h-full w-full object-cover saturate-[0.78] contrast-[1.04] brightness-[0.9]"
      onEnded={() => setActiveVideo((current) => (current + 1) % heroVideos.length)}
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  )
}

function DarkEnterpriseHeader() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState<string | null>(navGroups[0]?.label ?? null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuRegionRef = useRef<HTMLDivElement | null>(null)

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const openMenu = (label: string) => {
    clearCloseTimer()
    setActiveMenu(label)
  }

  const closeMenuWithDelay = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null)
        setMobileOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      clearCloseTimer()
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  const selectedMenu = navGroups.find((group) => group.label === activeMenu)

  return (
    <header className="relative z-30 border-b border-white/10 bg-[#071422]/94 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-10 max-w-[92rem] items-center justify-between px-4 text-[13px] font-semibold text-white/70 sm:px-6 lg:px-8">
        <a href="tel:+16179586372" className="inline-flex items-center gap-2 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]">
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          +1 (617) 958-6372
        </a>
        <div className="hidden items-center gap-5 md:flex">
          <a href="/invoicing-delay-cash-flow-calculator" className="transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]">Calculator</a>
          <a href="/contact" className="transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]">Contact</a>
        </div>
      </div>
      <div
        ref={menuRegionRef}
        className="relative"
        onMouseEnter={clearCloseTimer}
        onMouseLeave={closeMenuWithDelay}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            closeMenuWithDelay()
          }
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-[92rem] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]" aria-label="Stanley Systems home">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white shadow-[0_10px_26px_rgba(0,0,0,0.18)] sm:h-11 sm:w-11">
              <img src="/stanley-logo.svg" alt="" className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
            </span>
            <span>
              <span className="block text-[18px] font-extrabold leading-none tracking-[-0.025em] text-white sm:text-[19px]">Stanley Systems</span>
              <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#53d986] sm:text-[10px]">Workflow Revenue Control</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navGroups.map((group) => (
              <a
                key={group.label}
                href={group.href}
                aria-expanded={activeMenu === group.label}
                aria-haspopup="true"
                onMouseEnter={() => openMenu(group.label)}
                onFocus={() => openMenu(group.label)}
                onClick={() => openMenu(group.label)}
                className="inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-bold text-white/78 transition hover:bg-white/8 hover:text-white focus:bg-white/8 focus:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]"
              >
                {group.label}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeMenu === group.label ? "rotate-180" : ""}`} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <CTALink
              href="#audit"
              kind="systems"
              location="hero_nav_audit"
              ctaLabel="Book the Workflow Audit"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#62e89a]/45 bg-[#15803D] px-5 text-sm font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_30px_rgba(10,85,38,0.32)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#116f35] focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-[#071422]"
            >
              Book the Workflow Audit
            </CTALink>
          </div>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white transition hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986] lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {selectedMenu && (
          <div
            className="absolute left-0 right-0 top-[72px] hidden border-y border-white/10 bg-[#071422]/98 shadow-[0_28px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl lg:block"
            data-nav-menu={selectedMenu.label}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={closeMenuWithDelay}
          >
            <div className="mx-auto grid max-w-[92rem] grid-cols-[0.72fr_1.24fr_0.72fr] gap-8 px-8 py-8">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#53d986]">{selectedMenu.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-extrabold leading-[0.98] tracking-[-0.045em] text-white">{selectedMenu.label}</h2>
                <p className="mt-4 text-sm font-semibold leading-6 text-white/62">{selectedMenu.summary}</p>
              </div>
              <div className="grid gap-3">
                {selectedMenu.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition hover:-translate-y-0.5 hover:border-[#53d986]/35 hover:bg-white/[0.075] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]"
                  >
                    <span className="flex items-center justify-between gap-5 text-base font-extrabold tracking-[-0.01em] text-white">
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-[#53d986] transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                    <span className="mt-2 block text-sm font-semibold leading-6 text-white/60">{item.description}</span>
                  </a>
                ))}
              </div>
              <a
                href={selectedMenu.featured.href}
                className="flex min-h-full flex-col justify-between rounded-[1.65rem] border border-[#53d986]/24 bg-[linear-gradient(145deg,rgba(83,217,134,0.14),rgba(255,255,255,0.045)_48%,rgba(2,8,15,0.35))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:-translate-y-0.5 hover:border-[#53d986]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]"
              >
                <span>
                  <span className="text-xl font-extrabold leading-tight tracking-[-0.035em] text-white">{selectedMenu.featured.title}</span>
                  <span className="mt-3 block text-sm font-semibold leading-6 text-white/64">{selectedMenu.featured.copy}</span>
                </span>
                <span className="mt-8 inline-flex items-center text-sm font-extrabold text-[#7af0a8]">
                  {selectedMenu.featured.cta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#071422]/98 px-4 pb-5 pt-3 shadow-[0_24px_60px_rgba(0,0,0,0.34)] lg:hidden">
            <div className="space-y-2">
              {navGroups.map((group) => {
                const expanded = mobileMenu === group.label
                return (
                  <div key={group.label} className="rounded-2xl border border-white/10 bg-white/[0.045]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-extrabold text-white"
                      aria-expanded={expanded}
                      onClick={() => setMobileMenu(expanded ? null : group.label)}
                    >
                      {group.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                    {expanded && (
                      <div className="border-t border-white/10 px-4 pb-4 pt-2">
                        {group.items.map((item) => (
                          <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="block rounded-xl px-2 py-2.5 text-sm font-semibold text-white/72 hover:bg-white/8 hover:text-white">
                            <span className="block font-extrabold text-white">{item.label}</span>
                            <span className="mt-1 block leading-5 text-white/55">{item.description}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
              <CTALink
                href="#audit"
                kind="systems"
                location="hero_mobile_nav_audit"
                ctaLabel="Book the Workflow Audit"
                className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#62e89a]/45 bg-[#15803D] px-5 text-sm font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_30px_rgba(10,85,38,0.32)]"
              >
                Book the Workflow Audit
              </CTALink>
            </div>
          </div>
        )}
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
      <div className="relative min-h-[700px] overflow-hidden md:min-h-[calc(100svh-112px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_34%,rgba(83,217,134,0.14),transparent_31%),radial-gradient(circle_at_88%_4%,rgba(2,8,15,0.92),transparent_30%),linear-gradient(180deg,#071422_0%,#05101c_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[76%] bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.99)_32%,rgba(7,20,34,0.86)_56%,rgba(7,20,34,0.22)_82%,rgba(7,20,34,0)_100%)] md:block xl:w-[67%] xl:bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.98)_29%,rgba(7,20,34,0.78)_50%,rgba(7,20,34,0.16)_78%,rgba(7,20,34,0)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[28%] bg-[linear-gradient(0deg,#071422_0%,rgba(7,20,34,0.78)_28%,rgba(7,20,34,0)_100%)]" />

        <div className="absolute right-[-16%] top-0 z-0 hidden h-[91%] w-[56%] overflow-hidden md:block xl:right-[-4%] xl:w-[62%]">
          <div className="absolute inset-x-[-2%] inset-y-[-7%] [mask-image:linear-gradient(90deg,transparent_0%,black_14%,black_82%,transparent_100%)]">
            <HeroVideoLoop />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_10%,rgba(2,8,15,0.9),rgba(7,20,34,0.46)_34%,rgba(7,20,34,0)_58%),linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.76)_12%,rgba(7,20,34,0.28)_26%,rgba(7,20,34,0)_42%),linear-gradient(0deg,#071422_0%,rgba(7,20,34,0.58)_10%,rgba(7,20,34,0)_24%,rgba(7,20,34,0)_74%,rgba(7,20,34,0.62)_94%,#071422_100%)]" />
        </div>

        <div className="relative z-20 mx-auto flex min-h-[570px] max-w-[92rem] items-center px-4 pb-32 pt-16 sm:px-6 md:min-h-[calc(100svh-250px)] lg:px-8">
          <div className="max-w-[42rem] xl:max-w-[44rem]">
            <h1
              aria-label={headline}
              className="max-w-[700px] text-balance text-[clamp(1.72rem,7vw,2.42rem)] font-extrabold leading-[0.98] tracking-[-0.036em] text-white md:max-w-[720px] md:text-[clamp(1.85rem,2.47vw,2.76rem)]"
            >
              <span className="md:hidden">{headline}</span>
              <span className="hidden whitespace-nowrap md:block">Make Your Business More Money</span>
              <span className="hidden whitespace-nowrap md:block">With Less Office Work</span>
            </h1>
            <p className="mt-7 max-w-[590px] text-pretty text-lg font-semibold leading-8 tracking-[-0.01em] text-[#d3dce7] sm:text-xl">
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
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#15803D] px-6 text-base font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_42px_rgba(10,85,38,0.34)] transition hover:-translate-y-0.5 hover:bg-[#116f35] focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-[#071422]"
              >
                <Calculator className="mr-2 h-4 w-4" aria-hidden="true" />
                Find the Revenue Leaks
              </CTALink>
              <CTALink
                href="#audit"
                kind="systems"
                location="home_hero_secondary"
                ctaLabel="Book the Workflow Audit"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 text-base font-extrabold text-white shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-[#071422]"
              >
                Book the Workflow Audit
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </CTALink>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#071422]/92 py-2.5 backdrop-blur-xl md:py-3">
          <SoftwareLogoMarquee />
        </div>
      </div>
    </section>
  )
}
