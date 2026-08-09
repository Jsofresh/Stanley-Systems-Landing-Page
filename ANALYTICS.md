# Website Analytics

Stanley Systems uses client-side PostHog tracking for website/content attribution.

## Public Env Vars

Set these in the website environment. Do not commit secret values.

```bash
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

`NEXT_PUBLIC_POSTHOG_KEY` is required for tracking to send. If it is missing, the site still works and no PostHog events are sent.

## Events

- `page_viewed`
- `cta_clicked`
- `contact_form_started`
- `contact_form_submitted`
- `calendly_clicked`

## Attribution Properties

Events include these properties when available:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `referrer`
- `landing_page`
- `current_path`
- `content_asset`
- `cta_label`
- `cta_location`

Contact form tracking intentionally does not send private message contents.

