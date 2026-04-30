import { existsSync, readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { ensureLocalServer, loadManifest, main, SITE_REPO, slugify, updateStatus, writeJson, writeText } from "./_lib.ts"

type SectionEntry = {
  route: string
  section_id: string
  selector: string
  priority: number
  offer: string
  purpose: string
  text_path?: string
  screenshots: Record<string, string>
  dom_preview?: string
  viewport_metadata?: Record<string, unknown>
}

await main(async (args) => {
  const manifest = loadManifest(String(args.run_id || ""))
  const phase = String(args.phase || "before")
  const baseUrl = String(args.url || "http://127.0.0.1:3012")
  let cleanup = async () => undefined
  let useStaticFallback = false
  try {
    cleanup = await ensureLocalServer(baseUrl)
  } catch {
    useStaticFallback = true
  }

  try {
    const { chromium } = await import("playwright")
    const browser = await chromium.launch({ headless: true })
    const registry: SectionEntry[] = []

    for (const viewport of [
      { name: "desktop", width: 1440, height: 1200 },
      { name: "mobile", width: 390, height: 1200 },
    ]) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
      if (useStaticFallback) {
        await page.setContent(readStaticHomepageHtml(), { waitUntil: "load" })
      } else {
        await page.goto(baseUrl, { waitUntil: "networkidle" })
      }
      const sections = await page.locator("[data-audit-section]").evaluateAll((nodes) =>
        nodes.map((node, index) => {
          const element = node as HTMLElement
          return {
            index,
            route: element.dataset.auditPage || "/",
            section_id: element.dataset.auditSection || `section-${index + 1}`,
            priority: Number(element.dataset.auditPriority || "3"),
            offer: element.dataset.auditOffer || "",
            purpose: element.dataset.auditPurpose || "",
            text: (element.innerText || "").trim().replace(/\s+/g, " "),
          }
        }),
      )

      for (const section of sections) {
        const selector = `[data-audit-section="${section.section_id}"]`
        const id = slugify(section.section_id)
        const screenshotPath = join(manifest.run_dir, "screenshots", phase, viewport.name, `${id}.png`)
        await page.locator(selector).screenshot({ path: screenshotPath })
        const viewportMetadata = await page.locator(selector).evaluate((node, args) => {
          const element = node as HTMLElement
          const viewport = args.viewport as { name: string; width: number; height: number }
          const phase = args.phase as string
          const computedBody = window.getComputedStyle(document.body)
          const links = Array.from(element.querySelectorAll("a")).slice(0, 20).map((anchor) => {
            const computed = window.getComputedStyle(anchor)
            const rect = anchor.getBoundingClientRect()
            return {
              text: (anchor.textContent || "").trim().replace(/\s+/g, " "),
              href: anchor.getAttribute("href") || "",
              color: computed.color,
              text_decoration_line: computed.textDecorationLine,
              display: computed.display,
              class_name: anchor.className || "",
              role: anchor.getAttribute("role") || "",
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            }
          })
          const classedElementCount = element.querySelectorAll("[class]").length + (element.className ? 1 : 0)
          const h1Texts = Array.from(document.querySelectorAll("h1")).map((item) => (item.innerText || item.textContent || "").trim().replace(/\s+/g, " ")).filter(Boolean)
          const h2Texts = Array.from(element.querySelectorAll("h2")).map((item) => (item.innerText || item.textContent || "").trim().replace(/\s+/g, " ")).filter(Boolean)
          const sectionText = (element.innerText || "").trim().replace(/\s+/g, " ")
          return {
            captured_at: new Date().toISOString(),
            route: window.location.pathname || "/",
            phase,
            viewport,
            page: {
              body_scroll_width: document.body.scrollWidth,
              body_client_width: document.body.clientWidth,
              document_scroll_width: document.documentElement.scrollWidth,
              document_client_width: document.documentElement.clientWidth,
              body_font_family: computedBody.fontFamily,
              body_color: computedBody.color,
              body_background_color: computedBody.backgroundColor,
              body_class_name: document.body.className || "",
              html_class_name: document.documentElement.className || "",
              stylesheet_count: document.styleSheets.length,
            },
            section: {
              class_name: element.className || "",
              element_count: element.querySelectorAll("*").length + 1,
              classed_element_count: classedElementCount,
              anchor_count: links.length,
              h1_texts: h1Texts,
              h2_texts: h2Texts,
            },
            links,
            copy: {
              text: sectionText,
              h1_texts: h1Texts,
              major_headlines: [...h1Texts, ...h2Texts].filter((text) => text.length >= 12),
            },
          }
        }, { viewport, phase })

        let entry = registry.find((item) => item.section_id === section.section_id)
        if (!entry) {
          const textPath = join(manifest.run_dir, "dom", phase, `${id}.json`)
          entry = {
            route: section.route,
            section_id: section.section_id,
            selector,
            priority: section.priority,
            offer: section.offer,
            purpose: section.purpose,
            text_path: textPath,
            screenshots: {},
            dom_preview: section.text.slice(0, 600),
            viewport_metadata: {},
          }
          registry.push(entry)
        }
        entry.screenshots[viewport.name] = screenshotPath
        entry.viewport_metadata = entry.viewport_metadata || {}
        entry.viewport_metadata[viewport.name] = viewportMetadata
        writeJson(entry.text_path || join(manifest.run_dir, "dom", phase, `${id}.json`), {
          ...section,
          viewport_metadata: entry.viewport_metadata,
        })
      }
      await page.close()
    }
    await browser.close()

    const registryPath = join(manifest.run_dir, "section-registry.json")
    writeJson(registryPath, {
      run_id: manifest.run_id,
      phase,
      captured_at: new Date().toISOString(),
      base_url: baseUrl,
      capture_mode: useStaticFallback ? "built_static_html_fallback" : "local_server",
      sections: registry.sort((a, b) => b.priority - a.priority),
    })
    writeText(join(manifest.run_dir, "dom", `${phase}-summary.md`), registry.map((s) => `## ${s.section_id}\n${s.dom_preview}\n`).join("\n"))
    manifest.reports.push(registryPath)
    updateStatus(manifest, phase === "before" ? "captured_pending_audit" : "built_pending_verification")
  } finally {
    await cleanup()
  }
})

function readStaticHomepageHtml(): string {
  const htmlPath = join(SITE_REPO, ".next", "server", "app", "index.html")
  if (!existsSync(htmlPath)) {
    throw new Error(`Static homepage fallback missing ${htmlPath}. Run npm run build first.`)
  }
  const cssRoot = join(SITE_REPO, ".next", "static", "css")
  const css = existsSync(cssRoot)
    ? readdirSync(cssRoot)
        .filter((file) => file.endsWith(".css"))
        .map((file) => readFileSync(join(cssRoot, file), "utf8"))
        .join("\n")
    : ""
  const html = readFileSync(htmlPath, "utf8")
  return html.replace("</head>", `<style>${css}</style></head>`)
}
