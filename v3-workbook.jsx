// Variation 3 — Workbook / Zine (deep)

const V3_COLORS = {
  paper: "#fbf6ea", paperEdge: "#f0e8d2", ink: "#1f1a14",
  inkMute: "#5a4e3a", inkFaint: "#8a7d66",
  marker: "#c8412a", markerBlue: "#2a5a8a", markerGreen: "#4a7a4a",
  highlightYellow: "#fde68a", highlightPink: "#fcb8c9"
};
const handScript = '"Caveat", "Kalam", "Marker Felt", cursive';
const bodyFace = '"Libre Caslon Text", "Iowan Old Style", Georgia, serif';

function V3_Workbook({ gradeBand = "all" }) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [stage, setStage] = React.useState({});
  const [commitByScenario, setCommitByScenario] = React.useState({});
  const scrollRef = React.useRef(null);
  const scenario = SCENARIOS[activeIdx];
  const s = stage[scenario.id] || {};
  const setup = scenario.setup[gradeBand] || scenario.setup.all || Object.values(scenario.setup)[0];

  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [activeIdx]);

  const update = (p) => setStage((st) => ({ ...st, [scenario.id]: { ...(st[scenario.id] || {}), ...p } }));
  const step1 = s.step1 !== undefined ? scenario.choices[s.step1] : null;
  const step2Key = step1 && step1.next ? step1.next : (scenario.step2 ? Object.keys(scenario.step2)[0] : null);
  const step2 = step2Key ? scenario.step2[step2Key] : null;
  const step2Choice = s.step2 !== undefined && step2 ? step2.choices[s.step2] : null;

  const tagColor = (t) => t === 'reframe' ? V3_COLORS.markerGreen : t === 'pause' ? V3_COLORS.marker : V3_COLORS.markerBlue;
  const tagText = (t) => t === 'reframe' ? 'a reframe' : t === 'pause' ? 'worth a pause' : 'consider this';

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: V3_COLORS.paper, color: V3_COLORS.ink, fontFamily: bodyFace, position: 'relative' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.18, zIndex: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2' seed='3'/><feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.1  0 0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")` }} />

      <div style={{ padding: '22px 40px 14px', position: 'relative', zIndex: 1, background: V3_COLORS.paperEdge, borderBottom: `1px dashed ${V3_COLORS.inkFaint}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 2, color: V3_COLORS.inkMute, textTransform: 'uppercase', marginBottom: 2 }}>Property of ________________</div>
          <div style={{ fontSize: 26, fontFamily: handScript, fontWeight: 700, lineHeight: 1 }}><span style={{ color: V3_COLORS.marker }}>Bias</span> on the Page</div>
          <div style={{ fontSize: 13, fontFamily: handScript, color: V3_COLORS.inkMute, marginTop: 2 }}>a working notebook · K-5 edition</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12, fontFamily: handScript, color: V3_COLORS.inkMute }}>
          <div>Entry {String(activeIdx + 1).padStart(2, '0')} of 10</div>
          <div style={{ fontSize: 11, marginTop: 2 }}>~ {scenario.time} ~{scenario.heavier ? ' · cn' : ''}</div>
        </div>
      </div>

      <div style={{ display: 'flex', padding: '0 40px', background: V3_COLORS.paperEdge, borderBottom: `1px solid ${V3_COLORS.inkFaint}`, position: 'relative', zIndex: 1, overflowX: 'auto', flexShrink: 0 }}>
        {SCENARIOS.map((sc, i) => {
          const done = stage[sc.id] && stage[sc.id].step2 !== undefined;
          const active = i === activeIdx;
          return (
            <button key={sc.id} onClick={() => setActiveIdx(i)} style={{
              background: active ? V3_COLORS.paper : 'transparent', border: 'none',
              borderTop: active ? `2px solid ${V3_COLORS.marker}` : '2px solid transparent',
              padding: '8px 12px', cursor: 'pointer', fontFamily: handScript,
              color: active ? V3_COLORS.ink : V3_COLORS.inkMute,
              fontSize: 15, fontWeight: active ? 700 : 500, whiteSpace: 'nowrap'
            }}>
              {done && !active && <span style={{ color: V3_COLORS.markerGreen, marginRight: 4 }}>✓</span>}
              {String(i + 1).padStart(2, '0')} · {sc.title}
            </button>
          );
        })}
      </div>

      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 60px 100px', position: 'relative' }}>
          <div style={{ display: 'inline-block', padding: '3px 10px', marginBottom: 14, border: `1.5px solid ${V3_COLORS.marker}`, color: V3_COLORS.marker, fontFamily: handScript, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', transform: 'rotate(-1.5deg)' }}>{scenario.category}</div>
          <h1 style={{ fontFamily: handScript, fontSize: 54, lineHeight: 1, fontWeight: 700, margin: '0 0 6px' }}>{scenario.title}</h1>
          <div style={{ fontSize: 13, fontFamily: handScript, color: V3_COLORS.inkMute, borderBottom: `2px dashed ${V3_COLORS.inkFaint}`, paddingBottom: 18, marginBottom: 26 }}>~ scene · choice · scene · choice · research · commitment ~</div>

          {/* Content note */}
          {!s.acknowledged && scenario.contentNote && (
            <div style={{ background: V3_COLORS.highlightYellow, padding: '20px 22px', margin: '0 0 28px', boxShadow: '3px 3px 0 rgba(30,25,15,0.1)', transform: 'rotate(-0.4deg)' }}>
              <div style={{ fontFamily: handScript, fontSize: 16, fontWeight: 700, color: V3_COLORS.marker, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>★ {scenario.contentNote.heading}</div>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: '0 0 14px' }}>{scenario.contentNote.body}</p>
              <button onClick={() => update({ acknowledged: true })} style={{ background: V3_COLORS.marker, color: V3_COLORS.paper, border: `2px solid ${V3_COLORS.marker}`, fontFamily: handScript, fontSize: 16, fontWeight: 700, padding: '4px 14px', cursor: 'pointer', transform: 'rotate(-1deg)' }}>i'm ready →</button>
            </div>
          )}

          {s.acknowledged && (<>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: handScript, fontSize: 16, fontWeight: 700, color: V3_COLORS.marker, marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase' }}>What's happening</div>
              <p style={{ fontSize: 16, lineHeight: 1.65, margin: 0 }}>{setup}</p>
            </div>

            <div style={{ position: 'relative', margin: '28px 0' }}>
              <div style={{ position: 'absolute', top: -14, left: 14, background: V3_COLORS.highlightYellow, padding: '2px 12px', fontFamily: handScript, fontSize: 14, fontWeight: 700, transform: 'rotate(-2deg)', boxShadow: '1px 1px 0 rgba(0,0,0,0.1)' }}>{scenario.vignette.label}</div>
              <div style={{ background: 'rgba(255,255,255,0.65)', border: `1.5px solid ${V3_COLORS.inkFaint}`, padding: '24px 22px 18px', boxShadow: '2px 3px 0 rgba(30,25,15,0.08)' }}>
                {scenario.vignette.transcript.map((line, i) => (
                  <div key={i} style={{ marginBottom: i === scenario.vignette.transcript.length - 1 ? 0 : 8 }}>
                    <span style={{ fontFamily: handScript, fontSize: 14, fontWeight: 700, color: V3_COLORS.markerBlue, marginRight: 8, textTransform: 'uppercase', letterSpacing: 1 }}>{line.who}:</span>
                    <span style={{ fontSize: 14.5, lineHeight: 1.5, fontStyle: 'italic' }}>"{line.line}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1 prompt */}
            <div style={{ margin: '32px 0 14px', padding: '14px 16px', background: V3_COLORS.highlightPink, transform: 'rotate(-0.3deg)', boxShadow: '2px 2px 0 rgba(30,25,15,0.08)' }}>
              <div style={{ fontFamily: handScript, fontSize: 13, fontWeight: 700, color: V3_COLORS.marker, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>? scene 1 · the question ?</div>
              <div style={{ fontFamily: handScript, fontSize: 21, lineHeight: 1.2, fontWeight: 700 }}>{scenario.prompt}</div>
            </div>

            <div style={{ fontFamily: handScript, fontSize: 13, fontWeight: 700, color: V3_COLORS.inkMute, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Circle one:</div>
            {scenario.choices.map((c, i) => {
              const isChosen = s.step1 === i;
              const otherChosen = s.step1 !== undefined && !isChosen;
              return (
                <button key={i} onClick={() => s.step1 === undefined && update({ step1: i })} disabled={s.step1 !== undefined && !isChosen}
                  style={{
                    display: 'flex', width: '100%', textAlign: 'left', alignItems: 'flex-start', gap: 12,
                    padding: '12px 14px', margin: '0 0 6px',
                    background: isChosen ? 'rgba(255,255,255,0.75)' : 'transparent',
                    border: isChosen ? `2px solid ${V3_COLORS.marker}` : `1.5px dashed ${V3_COLORS.inkFaint}`,
                    fontFamily: bodyFace, fontSize: 14.5, color: V3_COLORS.ink,
                    cursor: s.step1 === undefined || isChosen ? 'pointer' : 'default',
                    opacity: otherChosen ? 0.35 : 1, lineHeight: 1.45
                  }}>
                  <span style={{ width: 22, height: 22, flexShrink: 0, borderRadius: '50%', border: `2px solid ${isChosen ? V3_COLORS.marker : V3_COLORS.inkFaint}`, background: isChosen ? V3_COLORS.marker : 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: handScript, fontSize: 13, fontWeight: 700, marginTop: 1 }}>
                    {isChosen ? '✓' : String.fromCharCode(97 + i)}
                  </span>
                  <span>{c.label}</span>
                </button>
              );
            })}

            {step1 && (
              <div style={{ margin: '24px 0', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -10, left: -6, fontFamily: handScript, fontSize: 14, fontWeight: 700, color: tagColor(step1.tag), background: V3_COLORS.paper, padding: '0 8px', transform: 'rotate(-2deg)', letterSpacing: 1, textTransform: 'uppercase' }}>← {tagText(step1.tag)}</div>
                <div style={{ border: `2px solid ${tagColor(step1.tag)}`, padding: '22px 20px 18px', background: 'rgba(255,255,255,0.55)' }}>
                  <div style={{ fontSize: 14.5, lineHeight: 1.6 }}>{step1.feedback}</div>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step1 && step2 && (<>
              <div style={{ margin: '36px 0 16px', borderTop: `2px dashed ${V3_COLORS.inkFaint}`, paddingTop: 22 }}>
                <div style={{ fontFamily: handScript, fontSize: 16, fontWeight: 700, color: V3_COLORS.markerBlue, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>→ {step2.label}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, fontStyle: 'italic', margin: 0, color: V3_COLORS.inkMute }}>{step2.beat}</p>
              </div>
              <div style={{ margin: '14px 0 12px', padding: '12px 14px', background: V3_COLORS.highlightPink, transform: 'rotate(-0.2deg)', boxShadow: '2px 2px 0 rgba(30,25,15,0.08)' }}>
                <div style={{ fontFamily: handScript, fontSize: 13, fontWeight: 700, color: V3_COLORS.marker, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>? scene 2 · then what ?</div>
                <div style={{ fontFamily: handScript, fontSize: 19, lineHeight: 1.2, fontWeight: 700 }}>{step2.prompt}</div>
              </div>
              {step2.choices.map((c, i) => {
                const isChosen = s.step2 === i;
                const otherChosen = s.step2 !== undefined && !isChosen;
                return (
                  <button key={i} onClick={() => s.step2 === undefined && update({ step2: i })} disabled={s.step2 !== undefined && !isChosen}
                    style={{ display: 'flex', width: '100%', textAlign: 'left', alignItems: 'flex-start', gap: 12, padding: '10px 12px', margin: '0 0 5px',
                      background: isChosen ? 'rgba(255,255,255,0.75)' : 'transparent',
                      border: isChosen ? `2px solid ${V3_COLORS.marker}` : `1.5px dashed ${V3_COLORS.inkFaint}`,
                      fontFamily: bodyFace, fontSize: 14, color: V3_COLORS.ink,
                      cursor: s.step2 === undefined || isChosen ? 'pointer' : 'default',
                      opacity: otherChosen ? 0.35 : 1, lineHeight: 1.45 }}>
                    <span style={{ width: 20, height: 20, flexShrink: 0, borderRadius: '50%', border: `2px solid ${isChosen ? V3_COLORS.marker : V3_COLORS.inkFaint}`, background: isChosen ? V3_COLORS.marker : 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: handScript, fontSize: 12, fontWeight: 700 }}>
                      {isChosen ? '✓' : String.fromCharCode(97 + i)}
                    </span>
                    <span>{c.label}</span>
                  </button>
                );
              })}
              {step2Choice && (
                <div style={{ margin: '20px 0', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -10, left: -6, fontFamily: handScript, fontSize: 13, fontWeight: 700, color: tagColor(step2Choice.tag), background: V3_COLORS.paper, padding: '0 8px', transform: 'rotate(-2deg)', textTransform: 'uppercase' }}>← {tagText(step2Choice.tag)}</div>
                  <div style={{ border: `2px solid ${tagColor(step2Choice.tag)}`, padding: '20px 18px 16px', background: 'rgba(255,255,255,0.55)' }}>
                    <div style={{ fontSize: 14, lineHeight: 1.6 }}>{step2Choice.feedback}</div>
                  </div>
                </div>
              )}
            </>)}

            {step2Choice && (<>
              <div style={{ margin: '40px auto', maxWidth: 480, padding: '20px 22px', background: '#fff', border: `1px solid ${V3_COLORS.inkFaint}`, boxShadow: '3px 4px 0 rgba(30,25,15,0.12), 6px 7px 0 rgba(30,25,15,0.04)', transform: 'rotate(1deg)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: -14, right: 30, background: V3_COLORS.highlightYellow, padding: '3px 10px', fontFamily: handScript, fontSize: 12, fontWeight: 700, transform: 'rotate(4deg)', textTransform: 'uppercase' }}>research clip</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.55, fontStyle: 'italic', marginBottom: 10 }}>"{scenario.research.quote}"</div>
                <div style={{ fontFamily: handScript, fontSize: 13, color: V3_COLORS.inkMute, fontWeight: 700 }}>— {scenario.research.cite}</div>
              </div>
              <div style={{ margin: '40px 0 0' }}>
                <div style={{ fontFamily: handScript, fontSize: 16, fontWeight: 700, color: V3_COLORS.marker, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>→ commit it to the page</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.5, color: V3_COLORS.inkMute, fontStyle: 'italic', marginBottom: 12 }}>{scenario.commitment}</div>
                <div style={{ background: 'rgba(255,255,255,0.6)', backgroundImage: `repeating-linear-gradient(transparent 0, transparent 27px, ${V3_COLORS.inkFaint} 27px, ${V3_COLORS.inkFaint} 28px)`, border: `1px solid ${V3_COLORS.inkFaint}`, padding: 4 }}>
                  <textarea value={commitByScenario[scenario.id] || ''} onChange={(e) => setCommitByScenario((st) => ({ ...st, [scenario.id]: e.target.value }))} placeholder="Your words." style={{ width: '100%', minHeight: 84, padding: '0 10px', boxSizing: 'border-box', background: 'transparent', border: 'none', fontFamily: handScript, fontSize: 18, lineHeight: '28px', color: V3_COLORS.markerBlue, resize: 'vertical', outline: 'none' }} />
                </div>
              </div>
              <div style={{ marginTop: 48, paddingTop: 18, borderTop: `1.5px dashed ${V3_COLORS.inkFaint}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button disabled={activeIdx === 0} onClick={() => setActiveIdx(activeIdx - 1)} style={{ background: 'transparent', border: 'none', fontFamily: handScript, fontSize: 16, color: V3_COLORS.inkMute, cursor: activeIdx === 0 ? 'default' : 'pointer', opacity: activeIdx === 0 ? 0.3 : 1 }}>← flip back</button>
                <button disabled={activeIdx === SCENARIOS.length - 1} onClick={() => setActiveIdx(activeIdx + 1)} style={{ background: V3_COLORS.marker, border: `2px solid ${V3_COLORS.marker}`, color: V3_COLORS.paper, fontFamily: handScript, fontSize: 17, fontWeight: 700, padding: '6px 16px', cursor: activeIdx === SCENARIOS.length - 1 ? 'default' : 'pointer', opacity: activeIdx === SCENARIOS.length - 1 ? 0.3 : 1, transform: 'rotate(-1deg)' }}>next page →</button>
              </div>
            </>)}
          </>)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { V3_Workbook });
