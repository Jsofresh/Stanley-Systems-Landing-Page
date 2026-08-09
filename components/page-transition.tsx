"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 50)

    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (shouldReduceMotion) return

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("main section"))
      .filter((section, index) => index > 0 && !section.hasAttribute("data-motion-exempt"))

    revealTargets.forEach((section) => {
      section.setAttribute("data-scroll-reveal", "pending")
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const section = entry.target as HTMLElement
          section.setAttribute("data-scroll-reveal", "visible")
          observer.unobserve(section)
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    )

    revealTargets.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [pathname])

  return <div className={`transition-opacity duration-500 ease-in-out ${isAnimating ? "opacity-0" : "opacity-100"}`}>{children}</div>
}
