"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, Phone, X } from "lucide-react"
import Link from "next/link"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

const navigation = [
  { name: "How it works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#before-you-book" },
  { name: "Blog", href: `${basePath}/blog` },
  { name: "Contact", href: `${basePath}/contact` },
]

export function GlassmorphismNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true)
    }, 100)

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY

        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
            setIsVisible(false)
          } else if (lastScrollY.current - currentScrollY > 5) {
            setIsVisible(true)
          }
        } else {
          setIsVisible(true)
        }

        lastScrollY.current = currentScrollY
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar, { passive: true })

      return () => {
        window.removeEventListener("scroll", controlNavbar)
        clearTimeout(timer)
      }
    }

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) return

    const element = document.querySelector(href)
    if (element) {
      const rect = element.getBoundingClientRect()
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
      const elementAbsoluteTop = rect.top + currentScrollY
      const navbarHeight = 100
      const targetPosition = Math.max(0, elementAbsoluteTop - navbarHeight)

      window.scrollTo({ top: targetPosition, behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed left-1/2 top-2 z-50 -translate-x-1/2 transition-all duration-500 md:top-4 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0 md:-translate-y-24"
        } ${hasLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        style={{ transition: hasLoaded ? "all 0.5s ease-out" : "opacity 0.8s ease-out, transform 0.8s ease-out" }}
      >
        <div className="mx-auto w-[92vw] max-w-sm md:max-w-6xl">
          <div className="hidden rounded-full border border-[#e7e1d6] bg-white/92 px-3 py-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl md:block md:px-4 md:py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="hidden min-w-[170px] md:block">
                <Link href={`${basePath || "/"}`} className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900">
                  Stanley Systems
                </Link>
              </div>

              <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
                {navigation.map((item) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="rounded-full px-4 py-2.5 text-[15px] font-medium text-slate-600 transition-colors duration-200 hover:bg-[#f6f3ed] hover:text-slate-900"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="rounded-full px-4 py-2.5 text-[15px] font-medium text-slate-600 transition-colors duration-200 hover:bg-[#f6f3ed] hover:text-slate-900"
                    >
                      {item.name}
                    </button>
                  ),
                )}
              </div>

              <div className="hidden min-w-[270px] items-center justify-end gap-2 md:flex">
                <a
                  href="tel:+16179586372"
                  className="inline-flex items-center rounded-full border border-[#d8d1c4] bg-white px-4 py-2.5 text-[14px] font-semibold text-slate-900 transition-all duration-200 hover:bg-[#f4efe6]"
                >
                  <Phone size={15} className="mr-2" />
                  Call: +1 (617) 958-6372
                </a>
                <button
                  className="inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                  onClick={() => window.open("https://calendly.com/jadenodorczuk24/30min", "_blank", "noopener,noreferrer")}
                >
                  Book a meeting
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-start md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#e7e1d6] bg-white/96 text-slate-800 shadow-[0_16px_36px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-transform duration-200 hover:scale-105"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <div className="relative h-6 w-6">
                <Menu size={24} className={`absolute inset-0 transition-all duration-300 ${isOpen ? "scale-75 rotate-180 opacity-0" : "scale-100 rotate-0 opacity-100"}`} />
                <X size={24} className={`absolute inset-0 transition-all duration-300 ${isOpen ? "scale-100 rotate-0 opacity-100" : "-rotate-180 scale-75 opacity-0"}`} />
              </div>
            </button>
          </div>
        </div>

        <div className="relative md:hidden">
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            onClick={() => setIsOpen(false)}
            style={{ top: "0", left: "0", right: "0", bottom: "0", zIndex: -1 }}
          />

          <div className={`mx-auto mt-3 w-[92vw] max-w-sm transition-all duration-300 ${isOpen ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-4 scale-95 opacity-0"}`}>
            <div className="rounded-[1.75rem] border border-[#e7e1d6] bg-white/96 p-4 shadow-[0_22px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <div className="flex flex-col gap-1.5">
                {navigation.map((item) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="rounded-2xl px-4 py-3.5 text-base font-medium text-slate-700 transition-colors duration-200 hover:bg-[#f6f3ed] hover:text-slate-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="rounded-2xl px-4 py-3.5 text-left text-base font-medium text-slate-700 transition-colors duration-200 hover:bg-[#f6f3ed] hover:text-slate-900"
                    >
                      {item.name}
                    </button>
                  ),
                )}
                <div className="my-2 h-px bg-[#ebe5db]" />
                <a
                  href="tel:+16179586372"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-5 py-3.5 text-base font-semibold text-slate-900 transition-all duration-200 hover:bg-[#f4efe6]"
                >
                  <Phone size={17} className="mr-2" />
                  Call now
                </a>
                <button
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)] transition-all duration-200 hover:bg-slate-800"
                  onClick={() => window.open("https://calendly.com/jadenodorczuk24/30min", "_blank", "noopener,noreferrer")}
                >
                  Book a meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
