# Mobile user-story QA error log

Initial automated mobile QA found these issues before fixes:

1. `/login` — horizontal overflow at 393px mobile viewport.
2. `/portal` — same unauthenticated login surface overflowed at 393px; the 401 session check is expected for logged-out users and is no longer treated as a UX failure.
3. `/404` — expected 404 route was incorrectly classified as a failure by the QA harness; harness now treats the 404 status as expected behavior for that route.
4. `/demo/bayview/request-service` — mobile overflow from desktop two-column header/form layout and input/card sizing.

Fixes applied:

- Added mobile overflow guards and word wrapping on the login/client portal surface.
- Made Bayview request-service layout single-column on mobile, with boxed inputs and responsive service-area card.
- Updated the canonical QA harness with expected-status / expected-console exceptions for `/404` and logged-out `/portal`.

Post-fix retest:

- Full live mobile QA rerun at 393x759.
- 63 routes inventoried.
- 505 user-story rows tested.
- 0 failing/blocking rows after fixes.
