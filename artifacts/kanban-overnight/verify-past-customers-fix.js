const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3107/';
const outDir = path.join(process.cwd(), 'artifacts', 'kanban-overnight', 'screenshots');
fs.mkdirSync(outDir, { recursive: true });

async function checkViewport(browser, name, width, height) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err.message || err)));
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const result = await page.evaluate(() => {
    const candidates = Array.from(document.querySelectorAll('p')).filter((el) => (el.textContent || '').trim() === 'Past customers');
    const text = candidates[0];
    if (!text) return { found: false };
    const card = text.closest('div');
    const grid = card ? card.parentElement : null;
    const pageWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    const viewportWidth = document.documentElement.clientWidth;
    const rect = text.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const gridRect = grid.getBoundingClientRect();
    const style = getComputedStyle(text);
    const cardStyle = getComputedStyle(card);
    const withinCard = rect.left >= cardRect.left - 0.5 && rect.right <= cardRect.right + 0.5;
    const textNoHorizontalScroll = text.scrollWidth <= text.clientWidth + 1;
    const cardNoHorizontalScroll = card.scrollWidth <= card.clientWidth + 1;
    return {
      found: true,
      viewportWidth,
      pageScrollWidth: pageWidth,
      pageOverflowPx: pageWidth - viewportWidth,
      text: {
        clientWidth: text.clientWidth,
        scrollWidth: text.scrollWidth,
        rectWidth: Math.round(rect.width * 100) / 100,
        rectLeft: Math.round(rect.left * 100) / 100,
        rectRight: Math.round(rect.right * 100) / 100,
        whiteSpace: style.whiteSpace,
        fontSize: style.fontSize,
        lineHeight: style.lineHeight,
      },
      card: {
        clientWidth: card.clientWidth,
        scrollWidth: card.scrollWidth,
        rectWidth: Math.round(cardRect.width * 100) / 100,
        overflow: cardStyle.overflow,
      },
      grid: {
        clientWidth: grid.clientWidth,
        scrollWidth: grid.scrollWidth,
        rectWidth: Math.round(gridRect.width * 100) / 100,
      },
      withinCard,
      textNoHorizontalScroll,
      cardNoHorizontalScroll,
    };
  });

  const shot = path.join(outDir, `past-customers-${name}.png`);
  await page.screenshot({ path: shot, fullPage: false });
  await page.close();
  return { name, width, height, screenshot: shot, errors, ...result };
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium' });
  const results = [];
  try {
    results.push(await checkViewport(browser, 'desktop-1440', 1440, 1200));
    results.push(await checkViewport(browser, 'mobile-390', 390, 1200));
  } finally {
    await browser.close();
  }
  const artifact = path.join(process.cwd(), 'artifacts', 'kanban-overnight', 'past-customers-fix-verification.json');
  fs.writeFileSync(artifact, JSON.stringify({ baseUrl, results }, null, 2));
  console.log(JSON.stringify({ artifact, results }, null, 2));
  const ok = results.every((r) => r.found && r.pageOverflowPx <= 0 && r.withinCard && r.textNoHorizontalScroll && r.cardNoHorizontalScroll && r.errors.length === 0);
  if (!ok) process.exit(1);
})();
