"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const headline = "Make your business more money with less office work."
const scrollPrompt = "Scroll down to find out how."

const headlineLines = ["Make your business", "more money", "with less office work."]
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
      className="relative isolate min-h-svh overflow-hidden bg-transparent"
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id="hero-liquid-glass-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="8" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="mx-auto flex min-h-svh max-w-[96rem] flex-col items-center justify-center px-4 pb-20 pt-24 text-center sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-32">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.9, ease: premiumEase }}
          className="relative flex min-h-[56svh] w-full max-w-[90rem] items-center justify-center overflow-hidden rounded-[2.4rem] border border-white/55 bg-white/[0.03] px-4 py-10 shadow-[0_34px_110px_rgba(27,42,74,0.13),0_2px_8px_rgba(255,255,255,0.6)_inset,0_-18px_42px_rgba(15,23,42,0.04)_inset] backdrop-blur-[18px] backdrop-brightness-110 backdrop-contrast-125 backdrop-saturate-200 sm:min-h-[50svh] sm:rounded-[3.25rem] sm:px-7 sm:py-12 lg:min-h-[48svh] lg:rounded-[4.5rem] lg:px-10 lg:py-16"
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
          <div className="relative w-full">
            <h1
              aria-label={headline}
              className="text-balance text-[3rem] font-semibold leading-[0.92] tracking-normal text-[#101b2f] min-[390px]:text-[3.35rem] sm:text-[4.9rem] sm:leading-[0.9] md:text-[6.25rem] lg:text-[7.05rem] xl:text-[7.25rem]"
            >
              {headlineLines.map((line, index) => (
                <span key={line} className="block md:whitespace-nowrap">
                  {line}
                  {index < headlineLines.length - 1 ? <span className="sr-only"> </span> : null}
                </span>
              ))}
            </h1>

            <div className="mt-7 flex flex-col items-center gap-2 text-slate-700 sm:mt-10">
              <p className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.18em] text-[#0F7B3F] sm:text-sm">
                {scrollPrompt}
              </p>
              <ChevronDown className="h-7 w-7 text-[#0F7B3F] sm:h-6 sm:w-6" aria-hidden="true" strokeWidth={1.8} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
