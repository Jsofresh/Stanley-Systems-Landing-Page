import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowRight, Check, ClipboardList, Download, FileText, MessageSquareText, Sparkles, TrendingUp, Users, Zap } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { BlueprintIntakeForm } from "@/components/ai-office-blueprint/blueprint-intake-form"

const contentShell = "mx-auto w-full max-w-[1420px]"

const heroBackground = {
  src: "/images/uploaded/ai-office-blueprint/dark-workflow-forms-green-glow-v3.jpg",
  alt: "Dark workflow forms with a green glow",
}

const blueprintRows = [
  { icon: Users, label: "2 to 3 AI staff plays based on your workflow" },
  { icon: MessageSquareText, label: "Copy/paste prompts your team can use immediately" },
  { icon: Zap, label: "One quick capacity win" },
  { icon: TrendingUp, label: "The best next workflow to improve" },
]

const guideFixes = [
  "Clean messy tech notes into billing-ready summaries",
  "Spot invoice blockers before cash gets stuck",
  "Turn stale estimates into a daily follow-up queue",
  "Rewrite customer replies without sounding robotic",
  "Find the office drag hiding in inboxes and spreadsheets",
  "Give each role a simple AI cheat sheet",
  "Map the workflow before buying another tool",
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
        <section data-nav-theme="dark" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#071D3A] pb-10 pt-24 text-white sm:pt-28 lg:pb-5 lg:pt-20">
          <Image src={heroBackground.src} alt="" fill priority sizes="100vw" className="-z-30 object-cover object-center" aria-hidden="true" />
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_83%,rgba(28,181,82,0.34),transparent_12%),radial-gradient(ellipse_at_80%_96%,rgba(36,212,98,0.72),transparent_31%),radial-gradient(ellipse_at_76%_28%,rgba(186,247,190,0.14),transparent_25%),linear-gradient(90deg,rgba(5,16,29,0.94)_0%,rgba(6,20,35,0.84)_36%,rgba(7,29,58,0.27)_58%,rgba(7,29,58,0)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-20 h-[34%] bg-[linear-gradient(0deg,rgba(6,18,31,0.72)_0%,rgba(6,18,31,0)_100%)]" />
          <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,570px)_minmax(390px,500px)] lg:items-center lg:gap-16 lg:px-8 xl:gap-20">
            <div className="max-w-[570px]">
              <h1 className="max-w-[560px] text-[3.35rem] font-semibold leading-[1.04] tracking-normal text-white sm:text-[4.35rem] lg:text-[3.35rem] lg:leading-[1.02] xl:text-[3.55rem] 2xl:text-[4rem]">Get the Free AI Office Blueprint</h1>
              <p className="mt-5 max-w-[545px] text-[1.08rem] font-medium leading-[1.6] tracking-normal text-white/86 sm:text-[1.17rem] lg:text-[1.04rem] lg:leading-[1.55]">Download the generic AI Office Blueprint first. Then answer 16 workflow questions and we will email a custom PDF with staff plays, copy/paste prompts, quick capacity wins, and workflow fixes based on your answers.</p>
              <div className="mt-5 grid max-w-[570px] gap-2.5 sm:grid-cols-2">
                {blueprintRows.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex min-h-[52px] items-center gap-3 rounded-2xl border border-white/14 bg-white/[0.09] px-3.5 py-2.5 text-[13.5px] font-semibold leading-[1.3] tracking-normal text-white shadow-[0_16px_36px_rgba(0,0,0,0.14)] backdrop-blur-sm">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#1FB957] text-white shadow-[0_10px_24px_rgba(31,185,87,0.34)]"><Icon className="h-[17px] w-[17px]" /></span>
                    <span className="min-w-0">{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={genericBlueprintPdf} download className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-white px-7 py-3 text-base font-bold text-[#071D3A] shadow-[0_18px_44px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5">
                  Download the free PDF <Download className="ml-3 h-5 w-5" />
                </a>
                <a href="#blueprint-form" className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#1FB957_0%,#138A3B_100%)] px-7 py-3 text-base font-bold text-white shadow-[0_22px_56px_rgba(27,196,85,0.5)] transition hover:-translate-y-0.5 hover:bg-[#116832]">Get the custom version <ArrowRight className="ml-3 h-5 w-5" /></a>
              </div>
            </div>
            <div className="relative mx-auto hidden h-[410px] w-full max-w-[480px] lg:block xl:h-[430px] xl:max-w-[500px]">
              <div className="absolute -right-1 top-[30px] h-[92px] w-[178px] rounded-[22px] border border-white/12 bg-white/[0.09] shadow-[0_18px_38px_rgba(0,0,0,0.14)] backdrop-blur-md" />
              <div className="absolute right-[310px] top-[156px] hidden h-[220px] w-[136px] -rotate-[5deg] overflow-hidden rounded-[14px] border border-white/10 bg-white/38 shadow-[0_22px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm xl:block">
                <div className="bg-[#173D38] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.09em] text-white/85">AI Office Blueprint</div>
                <div className="space-y-5 px-5 py-5 text-[#0F2434]/45">
                  <div className="h-3 w-24 rounded-full bg-[#0F2434]/18" />
                  <div className="space-y-2"><div className="h-2 w-20 rounded-full bg-[#0F2434]/12" /><div className="h-2 w-24 rounded-full bg-[#0F2434]/10" /><div className="h-2 w-16 rounded-full bg-[#0F2434]/10" /></div>
                  <div className="space-y-2.5 pt-2">{["Billing Prep", "Follow-Up", "Handoffs"].map((item) => <div key={item} className="flex items-center gap-2 text-[8px] font-bold"><span className="grid h-4 w-4 place-items-center rounded-full bg-[#138A3B]/18 text-[#138A3B]"><Check className="h-2.5 w-2.5" /></span>{item}</div>)}</div>
                </div>
              </div>
              <div className="absolute right-0 top-7 h-[368px] w-[440px] rounded-[26px] border border-[#EAF1E3] bg-[#FAFAF1] p-[26px] text-[#071D3A] shadow-[0_34px_90px_rgba(0,0,0,0.28),0_0_58px_rgba(185,246,190,0.26)] xl:h-[384px] xl:w-[470px] xl:p-[28px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-[35px] w-[35px] place-items-center rounded-[10px] bg-white text-[#138A3B] shadow-[0_10px_22px_rgba(21,128,61,0.12)]"><FileText className="h-5 w-5" /></span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#138A3B]">Blueprint Output</span>
                  </div>
                  <Sparkles className="h-7 w-7 text-[#138A3B]" />
                </div>
                <div className="pointer-events-none absolute right-10 top-[34px] h-[68px] w-[96px] opacity-[0.09] [background:linear-gradient(#138A3B,#138A3B)_8px_14px/32px_1px_no-repeat,linear-gradient(#138A3B,#138A3B)_38px_36px/44px_1px_no-repeat,linear-gradient(#138A3B,#138A3B)_22px_56px/60px_1px_no-repeat]" />
                <h2 className="mt-5 max-w-[390px] text-[24px] font-semibold leading-[1.22] tracking-normal text-[#071D3A] xl:max-w-[420px] xl:text-[27px]">Custom plays, prompts, and one capacity win.</h2>
                <div className="mt-4 space-y-2.5">
                  {blueprintRows.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex min-h-[48px] items-center gap-3 rounded-[14px] bg-white px-4 py-2 text-[13px] font-semibold leading-[1.35] tracking-normal text-[#071D3A] shadow-[0_14px_28px_rgba(7,29,58,0.08)] xl:min-h-[50px] xl:text-[14px]">
                      <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[11px] bg-[#E6F5E8] text-[#138A3B]"><Icon className="h-[18px] w-[18px]" /></span>
                      <span className="min-w-0">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-[24px] right-[34px] grid h-11 w-11 place-items-center rounded-full bg-[#18A34A] text-white shadow-[0_12px_26px_rgba(24,163,74,0.34)]"><Check className="h-6 w-6" /></div>
            </div>
          </div>
        </section>

        <section data-motion-exempt className="px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pb-36 lg:pt-16">
          <div className={`${contentShell} space-y-12`}>
            <section aria-labelledby="generic-blueprint-heading" className="mx-auto grid w-full overflow-hidden rounded-[2.2rem] border border-[#CFE8D5] bg-white shadow-[0_24px_74px_rgba(7,29,58,0.08)] lg:grid-cols-[0.78fr_1.22fr]">
              <div className="relative overflow-hidden bg-[#071D3A] p-6 text-white sm:p-8 lg:p-10">
                <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-[#1FB957]/25 blur-3xl" />
                <p className="relative text-sm font-black uppercase tracking-[0.18em] text-[#8EF0A7]">Free thing 1</p>
                <h2 id="generic-blueprint-heading" className="relative mt-3 max-w-xl text-[2.35rem] font-semibold leading-[0.96] tracking-[-0.055em] sm:text-[3.2rem]">Download the generic AI Office Blueprint.</h2>
                <p className="relative mt-4 max-w-xl text-base font-semibold leading-7 text-white/78 sm:text-lg">This is the polished 7 AI Office Fixes PDF. No form required. Use it immediately, then answer the questionnaire to get the custom version built around your office.</p>
                <a href={genericBlueprintPdf} download className="relative mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-extrabold text-[#071D3A] shadow-[0_18px_44px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5">
                  Download PDF <Download className="ml-2 h-4 w-4" />
                </a>
              </div>
              <div className="grid gap-3 bg-[#F7FBF6] p-5 sm:p-7 lg:grid-cols-2 lg:p-8">
                <div className="rounded-3xl border border-[#DDEBE2] bg-white p-5 shadow-[0_14px_30px_rgba(7,29,58,0.06)] lg:row-span-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#E6F5E8] text-[#116832]"><FileText className="h-6 w-6" /></span>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#116832]">PDF guide</p>
                      <h3 className="text-xl font-black tracking-[-0.04em] text-[#071D3A]">7 AI Office Fixes</h3>
                    </div>
                  </div>
                  <p className="mt-5 text-sm font-semibold leading-6 text-[#536173]">The generic version gives any service business useful AI office tips. The custom version below uses the questionnaire to make those ideas specific to their tools, staff work, billing drag, follow-up gaps, and messy examples.</p>
                  <a href="#blueprint-form" className="mt-5 inline-flex items-center text-sm font-black text-[#116832]">Go to the custom questionnaire <ArrowRight className="ml-2 h-4 w-4" /></a>
                </div>
                {guideFixes.map((fix, index) => (
                  <div key={fix} className="flex min-h-[70px] gap-3 rounded-2xl border border-[#DDEBE2] bg-white p-4 shadow-[0_10px_24px_rgba(7,29,58,0.05)]">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E6F5E8] text-sm font-black text-[#116832]">{index + 1}</span>
                    <p className="text-[15px] font-extrabold leading-5 tracking-[-0.015em] text-[#071D3A]">{fix}</p>
                  </div>
                ))}
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
