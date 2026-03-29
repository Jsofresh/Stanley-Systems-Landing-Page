"use client"

import { ReactNode, useEffect, useRef, useState } from "react"

interface SlideInProps {
  children: ReactNode
  direction?: "left" | "right" | "up" | "down"
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  className?: string
}

const offsets = {
  up: "translateY(28px)",
  down: "translateY(-28px)",
  left: "translateX(-36px)",
  right: "translateX(36px)",
}

export default function SlideIn({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,
  className = "",
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener?.("change", updateMotionPreference)

    return () => {
      mediaQuery.removeEventListener?.("change", updateMotionPreference)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduceMotion || typeof window === "undefined") {
      setVisible(true)
      return
    }

    const viewportHeight = window.innerHeight || 0
    const rect = el.getBoundingClientRect()
    if (rect.top <= viewportHeight * 0.92) {
      setVisible(true)
      if (once) return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once, reduceMotion])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : offsets[direction],
        transition: reduceMotion
          ? "none"
          : `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: reduceMotion ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}
