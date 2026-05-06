"use client"

import { useEffect, useState } from "react"
import { CTALink } from "@/components/cta-link"
import { CTAPhoneLink } from "@/components/cta-phone-link"
import { pricingPackageById } from "@/lib/pricing/source-of-truth"

const auditHref = pricingPackageById.workflow_audit.stripePaymentLink.url

export function MobileStickyCTA() {
  const [showStickyCta, setShowStickyCta] = useState(false)
  const [auditInView, setAuditInView] = useState(false)
  const [systemsInView, setSystemsInView] = useState(false)
  const [proofInView, setProofInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > window.innerHeight)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = [
      { element: document.getElementById("audit"), setter: setAuditInView },
      { element: document.getElementById("systems"), setter: setSystemsInView },
      { element: document.getElementById("proof"), setter: setProofInView },
    ].filter((item): item is { element: HTMLElement; setter: (value: boolean) => void } => Boolean(item.element))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const section = sections.find((item) => item.element === entry.target)
          section?.setter(entry.isIntersecting)
        })
      },
      {
        rootMargin: "-18% 0px -18% 0px",
        threshold: 0.01,
      },
    )

    sections.forEach(({ element }) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  if (!showStickyCta || auditInView || systemsInView || proofInView) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8e1d3] bg-white/96 px-4 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <CTAPhoneLink
          href="tel:+16179586372"
          location="mobile_sticky_secondary"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-4 py-3 text-sm font-semibold text-slate-900"
        >
          Call now
        </CTAPhoneLink>
        <CTALink
          href={auditHref}
          kind="checkout"
          location="mobile_sticky_primary"
          analyticsEvent="audit_checkout_clicked"
          analyticsSource="mobile_sticky_cta"
          packageId="workflow_audit"
          packageName="Workflow Audit"
          billingPeriod="one_time"
          ctaLabel="Buy Audit"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-[#15803D] px-4 py-3 text-sm font-semibold text-white"
        >
          Buy Audit
        </CTALink>
      </div>
    </div>
  )
}
