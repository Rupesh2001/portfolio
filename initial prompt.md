# MASTER PROMPT: Rupesh Mahat, QA & Automation Engineer Portfolio

You are a senior creative developer. Build, set up, and prepare for Netlify deployment a
production-grade portfolio site. Work autonomously: create the project, install dependencies,
write all files, run the build, fix errors, and finish with deploy instructions.
Do not ask questions unless something is truly blocking. State assumptions in one line and continue.

---

## 0. Ground rules (read first)

1. **Never invent facts.** Use only the data in section 2. Where a metric, date, or description
   is missing, put a `TODO` marker in the data file (e.g. `metrics: [{ label: "Test cases", value: "TODO" }]`)
   and render it as an obvious placeholder in dev only. Do not fabricate numbers.
2. **Do not embed client systems.** The project links in section 2 are live client/admin/login
   pages. Link out only (`rel="noopener noreferrer"`), never iframe them, never include credentials,
   and never show real customer data in screenshots. Support a `redacted: true` flag per project.
3. **Must not look AI-generated.** See section 5 (anti-template rules). This is a hard requirement.
4. **Performance and accessibility are features.** Targets: Lighthouse Perf >= 90 desktop / >= 80 mobile,
   A11y >= 95, Best Practices >= 95, SEO >= 95.

---

## 1. Concept: "The Test Run"

The whole site is framed as a QA engineer's test run. It is a real idea about his job, not a theme skin.

- **Preloader:** a terminal-style suite runner. `RUNNING SUITE 12/47 ... 47/47 PASSED` then a
  wipe reveals the site. (The inspiration site uses a preloader with status text like
  "SYNCHRONIZING CORE" and "DECODING CASE STUDY"; keep that idea, but with QA language.
  Case-study route transitions say `LOADING TEST REPORT`.)
- **Hero 3D scene, the "Coverage Field":** a perspective grid of instanced tiles, each tile is a test case.
  On load, tiles start red/amber (failing), then a green "pass" wave sweeps across the field.
  Cursor hover creates a "regression": nearby tiles flip red, then self-heal after ~1.2s.
  Scroll drives camera dolly and tile tilt. This is the signature moment of the site.
- **Easter egg (optional, cheap):** 3 tiny glitch "bugs" wander the field. Clicking one squashes it,
  and a counter in the footer reads `BUGS CAUGHT: n` (session only).
- **Case studies are test reports** with anchor sections (see section 4).

## 2. Content (source of truth)

**Identity**
- Name: Rupesh Mahat
- Title: Quality Assurance & Automation Engineer
- Location: Palanse, Bhaktapur, Nepal
- Email: rmmahat2010@gmail.com
- Phone: 9768407212 (render as click-to-reveal to reduce scraping)
- LinkedIn: https://linkedin.com/in/rupesh-mahat
- GitHub: https://github.com/Rupesh2001
- Languages: Nepali, English, Hindi

**Profile (rewrite in a confident, plain, first-person voice, 2 to 3 sentences, no buzzword pile):**
Self-motivated QA professional who works well under pressure and deadlines, adapts quickly,
and collaborates closely with developers.

**Experience (render as a "run log", newest first)**
1. QA & Automation Engineer, Danfe Solution Pvt. Ltd. (Sinamangal), Apr 2025 to Present
   - Manual + automation testing: Selenium with Python, Postman API testing, JIRA defect management, JMeter performance testing
   - Wrote test cases, scenarios, and reporting workflows for cart, billing, inventory, order management, restaurant POS
   - Analyzed requirements, found edge cases, covered functional and non-functional areas
   - Documented defects clearly and worked with teams to improve quality and UX
2. Support Engineer, Danfe Solution Pvt. Ltd. (Sinamangal), dates: TODO
   - Client technical support: printer connectivity, drivers, configuration; installs, updates, troubleshooting
   - Documented issues and solutions; escalated complex cases to internal teams
3. QA Intern, Search Eyes Business Solution (Bhaktapur), Dec 2024 to Apr 2025
   - Validated ERP and transactional workflows (accounting, HR, inventory)
   - Responsive UI/UX testing across devices; payment (cash/card), order processing, data integrity checks
   - Jira, Excel, API tools; Agile/Scrum sprints with developers

**Skills (group as a "test matrix", not a generic progress-bar list; no fake percentages)**
- Testing: Manual, Test Planning and Test Cases, Bug Tracking and Reporting, Regression, Integration
- Automation: Selenium WebDriver, Python, PyTest/Unittest, Page Object Model
- API and Performance: Postman, JMeter
- Tools: Jira, Trello, Git, Excel
- Languages and Data: Java, PHP, JavaScript, HTML, MySQL, PostgreSQL, Oracle

**Education**
- Bachelor in Information Technology Management, Kantipur College of Management and Information Technology (completed)
- +2 Management, Modern College of Management, Bhaktapur (2075 BS)
- SLC, Gundu English Secondary School, Bhaktapur (2072 BS)

**Training** (word carefully; do NOT claim an ISTQB certification)
- Quality Assurance, Mindrisers Institute of Technology: manual + Selenium/Python automation, mobile app testing (Android Studio), Jira and Trello
- "Automation Engineer ISTQB" course, Mindluster: Selenium WebDriver with Python, PyTest/Unittest, waits, assertions, test data, reusable functions, Page Object Model. Label it as a **course**, not a certification.

**Other:** College project, Money Transfer Service app built in Java.

**Projects** (these become case studies; slug in backticks)

| Slug | Name | Live link | Notes from CV |
|---|---|---|---|
| `hs-admin` | HS Admin System | https://hs.danfesolution.com/Admin | Description TODO (admin panel; ask owner what "HS" stands for, leave TODO) |
| `restro-pos` | Restaurant POS | http://restro.danfesolution.com/sf/sfLogin.aspx?ReturnUrl=http://restro.danfesolution.com/ | Restaurant POS, table/online/take-away orders, billing (http only, add a small "insecure link" note) |
| `cloud-restro-order` | Cloud Restro Order | https://cloud.restroorder.com | Table orders, online orders, take-away, order updates, accurate billing and order history |
| `nso-app` | NSO App | https://nso-app.danfesolution.com | Description TODO |
| `bricx-erp` | BricX ERP | none | Functional, integration, regression across User Mgmt, HR, Inventory, Reporting; journal vouchers, Daybooks, Payable/Receivable. Tools: Manual, Excel, Jira |
| `phat-food-order` | Phat Online Food Order | none | Guest + customer flows, order placement, cash/card payment, tracking, order history. Tools: Manual + Automation, Figma, Excel, Jira |
| `ecommerce-nepal-usa` | E-commerce (Nepal to USA) | none | Cross-border checkout, cash/card, registration, local + international shipment tracking. Tools: Manual + Automation, Jira, Excel |
| `jilla-bachat` | Jilla Bachat | none | Bank transaction recording, main branches and sub-accounts, financial reports, role-based access. Tools: Manual, Excel, Jira |
| `qr-digital-menu` | QR Digital Menu | none | QR access for hotels/restaurants, display, links, mobile compatibility. Tools: Manual, Excel |

Put all of this in `src/data/projects.ts` and `src/data/profile.ts` as typed objects. Pages render from data only.

## 3. Reference site analysis (what to match)

Reference: https://rachmat-portfolio.vercel.app (a QA/dev portfolio built with Next.js).
Observed: minimal two-link nav (Home, Projects), a preloader with uppercase status text,
a projects archive ("Work Gallery"), per-project case-study pages with **hash-anchored sections**
(e.g. `#coverage`), and a footer with **Sitemap** and **Connect** columns plus a one-line
tech credit. The page content is client-rendered, so exact visuals could not be scraped.
Match its **structure, restraint, and premium/high-performance tone**, not its pixels. Do not copy its
code, copy, or layout literally. Make it clearly a different site.

Match: minimal nav, preloader, archive page, case-study anchors, footer sitemap/connect, smooth scroll, fast.
Differ: concept (test run), palette, typography, 3D scene, motion language, copy voice.

## 4. Information architecture

Routes (React Router):
- `/` Home: Hero (Coverage Field) > Profile > Run Log (experience) > Test Matrix (skills) > Selected Work (4 to 6 cards) > Training and Education > Contact
- `/work` Work archive: filter chips (All, Web apps, ERP, E-commerce, Restaurant/POS), grid/list toggle
- `/work/:slug` Case study "test report", sticky side index, sections with ids:
  `#overview` `#scope` `#coverage` `#scenarios` `#defects` `#tools` `#outcome`
  - Coverage: a small animated bar/grid per module (R3F mini scene or SVG; SVG is fine and lighter)
  - Scenarios: table of sample test cases (ID, scenario, type, status)
  - Defects: severity breakdown chart (values from data or TODO, never invented)
  - Deep links like `/work/restro-pos#coverage` must scroll to the section on load
- `*` 404 styled as a failed test: `404 - EXPECTED PAGE, RECEIVED NOTHING`

Global: header (name mark + Home, Work, Contact), footer (Sitemap, Connect, small credit line,
bug counter), `Download CV` button (place `Rupesh_Mahat_CV.pdf` in `public/`).

## 5. Design system (be opinionated, avoid template look)

**Palette (CSS variables in `:root`)**
- `--ink: #0d0e0b` (background, warm near-black, not pure black)
- `--bone: #ece8dc` (primary text)
- `--pass: #c8f03a` (single accent, "test passed")
- `--fail: #ff4d2e` (used sparingly, only for bugs/regressions)
- `--amber: #f2b632` (in-progress/warn)
- `--line: rgba(236,232,220,.14)` (hairlines)
- Also ship a light "paper" theme (bg `#ece8dc`, text `#0d0e0b`) with a toggle; respect `prefers-color-scheme`.

**Type (self-host with Fontsource, no Google CDN)**
- Display: Instrument Serif (large, tight, with italic emphasis words)
- Body: Bricolage Grotesque (variable)
- Labels/data: JetBrains Mono (uppercase, tracked, small)

**Anti-template rules (enforce)**
- No purple/blue gradients, no glassmorphism cards, no glowing orbs, no floating emoji, no "Hi, I'm ... 👋".
- No three-equal-cards row as the main layout. Use an asymmetric 12-col grid, offset headings,
  oversized numerals, hairline rules, and a visible layout grid overlay toggle (press `G`).
- Copy: short, concrete, specific verbs. Ban phrases: "passionate", "cutting-edge", "seamless",
  "elevate", "crafted with passion", "in today's fast-paced world".
- Buttons and links: underline-draw and text-swap hover, not scale-up + shadow.
- Cards: no rounded-2xl + shadow-lg. Use square corners or 2px radius with hairline borders.
- Every list item, label, and status uses mono microcopy like `[PASS]`, `TC-0142`, `SEV-2`.
- Custom cursor only on desktop fine-pointer devices; a small square that inverts over content. Never hide the native cursor on touch.

**Motion**
- Lenis smooth scroll + GSAP ScrollTrigger for pinned/parallax moments. Keep easing consistent (`power3.out` / `expo.inOut`).
- Split-text reveals on headings (write a small helper, avoid paid GSAP plugins).
- Page transitions: a horizontal "scanline" wipe with the `LOADING TEST REPORT` text.
- Honor `prefers-reduced-motion`: disable Lenis, replace wave/camera motion with a static passed state.

## 6. Three.js implementation notes

- Use `@react-three/fiber` + `@react-three/drei`. One `<Canvas>` for the hero only, lazy-loaded (`React.lazy` + `Suspense`), with `dpr={[1, 1.75]}` and `frameloop="demand"` when off-screen (IntersectionObserver).
- Coverage Field: a single `InstancedMesh` (about 30x18 = 540 tiles, thin boxes). Drive per-instance color/height with a `Float32Array` updated in `useFrame`; avoid React state in the loop.
- Pass wave: radial distance from origin against time; regression: pointer raycast against an invisible plane, radius 2.5 tiles, heal timer per tile.
- Camera: perspective, slight top-down tilt, dolly on scroll via a shared scroll value (from Lenis).
- Optional postprocessing: subtle noise + very light chromatic aberration only when a regression happens. Skip entirely on mobile.
- **Fallbacks:** detect WebGL failure, low-power devices (`navigator.hardwareConcurrency <= 4` or small viewport) and reduced motion; render a static CSS/SVG grid version of the hero. The site must be fully usable without WebGL.
- Dispose geometries/materials on unmount. No console warnings in production build.

## 7. Project setup (run these; fix peer-dep issues by aligning versions, never `--force`)

```bash
npm create vite@latest rupesh-portfolio -- --template react-ts
cd rupesh-portfolio
npm install
npm install react-router-dom three @react-three/fiber @react-three/drei @react-three/postprocessing gsap lenis
npm install @fontsource/instrument-serif @fontsource-variable/bricolage-grotesque @fontsource-variable/jetbrains-mono
npm install -D tailwindcss @tailwindcss/vite @types/three
```

- Tailwind v4 via `@tailwindcss/vite` plugin in `vite.config.ts` (no `tailwind.config.js` needed; define tokens in `@theme` inside `src/index.css`).
- Path alias `@` to `src` (both `vite.config.ts` and `tsconfig.app.json`).
- Add `.nvmrc` containing `20`, and set `"engines": { "node": ">=20" }` in `package.json`.
- Add `public/favicon.svg` (a small square split half `--pass`, half `--fail`), `public/og.png` (1200x630, generate a simple static one), `public/robots.txt`, `public/sitemap.xml`.

Suggested structure:
```
src/
  main.tsx  App.tsx  index.css
  data/ profile.ts projects.ts
  components/ Preloader Header Footer Cursor SplitText Marquee ProjectCard CoverageBars ScenarioTable
  three/ HeroScene.tsx CoverageField.tsx Fallback.tsx
  pages/ Home Work CaseStudy NotFound
  hooks/ useLenis useReducedMotion useInView
  lib/ scroll.ts seo.ts
```

## 8. SEO, meta, a11y

- Per-route `<title>` and meta description via a tiny `useSeo` hook (or `react-helmet-async`). Add Open Graph + Twitter tags, canonical URL, and `Person` JSON-LD (name, jobTitle, sameAs LinkedIn/GitHub).
- Semantic landmarks, skip-to-content link, visible focus rings (`--pass` outline), 4.5:1 contrast minimum, all 3D content marked `aria-hidden` with a text equivalent.
- Keyboard: every interactive element reachable; `G` grid toggle and theme toggle have buttons too.

## 9. Netlify deployment (free tier)

Create these at the repo root:

**`netlify.toml`**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

# SPA fallback so /work/:slug and hash deep links work on refresh
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

Also add `public/_redirects` containing `/*    /index.html   200` as a fallback.

**Deploy steps to print at the end (write them into `README.md` too):**
1. `git init && git add . && git commit -m "Initial portfolio"`; create a GitHub repo and push.
2. Netlify dashboard > Add new site > Import from Git > pick the repo. Build command `npm run build`, publish dir `dist` (auto-read from `netlify.toml`). Deploy.
3. Site settings > Change site name to something like `rupesh-mahat-qa`, giving `rupesh-mahat-qa.netlify.app`.
4. CLI alternative: `npm i -g netlify-cli && netlify login && npm run build && netlify deploy --prod --dir=dist`.
5. After deploy, update canonical URL, `og:url`, and `sitemap.xml` with the real domain, and commit (auto-redeploys).

## 10. Definition of done

- [ ] `npm run build` passes with zero TypeScript errors and no console warnings; `npm run preview` works
- [ ] All routes work on hard refresh, including `/work/restro-pos#coverage`
- [ ] Preloader, Coverage Field, case-study anchors, footer sitemap/connect, CV download all working
- [ ] Reduced-motion and no-WebGL fallbacks verified
- [ ] Mobile layout checked at 360px, 768px, 1280px, 1920px
- [ ] Every `TODO` listed in the final message so the owner can fill them in
- [ ] `README.md` with run, build, deploy, and how to edit `projects.ts`

**Final message format:** 5 lines max: what was built, assumptions made, list of TODOs, the deploy commands, and the local URL.