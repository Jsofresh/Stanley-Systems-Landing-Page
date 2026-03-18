"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "How it works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "/contact" },
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

        console.log("[v0] Scroll event - currentScrollY:", currentScrollY, "lastScrollY:", lastScrollY.current)

        // Only hide/show after scrolling past 50px to avoid flickering at top
        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
            // Scrolling down - hide navbar
            console.log("[v0] Hiding navbar - scrolling down")
            setIsVisible(false)
          } else if (lastScrollY.current - currentScrollY > 5) {
            // Scrolling up - show navbar
            console.log("[v0] Showing navbar - scrolling up")
            setIsVisible(true)
          }
        } else {
          // Always show navbar when near top
          console.log("[v0] Showing navbar - near top")
          setIsVisible(true)
        }

        lastScrollY.current = currentScrollY
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar, { passive: true })
      console.log("[v0] Scroll listener added")

      return () => {
        window.removeEventListener("scroll", controlNavbar)
        clearTimeout(timer)
        console.log("[v0] Scroll listener removed")
      }
    }

    return () => clearTimeout(timer)
  }, []) // Removed lastScrollY dependency to prevent infinite re-renders

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
        {/* Main Navigation */}
        <div className="w-[90vw] max-w-xs md:max-w-4xl mx-auto">
          <div className="bg-white/85 backdrop-blur-md border border-black/10 shadow-[0_12px_36px_rgba(15,23,42,0.10)] rounded-full px-4 py-4 md:px-6 md:py-3">
            <div className="flex items-center justify-between">
              <div className="hidden md:block w-10 md:w-12" aria-hidden="true" />

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-base lg:text-lg text-slate-600 hover:text-slate-900 hover:scale-105 transition-all duration-200 font-semibold cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-base lg:text-lg text-slate-600 hover:text-slate-900 hover:scale-105 transition-all duration-200 font-semibold cursor-pointer"
                    >
                      {item.name}
                    </button>
                  ),
                )}
              </div>

              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <button
                  className="relative bg-white hover:bg-gray-50 text-black font-semibold px-7 py-3 lg:px-8 lg:py-3.5 rounded-full flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group text-base lg:text-lg"
                  onClick={() => window.open("https://calendly.com/jadenodorczuk24/30min", "_blank", "noopener,noreferrer")}
                >
                  <span className="mr-2">Book a Call</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-slate-800 hover:scale-110 transition-transform duration-200 cursor-pointer p-2"
              >
                <div className="relative w-7 h-7">
                  <Menu
                    size={28}
                    className={`absolute inset-0 transition-all duration-300 ${
                      isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    size={28}
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
          {/* Backdrop overlay */}
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsOpen(false)}
            style={{ top: "0", left: "0", right: "0", bottom: "0", zIndex: -1 }}
          />

          {/* Menu container */}
          <div
            className={`mt-3 w-[90vw] max-w-xs mx-auto transition-all duration-500 ease-out transform-gpu ${
              isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
            }`}
          >
            <div className="bg-white/95 backdrop-blur-md border border-black/10 rounded-3xl p-5 shadow-2xl">
              <div className="flex flex-col space-y-2">
                {navigation.map((item, index) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl px-4 py-4 text-base font-semibold text-left transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:translate-x-1 ${
                        isOpen ? "animate-mobile-menu-item" : ""
                      }`}
                      style={{
                        animationDelay: isOpen ? `${index * 80 + 100}ms` : "0ms",
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl px-4 py-4 text-base font-semibold text-left transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:translate-x-1 ${
                        isOpen ? "animate-mobile-menu-item" : ""
                      }`}
                      style={{
                        animationDelay: isOpen ? `${index * 80 + 100}ms` : "0ms",
                      }}
                    >
                      {item.name}
                    </button>
                  ),
                )}
                <div className="h-px bg-slate-200 my-3" />
                <button
                  className={`relative bg-white hover:bg-gray-50 text-black font-semibold px-6 py-4 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group transform text-base w-full ${
                    isOpen ? "animate-mobile-menu-item" : ""
                  }`}
                  style={{
                    animationDelay: isOpen ? `${navigation.length * 80 + 150}ms` : "0ms",
                  }}
                  onClick={() => window.open("https://calendly.com/jadenodorczuk24/30min", "_blank", "noopener,noreferrer")}
                >
                  <span className="mr-2">Book a Call</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
