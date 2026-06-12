import { chromium } from "playwright"
import type { AiOfficeBlueprint } from "./types"
import { renderAiOfficeBlueprintHtml } from "./renderer"

export async function renderAiOfficeBlueprintPdfBuffer(blueprint: AiOfficeBlueprint) {
  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1600 } })
    await page.setContent(renderAiOfficeBlueprintHtml(blueprint), { waitUntil: "networkidle" })
    return await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "0.35in",
        right: "0.35in",
        bottom: "0.35in",
        left: "0.35in",
      },
    })
  } finally {
    await browser.close()
  }
}
