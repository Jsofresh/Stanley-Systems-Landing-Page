import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"

type RelatedLink = { title: string; href: string }

type ProblemPageProps = {
  eyebrow: string
  title: string
  intro: string
  symptomsTitle?: string
  symptoms: string[]
  costTitle: string
  costBody: string
  before: string[]
  after: string[]
  fixTitle: string
  fixes: string[]
  related?: RelatedLink[]
}

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
const primaryButton = "inline-flex min-h-12 items-center justify-center rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[0_16px_34px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]"
const secondaryButton = "inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8D5] bg-white px-6 py-3 text-sm font-extrabold text-[#116832] transition hover:-translate-y-0.5 hover:bg-[#f3fbf5]"

export function ProblemPageTemplate({
  eyebrow,
  title,
  intro,
  symptomsTitle = "Symptoms that usually mean office drag is costing capacity",
  symptoms,
  costTitle,
  costBody,
  before,
  after,
  fixTitle,
  fixes,
  related = [],
}: ProblemPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#F7F4EC] text-[#102033]">
      <section className={`${shell} pt-20 pb-12 lg:pt-24 lg:pb-16`}>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h1 className="max-w-5xl text-[2.25rem] font-semibold leading-[0.98] tracking-[-0.045em] text-[#071D3A] sm:text-[3.4rem] lg:text-[4.15rem]">{title}</h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-[#42596C]">{intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/workflow-audit" className={primaryButton}>Book the $197 AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/invoicing-delay-cash-flow-calculator" className={secondaryButton}>Calculate Your Admin Drag</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-[#DDEBE2] bg-white p-5 shadow-[0_24px_70px_rgba(7,29,58,0.08)]">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#071D3A]">{symptomsTitle}</h2>
            <ul className="mt-5 space-y-3">
              {symptoms.map((symptom) => (
                <li key={symptom} className="flex gap-3 rounded-2xl bg-[#F7FBF8] p-3 text-sm font-semibold leading-6 text-[#34495F]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#15803D]" />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${shell} py-8`}>
        <div className="rounded-[2rem] bg-[#071D3A] p-6 text-white shadow-[0_24px_70px_rgba(7,29,58,0.16)] sm:p-8 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10">
          <div>
            <h2 className="text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[3rem]">{costTitle}</h2>
          </div>
          <p className="mt-5 text-lg font-medium leading-8 text-[#DDEBE2] lg:mt-0">{costBody}</p>
        </div>
      </section>

      <section className={`${shell} py-10 lg:py-14`}>
        <div className="grid gap-4 lg:grid-cols-2">
          <WorkflowColumn label="Before" items={before} tone="before" />
          <WorkflowColumn label="After Stanley Systems" items={after} tone="after" />
        </div>
      </section>

      <section className={`${shell} pb-12 lg:pb-16`}>
        <div className="grid gap-8 rounded-[2rem] border border-[#DDEBE2] bg-white p-6 shadow-[0_18px_54px_rgba(7,29,58,0.06)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-[2rem] font-semibold leading-[1.03] tracking-[-0.04em] text-[#071D3A] sm:text-[2.75rem]">{fixTitle}</h2>
            <Link href="/workflow-audit" className={`mt-6 ${primaryButton}`}>Book the $197 AI Office Map</Link>
          </div>
          <ul className="space-y-3">
            {fixes.map((fix) => (
              <li key={fix} className="border-b border-[#E5EEE7] pb-3 text-base font-semibold leading-7 text-[#34495F] last:border-b-0 last:pb-0">{fix}</li>
            ))}
          </ul>
        </div>
        {related.length > 0 && (
          <div className="mt-8 rounded-[1.5rem] border border-[#DDEBE2] bg-[#FBFCF7] p-5">
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {related.slice(0, 3).map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-bold text-[#116832] underline underline-offset-4">{link.title}</Link>
              ))}
            </div>
          </div>
        )}
      </section>
      </main>
      <Footer />
    </>
  )
}

function WorkflowColumn({ label, items, tone }: { label: string; items: string[]; tone: "before" | "after" }) {
  return (
    <div className={`rounded-[2rem] border p-5 sm:p-6 ${tone === "before" ? "border-[#E8D9CC] bg-[#FFF7F0]" : "border-[#CFE8D5] bg-[#F4FBF5]"}`}>
      <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[#071D3A]">{label}</h2>
      <ol className="mt-5 space-y-3">
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-[#34495F]">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${tone === "before" ? "bg-[#F0DDD0] text-[#7A3F20]" : "bg-[#DDF3E3] text-[#116832]"}`}>{index + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
