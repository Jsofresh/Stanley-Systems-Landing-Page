import Image from "next/image"
import type { ReactNode } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { SoftwareLogoMarquee } from "@/components/home/software-logo-marquee"

const calculatorHref = "/invoicing-delay-cash-flow-calculator"
const mapHref = "/workflow-audit"
const sprintHref = "/systems-installation-sprint"
const pricingHref = "/pricing"

const heroSlideshowImages = [
  { src: "/images/uploaded/homepage/hero-slideshow/hero-tech-van-outside.jpg", alt: "Service technician van outside a customer location", objectPosition: "60% center" },
  { src: "/images/uploaded/homepage/hero-slideshow/hero-payment-confirmation-office.jpg", alt: "Service business office processing completed work", objectPosition: "center" },
  { src: "/images/uploaded/homepage/hero-slideshow/hero-tech-van-outside.jpg", alt: "Service business owner reviewing office work", objectPosition: "center" },
]

const mobileHeroSlideshowImages = [
  { src: "/images/uploaded/homepage/mobile-hero-slideshow/field-service-owner-by-van-with-tablet.jpg", alt: "Field service owner standing by a van with a tablet", objectPosition: "58% center" },
  { src: "/images/uploaded/homepage/mobile-hero-slideshow/service-owner-in-office-checking-payments.jpg", alt: "Service business owner reviewing office work", objectPosition: "54% center" },
]

const uploadedHomeImages = {
  calculator: { src: "/images/uploaded/homepage/ai-office/admin-drag-calculator.jpg", alt: "Admin Drag Calculator showing hours lost, admin drag cost, and top office bottleneck", width: 1280, height: 960 },
  map: { src: "/images/uploaded/homepage/ai-office/ai-office-map-laptop.jpg", alt: "AI Office Map with behind, already handled, still chased, and workflow columns", width: 1280, height: 960 },
  sprint: { src: "/images/uploaded/homepage/ai-office/installation-sprint.jpg", alt: "AI Office Installation Sprint workflow connections between field-service software, accounting, inbox, texts, and staff playbook", width: 1254, height: 1254 },
  handoff: { src: "/images/uploaded/homepage/ai-office/office-handoff-automation.jpg", alt: "Office handoff automation for job details, billing readiness, estimate follow-up, and staff exceptions", width: 1280, height: 1219 },
  playbook: { src: "/images/uploaded/homepage/ai-office/staff-ai-playbook.jpg", alt: "Staff AI playbook tied to SOPs and approved escalation rules", width: 1254, height: 1254 },
  beforeAfter: { src: "/images/uploaded/homepage/ai-office/before-after-office-drag.jpg", alt: "Before and after office drag diagram: copying and chasing to cleaner records and faster follow-up", width: 1280, height: 960 },
  officeTeam: { src: "/images/uploaded/homepage/ai-office/office-team-workspace.jpg", alt: "Office team working together in a workspace", width: 1280, height: 720 },
}

const buttonBase = "inline-flex min-h-[52px] items-center justify-center rounded-full px-6 text-base font-extrabold transition focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2"
const greenButton = `${buttonBase} bg-[#15803D] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_42px_rgba(10,85,38,0.24)] hover:-translate-y-0.5 hover:bg-[#116f35] focus:ring-offset-[#071422]`
const lightButton = `${buttonBase} border border-[#d5e5da] bg-white text-[#071D3A] shadow-[0_14px_34px_rgba(7,29,58,0.08)] hover:-translate-y-0.5 hover:border-[#9ed9b2] hover:bg-[#f4fbf6] focus:ring-offset-white`
const darkGhostButton = `${buttonBase} border border-white/18 bg-white/8 text-white shadow-[0_16px_36px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:bg-white/12 focus:ring-offset-[#071422]`

function PageSection({ id, children, className = "", navTheme = "light" }: { id?: string; children: ReactNode; className?: string; navTheme?: "light" | "dark" }) {
  return (
    <section id={id} data-nav-theme={navTheme} className={`px-5 py-11 md:px-8 md:py-16 lg:px-10 ${className}`}>
      {children}
    </section>
  )
}

function UploadedSectionImage({ image, className = "", priority = false }: { image: { src: string; alt: string; width: number; height: number }; className?: string; priority?: boolean }) {
  return <Image src={image.src} alt={image.alt} width={image.width} height={image.height} priority={priority} loading={priority ? undefined : "eager"} className={`h-auto w-full max-w-none object-contain ${className}`} sizes="(min-width: 1024px) 48vw, 100vw" />
}

function HeroImageSlideshow() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden lg:hidden">
        <div className="absolute inset-0 bg-[#071422]" />
        <div className="absolute right-[-14%] top-[50%] h-[86svh] w-[78vw] -translate-y-1/2 overflow-hidden opacity-100 blur-[0.35px] saturate-[0.94]" style={{ WebkitMaskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 12%, rgba(0,0,0,0.85) 25%, #000 38%, #000 100%)", maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 12%, rgba(0,0,0,0.85) 25%, #000 38%, #000 100%)" }}>
          {mobileHeroSlideshowImages.map((image, index) => (
            <Image key={`mobile-${image.src}`} src={image.src} alt="" fill priority={index === 0} sizes="78vw" className="stanley-hero-slideshow-image stanley-hero-slideshow-image--mobile object-cover" style={{ animationDelay: `${index * 6}s`, objectPosition: image.objectPosition }} />
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071422_0%,#071422_42%,rgba(7,20,34,0.76)_56%,rgba(7,20,34,0.28)_74%,rgba(7,20,34,0.04)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#071422_0%,rgba(7,20,34,0.52)_10%,rgba(7,20,34,0.04)_36%,rgba(7,20,34,0.16)_78%,#071422_100%)]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[70%] overflow-hidden lg:block">
        <div className="absolute inset-y-0 right-[-10%] w-[112%] overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.28) 16%, #000 34%, #000 82%, rgba(0,0,0,0.42) 92%, transparent 100%)", maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.28) 16%, #000 34%, #000 82%, rgba(0,0,0,0.42) 92%, transparent 100%)" }}>
          <div className="absolute inset-0 bg-[#071422]" />
          {heroSlideshowImages.map((image, index) => (
            <Image key={`${image.src}-${index}`} src={image.src} alt="" fill priority={index === 0} sizes="66vw" className="stanley-hero-slideshow-image object-cover" style={{ animationDelay: `${index * 5}s`, objectPosition: image.objectPosition ?? "center" }} />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.98)_15%,rgba(7,20,34,0.84)_28%,rgba(7,20,34,0.46)_45%,rgba(7,20,34,0.08)_68%,rgba(7,20,34,0.34)_100%)]" />
          <div className="absolute inset-y-0 left-0 w-[44%] bg-gradient-to-r from-[#071422] via-[#071422]/82 to-transparent" />
        </div>
      </div>
    </>
  )
}

function CalculatorSpine() {
  const calculatorSteps = [
    { label: "1", title: "Enter rough office and job numbers", copy: "Best guesses are enough. No passwords or sensitive financials." },
    { label: "2", title: "See monthly admin drag", copy: "Estimate the cost of copying, chasing, retyping, reconciling, and delayed follow-up." },
    { label: "3", title: "Find workflows worth mapping", copy: "See where AI can help your current team process more jobs without adding payroll." },
  ]
  return (
    <PageSection id="calculator" className="relative isolate scroll-mt-[120px] overflow-hidden bg-[#FBFCF7] py-14 text-[#071D3A] md:py-16 lg:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(8,166,75,0.14),rgba(251,252,247,0)_65%)]" />
      <div className="mx-auto grid max-w-[88rem] gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <h2 className="max-w-[680px] text-balance text-[clamp(2.15rem,4.4vw,4.75rem)] font-extrabold leading-[0.93] tracking-[-0.025em] text-[#071D3A]">Before you hire another admin, calculate what office drag is already costing you.</h2>
          <div className="mt-5 grid gap-2.5">
            {calculatorSteps.map((step) => (
              <div key={step.title} className="flex gap-3 rounded-[1.1rem] border border-[#dbe9dd] bg-white p-3 shadow-[0_10px_26px_rgba(7,29,58,0.055)]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-sm font-extrabold text-white">{step.label}</span>
                <div>
                  <h3 className="text-base font-extrabold text-[#071D3A]">{step.title}</h3>
                  <p className="mt-0.5 text-sm font-semibold leading-5 text-[#607588]">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <CTALink href={calculatorHref} kind="calculator" location="home_calculator_spine_primary" analyticsEvent="calculator_cta_clicked" ctaLabel="Calculate Your Admin Drag" className={`${greenButton} whitespace-nowrap px-7`}>Calculate Your Admin Drag <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
            <CTALink href={mapHref} kind="systems" location="home_calculator_spine_secondary" ctaLabel="Book the $197 AI Office Map" className={`${lightButton} whitespace-nowrap`}>Book the $197 AI Office Map</CTALink>
          </div>
        </div>
        <UploadedSectionImage image={uploadedHomeImages.calculator} priority className="scale-[0.98] lg:origin-center" />
      </div>
    </PageSection>
  )
}

function AssessmentSection() {
  const deliverables = ["Where admin drag is costing time, money, follow-up, and quality.", "What your current field-service and accounting software already handles.", "What staff is still forced to chase, copy, check, or reconcile.", "Your top 3 AI workflow opportunities.", "Staff AI training and company playbook gaps.", "A one-page AI Office Map with $197 credited toward your AI Office Installation Sprint."]
  return (
    <PageSection id="assessment" className="relative isolate overflow-hidden bg-[#071422] py-16 text-white md:py-20 lg:py-24" navTheme="dark">
      <Image src={uploadedHomeImages.officeTeam.src} alt="" fill sizes="100vw" className="-z-20 object-cover object-center" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,20,34,0.96)_0%,rgba(7,20,34,0.88)_42%,rgba(7,20,34,0.62)_72%,rgba(7,20,34,0.42)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(83,217,134,0.18),transparent_34%),linear-gradient(180deg,rgba(7,20,34,0.18)_0%,rgba(7,20,34,0.9)_100%)]" />
      <div className="mx-auto max-w-[88rem]">
        <div className="max-w-[760px]">
          <h2 className="mt-3 text-balance text-[clamp(2.05rem,4.55vw,4.9rem)] font-extrabold leading-[0.94] tracking-[-0.025em]">Start with the $197 AI Office Map.</h2>
          <p className="mt-4 max-w-[660px] text-base font-semibold leading-7 text-white/78">In one focused session, Stanley Systems maps how your office handles paperwork, billing, follow-up, handoffs, and job admin. You leave with a one-page map showing where work is getting stuck, what your current tools already handle, and which AI-guided workflow should be installed first.</p>
          <ul className="mt-6 grid max-w-2xl gap-3">
            {deliverables.map((item) => <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-white/86"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#84D99A]" />{item}</li>)}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CTALink href={mapHref} kind="checkout" location="home_ai_office_map_primary" analyticsEvent="audit_checkout_clicked" analyticsSource="homepage" packageId="workflow_audit" packageName="AI Office Map" billingPeriod="one_time" ctaLabel="Book the $197 AI Office Map" className={greenButton}>Book the $197 AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
            <CTALink href={calculatorHref} kind="calculator" location="home_ai_office_map_secondary" analyticsEvent="calculator_cta_clicked" ctaLabel="Calculate Your Admin Drag" className={darkGhostButton}>Calculate Your Admin Drag</CTALink>
          </div>
        </div>
      </div>
    </PageSection>
  )
}

function SprintSection() {
  const cards = [
    uploadedHomeImages.sprint,
    uploadedHomeImages.playbook,
    uploadedHomeImages.handoff,
  ]
  return (
    <PageSection id="sprint" className="relative isolate overflow-hidden bg-[#FBFCF7] py-16 text-[#071D3A] md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(83,217,134,0.18),transparent_30%),linear-gradient(180deg,#FBFCF7_0%,#F7FBF5_100%)]" />
      <div className="mx-auto max-w-[88rem]">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-balance text-center text-[clamp(2.4rem,5.9vw,5.9rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">Install AI office workflows.</h2>
          <p className="mx-auto mt-6 max-w-4xl text-base font-semibold leading-7 text-[#536173] sm:text-lg">We start with the priority workflows from your AI Office Map: billing readiness, estimate follow-up, duplicate record cleanup, inbox and call summary routing, vendor ETA updates, staff SOP support, or service recovery.</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CTALink href={sprintHref} kind="systems" location="home_sprint_primary" ctaLabel="See the Installation Sprint" className={`${lightButton} px-8`}>See the Installation Sprint <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
            <CTALink href={mapHref} kind="systems" location="home_sprint_secondary" ctaLabel="Book the $197 AI Office Map" className="inline-flex min-h-11 items-center justify-center rounded-full px-2 text-sm font-extrabold text-[#116832] underline decoration-[#9ed9b2] underline-offset-4 transition hover:text-[#071D3A]">Book the $197 AI Office Map</CTALink>
          </div>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {cards.map((image) => (
            <article key={image.src} className="overflow-hidden rounded-[1.6rem] border border-[#cfe8d5] bg-white shadow-[0_18px_48px_rgba(7,29,58,0.07)]">
              <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(min-width: 768px) 31vw, 100vw" className="h-auto w-full object-cover" />
            </article>
          ))}
        </div>
      </div>
    </PageSection>
  )
}

function WorkflowCategoriesSection() {
  const workflows = [
    { title: "Job and customer information moves cleaner", copy: "Call, email, and text summaries become clean CRM/job context so staff stops retyping the same details." },
    { title: "Billing gets ready faster", copy: "Completed work is checked for missing details before billing stalls, reducing invoice delays and owner cleanups." },
    { title: "Follow-up stops depending on memory", copy: "Estimates, customer issues, reviews, referrals, and repeat-work opportunities get routed instead of forgotten." },
    { title: "Staff gets an AI office playbook", copy: "Your team uses AI against real process and SOPs instead of guessing or interrupting the owner." },
  ]
  return (
    <PageSection id="systems" className="bg-[#f4f7f4] text-[#071D3A]">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <h2 className="max-w-[760px] text-balance text-[clamp(2rem,4vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">AI workflows that make the office more profitable.</h2>
          <p className="max-w-[650px] text-lg font-semibold leading-8 text-[#536173]">More jobs processed. Cleaner records. Faster follow-up. Same office team.</p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {workflows.map((workflow) => (
            <article key={workflow.title} className="rounded-[1.7rem] border border-[#d9e7df] bg-white p-6 shadow-[0_20px_60px_rgba(7,29,58,0.07)]">
              <h3 className="text-2xl font-extrabold tracking-[-0.03em]">{workflow.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{workflow.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </PageSection>
  )
}

function BeforeAfterProofSection() {
  return (
    <PageSection className="bg-white text-[#071D3A]">
      <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <h2 className="text-balance text-[clamp(2.1rem,4.8vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">Before: office drag slows growth. After: the same team runs cleaner and faster.</h2>
        </div>
        <UploadedSectionImage image={uploadedHomeImages.beforeAfter} className="scale-[1.02] lg:origin-center" />
      </div>
    </PageSection>
  )
}

function FinalOfficeCTA() {
  return (
    <PageSection className="bg-[#071422] text-white" navTheme="dark">
      <div className="mx-auto max-w-[82rem] text-center">
        <h2 className="mx-auto max-w-[960px] text-balance text-[clamp(2.4rem,6vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.025em]">Before you hire another admin, find the office work slowing down profit.</h2>
        <p className="mx-auto mt-6 max-w-[760px] text-lg font-semibold leading-8 text-white/70">Book the $197 AI Office Map or run the Admin Drag Calculator to see where your current team can process more jobs, follow up faster, and run cleaner with AI installed into the actual office workflow.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <CTALink href={mapHref} kind="systems" location="home_final_primary" ctaLabel="Book the $197 AI Office Map" className={greenButton}>Book the $197 AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
          <CTALink href={calculatorHref} kind="calculator" location="home_final_secondary" analyticsEvent="calculator_cta_clicked" ctaLabel="Calculate Your Admin Drag" className={darkGhostButton}>Calculate Your Admin Drag</CTALink>
        </div>
      </div>
    </PageSection>
  )
}

export function CashFlowHomepage() {
  return (
    <>
      <section data-audit-page="/" data-audit-section="home.hero" data-nav-theme="dark" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#071422] px-5 pb-24 pt-[132px] text-white md:px-8 md:pb-32 lg:px-10 lg:pb-36 lg:pt-[150px]">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_74%_28%,rgba(83,217,134,0.16),transparent_30%),radial-gradient(circle_at_8%_12%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#071422_0%,#05101c_100%)]" />
        <HeroImageSlideshow />
        <div className="mx-auto w-full max-w-[92rem]">
          <div className="relative z-10 max-w-[900px]">
            <h1 className="max-w-[900px] text-balance text-[clamp(2.3rem,5.55vw,5.8rem)] font-extrabold leading-[0.91] tracking-[-0.025em] text-white">Train your office team to handle more paperwork, billing, and job admin without hiring another person.</h1>
            <p className="mt-7 hidden max-w-[720px] text-pretty text-lg font-semibold leading-8 text-[#d3dce7] sm:block sm:text-xl">Stanley Systems helps growing service and trade businesses train their office staff on AI and install practical workflows so the same team can process more work with fewer dropped balls.</p>
            <div className="mt-[14svh] flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <CTALink href={mapHref} kind="systems" location="home_hero_primary" ctaLabel="Book the $197 AI Office Map" className={`${greenButton} px-8 text-[1.05rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_20px_50px_rgba(83,217,134,0.28)] hover:-translate-y-1 hover:scale-[1.02]`}>Book the $197 AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
              <CTALink href={calculatorHref} kind="calculator" location="home_hero_secondary" analyticsEvent="calculator_cta_clicked" ctaLabel="Calculate Your Admin Drag" className={darkGhostButton}>Calculate Your Admin Drag</CTALink>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden border-t border-white/10 bg-[#071422]/92 py-3 backdrop-blur-xl md:block md:py-4" data-section="home-hero-logo-conveyor">
          <SoftwareLogoMarquee />
        </div>
      </section>
      <CalculatorSpine />
      <AssessmentSection />
      <SprintSection />
      <WorkflowCategoriesSection />
      <BeforeAfterProofSection />
      <FinalOfficeCTA />
    </>
  )
}
