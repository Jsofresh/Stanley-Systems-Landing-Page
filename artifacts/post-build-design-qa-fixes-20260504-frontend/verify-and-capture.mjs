import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const artifactDir = '/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/post-build-design-qa-fixes-20260504-frontend';
const base = 'http://127.0.0.1:3117';
const pricingPath = '/pricing?source=calculator&recommended=both&annual_leak=%24120K&monthly_leak=%2410K';

await fs.mkdir(artifactDir, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });

async function runCase({ name, url, width, height, screenshot }) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(base + url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(artifactDir, screenshot), fullPage: true });
  const result = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const overflow = Math.max(doc.scrollWidth, body.scrollWidth) - doc.clientWidth;
    const terms = ['Paid first step', 'Cash Flow Collection System', 'Post-audit path', 'Repeat Revenue System'];
    const visibleMatches = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
      const el = walker.currentNode;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      if (rect.width <= 0 || rect.height <= 0 || style.visibility === 'hidden' || style.display === 'none') continue;
      const ownText = Array.from(el.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent || '').join(' ').replace(/\s+/g, ' ').trim();
      for (const term of terms) {
        if (ownText.includes(term)) {
          visibleMatches.push({ term, tag: el.tagName, text: ownText.slice(0, 160), className: String(el.className || '') });
        }
      }
    }
    const navButton = Array.from(document.querySelectorAll('button, a')).find((el) => (el.textContent || '').trim() === 'Workflow Audit');
    const navButtonStyle = navButton ? getComputedStyle(navButton) : null;
    const footer = document.querySelector('footer');
    const footerRect = footer?.getBoundingClientRect();
    return {
      title: document.title,
      viewport: `${doc.clientWidth}x${window.innerHeight}`,
      scrollWidth: Math.max(doc.scrollWidth, body.scrollWidth),
      clientWidth: doc.clientWidth,
      horizontalOverflowPx: overflow,
      noHorizontalOverflow: overflow <= 0,
      visibleMatches,
      navButton: navButtonStyle ? {
        color: navButtonStyle.color,
        backgroundColor: navButtonStyle.backgroundColor,
        borderColor: navButtonStyle.borderColor,
      } : null,
      footerHeight: footerRect ? Math.round(footerRect.height) : null,
    };
  });
  await page.close();
  return { name, url, width, height, screenshot: path.join(artifactDir, screenshot), ...result };
}

const results = [];
results.push(await runCase({ name: 'home-mobile', url: '/', width: 390, height: 1200, screenshot: 'home-mobile.png' }));
results.push(await runCase({ name: 'pricing-mobile', url: pricingPath, width: 390, height: 1200, screenshot: 'pricing-mobile.png' }));
results.push(await runCase({ name: 'pricing-desktop', url: pricingPath, width: 1440, height: 1600, screenshot: 'pricing-desktop.png' }));

await fs.writeFile(path.join(artifactDir, 'design-qa-fixed.json'), JSON.stringify(results, null, 2));
await browser.close();

const failures = [];
for (const result of results) {
  if ((result.name === 'home-mobile' || result.name === 'pricing-mobile') && !result.noHorizontalOverflow) {
    failures.push(`${result.name} horizontal overflow ${result.horizontalOverflowPx}px`);
  }
  const badLabelMatches = result.visibleMatches.filter((match) => {
    const cls = match.className.toLowerCase();
    const isLikelyPillOrKicker = cls.includes('rounded-full') || cls.includes('uppercase') || cls.includes('tracking-') || cls.includes('text-center text-sm font-bold leading-5 text-[#116832]');
    return result.name.startsWith('pricing') && isLikelyPillOrKicker;
  });
  if (badLabelMatches.length) {
    failures.push(`${result.name} has old label/kicker matches: ${JSON.stringify(badLabelMatches)}`);
  }
}
console.log(JSON.stringify({ artifactDir, results, failures }, null, 2));
if (failures.length) process.exit(1);
