# PROMPT 2 of 2: UI REDESIGN, 3D, MOTION (run after Prompt 1 is committed)

You are a senior creative developer. Upgrade the **existing** portfolio (Vite + React 19 + TS + Tailwind v4 +
react-router-dom 7 + framer-motion; `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `lenis` are
already installed but **currently unused**). Do not rewrite data files or routes. Redesign the visual layer,
add the missing 3D hero, preloader, smooth scroll and transitions. Run `npm run build` after each numbered
step and fix errors before continuing. Preserve everything done in Prompt 1 (nav fix, meters, covers, icons, data).

## 0. Audit: what is wrong today (fix all)

| Finding | Why it matters |
|---|---|
| No `src/three/`, no preloader, `gsap`, `lenis`, `postprocessing` never imported | The signature "Coverage Field" hero and motion layer were never built. Bundle carries dead dependencies. |
| `body` uses two radial teal/blue gradients + a scanline `body::before` + 22px rounded cards + glow shadows | This is the generic "dark teal AI template" look. Must go. |
| Palette drifted to teal (`#7fe7dc`) | The intended identity is warm ink + bone + one lime "pass" accent, red only for failures. |
| `html { scroll-behavior: smooth }` | Will fight Lenis. Remove when Lenis is active. |
| Hard-coded colours like `rgba(127,231,220,…)` and `rgba(200,240,58,…)` in many rules | Two palettes mixed; makes theming impossible. Replace every one with tokens. |
| `.project-card` and `.card-meta` and `.tag-row` are defined twice in `index.css` (≈ line 602 and ≈ 1050) | Later rules silently override earlier ones. Merge into one definition each. |
| Only `Home` animates (`motion.main`), no exit animation, no route transition | Pages pop in/out. |
| `index.html` title is `portfolio`, no meta/OG | Weak SEO and link previews. |
| `profile.jpg` is ~230 KB JPEG imported from outside `src` | Convert to WebP ≤ 80 KB, 1:1 crop, move to `src/assets/`. |

## 1. Reference and identity

Reference for **structure and tone** (not pixels, never copy code or text): https://rachmat-portfolio.vercel.app
What can be confirmed from it: a minimal two-link nav, a preloader with uppercase status text, a projects
"gallery" archive, case-study pages with hash sections (e.g. `#coverage`), and a footer with **Sitemap** and **Connect**
columns. Its visuals are client-rendered, so if you have a browser tool, open it and note spacing rhythm, type scale
and motion timing; otherwise use the tokens below. **Do not reuse its brand (`PORTFOL.IO`), taglines or footer copy.**

Concept to carry through every page: **"The Test Run"**. Pass = lime, regression = vermilion, in-progress = amber.
Mono microcopy (`[PASS]`, `TC-0142`, `SEV-2`, `§03`) is the visual language. Keep it restrained and fast.

## 2. Design tokens (replace the `:root` block in `src/index.css`)

```css
:root {
  --bg: #0d0e0b;           /* warm ink, never pure black */
  --bg-soft: #14160f;
  --panel: #171911;
  --text: #ece8dc;         /* bone */
  --muted: #9a9888;
  --line: rgba(236, 232, 220, .13);
  --line-strong: rgba(236, 232, 220, .28);

  --accent: #c8f03a;       /* PASS: the one accent */
  --accent-rgb: 200 240 58;
  --success: #c8f03a;
  --warn: #f2b632;
  --danger: #ff4d2e;       /* FAIL: only for bugs/regressions */

  --heading: 'Instrument Serif', serif;
  --body: 'Bricolage Grotesque Variable', system-ui, sans-serif;
  --mono: 'JetBrains Mono Variable', ui-monospace, monospace;

  --radius: 2px;
  --ease: cubic-bezier(.22, 1, .36, 1);
  color-scheme: dark;
}
:root[data-theme='light'] {
  --bg: #ece8dc; --bg-soft: #e3dfd2; --panel: #f3f0e6;
  --text: #0d0e0b; --muted: #5d5c50;
  --line: rgba(13,14,11,.16); --line-strong: rgba(13,14,11,.4);
  --accent: #3f5d00; --accent-rgb: 63 93 0; --success: #3f5d00; --warn: #8a5a00; --danger: #c22a10;
  color-scheme: light;
}
@media (prefers-color-scheme: light) {
  :root:not([data-theme]) { /* same values as [data-theme='light'] */ }
}
html { scroll-behavior: auto; }
body { background: var(--bg); color: var(--text); font-family: var(--body); line-height: 1.55; }
/* DELETE: body radial gradients and body::before scanlines */
```

Then:
- `grep -rn "127, 231, 220\|127,231,220\|200, 240, 58\|11, 17, 23\|9, 17, 23\|6, 13, 18"` in `src/` and replace with `rgb(var(--accent-rgb) / .x)` or a token.
- Cards: `border-radius: var(--radius)`, 1px `--line` border, **no box-shadow glow**, no `translateY` hover lift.
  Hover = border goes `--line-strong`, an index number turns `--accent`, and a 1px accent underline draws on the title.
- Type scale (use `clamp`): display `clamp(3.5rem, 11vw, 10rem)` Instrument Serif, line-height `.9`, `letter-spacing:-.02em`;
  h2 `clamp(2rem, 4vw, 3.5rem)`; body `1rem/1.55`; mono labels `.7rem`, uppercase, `letter-spacing:.14em`.
- Add `:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }` globally.
- Add a **skip link** (`<a href="#main" className="skip">Skip to content</a>`) as the first child in `App`, and `id="main"` on each `<main>`.

## 3. Smooth scroll (Lenis + GSAP ScrollTrigger)

Create `src/hooks/useLenis.ts` and call it once in `App`:

```ts
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
declare global { interface Window { __lenis?: Lenis } }

export function useLenis() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); window.__lenis = undefined; };
  }, []);
}
```

Required CSS (from Lenis docs):
```css
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }
```
Update `ScrollToTop` (Prompt 1) so it uses Lenis when present:
```ts
const l = window.__lenis;
l ? l.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
// and for hashes: l ? l.scrollTo(el, { offset: -96 }) : el.scrollIntoView(...)
```

## 4. Preloader ("suite runner")

Show once per session (guard `sessionStorage` with try/catch), skip entirely under reduced motion.
Create `src/components/Preloader.tsx`:

```tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const STEPS = ['boot suite', 'load fixtures', 'run smoke', 'run regression', 'verify api', 'write report'];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0, timer = 0;
    const start = performance.now(), dur = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(p * 47));
      if (p < 1) raf = requestAnimationFrame(tick); else timer = window.setTimeout(onDone, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [onDone]);

  const step = STEPS[Math.min(STEPS.length - 1, Math.floor((n / 47) * STEPS.length))];
  return (
    <motion.div className="preloader" role="status" aria-live="polite"
      exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .8, ease: [.76, 0, .24, 1] }}>
      <p className="mono">RUNNING SUITE</p>
      <p className="pre-count">{String(n).padStart(2, '0')}<span>/47</span></p>
      <p className="mono pre-step">› {step}{n === 47 ? ' ... ALL PASSED' : ''}</p>
      <div className="pre-bar"><i style={{ transform: `scaleX(${n / 47})` }} /></div>
    </motion.div>
  );
}
```
```css
.preloader { position: fixed; inset: 0; z-index: 100; display: grid; place-content: center; gap: 10px; background: var(--bg); }
.pre-count { font: 400 clamp(5rem, 18vw, 14rem)/.85 var(--heading); }
.pre-count span { font-size: .3em; color: var(--muted); }
.pre-bar { width: min(420px, 70vw); height: 2px; background: var(--line); }
.pre-bar i { display: block; height: 100%; background: var(--accent); transform-origin: left; }
```
In `App.tsx`: `const [ready, setReady] = useState(() => !!sessionStorage.getItem('seen'))` (wrapped in try/catch),
`<AnimatePresence>{!ready && <Preloader onDone={() => { try { sessionStorage.setItem('seen','1') } catch {} ; setReady(true) }} />}</AnimatePresence>`.
Hold hero animations until `ready` is true.

## 5. Route transitions

Wrap routes so pages exit as well as enter. Create `src/components/PageTransition.tsx`:

```tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ duration: .45, ease: [.22, 1, .36, 1] }}>
      {children}
    </motion.div>
  );
}
```
In `App.tsx`:
```tsx
const location = useLocation(); // so App must be inside <BrowserRouter> (move BrowserRouter to main.tsx)
<AnimatePresence mode="wait" initial={false}>
  <Routes location={location} key={location.pathname}>
    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
    ...
  </Routes>
</AnimatePresence>
```
Remove the `motion.main` wrapper from `Home` (use plain `<main id="main">`). Add a 2px accent scanline that sweeps across the top
on each navigation (`motion.i` keyed by pathname, `scaleX 0→1→0`, 600 ms). On `/work/:slug` the label `LOADING TEST REPORT` is shown in the corner during the sweep.

## 6. Hero: asymmetric layout + 3D "Coverage Field"

### 6a. Layout (12-col grid, no centred stack)
```
[ eyebrow: § 01 / QA & AUTOMATION ]                              [ ID badge ]
RUPESH                                                           portrait 1:1,
Mahat (italic serif, accent underline)                           mono caption
lede (max 46ch)  |  buttons  |  tool marquee
```
- `h1`: two lines, `Rupesh` / `*Mahat*`. Subtitle: `Quality Assurance & Automation Engineer`.
- Lede: `I find the bugs in ERP, POS and e-commerce systems before customers do.`
- Portrait becomes a **QA ID badge**: square crop, 1px border, caption row `ID RM-001 · BHAKTAPUR · NP`, a small
  `[ STATUS: AVAILABLE ]` chip with a pulsing lime dot. No rounded blobs, no glow.
- Beneath the hero, a **tool marquee** (CSS-only, `animation: marquee 30s linear infinite`, paused on hover and under
  reduced motion): Selenium · Python · Postman · JMeter · Jira · Trello · Git · MySQL · PostgreSQL, each with an icon from `QA`.
- The canvas fills the hero **behind** the text (`position:absolute; inset:0; z-index:0`), with `pointer-events:auto` only on the right half so text stays selectable.

### 6b. Capability check hook (`src/three/useCan3D.ts`)
```ts
import { useEffect, useState } from 'react';

export function useCan3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    try {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const weak = (navigator.hardwareConcurrency ?? 8) <= 4 || innerWidth < 700;
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl2') || c.getContext('webgl');
      setOk(!!gl && !reduced && !weak);
    } catch { setOk(false); }
  }, []);
  return ok;
}
```
When `false`, render `<StaticField />`: the same grid as an SVG (reuse the seeded `ProjectCover` pattern, large, opacity .5).

### 6c. The scene (`src/three/CoverageField.tsx`): ONE InstancedMesh, no React state in the loop
```tsx
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const COLS = 30, ROWS = 18, COUNT = COLS * ROWS, STEP = 0.62;
const PASS = new THREE.Color('#c8f03a'), FAIL = new THREE.Color('#ff4d2e'), IDLE = new THREE.Color('#2b2d24');

function Field() {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const hit = useRef(new THREE.Vector3(999, 0, 999));
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const col = useMemo(() => new THREE.Color(), []);
  const heal = useMemo(() => new Float32Array(COUNT), []);
  const { camera } = useThree();

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    const scroll = window.scrollY;
    camera.position.set(0, 7 + scroll * 0.004, 9 + scroll * 0.002);
    camera.lookAt(0, 0, 0);

    for (let i = 0; i < COUNT; i++) {
      const cx = (i % COLS) - COLS / 2, cz = Math.floor(i / COLS) - ROWS / 2;
      const x = cx * STEP, z = cz * STEP;
      const reveal = THREE.MathUtils.clamp((t * 6 - Math.hypot(cx, cz)) / 5, 0, 1); // pass wave from centre
      if (Math.hypot(x - hit.current.x, z - hit.current.z) < 1.5) heal[i] = 1.2;     // regression near cursor
      heal[i] = Math.max(0, heal[i] - dt);
      const f = Math.min(1, heal[i] * 2);

      col.copy(IDLE).lerp(PASS, reveal).lerp(FAIL, f);
      mesh.current.setColorAt(i, col);
      dummy.position.set(x, 0, z);
      dummy.scale.set(0.5, 0.06 + reveal * 0.08 + f * 0.45, 0.5);
      dummy.position.y = dummy.scale.y / 2;
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.65} metalness={0.05} />
      </instancedMesh>
      {/* invisible plane that feeds the pointer position */}
      <mesh rotation-x={-Math.PI / 2} onPointerMove={(e) => hit.current.copy(e.point)} onPointerOut={() => hit.current.set(999, 0, 999)}>
        <planeGeometry args={[40, 30]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function CoverageField({ active }: { active: boolean }) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 7, 9], fov: 40 }} frameloop={active ? 'always' : 'never'} gl={{ antialias: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 3]} intensity={1.5} />
      <Field />
    </Canvas>
  );
}
```
Mount it lazily from `Home`:
```tsx
const CoverageField = lazy(() => import('../three/CoverageField'));
const can3D = useCan3D(); const [inView, ref] = useInView(); // IntersectionObserver hook, pause when off screen
<div className="hero-canvas" ref={ref} aria-hidden="true">
  {can3D ? <Suspense fallback={<StaticField />}><CoverageField active={inView} /></Suspense> : <StaticField />}
</div>
```
Rules: no postprocessing (remove `@react-three/postprocessing` and `framer-motion` duplicates only if unused: `npm rm` anything not imported at the end), dispose is automatic with R3F unmount, no console warnings, canvas gets a text alternative via the hero heading (it is `aria-hidden`).
Match scene colours to theme: read `--accent` from `getComputedStyle` once and update on theme change (light theme: IDLE `#d6d2c4`, PASS `#3f5d00`).

## 7. Section system

Create `SectionHead` and use it for every section (replaces ad-hoc `.section-heading`):
```tsx
export function SectionHead({ index, label, title, aside }: { index: string; label: string; title: string; aside?: React.ReactNode }) {
  return (
    <header className="section-head">
      <p className="mono">§{index} / {label}</p>
      <h2>{title}</h2>
      {aside}
    </header>
  );
}
```
```css
.section-head { display: grid; grid-template-columns: 12ch 1fr auto; align-items: end; gap: 24px; padding-top: 24px; border-top: 1px solid var(--line-strong); margin-bottom: 48px; }
.section-head h2 { font: 400 clamp(2rem, 4vw, 3.5rem)/1 var(--heading); margin: 0; }
@media (max-width: 700px) { .section-head { grid-template-columns: 1fr; gap: 8px; } }
```
Order and numbering on Home: §01 About · §02 Workflow · §03 Run log · §04 Test matrix · §05 Selected test reports · §06 Training & education · §07 Contact.
- **About:** left column big pull-quote (serif, ~2.2rem) from the profile text, right column the existing info panel as a `dl` with hairline rows.
- **Workflow:** three steps as one horizontal rail with big serif numerals `01 02 03`, not three equal rounded cards.
- **Run log:** two-column: sticky date/role column on the left, bullets on the right; a vertical hairline with a square node per job.
- **Test matrix (skills):** a matrix table; rows = skill groups, cells = chips with an icon; no percentages.
- **Selected test reports:** 2-column list, first card spans 2 columns (editorial asymmetry), index number `R-01` top left, `ProjectCover` behind, arrow `ArrowUpRight` that translates 4px on hover.
- **Contact (footer):** giant `RUPESH.QA` wordmark (serif, 18vw, 10% opacity), Sitemap and Connect columns, `Download CV` button, and a copy-email button that changes to `COPIED` for 1.5 s. Phone is click-to-reveal.

## 8. Case-study page upgrades

- Sticky side index with **scroll-spy** and a thin progress line:
```ts
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}
```
Style the active link with `--accent` and a 2px left rule; update the URL hash on click without a jump.
- Use `gsap.from('.study-section', { opacity: 0, y: 24, stagger: .08, scrollTrigger: ... })` once per section (kill triggers on unmount via `gsap.context`). Skip under reduced motion.
- Hero of the case study: giant serif title, mono meta strip, `ProjectCover` as a 220px band under the title.

## 9. Details that make it feel human-made

- **Custom cursor** (desktop fine pointers only): 10px square, `mix-blend-mode: difference`, follows the pointer with `lerp .18`, grows to 36px over links/buttons. Never hide the native cursor on touch.
- **Grid overlay:** press `G` toggles a 12-column hairline overlay (also a footer button). Handy for review, charming for visitors.
- **Theme toggle** (header, icon button `Sun/Moon`): persists with try/catch'd `localStorage`, sets `data-theme` on `<html>`, defaults to system.
- **Link hover:** text-swap or underline-draw only. Buttons: 1px border, mono uppercase, background flips to accent on hover. No scale or shadow.
- **404:** `404 · EXPECTED PAGE, RECEIVED NOTHING` with a red `FAIL` chip and a "Return to home" button.
- **Easter egg (optional):** 3 small bug icons crawl along the footer rule; clicking one squashes it and increments `BUGS CAUGHT: n` (session only).
- **Copy:** banned words: passionate, cutting-edge, seamless, elevate, crafted, premium, high-performance architecture. Short, concrete sentences.
- No emojis in UI. No gradient text. No glassmorphism.

## 10. SEO, meta, performance

`index.html`: real `<title>`, description, `theme-color`, Open Graph and Twitter tags, canonical, favicon (square split lime / vermilion).
`src/hooks/useSeo.ts`:
```ts
import { useEffect } from 'react';
export function useSeo(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', description);
  }, [title, description]);
}
```
Add `Person` JSON-LD (name, jobTitle, sameAs LinkedIn/GitHub, addressLocality Bhaktapur) in `index.html`. Add `public/robots.txt`, `public/sitemap.xml`, and `public/og.png` (1200×630, static).
Performance: lazy-load the 3D chunk and every route (`React.lazy`), `loading="lazy"` + width/height on images, WebP portrait, self-hosted fonts only
(`font-display: swap`). Remove unused deps with `npm rm` after confirming with `grep`.
Targets: Lighthouse Perf ≥ 90 desktop / ≥ 80 mobile, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

## 11. Definition of done

- [ ] No teal glow, scanlines or 22px rounded cards remain; palette = ink / bone / lime / vermilion / amber, light theme works
- [ ] Preloader runs once per session; reduced-motion users skip it
- [ ] Hero has the Coverage Field (pass wave + cursor regression), static SVG fallback when no WebGL / weak device / reduced motion
- [ ] Lenis scroll works, anchors and route changes scroll correctly, no `scroll-behavior: smooth` conflicts
- [ ] Route transitions animate in and out; nav shows no stale active/hover state
- [ ] All sections use `SectionHead` with §-numbering; asymmetric layouts as described
- [ ] Case studies have scroll-spy index and animated sections
- [ ] Custom cursor, grid overlay, theme toggle, 404 done; skip link and focus rings present
- [ ] `npm run build` passes, bundle splits the 3D chunk, Lighthouse targets met at 360px and 1440px
