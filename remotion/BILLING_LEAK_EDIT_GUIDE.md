# Billing Leak Edit Guide

## Main video file
- `src/compositions/BillingLeakMobile.tsx`

## What to edit first
At the top of the file you now have three main constant blocks:
- `COPY` for visible text and labels
- `LAYOUT` for card positions, widths, heights, and gaps
- `TIMING` for major animation start points and scene durations

## Change text
Edit values in `COPY`, for example:
- `hookHeadline`
- `flowJobLabel`
- `costLossValue`
- `calculatorCta`
- `closeHeadline`

## Move a box
Edit the scene values in `LAYOUT`, for example:
- `LAYOUT.hook.heroTop`
- `LAYOUT.flow.leftCardX`
- `LAYOUT.close.centerY`

## Make a card taller or wider
Edit the width or height values in `LAYOUT`, for example:
- `LAYOUT.flow.cardWidth`
- `LAYOUT.cost.moneyCardWidth`
- `LAYOUT.recovery.stateHeight`
- `LAYOUT.calculator.resultHeight`

## Change animation timing
Edit `TIMING`, for example:
- `TIMING.hook.heroIn`
- `TIMING.flow.beamIn`
- `TIMING.audit.issue2In`
- `TIMING.close.duration`

## Preview in Studio
From the `remotion/` folder:

```bash
npm exec remotion studio src/index.tsx
```

## Render one still
```bash
npm exec remotion still src/index.tsx billing-leak-mobile ../public/broll/test-still.png --frame=300
```

## Render final MP4
```bash
npm exec remotion render src/index.tsx billing-leak-mobile ../public/broll/billing-leak-mobile-v4.mp4 --concurrency=1 --x264-preset=superfast --jpeg-quality=95 --disallow-parallel-encoding
```

## Best workflow
1. Change `COPY`, `LAYOUT`, or `TIMING`
2. Render a targeted still
3. Check readability on the still
4. Repeat until clean
5. Render the final MP4 once
