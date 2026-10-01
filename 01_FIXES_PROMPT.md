# PROMPT 1 of 2: FIXES AND CONTENT (run this first)

You are a senior React/TypeScript engineer. You are editing an **existing** project (Vite + React 19 + TS +
Tailwind v4 + react-router-dom 7 + framer-motion). Do not rebuild it. Make exactly the changes below,
run `npm run build` after each numbered task, and fix any error before moving on.
When done, commit-ready state: `npm run build` passes, zero TypeScript errors, no console errors.

## Ground rules

1. **Never invent facts.** Use only the CV facts in this prompt. Never render the strings `TODO`,
   `ask owner`, `add a small note`, `Labelled as a course` or any other build instruction on the page.
   Those currently leak into the UI from `src/data/*.ts`.
2. Keep file structure. Add new files only where stated.
3. Keep the existing CSS variables. If a variable is used but not defined (e.g. `var(--pass)`), define it
   in `:root` (`--pass: var(--accent);` is fine).
4. All new components must be keyboard accessible and respect `prefers-reduced-motion`.

---

## Task 1. Remove the hanging top-right image

In `src/pages/Home.tsx`, inside `.hero-visual`, delete:

```tsx
<div className="studio-flag">
  <img src={studioPhoto} alt="QA studio environment" />
</div>
```

Then:
- Remove the `studioPhoto` import (`../../img/aa.jpg`) from `Home.tsx`.
- Delete the `.studio-flag` and `.studio-flag img` rules and the `.studio-flag` rule inside the 640px media query in `src/index.css`.
- Delete `img/aa.jpg` (500 KB, unused after Task 3).
- Keep the portrait (`profile.jpg`) and the `.mini-panel`.

## Task 2. Fix the nav "stuck hover / wrong active" bug

**Root cause (two bugs):**
1. `Header.tsx` has `{ to: '#contact', label: 'Contact' }` inside a `NavLink`. A hash-only `to` resolves to the
   *current* pathname, so `isActive` is true on every page and the Contact underline never leaves.
2. `.nav-link:hover::after` stays painted after a click because the pointer is still over the link and on touch
   devices `:hover` sticks.

**Fix `Header.tsx`:** make Contact a button that scrolls to the footer, and keep only real routes in `NavLink`.

```tsx
import { Link, NavLink, useLocation } from 'react-router-dom';

const routes = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Projects' },
];

export function Header() {
  const { pathname } = useLocation();

  const goContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Rupesh Mahat home">
          <span className="brand-mark">RM</span>
          <span className="brand-name">RUPESH.QA</span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation" key={pathname}>
          {routes.map((r) => (
            <NavLink
              key={r.to}
              to={r.to}
              end={r.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              onClick={(e) => (e.currentTarget as HTMLElement).blur()}
            >
              {r.label}
            </NavLink>
          ))}
          <button type="button" className="nav-link nav-link--button" onClick={goContact}>
            Contact
          </button>
        </nav>

        <a className="button-link inline-link" href="/Rupesh_Mahat_CV.pdf" download>
          Download CV
        </a>
      </div>
    </header>
  );
}
```

Notes:
- `key={pathname}` on `<nav>` remounts it on route change so no old hover/focus state survives.
- Brand changed from `PORTFOL.IO` / `P` to `RUPESH.QA` / `RM`. **`PORTFOL.IO` is the inspiration site's brand; do not reuse it.**
- The CTA said "Open for Hire" but downloads a CV. Label it `Download CV`.

**Fix the CSS** (replace the existing `.nav-link*` rules):

```css
.nav-link {
  position: relative;
  padding: 6px 0;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: none;
  border: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.nav-link::after {
  content: '';
  position: absolute;
  inset: auto 0 -2px 0;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
/* hover only on devices that really hover, and never on the active link twice */
@media (hover: hover) and (pointer: fine) {
  .nav-link:hover { color: var(--text); }
  .nav-link:hover::after { transform: scaleX(1); }
}
.nav-link.is-active { color: var(--text); }
.nav-link.is-active::after { transform: scaleX(1); }
.nav-link:focus-visible { outline: 1px solid var(--accent); outline-offset: 4px; }
.nav-link:focus:not(:focus-visible) { outline: none; }
```

**Also fix scroll position on route change.** Create `src/components/ScrollToTop.tsx` and render it inside `<BrowserRouter>` in `App.tsx`:

```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}
```

Add `scroll-margin-top: 96px;` to `.study-section` and any element with an `id` used as an anchor, so sections do not hide under the sticky header.

## Task 3. "Release candidates." background: replace the photos with generated covers

Currently every card in the Home "Featured projects" grid uses `profilePhoto`/`studioPhoto` as a CSS
`backgroundImage`. Remove that completely (delete the `style={{ backgroundImage... }}` block and the two photo imports if no longer used).

Create `src/components/ProjectCover.tsx`: a deterministic **SVG test-grid cover**. Each cell is a test case;
most pass (accent), a few warn/fail, seeded from the slug so every project looks different but stable between renders.
No images, no extra dependencies.

```tsx
type Props = { slug: string; className?: string };

function seed(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h += 0x6d2b79f5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export function ProjectCover({ slug, className = '' }: Props) {
  const COLS = 18, ROWS = 7, S = 14, G = 4;
  const rnd = seed(slug);
  const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
    const r = rnd();
    const state = r > 0.965 ? 'fail' : r > 0.9 ? 'warn' : r > 0.18 ? 'pass' : 'idle';
    return { x: (i % COLS) * (S + G), y: Math.floor(i / COLS) * (S + G), state };
  });
  const w = COLS * (S + G) - G, h = ROWS * (S + G) - G;

  return (
    <svg className={`project-cover ${className}`} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={S} height={S} rx="1" className={`cell cell--${c.state}`}
              style={{ animationDelay: `${(i % COLS) * 35 + Math.floor(i / COLS) * 20}ms` }} />
      ))}
    </svg>
  );
}
```

```css
.project-cover { position: absolute; inset: 0; width: 100%; height: 100%; opacity: .55; transition: opacity .3s; }
.project-card:hover .project-cover { opacity: .85; }
.project-cover .cell { fill: rgba(255,255,255,.05); }
.project-cover .cell--pass { fill: var(--accent); fill-opacity: .55; }
.project-cover .cell--warn { fill: var(--warn); }
.project-cover .cell--fail { fill: var(--danger); }
@media (prefers-reduced-motion: no-preference) {
  .project-cover .cell--pass { animation: cell-in .6s ease-out both; }
  @keyframes cell-in { from { fill-opacity: 0; } }
}
.project-card::after { /* readability scrim */
  content: ''; position: absolute; inset: 0; z-index: 0;
  background: linear-gradient(180deg, rgba(6,13,18,.15) 0%, rgba(6,13,18,.92) 75%);
}
.project-overlay { position: relative; z-index: 1; }
```

Usage in `Home.tsx` card: `<ProjectCover slug={project.slug} />` as the first child of the `<Link className="project-card">`.
Use the same cover (smaller, `opacity .35`) on the Work archive cards for consistency.
Also rename the heading "Release candidates." to **"Selected test reports."**

## Task 4. Run log: bold the important content

Add `src/lib/emphasis.tsx`: a tiny renderer that turns `**text**` into `<strong>` (no markdown dependency):

```tsx
import { Fragment, type ReactNode } from 'react';

export function emphasis(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="em">{part.slice(2, -2)}</strong>
      : <Fragment key={i}>{part}</Fragment>,
  );
}
```

Change the `ExperienceItem` type to add `stack?: string[]` and update the timeline JSX:

```tsx
<article key={...} className="timeline-item">
  <div className="timeline-header">
    <span className="timeline-tag">{job.period}</span>
    <h3>{job.role}</h3>
  </div>
  <p className="company-line"><strong>{job.company}</strong> · {job.location}</p>
  <ul>{job.bullets.map((b) => <li key={b}>{emphasis(b)}</li>)}</ul>
  {job.stack && <div className="tag-row">{job.stack.map((s) => <span key={s}>{s}</span>)}</div>}
</article>
```

```css
.em { color: var(--text); font-weight: 600; }
.timeline-item li { color: var(--muted); }
.timeline-item li .em { background: linear-gradient(transparent 62%, rgba(127,231,220,.18) 0); } /* soft highlighter */
.company-line strong { color: var(--text); }
```

Replace `profile.experience` in `src/data/profile.ts` with this (CV facts only). Note the Support Engineer role's CV period is simply "Present", so **never show `TODO`**:

```ts
experience: [
  {
    role: 'QA & Automation Engineer',
    company: 'Danfe Solution Pvt. Ltd.',
    location: 'Sinamangal',
    period: 'Apr 2025 – Present',
    bullets: [
      'Own **manual and automation testing** across **cart, billing, inventory, order management** and **restaurant POS** modules.',
      'Automate repeatable flows with **Selenium + Python**, verify endpoints in **Postman**, and run **JMeter** performance checks.',
      'Write **test cases, scenarios and reporting workflows**; analyse requirements to surface **edge cases** and cover **functional and non-functional** areas.',
      'Log and track defects in **Jira** with clear reproduction steps, working with developers to raise **quality and user experience**.',
    ],
    stack: ['Selenium', 'Python', 'Postman', 'JMeter', 'Jira'],
  },
  {
    role: 'Support Engineer',
    company: 'Danfe Solution Pvt. Ltd.',
    location: 'Sinamangal',
    period: 'Present',
    bullets: [
      'Resolve **client-side technical issues**: **printer connectivity, driver setup and configuration**, plus software **installation, updates and troubleshooting**.',
      'Keep client communication clear and timely; **escalate complex cases** to internal teams for quick resolution.',
      '**Document issues, fixes and client feedback** so recurring problems drop over time.',
    ],
    stack: ['Client support', 'Troubleshooting', 'Escalation'],
  },
  {
    role: 'Quality Assurance Intern',
    company: 'Search Eyes Business Solution',
    location: 'Bhaktapur',
    period: 'Dec 2024 – Apr 2025',
    bullets: [
      'Validated **ERP and transactional workflows**: **accounting, HR, inventory**.',
      'Tested **UI/UX across devices** (Responsive Test Chrome extension) and verified **payments (cash/card), order processing and data integrity**.',
      'Tracked bugs with **Jira and Excel**, used API tools for data checks, and worked in **Agile/Scrum sprints** with developers.',
    ],
    stack: ['ERP', 'Jira', 'Excel', 'Agile/Scrum'],
  },
],
```

## Task 5. Rewrite the Training and Education section

Problems now: heading says "Certifications and study notes" (there are no certificates), a raw instruction
string (`Labelled as a course, not a certification.`) is printed on the page, and items are long run-on strings.

Change types in `profile.ts`:

```ts
export type LearningItem = {
  title: string;
  provider: string;
  kind: 'Training program' | 'Online course' | 'Degree' | 'Higher secondary' | 'School';
  period?: string;
  points?: string[];
};
// in ProfileData: training: LearningItem[]; education: LearningItem[];
```

Data (do **not** call the Mindluster course a certification; owner to add a certificate link later if one exists):

```ts
training: [
  {
    title: 'Quality Assurance Training',
    provider: 'Mindrisers Institute of Technology',
    kind: 'Training program',
    points: [
      '**Manual testing** and **automation testing** with **Selenium (Python)**',
      '**Mobile application testing** using Android Studio',
      'Project and defect tracking with **Jira** and **Trello**',
    ],
  },
  {
    title: 'Automation Engineer (ISTQB track)',
    provider: 'Mindluster',
    kind: 'Online course',
    points: [
      'Automated web tests with **Selenium WebDriver + Python**: locating elements, performing actions, validating UI behaviour',
      'Wrote **PyTest / Unittest** suites with assertions, waits and managed test data',
      'Built **reusable functions** and the **Page Object Model**; organised suites for maintainability',
    ],
  },
],
education: [
  { title: 'Bachelor in Information Technology Management', provider: 'Kantipur College of Management and Information Technology', kind: 'Degree', period: 'Completed' },
  { title: '+2 Management', provider: 'Modern College of Management, Bhaktapur', kind: 'Higher secondary', period: '2075 BS' },
  { title: 'SLC', provider: 'Gundu English Secondary School, Bhaktapur', kind: 'School', period: '2072 BS' },
],
```

Replace `other` with a proper item: **College project: Money Transfer Service**, a mobile app built in Java.

New section JSX (heading: eyebrow `Training & education`, h2 `Where the craft was learned.`):

```tsx
<div className="learn-grid">
  <div>
    <h3 className="col-title">Training</h3>
    {profile.training.map((t) => (
      <article className="learn-card" key={t.title}>
        <span className="kind-chip">{t.kind}</span>
        <h4>{t.title}</h4>
        <p className="provider">{t.provider}</p>
        <ul>{t.points?.map((p) => <li key={p}>{emphasis(p)}</li>)}</ul>
      </article>
    ))}
  </div>
  <div>
    <h3 className="col-title">Education</h3>
    <ol className="edu-list">
      {profile.education.map((e) => (
        <li key={e.title}>
          <span className="edu-period">{e.period}</span>
          <div><strong>{e.title}</strong><p>{e.provider}</p></div>
        </li>
      ))}
    </ol>
  </div>
</div>
```

Style with existing tokens: square-ish cards (radius ≤ 6px), mono `kind-chip`, a left hairline on `.edu-list`.

## Task 6. Test reports: proper descriptions

### 6a. Work page (`/work`)
Under the `<h1>Test reports</h1>` add an intro and a legend (replace the dead filter chips with working ones):

```tsx
<p className="page-intro">
  Each report summarises how a product was tested: what was in scope, how coverage was planned,
  which scenarios were checked, and what the defects looked like. Client data is never shown.
</p>
<ul className="legend" aria-label="Status legend">
  <li><span className="dot dot--pass" /> PASS: behaved as expected</li>
  <li><span className="dot dot--warn" /> WARN: works, needs follow-up</li>
  <li><span className="dot dot--fail" /> FAIL: defect logged</li>
</ul>
```

Make filters work:

```tsx
const [active, setActive] = useState<(typeof filterOptions)[number]>('All');
const list = active === 'All' ? projects : projects.filter((p) => p.category === active);
// chip: <button aria-pressed={active === f} className={`chip${active === f ? ' chip--on' : ''}`} onClick={() => setActive(f)}>
```

### 6b. Case study page
- Add a **meta strip** under the title: `Role: QA Engineer` · `Type: {category}` · `Methods: {tools joined}` · `Link: Live (HTTPS) / Live (HTTP, not secure) / Private`.
- Replace the hard-coded generic "Test strategy" paragraph with `project.strategy` (new field, per project below).
- Give **every section a one-line lead** (class `lead`) so it is never a bare list. Add a `lead` map:

| Section | Lead sentence |
|---|---|
| Overview | What the product is and who uses it. |
| Scope | The modules and flows that were in scope for testing. |
| Coverage | How thoroughly each module was exercised, by test type. |
| Scenarios | A representative sample of the cases that were written and run. |
| Defects | How the issues found were distributed by severity. |
| Tools | What was used to plan, run and track the work. |
| Outcome | What the testing changed for the team. |

- Add `illustrative?: boolean` to `Project`. When true, show a small banner above Scenarios/Coverage/Defects:
  `Representative figures: client test artifacts are confidential, so values shown illustrate the approach.` **Set it true for every project until the owner supplies real numbers.**
- Add a **prev/next report** footer at the end of the case study.

### 6c. Replace placeholder descriptions in `src/data/projects.ts`
Add `strategy: string` and `illustrative: true` to every project. Use exactly these (from the CV only):

| slug | description | strategy |
|---|---|---|
| `hs-admin` | An admin panel used to manage users, access and reports for a business system. | Verified role-based access, record management filters and report exports, then regression-checked after each fix. |
| `restro-pos` | A restaurant point-of-sale covering table orders, online orders, take-away and billing. | Walked each order channel end to end, then checked billing totals, order updates and edge cases such as changes after confirmation. |
| `cloud-restro-order` | A cloud restaurant ordering system for table orders, online orders and take-away with order updates and history. | Tested the full order lifecycle from placement to payment, plus updates, billing accuracy and order-history integrity. |
| `nso-app` | A web application hosted by Danfe Solution; testing focused on core user flows and data accuracy. | Mapped critical user paths and validated functional behaviour and data on both happy and failure flows. |
| `bricx-erp` | An ERP with user management, HR, inventory and reporting modules, including journal vouchers and financial reports. | Ran functional, integration and regression passes across modules and checked financial outputs (Daybooks, Payable/Receivable) against entered vouchers. |
| `phat-food-order` | An online food-ordering system for guest and registered customers with cash and card payment. | Covered guest and customer journeys, order placement, payment integration, order tracking and history, with manual and automated checks. |
| `ecommerce-nepal-usa` | A cross-border e-commerce platform for Nepal and the USA with cash and card payment options. | Validated registration, account and checkout flows, then local and international shipment tracking, using manual and automated checks. |
| `jilla-bachat` | A bank transaction recording system with main branches, sub-bank accounts and role-based access. | Verified transaction entry, branch and sub-account creation, financial report generation and permission boundaries per role. |
| `qr-digital-menu` | A QR-code digital menu for hotels and restaurants. | Checked menu display, link behaviour and mobile compatibility across devices after scanning. |

Rewrite each `outcome` as a plain, non-numeric statement tied to the strategy (e.g. "Order and billing flows were verified end to end, with edge cases documented for the team."). No invented percentages.

## Task 7. Fix the progress bars (Coverage and Defects)

**Likely causes found in the code:**
- `.defect-fill` width is `Math.min(value * 15, 100)%`, so any count ≥ 7 shows a full bar (misleading scale).
- Coverage percentages are computed from the index (`72 + (index * 7) % 27`), which is fake data.
- Bars are 12px flat rectangles with a 180px/1fr/60px grid that breaks below 640px, no animation, no label for screen readers, and `var(--pass)` is undefined.

**Replace with two components** in `src/components/QaMeters.tsx`.

`CoverageMeter`: a segmented "test runner" bar (20 ticks), animated when scrolled into view, with real ARIA meter semantics:

```tsx
import { useEffect, useRef, useState } from 'react';

export function CoverageMeter({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: .4 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const TICKS = 20;
  const on = Math.round((value / 100) * TICKS);
  return (
    <div className="meter" ref={ref} role="meter" aria-label={`${label} coverage`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
      <span className="meter-label">{label}</span>
      <div className="meter-ticks" aria-hidden="true">
        {Array.from({ length: TICKS }, (_, i) => (
          <i key={i} className={seen && i < on ? 'on' : ''} style={{ transitionDelay: `${i * 28}ms` }} />
        ))}
      </div>
      <span className="meter-value">{value}%</span>
    </div>
  );
}
```

`DefectBar`: ONE stacked bar showing true proportions, with a legend (no more per-row bars with a fake scale):

```tsx
export function DefectBar({ items }: { items: { label: string; value: number; tone: 'pass' | 'amber' | 'fail' }[] }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  return (
    <div>
      <div className="stack-bar" role="img" aria-label={items.map((i) => `${i.label}: ${i.value}`).join(', ')}>
        {items.map((i) => (
          <span key={i.label} className={`seg seg--${i.tone}`} style={{ flexGrow: i.value }} title={`${i.label}: ${i.value}`} />
        ))}
      </div>
      <ul className="legend">
        {items.map((i) => (
          <li key={i.label}><span className={`dot dot--${i.tone}`} /> {i.label} <strong>{i.value}</strong>
            <em>{Math.round((i.value / total) * 100)}%</em></li>
        ))}
      </ul>
    </div>
  );
}
```

```css
.meter { display: grid; grid-template-columns: minmax(120px, 200px) 1fr 3.5ch; align-items: center; gap: 14px; padding: 8px 0; }
.meter-label { font-size: .92rem; }
.meter-value { font-family: var(--mono); font-size: .8rem; color: var(--accent); text-align: right; }
.meter-ticks { display: grid; grid-template-columns: repeat(20, 1fr); gap: 3px; height: 16px; }
.meter-ticks i { background: rgba(255,255,255,.06); border: 1px solid var(--line); transition: background .35s ease, transform .35s ease; transform: scaleY(.6); }
.meter-ticks i.on { background: var(--accent); border-color: var(--accent); transform: scaleY(1); }
@media (prefers-reduced-motion: reduce) { .meter-ticks i { transition: none; } }
@media (max-width: 640px) { .meter { grid-template-columns: 1fr auto; } .meter-ticks { grid-column: 1 / -1; order: 3; } }

.stack-bar { display: flex; height: 18px; gap: 3px; }
.seg { min-width: 6px; }
.seg--pass { background: var(--success); } .seg--amber { background: var(--warn); } .seg--fail { background: var(--danger); }
.legend { display: flex; flex-wrap: wrap; gap: 8px 22px; margin: 14px 0 0; padding: 0; list-style: none; font-family: var(--mono); font-size: .72rem; color: var(--muted); }
.legend em { font-style: normal; opacity: .6; margin-left: 6px; }
.dot { display: inline-block; width: 8px; height: 8px; margin-right: 6px; border-radius: 1px; }
.dot--pass { background: var(--success); } .dot--warn, .dot--amber { background: var(--warn); } .dot--fail { background: var(--danger); }
```

Data: change `modules: string[]` coverage into a separate `coverage: { module: string; value: number }[]` field in `Project`.
**Values must come from the owner.** Until then, use them with `illustrative: true` (banner from Task 6b) and
keep them in the `70–95` range. Do not compute them from the array index. In `CaseStudy.tsx` render:

```tsx
{project.coverage.map((c) => <CoverageMeter key={c.module} label={c.module} value={c.value} />)}
...
<DefectBar items={project.defects} />
```

## Task 8. QA-style icons

Install: `npm i lucide-react`. Create `src/components/Icon.tsx` that exports a named map so icons stay consistent,
and verify each import compiles (if a name is missing in the installed version, pick the closest icon):

```tsx
import { Bug, ClipboardCheck, CircleCheck, TriangleAlert, CircleX, Gauge, GitBranch, Database,
         ListChecks, Repeat, ScanSearch, ShieldCheck, Smartphone, Terminal, Workflow, Layers, FlaskConical } from 'lucide-react';

export const QA = {
  bug: Bug, plan: ClipboardCheck, pass: CircleCheck, warn: TriangleAlert, fail: CircleX,
  perf: Gauge, git: GitBranch, db: Database, cases: ListChecks, regression: Repeat,
  inspect: ScanSearch, security: ShieldCheck, mobile: Smartphone, cli: Terminal,
  flow: Workflow, layers: Layers, lab: FlaskConical,
} as const;
```

Rules: `size={16}` inline, `18` in cards, `strokeWidth={1.5}`, color via `currentColor`; every purely decorative icon gets `aria-hidden`.
Brand icons (GitHub, LinkedIn) are not reliably in lucide: write two small inline SVG components instead.

Place them here:
- **Header brand mark:** `Bug` inside the square `RM` badge area, or next to `RUPESH.QA`.
- **Hero badges** (Automation, Regression, API, Manual QA): `Terminal`, `Repeat`, `Workflow`, `ClipboardCheck`.
- **Quality workflow cards:** 01 `ScanSearch`, 02 `ListChecks`, 03 `Bug`.
- **Skills groups:** Testing `ClipboardCheck`, Automation `Terminal`, API and Performance `Gauge`, Tools `GitBranch`, Languages and Data `Database`.
- **Scenario table status:** `PASS` → `CircleCheck` (green), `WARN` → `TriangleAlert` (amber), `FAIL` → `CircleX` (red), always with the text next to it (do not rely on colour alone).
- **Legend and defect bar:** same three icons.
- **Case-study side index:** a small icon per section (Overview `Layers`, Scope `ListChecks`, Coverage `Gauge`, Scenarios `ClipboardCheck`, Defects `Bug`, Tools `Terminal`, Outcome `ShieldCheck`).
- **Buttons:** `Download` icon on Download CV, `ArrowUpRight` on "Open live product".

## Task 9. Remove invented numbers and leaked text (data hygiene)

- `runHighlights` in `profile.ts` shows `350+ test cases`, `120+ bug reports`, `18 automations`, `9 products`.
  **None of these are in the CV.** Replace with facts that are:
  `{ value: '9', label: 'Products tested' }` (count of projects in the CV list),
  `{ value: '6', label: 'Tools in daily use' }` (Selenium, Postman, JMeter, Jira, Trello, Git),
  `{ value: '2', label: 'Roles at Danfe' }`,
  `{ value: '2024', label: 'In QA since' }` (Dec 2024 internship).
- Remove the fake `47/47` "Regression checks [LIVE]" panel or relabel it `Sample run` and make it clearly decorative.
- The hero line "Hi, I'm Rupesh Mahat": change to a plain headline: `Rupesh Mahat` as the `h1` with
  `Quality Assurance & Automation Engineer` as an h2-style subtitle.
- Footer: replace the sentence "A showcase of modern web engineering, focused on high-performance architecture and premium user experience." and "Crafted with precision." Both are lifted from the inspiration site. Use:
  `QA and automation engineer in Bhaktapur, Nepal. I test products until they are boring to use.` and
  `© 2026 Rupesh Mahat · Built with React and Three.js`.
- Set a real `<title>` and `meta description` in `index.html` (`Rupesh Mahat | QA & Automation Engineer`).

## Definition of done

- [ ] No hanging image in hero; `aa.jpg` deleted
- [ ] Nav: Contact no longer always underlined; no underline lingers after navigating; scroll resets to top on route change
- [ ] Featured cards use generated covers, no photos
- [ ] Run log has bold key phrases and stack chips; no `TODO` anywhere on the page (search `grep -rn "TODO" src` returns nothing user-visible)
- [ ] Training and Education restructured, no instruction text on the page
- [ ] `/work` has intro, legend, working filters; each case study has meta strip, leads, strategy and prev/next
- [ ] CoverageMeter and DefectBar render correctly at 360px and 1440px and animate once on scroll
- [ ] Icons present as listed
- [ ] `npm run build` passes
