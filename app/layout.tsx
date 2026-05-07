import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { PageTransition } from "@/components/page-transition"
import { NavigationTransition } from "@/components/navigation-transition"
import { Dancing_Script, Caveat, Inter, Manrope, Montserrat, Nunito_Sans, Space_Grotesk, Work_Sans } from "next/font/google"
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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-logo",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
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
      <body className={`font-sans antialiased ${neueMontreal.variable} ${dancingScript.variable} ${caveat.variable} ${manrope.variable} ${montserrat.variable} ${inter.variable} ${spaceGrotesk.variable} ${nunitoSans.variable} ${workSans.variable}`}>
        <Suspense fallback={null}>
          <NavigationTransition />
          <PageTransition>{children}</PageTransition>
        </Suspense>
      </body>
    </html>
  )
}
