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
        <section data-nav-theme="light" className="bg-[#FBFAF6] pt-24 text-[#071D3A] sm:pt-28 lg:pt-20">
          <div className="relative isolate mx-auto flex min-h-[640px] w-full max-w-[1280px] items-center overflow-hidden px-5 pb-12 sm:px-10 lg:px-[84px]">
            <Image
              src="/images/uploaded/ai-office-blueprint/ai-office-blueprint-mockup.jpg"
              alt=""
              fill
              priority
              sizes="1280px"
              className="-z-20 object-cover object-center"
              aria-hidden="true"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.90)_39%,rgba(255,255,255,0.03)_56%,rgba(255,255,255,0)_100%)]" />
            <div className="relative z-10 max-w-[470px] py-8 lg:py-0">
              <h1 className="text-[2.95rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#071D3A] sm:text-[3.45rem] lg:text-[3.35rem] xl:text-[3.55rem]">
                Get the Free
                <br />
                AI Office Blueprint
              </h1>
              <div className="mt-5 h-[3px] w-[52px] rounded-full bg-[#15803D]" />
              <p className="mt-5 max-w-[420px] text-[1rem] font-medium leading-[1.62] tracking-normal text-[#425168] sm:text-[1.05rem]">
                Start with the free blueprint. Answer 16 workflow questions. Get custom staff plays, copy/paste prompts, and one quick win.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {heroChips.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex min-h-[60px] w-[136px] items-center gap-2.5 rounded-xl border border-[#E4E8DF] bg-white px-3.5 py-3 text-[13px] font-bold leading-[1.12] tracking-normal text-[#071D3A] shadow-[0_10px_24px_rgba(7,29,58,0.055)]">
                    <Icon className="h-5 w-5 shrink-0 text-[#15803D]" strokeWidth={1.8} />
                    <span className="min-w-0">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={genericBlueprintPdf} download className="inline-flex h-[54px] items-center justify-center gap-3 rounded-xl border border-[#DDE5DA] bg-white px-5 text-[14px] font-bold text-[#071D3A] shadow-[0_10px_24px_rgba(7,29,58,0.06)] transition hover:-translate-y-0.5">
                  <Download className="h-5 w-5" />
                  Download free PDF
                </a>
                <a href="#blueprint-form" className="inline-flex h-[54px] items-center justify-center rounded-xl bg-[#15803D] px-5 text-[14px] font-bold text-white shadow-[0_14px_30px_rgba(21,128,61,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116832]">
                  Get custom version <ArrowRight className="ml-3 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section data-motion-exempt className="px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pb-36 lg:pt-16">
          <div className={`${contentShell} space-y-12`}>
            <section aria-labelledby="generic-blueprint-heading" className="relative isolate mx-auto flex min-h-[620px] w-full overflow-hidden bg-white sm:min-h-[640px] lg:aspect-[16/9] lg:min-h-0">
              <Image
                src="/images/uploaded/ai-office-blueprint/ai-office-blueprint.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 1420px, 100vw"
                className="z-0 object-cover object-[70%_center] lg:object-center"
                aria-hidden="true"
              />
              <div className="absolute inset-0 z-10 bg-white/88 sm:hidden" />
              <div className="absolute inset-0 z-10 hidden sm:block sm:bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.84)_35%,rgba(255,255,255,0.04)_49%,rgba(255,255,255,0)_100%)]" />
              <div className="relative z-20 flex w-full max-w-[620px] flex-col justify-center px-7 py-12 sm:px-12 lg:justify-start lg:px-[6.2%] lg:py-[8%]">
                <p className="w-fit rounded-full border border-[#15803D] bg-white/82 px-5 py-2 text-[13px] font-black uppercase tracking-[0.15em] text-[#15803D] sm:px-7 sm:py-2.5 sm:text-[15px]">FREE THING 1</p>
                <h2 id="generic-blueprint-heading" className="mt-7 max-w-[620px] text-[2.9rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-[#071D3A] sm:text-[3.55rem] lg:text-[3.65rem]">
                  Download the
                  <br />
                  generic <span className="text-[#13A538]">AI Office</span>
                  <br />
                  <span className="text-[#13A538]">Blueprint.</span>
                </h2>
                <p className="mt-5 max-w-[500px] text-[1.35rem] font-normal leading-[1.35] text-[#071D3A] sm:text-[1.55rem]">7 practical fixes you can use in your office today.</p>
                <a href={genericBlueprintPdf} download className="mt-8 inline-flex h-[62px] w-fit min-w-[240px] items-center justify-center gap-4 rounded-[13px] bg-[#13A538] px-7 text-[1.25rem] font-medium text-white shadow-[0_16px_34px_rgba(19,165,56,0.24)] transition hover:-translate-y-0.5 hover:bg-[#118E31] sm:h-[66px] sm:min-w-[283px] sm:text-[1.5rem]">
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
