# Pre-deploy approval needed

No deploy was performed. No PM2 restart was performed.

## Approval question

Jaden, approve deploying the current local Stanley Systems website changes to production?

Deploy path after approval:
1. `npm run build`
2. `pm2 restart stanley-landing --update-env`
3. verify `/`, `/pricing`, and `/contact` live

## What changes

Pricing:
- Adds `/pricing`.
- Workflow Audit is the paid first step.
- Cash Flow Collection System and Repeat Revenue System are post-audit paths only.
- No public package prices.
- No Stripe or checkout route.
- CTAs go to `/contact`.
- Audit credit wording is in place: Workflow Audit price off monthly, double Workflow Audit price off yearly.

Homepage:
- Adds Best Fit section.
- Moves the page flow to Best Fit, final CTA, then Founder near the end.
- Final CTA becomes: “Almost nothing to do. Costs everything to not do.”
- Founder section now says: “Founder-led diagnosis. Hands-on build.”
- `/who-stanley-systems-helps` reuses the Best Fit section.

Naming and commercial checks passed on rendered `/`, `/pricing`, and `/contact`:
- no Cash Flow Collection System rendered
- no Repeat Revenue System rendered
- no free or no-cost system guarantee rendered
- no old test prices `$147`, `$297`, `$497`, `$997` rendered
- no Stripe or checkout language rendered
- no standalone “Stanley” rendered
- no em dash or en dash rendered
- no mobile horizontal overflow at 390px

## QA

Fresh build for this packet passed:
- `npm run build`: passed

Parent QA t_e6b60bca passed:
- source rule checks passed
- `git diff --check` passed
- local rendered smoke passed for `/`, `/pricing` with calculator params, and `/contact`
- no deployment was performed

## Screenshots

- `home-desktop-full.png`
- `home-mobile-full.png`
- `pricing-desktop-full.png`
- `pricing-mobile-full.png`
- `who-helps-mobile-full.png`

Folder:
- `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/artifacts/predeploy-approval-20260504-165217/`

## Remaining risks

- The site is not live yet.
- The workspace is broadly dirty. Deploying current local code would ship the current combined pricing, homepage, calculator, visual-kit, and related public-copy changes.
- Internal unmounted `/app/dev` previews still contain old experimental labels. Public rendered routes passed QA.

Recommendation: approve if you want the new `/pricing` page and the homepage conversion changes shipped together. Hold if you want a final taste pass on the screenshots first.
