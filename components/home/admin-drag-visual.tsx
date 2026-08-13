"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const hotspots = [
  { label: "Monthly hours", className: "left-[60.1%] top-[23.3%] h-[20.4%] w-[33.1%]", tone: "green" },
  { label: "Monthly admin drag", className: "left-[60.1%] top-[46.5%] h-[20%] w-[33.1%]", tone: "red" },
  { label: "Primary bottleneck", className: "left-[60.1%] top-[69.4%] h-[19.2%] w-[33.1%]", tone: "red" },
]

export function AdminDragVisual() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.22 })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % hotspots.length), 2200)
    return () => window.clearInterval(timer)
  }, [visible])

  return (
    <div ref={rootRef} className="relative isolate mx-auto w-full max-w-[840px]">
      <div aria-hidden="true" className={`absolute inset-[9%] -z-10 rounded-full bg-[#53D986]/18 blur-[88px] transition-all duration-1000 ${visible ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} />
      <div className={`group relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.035] p-2 shadow-[0_38px_100px_rgba(0,0,0,.38)] transition-all duration-1000 ease-out motion-reduce:transform-none motion-reduce:opacity-100 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"} hover:-translate-y-2 hover:shadow-[0_48px_120px_rgba(0,0,0,.48),0_0_0_1px_rgba(83,217,134,.16)]`}>
        <div className="relative overflow-hidden rounded-[1.55rem]">
          <Image src="/images/uploaded/homepage/ai-office/admin-drag-calculator.jpg" alt="Admin Drag Calculator showing monthly hours, monthly admin drag, and the primary office bottleneck" width={1280} height={960} sizes="(min-width: 1024px) 58vw, 100vw" className="h-auto w-full transition duration-700 ease-out group-hover:scale-[1.012]" priority={false} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,20,34,.08)_0%,transparent_34%,transparent_91%,rgba(7,20,34,.12)_100%),linear-gradient(0deg,rgba(7,20,34,.12)_0%,transparent_11%,transparent_90%,rgba(7,20,34,.05)_100%)]" />
          {hotspots.map((hotspot, index) => {
            const isActive = active === index
            const activeTone = hotspot.tone === "red"
              ? "z-10 scale-[1.035] border-[#EF4444]/70 bg-[#EF4444]/[0.045] shadow-[0_22px_48px_rgba(127,29,29,.3),0_0_0_5px_rgba(239,68,68,.13)]"
              : "z-10 scale-[1.035] border-[#53D986]/65 bg-[#53D986]/[0.04] shadow-[0_22px_48px_rgba(7,29,58,.28),0_0_0_5px_rgba(83,217,134,.12)]"

            return (
              <button
                key={hotspot.label}
                type="button"
                aria-label={`Highlight ${hotspot.label}`}
                aria-pressed={isActive}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className={`absolute ${hotspot.className} rounded-[1.2rem] border transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#071422] ${hotspot.tone === "red" ? "focus:ring-[#EF4444]" : "focus:ring-[#53D986]"} ${isActive ? activeTone : "border-transparent bg-transparent"}`}
              />
            )
          })}
        </div>
      </div>
      <div aria-hidden="true" className={`mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-[#53D986] to-transparent transition-opacity duration-1000 ${visible ? "opacity-70" : "opacity-0"}`} />
    </div>
  )
}
