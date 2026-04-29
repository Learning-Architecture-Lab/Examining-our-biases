// Variation 1 — Editorial Reflection (deep version)
// Flow: Content note → Setup + Vignette → Step 1 prompt + choices →
// Step 1 feedback → Step 2 beat + prompt + choices → Step 2 feedback →
// Research → Commitment.

const V1_COLORS = {
  paper: "#f3ede0", paperDeep: "#eae0cd", ink: "#2a2420",
  inkSoft: "#5a4f44", inkMute: "#8a7d6c", rule: "#c9bca4",
  accent: "#8a3f2a", reframe: "#4a6b4a", pause: "#a85a3e", consider: "#8a6a3a"
};

const TAG_LABEL = { reframe: 'A Reframe', pause: 'A Pause', consider: 'A Consideration' };

function V1_Editorial({ gradeBand = "all" }) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [stage, setStage] = React.useState({}); // scenarioId -> {acknowledged, step1, step2}
  const [commitByScenario, setCommitByScenario] = React.useState({});
  const [stepAway, setStepAway] = React.useState(false);
  const scrollRef = React.useRef(null);

  const scenario = SCENARIOS[activeIdx];
  const s = stage[scenario.id] || {};
  const setup = scenario.setup[gradeBand] || scenario.setup.all || Object.values(scenario.setup)[0];

  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [activeIdx]);

  const update = (patch) => setStage((st) => ({ ...st, [scenario.id]: { ...(st[scenario.id] || {}), ...patch } }));

  if (stepAway) return <V1_StepAway onReturn={() => setStepAway(false)} />;

  const completed = Object.values(stage).filter((x) => x && x.step2 !== undefined).length;
  const progress = completed / SCENARIOS.length;

  const step1 = s.step1 !== undefined ? scenario.choices[s.step1] : null;
  const step2Key = step1 && step1.next ? step1.next : (scenario.step2 ? Object.keys(scenario.step2)[0] : null);
  const step2 = step2Key ? scenario.step2[step2Key] : null;
  const step2Choice = s.step2 !== undefined && step2 ? step2.choices[s.step2] : null;

  return (
    <div style={{
      display: 'flex', width: '100%', height: '100%',
      fontFamily: '"Source Serif 4", "Source Serif Pro", "Iowan Old Style", Georgia, serif',
      background: V1_COLORS.paper, color: V1_COLORS.ink, fontSize: 15
    }}>
      <aside style={{ width: 280, flexShrink: 0, borderRight: `1px solid ${V1_COLORS.rule}`, background: V1_COLORS.paperDeep, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '28px 28px 18px' }}>
          <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: V1_COLORS.inkMute, marginBottom: 10 }}>A Training Series</div>
          <div style={{ fontSize: 22, lineHeight: 1.15, fontWeight: 500, letterSpacing: -0.3 }}>The Mirror<br /><em style={{ fontWeight: 400, color: V1_COLORS.accent }}>& the Mirror</em></div>
          <div style={{ fontSize: 12.5, lineHeight: 1.5, color: V1_COLORS.inkSoft, marginTop: 12, fontStyle: 'italic' }}>Ten short studies in bias, conversation, and the elementary classroom.</div>
        </div>
        <div style={{ padding: '0 28px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: V1_COLORS.inkMute, marginBottom: 6, letterSpacing: 0.5 }}>
            <span>Progress</span><span>{completed} of {SCENARIOS.length}</span>
          </div>
          <div style={{ height: 2, background: V1_COLORS.rule, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${progress * 100}%`, background: V1_COLORS.accent, transition: 'width .3s' }} />
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0 24px' }}>
          {SCENARIOS.map((sc, i) => {
            const done = stage[sc.id] && stage[sc.id].step2 !== undefined;
            const started = stage[sc.id] && stage[sc.id].acknowledged;
            const active = i === activeIdx;
            return (
              <button key={sc.id} onClick={() => setActiveIdx(i)} style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '12px 28px',
                border: 'none', background: active ? V1_COLORS.paper : 'transparent',
                borderLeft: active ? `2px solid ${V1_COLORS.accent}` : '2px solid transparent',
                cursor: 'pointer', fontFamily: 'inherit', color: 'inherit'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ fontFamily: 'ui-monospace, "SF Mono", monospace', fontSize: 10.5, color: V1_COLORS.inkMute, fontVariantNumeric: 'tabular-nums' }}>
                    {done ? '●' : started ? '◐' : '○'} {String(i + 1).padStart(2, '0')}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, lineHeight: 1.25, fontWeight: active ? 600 : 500 }}>{sc.title}{sc.heavier && <span style={{ color: V1_COLORS.accent, marginLeft: 4 }}>·</span>}</div>
                    <div style={{ fontSize: 10.5, color: V1_COLORS.inkMute, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.8 }}>{sc.category} · {sc.time}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div style={{ padding: '14px 28px', borderTop: `1px solid ${V1_COLORS.rule}` }}>
          <button onClick={() => setStepAway(true)} style={{ background: 'none', border: `1px solid ${V1_COLORS.rule}`, color: V1_COLORS.inkSoft, padding: '6px 10px', fontSize: 11, fontFamily: 'inherit', cursor: 'pointer', width: '100%', letterSpacing: 0.4 }}>Step away for a minute</button>
        </div>
      </aside>

      <main ref={scrollRef} style={{ flex: 1, overflowY: 'auto' }}>
        <article style={{ maxWidth: 660, margin: '0 auto', padding: '56px 56px 120px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: V1_COLORS.inkMute, paddingBottom: 18, borderBottom: `1px solid ${V1_COLORS.rule}`, marginBottom: 32 }}>
            <span>No. {String(activeIdx + 1).padStart(2, '0')} · {scenario.category}</span>
            <span>{scenario.time}{scenario.heavier ? ' · heavier' : ''}</span>
          </div>

          <h1 style={{ fontSize: 42, lineHeight: 1.05, fontWeight: 500, letterSpacing: -1, margin: '0 0 8px', fontStyle: 'italic' }}>{scenario.title}</h1>
          <div style={{ fontSize: 13, color: V1_COLORS.inkMute, fontStyle: 'italic', marginBottom: 36 }}>A scenario, a choice, a consequence, a choice again.</div>

          {/* Content note gate */}
          {!s.acknowledged && scenario.contentNote && (
            <div style={{ margin: '24px 0', padding: '24px 28px', border: `2px solid ${V1_COLORS.accent}`, background: '#fffaf0' }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: V1_COLORS.accent, fontWeight: 600, marginBottom: 8 }}>{scenario.contentNote.heading}</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: '0 0 16px' }}>{scenario.contentNote.body}</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => update({ acknowledged: true })} style={{ border: `1px solid ${V1_COLORS.accent}`, background: V1_COLORS.accent, color: '#fffaf0', padding: '8px 14px', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer', letterSpacing: 0.5 }}>I'm ready — begin</button>
                <button onClick={() => setStepAway(true)} style={{ border: `1px solid ${V1_COLORS.rule}`, background: 'transparent', color: V1_COLORS.inkSoft, padding: '8px 14px', fontFamily: 'inherit', fontSize: 13, cursor: 'pointer' }}>Not right now</button>
              </div>
            </div>
          )}

          {s.acknowledged && (<>
            {/* Setup */}
            <p style={{ fontSize: 18, lineHeight: 1.55, margin: 0 }}>
              <span style={{ float: 'left', fontSize: 56, lineHeight: 0.9, fontWeight: 600, paddingRight: 10, paddingTop: 6, color: V1_COLORS.accent }}>{setup.charAt(0)}</span>
              {setup.slice(1)}
            </p>

            {/* Vignette */}
            <div style={{ margin: '40px 0', padding: '24px 28px', background: '#fffaf0', border: `1px solid ${V1_COLORS.rule}` }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: V1_COLORS.inkMute, marginBottom: 4 }}>▶  {scenario.vignette.label}</div>
              <div style={{ fontSize: 10, color: V1_COLORS.inkMute, fontStyle: 'italic', marginBottom: 14 }}>[ audio placeholder — transcript below ]</div>
              {scenario.vignette.transcript.map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '6px 0', alignItems: 'baseline' }}>
                  <div style={{ flexShrink: 0, width: 100, fontSize: 10.5, color: V1_COLORS.inkMute, textTransform: 'uppercase', letterSpacing: 1, fontFamily: 'ui-monospace, monospace' }}>{line.who}</div>
                  <div style={{ flex: 1, fontSize: 14.5, lineHeight: 1.45, fontStyle: 'italic' }}>{line.line}</div>
                </div>
              ))}
            </div>

            {/* Step 1 prompt */}
            <div style={{ margin: '40px 0 18px' }}>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: V1_COLORS.accent, marginBottom: 10 }}>Step One · The Question</div>
              <div style={{ fontSize: 22, lineHeight: 1.3, fontWeight: 500 }}>{scenario.prompt}</div>
            </div>

            {scenario.choices.map((c, i) => {
              const isChosen = s.step1 === i;
              const otherChosen = s.step1 !== undefined && !isChosen;
              return (
                <button key={i} onClick={() => s.step1 === undefined && update({ step1: i })} disabled={s.step1 !== undefined && !isChosen}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left', padding: '16px 20px', margin: '0 0 10px 0',
                    background: isChosen ? '#fffaf0' : 'transparent',
                    border: `1px solid ${isChosen ? V1_COLORS[c.tag] : V1_COLORS.rule}`,
                    borderLeft: `3px solid ${isChosen ? V1_COLORS[c.tag] : V1_COLORS.rule}`,
                    fontFamily: 'inherit', fontSize: 15, color: V1_COLORS.ink,
                    cursor: s.step1 === undefined || isChosen ? 'pointer' : 'default',
                    opacity: otherChosen ? 0.4 : 1, lineHeight: 1.45, transition: 'all .2s'
                  }}>
                  <span style={{ color: V1_COLORS.inkMute, fontSize: 12, fontFamily: 'ui-monospace, monospace', marginRight: 10 }}>{String.fromCharCode(65 + i)}.</span>
                  {c.label}
                </button>
              );
            })}

            {step1 && (
              <div style={{ margin: '28px 0', padding: '20px 24px', background: V1_COLORS.paperDeep, borderLeft: `3px solid ${V1_COLORS[step1.tag]}` }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: V1_COLORS[step1.tag], marginBottom: 10, fontWeight: 600 }}>{TAG_LABEL[step1.tag]}</div>
                <div style={{ fontSize: 15, lineHeight: 1.55 }}>{step1.feedback}</div>
              </div>
            )}

            {/* Step 2 */}
            {step1 && step2 && (
              <>
                <div style={{ margin: '44px 0 16px', borderTop: `1px solid ${V1_COLORS.rule}`, paddingTop: 28 }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: V1_COLORS.accent, marginBottom: 8 }}>{step2.label}</div>
                  <p style={{ fontSize: 16.5, lineHeight: 1.6, fontStyle: 'italic', margin: 0, color: V1_COLORS.inkSoft }}>{step2.beat}</p>
                </div>
                <div style={{ margin: '24px 0 14px' }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: V1_COLORS.accent, marginBottom: 10 }}>Step Two · The Question</div>
                  <div style={{ fontSize: 20, lineHeight: 1.3, fontWeight: 500 }}>{step2.prompt}</div>
                </div>
                {step2.choices.map((c, i) => {
                  const isChosen = s.step2 === i;
                  const otherChosen = s.step2 !== undefined && !isChosen;
                  return (
                    <button key={i} onClick={() => s.step2 === undefined && update({ step2: i })} disabled={s.step2 !== undefined && !isChosen}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left', padding: '14px 18px', margin: '0 0 8px',
                        background: isChosen ? '#fffaf0' : 'transparent',
                        border: `1px solid ${isChosen ? V1_COLORS[c.tag] : V1_COLORS.rule}`,
                        borderLeft: `3px solid ${isChosen ? V1_COLORS[c.tag] : V1_COLORS.rule}`,
                        fontFamily: 'inherit', fontSize: 14.5, color: V1_COLORS.ink,
                        cursor: s.step2 === undefined || isChosen ? 'pointer' : 'default',
                        opacity: otherChosen ? 0.4 : 1, lineHeight: 1.45
                      }}>
                      <span style={{ color: V1_COLORS.inkMute, fontSize: 11, fontFamily: 'ui-monospace, monospace', marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>
                      {c.label}
                    </button>
                  );
                })}
                {step2Choice && (
                  <div style={{ margin: '24px 0', padding: '20px 24px', background: V1_COLORS.paperDeep, borderLeft: `3px solid ${V1_COLORS[step2Choice.tag]}` }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: V1_COLORS[step2Choice.tag], marginBottom: 10, fontWeight: 600 }}>{TAG_LABEL[step2Choice.tag]}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.55 }}>{step2Choice.feedback}</div>
                  </div>
                )}
              </>
            )}

            {/* Research + commitment */}
            {step2Choice && (
              <>
                <figure style={{ margin: '52px 0', textAlign: 'center', padding: '0 20px' }}>
                  <blockquote style={{ margin: 0, fontSize: 19, lineHeight: 1.4, fontStyle: 'italic', letterSpacing: -0.2 }}>
                    <span style={{ color: V1_COLORS.accent, fontSize: 32, lineHeight: 0, verticalAlign: '-0.2em', marginRight: 4 }}>"</span>
                    {scenario.research.quote}
                    <span style={{ color: V1_COLORS.accent, fontSize: 32, lineHeight: 0, verticalAlign: '-0.4em', marginLeft: 4 }}>"</span>
                  </blockquote>
                  <figcaption style={{ marginTop: 14, fontSize: 11.5, letterSpacing: 1.5, textTransform: 'uppercase', color: V1_COLORS.inkMute }}>— {scenario.research.cite}</figcaption>
                </figure>
                <div style={{ margin: '44px 0 0', padding: '28px 0 0', borderTop: `1px solid ${V1_COLORS.rule}` }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: V1_COLORS.accent, marginBottom: 14 }}>Finish the sentence</div>
                  <div style={{ fontSize: 16, lineHeight: 1.5, marginBottom: 16, fontStyle: 'italic' }}>{scenario.commitment}</div>
                  <textarea value={commitByScenario[scenario.id] || ''} onChange={(e) => setCommitByScenario((st) => ({ ...st, [scenario.id]: e.target.value }))}
                    placeholder="Write it in your own words. Nothing leaves this page."
                    style={{ width: '100%', minHeight: 90, padding: 14, boxSizing: 'border-box', background: '#fffaf0', border: `1px solid ${V1_COLORS.rule}`, fontFamily: 'inherit', fontSize: 15, lineHeight: 1.5, resize: 'vertical', outline: 'none' }} />
                  <div style={{ fontSize: 10.5, color: V1_COLORS.inkMute, marginTop: 6, fontStyle: 'italic' }}>Stored in your browser only. Not shared, not uploaded.</div>
                </div>
                <div style={{ marginTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button disabled={activeIdx === 0} onClick={() => setActiveIdx(activeIdx - 1)} style={{ border: 'none', background: 'transparent', color: V1_COLORS.inkSoft, fontFamily: 'inherit', fontSize: 13, cursor: activeIdx === 0 ? 'default' : 'pointer', opacity: activeIdx === 0 ? 0.3 : 1 }}>← Previous study</button>
                  <button disabled={activeIdx === SCENARIOS.length - 1} onClick={() => setActiveIdx(activeIdx + 1)} style={{ border: `1px solid ${V1_COLORS.accent}`, background: V1_COLORS.accent, color: '#fffaf0', fontFamily: 'inherit', fontSize: 13, padding: '10px 18px', cursor: activeIdx === SCENARIOS.length - 1 ? 'default' : 'pointer', opacity: activeIdx === SCENARIOS.length - 1 ? 0.3 : 1, letterSpacing: 0.8 }}>Next study  →</button>
                </div>
              </>
            )}
          </>)}
        </article>
      </main>
    </div>
  );
}

function V1_StepAway({ onReturn }) {
  const [breath, setBreath] = React.useState(0);
  React.useEffect(() => { const id = setInterval(() => setBreath((b) => (b + 1) % 2), 4000); return () => clearInterval(id); }, []);
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: V1_COLORS.paper, fontFamily: '"Source Serif 4", Georgia, serif', padding: 40, textAlign: 'center' }}>
      <div style={{ width: 100, height: 100, borderRadius: '50%', background: V1_COLORS.accent, opacity: 0.15, transform: breath ? 'scale(1.3)' : 'scale(1)', transition: 'transform 4s ease-in-out', marginBottom: 32 }} />
      <div style={{ fontSize: 28, fontStyle: 'italic', fontWeight: 500, marginBottom: 14 }}>Take your time.</div>
      <div style={{ fontSize: 14.5, lineHeight: 1.6, maxWidth: 380, color: V1_COLORS.inkSoft, marginBottom: 32 }}>This work asks you to see yourself clearly. Clear seeing takes breath. There's no timer, no score, and no one waiting on the other side.</div>
      <button onClick={onReturn} style={{ border: `1px solid ${V1_COLORS.accent}`, background: 'transparent', color: V1_COLORS.accent, padding: '10px 22px', fontSize: 13, fontFamily: 'inherit', letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer' }}>When you're ready</button>
    </div>
  );
}

Object.assign(window, { V1_Editorial });
