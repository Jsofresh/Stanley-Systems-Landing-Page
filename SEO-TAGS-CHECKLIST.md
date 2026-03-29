# Stanley Systems — SEO Tags Implementation Checklist (Next.js / App Router)

Repo: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page`

This checklist is derived from an SEO warmup playbook: don’t let Google guess your pages. Set metadata, structured data, and crawl plumbing early so pages index quickly and earn richer listings.

---

## A) Global site metadata (do once)
**Where:** `app/layout.tsx`

- [ ] Set `metadataBase = new URL('https://stanley-systems.com')`
- [ ] Set default `title` with a template (e.g. `"%s | Stanley Systems"`)
- [ ] Set default `description`
- [ ] Set global OpenGraph defaults:
  - [ ] `openGraph: { siteName, type: 'website', url, images }`
- [ ] Set global Twitter defaults:
  - [ ] `twitter: { card: 'summary_large_image', images }`
- [ ] Ensure favicon / icons are configured (via metadata or `/public`)

Goal: prevent duplicate/empty tags site-wide.

---

## B) Per-page metadata (every indexable page)
**Where:** each page file under `app/**/page.tsx`

For each target page (home, pricing, each workflow/industry page):
- [ ] `export const metadata = { ... }` with **unique**:
  - [ ] `title`
  - [ ] `description`
  - [ ] `openGraph: { title, description, url, images }`
  - [ ] `twitter: { title, description, images }`

Rule: if two pages share the same title/description, you’re diluting rankings.

---

## C) Canonicals + robots control
- [ ] Add canonical URLs (via metadata) so Google doesn’t treat `/x` and `/x/` as duplicates.
- [ ] Add `noindex` for pages that should not appear in search (thank-you, internal/test, auth flows).

---

## D) Structured data (Schema.org JSON-LD)
Add JSON-LD blocks to help Google understand what the page *is*.

Recommended minimum:

1) **Organization / ProfessionalService** (Homepage)
- [ ] name, url, logo
- [ ] contactPoint (email/phone)
- [ ] areaServed
- [ ] sameAs (real social URLs)

2) **FAQPage** (Pages with FAQs)
- [ ] Add FAQ schema matching the visible Q/A content.

3) **BreadcrumbList** (Non-home pages)
- [ ] Breadcrumb schema so SERPs show a clean path.

Implementation pattern:
- [ ] Create `components/seo/JsonLd.tsx` to render:
  - `<script type="application/ld+json">{JSON.stringify(schema)}</script>`
- [ ] Include on the relevant pages.

---

## E) Crawl plumbing: sitemap + robots
**Add:**
- [ ] `app/sitemap.ts` (or sitemap route) that enumerates your indexable pages
- [ ] `app/robots.ts` to generate robots.txt

Then:
- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools
- [ ] Manually request indexing for your 3–5 most important pages

---

## F) OG image
- [ ] Add a default OG image in `/public` (e.g. `/public/og-image.png`)
- [ ] Reference it in global OpenGraph + Twitter metadata

---

## G) Internal linking map (SEO + usability)
- [ ] Homepage links to every “money page” (workflows/industries)
- [ ] Each workflow/industry page links to:
  - [ ] pricing
  - [ ] 1–2 related workflows
  - [ ] the relevant industry page(s)
- [ ] Footer links to key pages so nothing becomes orphaned

---

## H) Quick QA (before shipping)
- [ ] View-source contains correct title/description (not blank)
- [ ] OpenGraph/Twitter preview works (link unfurl)
- [ ] Schema validates in Google Rich Results Test (where applicable)
- [ ] `sitemap.xml` loads and includes the new pages
- [ ] No accidental `noindex` on key pages

