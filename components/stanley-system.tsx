import type { AnchorHTMLAttributes, ReactNode } from "react"
import Link from "next/link"

type DisplayHeadlineProps = {
  id?: string
  before: string
  highlight: ReactNode
}

type PackageCardProps = {
  ctaProps?: AnchorHTMLAttributes<HTMLAnchorElement>
}

export function DisplayHeadline({ id, before, highlight }: DisplayHeadlineProps) {
  return (
    <h2 id={id} className="text-balance text-4xl font-extrabold leading-[0.96] tracking-[-0.06em] text-[#071421] md:text-6xl">
      {before} <span className="text-[#15803D]">{highlight}</span>
    </h2>
  )
}

function PackageCard({
  title,
  copy,
  bullets,
  href,
  ctaProps,
}: PackageCardProps & { title: string; copy: string; bullets: string[]; href: string }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.07)] md:p-7">
      <div>
        <p className="text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#15803D]">Stanley Systems package</p>
        <h3 className="mt-4 text-3xl font-extrabold leading-[0.98] tracking-[-0.055em] text-[#071421] md:text-4xl">{title}</h3>
        <p className="mt-4 text-base font-medium leading-7 text-slate-600">{copy}</p>
        <ul className="mt-6 space-y-3">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm font-semibold leading-6 text-slate-700">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#15803D]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={href}
        {...ctaProps}
        className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-5 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(21,128,61,0.20)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
      >
        Learn more
      </Link>
    </article>
  )
}

export function CashflowControlSystemPackageCard({ ctaProps }: PackageCardProps) {
  return (
    <PackageCard
      title="Cashflow Control System"
      copy="Move finished jobs toward invoice, payment, and owner visibility without forcing the office to rebuild the story by hand."
      bullets={["Billing handoffs get visible.", "Cash movement stops depending on memory.", "Owner cleanup hours come down."]}
      href="/systems/cashflow-control"
      ctaProps={ctaProps}
    />
  )
}

export function RepeatRevenueSystemPackageCard({ ctaProps }: PackageCardProps) {
  return (
    <PackageCard
      title="Repeat Revenue System"
      copy="Turn past customers, reviews, referrals, missed calls, and stale follow-up into a repeat revenue path the team can run."
      bullets={["Past customer lists stop sitting idle.", "Missed calls and stale quotes get next steps.", "Repeat work becomes a system, not luck."]}
      href="/systems/repeat-revenue"
      ctaProps={ctaProps}
    />
  )
}
