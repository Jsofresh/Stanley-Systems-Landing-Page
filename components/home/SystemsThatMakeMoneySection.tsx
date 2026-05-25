import type * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { CTALink } from "@/components/cta-link";
import { cn } from "@/lib/utils";

export type SystemsThatMakeMoneySectionProps =
  React.HTMLAttributes<HTMLElement>;

type ProductSystem = {
  title: string;
  promise: string;
  href: string;
  analyticsLocation: string;
  packageName: string;
  ctaLabel: string;
  visualSrc: string;
  visualAlt: string;
  bullets: readonly string[];
};

const systems: ProductSystem[] = [
  {
    title: "Cashflow Control System",
    promise: "Get finished work billed, followed up, and paid faster.",
    href: "/systems/cashflow-control",
    analyticsLocation: "home_systems_cashflow_control",
    packageName: "Cashflow Control System",
    ctaLabel: "See the Cashflow Control System",
    visualSrc: "/images/uploaded/homepage/cashflow-control-system.jpg",
    visualAlt:
      "Cashflow Control System visual for moving finished work into collected cash faster.",
    bullets: [
      "Invoices move out faster",
      "Payment follow-up stays visible",
    ],
  },
  {
    title: "Repeat Revenue System",
    promise:
      "Turn missed calls, happy customers, reviews, referrals, and past customers into more booked work.",
    href: "/systems/repeat-revenue",
    analyticsLocation: "home_systems_repeat_revenue",
    packageName: "Repeat Revenue System",
    ctaLabel: "See the Repeat Revenue System",
    visualSrc: "/images/uploaded/homepage/repeat-revenue-system.jpg",
    visualAlt:
      "Repeat Revenue System visual for turning past customers, reviews, referrals, and missed calls into booked work.",
    bullets: [
      "Happy customers create reviews and referrals",
      "Past customers get a follow-up path",
    ],
  },
];

function ProductSystemCard({ system }: { system: ProductSystem }) {
  return (
    <article className="h-full overflow-hidden rounded-[26px] border border-[#D8E8DE] bg-white shadow-[0_18px_48px_rgba(7,29,58,0.07)]">
      <div className="relative border-b border-[#E2EDE5] bg-[#F8FCF6]">
        <Image
          src={system.visualSrc}
          alt={system.visualAlt}
          width={1536}
          height={1024}
          className="h-[190px] w-full object-contain p-2 sm:h-[220px] lg:h-[245px]"
          loading="eager"
        />
      </div>

      <div className="p-5 sm:p-6">
        <h3
          style={{ fontFamily: "var(--font-heading)" }}
          className="text-[27px] font-extrabold leading-[1.02] tracking-[-0.025em] text-[#071D3A] sm:text-[33px] [font-family:var(--font-heading)]"
        >
          {system.title}
        </h3>
        <p className="mt-2 max-w-[560px] text-[15px] font-semibold leading-6 text-[#41596C]">
          {system.promise}
        </p>

        <ul className="mt-4 grid gap-2.5">
          {system.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex gap-2.5 text-[14px] font-semibold leading-5 text-[#243D52]"
            >
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#08A64B]"
                aria-hidden="true"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <CTALink
          href={system.href}
          kind="systems"
          location={system.analyticsLocation}
          analyticsEvent="system_detail_clicked"
          packageName={system.packageName}
          ctaLabel={system.ctaLabel}
          className="mt-5 inline-flex items-center text-[14px] font-extrabold text-[#116832] underline decoration-[#9ed9b2] underline-offset-4 transition hover:text-[#071D3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#08A64B]"
        >
          {system.title.includes("Cashflow") ? "See Cashflow Control" : "See Repeat Revenue"}
          <ArrowRight className="ml-2 h-3.5 w-3.5" aria-hidden="true" />
        </CTALink>
      </div>
    </article>
  );
}

export function SystemsThatMakeMoneySection({
  className,
  ...props
}: SystemsThatMakeMoneySectionProps) {
  return (
    <section
      id="systems"
      data-section="systems-that-move-money"
      data-nav-theme="light"
      className={cn(
        "relative isolate scroll-mt-32 overflow-hidden bg-[#FBFCF7] px-5 py-12 md:px-8 md:py-16 lg:px-10",
        className,
      )}
      aria-labelledby="systems-that-move-money-heading"
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-0 top-6 -z-10 mx-auto h-44 max-w-[680px] rounded-full bg-[radial-gradient(circle,rgba(8,166,75,0.08),rgba(251,252,247,0)_68%)] blur-2xl" />
      <div className="mx-auto max-w-[78rem]">
        <div className="mx-auto max-w-[800px] text-center">
          <h2
            id="systems-that-move-money-heading"
            style={{ fontFamily: "var(--font-heading)" }}
            className="text-balance text-[34px] font-extrabold leading-[1] tracking-[-0.045em] text-[#071D3A] sm:text-[44px] lg:text-[50px] [font-family:var(--font-heading)]"
          >
            Systems That Make Your Business Money
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-base font-semibold leading-7 text-[#536173]">
            The assessment decides which parts matter most.
          </p>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2 lg:items-stretch">
          {systems.map((system) => (
            <ProductSystemCard key={system.title} system={system} />
          ))}
        </div>
      </div>
    </section>
  );
}
