# Post-build design QA blocker fixes

Task: t_0f8c5db1

## Changed scope

- `components/pricing-section.tsx`: Made the homepage Cash Flow Collection System visual mobile-safe by removing fixed image-backed layout, stacking/wrapping the path cards, constraining alert text, and cooling the card surface.
- `components/pricing/PlanCard.tsx`: Removed the pricing card header kicker/status labels (`Paid first step`, `Post-audit path`, `Cash Flow Collection System`, `Repeat Revenue System`) from offer-card heading areas.
- `components/glassmorphism-nav.tsx`: Changed the Workflow Audit nav CTA from dark/near-black to a Stanley green light outlined treatment.
- `components/footer.tsx`: Reduced footer padding, cooled a warm surface, and made footer contents static so full-page screenshots do not capture an empty animated footer region before copyright.
- `artifacts/post-build-design-qa-fixes-20260504-frontend/verify-and-capture.mjs`: Local Playwright verification/capture script.

## Commands run

- `git diff --check -- components/pricing/PlanCard.tsx components/pricing-section.tsx components/glassmorphism-nav.tsx components/footer.tsx artifacts/post-build-design-qa-fixes-20260504-frontend/verify-and-capture.mjs`
- `npm run build`
- `PORT=3117 npm run start -- -p 3117`
- `node artifacts/post-build-design-qa-fixes-20260504-frontend/verify-and-capture.mjs`
- `ss -ltnp | grep ':3117'` check after stopping preview

## Verification result

- `npm run build`: passed.
- Local preview: served `http://127.0.0.1:3117`, then stopped.
- `/` at 390px: horizontal overflow 0px.
- `/pricing?source=calculator&recommended=both&annual_leak=%24120K&monthly_leak=%2410K` at 390px: horizontal overflow 0px.
- `/pricing?source=calculator&recommended=both&annual_leak=%24120K&monthly_leak=%24110K` was not used; canonical checked URL used monthly `%2410K`.
- Pricing card old labels/kickers: no `Paid first step` or `Post-audit path` in `components/pricing`, `app/pricing`, or `lib/pricing`. The only pricing visible match for `Repeat Revenue System` is normal hero body text, not a kicker/pill.
- Nav Workflow Audit CTA computed color: green text `rgb(17, 104, 50)`, white background, green border.
- Visual QA: homepage Cash Flow Collection System mobile red annotations are contained/readable; pricing mobile footer shows real footer content with normal spacing instead of a blank footer slab.

## Artifacts

- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/post-build-design-qa-fixes-20260504-frontend/home-mobile.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/post-build-design-qa-fixes-20260504-frontend/pricing-mobile.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/post-build-design-qa-fixes-20260504-frontend/pricing-desktop.png`
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/post-build-design-qa-fixes-20260504-frontend/design-qa-fixed.json`

## Remaining risk

- Repo was already dirty with many unrelated/pre-existing modified and untracked files. This task only intentionally touched the files listed above and did not deploy or restart PM2.
