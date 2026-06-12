import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowRight, Check, ClipboardList, FileText, MessageSquareText, Sparkles, TrendingUp, Users, Zap } from "lucide-react"
import { SiteHeader } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { BlueprintIntakeForm } from "@/components/ai-office-blueprint/blueprint-intake-form"

const shell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"

const heroBackground = {
  src: "/images/uploaded/ai-office-blueprint/dark-workflow-forms-green-glow-v3.jpg",
  alt: "Dark workflow forms with a green glow",
}

const blueprintRows = [
  { icon: Users, label: "2–3 AI staff plays based on your workflow" },
  { icon: MessageSquareText, label: "Copy/paste prompts your team can use immediately" },
  { icon: Zap, label: "One quick capacity win" },
  { icon: TrendingUp, label: "The best next workflow to improve" },
]

export const metadata: Metadata = {
  title: "Free AI Office Blueprint | Stanley Systems",
  description: "Get a custom AI Office Blueprint with practical AI staff plays, copy/paste prompts, a quick capacity win, and the best office workflow to improve first.",
}

export default function AiOfficeBlueprintPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#FBF8F2] text-[#071D3A]">
        <section data-nav-theme="dark" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#071D3A] pb-10 pt-24 text-white sm:pt-28 lg:pb-5 lg:pt-20">
          <Image src={heroBackground.src} alt="" fill priority sizes="100vw" className="-z-30 object-cover object-center" aria-hidden="true" />
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_83%,rgba(28,181,82,0.34),transparent_12%),radial-gradient(ellipse_at_80%_96%,rgba(36,212,98,0.72),transparent_31%),radial-gradient(ellipse_at_76%_28%,rgba(186,247,190,0.14),transparent_25%),linear-gradient(90deg,rgba(5,16,29,0.94)_0%,rgba(6,20,35,0.84)_36%,rgba(7,29,58,0.27)_58%,rgba(7,29,58,0)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-20 h-[34%] bg-[linear-gradient(0deg,rgba(6,18,31,0.72)_0%,rgba(6,18,31,0)_100%)]" />
          <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,570px)_minmax(390px,480px)] lg:items-center lg:gap-16 lg:px-8 xl:gap-20 xl:px-0">
            <div className="max-w-[570px]">
              <h1 className="max-w-[560px] text-[3.35rem] font-semibold leading-[1.04] tracking-normal text-white sm:text-[4.35rem] lg:text-[3.35rem] lg:leading-[1.02] xl:text-[3.55rem] 2xl:text-[4rem]">Get the Free AI Office Blueprint</h1>
              <p className="mt-5 max-w-[545px] text-[1.08rem] font-medium leading-[1.6] tracking-normal text-white/86 sm:text-[1.17rem] lg:text-[1.04rem] lg:leading-[1.55]">Answer the short office workflow form. We’ll turn the messy details into a custom Blueprint with AI staff plays, copy/paste prompts, one quick capacity win, and the next workflow worth fixing first.</p>
              <div className="mt-5 grid max-w-[570px] gap-2.5 sm:grid-cols-2">
                {blueprintRows.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex min-h-[52px] items-center gap-3 rounded-2xl border border-white/14 bg-white/[0.09] px-3.5 py-2.5 text-[13.5px] font-semibold leading-[1.3] tracking-normal text-white shadow-[0_16px_36px_rgba(0,0,0,0.14)] backdrop-blur-sm">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#1FB957] text-white shadow-[0_10px_24px_rgba(31,185,87,0.34)]"><Icon className="h-[17px] w-[17px]" /></span>
                    <span className="min-w-0">{label}</span>
                  </div>
                ))}
              </div>
              <a href="#blueprint-form" className="mt-5 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#1FB957_0%,#138A3B_100%)] px-7 py-3 text-base font-bold text-white shadow-[0_22px_56px_rgba(27,196,85,0.5)] transition hover:-translate-y-0.5 hover:bg-[#116832]">Start the Blueprint <ArrowRight className="ml-3 h-5 w-5" /></a>
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

        <section data-motion-exempt className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div id="blueprint-form" className="scroll-mt-28 lg:scroll-mt-28">
              <div className="mx-auto w-full lg:w-[78vw] lg:max-w-[1500px]">
                <BlueprintIntakeForm />
              </div>
            </div>
            <aside className="mx-auto mt-8 grid w-full gap-5 rounded-[1.75rem] border border-[#CFE8D5] bg-[#EEF8EE] p-5 sm:p-6 lg:w-[78vw] lg:max-w-[1500px] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#116832] shadow-[0_14px_28px_rgba(7,29,58,0.07)]"><ClipboardList className="h-7 w-7" /></span>
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">What the form gives us</h2>
                <p className="mt-1 text-base font-semibold leading-7 text-[#536173]">Specific tools, stuck points, staff cleanup work, billing drag, missed follow-up, and one messy example — enough detail to make the first Blueprint useful instead of generic.</p>
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
