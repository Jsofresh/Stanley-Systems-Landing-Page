import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { CTALink } from "@/components/cta-link";
import { pricingPackages } from "@/lib/pricing/source-of-truth";

const calculatorHref = "/invoicing-delay-cash-flow-calculator";
const assessmentHref = "/workflow-audit";

const heroSlideshowImages = [
  {
    src: "/images/uploaded/homepage/hero-slideshow/hero-tech-van-outside.jpg",
    alt: "Service technician van outside a customer location",
  },
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
];

const uploadedHomeImages = {
  calculator: {
    src: "/images/uploaded/homepage/cash-flow-rework/annual-money-left-on-the-table-estimated-annual-leak.jpg",
    alt: "Annual money left on the table estimate for service businesses",
    width: 1280,
    height: 800,
  },
  leaks: {
    src: "/images/uploaded/homepage/cash-flow-rework/service-business-leak-types.jpg",
    alt: "Four common service-business money leaks: missed calls, late invoices, forgotten follow-ups, and past customers",
    width: 1280,
    height: 426,
  },
  assessment: {
    src: "/images/uploaded/homepage/cash-flow-rework/cash-flow-assessment-vertical-section-bg.jpg",
    alt: "Cash Flow Assessment steps: find money leaks, estimate cost, pick first system, avoid the wrong build",
    width: 1024,
    height: 1280,
  },
  beforeAfter: {
    src: "/images/uploaded/homepage/cash-flow-rework/before-after-cash-flow-system.jpg",
    alt: "Before and after view of a service business with better customer logging, invoice sending, payment follow-up, and repeat customers",
    width: 1280,
    height: 589,
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
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[66%] overflow-hidden lg:block"
    >
      <div className="absolute inset-y-[5%] right-[-8%] w-[108%] overflow-hidden rounded-l-[4rem]">
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
            style={{ animationDelay: `${index * 5}s` }}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071422_0%,rgba(7,20,34,0.96)_10%,rgba(7,20,34,0.72)_22%,rgba(7,20,34,0.26)_42%,rgba(7,20,34,0)_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,20,34,0)_44%,rgba(7,20,34,0.16)_68%,rgba(7,20,34,0.62)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#071422] via-[#071422]/54 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#071422] via-[#071422]/58 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[14%] bg-gradient-to-l from-[#071422] via-[#071422]/55 to-transparent" />
      </div>
    </div>
  );
}

function CalculatorSpine() {
  return (
    <PageSection
      id="calculator"
      className="relative isolate overflow-hidden bg-[#FBFCF7] text-[#071D3A] lg:py-20"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(8,166,75,0.14),rgba(251,252,247,0)_65%)]" />
      <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div>
          <h2 className="max-w-[680px] text-balance text-[clamp(2.4rem,5vw,5.4rem)] font-extrabold leading-[0.93] tracking-[-0.025em] text-[#071D3A]">
            See how much money is being left on the table.
          </h2>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CTALink
              href={calculatorHref}
              kind="calculator"
              location="home_calculator_spine_primary"
              analyticsEvent="calculator_cta_clicked"
              ctaLabel="Start the calculator"
              className={`${greenButton} whitespace-nowrap px-7`}
            >
              Start the calculator <ArrowRight className="ml-2 h-4 w-4" />
            </CTALink>
            <CTALink
              href={assessmentHref}
              kind="systems"
              location="home_calculator_spine_secondary"
              ctaLabel="Start the Cash Flow Assessment"
              className={lightButton}
            >
              Cash Flow Assessment
            </CTALink>
          </div>
          <p className="mt-4 text-sm font-semibold text-[#607588]">
            No perfect numbers needed. Use your best guess.
          </p>
        </div>
        <UploadedSectionImage
          image={uploadedHomeImages.calculator}
          priority
          className="scale-[1.07] lg:origin-center"
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
          <h2 className="max-w-[95%] text-[clamp(2rem,4.05vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">
            The leaks are usually boring. That is why they get missed.
          </h2>
          <p className="mt-5 max-w-[95%] text-lg font-semibold leading-8 text-[#536173]">
            Most service businesses do not lose money in one dramatic way. They
            lose it in small handoffs that break every week.
          </p>
        </div>
        <UploadedSectionImage
          image={uploadedHomeImages.leaks}
          className="mt-9 scale-[1.07] lg:origin-center"
        />
      </div>
    </PageSection>
  );
}

function AssessmentSection() {
  const assessment = getPrice("workflow_audit");
  return (
    <PageSection
      id="assessment"
      className="bg-[#071422] text-white"
      navTheme="dark"
    >
      <div className="mx-auto grid max-w-[88rem] gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div>
          <h2 className="max-w-[760px] text-balance text-[clamp(2.2rem,5vw,5.4rem)] font-extrabold leading-[0.94] tracking-[-0.025em]">
            Start with the Cash Flow Assessment.
          </h2>
          <p className="mt-5 max-w-[650px] text-lg font-semibold leading-8 text-white/72">
            The Cash Flow Assessment is the paid first step. Stanley Systems
            looks at where money is being missed, what it likely costs, and
            which system should be built first.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
              href={calculatorHref}
              kind="calculator"
              location="home_assessment_secondary"
              analyticsEvent="calculator_cta_clicked"
              ctaLabel="Calculate the leak"
              className={darkGhostButton}
            >
              Calculate the leak
            </CTALink>
          </div>
        </div>
        <div
          className="mx-auto w-full max-w-[560px] scale-[1.07] lg:max-w-[590px]"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse at center, #000 70%, rgba(0,0,0,0.78) 84%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse at center, #000 70%, rgba(0,0,0,0.78) 84%, transparent 100%)",
          }}
        >
          <Image
            src={uploadedHomeImages.assessment.src}
            alt={uploadedHomeImages.assessment.alt}
            width={uploadedHomeImages.assessment.width}
            height={uploadedHomeImages.assessment.height}
            className="h-auto w-full object-contain"
            sizes="(min-width: 1024px) 36vw, 100vw"
          />
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
            Stanley Systems builds the office layer that gets bills out faster,
            keeps payment follow-up moving, and brings past customers back.
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
          Stop letting finished work and good customers slip away.
        </h2>
        <p className="mx-auto mt-6 max-w-[720px] text-lg font-semibold leading-8 text-white/70">
          Use the calculator, see the money left on the table, then start the
          Cash Flow Assessment. Stanley Systems will show which billing,
          follow-up, or repeat-customer system should be fixed first.
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
            ctaLabel="Calculate the leak"
            className={darkGhostButton}
          >
            Calculate the leak
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
        className="relative isolate overflow-hidden bg-[#071422] px-5 pb-16 pt-[132px] text-white md:px-8 lg:px-10 lg:pb-24 lg:pt-[150px]"
      >
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_74%_28%,rgba(83,217,134,0.16),transparent_30%),radial-gradient(circle_at_8%_12%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#071422_0%,#05101c_100%)]" />
        <HeroImageSlideshow />
        <div className="mx-auto max-w-[92rem]">
          <div className="relative z-10 max-w-[860px]">
            <h1 className="max-w-[850px] text-balance text-[clamp(2.3rem,5.55vw,5.8rem)] font-extrabold leading-[0.91] tracking-[-0.025em] text-white">
              Find the money your service business is missing.
            </h1>
            <p className="mt-7 max-w-[620px] text-pretty text-lg font-semibold leading-8 text-[#d3dce7] sm:text-xl">
              See where calls, invoices, follow-ups, and past customers are
              costing the business real cash.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTALink
                href={assessmentHref}
                kind="systems"
                location="home_hero_primary"
                ctaLabel="Cash Flow Assessment"
                className={`${greenButton} px-8 text-[1.05rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_20px_50px_rgba(83,217,134,0.28)] hover:-translate-y-1 hover:scale-[1.02]`}
              >
                Cash Flow Assessment <ArrowRight className="ml-2 h-4 w-4" />
              </CTALink>
              <CTALink
                href="#calculator"
                kind="calculator"
                location="home_hero_secondary"
                analyticsEvent="calculator_cta_clicked"
                ctaLabel="Start the calculator"
                className={darkGhostButton}
              >
                Start the calculator
              </CTALink>
            </div>
          </div>
        </div>
      </section>
      <CalculatorSpine />
      <LeakTypesSection />
      <AssessmentSection />
      <PackageDemosSection />
      <BeforeAfterProofSection />
      <TrustSection />
      <FinalCashFlowCTA />
    </>
  );
}
