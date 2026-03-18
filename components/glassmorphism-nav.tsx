"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
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
    if (href.startsWith("/")) {
      return
    }

    const element = document.querySelector(href)
    if (element) {
      const rect = element.getBoundingClientRect()
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
      const elementAbsoluteTop = rect.top + currentScrollY
      const navbarHeight = 100
      const targetPosition = Math.max(0, elementAbsoluteTop - navbarHeight)

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-2 md:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 md:-translate-y-24 opacity-0"
        } ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{
          transition: hasLoaded ? "all 0.5s ease-out" : "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <div className="w-[92vw] max-w-sm md:max-w-5xl mx-auto">
          <div className="rounded-full border border-[#e7e1d6] bg-white/92 px-3 py-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl md:px-4 md:py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="hidden md:block min-w-[140px]">
                <Link href={`${basePath || "/"}`} className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900">
                  Stanley Systems
                </Link>
              </div>

              <div className="hidden md:flex flex-1 items-center justify-center gap-1">
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

              <div className="hidden md:flex min-w-[140px] justify-end">
                <button
                  className="group inline-flex items-center rounded-full bg-slate-950 px-5 py-2.5 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                  onClick={() => window.open("https://calendly.com/jadenodorczuk24/30min", "_blank", "noopener,noreferrer")}
                >
                  <span>Book a Call</span>
                  <ArrowRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e7e1d6] bg-white text-slate-800 transition-transform duration-200 hover:scale-105"
              >
                <div className="relative h-6 w-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden relative">
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsOpen(false)}
            style={{ top: "0", left: "0", right: "0", bottom: "0", zIndex: -1 }}
          />

          <div
            className={`mt-3 w-[92vw] max-w-sm mx-auto transition-all duration-300 ${
              isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
            }`}
          >
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
                <button
                  className="group inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3.5 text-base font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.16)] transition-all duration-200 hover:bg-slate-800"
                  onClick={() => window.open("https://calendly.com/jadenodorczuk24/30min", "_blank", "noopener,noreferrer")}
                >
                  <span>Book a Call</span>
                  <ArrowRight size={17} className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
