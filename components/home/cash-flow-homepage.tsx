import Image from "next/image"
import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { SoftwareLogoMarquee } from "@/components/home/software-logo-marquee"

const mapHref = "/workflow-audit"
const blueprintHref = "/ai-office-blueprint"
const sprintHref = "/systems-installation-sprint"

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
  calculator: { src: "/images/uploaded/homepage/ai-office/ai-office-blueprint-product-shot.jpg", alt: "AI Office Blueprint product shot showing the free office workflow report", width: 1280, height: 1070 },
  map: { src: "/images/uploaded/homepage/ai-office/ai-office-map-laptop.jpg", alt: "AI Office Map with behind, already handled, still chased, and workflow columns", width: 1280, height: 960 },
  officeAdmin: { src: "/images/uploaded/homepage/ai-office/service-owner-office-admin-shot.jpg", alt: "Service business owner and office admin reviewing paperwork at a desk", width: 1280, height: 720 },
  checklistLaptop: { src: "/images/uploaded/homepage/ai-office/office-desk-invoice-checklist-highvis.jpg", alt: "Office desk with invoice checklist and high visibility service work context", width: 1280, height: 548 },
  sprint: { src: "/images/uploaded/homepage/ai-office/installation-sprint-before-after-workflow.jpg", alt: "Installation Sprint before and after workflow for office cleanup", width: 1254, height: 1254 },
  handoff: { src: "/images/uploaded/homepage/ai-office/office-handoff-automation-flow.jpg", alt: "Office handoff automation flow for service business admin work", width: 1254, height: 1254 },
  playbook: { src: "/images/uploaded/homepage/ai-office/staff-ai-playbook-next-step-ready.jpg", alt: "Staff AI playbook with next step ready for the office team", width: 1254, height: 1254 },
  beforeAfter: { src: "/images/uploaded/homepage/ai-office/installation-sprint-before-after-workflow.jpg", alt: "Before and after office drag diagram: copying and chasing to cleaner records and faster follow-up", width: 1254, height: 1254 },
  officeTeam: { src: "/images/uploaded/homepage/ai-office/office-team-workspace.jpg", alt: "Office team working together in a workspace", width: 1280, height: 720 },
}

const buttonBase = "inline-flex min-h-[58px] items-center justify-center rounded-full px-8 py-4 text-lg font-extrabold transition focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2"
const greenButton = `${buttonBase} bg-[#15803D] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_42px_rgba(10,85,38,0.24)] hover:-translate-y-0.5 hover:bg-[#116f35] focus:ring-offset-[#071422]`
const lightButton = `${buttonBase} border border-[#d5e5da] bg-white text-[#071D3A] shadow-[0_14px_34px_rgba(7,29,58,0.08)] hover:-translate-y-0.5 hover:border-[#9ed9b2] hover:bg-[#f4fbf6] focus:ring-offset-white`
const darkGhostButton = `${buttonBase} border border-white/18 bg-white/8 text-white shadow-[0_16px_36px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:bg-white/12 focus:ring-offset-[#071422]`

function PageSection({ id, children, className = "", navTheme = "light", fullDesktop = true }: { id?: string; children: ReactNode; className?: string; navTheme?: "light" | "dark"; fullDesktop?: boolean }) {
  return (
    <section id={id} data-nav-theme={navTheme} className={`px-5 py-9 md:px-8 md:py-12 lg:px-10 ${fullDesktop ? "lg:flex lg:min-h-screen lg:items-center" : ""} ${className}`}>
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
  return (
    <PageSection id="calculator" className="relative isolate min-h-[calc(100svh-104px)] scroll-mt-[120px] overflow-hidden bg-[#f5f9f2] py-10 text-[#071D3A] md:py-12 lg:min-h-0 lg:py-16" fullDesktop={false}>
      <Image src={uploadedHomeImages.checklistLaptop.src} alt="" fill sizes="100vw" className="-z-20 object-cover object-[62%_center]" priority aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(251,252,247,0.96)_0%,rgba(251,252,247,0.9)_38%,rgba(251,252,247,0.62)_61%,rgba(251,252,247,0.18)_100%),linear-gradient(180deg,rgba(251,252,247,0.92)_0%,rgba(245,249,242,0.5)_48%,rgba(238,246,238,0.92)_100%),radial-gradient(circle_at_24%_50%,rgba(251,252,247,0.94),transparent_42%)]" />
      <div className="mx-auto grid min-h-[500px] max-w-[88rem] items-center">
        <div className="max-w-[690px] rounded-[2rem] border border-white/45 bg-[#fbfcf7]/58 p-5 shadow-[0_22px_70px_rgba(7,29,58,0.08)] backdrop-blur-[2px] md:p-7 lg:bg-[#fbfcf7]/44">
          <h2 className="max-w-[690px] text-[clamp(2.35rem,4.4vw,4.45rem)] font-extrabold leading-[0.94] tracking-[-0.014em] text-[#071D3A]">
            <span className="block">Before you hire</span>
            <span className="block">another admin,</span>
            <span className="block">find the office work</span>
            <span className="block">AI should clean up first.</span>
          </h2>
          <p className="mt-6 max-w-[610px] text-base font-semibold leading-7 text-[#35475d] sm:text-lg md:text-xl md:leading-8">Start with the free Blueprint for practical AI staff plays, or book the full Map when you want the fixes, tools, prompts, and install priority.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CTALink href={mapHref} kind="systems" location="home_blueprint_spine_primary" ctaLabel="Book the AI Office Map" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#15803D] px-6 py-3 text-sm font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_16px_36px_rgba(10,85,38,0.22)] transition hover:-translate-y-0.5 hover:bg-[#116f35] focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-white sm:px-7 sm:text-base">Book the AI Office Map <ArrowRight className="h-4 w-4" /></CTALink>
            <CTALink href={blueprintHref} kind="systems" location="home_blueprint_spine_secondary" ctaLabel="Get the Free Blueprint" className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#d5e5da] bg-white px-6 py-3 text-sm font-extrabold text-[#071D3A] shadow-[0_14px_34px_rgba(7,29,58,0.08)] transition hover:-translate-y-0.5 hover:border-[#9ed9b2] hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-white sm:px-7 sm:text-base">Get the Free Blueprint</CTALink>
          </div>
        </div>
      </div>
    </PageSection>
  )
}

function AssessmentSection() {
  return (
    <PageSection id="assessment" className="relative isolate overflow-hidden bg-[#071422] py-12 text-white md:py-14 lg:py-16" navTheme="dark">
      <Image src={uploadedHomeImages.officeAdmin.src} alt="" fill sizes="100vw" className="-z-20 object-cover object-[62%_center] lg:object-center" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,15,25,0.88)_0%,rgba(5,15,25,0.78)_34%,rgba(5,15,25,0.48)_58%,rgba(5,15,25,0.18)_78%,rgba(5,15,25,0.26)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,15,25,0.08)_0%,rgba(5,15,25,0.22)_72%,rgba(5,15,25,0.5)_100%),radial-gradient(circle_at_18%_20%,rgba(83,217,134,0.12),transparent_32%)]" />
      <div className="mx-auto flex w-full max-w-[88rem] flex-col justify-center">
        <div className="max-w-[790px] pt-10 md:pt-14 lg:pt-8">
          <h2 className="max-w-[780px] text-balance text-[clamp(3rem,7vw,6.7rem)] font-extrabold leading-[0.88] tracking-[-0.055em] text-white drop-shadow-[0_8px_26px_rgba(0,0,0,0.28)]">Start with the AI Office Map.</h2>
          <p className="mt-6 max-w-[720px] text-balance text-lg font-semibold leading-8 text-white/84 sm:text-xl">A focused session that turns office drag into concrete fixes, staff AI prompts, workflow tips, tool guidance, and the first workflow to install.</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CTALink href={mapHref} kind="checkout" location="home_ai_office_map_primary" analyticsEvent="audit_checkout_clicked" analyticsSource="homepage" packageId="workflow_audit" packageName="AI Office Map" billingPeriod="one_time" ctaLabel="Book the AI Office Map" className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-full bg-[#15803D] px-8 py-4 text-base font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_42px_rgba(0,0,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#16a34a] focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-[#071422] sm:min-w-[270px] sm:text-lg">Book the AI Office Map <ArrowRight className="h-5 w-5" aria-hidden="true" /></CTALink>
            <CTALink href={blueprintHref} kind="systems" location="home_ai_office_map_secondary" ctaLabel="Get the Free Blueprint" className="inline-flex min-h-[58px] items-center justify-center rounded-full border border-white/22 bg-white/9 px-8 py-4 text-base font-extrabold text-white shadow-[0_18px_42px_rgba(0,0,0,0.18)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/36 hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-[#071422] sm:min-w-[270px] sm:text-lg">Get the Free Blueprint</CTALink>
          </div>
        </div>
      </div>
    </PageSection>
  )
}

function SprintSection() {
  const cards = [
    uploadedHomeImages.handoff,
    uploadedHomeImages.sprint,
    uploadedHomeImages.playbook,
  ]
  return (
    <PageSection id="sprint" className="relative isolate overflow-hidden bg-[#FBFCF7] py-11 text-[#071D3A] md:py-14 lg:py-16" fullDesktop={false}>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(83,217,134,0.18),transparent_30%),linear-gradient(180deg,#FBFCF7_0%,#F7FBF5_100%)]" />
      <div className="mx-auto max-w-[88rem]">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-balance text-center text-[clamp(2.25rem,5vw,4.9rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">Install AI office workflows.</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-7 text-[#536173] sm:text-lg">We install the priority workflows from your Map: billing readiness, follow-up, inbox routing, SOP support, or service recovery.</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CTALink href={sprintHref} kind="systems" location="home_sprint_primary" ctaLabel="See the Installation Sprint" className={`${lightButton} px-8`}>See the Installation Sprint <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
            <CTALink href={mapHref} kind="systems" location="home_sprint_secondary" ctaLabel="Book the AI Office Map" className="inline-flex min-h-11 items-center justify-center rounded-full px-2 text-sm font-extrabold text-[#116832] underline decoration-[#9ed9b2] underline-offset-4 transition hover:text-[#071D3A]">Book the AI Office Map</CTALink>
          </div>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {cards.map((image, index) => (
            <article key={image.src} className="overflow-hidden rounded-[1.6rem] border border-[#cfe8d5] bg-white shadow-[0_18px_48px_rgba(7,29,58,0.07)]">
              <Image src={image.src} alt={image.alt} width={image.width} height={image.height} priority={index === 0} loading={index === 0 ? undefined : "eager"} sizes="(min-width: 768px) 31vw, 100vw" className="aspect-square h-auto w-full object-cover" />
            </article>
          ))}
        </div>
      </div>
    </PageSection>
  )
}

function FinalOfficeCTA() {
  return (
    <PageSection className="bg-[#071422] text-white" navTheme="dark" fullDesktop={false}>
      <div className="mx-auto max-w-[82rem] text-center">
        <h2 className="mx-auto max-w-[860px] text-balance text-[clamp(2.15rem,5vw,4.9rem)] font-extrabold leading-[0.92] tracking-[-0.025em]">Find the office work slowing down profit.</h2>
        <p className="mx-auto mt-5 max-w-[680px] text-base font-semibold leading-7 text-white/70 sm:text-lg">Book the Map or get the free Blueprint for practical AI plays, fixes, and the next workflow worth improving.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <CTALink href={mapHref} kind="systems" location="home_final_primary" ctaLabel="Book the AI Office Map" className={greenButton}>Book the AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
          <CTALink href={blueprintHref} kind="systems" location="home_final_secondary" ctaLabel="Get the Free Blueprint" className={darkGhostButton}>Get the Free Blueprint</CTALink>
        </div>
      </div>
    </PageSection>
  )
}

export function CashFlowHomepage() {
  return (
    <>
      <section data-audit-page="/" data-audit-section="home.hero" data-nav-theme="dark" className="relative isolate flex min-h-[100svh] items-start overflow-hidden bg-[#071422] px-5 pb-12 pt-[108px] text-white md:items-center md:px-8 md:pb-32 md:pt-[132px] lg:px-10 lg:pb-36 lg:pt-[150px]">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_74%_28%,rgba(83,217,134,0.16),transparent_30%),radial-gradient(circle_at_8%_12%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#071422_0%,#05101c_100%)]" />
        <HeroImageSlideshow />
        <div className="mx-auto w-full max-w-[92rem]">
          <div className="relative z-10 max-w-[900px]">
            <h1 className="max-w-[900px] text-balance text-[clamp(2.05rem,5vw,5.25rem)] font-extrabold leading-[0.93] tracking-[-0.025em] text-white sm:translate-y-10">Train your office team to handle more paperwork, billing, and job admin without hiring another person.</h1>
            <div className="mt-7 flex flex-col gap-4 sm:mt-24 sm:flex-row">
              <CTALink href={mapHref} kind="systems" location="home_hero_primary" ctaLabel="Book the AI Office Map" className={`${greenButton} px-8 text-[1.05rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_20px_50px_rgba(83,217,134,0.28)] hover:-translate-y-1 hover:scale-[1.02]`}>Book the AI Office Map <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
              <CTALink href={blueprintHref} kind="systems" location="home_hero_secondary" ctaLabel="Get the Free Blueprint" className={darkGhostButton}>Get the Free Blueprint</CTALink>
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
      <FinalOfficeCTA />
    </>
  )
}
