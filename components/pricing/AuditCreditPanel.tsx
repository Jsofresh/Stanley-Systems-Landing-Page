import { CheckCircle2 } from "lucide-react"

import type { AuditCreditTerm, OfferGuarantee } from "@/lib/pricing/offers"

export function AuditCreditPanel({ guarantee, auditCredit }: { guarantee: OfferGuarantee; auditCredit?: AuditCreditTerm }) {
  return (
    <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
      <article className="rounded-[2rem] border border-[#bfe4c8] bg-[#f2fbf5] p-6 shadow-[0_18px_46px_rgba(15,23,42,0.07)] sm:p-7">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-[#15803D]" aria-hidden="true" />
          <div>
            <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#102033]">{guarantee.headline}</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#536173]">{guarantee.qualificationCopy}</p>
            <p className="mt-3 rounded-2xl border border-[#d7ecd9] bg-white px-4 py-3 text-sm font-bold leading-6 text-[#102033]">{guarantee.scopeCopy}</p>
          </div>
        </div>
      </article>

      {auditCredit?.status === "approved" && auditCredit.copy ? (
        <article className="rounded-[2rem] border border-[#e4ded3] bg-white p-6 shadow-[0_18px_46px_rgba(15,23,42,0.07)] sm:p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#102033]">AI Profit Map credit after a build recommendation</h2>
          <p className="mt-4 text-base leading-7 text-[#536173]">{auditCredit.copy}</p>
          <p className="mt-4 rounded-2xl border border-[#e6dfd2] bg-[#fbfaf7] px-4 py-3 text-sm font-bold leading-6 text-[#102033]">
            {auditCredit.nonStackingCopy}
          </p>
        </article>
      ) : null}
    </section>
  )
}
