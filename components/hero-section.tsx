"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"
import { HERO_VARIANTS, type HeroLanguageVariant } from "@/lib/experiments/homepage-hero-language"

const links = [
  { label: "How It Works", href: "/#one-message-demo" },
  { label: "AI Office Command Map", href: "/ai-office-command-map" },
  { label: "Installation", href: "/systems-installation-sprint" },
  { label: "Pricing", href: "/pricing" },
  { label: "Who We Help", href: "/who-stanley-systems-helps" },
  { label: "Client Login", href: "/login" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [variant, setVariant] = useState<HeroLanguageVariant>("message")
  const [light, setLight] = useState(false)

  useEffect(() => {
    const syncVariant = () => {
      const current = document.documentElement.dataset.heroVariant
      if (current === "prompt" || current === "message") setVariant(current)
    }
    syncVariant()
    const timer = window.setTimeout(syncVariant, 50)
    const updateTheme = () => {
      const point = document.elementFromPoint(window.innerWidth / 2, 102)?.closest("[data-nav-theme]") as HTMLElement | null
      setLight(point?.dataset.navTheme === "light")
    }
    updateTheme()
    window.addEventListener("scroll", updateTheme, { passive: true })
    return () => { window.clearTimeout(timer); window.removeEventListener("scroll", updateTheme) }
  }, [])

  const shell = light && !open ? "border-[#D5E5DA] bg-[#FFFDF8]/96 text-[#071D3A] shadow-[0_12px_34px_rgba(7,29,58,.1)]" : "border-white/12 bg-[#071422]/94 text-white shadow-[0_16px_42px_rgba(0,0,0,.2)]"
  const cta = HERO_VARIANTS[variant].cta

  return <header className={`fixed inset-x-0 top-0 z-[999] border-b backdrop-blur-xl transition-colors ${shell}`}>
    <div className="border-b border-current/10"><div className="mx-auto flex h-9 max-w-[92rem] items-center justify-between px-4 text-xs font-bold sm:px-6 lg:px-8"><a href="tel:+16179586372" className="inline-flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[#53D986]" /><span className="hidden sm:inline">+1 (617) 958-6372</span></a><Link href="/login">Client Login</Link></div></div>
    <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <Link href="/" className="text-xl font-bold tracking-[-.02em]">Stanley Systems</Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">{links.map(link => <Link key={link.label} href={link.href} className="rounded-full px-3 py-2 text-sm font-bold transition hover:bg-[#15803D]/12 hover:text-[#15803D]">{link.label}</Link>)}</nav>
      <Link href="/#one-message-demo" data-analytics-event="hero_primary_cta_clicked" data-analytics-source="site_nav" className="hidden min-h-11 items-center rounded-full bg-[#15803D] px-5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#116832] md:inline-flex">{cta}</Link>
      <button type="button" onClick={() => setOpen(value => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="grid h-11 w-11 place-items-center rounded-xl border border-current/20 lg:hidden">{open ? <X /> : <Menu />}</button>
    </div>
    {open ? <nav aria-label="Mobile navigation" className="border-t border-[#D5E5DA] bg-[#FFFDF8] px-4 py-4 text-[#071D3A] lg:hidden"><div className="mx-auto grid max-w-lg gap-1">{links.map(link => <Link key={link.label} href={link.href} onClick={() => setOpen(false)} className="min-h-12 rounded-xl px-4 py-3 font-bold hover:bg-[#E9F8ED]">{link.label}</Link>)}<Link href="/#one-message-demo" onClick={() => setOpen(false)} className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-5 font-extrabold text-white">{cta}</Link></div></nav> : null}
  </header>
}
