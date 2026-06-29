import Image from "next/image"
import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"

import { CTALink } from "@/components/cta-link"
import { SoftwareLogoMarquee } from "@/components/home/software-logo-marquee"

const mapHref = "/ai-office-map"
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
  sprint: { src: "/images/uploaded/homepage/ai-office/easy-ai-use-for-your-team.jpg", alt: "Easy AI Use for Your Team card showing text message, portal, AI chat, and source checked paths feeding an answer ready panel", width: 1254, height: 1254 },
  handoff: { src: "/images/uploaded/homepage/ai-office/more-work-finished-per-employee.jpg", alt: "More Work Finished Per Employee card showing completed replies, invoices, and customer updates", width: 1254, height: 1254 },
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
        <div className="absolute inset-0 overflow-hidden opacity-100 saturate-[0.96] sm:bottom-auto sm:left-auto sm:right-[-14%] sm:top-[50%] sm:h-[86svh] sm:w-[78vw] sm:-translate-y-1/2 sm:blur-[0.35px] sm:saturate-[0.94]">
          {mobileHeroSlideshowImages.map((image, index) => (
            <Image key={`mobile-${image.src}`} src={image.src} alt="" fill priority={index === 0} sizes="100vw" className="stanley-hero-slideshow-image stanley-hero-slideshow-image--mobile object-cover" style={{ animationDelay: `${index * 6}s`, objectPosition: image.objectPosition }} />
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.9)_34%,rgba(7,20,34,0.56)_68%,rgba(7,20,34,0.28)_100%)] sm:bg-[linear-gradient(90deg,#071422_0%,#071422_42%,rgba(7,20,34,0.76)_56%,rgba(7,20,34,0.28)_74%,rgba(7,20,34,0.04)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#071422_0%,rgba(7,20,34,0.54)_18%,rgba(7,20,34,0.14)_46%,rgba(7,20,34,0.34)_82%,rgba(7,20,34,0.7)_100%)] sm:bg-[linear-gradient(180deg,#071422_0%,rgba(7,20,34,0.52)_10%,rgba(7,20,34,0.04)_36%,rgba(7,20,34,0.16)_78%,#071422_100%)]" />
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


function HeroProofStrip() {
  const proofCards = [
    { value: "520+", label: "hours of admin drag targeted each year" },
    { value: "95%", label: "less manual work on installed workflows" },
    { value: "1", subValue: "hire delayed", label: "Remove enough office drag to avoid the next admin hire." },
  ]

  return (
    <section data-nav-theme="light" data-audit-section="home.hero-proof-strip" className="stanley-proof-strip relative isolate flex min-h-[465px] items-center overflow-hidden bg-[#FBFCF7] px-5 pt-16 pb-12 text-center text-[#071D3A] md:px-8 md:pt-20 md:pb-16 lg:min-h-[520px] lg:px-10 lg:pt-24 lg:pb-[4.75rem]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-[#071422] via-[#dff5e6]/70 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-52 bg-[linear-gradient(180deg,transparent_0%,rgba(242,247,239,0.62)_32%,rgba(231,239,231,0.86)_70%,#f5f9f2_100%),radial-gradient(circle_at_70%_100%,rgba(111,126,113,0.16),transparent_46%),radial-gradient(circle_at_24%_88%,rgba(83,217,134,0.10),transparent_40%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_16%_18%,rgba(83,217,134,0.24),transparent_32%),radial-gradient(circle_at_84%_30%,rgba(83,217,134,0.20),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(90,108,93,0.07),transparent_44%),linear-gradient(180deg,#EAF8ED_0%,#FBFCF7_42%,#EDF5ED_100%)]" />
      <div aria-hidden="true" className="stanley-proof-glow pointer-events-none absolute left-[10%] top-[22%] z-[1] h-72 w-72 rounded-full bg-[#53D986]/18 blur-[76px]" />
      <div aria-hidden="true" className="stanley-proof-glow stanley-proof-glow--secondary pointer-events-none absolute right-[9%] bottom-[16%] z-[1] h-64 w-64 rounded-full bg-[#15803D]/12 blur-[82px]" />
      <div aria-hidden="true" className="stanley-proof-texture pointer-events-none absolute inset-0 z-[1] opacity-[0.38]" />
      <div aria-hidden="true" className="pointer-events-none absolute left-4 top-12 z-[1] h-48 w-48 rounded-full opacity-32 [background-image:radial-gradient(#93d6a8_1px,transparent_1.3px)] [background-size:11px_11px] md:left-14 lg:h-[14.5rem] lg:w-[14.5rem]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-14 right-5 z-[1] h-40 w-40 rounded-full opacity-26 [background-image:radial-gradient(#93d6a8_1px,transparent_1.3px)] [background-size:11px_11px] lg:right-14 lg:h-[12.5rem] lg:w-[12.5rem]" />

      <div className="relative z-10 mx-auto w-full max-w-[82.8rem]">
        <div className="grid gap-5 md:grid-cols-3 lg:gap-7">
          {proofCards.map((card) => (
            <article key={card.value} className="stanley-proof-card relative flex min-h-[190px] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-[#D8E8DE] bg-white/94 px-6 py-8 shadow-[0_23px_63px_rgba(7,29,58,0.09)] sm:px-7 md:min-h-[207px] lg:min-h-[220px] lg:px-8 lg:py-9">
              <div aria-hidden="true" className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-[#53D986]/18 blur-2xl" />
              <div aria-hidden="true" className="absolute -left-12 bottom-0 h-24 w-24 rounded-full bg-[#15803D]/8 blur-3xl" />
              <div aria-hidden="true" className="absolute bottom-6 right-6 h-[5.5rem] w-24 opacity-18 [background-image:radial-gradient(#15803D_1px,transparent_1.2px)] [background-size:8px_8px]" />
              {card.subValue ? (
                <div className="relative flex flex-col items-center justify-center text-[#15803D]">
                  <span className="block text-[clamp(3.7rem,5.4vw,5.8rem)] font-extrabold leading-[0.84] tracking-[-0.06em]">{card.value}</span>
                  <span className="mt-2 block text-center text-[clamp(1.45rem,2.2vw,2.25rem)] font-extrabold leading-[0.9] tracking-[-0.02em]">{card.subValue}</span>
                </div>
              ) : (
                <p className="relative text-[clamp(2.95rem,5.05vw,5.45rem)] font-extrabold leading-[0.88] tracking-[-0.055em] text-[#15803D]">{card.value}</p>
              )}
              <p className="relative mx-auto mt-5 max-w-[19rem] text-center text-[1rem] font-extrabold leading-6 text-[#20344A] sm:text-[1.05rem] lg:text-[1.08rem]">{card.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CalculatorSpine() {
  return (
    <PageSection id="calculator" className="relative isolate min-h-[calc(100svh-104px)] scroll-mt-[120px] overflow-hidden bg-[#f5f9f2] py-10 text-[#071D3A] md:py-14 lg:grid lg:min-h-screen lg:items-center lg:py-0" fullDesktop={false}>
      <Image src={uploadedHomeImages.checklistLaptop.src} alt="" fill sizes="100vw" className="-z-20 object-cover object-[64%_center] lg:object-[68%_center]" priority aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[250px] bg-gradient-to-b from-[#f5f9f2] via-[#f5f9f2]/82 to-transparent md:h-[220px]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(251,252,247,0.96)_0%,rgba(251,252,247,0.88)_36%,rgba(251,252,247,0.74)_62%,rgba(238,246,238,0.38)_100%)] md:bg-[linear-gradient(90deg,rgba(251,252,247,0.70)_0%,rgba(251,252,247,0.52)_25%,rgba(251,252,247,0.24)_52%,rgba(251,252,247,0.04)_100%),linear-gradient(180deg,rgba(251,252,247,0.34)_0%,rgba(245,249,242,0.06)_26%,rgba(245,249,242,0.01)_48%,rgba(238,246,238,0.16)_100%),radial-gradient(circle_at_18%_50%,rgba(251,252,247,0.34),transparent_42%)]" />
      <div className="mx-auto grid w-full max-w-[92rem] items-center lg:translate-y-8">
        <div className="w-full max-w-[760px] rounded-[1.65rem] bg-[#FBFCF7]/88 px-5 py-6 shadow-[0_22px_70px_rgba(7,29,58,0.08)] backdrop-blur-[2px] sm:px-6 md:bg-transparent md:px-5 md:py-4 md:shadow-none md:backdrop-blur-0 lg:max-w-[920px] lg:px-0 lg:py-0">
          <h2 className="text-[clamp(2.1rem,9vw,3rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[#071D3A] sm:text-[clamp(2.45rem,7.2vw,4.95rem)] lg:text-[clamp(3.05rem,4.8vw,4.05rem)] lg:leading-[0.92]">
            <span className="block lg:hidden">Before you hire another admin, find the office work AI should clean up first.</span>
            <span className="hidden whitespace-nowrap lg:block">Before you hire another admin,</span>
            <span className="hidden whitespace-nowrap lg:block">find the office work</span>
            <span className="hidden whitespace-nowrap lg:block">AI should clean up first.</span>
          </h2>
          <p className="mt-5 hidden max-w-[650px] text-base font-semibold leading-7 text-[#35475d] md:block md:text-xl md:leading-8 lg:mt-4">Start with the free Blueprint for practical AI staff plays, or book the full Map when you want the fixes, tools, prompts, and install priority.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-6">
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
            <CTALink href={sprintHref} kind="systems" location="home_sprint_primary" ctaLabel="See the AI Office Installation Sprint" className={`${lightButton} px-8`}>See the AI Office Installation Sprint <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
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
      <section id="hero" data-audit-page="/" data-audit-section="home.hero" data-nav-theme="dark" className="relative isolate flex min-h-[100svh] items-start overflow-hidden bg-[#071422] px-5 pb-10 pt-[34svh] text-white sm:pb-12 sm:pt-[108px] md:items-center md:px-8 md:pb-32 md:pt-[132px] lg:px-10 lg:pb-36 lg:pt-[150px]">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_74%_28%,rgba(83,217,134,0.16),transparent_30%),radial-gradient(circle_at_8%_12%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#071422_0%,#05101c_100%)]" />
        <HeroImageSlideshow />
        <div className="mx-auto w-full max-w-[92rem]">
          <div className="relative z-10 max-w-[900px]">
            <h1 className="max-w-[900px] text-balance text-[clamp(1.95rem,9.6vw,3rem)] font-extrabold leading-[0.95] tracking-[-0.025em] text-white drop-shadow-[0_12px_38px_rgba(0,0,0,0.38)] sm:translate-y-10 sm:text-[clamp(2.05rem,5vw,5.25rem)] sm:leading-[0.93]">Make your office team faster, sharper, and more profitable with AI.</h1>
            <div className="mt-6 flex flex-col gap-3 sm:mt-24 sm:flex-row sm:gap-4">
              <CTALink href={blueprintHref} kind="systems" location="home_hero_primary" ctaLabel="Get the Free Blueprint" className={`${greenButton} min-h-[52px] px-6 py-3 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_20px_50px_rgba(83,217,134,0.28)] hover:-translate-y-1 hover:scale-[1.02] sm:min-h-[58px] sm:px-8 sm:py-4 sm:text-[1.05rem]`}>Get the Free Blueprint <ArrowRight className="ml-2 h-4 w-4" /></CTALink>
              <CTALink href={mapHref} kind="systems" location="home_hero_secondary" ctaLabel="Book the AI Office Map" className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-extrabold text-white shadow-[0_12px_26px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2 focus:ring-offset-[#071422] sm:min-h-[46px] sm:self-center">Book the AI Office Map</CTALink>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden border-t border-white/10 bg-[#071422]/92 py-3 backdrop-blur-xl md:block md:py-4" data-section="home-hero-logo-conveyor">
          <SoftwareLogoMarquee />
        </div>
      </section>
      <HeroProofStrip />
      <CalculatorSpine />
      <AssessmentSection />
      <SprintSection />
      <FinalOfficeCTA />
    </>
  )
}
