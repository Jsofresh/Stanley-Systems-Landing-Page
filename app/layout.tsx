import type { Metadata } from "next"
import type React from "react"
import localFont from "next/font/local"
import "./globals.css"

const neueMontreal = localFont({
  src: [
    { path: "./fonts/neue-montreal/NeueMontreal-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/neue-montreal/NeueMontreal-Medium.woff2", weight: "500 600", style: "normal" },
    { path: "./fonts/neue-montreal/NeueMontreal-Bold.woff2", weight: "700 900", style: "normal" },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://stanley-systems.com"),
  title: "Stanley Systems | A Connected AI Office Is Coming",
  description: "Stanley Systems is building a connected AI office for service businesses.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://stanley-systems.com" },
  openGraph: {
    title: "A connected AI office is coming.",
    description: "Stanley Systems is building a connected AI office for service businesses.",
    url: "https://stanley-systems.com",
    siteName: "Stanley Systems",
    type: "website",
  },
  icons: { icon: "/favicon.ico", apple: "/apple-icon.png" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${neueMontreal.variable} ${neueMontreal.className}`}>{children}</body>
    </html>
  )
}
