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

const siteTitle = "Stanley Systems AI Office"
const siteDescription =
  "Stanley Systems installs a connected AI office around supported CRM, accounting, documents, and company knowledge so the current team can handle more office work."
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
    images: [{ url: siteLogoUrl, width: 1024, height: 1024, alt: "Stanley Systems logo" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteLogoUrl],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://stanley-systems.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
    email: "jaden@stanley-systems.com",
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
    alternateName: "Stanley Systems Office Workflow Systems",
    url: "https://stanley-systems.com",
  }

  return (
    <html lang="en">
      <head>
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
