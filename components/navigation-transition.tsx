"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"

export function NavigationTransition() {
  const pathname = usePathname()
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (!link || !link.href || !link.href.startsWith(window.location.origin)) {
        return
      }

      const rawHref = link.getAttribute("href")
      if (!rawHref || rawHref.startsWith("#")) {
        return
      }

      const url = new URL(link.href)
      const nextHref = `${url.pathname}${url.search}${url.hash}`
      const currentHref = `${window.location.pathname}${window.location.search}${window.location.hash}`

      if (nextHref === currentHref || url.hash) {
        return
      }

      e.preventDefault()
      setIsTransitioning(true)

      setTimeout(() => {
        router.push(nextHref)
      }, 220)
    }

    document.addEventListener("click", handleLinkClick)

    return () => {
      document.removeEventListener("click", handleLinkClick)
    }
  }, [router])

  useEffect(() => {
    if (pathname !== previousPathname.current) {
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)

      previousPathname.current = pathname
    }
  }, [pathname])

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black pointer-events-none transition-opacity duration-300 ease-in-out ${
        isTransitioning ? "opacity-100" : "opacity-0"
      }`}
    />
  )
}
