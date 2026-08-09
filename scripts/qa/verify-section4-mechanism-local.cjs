const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

const repoRoot = path.resolve(__dirname, '../..')
const artifactDir = path.join(repoRoot, 'artifacts/section4-mechanism-local-qa')
fs.mkdirSync(artifactDir, { recursive: true })

const baseUrl = process.env.SECTION4_QA_URL || 'http://127.0.0.1:3061/'

const expected = {
  stakesSubheading:
    'In one realistic $2M trade-business scenario, slow billing, missed follow-ups, and dead leads can add up to $126,000+ a year in delayed or missed revenue.',
  headline: 'Run the numbers. Then see what to fix first.',
  subhead:
    'Estimate where revenue is slipping through the cracks. Then the Workflow Audit turns those numbers into a clear plan.',
  leakRows: ['Delayed invoices', 'Dormant customers', 'Open estimates', 'Missed calls'],
  leakValues: ['18', '24', '26', '15'],
  outputEyebrows: ['Biggest leak', 'Likely monthly revenue held back', 'First recommended move'],
  outputTitles: ['Delayed invoices', '$23,450', 'Tighten invoice follow-up'],
}

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const results = []

  for (const [name, viewport] of [
    ['desktop', { width: 1440, height: 1180 }],
    ['mobile', { width: 390, height: 1180 }],
  ]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 })
    const badResponses = []
    page.on('response', (response) => {
      if (response.status() >= 400 && !response.url().includes('favicon')) {
        badResponses.push(`${response.status()} ${response.url()}`)
      }
    })
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 })

    const data = await page.evaluate(() => {
      const main = document.querySelector('main')
      const children = [...(main?.children || [])]
      const stakes = document.querySelector('[data-section="stakes"]')
      const section = document.querySelector('[data-section="workflow-audit-mechanism"]')
      const heading = section?.querySelector('h2')
      const subhead = heading?.nextElementSibling
      const leftCard = section?.querySelector('h3')?.closest('div[class*="rounded"]')
      const cardTitles = [...(section?.querySelectorAll('h3') || [])].map((el) => el.textContent?.trim().replace(/\s+/g, ' '))
      const leakLabels = [...(section?.querySelectorAll('[data-section="workflow-audit-mechanism"] div') || [])]
        .map((el) => el.textContent?.trim())
        .filter((text) => ['Delayed invoices', 'Dormant customers', 'Open estimates', 'Missed calls'].includes(text || ''))
      const leakValues = [...(section?.querySelectorAll('[data-section="workflow-audit-mechanism"] div') || [])]
        .map((el) => el.textContent?.trim())
        .filter((text) => ['18', '24', '26', '15'].includes(text || ''))
      const outputs = [...(section?.querySelectorAll('[data-section="workflow-audit-mechanism"] p') || [])]
        .map((el) => el.textContent?.trim().replace(/\s+/g, ' '))
      const cta = section?.querySelector('a[data-stanley-cta-tracked="true"]')
      const sectionText = section?.textContent || ''
      const rect = section?.getBoundingClientRect()
      const cards = section?.querySelector('[data-section="workflow-audit-mechanism"] div[class*="lg:grid-cols-[minmax"]')
      const allRects = [...(section?.querySelectorAll('article, a, h2, p, div') || [])].map((el) => {
        const r = el.getBoundingClientRect()
        return { left: r.left, right: r.right, width: r.width }
      })
      const maxRight = Math.max(...allRects.map((r) => r.right), 0)
      const minLeft = Math.min(...allRects.map((r) => r.left), 0)
      return {
        childCount: children.length,
        stakesIndex: children.findIndex((el) => el.matches?.('[data-section="stakes"]')),
        section4Index: children.findIndex((el) => el.matches?.('[data-section="workflow-audit-mechanism"]')),
        phase3Index: children.findIndex((el) => el.textContent?.includes('The problem is not effort. It is the space between the tools.')),
        stakesSubheading: stakes?.querySelector('p')?.textContent?.trim().replace(/\s+/g, ' '),
        headline: heading?.textContent?.trim().replace(/\s+/g, ' '),
        subhead: subhead?.textContent?.trim().replace(/\s+/g, ' '),
        cardTitles,
        leakLabels,
        leakValues,
        hasMonthlyRisk: sectionText.includes('Estimated Monthly Revenue at Risk') && sectionText.includes('$23,450'),
        outputTexts: outputs,
        ctaText: cta?.textContent?.trim().replace(/\s+/g, ' '),
        ctaHref: cta?.getAttribute('href'),
        forbiddenTopLabelsAbsent: !sectionText.includes('STANLEY SYSTEMS') && !sectionText.includes('SECTION 4'),
        forbiddenTrustRowAbsent:
          !sectionText.includes('No obligation') &&
          !sectionText.includes('Takes 30 minutes') &&
          !sectionText.includes('Custom insights for your business'),
        sectionVisible: !!rect && rect.height > 600,
        noOverflow: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        elementBoundsWithinViewport: minLeft >= -1 && maxRight <= document.documentElement.clientWidth + 1,
        badSelectorDebug: !!leftCard || !!cards,
      }
    })

    await page.addStyleTag({ content: 'header { display: none !important; }' })
    await page.locator('[data-section="workflow-audit-mechanism"]').screenshot({
      path: path.join(artifactDir, `section4-${name}.png`),
    })
    results.push({ name, ...data, badResponses })
    await page.close()
  }

  await browser.close()
  fs.writeFileSync(path.join(artifactDir, 'report.json'), JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results, null, 2))

  const failed = results.some((r) => {
    const outputsOk =
      expected.outputEyebrows.every((text) => r.outputTexts.some((value) => value?.toLowerCase() === text.toLowerCase())) &&
      expected.outputTitles.every((text) => r.outputTexts.some((value) => value === text))
    const leakRowsOk = expected.leakRows.every((text) => r.outputTexts.some((value) => value === text))
    return (
      r.stakesIndex !== 2 ||
      r.section4Index !== 3 ||
      !(r.phase3Index > r.section4Index) ||
      r.stakesSubheading !== expected.stakesSubheading ||
      r.headline !== expected.headline ||
      r.subhead !== expected.subhead ||
      !leakRowsOk ||
      !expected.leakValues.every((text) => r.leakValues.includes(text)) ||
      !r.hasMonthlyRisk ||
      !outputsOk ||
      !r.ctaText?.startsWith('Book Workflow Audit') ||
      r.ctaHref !== '#audit' ||
      !r.forbiddenTopLabelsAbsent ||
      !r.forbiddenTrustRowAbsent ||
      !r.sectionVisible ||
      !r.noOverflow ||
      !r.elementBoundsWithinViewport ||
      r.badResponses.length > 0
    )
  })

  if (failed) process.exit(1)
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
