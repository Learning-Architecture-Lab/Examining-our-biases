// Variation 2 — Documentary Vignettes (deep)
// Same flow, cinematic dark theme.

const V2_COLORS = {
  bg: "#141210", card: "#1e1a17", cardHi: "#2a2420",
  text: "#f0ebe3", textMute: "#a39a8e", textDim: "#6a6258",
  rule: "#3a332d", accent: "#d9a06a",
  reframe: "#8ab87a", pause: "#d97a5a", consider: "#d9a06a"
};
const V2_TAG = { reframe: 'Reframe', pause: 'Pause', consider: 'Consider' };

function V2_Photo({ caption, height = 220 }) {
  const hash = (caption || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue1 = (hash * 17) % 360, hue2 = (hash * 17 + 40) % 360;
  return (
    <div style={{ position: 'relative', width: '100%', height, background: `linear-gradient(135deg, oklch(0.28 0.04 ${hue1}) 0%, oklch(0.18 0.03 ${hue2}) 100%)`, overflow: 'hidden' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.12 }} preserveAspectRatio="none">
        <defs><pattern id={`stripe-${hash}`} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)"><rect width="4" height="8" fill="white" /></pattern></defs>
        <rect width="100%" height="100%" fill={`url(#stripe-${hash})`} />
      </svg>
      <div style={{ position: 'absolute', bottom: 14, left: 16, right: 16, fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: 1.5, textTransform: 'uppercase' }}>{caption}</div>
      <div style={{ position: 'absolute', top: 14, right: 16, fontFamily: 'ui-monospace, monospace', fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: 1 }}>[ photo · placeholder ]</div>
    </div>
  );
}

function V2_Documentary({ gradeBand = "all" }) {
  const [view, setView] = React.useState('grid');
  const [stage, setStage] = React.useState({});
  const [commitByScenario, setCommitByScenario] = React.useState({});

  if (view === 'grid') return <V2_Grid stage={stage} onPick={(i) => setView(i)} />;

  const scenario = SCENARIOS[view];
  return <V2_Scenario scenario={scenario} gradeBand={gradeBand} stageState={stage[scenario.id] || {}}
    onUpdate={(p) => setStage((st) => ({ ...st, [scenario.id]: { ...(st[scenario.id] || {}), ...p } }))}
    commitment={commitByScenario[scenario.id] || ''} onCommit={(t) => setCommitByScenario((s) => ({ ...s, [scenario.id]: t }))}
    onBack={() => setView('grid')} onPrev={view > 0 ? () => setView(view - 1) : null} onNext={view < SCENARIOS.length - 1 ? () => setView(view + 1) : null} idx={view} />;
}

function V2_Grid({ stage, onPick }) {
  const completed = Object.values(stage).filter((x) => x && x.step2 !== undefined).length;
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: V2_COLORS.bg, color: V2_COLORS.text, fontFamily: '"Inter Tight", Helvetica, system-ui, sans-serif' }}>
      <div style={{ padding: '56px 56px 40px', maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: V2_COLORS.textMute, textTransform: 'uppercase' }}>A Documentary Series for Educators</div>
          <div style={{ fontSize: 11, letterSpacing: 1.5, color: V2_COLORS.textDim, fontFamily: 'ui-monospace, monospace' }}>{String(completed).padStart(2, '0')} / 10 viewed</div>
        </div>
        <h1 style={{ fontSize: 88, lineHeight: 0.95, fontWeight: 500, letterSpacing: -3, margin: '0 0 20px', maxWidth: 980 }}>Ten conversations<br /><span style={{ color: V2_COLORS.accent, fontStyle: 'italic', fontWeight: 400 }}>we almost didn't have.</span></h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: V2_COLORS.textMute, maxWidth: 580 }}>Short case studies from elementary classrooms. Each in two scenes — what you do, then what happens next. Five-to-eight minutes each.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, maxWidth: 1180, margin: '0 auto 48px', padding: '0 56px', background: V2_COLORS.rule, border: `1px solid ${V2_COLORS.rule}` }}>
        {SCENARIOS.map((s, i) => {
          const st = stage[s.id] || {};
          const done = st.step2 !== undefined;
          return (
            <button key={s.id} onClick={() => onPick(i)} style={{ textAlign: 'left', background: V2_COLORS.card, color: V2_COLORS.text, border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = V2_COLORS.cardHi; }} onMouseLeave={(e) => { e.currentTarget.style.background = V2_COLORS.card; }}>
              <V2_Photo caption={s.category.toUpperCase()} height={180} />
              <div style={{ padding: '24px 28px 28px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                  <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: V2_COLORS.accent, letterSpacing: 1.5 }}>EP {String(i + 1).padStart(2, '0')}{s.heavier ? ' · CN' : ''}</div>
                  <div style={{ fontSize: 11, color: V2_COLORS.textDim, letterSpacing: 1 }}>{s.time.toUpperCase()}{done ? ' · VIEWED' : ''}</div>
                </div>
                <div style={{ fontSize: 26, lineHeight: 1.1, fontWeight: 500, letterSpacing: -0.7, marginBottom: 12 }}>{s.title}</div>
                <div style={{ fontSize: 13.5, color: V2_COLORS.textMute }}>{s.category}</div>
                {done && <div style={{ position: 'absolute', top: 24, right: 28, width: 8, height: 8, borderRadius: '50%', background: V2_COLORS.reframe }} />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function V2_Scenario({ scenario, gradeBand, stageState: s, onUpdate, commitment, onCommit, onBack, onPrev, onNext, idx }) {
  const setup = scenario.setup[gradeBand] || scenario.setup.all || Object.values(scenario.setup)[0];
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.scrollTop = 0; }, [idx]);

  const step1 = s.step1 !== undefined ? scenario.choices[s.step1] : null;
  const step2Key = step1 && step1.next ? step1.next : (scenario.step2 ? Object.keys(scenario.step2)[0] : null);
  const step2 = step2Key ? scenario.step2[step2Key] : null;
  const step2Choice = s.step2 !== undefined && step2 ? step2.choices[s.step2] : null;

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', overflowY: 'auto', background: V2_COLORS.bg, color: V2_COLORS.text, fontFamily: '"Inter Tight", Helvetica, system-ui, sans-serif' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: `linear-gradient(${V2_COLORS.bg} 70%, transparent)`, padding: '20px 56px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: V2_COLORS.textMute, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>← All episodes</button>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: V2_COLORS.textDim, letterSpacing: 1.5 }}>EP {String(idx + 1).padStart(2, '0')} / 10</div>
      </div>

      <div style={{ padding: '0 56px', maxWidth: 1100, margin: '0 auto' }}>
        <V2_Photo caption={`${scenario.category.toUpperCase()} · ${scenario.vignette.label.toUpperCase()}`} height={320} />
        <div style={{ fontSize: 11, letterSpacing: 2.5, color: V2_COLORS.accent, textTransform: 'uppercase', margin: '36px 0 12px' }}>{scenario.category}</div>
        <h1 style={{ fontSize: 64, lineHeight: 1, fontWeight: 500, letterSpacing: -2, margin: '0 0 36px', maxWidth: 880 }}>{scenario.title}</h1>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 56px 40px' }}>
        {/* Content note */}
        {!s.acknowledged && scenario.contentNote && (
          <div style={{ background: V2_COLORS.cardHi, border: `1px solid ${V2_COLORS.accent}`, padding: '24px 28px', margin: '0 0 32px' }}>
            <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: V2_COLORS.accent, fontWeight: 600, marginBottom: 10 }}>{scenario.contentNote.heading}</div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: V2_COLORS.text, margin: '0 0 18px' }}>{scenario.contentNote.body}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => onUpdate({ acknowledged: true })} style={{ background: V2_COLORS.accent, border: 'none', color: V2_COLORS.bg, padding: '10px 18px', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase' }}>I'm ready</button>
              <button onClick={onBack} style={{ background: 'transparent', border: `1px solid ${V2_COLORS.rule}`, color: V2_COLORS.textMute, padding: '10px 18px', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Not now</button>
            </div>
          </div>
        )}

        {s.acknowledged && (<>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: V2_COLORS.text, margin: '0 0 40px' }}>{setup}</p>

          <div style={{ background: V2_COLORS.card, borderLeft: `2px solid ${V2_COLORS.accent}`, padding: '24px 28px', margin: '0 0 44px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, color: V2_COLORS.accent }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><polygon points="3,2 12,7 3,12" /></svg>
              <span style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase' }}>{scenario.vignette.label}</span>
            </div>
            {scenario.vignette.transcript.map((line, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < scenario.vignette.transcript.length - 1 ? `1px solid ${V2_COLORS.rule}` : 'none' }}>
                <div style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', color: V2_COLORS.textDim, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>{line.who}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.5 }}>{line.line}</div>
              </div>
            ))}
          </div>

          <div style={{ margin: '0 0 20px' }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: V2_COLORS.accent, textTransform: 'uppercase', marginBottom: 12 }}>Step One · The Choice</div>
            <div style={{ fontSize: 26, lineHeight: 1.25, fontWeight: 500, letterSpacing: -0.7 }}>{scenario.prompt}</div>
          </div>

          {scenario.choices.map((c, i) => {
            const isChosen = s.step1 === i;
            const otherChosen = s.step1 !== undefined && !isChosen;
            return (
              <button key={i} onClick={() => s.step1 === undefined && onUpdate({ step1: i })} disabled={s.step1 !== undefined && !isChosen}
                style={{
                  display: 'flex', width: '100%', textAlign: 'left', padding: '18px 22px', margin: '0 0 8px',
                  background: isChosen ? V2_COLORS.cardHi : V2_COLORS.card,
                  border: `1px solid ${isChosen ? V2_COLORS[c.tag] : V2_COLORS.rule}`,
                  fontFamily: 'inherit', fontSize: 14.5, color: V2_COLORS.text,
                  cursor: s.step1 === undefined || isChosen ? 'pointer' : 'default',
                  opacity: otherChosen ? 0.35 : 1, lineHeight: 1.45, gap: 14, alignItems: 'flex-start'
                }}>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: isChosen ? V2_COLORS[c.tag] : V2_COLORS.textDim, flexShrink: 0, marginTop: 2 }}>{String.fromCharCode(65 + i)}</span>
                <span style={{ flex: 1 }}>{c.label}</span>
              </button>
            );
          })}

          {step1 && (
            <div style={{ background: V2_COLORS.card, padding: '24px 28px', margin: '24px 0', borderLeft: `3px solid ${V2_COLORS[step1.tag]}` }}>
              <div style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: V2_COLORS[step1.tag], marginBottom: 10, fontWeight: 600 }}>Director's note · {V2_TAG[step1.tag]}</div>
              <div style={{ fontSize: 14.5, lineHeight: 1.6 }}>{step1.feedback}</div>
            </div>
          )}

          {step1 && step2 && (<>
            <div style={{ borderTop: `1px solid ${V2_COLORS.rule}`, margin: '40px 0 24px', paddingTop: 28 }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: V2_COLORS.accent, textTransform: 'uppercase', marginBottom: 8 }}>{step2.label}</div>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: V2_COLORS.textMute, fontStyle: 'italic', margin: 0 }}>{step2.beat}</p>
            </div>
            <div style={{ margin: '0 0 16px' }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: V2_COLORS.accent, textTransform: 'uppercase', marginBottom: 10 }}>Step Two</div>
              <div style={{ fontSize: 22, lineHeight: 1.3, fontWeight: 500 }}>{step2.prompt}</div>
            </div>
            {step2.choices.map((c, i) => {
              const isChosen = s.step2 === i;
              const otherChosen = s.step2 !== undefined && !isChosen;
              return (
                <button key={i} onClick={() => s.step2 === undefined && onUpdate({ step2: i })} disabled={s.step2 !== undefined && !isChosen}
                  style={{
                    display: 'flex', width: '100%', textAlign: 'left', padding: '14px 18px', margin: '0 0 6px',
                    background: isChosen ? V2_COLORS.cardHi : V2_COLORS.card,
                    border: `1px solid ${isChosen ? V2_COLORS[c.tag] : V2_COLORS.rule}`,
                    fontFamily: 'inherit', fontSize: 14, color: V2_COLORS.text,
                    cursor: s.step2 === undefined || isChosen ? 'pointer' : 'default',
                    opacity: otherChosen ? 0.35 : 1, lineHeight: 1.45, gap: 12
                  }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, color: isChosen ? V2_COLORS[c.tag] : V2_COLORS.textDim, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</span>
                  <span style={{ flex: 1 }}>{c.label}</span>
                </button>
              );
            })}
            {step2Choice && (
              <div style={{ background: V2_COLORS.card, padding: '20px 24px', margin: '20px 0', borderLeft: `3px solid ${V2_COLORS[step2Choice.tag]}` }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: V2_COLORS[step2Choice.tag], textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>{V2_TAG[step2Choice.tag]}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.6 }}>{step2Choice.feedback}</div>
              </div>
            )}
          </>)}

          {step2Choice && (<>
            <div style={{ margin: '48px -56px', padding: '56px', background: V2_COLORS.cardHi, borderTop: `1px solid ${V2_COLORS.rule}`, borderBottom: `1px solid ${V2_COLORS.rule}` }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: V2_COLORS.accent, textTransform: 'uppercase', marginBottom: 16 }}>From the research</div>
              <div style={{ fontSize: 22, lineHeight: 1.4, maxWidth: 680 }}>{scenario.research.quote}</div>
              <div style={{ fontSize: 11, color: V2_COLORS.textMute, marginTop: 18, letterSpacing: 1.5, textTransform: 'uppercase' }}>— {scenario.research.cite}</div>
            </div>
            <div style={{ margin: '40px 0 0' }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: V2_COLORS.accent, textTransform: 'uppercase', marginBottom: 12 }}>The commitment</div>
              <div style={{ fontSize: 16, lineHeight: 1.5, marginBottom: 16, color: V2_COLORS.textMute }}>{scenario.commitment}</div>
              <textarea value={commitment} onChange={(e) => onCommit(e.target.value)} placeholder="In your own words." style={{ width: '100%', minHeight: 84, padding: 16, boxSizing: 'border-box', background: V2_COLORS.card, border: `1px solid ${V2_COLORS.rule}`, fontFamily: 'inherit', fontSize: 14.5, lineHeight: 1.5, color: V2_COLORS.text, resize: 'vertical', outline: 'none' }} />
              <div style={{ fontSize: 10.5, color: V2_COLORS.textDim, marginTop: 8 }}>Kept locally. Never transmitted.</div>
            </div>
            <div style={{ marginTop: 56, paddingTop: 24, borderTop: `1px solid ${V2_COLORS.rule}`, display: 'flex', justifyContent: 'space-between' }}>
              {onPrev ? <button onClick={onPrev} style={{ background: 'none', border: 'none', color: V2_COLORS.textMute, fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>← Previous</button> : <div />}
              {onNext ? <button onClick={onNext} style={{ background: V2_COLORS.accent, border: 'none', color: V2_COLORS.bg, fontFamily: 'inherit', fontSize: 13, padding: '12px 20px', cursor: 'pointer', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Next episode →</button> :
                <button onClick={onBack} style={{ background: V2_COLORS.accent, border: 'none', color: V2_COLORS.bg, fontFamily: 'inherit', fontSize: 13, padding: '12px 20px', cursor: 'pointer', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Return to series</button>}
            </div>
          </>)}
        </>)}
      </div>
      <div style={{ height: 80 }} />
    </div>
  );
}

Object.assign(window, { V2_Documentary });
