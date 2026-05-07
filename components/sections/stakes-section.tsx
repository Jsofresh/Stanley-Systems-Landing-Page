import Image from "next/image"

const losses = [
  {
    label: "Slow billing",
    amount: "-$48,000",
    note: "Invoices stall after the work is done.",
  },
  {
    label: "Missed follow-ups",
    amount: "-$36,000",
    note: "Quotes sit until the customer moves on.",
  },
  {
    label: "Dead leads",
    amount: "-$42,000",
    note: "Calls and forms disappear before they turn into jobs.",
  },
]

export function StakesSection() {
  return (
    <section
      data-section="stakes"
      data-nav-theme="light"
      className="relative isolate w-full scroll-mt-28 overflow-hidden bg-white px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-32"
      aria-labelledby="stakes-heading"
    >
      <div
        aria-hidden="true"
        data-visual="stakes-red-aura"
        className="pointer-events-none absolute inset-x-0 top-[7rem] -z-10 mx-auto h-[390px] max-w-[980px] rounded-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.16),rgba(220,38,38,0.075)_34%,rgba(255,255,255,0)_72%)] blur-2xl sm:top-[8rem] lg:top-[9rem]"
      />

      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-[820px] text-center">
          <h2
            id="stakes-heading"
            className="text-balance text-4xl font-black leading-[0.92] tracking-[-0.045em] text-[#071D3A] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Small leaks turn into{" "}
            <span className="text-[#DC2626]">big losses.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-[830px] text-pretty text-xl font-semibold leading-[1.62] text-[#20384F] sm:text-[22px] sm:leading-[1.65]">
            In one realistic $2M trade-business scenario, slow billing, missed follow-ups, and dead leads can add up to{" "}
            <strong className="font-black text-[#DC2626]">
              $126,000+ a year
            </strong>{" "}
            in delayed or missed revenue.
          </p>
        </div>

        <div
          data-visual="stakes-pipeline-image"
          className="mx-auto mt-8 w-full max-w-[1280px] sm:mt-10 lg:mt-12"
        >
          <Image
            src="/images/sections/stakes-pipe-losses-pipeline.png"
            alt="Metal pipe leaking money into a tray."
            width={1280}
            height={430}
            unoptimized
            className="block h-auto w-full select-none"
            sizes="(min-width: 1400px) 1280px, 100vw"
            priority={false}
          />
        </div>

        <div
          data-visual="stakes-loss-cards"
          className="mx-auto mt-8 grid w-full max-w-[1120px] gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:mt-12 lg:gap-6"
        >
          {losses.map((loss) => (
            <article
              key={loss.label}
              className="rounded-[28px] border border-[#F3D7D7] bg-white px-5 py-6 text-center shadow-[0_16px_40px_rgba(7,29,58,0.10)] sm:px-4 sm:py-7 lg:px-7 lg:py-8"
            >
              <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-[#DC2626]" />
              <h3 className="text-2xl font-black tracking-[-0.035em] text-[#071D3A] sm:text-[26px] lg:text-3xl">
                {loss.label}
              </h3>
              <p className="mt-3 text-4xl font-black tracking-[-0.04em] text-[#DC2626] sm:text-[34px] lg:text-5xl">
                {loss.amount}
              </p>
              <p className="mx-auto mt-4 max-w-[260px] text-base font-semibold leading-6 text-[#465B70] sm:text-sm lg:text-base">
                {loss.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
