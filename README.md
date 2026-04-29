# Examining Our Biases
### A K–5 Educator Training on Examining Bias in Conversations About Students of Color

An interactive, browser-based training that walks K–5 educators through ten everyday school conversations — discipline referrals, calling patterns, the staff lounge, parent conferences, gifted referrals, SPED meetings, peer-conflict mediation, grading, and more — and uses short branching scenarios to surface the assumptions hiding inside them.

The training is presented in **three parallel design directions**, side-by-side, so a team can choose the tone that best fits its context:

1. **Editorial Reflection** — serif, warm paper, journal-like; reads like a quiet study.
2. **Documentary Vignettes** — cinematic dark stage; episodes with photo-led tiles and pull-quotes.
3. **Workbook / Zine** — tactile, handwritten accents, circled answers; feels like a working notebook.

All three pull from the same scenario library, so content stays consistent across treatments.

---

## What's inside each scenario

Every one of the ten modules follows the same arc:

1. **Content note** — a short heads-up before any heavier scenario (discipline, deficit-language in the staff lounge, etc.) with an "I'm ready" gate and a "not right now" exit.
2. **Setup** — a paragraph of context grounded in the elementary classroom.
3. **Vignette** — a 4–7-line transcript (audio placeholder included) of the conversation as it actually unfolds.
4. **Step One — The Choice** — three or four responses you might make. None are labeled "right" or "wrong"; each is tagged as a **reframe**, **pause**, or **consideration** with researcher-voice feedback.
5. **The next beat** — what happens after your choice; a follow-up question.
6. **Step Two — The Choice** — second decision point with its own feedback.
7. **From the research** — a short pull-quote from peer-reviewed work (Hammond, Project Implicit, Grissom & Redding, Epstein et al., Sadker, Skiba, etc.).
8. **Finish the sentence** — a private commitment prompt; stored locally in the browser only, never transmitted.

There is **no scoring**, **no leaderboard**, and **no progress shared with administrators** — by design. The training is reflective, not evaluative.

---

## Files

| File | Purpose |
|---|---|
| `Bias Training.html` | The main entry point. Open in any modern browser. |
| `Bias Training (standalone).html` | Single self-contained version (all assets inlined). Works offline; no other files needed. |
| `data/scenarios.jsx` | The scenario library — content notes, vignettes, choices, feedback, research, commitments. Edit here to change content. |
| `variations/v1-editorial.jsx` | Editorial Reflection renderer. |
| `variations/v2-documentary.jsx` | Documentary Vignettes renderer. |
| `variations/v3-workbook.jsx` | Workbook / Zine renderer. |
| `design-canvas.jsx` | Side-by-side canvas that hosts the three variations as artboards. |

---

## Running it

**Option 1 — Standalone (easiest).** Download `Bias Training (standalone).html` and double-click. It runs offline, no server, no install.

**Option 2 — From source.** Clone the repo and serve the folder over any static web server (the file uses ES-module-style script imports, so opening from `file://` may not work in all browsers):

```bash
# Python 3
python3 -m http.server 8000

# Or Node
npx serve .
```

Then open `http://localhost:8000/Bias%20Training.html`.

---

## Customizing

- **Change a scenario** — edit `data/scenarios.jsx`. Each scenario is a self-contained object; the schema is documented inline at the top of the file.
- **Adjust the grade band focus** — the in-page Tweaks panel lets a facilitator switch between K–2 framing, 3–5 framing, or all grades. Defaults live in the `EDITMODE-BEGIN`/`EDITMODE-END` block at the top of `Bias Training.html`.
- **Add a scenario** — append a new entry to the `SCENARIOS` array; all three variations will pick it up automatically.

---

## Research grounded in

Citations appear in-line within each module. Sources include:

- Hammond, Z. (2015). *Culturally Responsive Teaching and the Brain.*
- Grissom, J. A., & Redding, C. (2016). Discretion and disproportionality in gifted-program identification.
- Epstein, R., Blake, J., & González, T. (2017). *Girlhood Interrupted: The Erasure of Black Girls' Childhood.*
- Sadker, D., & Sadker, M. *Failing at Fairness.*
- Skiba, R. J., et al. Race, behavior, and school discipline.
- Project Implicit (Harvard) — implicit association measures.

---

## A note on care

This training asks educators to look closely at their own practice. That's hard. Every module includes a **"step away"** option, a no-judgment **"I'm not sure"** answer, and content notes for heavier topics. The pacing assumes 5–8 minutes per module — short enough to fit into a planning period, long enough to actually think.

There is no certificate at the end. The work is the point.

---

## License & use

Internal training material developed by the Learning Architecture Lab. Not for external distribution without permission.
