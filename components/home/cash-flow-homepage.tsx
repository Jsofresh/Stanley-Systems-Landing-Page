import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { CTALink } from "@/components/cta-link";
import { pricingPackages } from "@/lib/pricing/source-of-truth";
import { SystemsThatMakeMoneySection } from "@/components/home/SystemsThatMakeMoneySection";

const calculatorHref = "/invoicing-delay-cash-flow-calculator";
const assessmentHref = "/workflow-audit";
const sprintHref = "/systems-installation-sprint";

const heroSlideshowImages = [
  {
    src: "/images/uploaded/homepage/hero-slideshow/hero-office-dashboard-review.jpg",
    alt: "Office dashboard review for a service business",
  },
  {
    src: "/images/uploaded/homepage/hero-slideshow/hero-owner-monitoring-cashflow.jpg",
    alt: "Business owner monitoring cash flow",
  },
  {
    src: "/images/uploaded/homepage/hero-slideshow/hero-payment-confirmation-office.jpg",
    alt: "Payment confirmation in a service business office",
  },
  {
    src: "/images/uploaded/homepage/hero-slideshow/hero-desktop-cashflow-view.jpg",
    alt: "Desktop cash flow view for a service business",
  },
  {
    src: "/images/uploaded/homepage/hero-slideshow/hero-tech-van-outside.jpg",
    alt: "Service technician van outside a customer location",
    objectPosition: "60% center",
  },
];

const uploadedHomeImages = {
  calculator: {
    src: "/images/uploaded/homepage/cash-flow-rework/cash-flow-assessment-consultation-laptop-meeting.jpg",
    alt: "Cash Flow Calculator estimate shown on a laptop during a cash-flow consultation",
    width: 1280,
    height: 853,
  },
  leaks: {
    src: "/images/uploaded/homepage/cash-flow-rework/revenue-leak-icons-wasted-payroll-late-invoices-followups-past-customers.jpg",
    alt: "Revenue leaks from wasted payroll, late invoices, forgotten follow-ups, and past customers",
    width: 1280,
    height: 426,
  },
  assessment: {
    src: "/images/uploaded/homepage/cash-flow-rework/cash-flow-assessment-report-leak-found-6200-mo.jpg",
    alt: "Cash Flow Assessment report showing a 6200 dollar monthly leak and build priority",
    width: 1024,
    height: 1280,
  },
  beforeAfter: {
    src: "/images/uploaded/homepage/cash-flow-rework/before-after-reviews-customers-payroll-estimates-cash.jpg",
    alt: "Before and after improvement map for reviews, customers, payroll, estimates, and cash flow",
    width: 1280,
    height: 960,
  },
};

const buttonBase =
  "inline-flex min-h-[52px] items-center justify-center rounded-full px-6 text-base font-extrabold transition focus:outline-none focus:ring-2 focus:ring-[#53d986] focus:ring-offset-2";
const greenButton = `${buttonBase} bg-[#15803D] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_42px_rgba(10,85,38,0.24)] hover:-translate-y-0.5 hover:bg-[#116f35] focus:ring-offset-[#071422]`;
const lightButton = `${buttonBase} border border-[#d5e5da] bg-white text-[#071D3A] shadow-[0_14px_34px_rgba(7,29,58,0.08)] hover:-translate-y-0.5 hover:border-[#9ed9b2] hover:bg-[#f4fbf6] focus:ring-offset-white`;
const darkGhostButton = `${buttonBase} border border-white/18 bg-white/8 text-white shadow-[0_16px_36px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 hover:bg-white/12 focus:ring-offset-[#071422]`;

const packageDemos = [
  {
    name: "Cashflow Control System",
    priceId: "cashflow_control_monthly",
    leak: "Automates office work from customer intake and invoice request through final bill and cash collection.",
    before: [
      "Customer info sits in notes",
      "Office waits on job details",
      "Invoice goes out late",
    ],
    after: [
      "Customer intake is recorded",
      "Missing info is flagged",
      "Bills and payment follow-up move faster",
    ],
    route: "/systems/cashflow-control",
  },
  {
    name: "Repeat Revenue System",
    priceId: "repeat_revenue_monthly",
    leak: "Brings past customers back and turns good customers into more referral and follow-up opportunities.",
    before: [
      "Customer buys once",
      "No reminder goes out",
      "Competitor gets the next job",
    ],
    after: [
      "Past customers are contacted",
      "Follow-up is triggered",
      "Repeat work and referrals get chased",
    ],
    route: "/systems/repeat-revenue",
  },
  {
    name: "Both Systems",
    priceId: "both_systems_monthly",
    leak: "Tightens billing, payment follow-up, past-customer follow-up, and repeat-revenue work together.",
    before: [
      "Office work stacks up",
      "Billing slows down",
      "Past customers disappear",
    ],
    after: [
      "Office work moves faster",
      "Cash collection gets followed up",
      "Customers come back again",
    ],
    route: assessmentHref,
  },
];

function getPrice(id: string) {
  return pricingPackages.find((item) => item.id === id);
}

function PageSection({
  id,
  children,
  className = "",
  navTheme = "light",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  navTheme?: "light" | "dark";
}) {
  return (
    <section
      id={id}
      data-nav-theme={navTheme}
      className={`px-5 py-11 md:px-8 md:py-16 lg:px-10 ${className}`}
    >
      {children}
    </section>
  );
}

function UploadedSectionImage({
  image,
  className = "",
  priority = false,
}: {
  image: { src: string; alt: string; width: number; height: number };
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      loading={priority ? undefined : "eager"}
      className={`h-auto w-full max-w-none object-contain ${className}`}
      sizes="(min-width: 1024px) 58vw, 100vw"
    />
  );
}

function HeroImageSlideshow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[70%] overflow-hidden lg:block"
    >
      <div
        className="absolute inset-y-0 right-[-10%] w-[112%] overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.28) 16%, #000 34%, #000 82%, rgba(0,0,0,0.42) 92%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.28) 16%, #000 34%, #000 82%, rgba(0,0,0,0.42) 92%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[#071422]" />
        {heroSlideshowImages.map((image, index) => (
          <Image
            key={image.src}
            src={image.src}
            alt=""
            fill
            priority={index === 0}
            sizes="66vw"
            className="stanley-hero-slideshow-image object-cover"
            style={{
              animationDelay: `${index * 5}s`,
              objectPosition: image.objectPosition ?? "center",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.98)_15%,rgba(7,20,34,0.84)_28%,rgba(7,20,34,0.46)_45%,rgba(7,20,34,0.08)_68%,rgba(7,20,34,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,20,34,0)_32%,rgba(7,20,34,0.22)_62%,rgba(7,20,34,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#071422_0%,rgba(7,20,34,0.62)_14%,rgba(7,20,34,0)_34%,rgba(7,20,34,0)_66%,rgba(7,20,34,0.68)_88%,#071422_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[44%] bg-gradient-to-r from-[#071422] via-[#071422]/82 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[24%] bg-gradient-to-l from-[#071422] via-[#071422]/70 to-transparent" />
      </div>
    </div>
  );
}

function OfferPathSection() {
  const steps = [
    { title: "Free Calculator", body: "See where money may be delayed, missed, or wasted." },
    { title: "Cash Flow Assessment — $97", body: "Stanley Systems maps the office-side leaks, what they likely cost, and what should be fixed first." },
    { title: "Systems Installation Sprint — $1,500", body: "Stanley Systems builds the systems your business chooses to put in place after the assessment." },
    { title: "Monthly Control — optional after the Sprint", body: "Keep the systems checked, adjusted, and from quietly breaking as the business keeps running." },
  ];

  return (
    <PageSection className="bg-white text-[#071D3A]">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-6 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
          <h2 className="max-w-[780px] text-balance text-[clamp(2.05rem,4.6vw,4.9rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">
            Find the leak. Map the fix. Build the system.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <CTALink href={calculatorHref} kind="calculator" location="home_offer_path_calculator" analyticsEvent="calculator_cta_clicked" ctaLabel="Run the free calculator" className={`${greenButton} px-7`}>
              Run the free calculator <ArrowRight className="ml-2 h-4 w-4" />
            </CTALink>
            <CTALink href={sprintHref} kind="systems" location="home_offer_path_sprint" ctaLabel="See how the Sprint works" className={`${lightButton} px-7`}>
              See how the Sprint works
            </CTALink>
          </div>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-[1.45rem] border border-[#d9e7df] bg-[#FBFCF7] p-5 shadow-[0_14px_36px_rgba(7,29,58,0.055)]">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#E7F7EB] text-sm font-extrabold text-[#116832]">{index + 1}</span>
              <h3 className="mt-4 text-[1.35rem] font-extrabold leading-tight tracking-[-0.025em] text-[#071D3A]">{step.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#536173]">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

function CalculatorLaunchSection() {
  return (
    <PageSection className="relative isolate overflow-hidden bg-[#081827] py-6 text-white md:py-7 lg:py-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(83,217,134,0.22),transparent_30%),linear-gradient(90deg,#071422_0%,#0b1d30_100%)]" />
      <div className="mx-auto flex max-w-[88rem] flex-col items-center justify-between gap-5 rounded-[1.7rem] border border-white/12 bg-white/[0.06] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] md:p-6 lg:flex-row">
        <h2 className="whitespace-normal text-center text-[clamp(2rem,3.2vw,3.7rem)] font-extrabold leading-[0.95] tracking-[-0.025em] lg:whitespace-nowrap lg:text-left">
          Start the free Cash Flow Calculator.
        </h2>
        <CTALink
          href={calculatorHref}
          kind="calculator"
          location="home_post_hero_calculator_primary"
          analyticsEvent="calculator_cta_clicked"
          ctaLabel="Run the free calculator"
          className={`${greenButton} w-full min-h-[60px] px-10 text-[1.15rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_24px_56px_rgba(83,217,134,0.32)] sm:w-auto`}
        >
          Run the free calculator <ArrowRight className="ml-2 h-5 w-5" />
        </CTALink>
      </div>
    </PageSection>
  );
}

function CalculatorSpine() {
  const calculatorSteps = [
    {
      label: "1",
      title: "Enter rough numbers",
      copy: "Best guesses are enough.",
    },
    {
      label: "2",
      title: "See the annual leak",
      copy: "See where money may be delayed, missed, or wasted.",
    },
    {
      label: "3",
      title: "See what to check first",
      copy: "Know whether cash, follow-up, or both need a closer look.",
    },
  ];

  return (
    <PageSection
      id="calculator"
      className="relative isolate scroll-mt-[120px] overflow-hidden bg-[#FBFCF7] py-9 text-[#071D3A] md:py-12 lg:py-14"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(8,166,75,0.14),rgba(251,252,247,0)_65%)]" />
      <div className="mx-auto grid max-w-[88rem] gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <h2 className="max-w-[680px] text-balance text-[clamp(2.15rem,4.4vw,4.75rem)] font-extrabold leading-[0.93] tracking-[-0.025em] text-[#071D3A]">
            Start the free Cash Flow Calculator.
          </h2>

          <div className="mt-5 grid gap-2.5">
            {calculatorSteps.map((step) => (
              <div
                key={step.title}
                className="flex gap-3 rounded-[1.1rem] border border-[#dbe9dd] bg-white p-3 shadow-[0_10px_26px_rgba(7,29,58,0.055)]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-sm font-extrabold text-white">
                  {step.label}
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-[#071D3A]">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-semibold leading-5 text-[#607588]">
                    {step.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <CTALink
              href={calculatorHref}
              kind="calculator"
              location="home_calculator_spine_primary"
              analyticsEvent="calculator_cta_clicked"
              ctaLabel="Run the free calculator"
              className={`${greenButton} whitespace-nowrap px-7`}
            >
              Run the free calculator <ArrowRight className="ml-2 h-4 w-4" />
            </CTALink>
            <CTALink
              href={assessmentHref}
              kind="systems"
              location="home_calculator_spine_secondary"
              ctaLabel="Start the Cash Flow Assessment"
              className={`${lightButton} whitespace-nowrap`}
            >
              Start the Cash Flow Assessment
            </CTALink>
          </div>
          <p className="mt-4 text-sm font-semibold text-[#607588]">
            No perfect numbers needed. Use your best guess.
          </p>
        </div>
        <UploadedSectionImage
          image={uploadedHomeImages.calculator}
          priority
          className="scale-[0.98] lg:origin-center"
        />
      </div>
    </PageSection>
  );
}

function LeakTypesSection() {
  return (
    <PageSection className="bg-white text-[#071D3A]">
      <div className="mx-auto max-w-[88rem]">
        <div className="w-full max-w-[95%] lg:max-w-[84rem]">
          <h2 className="max-w-[95%] text-[clamp(1.8rem,3.65vw,3.85rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">
            The leaks are usually boring. That is why they get missed.
          </h2>
          <p className="mt-5 max-w-[95%] text-lg font-semibold leading-8 text-[#536173]">
            Most service businesses do not lose money in one dramatic way. They
            lose it in small handoffs that break every week.
          </p>
        </div>
        <UploadedSectionImage
          image={uploadedHomeImages.leaks}
          className="mt-8 scale-[1.04] lg:origin-center"
        />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CTALink
            href={calculatorHref}
            kind="calculator"
            location="home_leaks_primary"
            analyticsEvent="calculator_cta_clicked"
            ctaLabel="Run the free calculator"
            className={`${greenButton} min-h-[58px] px-9 text-[1.08rem]`}
          >
            Run the free calculator <ArrowRight className="ml-2 h-5 w-5" />
          </CTALink>
          <CTALink
            href={assessmentHref}
            kind="systems"
            location="home_leaks_secondary"
            ctaLabel="Start the Cash Flow Assessment"
            className={`${lightButton} min-h-[58px] px-9 text-[1.08rem]`}
          >
            Cash Flow Assessment
          </CTALink>
        </div>
      </div>
    </PageSection>
  );
}

function AssessmentSection() {
  const assessment = getPrice("workflow_audit");
  return (
    <PageSection
      id="assessment"
      className="bg-[#071422] py-9 text-white md:py-12 lg:py-14"
      navTheme="dark"
    >
      <div className="mx-auto grid max-w-[88rem] gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-center">
        <div>
          <h2 className="max-w-[720px] text-balance text-[clamp(2.05rem,4.55vw,4.9rem)] font-extrabold leading-[0.94] tracking-[-0.025em]">
            Start with the Cash Flow Assessment.
          </h2>
          <p className="mt-4 max-w-[680px] text-base font-semibold leading-7 text-white/72">
            Stanley Systems shows where money is being missed, what it likely
            costs, how to fix every problem found, and what should be worked on
            first. You can use the assessment yourself, or use it as the plan
            for a Systems Installation Sprint.
          </p>
          <ul className="mt-5 grid max-w-[720px] gap-2 text-sm font-semibold leading-6 text-white/78 sm:grid-cols-2">
            {["Office-side leak map", "Fix list for every problem found", "Expected result of each fix", "Build priorities if Stanley Systems installs it"].map((item) => (
              <li key={item} className="flex gap-2 rounded-2xl border border-white/10 bg-white/7 px-3 py-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#53d986]" />{item}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CTALink
              href={assessmentHref}
              kind="checkout"
              location="home_assessment_primary"
              analyticsEvent="audit_checkout_clicked"
              analyticsSource="homepage"
              packageId="workflow_audit"
              packageName="Cash Flow Assessment"
              billingPeriod="one_time"
              ctaLabel="Start the Cash Flow Assessment"
              className={greenButton}
            >
              Start the Cash Flow Assessment{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </CTALink>
            <CTALink
              href={sprintHref}
              kind="systems"
              location="home_assessment_secondary"
              ctaLabel="See how the Sprint works"
              className={darkGhostButton}
            >
              See how the Sprint works
            </CTALink>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[450px] overflow-hidden scale-[0.95] rounded-[2.4rem] lg:max-w-[470px]">
          <Image
            src={uploadedHomeImages.assessment.src}
            alt={uploadedHomeImages.assessment.alt}
            width={uploadedHomeImages.assessment.width}
            height={uploadedHomeImages.assessment.height}
            className="h-auto w-full object-contain"
            sizes="(min-width: 1024px) 36vw, 100vw"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#071422] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#071422] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#071422] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#071422] to-transparent" />
        </div>
      </div>
    </PageSection>
  );
}

function SprintSection() {
  const items = [
    "Build Cashflow Control, Repeat Revenue, or both.",
    "Install the mix of systems your assessment calls for.",
    "Clean up handoffs between calls, estimates, jobs, invoices, payments, reviews, referrals, and past customers.",
    "Connect the tools, records, reminders, and follow-up steps your team actually uses.",
  ];
  return (
    <PageSection id="sprint" className="bg-[#FBFCF7] text-[#071D3A]">
      <div className="mx-auto grid max-w-[88rem] gap-7 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <h2 className="max-w-[760px] text-balance text-[clamp(2.05rem,4.55vw,4.9rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">
            Then Stanley Systems builds the systems your business needs.
          </h2>
          <p className="mt-5 max-w-[650px] text-lg font-semibold leading-8 text-[#536173]">
            The Cash Flow Assessment gives you the map. The Systems Installation Sprint turns that map into working systems for cash, follow-up, reviews, referrals, repeat work, and office handoffs.
          </p>
          <p className="mt-4 max-w-[620px] rounded-2xl border border-[#D8E8DE] bg-white p-4 text-sm font-extrabold leading-6 text-[#244938]">
            Systems Installation Sprint: $1,500. Scope can include Cashflow Control, Repeat Revenue, both, a scoped mix, or another agreed Stanley Systems system.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CTALink href={sprintHref} kind="systems" location="home_sprint_primary" ctaLabel="See how the Sprint works" className={`${greenButton} px-8`}>
              See how the Sprint works <ArrowRight className="ml-2 h-4 w-4" />
            </CTALink>
            <CTALink href={assessmentHref} kind="systems" location="home_sprint_secondary" ctaLabel="Start the Cash Flow Assessment" className={lightButton}>
              Start the Cash Flow Assessment
            </CTALink>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="rounded-[1.35rem] border border-[#d9e7df] bg-white p-5 shadow-[0_14px_36px_rgba(7,29,58,0.055)]">
              <CheckCircle2 className="h-5 w-5 text-[#15803D]" />
              <p className="mt-3 text-sm font-bold leading-6 text-[#334B60]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}

function PackageDemosSection() {
  return (
    <PageSection id="systems" className="bg-[#f4f7f4] text-[#071D3A]">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <h2 className="max-w-[760px] text-balance text-[clamp(2.1rem,4.8vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">
            Pick the system that fixes the right business problem.
          </h2>
          <p className="max-w-[650px] text-lg font-semibold leading-8 text-[#536173]">
            Cashflow Control gets bills and payment follow-up moving faster.
            Repeat Revenue brings past customers back. Start with the assessment
            if you are not sure which one matters most.
          </p>
        </div>
        <div className="mt-9 grid gap-5 xl:grid-cols-3">
          {packageDemos.map((demo) => {
            const price = getPrice(demo.priceId);
            return (
              <article
                key={demo.name}
                className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-[#d9e7df] bg-white p-5 shadow-[0_20px_60px_rgba(7,29,58,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#b8dec5] hover:shadow-[0_28px_82px_rgba(7,29,58,0.12)]"
              >
                <div>
                  <h3 className="text-2xl font-extrabold tracking-[-0.02em]">
                    {demo.name}
                  </h3>
                  <p className="mt-3 text-[clamp(2.1rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.035em] text-[#071D3A]">
                    {price?.priceDisplay}
                  </p>
                  <p className="mt-3 text-sm font-bold leading-6 text-[#536173]">
                    {demo.leak}
                  </p>
                  <CTALink
                    href={assessmentHref}
                    kind="systems"
                    location={`home_package_${demo.priceId}_assessment`}
                    ctaLabel="Cash Flow Assessment"
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#15803D] px-5 text-sm font-extrabold text-white shadow-[0_16px_32px_rgba(21,128,61,0.22)] transition group-hover:bg-[#116f35] hover:-translate-y-0.5"
                  >
                    Cash Flow Assessment
                  </CTALink>
                  <p className="mt-3 rounded-full bg-[#eaf7ee] px-3 py-1 text-center text-xs font-extrabold text-[#15803D]">
                    {price?.setupFeeDisplay} · Assessment credit available
                  </p>
                </div>
                <p className="mt-4 rounded-2xl border border-[#d9e7df] bg-[#f8fcf9] p-3 text-sm font-extrabold leading-6 text-[#244938] md:hidden">
                  {demo.after[0]} → {demo.after[demo.after.length - 1]}
                </p>
                <div className="mt-5 hidden flex-1 gap-4 md:grid md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                  <div className="rounded-2xl border border-[#f2d4d4] bg-[#fff7f7] p-4">
                    <p className="text-sm font-extrabold text-[#991b1b]">
                      Before
                    </p>
                    <ul className="mt-3 space-y-2">
                      {demo.before.map((item) => (
                        <li
                          key={item}
                          className="text-sm font-semibold leading-6 text-[#5f3740]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-[#cae8d2] bg-[#f3fbf5] p-4">
                    <p className="text-sm font-extrabold text-[#15803D]">
                      After
                    </p>
                    <ul className="mt-3 space-y-2">
                      {demo.after.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm font-semibold leading-6 text-[#244938]"
                        >
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row xl:flex-col 2xl:flex-row">
                  <CTALink
                    href={demo.route}
                    kind="systems"
                    location={`home_package_${demo.priceId}_learn`}
                    analyticsEvent="package_learn_more_clicked"
                    ctaLabel={`See ${demo.name}`}
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-[#d5e5da] bg-white px-4 text-sm font-extrabold text-[#071D3A] transition hover:bg-[#f4fbf6]"
                  >
                    See the system
                  </CTALink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </PageSection>
  );
}

function BeforeAfterProofSection() {
  return (
    <PageSection className="bg-white text-[#071D3A]">
      <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <h2 className="text-balance text-[clamp(2.1rem,4.8vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">
            How your business improves with Stanley Systems.
          </h2>
          <p className="mt-5 max-w-[620px] text-lg font-semibold leading-8 text-[#536173]">
            Stanley Systems fixes the office work between customer requests,
            estimates, scheduling, billing, payment follow-up, reviews,
            referrals, and repeat work.
          </p>
        </div>
        <UploadedSectionImage
          image={uploadedHomeImages.beforeAfter}
          className="scale-[1.07] lg:origin-center"
        />
      </div>
    </PageSection>
  );
}

function TrustSection() {
  return (
    <PageSection className="bg-[#fbfcf7] text-[#071D3A]">
      <div className="mx-auto max-w-[72rem] rounded-[2rem] border border-[#d9e7df] bg-white p-6 shadow-[0_22px_70px_rgba(7,29,58,0.07)] md:p-9">
        <h2 className="text-balance text-[clamp(2rem,4vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.025em]">
          Built for service businesses that want bills out faster and customers
          coming back.
        </h2>
        <p className="mt-5 text-lg font-semibold leading-8 text-[#536173]">
          Stanley Systems is for service businesses with real office work,
          invoice delays, customer follow-up, and repeat-business problems. The
          goal is simple: automate office work from customer intake to final
          bill, collect faster, get more customers, and bring old customers
          back.
        </p>
      </div>
    </PageSection>
  );
}

function FinalCashFlowCTA() {
  return (
    <PageSection className="bg-[#071422] text-white" navTheme="dark">
      <div className="mx-auto max-w-[82rem] text-center">
        <h2 className="mx-auto max-w-[900px] text-balance text-[clamp(2.4rem,6vw,6rem)] font-extrabold leading-[0.92] tracking-[-0.025em]">
          Stop letting cash, follow-up, and good customers slip through the cracks.
        </h2>
        <p className="mx-auto mt-6 max-w-[720px] text-lg font-semibold leading-8 text-white/70">
          Run the free calculator for a rough signal. Start the Cash Flow Assessment
          when you want the full map. If you want Stanley Systems to build the
          systems, the Sprint is the next step.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <CTALink
            href={assessmentHref}
            kind="systems"
            location="home_final_primary"
            ctaLabel="Start the Cash Flow Assessment"
            className={greenButton}
          >
            Start the Cash Flow Assessment{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </CTALink>
          <CTALink
            href={calculatorHref}
            kind="calculator"
            location="home_final_secondary"
            analyticsEvent="calculator_cta_clicked"
            ctaLabel="Run the free calculator"
            className={darkGhostButton}
          >
            Run the free calculator
          </CTALink>
        </div>
      </div>
    </PageSection>
  );
}

export function CashFlowHomepage() {
  return (
    <>
      <section
        data-audit-page="/"
        data-audit-section="home.hero"
        data-nav-theme="dark"
        className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#071422] px-5 pb-16 pt-[132px] text-white md:px-8 lg:px-10 lg:pb-24 lg:pt-[150px]"
      >
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_74%_28%,rgba(83,217,134,0.16),transparent_30%),radial-gradient(circle_at_8%_12%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#071422_0%,#05101c_100%)]" />
        <HeroImageSlideshow />
        <div className="mx-auto w-full max-w-[92rem]">
          <div className="relative z-10 max-w-[860px]">
            <h1 className="max-w-[850px] text-balance text-[clamp(2.3rem,5.55vw,5.8rem)] font-extrabold leading-[0.91] tracking-[-0.025em] text-white">
              Find the money your service business is missing.
            </h1>
            <p className="mt-7 max-w-[620px] text-pretty text-lg font-semibold leading-8 text-[#d3dce7] sm:text-xl">
              Run the free calculator. See what calls, invoices, follow-ups,
              reviews, referrals, and past customers cost your business.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTALink
                href={calculatorHref}
                kind="calculator"
                location="home_hero_primary"
                analyticsEvent="calculator_cta_clicked"
                ctaLabel="Run the free calculator"
                className={`${greenButton} px-8 text-[1.05rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_20px_50px_rgba(83,217,134,0.28)] hover:-translate-y-1 hover:scale-[1.02]`}
              >
                Run the free calculator{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </CTALink>
              <CTALink
                href={assessmentHref}
                kind="systems"
                location="home_hero_secondary"
                ctaLabel="Start the Cash Flow Assessment"
                className={darkGhostButton}
              >
                Start the Cash Flow Assessment
              </CTALink>
            </div>
          </div>
        </div>
      </section>
      <OfferPathSection />
      <CalculatorLaunchSection />
      <CalculatorSpine />
      <AssessmentSection />
      <SprintSection />
      <SystemsThatMakeMoneySection />
      <BeforeAfterProofSection />
      <FinalCashFlowCTA />
    </>
  );
}
