# Stanley Systems Website QA Error Log

## Resolved issues

### 1. Stale Next.js not-found chunk returned 400 in browser QA

- **Observed:** Playwright browser checks on homepage, AI Office Map, pricing, contact, and mobile pages saw a 400 for `/_next/static/chunks/app/not-found-e947b06dd54b29be.js`.
- **Impact:** Pages still rendered 200, but browser console/resource checks showed a stale chunk reference from a previous build.
- **Fix:** Stopped `stanley-landing` and `stanley-landing-preview`, backed up `.next`, rebuilt clean, restarted both PM2 processes.
- **Verification:** Live HTML now references `not-found-dfe9b55b1b1c00e5.js`; Playwright browser interaction QA passes with zero failures; canonical user-story QA passes 69/69.

## Unresolved issues

None in the tested user-story set.
