import { CTALink } from "@/components/cta-link"
import { CTAPhoneLink } from "@/components/cta-phone-link"

export function MobileStickyCTA() {
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
          href="/contact"
          kind="book_meeting"
          location="mobile_sticky_primary"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-[#15803D] px-4 py-3 text-sm font-semibold text-white"
        >
          Book a meeting
        </CTALink>
      </div>
    </div>
  )
}
