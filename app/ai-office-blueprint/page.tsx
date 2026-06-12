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
        <section data-nav-theme="dark" className="relative isolate flex min-h-[clamp(430px,33.3vw,560px)] items-center overflow-hidden bg-[#071D3A] pb-8 pt-24 text-white sm:pt-28 lg:pb-0 lg:pt-20">
          <Image src={heroBackground.src} alt="" fill priority sizes="100vw" className="-z-30 object-cover object-center" aria-hidden="true" />
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_83%,rgba(28,181,82,0.34),transparent_12%),radial-gradient(ellipse_at_80%_96%,rgba(36,212,98,0.72),transparent_31%),radial-gradient(ellipse_at_76%_28%,rgba(186,247,190,0.14),transparent_25%),linear-gradient(90deg,rgba(5,16,29,0.94)_0%,rgba(6,20,35,0.84)_36%,rgba(7,29,58,0.27)_58%,rgba(7,29,58,0)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-20 h-[34%] bg-[linear-gradient(0deg,rgba(6,18,31,0.72)_0%,rgba(6,18,31,0)_100%)]" />
          <div className="mx-auto grid w-full max-w-[1070px] gap-8 px-4 sm:px-6 lg:grid-cols-[560px_minmax(0,1fr)] lg:items-center lg:px-0">
            <div className="max-w-[500px]">
              <h1 className="max-w-[430px] text-[3.1rem] font-semibold leading-[0.94] tracking-[-0.035em] text-white sm:text-[3.25rem] lg:text-[3.25rem]">Get the Free AI Office Blueprint</h1>
              <p className="mt-5 max-w-[486px] text-[0.98rem] font-semibold leading-[1.52] text-white/88 sm:text-[1rem]">Fill out one focused office workflow form. We’ll send back a custom AI Office Blueprint with practical AI staff plays for real office work — billing prep, follow-up, handoffs, job notes, customer replies, Excel, and admin cleanup.</p>
              <a href="#blueprint-form" className="mt-5 inline-flex min-h-[43px] items-center justify-center rounded-full bg-[linear-gradient(180deg,#1FB957_0%,#138A3B_100%)] px-6 py-3 text-sm font-extrabold text-white shadow-[0_18px_46px_rgba(27,196,85,0.48)] transition hover:-translate-y-0.5 hover:bg-[#116832]">Get My Free Blueprint <ArrowRight className="ml-4 h-4 w-4" /></a>
            </div>
            <div className="relative mx-auto hidden h-[365px] w-full max-w-[510px] lg:-mt-12 lg:block">
              <div className="absolute left-[-107px] top-[62px] h-[255px] w-[148px] -rotate-[8deg] overflow-hidden rounded-[9px] border border-white/10 bg-white/48 shadow-[0_22px_50px_rgba(0,0,0,0.22)] backdrop-blur-sm">
                <div className="bg-[#173D38] px-5 py-3 text-[9px] font-bold uppercase tracking-[0.09em] text-white/85">AI Office Blueprint</div>
                <div className="space-y-5 px-5 py-5 text-[#0F2434]/45">
                  <div className="h-3 w-24 rounded-full bg-[#0F2434]/18" />
                  <div className="space-y-2"><div className="h-2 w-20 rounded-full bg-[#0F2434]/12" /><div className="h-2 w-24 rounded-full bg-[#0F2434]/10" /><div className="h-2 w-16 rounded-full bg-[#0F2434]/10" /></div>
                  <div className="space-y-2.5 pt-2">{["Billing Prep", "Follow-Up", "Handoffs"].map((item) => <div key={item} className="flex items-center gap-2 text-[8px] font-bold"><span className="grid h-4 w-4 place-items-center rounded-full bg-[#138A3B]/18 text-[#138A3B]"><Check className="h-2.5 w-2.5" /></span>{item}</div>)}</div>
                </div>
              </div>
              <div className="absolute left-[10px] top-[-23px] h-[365px] w-[463px] rounded-[15px] border border-[#EAF1E3] bg-[#FAFAF1] p-[26px_23px_24px] text-[#071D3A] shadow-[0_24px_80px_rgba(0,0,0,0.30),0_0_58px_rgba(185,246,190,0.36)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-[35px] w-[35px] place-items-center rounded-[10px] bg-white text-[#138A3B] shadow-[0_10px_22px_rgba(21,128,61,0.12)]"><FileText className="h-5 w-5" /></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.03em] text-[#138A3B]">Blueprint Output</span>
                  </div>
                  <Sparkles className="h-8 w-8 text-[#138A3B]" />
                </div>
                <div className="pointer-events-none absolute right-10 top-[36px] h-[78px] w-[112px] opacity-[0.13] [background:linear-gradient(#138A3B,#138A3B)_8px_14px/38px_1px_no-repeat,linear-gradient(#138A3B,#138A3B)_44px_40px/52px_1px_no-repeat,linear-gradient(#138A3B,#138A3B)_24px_62px/72px_1px_no-repeat]" />
                <h2 className="mt-5 max-w-[385px] text-[26px] font-black leading-[1.05] tracking-[-0.045em] text-[#071D3A]">Custom plays, prompts, and one capacity win.</h2>
                <div className="mt-5 space-y-[7px]">
                  {blueprintRows.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex h-[45px] items-center gap-4 rounded-[7px] bg-white px-3.5 text-[12px] font-black text-[#071D3A] shadow-[0_10px_22px_rgba(7,29,58,0.07)]">
                      <span className="grid h-[31px] w-[31px] shrink-0 place-items-center rounded-[7px] bg-[#E6F5E8] text-[#138A3B]"><Icon className="h-5 w-5" /></span>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute left-[440px] top-[136px] h-[176px] w-[126px] rotate-[8deg] overflow-hidden rounded-[9px] border border-white/50 bg-white/75 shadow-[0_22px_46px_rgba(0,0,0,0.2)] backdrop-blur-sm">
                <div className="px-5 pt-7 text-[10px] font-bold text-[#536173]/70">Sample AI Play</div>
                <div className="space-y-3 px-5 pt-5"><div className="h-2 w-20 rounded-full bg-[#536173]/16" /><div className="h-2 w-16 rounded-full bg-[#536173]/13" /><div className="h-2 w-20 rounded-full bg-[#536173]/13" /></div>
                <div className="absolute bottom-7 right-4 grid h-12 w-12 place-items-center rounded-[10px] bg-[#18A34A] text-2xl font-black text-white">X</div>
              </div>
              <div className="absolute bottom-[-8px] left-[493px] grid h-10 w-10 place-items-center rounded-full bg-[#18A34A] text-white shadow-[0_12px_26px_rgba(24,163,74,0.38)]"><Check className="h-6 w-6" /></div>
            </div>
          </div>
        </section>

        <section data-motion-exempt className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div id="blueprint-form" className="scroll-mt-44 lg:scroll-mt-48">
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
