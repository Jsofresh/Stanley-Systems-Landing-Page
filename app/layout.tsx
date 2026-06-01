import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { PageTransition } from "@/components/page-transition"
import { NavigationTransition } from "@/components/navigation-transition"
import localFont from "next/font/local"

const neueMontreal = localFont({
  src: [
    {
      path: "./fonts/neue-montreal/NeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/neue-montreal/NeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/neue-montreal/NeueMontreal-Bold.woff2",
      weight: "700 900",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
  preload: true,
})

const fontAliases = {
  "--font-dancing-script": "var(--font-neue-montreal)",
  "--font-caveat": "var(--font-neue-montreal)",
  "--font-manrope": "var(--font-neue-montreal)",
  "--font-logo": "var(--font-neue-montreal)",
  "--font-inter": "var(--font-neue-montreal)",
  "--font-space-grotesk": "var(--font-neue-montreal)",
  "--font-nunito-sans": "var(--font-neue-montreal)",
  "--font-work-sans": "var(--font-neue-montreal)",
} as React.CSSProperties

const siteTitle = "Stanley Systems | Find and Stop Cash Flow Leaks"
const siteDescription =
  "Stanley Systems helps service businesses find the money leaking through missed calls, late invoices, forgotten follow-ups, and past customers nobody contacts again — then builds the system that stops it."
const siteLogoPath = "/stanley-systems-logo-reference.jpg"
const siteLogoUrl = `https://stanley-systems.com${siteLogoPath}`

export const metadata: Metadata = {
  metadataBase: new URL("https://stanley-systems.com"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://stanley-systems.com",
    siteName: "Stanley Systems",
    images: [{ url: siteLogoPath, width: 1024, height: 1024, alt: "Stanley Systems logo" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteLogoPath],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://stanley-systems.com",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do we need to switch software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Stanley Systems works inside the tools the team already uses whenever possible.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Cash Flow Assessment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It is a $97 assessment where Stanley Systems finds where money is leaking through missed calls, late invoices, forgotten follow-ups, and past customers nobody contacts again.",
        },
      },
      {
        "@type": "Question",
        name: "Who is this best for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Owner-led service businesses where cash is being lost in day-to-day gaps like billing delays, missed callbacks, weak follow-up, or dormant customer lists.",
        },
      },
      {
        "@type": "Question",
        name: "What if we are not sure where the real leak is?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "That is exactly what the Cash Flow Assessment is for: it shows where the money is leaking and what system should be built first to stop it.",
        },
      },
      {
        "@type": "Question",
        name: "Will my team still control the process?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Your team stays in control, and you own what gets built.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after the assessment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stanley Systems shows which billing, follow-up, review, referral, or repeat-customer systems should be installed first, then turns that plan into systems your business can use.",
        },
      },
    ],
  }

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Stanley Systems",
    legalName: "Stanley Systems",
    url: "https://stanley-systems.com",
    logo: siteLogoUrl,
    image: siteLogoUrl,
    description: siteDescription,
    telephone: "+16179586372",
    email: "hello@stanley-systems.com",
    areaServed: ["US"],
    sameAs: [
      "https://www.linkedin.com/company/stanley-systems/",
      "https://www.facebook.com/stanleysystems/",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stanley Systems",
    alternateName: "Stanley Systems Cash Flow Systems",
    url: "https://stanley-systems.com",
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`font-sans antialiased ${neueMontreal.variable}`} style={fontAliases}>
        <Suspense fallback={null}>
          <NavigationTransition />
          <PageTransition>{children}</PageTransition>
        </Suspense>
      </body>
    </html>
  )
}
