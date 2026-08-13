"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false)
  const [blocked, setBlocked] = useState(false)
  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > window.innerHeight)
      const element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight - 76)?.closest("form, details, video, [data-hide-sticky-cta]")
      setBlocked(Boolean(element))
    }
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update)
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update) }
  }, [])
  if (!visible || blocked) return null
  return <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D5E5DA] bg-white/96 px-4 py-3 shadow-[0_-10px_30px_rgba(7,29,58,.12)] backdrop-blur md:hidden"><Link href="/systems-installation-sprint#installation-contact" data-analytics-event="founding_application_started" className="mx-auto flex min-h-12 max-w-md items-center justify-center rounded-full bg-[#15803D] px-5 text-sm font-extrabold text-white">Apply for a Founding Installation</Link></div>
}
