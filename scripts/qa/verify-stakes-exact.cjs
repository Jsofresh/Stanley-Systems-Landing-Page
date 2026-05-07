const fs = require("fs")
const path = require("path")
const { spawnSync } = require("child_process")
const { chromium } = require("playwright")

const repoRoot = path.resolve(__dirname, "../..")
const sourceAsset = path.join(repoRoot, "public/images/sections/stakes-leaks-desktop.png")
const artifactDir = path.join(repoRoot, "artifacts/stakes-exact-qa")
const screenshotPath = path.join(artifactDir, "stakes-exact-image.png")
const normalizedScreenshotPath = path.join(artifactDir, "stakes-exact-image-normalized.png")
const sectionScreenshotPath = path.join(artifactDir, "stakes-exact-section.png")
const reportPath = path.join(artifactDir, "stakes-exact-report.json")
const targetUrl = process.env.STAKES_QA_URL || "http://127.0.0.1:3052/"

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" })
  if (result.error) throw result.error
  return result
}

function imageDimensions(filePath) {
  const result = run("ffprobe", [
    "-v",
    "error",
    "-select_streams",
    "v:0",
    "-show_entries",
    "stream=width,height",
    "-of",
    "csv=s=x:p=0",
    filePath,
  ])
  if (result.status !== 0) {
    throw new Error(`ffprobe failed for ${filePath}: ${result.stderr}`)
  }
  const [width, height] = result.stdout.trim().split("x").map(Number)
  return { width, height }
}

function normalizeImageScreenshot(renderedPath, renderedDimensions, sourceDimensions) {
  if (
    renderedDimensions.width === sourceDimensions.width &&
    renderedDimensions.height === sourceDimensions.height
  ) {
    fs.copyFileSync(renderedPath, normalizedScreenshotPath)
    return { path: normalizedScreenshotPath, cropApplied: false, crop: null }
  }

  const canCropOnePixelTop =
    renderedDimensions.width === sourceDimensions.width &&
    renderedDimensions.height === sourceDimensions.height + 1

  if (canCropOnePixelTop) {
    const result = run("ffmpeg", [
      "-y",
      "-loglevel",
      "error",
      "-i",
      renderedPath,
      "-vf",
      `crop=${sourceDimensions.width}:${sourceDimensions.height}:0:1`,
      normalizedScreenshotPath,
    ])
    if (result.status !== 0) {
      throw new Error(`normalization crop failed: ${result.stderr}`)
    }
    return {
      path: normalizedScreenshotPath,
      cropApplied: true,
      crop: { width: sourceDimensions.width, height: sourceDimensions.height, x: 0, y: 1 },
    }
  }

  fs.copyFileSync(renderedPath, normalizedScreenshotPath)
  return { path: normalizedScreenshotPath, cropApplied: false, crop: null }
}

function compareWithSource(renderedPath) {
  const result = run("ffmpeg", [
    "-i",
    renderedPath,
    "-i",
    sourceAsset,
    "-lavfi",
    "psnr",
    "-f",
    "null",
    "-",
  ])
  const output = `${result.stdout}\n${result.stderr}`
  const match = output.match(/average:([0-9.]+|inf)/)
  const psnrAverage = match ? (match[1] === "inf" ? 999 : Number(match[1])) : null
  return {
    status: result.status,
    psnrAverage,
    psnrAverageLabel: match ? match[1] : null,
    raw: output.split("\n").filter((line) => line.includes("Parsed_psnr")).join("\n"),
  }
}

;(async () => {
  fs.mkdirSync(artifactDir, { recursive: true })

  const sourceDimensions = imageDimensions(sourceAsset)
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({
    viewport: { width: 1672, height: 1200 },
    deviceScaleFactor: 1,
  })

  const failedResponses = []
  page.on("response", (response) => {
    if (response.status() >= 400 && !response.url().includes("favicon")) {
      failedResponses.push(`${response.status()} ${response.url()}`)
    }
  })

  await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 60000 })

  const section = page.locator('[data-section="stakes-exact"]')
  const image = section.locator("img").first()
  await section.waitFor({ state: "visible", timeout: 30000 })
  await image.waitFor({ state: "visible", timeout: 30000 })

  const dom = await image.evaluate((img) => {
    const rect = img.getBoundingClientRect()
    const section = img.closest('[data-section="stakes-exact"]')
    const wrapper = img.parentElement
    const computed = window.getComputedStyle(img)
    const wrapperRect = wrapper?.getBoundingClientRect()
    const sectionRect = section?.getBoundingClientRect()
    const buttons = [...(section?.querySelectorAll("button[aria-label]") || [])]
    return {
      src: img.currentSrc || img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      renderedWidth: rect.width,
      renderedHeight: rect.height,
      objectFit: computed.objectFit,
      display: computed.display,
      sectionWidth: sectionRect?.width,
      sectionHeight: sectionRect?.height,
      wrapperWidth: wrapperRect?.width,
      wrapperHeight: wrapperRect?.height,
      complete: img.complete,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      hotspotCount: buttons.length,
      hotspotLabels: buttons.map((button) => button.getAttribute("aria-label")),
      hotspotBoxes: buttons.map((button) => {
        const r = button.getBoundingClientRect()
        return {
          label: button.getAttribute("aria-label"),
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
        }
      }),
    }
  })

  await image.screenshot({ path: screenshotPath })
  await section.screenshot({ path: sectionScreenshotPath })
  await browser.close()

  const renderedDimensions = imageDimensions(screenshotPath)
  const normalization = normalizeImageScreenshot(
    screenshotPath,
    renderedDimensions,
    sourceDimensions,
  )
  const normalizedDimensions = imageDimensions(normalization.path)
  const comparison = compareWithSource(normalization.path)
  const aspectSource = sourceDimensions.width / sourceDimensions.height
  const aspectRendered = dom.renderedWidth / dom.renderedHeight

  const checks = {
    sectionExists: true,
    srcIncludesAssetName: dom.src.includes("stakes-leaks-desktop"),
    imageComplete: dom.complete === true,
    sourceAssetIsOriginalGolden: fs.existsSync(sourceAsset),
    naturalDimensionsMatchAvailableSource:
      dom.naturalWidth === sourceDimensions.width && dom.naturalHeight === sourceDimensions.height,
    renderedWidthFitsViewport: dom.renderedWidth <= 1672 && dom.renderedWidth >= sourceDimensions.width,
    aspectRatioPreserved: Math.abs(aspectSource - aspectRendered) < 0.003,
    noObjectCover: dom.objectFit !== "cover",
    noHorizontalOverflow: dom.overflowX <= 0,
    hotspotsPresent: dom.hotspotCount === 8,
    psnrPass: comparison.psnrAverage !== null && comparison.psnrAverage >= 45,
    noFailedResponses: failedResponses.length === 0,
  }

  const report = {
    status: Object.values(checks).every(Boolean) ? "PASS" : "FAIL",
    targetUrl,
    sourceAsset,
    screenshotPath,
    normalizedScreenshotPath: normalization.path,
    sectionScreenshotPath,
    sourceDimensions,
    renderedScreenshotDimensions: renderedDimensions,
    normalizedScreenshotDimensions: normalizedDimensions,
    normalization,
    dom,
    comparison,
    failedResponses,
    checks,
    note:
      "Golden/reference is the saved source asset in public/images/sections/stakes-leaks-desktop.png, not a baseline generated from the page implementation. The Telegram-accessible source is 1280x720, so QA asserts the rendered natural dimensions match that available source asset. Playwright element screenshots can include a one-pixel top capture artifact from fractional page geometry; when present, the QA normalizes that capture before comparing against the golden asset.",
  }

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))

  if (report.status !== "PASS") {
    process.exit(1)
  }
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
