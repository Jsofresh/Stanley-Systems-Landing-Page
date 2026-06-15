"use client"
import Image from "next/image"
import type React from "react"
import type { ReactNode } from "react"
import { LinkedinIcon, Phone } from "lucide-react"
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

const STANLEY_YOUTUBE_URL = "https://www.youtube.com/@stanley-systems"
const STANLEY_TIKTOK_URL = "https://www.tiktok.com/@stanleysystems"
const STANLEY_INSTAGRAM_URL = "https://www.instagram.com/stanleysystems/"
const STANLEY_FACEBOOK_URL = "https://www.facebook.com/people/Stanley-Systems/61588396156836/"
const STANLEY_X_URL = "https://x.com/StanleySystems_"
const STANLEY_LINKEDIN_URL = "https://www.linkedin.com/company/stanley-systems/"

const footerLinks: FooterSection[] = [
  {
    label: "Solutions",
    links: [
      { title: "AI Office Map", href: "/ai-office-map" },
      { title: "Free AI Office Blueprint", href: "/ai-office-blueprint" },
      { title: "AI Office Installation Sprint", href: "/systems-installation-sprint" },
      { title: "AI Office Ops", href: "/pricing#ai-office-ops" },
      { title: "How Stanley Systems Works", href: "/how-stanley-systems-works" },
      { title: "Who We Help", href: "/who-stanley-systems-helps" },
    ],
  },
  {
    label: "Industries",
    links: [
      { title: "Marine service businesses", href: "/marine-service-automation" },
      { title: "Field service businesses", href: "/field-service-automation" },
      { title: "Who we help", href: "/who-stanley-systems-helps" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "How Stanley Systems Works", href: "/how-stanley-systems-works" },
      { title: "Pricing", href: "/pricing" },
      { title: "Proof", href: "/stanley-systems-case-study" },
      { title: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Legal",
    links: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms and Conditions", href: "/terms-and-conditions" },
      { title: "Safety", href: "/safety" },
    ],
  },
  {
    label: "Connect",
    links: [
      { title: "Call: +1 (617) 958-6372", href: "tel:+16179586372", external: true, icon: Phone },
      { title: "jaden@stanley-systems.com", href: "mailto:jaden@stanley-systems.com", external: true },
      { title: "YouTube", href: STANLEY_YOUTUBE_URL, external: true },
      { title: "TikTok", href: STANLEY_TIKTOK_URL, external: true },
      { title: "Instagram", href: STANLEY_INSTAGRAM_URL, external: true },
      { title: "Facebook", href: STANLEY_FACEBOOK_URL, external: true },
      { title: "X", href: STANLEY_X_URL, external: true },
      { title: "LinkedIn", href: STANLEY_LINKEDIN_URL, icon: LinkedinIcon, external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer data-nav-theme="light" className="relative mx-auto flex w-[calc(100%-2rem)] max-w-[1380px] flex-col items-center rounded-t-[2rem] border-t border-slate-200 bg-white px-5 py-6 shadow-[0_-10px_30px_rgba(15,23,42,0.04)] md:w-[calc(100%-3rem)] md:rounded-t-[3rem] md:px-8 md:py-8 lg:py-10 xl:px-10">
      <div className="absolute left-1/2 right-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-300 blur" />



      <div className="grid w-full gap-4 md:gap-8 xl:grid-cols-[1.1fr_3.4fr] xl:gap-12">
        <AnimatedContainer className="hidden space-y-4 md:block">
          <div className="flex size-32 items-center justify-center">
            <Image
              src="/stanley-logo-new.jpg"
              alt="Stanley Systems logo"
              width={128}
              height={128}
              className="h-32 w-32 object-contain"
              priority
            />
          </div>
          <div className="hidden text-sm text-slate-500 md:block">
            <p>© {new Date().getFullYear()} Stanley Systems. All rights reserved.</p>
          </div>
        </AnimatedContainer>

        <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 md:mt-4 md:grid-cols-4 md:gap-10 xl:mt-0 xl:justify-between">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-0">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{section.label}</h3>
                <ul className="mt-3 space-y-1.5 text-sm leading-6 text-slate-600">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      {link.external ? (
                        <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={link.title === "X" ? "Stanley Systems on X" : undefined} className={`inline-flex max-w-full items-center transition-all duration-300 hover:text-slate-900 ${link.href.startsWith("tel:") ? "whitespace-nowrap" : "break-words"}`}>
                          {link.icon && <link.icon className="me-1 size-4 shrink-0" />}
                          <span className="min-w-0">{link.title}</span>
                        </a>
                      ) : (
                        <Link href={link.href} className="inline-flex max-w-full items-center break-words transition-all duration-300 hover:text-slate-900">
                          {link.icon && <link.icon className="me-1 size-4 shrink-0" />}
                          <span className="min-w-0">{link.title}</span>
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

      <div className="mt-5 space-y-2 text-center md:hidden">
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Stanley Systems. All rights reserved.</p>
      </div>

    </footer>
  )
}

type ViewAnimationProps = {
  delay?: number
  className?: string
  children: ReactNode
}

function AnimatedContainer({ className, children }: ViewAnimationProps) {
  return <div className={className}>{children}</div>
}
