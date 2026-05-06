"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Calculator } from "lucide-react"
import { CTALink } from "@/components/cta-link"

const headline = "The work gets done. The cash still gets stuck."
const subheadline =
  "For trade contractors, Stanley Systems finds the leaks in billing, handoffs, follow-up, missed calls, and repeat revenue."
const primaryCta = "Calculate my revenue leak"
const secondaryCta = "See how the audit works"

const mobileHeadlineLines = ["The work gets done.", "The cash still", "gets stuck."]
const headlineLines = ["The work gets done.", "The cash still", "gets stuck."]
const premiumEase = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      data-audit-page="/"
      data-audit-section="home.hero"
      data-audit-priority="5"
      data-audit-offer="Workflow Audit"
      data-audit-purpose="Make the owner understand that Stanley Systems helps make more money with less office work."
      className="relative isolate overflow-hidden bg-transparent"
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id="hero-liquid-glass-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="8" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="mx-auto flex max-w-[96rem] flex-col items-center justify-center px-4 pb-7 pt-14 text-center sm:px-6 sm:pb-10 sm:pt-24 lg:px-8 lg:pb-12 lg:pt-28">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.9, ease: premiumEase }}
          className="relative flex w-full max-w-[90rem] items-center justify-center overflow-hidden rounded-[1.65rem] border border-white/55 bg-white/[0.06] px-4 py-7 shadow-[0_34px_110px_rgba(27,42,74,0.13),0_2px_8px_rgba(255,255,255,0.6)_inset,0_-18px_42px_rgba(15,23,42,0.04)_inset] backdrop-blur-[18px] backdrop-brightness-110 backdrop-contrast-125 backdrop-saturate-200 min-[390px]:py-8 sm:min-h-[56svh] sm:rounded-[3.25rem] sm:px-7 sm:py-12 lg:min-h-[56svh] lg:rounded-[4.5rem] lg:px-10 lg:py-14"
        >
          <div className="pointer-events-none absolute -inset-10 rounded-[inherit] bg-[radial-gradient(ellipse_at_16%_28%,rgba(148,163,184,0.22),transparent_34%),radial-gradient(ellipse_at_84%_36%,rgba(219,234,254,0.26),transparent_36%),radial-gradient(ellipse_at_48%_82%,rgba(203,213,225,0.18),transparent_38%)] blur-2xl [filter:url(#hero-liquid-glass-distortion)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(102deg,transparent_0%,rgba(100,116,139,0.14)_13%,transparent_28%,rgba(219,234,254,0.24)_46%,transparent_62%,rgba(100,116,139,0.12)_82%,transparent_100%)] opacity-80 [filter:url(#hero-liquid-glass-distortion)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_34%,rgba(255,255,255,0.02)_58%,rgba(248,246,240,0.08)_100%)] [filter:url(#hero-liquid-glass-distortion)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.46),transparent_20%),radial-gradient(ellipse_at_80%_4%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(ellipse_at_50%_108%,rgba(255,255,255,0.2),transparent_30%),linear-gradient(118deg,rgba(255,255,255,0.22)_0%,transparent_28%,rgba(255,255,255,0.12)_52%,transparent_74%)] mix-blend-screen" />
          <div className="pointer-events-none absolute -inset-px rounded-[inherit] border border-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.36)_inset,0_24px_60px_rgba(255,255,255,0.14)_inset]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-white lg:inset-x-20" />
          <div className="pointer-events-none absolute inset-x-12 bottom-0 h-px bg-white/55 lg:inset-x-24" />
          <div className="pointer-events-none absolute inset-y-8 left-0 w-px bg-white/70" />
          <div className="pointer-events-none absolute inset-y-8 right-0 w-px bg-slate-400/20" />
          <div className="relative flex w-full max-w-[76rem] flex-col items-center">
            <h1
              aria-label={headline}
              className="block text-balance text-[1.98rem] font-semibold leading-[0.95] tracking-normal text-[#101b2f] min-[390px]:text-[2.1rem] sm:hidden"
            >
              {mobileHeadlineLines.map((line, index) => (
                <span key={line} className="block">
                  {line}
                  {index < mobileHeadlineLines.length - 1 ? <span className="sr-only"> </span> : null}
                </span>
              ))}
            </h1>
            <h1
              aria-hidden="true"
              className="hidden text-balance font-semibold leading-[0.9] tracking-normal text-[#101b2f] sm:block sm:text-[4.45rem] md:text-[5.15rem] lg:text-[5.85rem] xl:text-[6.2rem] 2xl:text-[6.45rem]"
            >
              {headlineLines.map((line, index) => (
                <span key={line} className="block md:whitespace-nowrap">
                  {line}
                  {index < headlineLines.length - 1 ? <span className="sr-only"> </span> : null}
                </span>
              ))}
            </h1>

            <p className="mt-4 max-w-[43rem] text-balance text-[0.93rem] leading-6 text-slate-700 sm:mt-7 sm:text-lg sm:leading-8">
              {subheadline}
            </p>

            <div className="mt-5 flex w-full max-w-[47rem] flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:justify-center sm:gap-3">
              <CTALink
                href="/invoicing-delay-cash-flow-calculator"
                kind="calculator"
                location="home_hero_primary"
                analyticsEvent="calculator_cta_clicked"
                analyticsSource="homepage_hero"
                ctaLabel={primaryCta}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#15803D] px-5 py-2.5 text-[0.94rem] font-semibold text-white shadow-[0_16px_34px_rgba(21,128,61,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#116832] focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2 focus:ring-offset-white sm:min-h-12 sm:px-6 sm:py-3 sm:text-base"
              >
                <Calculator className="mr-2 h-4 w-4" aria-hidden="true" />
                {primaryCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </CTALink>
              <CTALink
                href="#audit"
                kind="systems"
                location="home_hero_secondary"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d8d1c4] bg-white/78 px-5 py-2.5 text-[0.94rem] font-semibold text-[#102033] shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#15803D] focus:ring-offset-2 focus:ring-offset-white sm:min-h-12 sm:px-6 sm:py-3 sm:text-base"
              >
                {secondaryCta}
              </CTALink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
