"use client"
import type React from "react"
import type { ComponentProps, ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  external?: boolean
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const STANLEY_FACEBOOK_URL = "https://www.facebook.com/stanleysystems"
const STANLEY_LINKEDIN_URL = "https://www.linkedin.com/company/stanley-systems"

const footerLinks: FooterSection[] = [
  {
    label: "Explore",
    links: [
      { title: "Home", href: "/" },
      { title: "Contact", href: "/contact" },
      { title: "Blog", href: "/blog" },
      { title: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    label: "Services",
    links: [
      { title: "Invoice & Billing Automation", href: "#pricing" },
      { title: "Lead Follow-Up Automation", href: "#pricing" },
      { title: "System Integrations", href: "#pricing" },
      { title: "Workflow Audit", href: "https://calendly.com/jadenodorczuk24/30min", external: true },
    ],
  },
  {
    label: "Get in Touch",
    links: [
      { title: "hello@stanley-systems.com", href: "mailto:hello@stanley-systems.com", external: true },
      { title: "+1 (781) 913-7585", href: "tel:+17819137585", external: true },
      { title: "Boston, MA", href: "/contact" },
      { title: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    label: "Social Links",
    links: [
      { title: "Facebook", href: STANLEY_FACEBOOK_URL, icon: FacebookIcon, external: true },
      { title: "Instagram", href: "https://instagram.com", icon: InstagramIcon, external: true },
      { title: "LinkedIn", href: STANLEY_LINKEDIN_URL, icon: LinkedinIcon, external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative mx-auto flex w-[calc(100%-2rem)] max-w-[1380px] flex-col items-center justify-center rounded-t-4xl border-t border-slate-200 bg-white px-6 py-12 shadow-[0_-10px_30px_rgba(15,23,42,0.04)] md:w-[calc(100%-3rem)] md:rounded-t-[3rem] md:px-8 lg:py-16 xl:px-10">
      <div className="absolute top-0 left-1/2 right-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 blur" />

      <div className="grid w-full gap-8 xl:grid-cols-[1.1fr_3.4fr] xl:gap-12">
        <AnimatedContainer className="space-y-4">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-[#e8e1d3] bg-[#f8f6f1] text-lg font-semibold text-slate-900">SS</div>
          <div className="hidden text-sm text-slate-500 md:mt-0 md:block">
            <p>© {new Date().getFullYear()} Stanley Systems preview. All rights reserved.</p>
          </div>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10 xl:mt-0 xl:justify-between">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{section.label}</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center transition-all duration-300 hover:text-slate-900"
                        >
                          {link.icon && <link.icon className="me-1 size-4" />}
                          {link.title}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="inline-flex items-center transition-all duration-300 hover:text-slate-900"
                        >
                          {link.icon && <link.icon className="me-1 size-4" />}
                          {link.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-2 text-center md:hidden">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Stanley Systems preview. All rights reserved.</p>
        <p className="text-xs text-slate-400">Professional preview routes for review and polish.</p>
      </div>

      <div className="mt-8 hidden w-full border-t border-slate-200 pt-6 md:block">
        <p className="text-center text-xs text-slate-400">Ready to see where you're losing 10+ hours a week?</p>
      </div>
    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>["className"]
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return children
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
