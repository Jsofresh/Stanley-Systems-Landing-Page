# Remotion editing

If you want to edit the Stanley video yourself, work here:

- Project root: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/remotion`
- Main composition file: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/remotion/src/compositions/BillingLeakMobile.tsx`
- Composition id: `billing-leak-mobile`
- Output folder: `/home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/public/broll`

## Start the editor

From the site repo root:

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page
npm run remotion
```

Or directly:

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/remotion
npm exec remotion studio src/index.tsx
```

## Useful commands

List compositions:

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/remotion
npm exec remotion compositions src/index.tsx
```

Render a still for a specific frame:

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/remotion
npx remotion still src/index.tsx billing-leak-mobile ../public/broll/test-still.png --frame=1500 --overwrite
```

Render the full video:

```bash
cd /home/jaden/.openclaw/workspace/Stanley-Systems-Landing-Page/remotion
npm exec remotion render billing-leak-mobile ../public/broll/billing-leak-mobile-custom.mp4 --concurrency=1 --image-format=jpeg --jpeg-quality=80 --x264-preset=superfast --crf=23 --disallow-parallel-encoding --media-cache-size-in-bytes=134217728 --offthreadvideo-cache-size-in-bytes=134217728 --timeout=120000 --overwrite
```

## Current files

- Latest render: `public/broll/billing-leak-mobile-v4.mp4`
- Prior approved render: `public/broll/billing-leak-mobile-v3.mp4`

## Note

The `/remotion` website page is only a private info page. The real editing happens in the Remotion project folder or in Remotion Studio, not inside the public website UI.
