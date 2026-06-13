"use client"

import type { ReactNode } from "react"
import { Download } from "lucide-react"

const pdfHref = "/ai-office-blueprint/download-pdf"
const pdfFilename = "stanley-ai-office-blueprint-7-fixes.pdf"

export function DownloadPdfButton({
  children,
  className,
  iconClassName = "h-5 w-5",
  iconPosition = "start",
}: {
  children: ReactNode
  className: string
  iconClassName?: string
  iconPosition?: "start" | "end"
}) {
  async function downloadPdf() {
    try {
      const response = await fetch(pdfHref, { cache: "no-store" })
      if (!response.ok) throw new Error("PDF download failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = pdfFilename
      anchor.rel = "noopener"
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      const anchor = document.createElement("a")
      anchor.href = pdfHref
      anchor.download = pdfFilename
      anchor.rel = "noopener"
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
    }
  }

  return (
    <button type="button" onClick={downloadPdf} className={className}>
      {iconPosition === "start" ? <Download className={iconClassName} aria-hidden="true" /> : null}
      {children}
      {iconPosition === "end" ? <Download className={iconClassName} aria-hidden="true" /> : null}
    </button>
  )
}
