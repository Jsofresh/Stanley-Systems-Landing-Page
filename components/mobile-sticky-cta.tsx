export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e8e1d3] bg-white/96 px-4 py-3 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <a
          href="tel:+16179586372"
          className="inline-flex flex-1 items-center justify-center rounded-full border border-[#d8d1c4] bg-white px-4 py-3 text-sm font-semibold text-slate-900"
        >
          Call now
        </a>
        <a
          href="https://calendly.com/jadenodorczuk24/30min"
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-[#15803D] px-4 py-3 text-sm font-semibold text-white"
        >
          Book a meeting
        </a>
      </div>
    </div>
  )
}
