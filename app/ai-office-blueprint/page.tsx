import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowRight, ClipboardList, Download, MessageSquareText, Sparkles, Zap } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { BlueprintIntakeForm } from "@/components/ai-office-blueprint/blueprint-intake-form"

const contentShell = "mx-auto w-full max-w-[1420px]"

const heroChips = [
  { icon: Sparkles, label: "Custom staff plays" },
  { icon: MessageSquareText, label: "Copy/paste prompts" },
  { icon: Zap, label: "One quick win" },
]

const genericBlueprintPdf = "/downloads/ai-office-blueprint/7-ai-office-fixes.pdf"

export const metadata: Metadata = {
  title: "Free AI Office Blueprint | Stanley Systems",
  description: "Get a custom AI Office Blueprint with practical AI staff plays, copy/paste prompts, a quick capacity win, and the best office workflow to improve first.",
}

export default function AiOfficeBlueprintPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen overflow-x-hidden bg-[#FBF8F2] text-[#071D3A]">
        <section data-nav-theme="light" className="relative isolate overflow-hidden bg-[#FBFAF6] pt-24 text-[#071D3A] sm:pt-28 lg:pt-16">
          <Image
            src="/images/uploaded/ai-office-blueprint/ai-office-blueprint-hero-wide.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-30 object-cover object-[82%_center] sm:object-[76%_48%] lg:object-[72%_48%]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.95)_34%,rgba(255,255,255,0.58)_55%,rgba(255,255,255,0.08)_82%,rgba(255,255,255,0)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent via-[#FBFAF6]/84 to-[#F4EFE8]" />
          <div className="relative z-10 mx-auto flex min-h-[590px] w-full max-w-[1420px] items-start px-5 pb-16 pt-14 sm:min-h-[640px] sm:px-10 sm:pt-20 lg:min-h-[700px] lg:px-[84px] lg:pb-24 lg:pt-[104px] xl:min-h-[720px] xl:pt-[118px]">
            <div className="max-w-[520px]">
              <h1 className="text-[2.8rem] font-bold leading-[1.01] tracking-[-0.024em] text-[#071D3A] sm:text-[3.25rem] lg:text-[3.45rem] xl:text-[3.75rem]">
                Get the Free
                <br />
                AI Office Blueprint
              </h1>
              <div className="mt-4 h-[3px] w-[58px] rounded-full bg-[#15803D]" />
              <p className="mt-4 max-w-[455px] text-[1rem] font-medium leading-[1.5] tracking-normal text-[#425168] sm:text-[1.05rem]">
                Start with the free blueprint. Answer 16 workflow questions. Get custom staff plays, copy/paste prompts, and one quick win.
              </p>
              <div className="mt-5 flex w-full max-w-[510px] flex-col overflow-hidden rounded-2xl border border-[#E0E8DD] bg-white/86 shadow-[0_18px_44px_rgba(7,29,58,0.07)] backdrop-blur-sm sm:flex-row">
                {heroChips.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex min-h-[54px] flex-1 items-center gap-2.5 border-[#E0E8DD] px-4 py-2.5 text-[13px] font-bold leading-[1.12] tracking-normal text-[#071D3A] sm:border-l sm:first:border-l-0">
                    <Icon className="h-5 w-5 shrink-0 text-[#15803D]" strokeWidth={1.8} />
                    <span className="min-w-0">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={genericBlueprintPdf} download className="inline-flex h-[52px] items-center justify-center gap-3 rounded-2xl border border-[#DDE5DA] bg-white/92 px-6 text-[14px] font-bold text-[#071D3A] shadow-[0_12px_28px_rgba(7,29,58,0.065)] backdrop-blur-sm transition hover:-translate-y-0.5">
                  <Download className="h-5 w-5" />
                  Download free PDF
                </a>
                <a href="#blueprint-form" className="inline-flex h-[52px] items-center justify-center rounded-2xl bg-[#15803D] px-6 text-[14px] font-bold text-white shadow-[0_16px_34px_rgba(21,128,61,0.24)] transition hover:-translate-y-0.5 hover:bg-[#116832]">
                  Get custom version <ArrowRight className="ml-3 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section data-motion-exempt className="bg-[#F4EFE8] px-4 pb-24 pt-10 sm:px-6 lg:px-8 lg:pb-36 lg:pt-14">
          <div className={`${contentShell} space-y-12`}>
            <section aria-labelledby="generic-blueprint-heading" className="relative left-1/2 isolate mx-0 flex min-h-[570px] w-screen -translate-x-1/2 overflow-hidden bg-[#F8F4EC] sm:min-h-[610px] lg:min-h-[620px]">
              <Image
                src="/images/uploaded/ai-office-blueprint/ai-office-blueprint-book-cover-wide.jpg"
                alt=""
                fill
                sizes="100vw"
                className="z-0 object-cover object-[76%_center] sm:object-[73%_center] lg:object-[72%_center]"
                aria-hidden="true"
              />
              <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(248,244,236,0.99)_0%,rgba(248,244,236,0.94)_58%,rgba(248,244,236,0.68)_100%)] sm:bg-[linear-gradient(90deg,rgba(248,244,236,0.99)_0%,rgba(248,244,236,0.92)_32%,rgba(248,244,236,0.32)_54%,rgba(248,244,236,0.04)_76%,rgba(248,244,236,0)_100%)]" />
              <div className="absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#F4EFE8] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#F4EFE8] to-transparent" />
              <div className="relative z-20 mx-auto flex w-full max-w-[1420px] flex-col justify-center px-7 py-12 sm:px-12 lg:px-[84px] lg:py-[7%]">
                <p className="w-fit rounded-full border border-[#15803D]/35 bg-white/82 px-5 py-2 text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#15803D] shadow-[0_10px_24px_rgba(7,29,58,0.05)] sm:px-6 sm:py-2.5 sm:text-[13px]">FREE THING 1</p>
                <h2 id="generic-blueprint-heading" className="mt-7 max-w-[620px] text-[2.75rem] font-bold leading-[1.03] tracking-[-0.028em] text-[#071D3A] sm:text-[3.45rem] lg:text-[3.85rem]">
                  Download the
                  <br />
                  generic <span className="text-[#13A538]">AI Office</span>
                  <br />
                  <span className="text-[#13A538]">Blueprint.</span>
                </h2>
                <p className="mt-5 max-w-[500px] text-[1.25rem] font-medium leading-[1.38] text-[#071D3A] sm:text-[1.45rem]">7 practical fixes you can use in your office today.</p>
                <a href={genericBlueprintPdf} download className="mt-8 inline-flex h-[60px] w-fit min-w-[236px] items-center justify-center gap-4 rounded-2xl bg-[#13A538] px-7 text-[1.15rem] font-semibold text-white shadow-[0_16px_34px_rgba(19,165,56,0.24)] transition hover:-translate-y-0.5 hover:bg-[#118E31] sm:h-[64px] sm:min-w-[276px] sm:text-[1.35rem]">
                  Download PDF <Download className="h-6 w-6" />
                </a>
              </div>
            </section>

            <section id="blueprint-form" className="scroll-mt-56 lg:scroll-mt-60" aria-labelledby="custom-blueprint-heading">
              <div className="mx-auto mb-7 w-full max-w-4xl text-center">
                <h2 id="custom-blueprint-heading" className="text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[#071D3A] sm:text-[3.35rem]">Get the custom AI Office Blueprint.</h2>
                <p className="mx-auto mt-3 max-w-3xl text-base font-semibold leading-7 text-[#536173]">Answer 16 focused questions. Stanley Systems uses your answers to build a bespoke PDF with prompts, workflow changes, and staff-ready AI plays for your exact office bottlenecks.</p>
              </div>
              <div className="mx-auto w-full">
                <BlueprintIntakeForm />
              </div>
            </section>

            <aside className="mx-auto grid w-full gap-5 rounded-[1.75rem] border border-[#CFE8D5] bg-[#EEF8EE] p-5 sm:p-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#116832] shadow-[0_14px_28px_rgba(7,29,58,0.07)]"><ClipboardList className="h-7 w-7" /></span>
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">Why the questionnaire matters</h2>
                <p className="mt-1 text-base font-semibold leading-7 text-[#536173]">The generic PDF helps anyone. The custom PDF uses the 16 answers to produce prompts and workflows around the user’s tools, stuck points, billing drag, follow-up gaps, and real messy office example.</p>
              </div>
              <Link href="/workflow-audit" className="inline-flex items-center text-sm font-extrabold text-[#116832] lg:justify-self-end">Need the full Map instead? <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
