"use client"
import Image from "next/image"
import type React from "react"
import type { ComponentProps, ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { FacebookIcon, LinkedinIcon, Phone } from "lucide-react"
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

const STANLEY_FACEBOOK_URL = "https://www.facebook.com/stanleysystems/"
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
    label: "What Stanley fixes",
    links: [
      { title: "Slow invoicing", href: "#pricing" },
      { title: "Missed follow-up", href: "#pricing" },
      { title: "Office handoff problems", href: "#pricing" },
      { title: "Book a meeting", href: "https://calendly.com/jadenodorczuk24/30min", external: true },
    ],
  },
  {
    label: "Get in touch",
    links: [
      { title: "Call: +1 (617) 958-6372", href: "tel:+16179586372", external: true, icon: Phone },
      { title: "hello@stanley-systems.com", href: "mailto:hello@stanley-systems.com", external: true },
      { title: "Boston, MA", href: "/contact" },
      { title: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    label: "Social",
    links: [
      { title: "Facebook", href: STANLEY_FACEBOOK_URL, icon: FacebookIcon, external: true },
      { title: "LinkedIn", href: STANLEY_LINKEDIN_URL, icon: LinkedinIcon, external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative mx-auto flex w-[calc(100%-2rem)] max-w-[1380px] flex-col items-center justify-center rounded-t-4xl border-t border-slate-200 bg-white px-6 py-12 shadow-[0_-10px_30px_rgba(15,23,42,0.04)] md:w-[calc(100%-3rem)] md:rounded-t-[3rem] md:px-8 lg:py-16 xl:px-10">
      <div className="absolute left-1/2 right-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 blur" />

      <div className="mb-8 hidden w-full rounded-[1.5rem] border border-[#e8e1d3] bg-[#fbfaf7] px-5 py-5 text-center shadow-[0_12px_30px_rgba(15,23,42,0.04)] sm:block sm:px-6">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a href="tel:+16179586372" className="inline-flex items-center rounded-full border border-[#d8d1c4] bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:bg-[#f4efe6] sm:text-base">
            <Phone className="mr-2 h-4 w-4" />
            Call now
          </a>
          <a href="https://calendly.com/jadenodorczuk24/30min" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-[#15803D] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#166534] sm:text-base">
            Book a meeting
          </a>
        </div>
      </div>

      <div className="grid w-full gap-8 xl:grid-cols-[1.1fr_3.4fr] xl:gap-12">
        <AnimatedContainer className="space-y-4">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-[#e8e1d3] bg-[#f8f6f1] shadow-sm">
            <Image
              src="/generated-logo-icon/001-create-an-icon-only-professional-logo-ma.png"
              alt="Stanley Systems logo"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
          </div>
          <div className="hidden text-sm text-slate-500 md:block">
            <p>© {new Date().getFullYear()} Stanley Systems. All rights reserved.</p>
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
                        <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex items-center transition-all duration-300 hover:text-slate-900">
                          {link.icon && <link.icon className="me-1 size-4" />}
                          {link.title}
                        </a>
                      ) : (
                        <Link href={link.href} className="inline-flex items-center transition-all duration-300 hover:text-slate-900">
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
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Stanley Systems. All rights reserved.</p>
      </div>

      <div className="mt-8 hidden w-full border-t border-slate-200 pt-6 md:block">
        <p className="text-center text-xs text-slate-400">Book a meeting or tap the phone number if you want the fastest answer.</p>
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
