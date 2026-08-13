const { chromium } = require("playwright")
const fs = require("fs")
const path = require("path")

const origin = process.env.STANLEY_QA_URL || process.argv[2] || "http://127.0.0.1:3233"
const staticRoot = process.env.STANLEY_QA_STATIC_DIR ? path.resolve(process.env.STANLEY_QA_STATIC_DIR) : null
const outDir = process.env.STANLEY_QA_OUT || process.argv[3] || path.join(".qa", `ai-office-${new Date().toISOString().replace(/[:.]/g, "-")}`)
fs.mkdirSync(outDir, { recursive: true })
const routes = ["/?hero=prompt", "/?hero=message", "/pricing", "/ai-office-command-map", "/systems-installation-sprint", "/ai-office-capacity-calculator", "/checkout/success", "/checkout/onboarding", ...(staticRoot ? [] : ["/login"])]
const viewports = [{ name: "desktop", width: 1440, height: 1100 }, { name: "mobile", width: 390, height: 900 }]
const failures = []
const results = []

;(async () => {
  const systemChromium = process.env.STANLEY_CHROMIUM_PATH || (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined)
  const browser = await chromium.launch({ headless: true, executablePath: systemChromium, args: ["--no-sandbox", "--disable-dev-shm-usage"] })
  for (const viewport of viewports) for (const route of routes) {
    const page = await browser.newPage({ viewport, reducedMotion: "reduce" })
    if (staticRoot) await page.route("http://candidate.local/**", async requestRoute => {
      const requestUrl = new URL(requestRoute.request().url())
      const pathname = decodeURIComponent(requestUrl.pathname)
      let file
      if (pathname.startsWith("/_next/static/")) file = path.join(staticRoot, pathname.replace("/_next/", ""))
      else if (/\.[a-z0-9]+$/i.test(pathname)) file = path.join(process.cwd(), "public", pathname)
      else {
        const routeName = pathname === "/" ? "index" : pathname.replace(/^\//, "")
        file = path.join(staticRoot, "server", "app", `${routeName}.html`)
      }
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return requestRoute.fulfill({ status: 404, body: "Not found" })
      const ext = path.extname(file)
      const contentTypes = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon" }
      return requestRoute.fulfill({ status: 200, contentType: contentTypes[ext] || "application/octet-stream", body: fs.readFileSync(file) })
    })
    const consoleErrors = []
    const badResponses = []
    page.on("console", msg => { if (msg.type() === "error") consoleErrors.push(msg.text()) })
    page.on("response", response => { if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`) })
    const targetOrigin = staticRoot ? "http://candidate.local" : origin.replace(/\/$/, "")
    const response = await page.goto(`${targetOrigin}${route}`, { waitUntil: "networkidle", timeout: 60000 })
    const state = await page.evaluate(() => ({
      title: document.title,
      text: document.body.innerText,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelector("h1")?.textContent?.trim() || "",
    }))
    const slug = route.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home"
    await page.screenshot({ path: path.join(outDir, `${viewport.name}-${slug}.png`), fullPage: route.startsWith("/?") })
    if (!response || response.status() >= 400) failures.push(`${viewport.name} ${route}: page status ${response?.status()}`)
    if (state.scrollWidth > state.clientWidth) failures.push(`${viewport.name} ${route}: horizontal overflow ${state.scrollWidth}/${state.clientWidth}`)
    if (!state.h1) failures.push(`${viewport.name} ${route}: missing h1`)
    if (consoleErrors.length) failures.push(`${viewport.name} ${route}: console ${consoleErrors.join("; ")}`)
    if (badResponses.length) failures.push(`${viewport.name} ${route}: bad responses ${badResponses.join("; ")}`)
    if (/AI Profit Map|Admin Drag Calculator|Get the Free Blueprint|520\+|95%/.test(state.text)) failures.push(`${viewport.name} ${route}: forbidden legacy copy mounted`)
    if (route === "/?hero=prompt" && (!state.text.includes("single prompt") || !state.text.includes("See What One Prompt Can Do."))) failures.push(`${viewport.name} ${route}: prompt headline/CTA mismatch`)
    if (route === "/?hero=message" && (!state.text.includes("single message") || !state.text.includes("See What One Message Can Do."))) failures.push(`${viewport.name} ${route}: message headline/CTA mismatch`)
    results.push({ viewport: viewport.name, route, title: state.title, h1: state.h1, consoleErrors, badResponses })
    await page.close()
  }
  await browser.close()
  fs.writeFileSync(path.join(outDir, "qa-result.json"), JSON.stringify({ origin, failures, results }, null, 2))
  console.log(JSON.stringify({ origin, outDir, pagesChecked: results.length, failures }, null, 2))
  if (failures.length) process.exit(1)
})().catch(error => { console.error(error); process.exit(1) })
