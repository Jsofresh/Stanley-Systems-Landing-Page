# Company Brain Portal Frontend

Date: 2026-06-15

## Changed files

- `app/login/page.tsx`
- `app/portal/page.tsx`
- `app/portal/settings/page.tsx`
- `components/portal/login-form.tsx`
- `components/portal/portal-app.tsx`
- `lib/company-brain/types.ts`
- `lib/company-brain/mock.ts`
- `components/hero-section.tsx`
- `docs/build-reports/company-brain-portal-frontend-2026-06-15.md`

## Implemented

- Mock `/login` page for client portal entry.
- `/portal` ChatGPT/Claude-style Company Brain workspace with sidebar, recent conversations, clean text-only empty state, chat thread, composer, source chips, prepared actions, downloadable artifacts, tables, clarification, and error blocks.
- `/portal/settings` minimal non-dashboard settings basics: company, account, users/roles, usage, connected brain status, billing, safety, and notifications.
- Replaceable typed client seam via `sendCompanyBrainMessage(input)` and local mock responses only.
- Public header entry for `Client Login` / `Login` linking to `/login`.

## Commands

- `npm run build`: passed. Next generated `/login`, `/portal`, and `/portal/settings`.
- `npx tsc --noEmit`: failed on existing project-wide baseline TypeScript issues outside the touched portal/header files. Filtered touched-file check returned no errors for `app/login`, `app/portal`, `components/portal`, `lib/company-brain`, or `components/hero-section.tsx`.
- `npm run lint`: failed because `next lint` opened the interactive ESLint setup prompt instead of running checks.
- `git diff --check`: passed.
- Follow-up after screenshot feedback: removed empty-state prompt buttons, then removed the examples box/subtitle/title icon, replaced the remaining `Ask Stanley` title with `Ask Stanley Systems`, and verified real local downloads for `.pdf`, `.html`, `.xlsx`, and `.docx` artifacts.

## Local smoke / visual QA

Local production preview was run on `127.0.0.1:3010` after build.

Checked:

- `/login`: renders mock client login and no-send/no-password-copy.
- `/portal`: renders chat-first shell.
- `/portal`: clicking `Can we bill Johnson?` renders assistant response, sources, prepared action, PDF artifact, and preview dialog.
- `/portal/settings`: renders minimal settings basics.
- Desktop `1440x900`: no page errors, no horizontal overflow, preview dialog confirms no writebacks/external sends.
- Mobile `390x844`: no page errors, no horizontal overflow, composer usable, no dashboard/file/task bloat, no clipped/fused text blockers after prompt-text polish.

Screenshot artifacts:

- `/tmp/company-brain-desktop.png`
- `/tmp/company-brain-desktop-dialog.png`
- `/tmp/company-brain-mobile.png`
- `/tmp/company-brain-mobile-dialog.png`
- `/tmp/company-brain-login-mobile.png`
- `/tmp/company-brain-settings-desktop.png`

## Safety

- No deploy.
- No PM2 restart.
- No commit.
- No `.env*` or secrets touched.
- No protected runtime/workflow files touched.
- No real Company Brain VPS routing implemented.
- No real sends, writebacks, connector mutations, QBO/Jobber/Gmail/Twilio/n8n mutations, or customer-impacting actions connected.
