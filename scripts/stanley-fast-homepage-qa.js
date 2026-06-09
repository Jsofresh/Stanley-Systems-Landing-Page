const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const url =
  process.env.STANLEY_QA_URL || process.argv[2] || "http://127.0.0.1:3233/";
const stamp = new Date()
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(/\..*/, "")
  .replace("T", "-");
const outDir =
  process.env.STANLEY_QA_OUT ||
  process.argv[3] ||
  path.join(".qa", `fast-homepage-${stamp}`);
fs.mkdirSync(outDir, { recursive: true });

const sectionSelectors = [
  ["hero", 'section[data-audit-section="home.hero"]'],
  ["calculator", "#calculator"],
  ["leaks", "main section:nth-of-type(3)"],
  ["assessment", "#assessment"],
  ["systems", "#systems"],
  ["before-after", "main section:nth-of-type(6)"],
];

const expectedImageFragments = [
  "/images/uploaded/homepage/cash-flow-rework/annual-money-left-on-the-table-60k-to-300k.jpg",
  "/images/uploaded/homepage/cash-flow-rework/service-business-leak-types.jpg",
  "/images/uploaded/homepage/cash-flow-rework/cash-flow-assessment-vertical-section-bg.jpg",
  "/images/uploaded/homepage/cash-flow-rework/before-after-cash-flow-system.jpg",
];

async function captureViewport(browser, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  const badResponses = [];
  const consoleErrors = [];
  page.on("response", (res) => {
    if (res.status() >= 400) badResponses.push(`${res.status()} ${res.url()}`);
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(1200);

  // Scroll each critical image/section into view so lazy images hydrate before probing.
  for (const src of expectedImageFragments) {
    await page.evaluate((fragment) => {
      const img = Array.from(document.images).find(
        (i) => i.currentSrc.includes(fragment) || i.src.includes(fragment),
      );
      if (img) img.scrollIntoView({ block: "center", inline: "center" });
    }, src);
    await page.waitForTimeout(250);
  }

  const imageState = await page.evaluate(
    (fragments) =>
      fragments.map((fragment) => {
        const matches = Array.from(document.images).filter(
          (i) => i.currentSrc.includes(fragment) || i.src.includes(fragment),
        );
        return {
          fragment,
          count: matches.length,
          states: matches.map((img) => {
            const rect = img.getBoundingClientRect();
            return {
              complete: img.complete,
              naturalWidth: img.naturalWidth,
              naturalHeight: img.naturalHeight,
              rect: {
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left,
              },
            };
          }),
        };
      }),
    expectedImageFragments,
  );

  const overflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));

  const textChecks = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      cashFlowAssessment: text.includes("Office Process Assessment"),
      moneyLeftOnTable: text.includes("money left on the table"),
      stanleySystems: text.includes("Stanley Systems"),
      publicStanleyBareCount: (text.match(/\bStanley\b(?!\s+Systems)/g) || [])
        .length,
    };
  });

  for (const [name, selector] of sectionSelectors) {
    const loc = page.locator(selector).first();
    if (await loc.count()) {
      await page.evaluate(
        (sel) =>
          document.querySelector(sel)?.scrollIntoView({ block: "center" }),
        selector,
      );
      await page.waitForTimeout(300);
      await loc.screenshot({
        path: path.join(outDir, `${viewport.name}-${name}.png`),
        timeout: 30000,
      });
    }
  }

  await page.screenshot({
    path: path.join(outDir, `${viewport.name}-full-page.png`),
    fullPage: true,
    timeout: 30000,
  });
  await page.close();

  const failures = [];
  for (const state of imageState) {
    if (
      !state.count ||
      !state.states.some(
        (s) => s.complete && s.naturalWidth > 0 && s.naturalHeight > 0,
      )
    ) {
      failures.push(`${viewport.name}: image not loaded ${state.fragment}`);
    }
  }
  if (
    overflow.scrollWidth > overflow.clientWidth ||
    overflow.bodyScrollWidth > overflow.clientWidth
  ) {
    failures.push(
      `${viewport.name}: horizontal overflow ${JSON.stringify(overflow)}`,
    );
  }
  if (!textChecks.cashFlowAssessment)
    failures.push(`${viewport.name}: Office Process Assessment missing`);
  if (!textChecks.moneyLeftOnTable)
    failures.push(`${viewport.name}: money left on the table missing`);
  if (!textChecks.stanleySystems)
    failures.push(`${viewport.name}: Stanley Systems missing`);
  if (badResponses.some((r) => !r.includes("/_next/webpack-hmr")))
    failures.push(`${viewport.name}: bad responses ${badResponses.join("; ")}`);
  if (consoleErrors.length)
    failures.push(
      `${viewport.name}: console errors ${consoleErrors.join("; ")}`,
    );

  return {
    viewport,
    badResponses,
    consoleErrors,
    imageState,
    overflow,
    textChecks,
    failures,
  };
}

(async () => {
  const started = Date.now();
  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const viewport of [
    { name: "desktop", width: 1440, height: 1100 },
    { name: "mobile", width: 390, height: 900 },
  ]) {
    results.push(await captureViewport(browser, viewport));
  }
  await browser.close();

  const failures = results.flatMap((r) => r.failures);
  const payload = {
    url,
    outDir,
    elapsedSeconds: (Date.now() - started) / 1000,
    failures,
    results,
  };
  fs.writeFileSync(
    path.join(outDir, "qa-result.json"),
    JSON.stringify(payload, null, 2),
  );
  console.log(
    JSON.stringify(
      { url, outDir, elapsedSeconds: payload.elapsedSeconds, failures },
      null,
      2,
    ),
  );
  if (failures.length) process.exit(1);
})();
