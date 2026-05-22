"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react"
import { CTALink } from "@/components/cta-link"
import { SoftwareLogoMarquee } from "@/components/home/software-logo-marquee"

const headline = "Your service business is dropping money in places nobody checks."
const subheadline = "Missed calls. Late invoices. Forgotten follow-ups. Past customers nobody contacts again. Stanley Systems finds the leak and builds the system that stops it."

const heroVideoVersion = "manual-clock-20260507"
const heroVideo = {
  mp4: `/hero-videos/hero-video-1.mp4?v=${heroVideoVersion}`,
  webm: `/hero-videos/hero-video-1.webm?v=${heroVideoVersion}`,
  poster: `/hero-videos/hero-video-poster.jpg?v=${heroVideoVersion}`,
}

type MegaMenuItem = {
  label: string
  href: string
  description?: string
}

type MegaMenuGroup = {
  label: string
  href: string
  eyebrow: string
  summary: string
  widthClass: string
  columnsClass: string
  items: MegaMenuItem[]
  featured?: {
    title: string
    copy: string
    href: string
    cta: string
  }
}


const navGroups: MegaMenuGroup[] = [
  {
    label: "Systems",
    href: "/#systems",
    eyebrow: "Revenue Systems",
    summary: "Pick the system by the leak: cash stuck after the job, or customers slipping after the first sale.",
    widthClass: "w-[min(690px,calc(100vw-2rem))]",
    columnsClass: "grid-cols-[1fr_230px]",
    items: [
      { label: "Cashflow Control System", href: "/systems/cashflow-control", description: "Turn finished work into collected cash faster." },
      { label: "Repeat Revenue System", href: "/systems/repeat-revenue", description: "Bring back past customers, reviews, referrals, and missed calls." },
      { label: "Both Systems", href: "/systems/both-systems", description: "Buy both leak systems together." },
    ],
    featured: {
      title: "Not sure where money is stuck?",
      copy: "Start with the Cash Flow Assessment before buying a system.",
      href: "/workflow-audit",
      cta: "Start with the Cash Flow Assessment",
    },
  },
  {
    label: "Industries",
    href: "/who-stanley-systems-helps",
    eyebrow: "Built for service businesses",
    summary: "Clear paths for busy shops where office handoffs, follow-up, and billing leaks cost real money.",
    widthClass: "w-[min(620px,calc(100vw-2rem))]",
    columnsClass: "grid-cols-2",
    items: [
      { label: "HVAC", href: "/industries/hvac" },
      { label: "Plumbing", href: "/industries/plumbing" },
      { label: "Electrical", href: "/industries/electrical" },
      { label: "Marine", href: "/industries/marine" },
      { label: "Landscaping", href: "/industries/landscaping" },
      { label: "Roofing", href: "/industries/roofing" },
      { label: "General Contractors", href: "/industries/general-contractors" },
      { label: "Adjacent Service Businesses", href: "/industries/adjacent-service-businesses" },
    ],
    featured: {
      title: "Busy team, messy handoff?",
      copy: "Stanley Systems works around the tools your crews already use.",
      href: "/workflow-audit",
      cta: "Start the Cash Flow Assessment",
    },
  },
  {
    label: "Assessment",
    href: "/workflow-audit",
    eyebrow: "Find the fix list",
    summary: "The assessment finds the money leaks and shows what should be built first.",
    widthClass: "w-[min(460px,calc(100vw-2rem))]",
    columnsClass: "grid-cols-1",
    items: [
      { label: "Cash Flow Assessment", href: "/workflow-audit", description: "Get the full fix list before the build path." },
      { label: "Revenue Leak Calculator", href: "/invoicing-delay-cash-flow-calculator", description: "Run the numbers before the assessment." },
      { label: "How the assessment works", href: "/how-the-assessment-works", description: "See what gets checked before starting." },
    ],
  },
  {
    label: "Resources",
    href: "/blog",
    eyebrow: "Owner tools",
    summary: "Use these routes to find the leak, see the thinking, or contact Stanley Systems.",
    widthClass: "w-[min(440px,calc(100vw-2rem))]",
    columnsClass: "grid-cols-1",
    items: [
      { label: "Revenue Leak Calculator", href: "/invoicing-delay-cash-flow-calculator", description: "Estimate where cash and follow-up are slipping." },
      { label: "Case Notes", href: "/stanley-systems-case-study", description: "See how workflow gaps turn into owner-time problems." },
      { label: "Blog", href: "/blog", description: "Plain-English notes on cashflow and repeat revenue." },
      { label: "Contact", href: "/contact", description: "Send the workflow problem straight to Stanley Systems." },
    ],
  },
]

function HeroVideoLoop() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.loop = true
    video.playsInline = true
    video.preload = "auto"

    const playVideo = () => {
      const playPromise = video.play()
      if (playPromise) {
        playPromise.catch(() => {
          // Browser autoplay policy can defer playback; poster remains visible.
        })
      }
    }

    playVideo()
    document.addEventListener("visibilitychange", playVideo)
    window.addEventListener("focus", playVideo)
    window.addEventListener("pageshow", playVideo)

    return () => {
      document.removeEventListener("visibilitychange", playVideo)
      window.removeEventListener("focus", playVideo)
      window.removeEventListener("pageshow", playVideo)
    }
  }, [])

  return (
    <video
      key={heroVideoVersion}
      ref={videoRef}
      data-hero-video="true"
      data-hero-playback="native-loop"
      poster={heroVideo.poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      className="h-full w-full transform-gpu object-cover saturate-[0.82] contrast-[1.05] brightness-[0.92] will-change-transform"
    >
      <source src={heroVideo.mp4} type="video/mp4" />
      <source src={heroVideo.webm} type="video/webm" />
    </video>
  )
}

export function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState<string | null>(navGroups[0]?.label ?? null)
  const [scrolled, setScrolled] = useState(false)
  const [navTheme, setNavTheme] = useState<"dark" | "light">("dark")
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)

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
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null)
        setMobileOpen(false)
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      const header = headerRef.current
      if (header && !header.contains(event.target as Node)) {
        setActiveMenu(null)
        setMobileOpen(false)
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      clearCloseTimer()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"))
    if (!sections.length) return

    const headerOffset = () => Math.min(112, Math.max(82, headerRef.current?.offsetHeight ?? 100))
    let frame = 0

    const updateTheme = () => {
      frame = 0
      const probeY = headerOffset() + 12
      let current = sections[0]

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= probeY && rect.bottom > probeY) {
          current = section
          break
        }
        if (rect.top <= probeY) current = section
      }

      const theme = current.dataset.navTheme === "light" ? "light" : "dark"
      setNavTheme(theme)
    }

    const requestThemeUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTheme)
    }

    const observer = new IntersectionObserver(requestThemeUpdate, {
      root: null,
      rootMargin: `-${headerOffset()}px 0px -68% 0px`,
      threshold: [0, 0.08, 0.18, 0.35, 0.6, 1],
    })

    sections.forEach((section) => observer.observe(section))
    updateTheme()
    window.addEventListener("scroll", requestThemeUpdate, { passive: true })
    window.addEventListener("resize", requestThemeUpdate)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", requestThemeUpdate)
      window.removeEventListener("resize", requestThemeUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const selectedMenu = navGroups.find((group) => group.label === activeMenu)
  const isLight = navTheme === "light" && !mobileOpen
  const themeAttr = isLight ? "light" : "dark"
  const headerClasses = isLight
    ? "border-[#d9e7df] bg-[#fffdf8]/96 text-[#071D3A] shadow-[0_14px_34px_rgba(7,29,58,0.10)] backdrop-blur-xl"
    : scrolled || mobileOpen || activeMenu
      ? "border-[#d9efe2]/18 bg-[#071422]/96 text-white shadow-[0_16px_42px_rgba(2,8,15,0.28)] backdrop-blur-xl"
      : "border-white/10 bg-[#071422]/93 text-white backdrop-blur-md"
  const utilityClasses = isLight
    ? "border-[#e2ece5] bg-[#f7fbf2]/88 text-[#42596C]"
    : "border-white/8 bg-[#06111d]/72 text-white/76"
  const navLinkClasses = isLight
    ? "text-[#20384F] hover:bg-[#eaf6ee] hover:text-[#071D3A] focus:bg-[#eaf6ee] focus:text-[#071D3A]"
    : "text-white/82 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
  const menuButtonClasses = isLight
    ? "border-[#d6e5dc] text-[#071D3A] hover:bg-[#edf8f1]"
    : "border-white/15 text-white hover:bg-white/10"
  const brandTextClasses = isLight ? "text-[#071D3A]" : "text-[#f7fbff]"

  return (
    <header
      ref={headerRef}
      data-nav-theme-current={themeAttr}
      className={`fixed inset-x-0 top-0 z-[999] translate-y-0 border-b transition-[background-color,border-color,box-shadow,color,transform,opacity] duration-[220ms] ease-out ${headerClasses}`}
    >
      <div className={`border-b transition-colors duration-[220ms] ${utilityClasses}`}>
        <div className="mx-auto flex h-9 max-w-[92rem] items-center justify-between px-4 text-[12px] font-bold sm:px-6 lg:px-8">
          <a href="tel:+16179586372" className="inline-flex items-center gap-2 rounded-full transition hover:text-[#15803D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]">
            <Phone className="h-3.5 w-3.5 text-[#53d986]" aria-hidden="true" />
            <span>+1 (617) 958-6372</span>
          </a>
          <div className="hidden items-center gap-5 md:flex">
            <a href="/systems/cashflow-control" className="transition hover:text-[#15803D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]">Cashflow Control</a>
            <a href="/systems/repeat-revenue" className="transition hover:text-[#15803D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]">Repeat Revenue</a>
            <a href="/invoicing-delay-cash-flow-calculator" className="transition hover:text-[#15803D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]">Calculator</a>
            <a href="/contact" className="transition hover:text-[#15803D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986]">Contact</a>
          </div>
        </div>
      </div>
      <div
        className="relative"
        onMouseEnter={clearCloseTimer}
        onMouseLeave={closeMenuWithDelay}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            closeMenuWithDelay()
          }
        }}
      >
        <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="/" className="group -ml-1.5 inline-flex h-10 shrink-0 items-center rounded-xl pr-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071422] sm:-ml-2 lg:-ml-3" aria-label="Stanley Systems home">
            <span
              className={`whitespace-nowrap text-[19px] font-[700] leading-none tracking-[-0.045em] transition-colors duration-[220ms] sm:text-[20px] ${brandTextClasses}`}
              style={{ fontFamily: "var(--font-logo), var(--font-neue-montreal), sans-serif" }}
            >
              Stanley Systems
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
                className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986] xl:px-4 ${navLinkClasses}`}
              >
                {group.label}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeMenu === group.label ? "rotate-180" : ""}`} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <CTALink
              href="/workflow-audit"
              kind="systems"
              location="hero_nav_audit"
              ctaLabel="Start the Cash Flow Assessment"
              className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full border border-[#62e89a]/45 bg-[#15803D] px-3 text-[13px] font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_12px_24px_rgba(10,85,38,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#116f35] focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-[#071422] xl:px-4"
            >
              Start the Cash Flow Assessment
            </CTALink>
            <a href="/how-the-assessment-works" className={`inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full border px-4 text-[13px] font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 ${isLight ? "border-[#cfded3] bg-white text-[#071D3A] hover:bg-[#f3faf1] focus:ring-offset-white" : "border-white/18 bg-white/8 text-white hover:bg-white/12 focus:ring-offset-[#071422]"}`}>How it Works</a>
          </div>
          <button
            type="button"
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53d986] lg:hidden ${menuButtonClasses}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {selectedMenu && (
          <div
            className={`absolute left-1/2 top-[64px] hidden -translate-x-1/2 rounded-[18px] border border-[#cfe7d8] bg-[#fffdf8] p-3 text-[#0B1F33] shadow-[0_24px_70px_rgba(3,18,31,0.22)] ring-1 ring-black/5 lg:block ${selectedMenu.widthClass}`}
            data-nav-menu={selectedMenu.label}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={closeMenuWithDelay}
          >
            <div className={`grid gap-3 ${selectedMenu.featured ? selectedMenu.columnsClass : "grid-cols-1"}`}>
              <div>
                <div className="border-b border-[#dcece3] px-2 pb-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#15803D]">{selectedMenu.eyebrow}</p>
                  <p className="mt-1 max-w-[34rem] text-[13px] font-semibold leading-5 text-[#526172]">{selectedMenu.summary}</p>
                </div>
                <div className={`mt-3 grid gap-1.5 ${selectedMenu.columnsClass === "grid-cols-2" ? "grid-cols-2" : "grid-cols-1"}`}>
                  {selectedMenu.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="group flex gap-3 rounded-xl border border-transparent p-3 transition hover:border-[#bfe8cc] hover:bg-[#f0fbf4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2 text-[14px] font-bold tracking-[-0.012em] text-[#0B1F33]">
                            {item.label}
                            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#15803D] opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                          </span>
                          {item.description ? <span className="mt-1 block text-[12.5px] font-semibold leading-5 text-[#5d6d7c]">{item.description}</span> : null}
                        </span>
                      </a>
                  ))}
                </div>
              </div>
              {selectedMenu.featured ? (
                <a
                  href={selectedMenu.featured.href}
                  className="flex flex-col justify-between rounded-2xl border border-[#bfe8cc] bg-[linear-gradient(145deg,#f0fbf4,#ffffff)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition hover:-translate-y-0.5 hover:border-[#8bdbab] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                >
                  <span>
                    <span className="block text-[16px] font-bold leading-tight tracking-[-0.025em] text-[#0B1F33]">{selectedMenu.featured.title}</span>
                    <span className="mt-2 block text-[13px] font-semibold leading-5 text-[#526172]">{selectedMenu.featured.copy}</span>
                  </span>
                  <span className="mt-4 inline-flex items-center text-[13px] font-bold text-[#15803D]">
                    {selectedMenu.featured.cta}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="max-h-[calc(100svh-100px)] overflow-y-auto border-t border-[#dcece3] bg-[#fffdf8] px-4 pb-5 pt-3 text-[#0B1F33] shadow-[0_24px_60px_rgba(0,0,0,0.24)] lg:hidden">
            <div className="space-y-2">
              {navGroups.map((group) => {
                const expanded = mobileMenu === group.label
                return (
                  <div key={group.label} className="rounded-2xl border border-[#d9efe2] bg-white">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-[15px] font-bold text-[#0B1F33]"
                      aria-expanded={expanded}
                      onClick={() => setMobileMenu(expanded ? null : group.label)}
                    >
                      {group.label}
                      <ChevronDown className={`h-4 w-4 text-[#15803D] transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                    {expanded && (
                      <div className="border-t border-[#e3f0e8] px-3 pb-3 pt-2">
                        {group.items.map((item) => (
                          <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="group flex items-start justify-between gap-3 rounded-xl px-2 py-2.5 text-sm font-semibold text-[#516272] hover:bg-[#f0fbf4] hover:text-[#0B1F33] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]">
                            <span className="min-w-0">
                              <span className="block font-bold text-[#0B1F33]">{item.label}</span>
                              {item.description ? <span className="mt-0.5 block leading-5 text-[#5d6d7c]">{item.description}</span> : null}
                            </span>
                            <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-[#15803D] opacity-70 transition group-hover:translate-x-0.5" aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
              <a href="/how-the-assessment-works" onClick={() => setMobileOpen(false)} className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#d6e5dc] bg-white px-5 text-sm font-bold text-[#071D3A]">How the Assessment Works</a>
              <CTALink
                href="/workflow-audit"
                kind="systems"
                location="hero_mobile_nav_audit"
                ctaLabel="Start the Cash Flow Assessment"
                className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#62e89a]/45 bg-[#15803D] px-5 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_14px_30px_rgba(10,85,38,0.22)]"
              >
                Start the Cash Flow Assessment
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
      data-nav-theme="dark"
      data-audit-priority="5"
      data-audit-offer="Cash Flow Assessment"
      data-audit-purpose="Make the owner understand that Stanley Systems finds boring money leaks and builds the system that stops them."
      className="relative isolate overflow-hidden bg-[#071422] pt-[100px] text-white"
    >
      <div className="relative min-h-[700px] overflow-hidden md:min-h-[calc(100svh-100px)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_34%,rgba(83,217,134,0.14),transparent_31%),radial-gradient(circle_at_88%_4%,rgba(2,8,15,0.92),transparent_30%),linear-gradient(180deg,#071422_0%,#05101c_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[76%] bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.99)_32%,rgba(7,20,34,0.86)_56%,rgba(7,20,34,0.22)_82%,rgba(7,20,34,0)_100%)] md:block xl:w-[67%] xl:bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.98)_29%,rgba(7,20,34,0.78)_50%,rgba(7,20,34,0.16)_78%,rgba(7,20,34,0)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[28%] bg-[linear-gradient(0deg,#071422_0%,rgba(7,20,34,0.78)_28%,rgba(7,20,34,0)_100%)]" />

        <div className="absolute right-[-16%] top-0 z-0 hidden h-[91%] w-[56%] overflow-hidden md:block xl:right-[-4%] xl:w-[62%]">
          <div className="absolute inset-x-[-3%] inset-y-[-8%] [mask-image:radial-gradient(ellipse_at_center,black_42%,rgba(0,0,0,0.92)_58%,rgba(0,0,0,0.46)_76%,transparent_96%)]">
            <HeroVideoLoop />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_10%,rgba(2,8,15,0.86),rgba(7,20,34,0.42)_34%,rgba(7,20,34,0)_58%),linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.82)_10%,rgba(7,20,34,0.34)_25%,rgba(7,20,34,0)_45%,rgba(7,20,34,0)_72%,rgba(7,20,34,0.5)_91%,#071422_100%),linear-gradient(0deg,#071422_0%,rgba(7,20,34,0.62)_10%,rgba(7,20,34,0)_25%,rgba(7,20,34,0)_72%,rgba(7,20,34,0.62)_94%,#071422_100%)]" />
        </div>

        <div className="relative z-20 mx-auto flex min-h-[570px] max-w-[92rem] items-center px-4 pb-32 pt-16 sm:px-6 md:min-h-[calc(100svh-250px)] lg:px-8">
          <div className="max-w-[42rem] xl:max-w-[44rem]">
            <h1
              aria-label={headline}
              className="max-w-[700px] text-balance text-[clamp(1.72rem,7vw,2.42rem)] font-bold leading-[0.98] tracking-[-0.036em] text-white md:max-w-[720px] md:text-[clamp(1.85rem,2.47vw,2.76rem)]"
            >
              <span className="md:hidden">{headline}</span>
              <span className="hidden md:block">Your service business is dropping money</span>
              <span className="hidden md:block">in places nobody checks.</span>
            </h1>
            <p className="mt-7 max-w-[590px] text-pretty text-lg font-semibold leading-8 tracking-[-0.01em] text-[#d3dce7] sm:text-xl">
              {subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTALink
                href="/workflow-audit"
                kind="systems"
                location="home_hero_primary"
                analyticsEvent="audit_checkout_clicked"
                analyticsSource="homepage_hero"
                ctaLabel="Start the Cash Flow Assessment"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#15803D] px-6 text-base font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_42px_rgba(10,85,38,0.34)] transition hover:-translate-y-0.5 hover:bg-[#116f35] focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-[#071422]"
              >
                Start the Cash Flow Assessment
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </CTALink>
              <a
                href="/#systems"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/18 bg-white/8 px-6 text-base font-bold text-white shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-[#071422]"
              >
                Compare system options
              </a>
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
