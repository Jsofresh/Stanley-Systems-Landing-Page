import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function DemoProofStrip() {
  return (
    <section data-section="demo-proof" className="bg-white px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[1.4rem] border border-[#D5DEE8] bg-[#F8F4EA] p-7 shadow-[0_20px_54px_rgba(33,51,67,0.08)] lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#FF5C35]">See what gets built</p>
          <h2 className="mt-5 font-serif text-[2.4rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[#213343] sm:text-5xl">
            A short preview before you commit.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#33475B]">
            Review the customers to contact, the follow-up sequence, and the open opportunities before you decide whether to buy the full system.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/how-stanley-systems-works" prefetch={false} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#FF5C35] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#E04826]">
              See how Stanley Systems works <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/workflow-audit" prefetch={false} className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-[#FF5C35] px-6 py-3 text-sm font-bold text-[#213343] transition hover:bg-[#FFF1EB]">
              Start with the audit
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Customers to contact", "Completed jobs, old customers, and missed calls grouped by what should happen next."],
            ["Follow-up sequence", "Who gets contacted, when the ask happens, and what your office does after a reply."],
            ["Open opportunities", "A simple list of missed follow-ups, old customers to contact, and jobs worth recovering."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-xl border border-[#D5DEE8] bg-white p-5">
              <h3 className="text-xl font-bold tracking-[-0.025em] text-[#213343]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#516F90]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
