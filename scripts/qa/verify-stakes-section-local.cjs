const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

const repoRoot = path.resolve(__dirname, '../..')
const artifactDir = path.join(repoRoot, 'artifacts/stakes-section-local-qa')
fs.mkdirSync(artifactDir, { recursive: true })

const baseUrl = process.env.STAKES_QA_URL || 'http://127.0.0.1:3053/'

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const results = []

  for (const [name, viewport] of [
    ['desktop', { width: 1440, height: 1240 }],
    ['mobile', { width: 390, height: 1100 }],
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
      const aura = stakes?.querySelector('[data-visual="stakes-red-aura"]')
      const pipeline = stakes?.querySelector('[data-visual="stakes-pipeline-image"] img')
      const cards = stakes?.querySelector('[data-visual="stakes-loss-cards"]')
      const cardArticles = [...(cards?.querySelectorAll('article') || [])]
      const cardHeadings = cardArticles.map((card) => card.querySelector('h3')?.textContent?.trim() || '')
      const cardAmounts = cardArticles.map((card) => card.querySelector('p')?.textContent?.trim() || '')
      const cardHeadingSizes = cardArticles.map((card) => getComputedStyle(card.querySelector('h3')).fontSize)
      const h2 = stakes?.querySelector('h2')
      const p = stakes?.querySelector('p')
      const headingSpan = h2?.querySelector('span')
      const strong = p?.querySelector('strong')
      const pipelineRect = pipeline?.getBoundingClientRect()
      const cardsRect = cards?.getBoundingClientRect()
      const h2Rect = h2?.getBoundingClientRect()
      const sectionRect = stakes?.getBoundingClientRect()
      const pipelineStyle = pipeline ? getComputedStyle(pipeline) : null
      const headingSpanStyle = headingSpan ? getComputedStyle(headingSpan) : null
      const strongStyle = strong ? getComputedStyle(strong) : null
      const auraStyle = aura ? getComputedStyle(aura) : null
      return {
        childCount: children.length,
        stakesIndex: children.findIndex((el) => el.matches?.('[data-section="stakes"]')),
        eyebrowRemoved: !stakes?.textContent?.includes('THE STAKES'),
        headline: h2?.textContent?.trim().replace(/\s+/g, ' '),
        subheading: p?.textContent?.trim().replace(/\s+/g, ' '),
        headingRedText: headingSpan?.textContent?.trim() || '',
        headingRedColor: headingSpanStyle?.color || '',
        subheadingRedText: strong?.textContent?.trim() || '',
        subheadingRedColor: strongStyle?.color || '',
        auraBackground: auraStyle?.backgroundImage || '',
        pipelineSrc: pipeline?.currentSrc || pipeline?.src || '',
        pipelineNaturalWidth: pipeline?.naturalWidth || 0,
        pipelineNaturalHeight: pipeline?.naturalHeight || 0,
        pipelineRenderedWidth: pipelineRect?.width || 0,
        pipelineRenderedHeight: pipelineRect?.height || 0,
        cardCount: cardArticles.length,
        cardHeadings,
        cardAmounts,
        cardHeadingSizes,
        cardsBelowPipeline: pipelineRect && cardsRect ? cardsRect.top > pipelineRect.bottom : false,
        headlineAbovePipeline: h2Rect && pipelineRect ? h2Rect.bottom < pipelineRect.top : false,
        centered:
          pipelineRect && sectionRect && cardsRect
            ? Math.abs((pipelineRect.left + pipelineRect.right) / 2 - (sectionRect.left + sectionRect.right) / 2) < 2 &&
              Math.abs((cardsRect.left + cardsRect.right) / 2 - (sectionRect.left + sectionRect.right) / 2) < 2
            : false,
        noPipelineBorder: pipelineStyle
          ? pipelineStyle.borderTopWidth === '0px' &&
            pipelineStyle.borderRightWidth === '0px' &&
            pipelineStyle.borderBottomWidth === '0px' &&
            pipelineStyle.borderLeftWidth === '0px'
          : false,
        noOverflow: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        pipelineComplete: !!pipeline?.complete,
      }
    })

    const section = page.locator('[data-section="stakes"]')
    await section.screenshot({ path: path.join(artifactDir, `stakes-${name}.png`) })
    results.push({ name, ...data, badResponses })
    await page.close()
  }

  await browser.close()

  const reportPath = path.join(artifactDir, 'report.json')
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results, null, 2))

  const expectedHeading = 'Small leaks turn into big losses.'
  const expectedSubheading = 'Slow billing, missed follow-ups, and dead leads can quietly pull $126,000+ a year out of a $2M trade business.'
  const expectedCardHeadings = ['Slow billing', 'Missed follow-ups', 'Dead leads']
  const expectedCardAmounts = ['-$48,000', '-$36,000', '-$42,000']
  const failed = results.some((r) =>
    r.stakesIndex !== 2 ||
    !r.eyebrowRemoved ||
    r.headline !== expectedHeading ||
    r.subheading !== expectedSubheading ||
    r.headingRedText !== 'big losses.' ||
    !r.headingRedColor.includes('220, 38, 38') ||
    r.subheadingRedText !== '$126,000+ a year' ||
    !r.subheadingRedColor.includes('220, 38, 38') ||
    !r.auraBackground.includes('220, 38, 38') ||
    !r.pipelineSrc.includes('stakes-pipe-losses-pipeline') ||
    r.pipelineNaturalWidth !== 1280 ||
    r.pipelineNaturalHeight !== 430 ||
    !r.pipelineComplete ||
    r.cardCount !== 3 ||
    JSON.stringify(r.cardHeadings) !== JSON.stringify(expectedCardHeadings) ||
    JSON.stringify(r.cardAmounts) !== JSON.stringify(expectedCardAmounts) ||
    !r.cardHeadingSizes.every((size) => Number.parseFloat(size) >= (r.name === 'desktop' ? 26 : 24)) ||
    !r.cardsBelowPipeline ||
    !r.headlineAbovePipeline ||
    !r.centered ||
    !r.noPipelineBorder ||
    !r.noOverflow ||
    r.badResponses.length > 0,
  )

  if (failed) process.exit(1)
})().catch((error) => {
  console.error(error)
  process.exit(1)
})
