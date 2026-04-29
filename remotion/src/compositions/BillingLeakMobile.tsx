import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {z} from 'zod';
import {noise3D} from '@remotion/noise';
import {
  ArrowRightLeft,
  Calculator,
  CheckCheck,
  CircleAlert,
  ClipboardCheck,
  DollarSign,
  Receipt,
  ScanSearch,
  TrendingDown,
  Wrench,
} from 'lucide-react';
import {theme} from '../theme';

const PALETTE = {
  bgTop: '#071833',
  bgMid: '#0C2145',
  bgBottom: '#12305D',
  panelTop: 'rgba(21,42,84,0.96)',
  panelBottom: 'rgba(9,22,49,0.98)',
  panelEdge: 'rgba(143,162,255,0.28)',
  text: '#F4F7FF',
  textSoft: '#D8E3FF',
  textDim: '#9FB4E6',
  indigo: '#6C7CF1',
  indigoBright: '#7B8EF3',
  success: '#1AA36A',
  danger: '#C45A67',
  grid: 'rgba(183,204,255,0.08)',
};

const COPY = {
  hookChip: 'Revenue leak',
  hookHeadline: 'Work got done.',
  hookSubhead: 'The invoice never went out.',
  hookMoneyLabel: 'Quiet loss',
  hookRecoveredLabel: 'Can still be recovered',
  flowChip: 'Existing tools to QuickBooks',
  flowHeadline: 'One job moves.',
  flowSubhead: 'Then the invoice lane updates.',
  flowJobLabel: 'Dock repair',
  flowJobAmount: '$2,180',
  flowJobStatus: 'Job done',
  flowInvoiceStatus: 'Sent to QuickBooks',
  flowSupport1: 'No migration',
  flowSupport2: 'No retyping',
  basicChip: 'Basic sync helps',
  basicHeadline: 'Good start',
  basicSubhead: 'But it does not catch everything.',
  basicPositive: 'Moves clean jobs forward',
  basicNegative: 'Still misses real leakage',
  auditChip: 'Stanley audit',
  auditHeadline: 'One issue at a time.',
  auditSubhead: 'Missing invoice. Wrong amount. Billing delay.',
  auditIssue1: 'Missing invoice',
  auditIssue2: 'Wrong amount',
  auditIssue3: 'Billing delay',
  costChip: 'Quiet loss',
  costHeadline: 'Costs already happened.',
  costSubhead: 'The money still did not get collected.',
  costLossLabel: 'Not collected',
  costLossValue: '$2,901',
  costChip1: 'Job done',
  costChip2: 'Invoice missing',
  recoveryChip: 'Job done to paid',
  recoveryHeadline: 'Caught. Fixed. Collected.',
  recoverySubhead: 'The quiet loss turns into posted revenue.',
  recoveryMoneyLabel: 'Recovered revenue',
  recoveryMoneyValue: '$2,901',
  recoveryStep1: 'Invoice created',
  recoveryStep2: 'Amount fixed',
  recoveryStep3: 'Queue cleared',
  calculatorChip: 'Free calculator',
  calculatorHeadline: 'Check your leak',
  calculatorSubhead: 'Two minutes. One painful number.',
  calculatorField1Label: 'Jobs / month',
  calculatorField1Value: '42',
  calculatorField2Label: 'Avg invoice',
  calculatorField2Value: '$1,180',
  calculatorField3Label: 'Miss rate',
  calculatorField3Value: '3%',
  calculatorResultLabel: 'Annual leak estimate',
  calculatorResultValue: '$18,360',
  calculatorCta: 'Check your leak',
  closeChip: 'Same tools. Better recovery.',
  closeHeadline: 'Same tools. Better recovery.',
  closeSubhead: 'Keep the stack. Tighten the money recovery.',
  closePathLeft: 'Existing tools',
  closePathCenter: 'Stanley audit',
  closePathRight: 'QuickBooks',
  closeSupport1: 'No migration',
  closeSupport2: 'No new software',
  closeSupport3: 'Money collected',
} as const;

const LAYOUT = {
  safeStage: {
    width: 1080,
    height: 1920,
    left: 0,
    top: 0,
  },
  scene: {
    topPad: 42,
    sectionGap: 24,
    panelRadius: 0,
    cardRadius: 30,
  },
  hook: {
    heroTop: 180,
    heroWidth: 1080,
    heroHeight: 1180,
    cardsTop: 1410,
    cardsGap: 16,
  },
  flow: {
    panelTop: 180,
    panelHeight: 1180,
    leftCardX: 60,
    rightCardX: 720,
    cardTop: 220,
    cardWidth: 300,
    supportTop: 860,
    beamTop: 360,
    beamWidth: 328,
  },
  basic: {
    panelWidth: 1080,
    panelHeight: 1020,
    supportWidth: 1080,
    supportTop: 1320,
  },
  audit: {
    panelTop: 180,
    panelHeight: 1180,
    heroWidth: 1080,
    issueWidth: 560,
    issueHeight: 148,
    issueGap: 18,
  },
  cost: {
    panelTop: 180,
    panelHeight: 1220,
    moneyCardWidth: 1080,
    chipsTop: 1440,
    graphTop: 700,
    graphHeight: 260,
  },
  recovery: {
    panelTop: 180,
    panelHeight: 1200,
    stateWidth: 240,
    stateHeight: 208,
    moneyTop: 620,
    moneyWidth: 450,
    chipsWidth: 450,
  },
  calculator: {
    panelTop: 180,
    panelHeight: 1240,
    fieldWidth: 280,
    fieldGap: 14,
    resultTop: 360,
    resultHeight: 640,
  },
  close: {
    panelTop: 180,
    panelHeight: 1160,
    pathCardWidth: 220,
    pathCardHeight: 220,
    chipsTop: 1460,
    centerY: 280,
    sideY: 360,
  },
} as const;

const TIMING = {
  hook: {duration: 210, titleIn: 12, heroIn: 28, compareIn: 72, cardsIn: 114},
  flow: {duration: 210, titleIn: 12, leftIn: 24, beamIn: 48, rightIn: 72, supportIn: 108},
  basic: {duration: 180, titleIn: 12, panelIn: 24, supportIn: 76},
  audit: {duration: 270, titleIn: 12, heroIn: 24, issue1In: 70, issue2In: 122, issue3In: 174, settleIn: 220},
  cost: {duration: 240, titleIn: 12, moneyIn: 42, graphIn: 62, chipsIn: 118},
  recovery: {duration: 210, titleIn: 12, leftIn: 28, centerIn: 52, rightIn: 76, moneyIn: 108, chipsIn: 128},
  calculator: {duration: 210, titleIn: 12, field1In: 28, field2In: 46, field3In: 64, resultIn: 92},
  close: {duration: 570, titleIn: 12, leftIn: 34, centerIn: 58, rightIn: 82, chipsIn: 126},
} as const;

const DEFAULT_TOTAL_DURATION = Object.values(TIMING).reduce((sum, scene) => sum + scene.duration, 0);
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const softEase = Easing.bezier(0.22, 0.82, 0.18, 1);

type Tone = 'indigo' | 'green' | 'red';
type IconType = React.ComponentType<{size?: number; color?: string; strokeWidth?: number}>;

const between = (frame: number, start: number, duration: number, from = 0, to = 1, easingFn = ease) =>
  interpolate(frame, [start, start + duration], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: easingFn,
  });

const rise = (frame: number, start: number, duration: number, from = 22, to = 0) =>
  interpolate(frame, [start, start + duration], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: softEase,
  });

const scaleIn = (frame: number, start: number, duration: number, from = 0.982, to = 1) =>
  interpolate(frame, [start, start + duration], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: softEase,
  });

const pulse = (frame: number, start: number, duration: number, min = 0.08, max = 0.22) => {
  const up = between(frame, start, duration / 2, min, max, softEase);
  const down = between(frame, start + duration / 2, duration / 2, max, min, softEase);
  return frame < start + duration / 2 ? up : down;
};

const textFit = ({text, maxWidth, maxFontSize, minFontSize}: {text: string; maxWidth: number; maxFontSize: number; minFontSize: number}) => {
  const estimate = maxWidth / Math.max(text.length * 0.58, 1);
  return Math.max(minFontSize, Math.min(maxFontSize, Math.floor(estimate)));
};

const formatMoney = (value: number, withCents = false) =>
  value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: withCents ? 2 : 0,
    maximumFractionDigits: withCents ? 2 : 0,
  });

const iconTone = (tone: Tone) => {
  if (tone === 'green') return {stroke: '#DDFBEA', bg: 'rgba(26,163,106,0.14)', edge: 'rgba(85,204,152,0.34)'};
  if (tone === 'red') return {stroke: '#FFE4E7', bg: 'rgba(196,90,103,0.16)', edge: 'rgba(196,90,103,0.34)'};
  return {stroke: '#E7EDFF', bg: 'rgba(108,124,241,0.16)', edge: 'rgba(143,162,255,0.36)'};
};

const GrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const alpha = Math.max(0, Math.min(1, ((noise3D('grain', 0.15, 0.3, frame * 0.02) + 1) / 2) * 0.018 + 0.006));
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        opacity: alpha,
        mixBlendMode: 'screen',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.72) 0 0.8px, transparent 1.2px)',
        backgroundSize: '220px 220px',
      }}
    />
  );
};

const BackgroundGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const driftX = noise3D('grid-x', 0.2, 0.1, frame * 0.01) * 18;
  const driftY = noise3D('grid-y', 0.12, 0.24, frame * 0.01) * 18;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.45,
        backgroundImage: `linear-gradient(${PALETTE.grid} 1px, transparent 1px), linear-gradient(90deg, ${PALETTE.grid} 1px, transparent 1px)`,
        backgroundSize: '88px 88px',
        transform: `translate(${driftX}px, ${driftY}px)`,
        maskImage: 'radial-gradient(circle at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.74) 54%, rgba(0,0,0,0) 84%)',
      }}
    />
  );
};

const SafeStage: React.FC<React.PropsWithChildren<{push?: number; x?: number; y?: number}>> = ({children, push = 0, x = 0, y = 0}) => (
  <AbsoluteFill style={{backgroundColor: PALETTE.bgTop}}>
    <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${PALETTE.bgTop} 0%, ${PALETTE.bgMid} 48%, ${PALETTE.bgBottom} 100%)`}} />
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 18%, rgba(123,142,243,0.14) 0%, rgba(123,142,243,0.05) 26%, rgba(0,0,0,0) 56%)'}} />
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 12% 76%, rgba(26,163,106,0.08) 0%, rgba(26,163,106,0) 32%)'}} />
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 84% 24%, rgba(108,124,241,0.14) 0%, rgba(108,124,241,0) 30%)'}} />
    <BackgroundGrid />
    <div style={{position: 'absolute', inset: 0, transform: `translate(${x}px, ${y}px) scale(${1 + push})`, transformOrigin: '50% 50%'}}>
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.safeStage.left,
          top: LAYOUT.safeStage.top,
          width: LAYOUT.safeStage.width,
          height: LAYOUT.safeStage.height,
        }}
      >
        {children}
      </div>
    </div>
    <div style={{position: 'absolute', inset: 0, boxShadow: 'inset 0 0 260px rgba(5,12,28,0.24), inset 0 -180px 220px rgba(3,8,20,0.25)'}} />
    <GrainOverlay />
  </AbsoluteFill>
);

const PremiumPanel: React.FC<React.PropsWithChildren<{style?: React.CSSProperties; accent?: string; glow?: string; fullBleed?: boolean}>> = ({children, style, accent = PALETTE.panelEdge, glow = 'rgba(108,124,241,0.12)', fullBleed = false}) => (
  <div
    style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: fullBleed ? 0 : LAYOUT.scene.panelRadius,
      border: fullBleed ? 'none' : `1px solid ${accent}`,
      background: fullBleed ? 'transparent' : `linear-gradient(180deg, ${PALETTE.panelTop} 0%, ${PALETTE.panelBottom} 100%)`,
      boxShadow: fullBleed
        ? 'none'
        : `0 26px 70px rgba(3,8,20,0.32), 0 0 34px ${glow}, inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -44px 66px rgba(0,0,0,0.18)`,
      ...style,
    }}
  >
    {fullBleed ? null : <div style={{position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 18%, rgba(255,255,255,0) 42%)'}} />}
    {fullBleed ? null : <div style={{position: 'absolute', left: 22, right: 22, top: 14, height: 2, borderRadius: 999, zIndex: 1, background: 'rgba(255,255,255,0.2)'}} />}
    {fullBleed ? null : <div style={{position: 'absolute', inset: 0, zIndex: 1, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03), inset 0 -90px 120px rgba(5,12,28,0.24)'}} />}
    <div style={{position: 'relative', zIndex: 3, width: '100%', height: '100%'}}>{children}</div>
  </div>
);

const PremiumCard: React.FC<React.PropsWithChildren<{style?: React.CSSProperties; accent?: string; glow?: string}>> = ({children, style, accent, glow}) => (
  <PremiumPanel style={{borderRadius: LAYOUT.scene.cardRadius, ...style}} accent={accent} glow={glow}>
    {children}
  </PremiumPanel>
);

const SectionChip: React.FC<{text: string; tone?: Tone}> = ({text, tone = 'indigo'}) => {
  const tones = iconTone(tone);
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 18px', borderRadius: 999, background: tones.bg, border: `1px solid ${tones.edge}`, color: tones.stroke, fontSize: 24, fontWeight: 700, letterSpacing: 0.3, boxShadow: '0 10px 24px rgba(3,8,20,0.18)'}}>
      {text}
    </div>
  );
};

const StatusChip: React.FC<{text: string; tone?: Tone; icon?: IconType; style?: React.CSSProperties}> = ({text, tone = 'indigo', icon: Icon, style}) => {
  const tones = iconTone(tone);
  return (
    <div style={{display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 999, background: tones.bg, border: `1px solid ${tones.edge}`, color: tones.stroke, fontSize: textFit({text, maxWidth: 260, maxFontSize: 18, minFontSize: 14}), fontWeight: 700, letterSpacing: 0.3, boxShadow: '0 10px 24px rgba(3,8,20,0.18)', ...style}}>
      {Icon ? <Icon size={16} color={tones.stroke} strokeWidth={2.2} /> : null}
      <span>{text}</span>
    </div>
  );
};

const IconBadge: React.FC<{icon: IconType; tone?: Tone; size?: number}> = ({icon: Icon, tone = 'indigo', size = 20}) => {
  const tones = iconTone(tone);
  return (
    <div style={{width: size + 22, height: size + 22, borderRadius: 999, background: tones.bg, border: `1px solid ${tones.edge}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px rgba(3,8,20,0.18)'}}>
      <Icon size={size} color={tones.stroke} strokeWidth={2.2} />
    </div>
  );
};

const PanelHeading: React.FC<{eyebrow: string; title: string; icon: IconType; tone?: Tone; body?: string; maxWidth?: number}> = ({eyebrow, title, icon, tone = 'indigo', body, maxWidth = 420}) => (
  <div style={{display: 'grid', gap: 12}}>
    <div style={{display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'flex-start'}}>
      <div style={{display: 'grid', gap: 10, flex: 1}}>
        <div style={{fontSize: 21, color: PALETTE.textDim, fontWeight: 700, letterSpacing: 0.8}}>{eyebrow}</div>
        <div style={{fontSize: textFit({text: title, maxWidth, maxFontSize: 72, minFontSize: 28}), lineHeight: 0.98, color: PALETTE.text, fontWeight: 700, letterSpacing: -2}}>{title}</div>
      </div>
      <IconBadge icon={icon} tone={tone} size={22} />
    </div>
    {body ? <div style={{fontSize: 28, lineHeight: 1.14, color: PALETTE.textSoft, fontWeight: 600}}>{body}</div> : null}
  </div>
);

const CounterCard: React.FC<{label: string; value: string; icon: IconType; tone?: 'default' | 'green' | 'red'; supporting?: string; style?: React.CSSProperties}> = ({label, value, icon, tone = 'default', supporting, style}) => {
  const valueColor = tone === 'green' ? '#E7FFF2' : tone === 'red' ? '#FFE4E7' : PALETTE.text;
  const glow = tone === 'green' ? 'rgba(26,163,106,0.14)' : tone === 'red' ? 'rgba(196,90,103,0.14)' : 'rgba(108,124,241,0.12)';
  return (
    <PremiumCard style={{padding: '24px 22px', minHeight: 196, ...style}} glow={glow}>
      <div style={{display: 'grid', gap: 14, height: '100%'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center'}}>
          <div style={{fontSize: 20, color: PALETTE.textDim, fontWeight: 700, letterSpacing: 0.6, lineHeight: 1.1, maxWidth: 220}}>{label}</div>
          <IconBadge icon={icon} tone={tone === 'green' ? 'green' : tone === 'red' ? 'red' : 'indigo'} size={18} />
        </div>
        <div style={{fontSize: textFit({text: value, maxWidth: 320, maxFontSize: 84, minFontSize: 38}), lineHeight: 0.94, letterSpacing: -2.8, color: valueColor, fontWeight: 700}}>{value}</div>
        {supporting ? <div style={{fontSize: 18, color: PALETTE.textSoft, fontWeight: 600}}>{supporting}</div> : null}
      </div>
    </PremiumCard>
  );
};

const BeamConnector: React.FC<{start: {x: number; y: number}; end: {x: number; y: number}; drawStart: number; drawDuration: number; fadeStart?: number; tone?: Tone}> = ({start, end, drawStart, drawDuration, fadeStart, tone = 'indigo'}) => {
  const frame = useCurrentFrame();
  const progress = between(frame, drawStart, drawDuration, 0, 1);
  const fade = fadeStart === undefined ? 1 : 1 - between(frame, fadeStart, 10, 0, 1);
  const color = tone === 'green' ? PALETTE.success : tone === 'red' ? PALETTE.danger : PALETTE.indigoBright;
  const width = end.x - start.x;
  const height = end.y - start.y;
  const path = `M ${start.x} ${start.y} C ${start.x + width * 0.4} ${start.y}, ${end.x - width * 0.32} ${end.y}, ${end.x} ${end.y}`;
  const travelerX = start.x + width * progress;
  const travelerY = start.y + height * progress;
  return (
    <svg style={{position: 'absolute', inset: 0, overflow: 'visible', opacity: fade, pointerEvents: 'none', zIndex: 4}}>
      <path d={path} fill="none" stroke="rgba(163,186,255,0.12)" strokeWidth={4} strokeLinecap="round" />
      <path d={path} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeDasharray="1" strokeDashoffset={1 - progress} pathLength={1} />
      <circle cx={travelerX} cy={travelerY} r={10} fill={color} opacity={progress} />
    </svg>
  );
};

const MoneyCurve: React.FC<{active: number}> = ({active}) => (
  <svg viewBox="0 0 760 180" style={{width: '100%', height: '100%', opacity: active, position: 'relative', zIndex: 4}}>
    <path d="M40 30 C 180 36, 300 62, 420 96 S 620 132, 720 156" fill="none" stroke="rgba(255,228,231,0.22)" strokeWidth={6} />
    <path d="M40 30 C 180 36, 300 62, 420 96 S 620 132, 720 156" fill="none" stroke="#FFE4E7" strokeWidth={6} strokeLinecap="round" />
  </svg>
);

const billingLeakMobileSchema = z.object({
  hookChip: z.string().default(COPY.hookChip),
  hookHeadline: z.string().default(COPY.hookHeadline),
  hookSubhead: z.string().default(COPY.hookSubhead),
  hookMoneyLabel: z.string().default(COPY.hookMoneyLabel),
  hookRecoveredLabel: z.string().default(COPY.hookRecoveredLabel),
  flowChip: z.string().default(COPY.flowChip),
  flowHeadline: z.string().default(COPY.flowHeadline),
  flowSubhead: z.string().default(COPY.flowSubhead),
  flowJobLabel: z.string().default(COPY.flowJobLabel),
  flowJobAmount: z.string().default(COPY.flowJobAmount),
  flowJobStatus: z.string().default(COPY.flowJobStatus),
  flowInvoiceStatus: z.string().default(COPY.flowInvoiceStatus),
  flowSupport1: z.string().default(COPY.flowSupport1),
  flowSupport2: z.string().default(COPY.flowSupport2),
  basicChip: z.string().default(COPY.basicChip),
  basicHeadline: z.string().default(COPY.basicHeadline),
  basicSubhead: z.string().default(COPY.basicSubhead),
  basicPositive: z.string().default(COPY.basicPositive),
  basicNegative: z.string().default(COPY.basicNegative),
  auditChip: z.string().default(COPY.auditChip),
  auditHeadline: z.string().default(COPY.auditHeadline),
  auditSubhead: z.string().default(COPY.auditSubhead),
  auditIssue1: z.string().default(COPY.auditIssue1),
  auditIssue2: z.string().default(COPY.auditIssue2),
  auditIssue3: z.string().default(COPY.auditIssue3),
  costChip: z.string().default(COPY.costChip),
  costHeadline: z.string().default(COPY.costHeadline),
  costSubhead: z.string().default(COPY.costSubhead),
  costLossLabel: z.string().default(COPY.costLossLabel),
  costLossValue: z.string().default(COPY.costLossValue),
  costChip1: z.string().default(COPY.costChip1),
  costChip2: z.string().default(COPY.costChip2),
  recoveryChip: z.string().default(COPY.recoveryChip),
  recoveryHeadline: z.string().default(COPY.recoveryHeadline),
  recoverySubhead: z.string().default(COPY.recoverySubhead),
  recoveryMoneyLabel: z.string().default(COPY.recoveryMoneyLabel),
  recoveryMoneyValue: z.string().default(COPY.recoveryMoneyValue),
  recoveryStep1: z.string().default(COPY.recoveryStep1),
  recoveryStep2: z.string().default(COPY.recoveryStep2),
  recoveryStep3: z.string().default(COPY.recoveryStep3),
  calculatorChip: z.string().default(COPY.calculatorChip),
  calculatorHeadline: z.string().default(COPY.calculatorHeadline),
  calculatorSubhead: z.string().default(COPY.calculatorSubhead),
  calculatorField1Label: z.string().default(COPY.calculatorField1Label),
  calculatorField1Value: z.string().default(COPY.calculatorField1Value),
  calculatorField2Label: z.string().default(COPY.calculatorField2Label),
  calculatorField2Value: z.string().default(COPY.calculatorField2Value),
  calculatorField3Label: z.string().default(COPY.calculatorField3Label),
  calculatorField3Value: z.string().default(COPY.calculatorField3Value),
  calculatorResultLabel: z.string().default(COPY.calculatorResultLabel),
  calculatorResultValue: z.string().default(COPY.calculatorResultValue),
  calculatorCta: z.string().default(COPY.calculatorCta),
  closeChip: z.string().default(COPY.closeChip),
  closeHeadline: z.string().default(COPY.closeHeadline),
  closeSubhead: z.string().default(COPY.closeSubhead),
  closePathLeft: z.string().default(COPY.closePathLeft),
  closePathCenter: z.string().default(COPY.closePathCenter),
  closePathRight: z.string().default(COPY.closePathRight),
  closeSupport1: z.string().default(COPY.closeSupport1),
  closeSupport2: z.string().default(COPY.closeSupport2),
  closeSupport3: z.string().default(COPY.closeSupport3),
  showHookScene: z.boolean().default(true),
  showFlowScene: z.boolean().default(true),
  showBasicScene: z.boolean().default(true),
  showAuditScene: z.boolean().default(true),
  showCostScene: z.boolean().default(true),
  showRecoveryScene: z.boolean().default(true),
  showCalculatorScene: z.boolean().default(true),
  showCloseScene: z.boolean().default(true),
  colorPreset: z.enum(['default', 'cool', 'emerald']).default('default'),
});

export type BillingLeakMobileProps = z.infer<typeof billingLeakMobileSchema>;
const defaultBillingLeakMobileProps: BillingLeakMobileProps = billingLeakMobileSchema.parse({});
export const billingLeakMobileDuration = DEFAULT_TOTAL_DURATION;

const SceneTitle: React.FC<{chip: string; headline: string; subhead: string; tone?: Tone; frame: number; start: number}> = ({chip, headline, subhead, tone = 'indigo', frame, start}) => (
  <div style={{display: 'grid', justifyItems: 'center', gap: 12, paddingTop: LAYOUT.scene.topPad}}>
    <div style={{opacity: between(frame, start, 16), transform: `translateY(${rise(frame, start, 16, 16, 0)}px)`}}><SectionChip text={chip} tone={tone} /></div>
    <div style={{display: 'grid', justifyItems: 'center', gap: 12, opacity: between(frame, start + 8, 16), transform: `translateY(${rise(frame, start + 8, 16, 18, 0)}px)`}}>
      <div style={{fontSize: 66, lineHeight: 0.98, color: PALETTE.text, fontWeight: 700, letterSpacing: -2, textAlign: 'center', maxWidth: 760}}>{headline}</div>
      <div style={{fontSize: 30, color: PALETTE.textSoft, fontWeight: 600, textAlign: 'center', maxWidth: 620}}>{subhead}</div>
    </div>
  </div>
);

const HookScene: React.FC<{props: BillingLeakMobileProps}> = ({props}) => {
  const frame = useCurrentFrame();
  const leak = interpolate(frame, [TIMING.hook.heroIn, TIMING.hook.cardsIn], [1100, 6800], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  return (
    <SafeStage push={between(frame, 0, TIMING.hook.duration, 0, 0.03)} y={rise(frame, 0, TIMING.hook.duration, 10, -10)}>
      <SceneTitle chip={props.hookChip} headline={props.hookHeadline} subhead={props.hookSubhead} tone="red" frame={frame} start={TIMING.hook.titleIn} />
      <PremiumPanel fullBleed style={{position: 'absolute', left: 0, top: LAYOUT.hook.heroTop, width: LAYOUT.hook.heroWidth, height: LAYOUT.hook.heroHeight, padding: '34px 40px'}} glow={`rgba(196,90,103,${0.1 + pulse(frame, 44, 34, 0.08, 0.18)})`} accent="rgba(196,90,103,0.28)">
        <div style={{display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 24, height: '100%'}}>
          <div style={{opacity: between(frame, TIMING.hook.heroIn, 18), transform: `translateY(${rise(frame, TIMING.hook.heroIn, 18, 18, 0)}px) scale(${scaleIn(frame, TIMING.hook.heroIn, 18)})`}}>
            <PanelHeading eyebrow={props.hookMoneyLabel} title={formatMoney(Math.round(leak))} icon={TrendingDown} tone="red" body={props.hookSubhead} maxWidth={520} />
          </div>
          <div style={{display: 'grid', gap: 18, alignContent: 'center'}}>
            <PremiumCard style={{padding: '28px 24px', minHeight: 250, opacity: between(frame, TIMING.hook.heroIn + 16, 18)}} accent="rgba(196,90,103,0.28)" glow="rgba(196,90,103,0.14)">
              <PanelHeading eyebrow="MISSING" title={props.hookSubhead} icon={CircleAlert} tone="red" maxWidth={420} />
            </PremiumCard>
            <div style={{display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 18, alignItems: 'center', opacity: between(frame, TIMING.hook.compareIn, 18)}}>
              <PremiumCard style={{padding: '20px 22px', minHeight: 164}}>
                <PanelHeading eyebrow="EARNED" title={props.hookHeadline} icon={ClipboardCheck} tone="green" maxWidth={220} />
              </PremiumCard>
              <ArrowRightLeft size={38} color={PALETTE.indigoBright} strokeWidth={2.2} />
              <PremiumCard style={{padding: '20px 22px', minHeight: 164}} accent="rgba(85,204,152,0.3)" glow="rgba(26,163,106,0.14)">
                <PanelHeading eyebrow={props.hookRecoveredLabel} title="Recovered path ready" icon={ScanSearch} tone="green" maxWidth={220} />
              </PremiumCard>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', gap: 14, opacity: between(frame, TIMING.hook.cardsIn, 18)}}>
            <StatusChip text={props.costChip1} tone="green" />
            <StatusChip text={props.costChip2} tone="red" />
          </div>
        </div>
      </PremiumPanel>
      <div style={{position: 'absolute', left: 0, top: LAYOUT.hook.cardsTop, width: LAYOUT.safeStage.width, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: LAYOUT.hook.cardsGap, opacity: between(frame, TIMING.hook.cardsIn, 18)}}>
        <CounterCard label={props.hookMoneyLabel} value={formatMoney(Math.round(leak))} icon={TrendingDown} tone="red" supporting="Money already earned." />
        <CounterCard label={props.hookRecoveredLabel} value={formatMoney(Math.round(leak))} icon={DollarSign} tone="green" supporting="Still recoverable." />
      </div>
    </SafeStage>
  );
};

const FlowScene: React.FC<{props: BillingLeakMobileProps}> = ({props}) => {
  const frame = useCurrentFrame();
  return (
    <SafeStage push={between(frame, 0, TIMING.flow.duration, 0, 0.026)} x={interpolate(frame, [0, TIMING.flow.duration], [-4, 5], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: softEase})}>
      <SceneTitle chip={props.flowChip} headline={props.flowHeadline} subhead={props.flowSubhead} frame={frame} start={TIMING.flow.titleIn} />
      <PremiumPanel fullBleed style={{position: 'absolute', left: 0, top: LAYOUT.flow.panelTop, width: LAYOUT.safeStage.width, height: LAYOUT.flow.panelHeight, padding: '30px 40px'}} glow={`rgba(123,142,243,${0.1 + pulse(frame, 44, 28, 0.08, 0.18)})`}>
        <div style={{position: 'relative', height: '100%'}}>
          <div style={{position: 'absolute', left: LAYOUT.flow.leftCardX, top: LAYOUT.flow.cardTop, width: LAYOUT.flow.cardWidth, opacity: between(frame, TIMING.flow.leftIn, 18)}}>
            <CounterCard label={props.flowJobStatus} value={props.flowJobAmount} icon={ClipboardCheck} supporting={props.flowJobLabel} />
          </div>
          <div style={{position: 'absolute', left: 290, top: LAYOUT.flow.beamTop, width: LAYOUT.flow.beamWidth, height: 120}}>
            <BeamConnector start={{x: 0, y: 60}} end={{x: 300, y: 60}} drawStart={TIMING.flow.beamIn} drawDuration={24} fadeStart={TIMING.flow.rightIn + 8} />
          </div>
          <div style={{position: 'absolute', left: LAYOUT.flow.rightCardX, top: LAYOUT.flow.cardTop, width: LAYOUT.flow.cardWidth, opacity: between(frame, TIMING.flow.rightIn, 18)}}>
            <CounterCard label={props.flowInvoiceStatus} value={props.flowJobAmount} icon={Receipt} tone="green" supporting="QuickBooks lane updated." />
          </div>
          <div style={{position: 'absolute', left: 0, right: 0, top: LAYOUT.flow.supportTop, display: 'flex', justifyContent: 'center', gap: 16, opacity: between(frame, TIMING.flow.supportIn, 18)}}>
            <StatusChip text={props.flowSupport1} />
            <StatusChip text={props.flowSupport2} tone="green" />
          </div>
        </div>
      </PremiumPanel>
    </SafeStage>
  );
};

const BasicSyncScene: React.FC<{props: BillingLeakMobileProps}> = ({props}) => {
  const frame = useCurrentFrame();
  return (
    <SafeStage push={between(frame, 0, TIMING.basic.duration, 0, 0.02)} y={interpolate(frame, [0, TIMING.basic.duration], [8, -8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: softEase})}>
      <SceneTitle chip={props.basicChip} headline={props.basicHeadline} subhead={props.basicSubhead} tone="green" frame={frame} start={TIMING.basic.titleIn} />
      <PremiumPanel fullBleed style={{position: 'absolute', left: 0, top: 260, width: LAYOUT.basic.panelWidth, height: LAYOUT.basic.panelHeight, padding: '36px 40px 30px'}} glow="rgba(123,142,243,0.14)">
        <div style={{display: 'grid', gap: 26, justifyItems: 'center', alignContent: 'center', height: '100%'}}>
          <div style={{width: 130, height: 130, borderRadius: 999, background: 'linear-gradient(180deg, rgba(26,163,106,0.18) 0%, rgba(26,163,106,0.12) 100%)', border: '1px solid rgba(85,204,152,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 ${18 + pulse(frame, 22, 20, 0.08, 0.18) * 24}px rgba(26,163,106,0.26)`}}>
            <CheckCheck size={58} color="#E7FFF2" strokeWidth={2.4} />
          </div>
          <div style={{fontSize: 72, color: PALETTE.text, fontWeight: 700, letterSpacing: -2, textAlign: 'center'}}>{props.basicHeadline}</div>
          <div style={{fontSize: 32, color: PALETTE.textSoft, fontWeight: 600, textAlign: 'center', maxWidth: 620}}>{props.basicSubhead}</div>
        </div>
      </PremiumPanel>
      <div style={{position: 'absolute', left: 0, top: LAYOUT.basic.supportTop, width: LAYOUT.basic.supportWidth, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, opacity: between(frame, TIMING.basic.supportIn, 16)}}>
        <PremiumCard style={{padding: '22px 20px', minHeight: 170}}>
          <PanelHeading eyebrow="HELPS" title={props.basicPositive} icon={CheckCheck} tone="green" maxWidth={240} />
        </PremiumCard>
        <PremiumCard style={{padding: '22px 20px', minHeight: 170}} accent="rgba(196,90,103,0.28)" glow="rgba(196,90,103,0.14)">
          <PanelHeading eyebrow="MISS" title={props.basicNegative} icon={CircleAlert} tone="red" maxWidth={240} />
        </PremiumCard>
      </div>
    </SafeStage>
  );
};

const AuditScene: React.FC<{props: BillingLeakMobileProps}> = ({props}) => {
  const frame = useCurrentFrame();
  const issueOpacity = (start: number) => between(frame, start, 14) * (1 - between(frame, start + 30, 14));
  return (
    <SafeStage push={between(frame, 0, TIMING.audit.duration, 0, 0.028)} y={interpolate(frame, [0, TIMING.audit.duration], [12, -12], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: softEase})}>
      <SceneTitle chip={props.auditChip} headline={props.auditHeadline} subhead={props.auditSubhead} tone="green" frame={frame} start={TIMING.audit.titleIn} />
      <PremiumPanel fullBleed style={{position: 'absolute', left: 0, top: LAYOUT.audit.panelTop, width: LAYOUT.safeStage.width, height: LAYOUT.audit.panelHeight, padding: '32px 40px 28px'}} glow={`rgba(26,163,106,${0.1 + pulse(frame, 38, 28, 0.08, 0.18)})`}>
        <div style={{display: 'grid', gap: 22, height: '100%'}}>
          <PremiumCard style={{padding: '26px 24px', minHeight: 280, opacity: between(frame, TIMING.audit.heroIn, 18)}} glow="rgba(26,163,106,0.14)" accent="rgba(85,204,152,0.3)">
            <PanelHeading eyebrow="STANLEY" title="Audit catches the leak." icon={ScanSearch} tone="green" body="One problem becomes visible before money keeps sitting." maxWidth={420} />
          </PremiumCard>
          <div style={{display: 'grid', gap: LAYOUT.audit.issueGap, alignContent: 'center', justifyItems: 'center', minHeight: 360}}>
            <PremiumCard style={{padding: '24px 24px', width: LAYOUT.audit.issueWidth, minHeight: LAYOUT.audit.issueHeight, opacity: issueOpacity(TIMING.audit.issue1In)}} accent="rgba(196,90,103,0.28)" glow="rgba(196,90,103,0.14)">
              <PanelHeading eyebrow="ISSUE" title={props.auditIssue1} icon={CircleAlert} tone="red" maxWidth={360} />
            </PremiumCard>
            <PremiumCard style={{padding: '24px 24px', width: LAYOUT.audit.issueWidth, minHeight: LAYOUT.audit.issueHeight, opacity: issueOpacity(TIMING.audit.issue2In)}} accent="rgba(196,90,103,0.28)" glow="rgba(196,90,103,0.14)">
              <PanelHeading eyebrow="ISSUE" title={props.auditIssue2} icon={Calculator} tone="red" maxWidth={360} />
            </PremiumCard>
            <PremiumCard style={{padding: '24px 24px', width: LAYOUT.audit.issueWidth, minHeight: LAYOUT.audit.issueHeight, opacity: issueOpacity(TIMING.audit.issue3In)}} accent="rgba(196,90,103,0.28)" glow="rgba(196,90,103,0.14)">
              <PanelHeading eyebrow="ISSUE" title={props.auditIssue3} icon={Wrench} tone="red" maxWidth={360} />
            </PremiumCard>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', opacity: between(frame, TIMING.audit.settleIn, 16)}}>
            <StatusChip text="One issue at a time" tone="green" />
          </div>
        </div>
      </PremiumPanel>
    </SafeStage>
  );
};

const CostScene: React.FC<{props: BillingLeakMobileProps}> = ({props}) => {
  const frame = useCurrentFrame();
  return (
    <SafeStage push={between(frame, 0, TIMING.cost.duration, 0, 0.025)} y={interpolate(frame, [0, TIMING.cost.duration], [8, -8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: softEase})}>
      <SceneTitle chip={props.costChip} headline={props.costHeadline} subhead={props.costSubhead} tone="red" frame={frame} start={TIMING.cost.titleIn} />
      <PremiumPanel fullBleed style={{position: 'absolute', left: 0, top: LAYOUT.cost.panelTop, width: LAYOUT.safeStage.width, height: LAYOUT.cost.panelHeight, padding: '34px 40px'}} glow={`rgba(196,90,103,${0.1 + pulse(frame, 42, 32, 0.08, 0.18)})`} accent="rgba(196,90,103,0.28)">
        <div style={{position: 'absolute', left: 60, right: 60, top: LAYOUT.cost.graphTop, height: LAYOUT.cost.graphHeight}}>
          <MoneyCurve active={between(frame, TIMING.cost.graphIn, 18)} />
        </div>
        <div style={{position: 'relative', zIndex: 7, display: 'grid', gap: 18, justifyItems: 'center', alignContent: 'center', height: '100%'}}>
          <div style={{display: 'flex', gap: 14, opacity: between(frame, TIMING.cost.titleIn + 10, 16)}}>
            <StatusChip text={props.costChip1} tone="green" />
            <StatusChip text={props.costChip2} tone="red" />
          </div>
          <div style={{opacity: between(frame, TIMING.cost.moneyIn, 18), transform: `translateY(${rise(frame, TIMING.cost.moneyIn, 18, 22, 0)}px)`}}>
            <CounterCard label={props.costLossLabel} value={props.costLossValue} icon={TrendingDown} tone="red" supporting="The work is done. The money is still missing." style={{width: LAYOUT.cost.moneyCardWidth, minHeight: 320}} />
          </div>
        </div>
      </PremiumPanel>
    </SafeStage>
  );
};

const RecoveryScene: React.FC<{props: BillingLeakMobileProps}> = ({props}) => {
  const frame = useCurrentFrame();
  return (
    <SafeStage push={between(frame, 0, TIMING.recovery.duration, 0, 0.026)} y={interpolate(frame, [0, TIMING.recovery.duration], [10, -10], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: softEase})}>
      <SceneTitle chip={props.recoveryChip} headline={props.recoveryHeadline} subhead={props.recoverySubhead} tone="green" frame={frame} start={TIMING.recovery.titleIn} />
      <PremiumPanel fullBleed style={{position: 'absolute', left: 0, top: LAYOUT.recovery.panelTop, width: LAYOUT.safeStage.width, height: LAYOUT.recovery.panelHeight, padding: '30px 40px'}} glow={`rgba(26,163,106,${0.1 + pulse(frame, 44, 28, 0.08, 0.18)})`}>
        <div style={{display: 'grid', gridTemplateRows: '1fr auto', gap: 20, height: '100%'}}>
          <div style={{display: 'grid', gridTemplateColumns: `${LAYOUT.recovery.stateWidth}px auto ${LAYOUT.recovery.stateWidth}px auto ${LAYOUT.recovery.stateWidth}px`, gap: 16, alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{opacity: between(frame, TIMING.recovery.leftIn, 16)}}><CounterCard label="LEFT" value={props.costChip1} icon={ClipboardCheck} tone="green" supporting="Already earned." style={{minHeight: LAYOUT.recovery.stateHeight}} /></div>
            <ArrowRightLeft size={34} color={PALETTE.indigoBright} strokeWidth={2.2} style={{opacity: between(frame, TIMING.recovery.centerIn - 8, 16)}} />
            <div style={{opacity: between(frame, TIMING.recovery.centerIn, 16)}}><CounterCard label="CENTER" value="Caught" icon={ScanSearch} tone="green" supporting="Stanley flags it." style={{minHeight: LAYOUT.recovery.stateHeight}} /></div>
            <ArrowRightLeft size={34} color={PALETTE.indigoBright} strokeWidth={2.2} style={{opacity: between(frame, TIMING.recovery.rightIn - 8, 16)}} />
            <div style={{opacity: between(frame, TIMING.recovery.rightIn, 16)}}><CounterCard label="RIGHT" value="Paid" icon={DollarSign} tone="green" supporting="Money lands cleanly." style={{minHeight: LAYOUT.recovery.stateHeight}} /></div>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: `${LAYOUT.recovery.moneyWidth}px ${LAYOUT.recovery.chipsWidth}px`, gap: 18, opacity: between(frame, TIMING.recovery.moneyIn, 18)}}>
            <CounterCard label={props.recoveryMoneyLabel} value={props.recoveryMoneyValue} icon={DollarSign} tone="green" supporting="The recovery becomes visible." />
            <PremiumCard style={{padding: '22px 20px', minHeight: 208}}>
              <div style={{display: 'grid', gap: 12}}>
                <StatusChip text={props.recoveryStep1} />
                <StatusChip text={props.recoveryStep2} tone="green" />
                <StatusChip text={props.recoveryStep3} tone="green" />
              </div>
            </PremiumCard>
          </div>
        </div>
      </PremiumPanel>
    </SafeStage>
  );
};

const CalculatorScene: React.FC<{props: BillingLeakMobileProps}> = ({props}) => {
  const frame = useCurrentFrame();
  return (
    <SafeStage push={between(frame, 0, TIMING.calculator.duration, 0, 0.022)} y={interpolate(frame, [0, TIMING.calculator.duration], [8, -8], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: softEase})}>
      <SceneTitle chip={props.calculatorChip} headline={props.calculatorHeadline} subhead={props.calculatorSubhead} frame={frame} start={TIMING.calculator.titleIn} />
      <PremiumPanel fullBleed style={{position: 'absolute', left: 0, top: LAYOUT.calculator.panelTop, width: LAYOUT.safeStage.width, height: LAYOUT.calculator.panelHeight, padding: '30px 40px 28px'}} glow="rgba(123,142,243,0.16)">
        <div style={{display: 'grid', gap: 18, height: '100%'}}>
          <div style={{display: 'grid', gridTemplateColumns: `${LAYOUT.calculator.fieldWidth}px ${LAYOUT.calculator.fieldWidth}px ${LAYOUT.calculator.fieldWidth}px`, gap: LAYOUT.calculator.fieldGap}}>
            <CounterCard label={props.calculatorField1Label} value={props.calculatorField1Value} icon={ClipboardCheck} style={{opacity: between(frame, TIMING.calculator.field1In, 16)}} />
            <CounterCard label={props.calculatorField2Label} value={props.calculatorField2Value} icon={Receipt} style={{opacity: between(frame, TIMING.calculator.field2In, 16)}} />
            <CounterCard label={props.calculatorField3Label} value={props.calculatorField3Value} icon={CircleAlert} tone="red" style={{opacity: between(frame, TIMING.calculator.field3In, 16)}} />
          </div>
          <PremiumCard style={{padding: '28px 24px', minHeight: LAYOUT.calculator.resultHeight, display: 'grid', placeItems: 'center', textAlign: 'center', opacity: between(frame, TIMING.calculator.resultIn, 18)}} accent="rgba(85,204,152,0.32)" glow="rgba(26,163,106,0.16)">
            <div style={{display: 'grid', gap: 18}}>
              <div style={{display: 'flex', justifyContent: 'center'}}><IconBadge icon={Calculator} tone="green" size={20} /></div>
              <div style={{fontSize: 22, color: PALETTE.textDim, fontWeight: 700}}>{props.calculatorResultLabel}</div>
              <div style={{fontSize: 106, lineHeight: 0.94, letterSpacing: -3.6, color: '#E7FFF2', fontWeight: 700}}>{props.calculatorResultValue}</div>
              <div style={{display: 'flex', justifyContent: 'center'}}><StatusChip text={props.calculatorCta} tone="green" /></div>
            </div>
          </PremiumCard>
        </div>
      </PremiumPanel>
    </SafeStage>
  );
};

const CloseScene: React.FC<{props: BillingLeakMobileProps}> = ({props}) => {
  const frame = useCurrentFrame();
  return (
    <SafeStage push={between(frame, 0, TIMING.close.duration, 0, 0.024)} y={interpolate(frame, [0, TIMING.close.duration], [10, -10], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: softEase})}>
      <SceneTitle chip={props.closeChip} headline={props.closeHeadline} subhead={props.closeSubhead} tone="green" frame={frame} start={TIMING.close.titleIn} />
      <PremiumPanel fullBleed style={{position: 'absolute', left: 0, top: LAYOUT.close.panelTop, width: LAYOUT.safeStage.width, height: LAYOUT.close.panelHeight, padding: '30px 40px 28px'}} glow="rgba(26,163,106,0.14)">
        <div style={{position: 'relative', height: '100%'}}>
          <div style={{position: 'absolute', left: 0, top: LAYOUT.close.sideY, width: LAYOUT.close.pathCardWidth, opacity: between(frame, TIMING.close.leftIn, 16)}}>
            <CounterCard label="LEFT" value={props.closePathLeft} icon={Wrench} supporting="Keep what you use." style={{minHeight: LAYOUT.close.pathCardHeight}} />
          </div>
          <div style={{position: 'absolute', left: 214, top: 244, width: 220, height: 100}}>
            <BeamConnector start={{x: 0, y: 50}} end={{x: 220, y: 50}} drawStart={TIMING.close.leftIn + 8} drawDuration={22} fadeStart={TIMING.close.centerIn + 8} />
          </div>
          <div style={{position: 'absolute', left: 330, top: LAYOUT.close.centerY, width: LAYOUT.close.pathCardWidth, opacity: between(frame, TIMING.close.centerIn, 16)}}>
            <CounterCard label="CENTER" value={props.closePathCenter} icon={ScanSearch} tone="green" supporting="Catch what slips." style={{minHeight: LAYOUT.close.pathCardHeight}} />
          </div>
          <div style={{position: 'absolute', left: 546, top: 244, width: 220, height: 100}}>
            <BeamConnector start={{x: 0, y: 50}} end={{x: 220, y: 50}} drawStart={TIMING.close.centerIn + 8} drawDuration={22} fadeStart={TIMING.close.rightIn + 8} tone="green" />
          </div>
          <div style={{position: 'absolute', right: 0, top: LAYOUT.close.sideY, width: LAYOUT.close.pathCardWidth, opacity: between(frame, TIMING.close.rightIn, 16)}}>
            <CounterCard label="RIGHT" value={props.closePathRight} icon={Receipt} tone="green" supporting="Money lands cleanly." style={{minHeight: LAYOUT.close.pathCardHeight}} />
          </div>
        </div>
      </PremiumPanel>
      <div style={{position: 'absolute', left: 0, top: LAYOUT.close.chipsTop, width: LAYOUT.safeStage.width, display: 'flex', justifyContent: 'center', gap: 16, opacity: between(frame, TIMING.close.chipsIn, 18)}}>
        <StatusChip text={props.closeSupport1} />
        <StatusChip text={props.closeSupport2} />
        <StatusChip text={props.closeSupport3} tone="green" />
      </div>
    </SafeStage>
  );
};

export const BillingLeakMobile: React.FC<BillingLeakMobileProps> = (inputProps) => {
  const props = billingLeakMobileSchema.parse(inputProps ?? {});
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [Math.max(DEFAULT_TOTAL_DURATION - 18, 0), DEFAULT_TOTAL_DURATION], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  let cursor = 0;
  const hookFrom = cursor; cursor += props.showHookScene ? TIMING.hook.duration : 0;
  const flowFrom = cursor; cursor += props.showFlowScene ? TIMING.flow.duration : 0;
  const basicFrom = cursor; cursor += props.showBasicScene ? TIMING.basic.duration : 0;
  const auditFrom = cursor; cursor += props.showAuditScene ? TIMING.audit.duration : 0;
  const costFrom = cursor; cursor += props.showCostScene ? TIMING.cost.duration : 0;
  const recoveryFrom = cursor; cursor += props.showRecoveryScene ? TIMING.recovery.duration : 0;
  const calculatorFrom = cursor; cursor += props.showCalculatorScene ? TIMING.calculator.duration : 0;
  const closeFrom = cursor;

  return (
    <AbsoluteFill style={{backgroundColor: PALETTE.bgTop, color: theme.textPrimary, fontFamily: 'Inter, Arial, sans-serif', opacity: fadeOut}}>
      {props.showHookScene ? <Sequence from={hookFrom} durationInFrames={TIMING.hook.duration}><HookScene props={props} /></Sequence> : null}
      {props.showFlowScene ? <Sequence from={flowFrom} durationInFrames={TIMING.flow.duration}><FlowScene props={props} /></Sequence> : null}
      {props.showBasicScene ? <Sequence from={basicFrom} durationInFrames={TIMING.basic.duration}><BasicSyncScene props={props} /></Sequence> : null}
      {props.showAuditScene ? <Sequence from={auditFrom} durationInFrames={TIMING.audit.duration}><AuditScene props={props} /></Sequence> : null}
      {props.showCostScene ? <Sequence from={costFrom} durationInFrames={TIMING.cost.duration}><CostScene props={props} /></Sequence> : null}
      {props.showRecoveryScene ? <Sequence from={recoveryFrom} durationInFrames={TIMING.recovery.duration}><RecoveryScene props={props} /></Sequence> : null}
      {props.showCalculatorScene ? <Sequence from={calculatorFrom} durationInFrames={TIMING.calculator.duration}><CalculatorScene props={props} /></Sequence> : null}
      {props.showCloseScene ? <Sequence from={closeFrom} durationInFrames={TIMING.close.duration}><CloseScene props={props} /></Sequence> : null}
    </AbsoluteFill>
  );
};

export {billingLeakMobileSchema, defaultBillingLeakMobileProps, COPY, LAYOUT, TIMING};
