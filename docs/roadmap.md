# AI Greener — Development Roadmap

This document tracks planned improvements, new experiments, and technical debt discovered during code audits.

## Technical Debt (From Audit)

These items were identified during the initial codebase audit and should be addressed to maintain the project's "lightweight" philosophy.

### High Priority

- [ ] **Dynamic imports for TensorFlow.js**: Refactor `webcam-object-detection` and `webcam-pose-detection` to use dynamic `import()` for `@tensorflow/tfjs`, `@tensorflow-models/pose-detection`, and related packages. Currently these heavy libraries may be bundled eagerly.
- [ ] **Move `playwright` to devDependencies**: Currently listed under `dependencies` in `package.json` (line 70). Should be in `devDependencies` as it's a testing tool.
- [ ] **Add E2E test script**: Add `"test:e2e": "playwright test"` to package.json scripts for CI/CD integration.

### Medium Priority

- [ ] **Consolidate date libraries**: Both `date-fns` and `dayjs` exist in dependencies. Migrate all usage to `date-fns` and remove `dayjs`.
- [ ] **Consolidate validation libraries**: Both `yup` (Bank Transactions) and `zod` (Firebase Auth, Content Collections) exist. Migrate Bank Transactions from Yup to Zod and remove `yup`.
- [ ] **Evaluate `react-router-dom` usage**: Movie App and Currency Explorer use React Router for sub-routing within islands. Evaluate migrating to Astro's native file-based routing with sub-pages in `src/pages/movie-app/` and `src/pages/nbp-currency-explorer/`.
- [ ] **Register URL Scraper in portfolio**: The `/url-scraper` page and `api/scrape.ts` endpoint exist but are not listed in `portfolioItems` in `src/site.config.ts`.

### Low Priority

- [ ] **Remove `isomorphic-fetch`**: Modern Node.js (18+) includes native `fetch`. The Vite alias (`node-fetch` → `isomorphic-fetch`) in `astro.config.ts` may no longer be necessary.
- [ ] **Remove `core-js`**: With the target browsers likely supporting ES2020+, `core-js` polyfills may be unnecessary.
- [ ] **Audit DaisyUI usage**: `daisyui` is listed as a dependency but the primary UI system is Shadcn/Radix. Verify if DaisyUI is actively used; if not, remove it.

---

## Planned Experiments

New micro-apps to expand the laboratory. Each should follow the [Adding a New Experiment checklist](../AGENTS.md#4-adding-a-new-experiment-checklist).

| Experiment Idea | Category | Key Technology | Status |
| :--- | :--- | :--- | :--- |
| *To be defined* | 🧠 AI/ML | — | 💡 Idea |

---

## Infrastructure Improvements

- [ ] **CI/CD Pipeline**: Set up GitHub Actions for automated linting, type checking, and E2E tests on pull requests
- [ ] **Lighthouse CI**: Add automated performance auditing to catch bundle regressions
- [ ] **Content Collections v2**: Evaluate migration to Astro Content Layer (Astro 5.x) when upgrading

---

## Completed

- [x] Initial `AGENTS.md` and `docs/` infrastructure (July 2026)
- [x] SEO architecture with per-page OG metadata and JSON-LD support
- [x] i18n setup (en/pl) with Astro routing
- [x] Firebase Auth flow with Netlify Functions
- [x] Supabase integration for RAG assistant
