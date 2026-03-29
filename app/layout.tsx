import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { PageTransition } from "@/components/page-transition"
import { NavigationTransition } from "@/components/navigation-transition"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Dancing_Script, Caveat } from "next/font/google"

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://stanley-systems.com"),
  title: "Stanley Systems | Backend Bottleneck Removal for Service Businesses",
  description:
    "Stanley Systems helps blue-collar service businesses remove backend bottlenecks so they can get paid faster, follow up automatically, and stop losing time to manual admin.",
  openGraph: {
    title: "Stanley Systems | Backend Bottleneck Removal for Service Businesses",
    description:
      "Stanley Systems helps blue-collar service businesses remove backend bottlenecks so they can get paid faster, follow up automatically, and stop losing time to manual admin.",
    url: "https://stanley-systems.com",
    siteName: "Stanley Systems",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stanley Systems | Backend Bottleneck Removal for Service Businesses",
    description:
      "Stanley Systems helps blue-collar service businesses remove backend bottlenecks so they can get paid faster, follow up automatically, and stop losing time to manual admin.",
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
        name: "Is this going to turn into a big project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The starting point is usually one or two fixes that make the clearest difference first.",
        },
      },
      {
        "@type": "Question",
        name: "Who is this best for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Owner-led service businesses where billing, follow-up, office handoffs, or repeat admin are slowing things down.",
        },
      },
      {
        "@type": "Question",
        name: "What if we are not sure where the real problem is?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "That is fine. The first call is used to figure out where the bottleneck actually is.",
        },
      },
      {
        "@type": "Question",
        name: "Will my team still control the workflow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Your team stays in control, and you own what gets built.",
        },
      },
      {
        "@type": "Question",
        name: "How long does setup usually take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on the bottleneck, but the goal is to get the first useful fix in place quickly instead of dragging things out.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to stop operations while this gets set up?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The goal is to improve how the business runs without disrupting the team.",
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
    logo: "https://stanley-systems.com/stanley-logo-new.jpg",
    image: "https://stanley-systems.com/stanley-logo-new.jpg",
    description:
      "Stanley Systems helps blue-collar service businesses remove backend bottlenecks so they can get paid faster, follow up automatically, and stop losing time to manual admin.",
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
    alternateName: "Stanley Systems Automation",
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
      <body className={`font-sans antialiased ${dancingScript.variable} ${caveat.variable}`}>
        <Suspense fallback={null}>
          <NavigationTransition />
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  )
}
