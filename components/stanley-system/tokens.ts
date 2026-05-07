// Shared visual tokens for the Stanley Systems foundry.
//
// Scope: Homepage Section 5, Cashflow Control System page, and Repeat Revenue System page.
// Keep future foundry/page components pulling from this file instead of inventing new
// scattered colors, shadows, radius, spacing, or CTA/card treatments.

export const stanleySystemColors = {
  ink: {
    strongest: '#071421',
    deep: '#071422',
    navy: '#0B1F33',
    body: '#102033',
    muted: '#455467',
    soft: '#536173',
    faint: '#607080',
  },
  green: {
    primary: '#15803D',
    hover: '#116832',
    visualKit: '#08a64b',
    visualKitDeep: '#087b3f',
    textSoft: '#7ee09f',
  },
  mint: {
    softest: '#f4fbf5',
    wash: '#eef9f2',
    pale: '#eaf6e6',
    bright: '#DDF7E8',
    border: '#bfe4c8',
    borderSoft: '#cfe8d5',
  },
  canvas: {
    white: '#FFFFFF',
    warm: '#f7f7f4',
    soft: '#fbfaf7',
    beige: '#F7F2EA',
    beigeSoft: '#FBF8F2',
  },
  border: {
    neutral: '#DED6C8',
    neutralSoft: '#ECE4D8',
    card: 'rgba(16, 32, 51, 0.10)',
    green: 'rgba(21, 128, 61, 0.18)',
    greenStrong: 'rgba(21, 128, 61, 0.28)',
  },
  danger: {
    text: '#B42318',
    border: 'rgba(180, 35, 24, 0.22)',
    surface: '#fff5f3',
  },
} as const

export const stanleySystemRadii = {
  xs: '0.5rem',
  sm: '0.72rem',
  md: '0.85rem',
  lg: '1.15rem',
  xl: '1.5rem',
  card: '1.75rem',
  sectionCard: '2rem',
  medallion: '9999px',
  button: '0.85rem',
  pill: '9999px',
} as const

export const stanleySystemShadows = {
  card: '0 18px 55px rgba(7, 20, 34, 0.10), 0 2px 10px rgba(7, 20, 34, 0.05)',
  cardLifted: '0 28px 75px rgba(7, 20, 34, 0.13), 0 6px 18px rgba(7, 20, 34, 0.06)',
  medallion: '0 18px 34px rgba(21, 128, 61, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
  button: '0 16px 34px rgba(21, 128, 61, 0.24), 0 4px 10px rgba(21, 128, 61, 0.16)',
  panel: '0 16px 48px rgba(7, 20, 34, 0.08)',
  softInset: 'inset 0 1px 0 rgba(255, 255, 255, 0.84)',
} as const

export const stanleySystemWidths = {
  shell: '90rem',
  pageShell: '80rem',
  reading: '48rem',
  cardCopy: '34rem',
  narrowPanel: '42rem',
} as const

export const stanleySystemSpacing = {
  sectionY: {
    mobile: '4.5rem',
    desktop: '7rem',
  },
  sectionPaddingX: {
    mobile: '1.5rem',
    tablet: '2rem',
    desktop: '2.5rem',
  },
  cardPadding: {
    mobile: '1.35rem',
    desktop: '2rem',
    large: '2.5rem',
  },
  flowGap: {
    compact: '0.75rem',
    default: '1rem',
    roomy: '1.35rem',
  },
  stack: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
} as const

export const stanleySystemType = {
  family: 'var(--font-front-page), Helvetica, Arial, sans-serif',
  display: {
    section: 'clamp(3.25rem, 7vw, 6rem)',
    hero: 'clamp(3rem, 6vw, 5.75rem)',
    pageSection: 'clamp(2.5rem, 5vw, 4.75rem)',
  },
  heading: {
    card: 'clamp(1.65rem, 2.4vw, 2.25rem)',
    panel: 'clamp(1.25rem, 1.7vw, 1.7rem)',
    tile: '1rem',
  },
  body: {
    large: 'clamp(1.05rem, 1.5vw, 1.25rem)',
    default: '1rem',
    small: '0.9rem',
  },
  tracking: {
    display: '-0.055em',
    heading: '-0.035em',
    tight: '-0.02em',
  },
  leading: {
    display: '0.9',
    heading: '0.98',
    body: '1.65',
  },
} as const

export const stanleySystemCssVars = {
  '--stanley-system-ink-strong': stanleySystemColors.ink.strongest,
  '--stanley-system-ink': stanleySystemColors.ink.body,
  '--stanley-system-navy': stanleySystemColors.ink.navy,
  '--stanley-system-muted': stanleySystemColors.ink.muted,
  '--stanley-system-green': stanleySystemColors.green.primary,
  '--stanley-system-green-hover': stanleySystemColors.green.hover,
  '--stanley-system-mint': stanleySystemColors.mint.wash,
  '--stanley-system-mint-soft': stanleySystemColors.mint.softest,
  '--stanley-system-canvas': stanleySystemColors.canvas.warm,
  '--stanley-system-surface': stanleySystemColors.canvas.white,
  '--stanley-system-card-border': stanleySystemColors.border.green,
  '--stanley-system-card-shadow': stanleySystemShadows.card,
  '--stanley-system-card-radius': stanleySystemRadii.card,
} as const

export const stanleySystemClassNames = {
  page: 'bg-[#f7f7f4] text-[#102033] [font-family:var(--font-front-page),Helvetica,Arial,sans-serif]',
  section: 'relative isolate overflow-hidden bg-[#f7f7f4] py-18 text-[#102033] md:py-28',
  whiteSection: 'relative isolate overflow-hidden bg-white py-18 text-[#102033] md:py-28',
  shell: 'mx-auto w-full max-w-[90rem] px-6 lg:px-10',
  pageShell: 'mx-auto w-full max-w-7xl px-6 lg:px-8',
  centeredHeader: 'mx-auto max-w-5xl text-center',
  displayHeadline: 'text-balance text-[clamp(3.25rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-[#071421]',
  pageHeadline: 'text-balance text-[clamp(3rem,6vw,5.75rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[#071421]',
  headlineAccent: 'relative inline-block text-[#15803D]',
  bodyLarge: 'text-pretty text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.65] text-[#455467]',
  premiumCard: 'rounded-[1.75rem] border border-[rgba(21,128,61,0.18)] bg-white shadow-[0_18px_55px_rgba(7,20,34,0.10),0_2px_10px_rgba(7,20,34,0.05)]',
  diagramPanel: 'rounded-[1.5rem] border border-[rgba(16,32,51,0.10)] bg-white shadow-[0_16px_48px_rgba(7,20,34,0.08)]',
  mintPanel: 'rounded-[1.5rem] border border-[#cfe8d5] bg-[#f4fbf5]',
  iconMedallion: 'grid size-20 place-items-center rounded-full border-[8px] border-white bg-[#eaf6e6] text-[#15803D] shadow-[0_18px_34px_rgba(21,128,61,0.16),inset_0_1px_0_rgba(255,255,255,0.95)]',
  flowNode: 'rounded-[1.15rem] border border-[#cfe8d5] bg-[#f4fbf5] p-4 text-center shadow-[0_10px_28px_rgba(7,20,34,0.06)]',
  flowConnector: 'text-[#15803D]',
  button: 'inline-flex min-h-14 items-center justify-center rounded-[0.85rem] bg-[#15803D] px-6 py-4 text-base font-semibold text-white shadow-[0_16px_34px_rgba(21,128,61,0.24),0_4px_10px_rgba(21,128,61,0.16)] transition hover:bg-[#116832]',
  secondaryButton: 'inline-flex min-h-14 items-center justify-center rounded-[0.85rem] border border-[rgba(21,128,61,0.28)] bg-white px-6 py-4 text-base font-semibold text-[#15803D] transition hover:bg-[#eef9f2]',
  metricStrip: 'rounded-[1.5rem] border border-[#cfe8d5] bg-[#f4fbf5] p-4 shadow-[0_12px_32px_rgba(7,20,34,0.06)]',
  alertPanel: 'rounded-[1.25rem] border border-[rgba(180,35,24,0.22)] bg-[#fff5f3] p-5 text-[#102033]',
} as const

export const stanleySystemFlow = {
  arrow: '→',
  desktop: 'grid items-stretch gap-4 md:grid-flow-col md:auto-cols-fr',
  mobileStack: 'grid gap-4 sm:grid-cols-2 lg:grid-cols-none',
  connectorClassName: stanleySystemClassNames.flowConnector,
} as const

export type StanleySystemColorToken = typeof stanleySystemColors
export type StanleySystemRadiusToken = typeof stanleySystemRadii
export type StanleySystemShadowToken = typeof stanleySystemShadows
export type StanleySystemClassNameToken = keyof typeof stanleySystemClassNames
