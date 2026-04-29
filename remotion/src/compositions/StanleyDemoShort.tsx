import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {noise3D} from '@remotion/noise';
import {theme} from '../theme';

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const popEase = Easing.bezier(0.2, 0.9, 0.2, 1);
const frameMs = 1000 / 30;
const staggerFrames = Math.round(80 / frameMs);
const ghostStaggerFrames = Math.round(60 / frameMs);
const checkStaggerFrames = Math.round(70 / frameMs);

const appear = (frame: number, start: number, duration: number) => interpolate(frame, [start, start + duration], [0, 1], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
const popIn = (frame: number, start: number, duration: number) => interpolate(frame, [start, start + duration], [0.82, 1], {easing: popEase, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const money = (value: number) => value.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2});

const GrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const alpha = clamp(((noise3D('stanley-grain-global', 0.2, 0.35, frame * 0.02) + 1) / 2) * 0.014 + 0.008);
  const offsetX = Math.round(noise3D('stanley-grain-x', 0.1, 0.2, frame * 0.03) * 12);
  const offsetY = Math.round(noise3D('stanley-grain-y', 0.3, 0.4, frame * 0.03) * 12);

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity: alpha,
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.88) 0 0.8px, transparent 1.2px), radial-gradient(circle at 70% 35%, rgba(255,255,255,0.7) 0 0.7px, transparent 1.1px), radial-gradient(circle at 40% 75%, rgba(255,255,255,0.74) 0 0.9px, transparent 1.3px)',
        backgroundSize: '220px 220px',
        backgroundPosition: `${offsetX}px ${offsetY}px`,
      }}
    />
  );
};

const GlowOrbs: React.FC = () => (
  <>
    <div style={{position: 'absolute', left: -80, top: 180, width: 420, height: 420, borderRadius: 999, background: 'radial-gradient(circle, rgba(96,165,250,0.22) 0%, rgba(96,165,250,0) 72%)', filter: 'blur(18px)'}} />
    <div style={{position: 'absolute', right: -60, top: 120, width: 360, height: 360, borderRadius: 999, background: 'radial-gradient(circle, rgba(129,140,248,0.24) 0%, rgba(129,140,248,0) 72%)', filter: 'blur(18px)'}} />
    <div style={{position: 'absolute', left: 220, bottom: 220, width: 300, height: 300, borderRadius: 999, background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0) 74%)', filter: 'blur(24px)'}} />
  </>
);

const GlassCard: React.FC<React.PropsWithChildren<{style?: React.CSSProperties; rimBoost?: number;}>> = ({children, style, rimBoost = 1}) => (
  <div
    style={{
      position: 'relative',
      borderRadius: 34,
      background: `linear-gradient(180deg, rgba(71, 98, 156, 0.78) 0%, rgba(29, 49, 92, 0.8) 34%, rgba(18, 28, 56, 0.88) 100%)`,
      border: `1px solid rgba(165, 180, 252, ${0.28 * rimBoost})`,
      boxShadow: `0 26px 70px rgba(2, 6, 23, 0.34), 0 0 ${38 * rimBoost}px rgba(96, 165, 250, ${0.16 * rimBoost}), inset 0 1px 0 rgba(255,255,255,0.2)`,
      overflow: 'hidden',
      backdropFilter: 'blur(18px)',
      ...style,
    }}
  >
    <div style={{position: 'absolute', left: 18, right: 18, top: 10, height: 2, borderRadius: 999, background: 'rgba(255,255,255,0.3)'}} />
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.035) 22%, rgba(255,255,255,0) 42%)'}} />
    <div style={{position: 'absolute', inset: 1, borderRadius: 33, background: 'linear-gradient(180deg, rgba(129,140,248,0.14) 0%, rgba(96,165,250,0.05) 30%, rgba(0,0,0,0) 62%)'}} />
    <div style={{position: 'relative', width: '100%', height: '100%'}}>{children}</div>
  </div>
);

const StatPill: React.FC<{text: string; tone?: 'green' | 'red' | 'indigo'; style?: React.CSSProperties}> = ({text, tone = 'green', style}) => {
  const colors = {
    green: {bg: 'rgba(16,185,129,0.18)', border: 'rgba(52,211,153,0.46)', text: '#D1FAE5', glow: 'rgba(16,185,129,0.28)'},
    red: {bg: 'rgba(239,68,68,0.18)', border: 'rgba(248,113,113,0.42)', text: '#FECACA', glow: 'rgba(239,68,68,0.22)'},
    indigo: {bg: 'rgba(99,102,241,0.18)', border: 'rgba(165,180,252,0.42)', text: '#E0E7FF', glow: 'rgba(96,165,250,0.22)'},
  }[tone];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '14px 22px',
        borderRadius: 999,
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        color: colors.text,
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: 0.4,
        boxShadow: `0 0 24px ${colors.glow}`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

const JobTile: React.FC<{index: number; checked?: boolean; dimmed?: boolean; pulse?: boolean}> = ({index, checked = false, dimmed = false, pulse = false}) => (
  <div
    style={{
      width: 104,
      height: 104,
      borderRadius: 24,
      background: checked ? 'rgba(16,185,129,0.18)' : 'rgba(255,255,255,0.06)',
      border: `1px solid ${checked ? 'rgba(52,211,153,0.58)' : 'rgba(191,219,254,0.16)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: checked ? '#ECFDF5' : '#D7E3F8',
      opacity: dimmed ? 0.34 : 1,
      boxShadow: checked ? '0 0 22px rgba(16,185,129,0.24)' : pulse ? '0 0 20px rgba(96,165,250,0.14)' : 'none',
      fontWeight: 700,
      fontSize: 24,
      transform: pulse ? 'scale(1.04)' : 'scale(1)',
    }}
  >
    {checked ? '✓' : String(index + 1).padStart(2, '0')}
  </div>
);

const PersonGlyph: React.FC<{size?: number}> = ({size = 58}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="20" r="10" fill="#EEF4FF" fillOpacity="0.95" />
    <path d="M16 54C16 43.5066 23.1634 35 32 35C40.8366 35 48 43.5066 48 54" stroke="#EEF4FF" strokeOpacity="0.95" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const InvoiceCard: React.FC<{label: string; amount: string; pill?: string; highlighted?: boolean; crossed?: string; accent?: 'green' | 'indigo';}> = ({label, amount, pill, highlighted = false, crossed, accent = 'green'}) => (
  <GlassCard rimBoost={highlighted ? 1.45 : 1.05} style={{width: 380, padding: 30, transform: `scale(${highlighted ? 1.02 : 1})`}}>
    <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
      <div style={{fontSize: 20, color: '#D7E3F8', letterSpacing: 1.3, fontWeight: 700}}>{label}</div>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap'}}>
        {crossed ? <div style={{fontSize: 28, color: theme.red, textDecoration: 'line-through', opacity: 0.85}}>{crossed}</div> : null}
        <div style={{fontSize: 52, color: theme.textPrimary, fontWeight: 700, letterSpacing: -1.3}}>{amount}</div>
      </div>
      {pill ? <StatPill text={pill} tone={accent} style={{alignSelf: 'flex-start', fontSize: 20, padding: '10px 16px'}} /> : null}
    </div>
  </GlassCard>
);

const CameraWrapper: React.FC<React.PropsWithChildren<{panY?: number; push?: number;}>> = ({children, panY = 0, push = 0}) => {
  const bgY = panY * 0.3;
  const fgY = panY;
  const fgScale = 1 + push * 0.024;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${bgY}px)`}}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #13254D 0%, #1D3770 40%, #22437C 100%)'}} />
        <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 8%, rgba(191,219,254,0.14) 0%, rgba(96,165,250,0.08) 22%, rgba(30,64,175,0) 54%)'}} />
      </div>
      <GlowOrbs />
      <div style={{position: 'absolute', inset: 0, transform: `translateY(${fgY}px) scale(${fgScale})`, transformOrigin: '50% 50%'}}>{children}</div>
      <GrainOverlay />
    </AbsoluteFill>
  );
};

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const cardOne = appear(frame, 0, 20);
  const textOne = appear(frame, staggerFrames, 14);
  const iconOne = appear(frame, staggerFrames * 2, 12);
  const accentOne = appear(frame, staggerFrames * 3, 12);
  const cardTwo = appear(frame, 46, 20);
  const textTwo = appear(frame, 46 + staggerFrames, 14);
  const accentTwo = appear(frame, 46 + staggerFrames * 3, 12);
  const scaleOne = popIn(frame, 0, 22);
  const scaleTwo = popIn(frame, 46, 22);

  return (
    <CameraWrapper>
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 50, padding: '0 110px'}}>
        <div style={{position: 'absolute', top: 500, left: '50%', transform: 'translateX(-50%)', display: 'grid', gridTemplateColumns: 'repeat(3, 88px)', gap: 18, opacity: 0.18}}>
          {Array.from({length: 9}).map((_, i) => {
            const ghost = appear(frame, 22 + i * ghostStaggerFrames, 12);
            return <div key={i} style={{width: 88, height: 88, borderRadius: 22, border: '1px solid rgba(219,234,254,0.36)', opacity: ghost}} />;
          })}
        </div>

        <GlassCard rimBoost={1.2} style={{width: 760, padding: '50px 42px', transform: `translateY(${(1 - cardOne) * 36}px) scale(${scaleOne})`, opacity: cardOne}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20}}>
            <div style={{fontSize: 58, color: theme.textPrimary, fontWeight: 700, letterSpacing: 1.5, opacity: textOne}}>10 JOBS COMPLETED</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: iconOne}}>
              <div style={{width: 30, height: 30, borderRadius: 999, background: theme.green, boxShadow: `0 0 ${18 + accentOne * 28}px rgba(16,185,129,0.52)`}} />
              <div style={{fontSize: 28, color: '#ECFDF5', fontWeight: 700, opacity: accentOne}}>✓ CLOSED OUT</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard rimBoost={1.1} style={{width: 660, padding: '40px 42px', transform: `translateY(${64 - cardTwo * 64}px) scale(${scaleTwo})`, opacity: cardTwo}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
            <div style={{fontSize: 54, color: theme.textPrimary, fontWeight: 700, letterSpacing: 1.1, opacity: textTwo}}>1 INVOICED</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: accentTwo}}>
              <div style={{width: 24, height: 24, borderRadius: 999, background: theme.red, boxShadow: '0 0 18px rgba(239,68,68,0.6)'}} />
              <div style={{fontSize: 26, color: '#FEE2E2', fontWeight: 700}}>9 MISSING</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </CameraWrapper>
  );
};

const ManualRunner: React.FC<{frame: number; delay?: number}> = ({frame, delay = 0}) => {
  const localFrame = Math.max(0, frame - delay);
  const x = localFrame < 110
    ? interpolate(localFrame, [0, 110], [-170, 0], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : interpolate(localFrame, [110, 240], [0, 230], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = localFrame >= 120 && localFrame <= 220 ? Math.sin(((localFrame - 120) / 100) * Math.PI) * 18 : 0;
  const opacity = localFrame < 12 ? localFrame / 12 : localFrame > 250 ? Math.max(0, 1 - (localFrame - 250) / 24) : 1;
  const scale = localFrame < 28 ? interpolate(localFrame, [0, 28], [0.88, 1], {easing: popEase, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;

  return (
    <div style={{position: 'absolute', left: 420 + x, top: 470 + y, width: 110, height: 110, borderRadius: 999, background: 'linear-gradient(180deg, rgba(147,197,253,0.3) 0%, rgba(99,102,241,0.12) 100%)', border: '1px solid rgba(191,219,254,0.34)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 28px rgba(96,165,250,0.26)', opacity, transform: `scale(${scale})`}}>
      <PersonGlyph size={58} />
    </div>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const pan = interpolate(frame, [0, 360], [0, -84], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const leftEnter = appear(frame, 0, 22);
  const rightEnter = appear(frame, 18, 22);
  const centerEnter = appear(frame, 34, 18);
  const freeze = frame >= 240;
  const mondayToFriday = frame < 240 ? 'MONDAY' : 'FRIDAY';
  const leftScale = popIn(frame, 0, 22);
  const rightScale = popIn(frame, 18, 22);

  return (
    <CameraWrapper panY={pan / 100}>
      <div style={{position: 'absolute', inset: 0, padding: '160px 64px 0'}}>
        <div style={{position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)'}}><StatPill text={mondayToFriday} tone="indigo" /></div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <GlassCard style={{width: 402, padding: 28, transform: `translateX(${(1 - leftEnter) * -70}px) scale(${leftScale})`, opacity: leftEnter}}>
            <div style={{fontSize: 28, color: '#D7E3F8', fontWeight: 700, letterSpacing: 1.3, marginBottom: 24, textAlign: 'center'}}>HOUSECALL PRO</div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, justifyItems: 'center'}}>
              {Array.from({length: 10}).map((_, i) => <JobTile key={i} index={i} dimmed={freeze && i >= 2} pulse={!freeze && i < 2 && frame > 80 + i * 12 && frame < 122 + i * 12} />)}
            </div>
          </GlassCard>

          <GlassCard style={{width: 402, padding: 28, transform: `translateX(${(1 - rightEnter) * 70}px) scale(${rightScale})`, opacity: rightEnter}}>
            <div style={{fontSize: 28, color: '#D7E3F8', fontWeight: 700, letterSpacing: 1.3, marginBottom: 24, textAlign: 'center'}}>QUICKBOOKS</div>
            <div style={{height: 720, borderRadius: 24, border: '1px dashed rgba(191,219,254,0.24)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D7E3F8', fontSize: 24, textAlign: 'center', padding: '0 30px'}}>Waiting on invoice data</div>
          </GlassCard>
        </div>

        <div style={{position: 'absolute', left: '50%', top: 522, transform: 'translateX(-50%)', width: 214, height: 6, borderRadius: 999, background: 'linear-gradient(90deg, rgba(96,165,250,0.18) 0%, rgba(129,140,248,0.7) 50%, rgba(96,165,250,0.18) 100%)', boxShadow: '0 0 20px rgba(96,165,250,0.18)'}} />

        <div style={{opacity: centerEnter}}>
          {freeze ? (
            <div style={{position: 'absolute', left: '50%', top: 468, transform: 'translateX(-50%)', width: 112, height: 112, borderRadius: 999, background: 'linear-gradient(180deg, rgba(147,197,253,0.3) 0%, rgba(99,102,241,0.12) 100%)', border: '1px solid rgba(191,219,254,0.34)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 28px rgba(96,165,250,0.26)'}}><PersonGlyph size={58} /></div>
          ) : (
            <>
              <ManualRunner frame={frame} />
              <ManualRunner frame={frame} delay={70} />
            </>
          )}
        </div>

        {freeze ? (
          <div style={{position: 'absolute', left: '50%', top: 340, transform: 'translateX(-50%)', display: 'flex', gap: 12}}>
            <StatPill text="MISSED" tone="red" />
            <StatPill text="WRONG AMOUNT" tone="red" />
          </div>
        ) : null}
      </div>
    </CameraWrapper>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const checks = Array.from({length: 10}).map((_, i) => appear(frame, 58 + i * checkStaggerFrames, 12));
  const scan = interpolate(frame, [42, 68], [0, 1], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const amountOne = interpolate(frame, [210, 248], [0, 2901.31], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const amountTwo = interpolate(frame, [360, 404], [2950, 2874.75], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const scanLabel = frame < 120 ? 'SCANNING... 3/10' : frame < 190 ? 'SCANNING... 7/10' : frame < 250 ? '10/10 ✓' : 'COMPLETE • 12s';
  const qbPulse = frame >= 210 && frame <= 264 ? 1 + Math.sin(((frame - 210) / 54) * Math.PI) * 0.018 : 1;

  return (
    <CameraWrapper>
      <div style={{position: 'absolute', inset: 0, padding: '132px 56px 0'}}>
        <div style={{position: 'absolute', top: 56, left: '50%', transform: 'translateX(-50%)'}}><StatPill text={scanLabel} tone="indigo" /></div>

        <div style={{display: 'grid', gridTemplateColumns: '408px 168px 380px', justifyContent: 'center', alignItems: 'center', columnGap: 34}}>
          <GlassCard style={{width: 408, padding: 30, transform: `scale(${popIn(frame, 0, 22)})`, opacity: appear(frame, 0, 18)}}>
            <div style={{fontSize: 28, color: '#D7E3F8', fontWeight: 700, letterSpacing: 1.3, marginBottom: 24, textAlign: 'center'}}>COMPLETED JOBS</div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, position: 'relative', justifyItems: 'center'}}>
              {Array.from({length: 10}).map((_, i) => (
                <div key={i} style={{position: 'relative'}}>
                  <JobTile index={i} checked={checks[i] > 0.9} pulse={checks[i] > 0 && checks[i] < 0.9} />
                  {checks[i] > 0 ? <div style={{position: 'absolute', inset: 0, borderRadius: 24, background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0) 70%)', opacity: checks[i]}} /> : null}
                </div>
              ))}
              <div style={{position: 'absolute', left: scan * 220, top: -10, width: 94, height: 650, background: 'linear-gradient(180deg, rgba(96,165,250,0) 0%, rgba(191,219,254,0.6) 42%, rgba(96,165,250,0) 100%)', opacity: frame >= 42 && frame <= 80 ? 0.95 : 0}} />
            </div>
          </GlassCard>

          <div style={{position: 'relative', width: 168, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{position: 'absolute', left: 0, right: 0, top: 118, height: 6, borderRadius: 999, background: 'linear-gradient(90deg, rgba(96,165,250,0.18) 0%, rgba(129,140,248,0.78) 50%, rgba(96,165,250,0.18) 100%)', boxShadow: '0 0 18px rgba(96,165,250,0.2)'}} />
            <GlassCard rimBoost={1.25} style={{width: 168, height: 82, padding: '18px 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${popIn(frame, 32, 18)})`, opacity: appear(frame, 32, 16)}}>
              <div style={{fontSize: 22, color: theme.textPrimary, letterSpacing: 2, fontWeight: 700, textAlign: 'center'}}>STANLEY AUDIT</div>
            </GlassCard>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 24, transform: `scale(${qbPulse})`, alignItems: 'center'}}>
            <InvoiceCard label="BLUE HILLS" amount={money(amountOne)} pill={frame >= 230 ? 'RECOVERED' : undefined} highlighted={frame >= 210} accent="green" />
            <InvoiceCard label="MERRIMACK VALLEY" amount={money(amountTwo)} crossed={frame >= 350 ? '$2,950.00' : undefined} pill={frame >= 390 ? 'CORRECTED' : undefined} highlighted={frame >= 350} accent="indigo" />
          </div>
        </div>
      </div>
    </CameraWrapper>
  );
};

const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, 200], [0, 1], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const count = frame < 140 ? interpolate(frame, [0, 120], [0, 5000], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 5000;
  const rangeOpacity = appear(frame, 138, 18);
  const headlinePop = popIn(frame, 0, 24);
  const gapWidth = interpolate(frame, [80, 220], [0.8, 0.32], {easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <CameraWrapper push={push}>
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(59,130,246,0.08) 0%, rgba(29,78,216,0.04) 100%)'}} />
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 38, padding: '0 70px'}}>
        <GlassCard rimBoost={1.35} style={{width: 860, padding: '60px 48px', transform: `scale(${headlinePop})`, opacity: appear(frame, 0, 22)}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
            <div style={{fontSize: 116, fontWeight: 700, color: theme.textPrimary, letterSpacing: -3}}>{frame < 140 ? `$${Math.round(count).toLocaleString()}` : '$5,000'}</div>
            <div style={{fontSize: 56, fontWeight: 700, color: theme.textPrimary, opacity: rangeOpacity}}>$5,000 - $20,000</div>
            <div style={{fontSize: 30, letterSpacing: 1.2, color: '#D7E3F8', fontWeight: 700}}>REVENUE RECOVERED PER YEAR</div>
          </div>
        </GlassCard>

        <GlassCard style={{width: 860, padding: '44px 42px', transform: `scale(${popIn(frame, 52, 20)})`, opacity: appear(frame, 52, 18)}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 28}}>
            <div style={{fontSize: 38, fontWeight: 700, color: theme.textPrimary, textAlign: 'center'}}>FASTER CASH FLOW</div>
            <div style={{position: 'relative', height: 104}}>
              <div style={{position: 'absolute', left: 70, right: 70, top: 50, height: 10, borderRadius: 999, background: 'rgba(191,219,254,0.16)'}} />
              <div style={{position: 'absolute', left: 70, top: 50, width: `${gapWidth * 100}%`, maxWidth: 720, height: 10, borderRadius: 999, background: 'linear-gradient(90deg, rgba(96,165,250,0.9) 0%, rgba(16,185,129,0.92) 100%)', boxShadow: '0 0 22px rgba(16,185,129,0.26)'}} />
              <div style={{position: 'absolute', left: 46, top: 18, color: '#D7E3F8', fontWeight: 700, fontSize: 22}}>JOB COMPLETE</div>
              <div style={{position: 'absolute', right: 46, top: 18, color: '#D7E3F8', fontWeight: 700, fontSize: 22}}>PAID</div>
              <div style={{position: 'absolute', left: 62, top: 38, width: 24, height: 24, borderRadius: 999, background: theme.textPrimary}} />
              <div style={{position: 'absolute', left: `calc(${gapWidth * 100}% + 54px)`, top: 38, width: 24, height: 24, borderRadius: 999, background: theme.green, boxShadow: '0 0 18px rgba(16,185,129,0.38)'}} />
            </div>
          </div>
        </GlassCard>
      </div>
    </CameraWrapper>
  );
};

const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const wordmark = appear(frame, 0, 22);
  const url = appear(frame, staggerFrames, 18);
  const pill = appear(frame, staggerFrames * 2, 18);
  const arrow = appear(frame, staggerFrames * 3, 16);
  const pulse = frame >= 12 && frame <= 58 ? 1 + Math.sin(((frame - 12) / 46) * Math.PI) * 0.035 : 1;

  return (
    <CameraWrapper>
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(37,99,235,0.08) 0%, rgba(29,78,216,0.14) 100%)'}} />
      <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '0 80px'}}>
        <div style={{fontSize: 78, fontWeight: 700, color: theme.textPrimary, transform: `scale(${0.94 + wordmark * 0.06}) translateY(${(1 - wordmark) * 18}px)`, opacity: wordmark}}>Stanley Systems</div>
        <div style={{fontSize: 44, fontWeight: 500, color: '#D7E3F8', opacity: url}}>stanley-systems.com</div>
        <GlassCard rimBoost={1.3} style={{padding: '22px 34px', transform: `scale(${pulse * Math.max(pill, 0.01)})`, opacity: pill}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{fontSize: 30, color: theme.textPrimary, fontWeight: 700}}>FREE CALCULATOR</div>
            <div style={{fontSize: 30, color: theme.green, opacity: arrow}}>→</div>
          </div>
        </GlassCard>
      </div>
    </CameraWrapper>
  );
};

export const StanleyDemoShortVertical: React.FC = () => {
  const {durationInFrames} = useVideoConfig();
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [durationInFrames - 24, durationInFrames], [1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#13254D', color: theme.textPrimary, fontFamily: 'DM Sans, Inter, Arial, sans-serif', opacity: fadeOut}}>
      <Sequence from={0} durationInFrames={240}><Scene1 /></Sequence>
      <Sequence from={240} durationInFrames={360}><Scene2 /></Sequence>
      <Sequence from={600} durationInFrames={660}><Scene3 /></Sequence>
      <Sequence from={1260} durationInFrames={420}><Scene4 /></Sequence>
      <Sequence from={1680} durationInFrames={420}><Scene5 /></Sequence>
    </AbsoluteFill>
  );
};
