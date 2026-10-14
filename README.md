# AI Greener (Astro⭐Trek) — Where Lightweight AI Experiments Grow

[![Netlify Status](https://api.netlify.com/api/v1/badges/36fc89c3-8170-4f88-985b-d2b60bf46c3f/deploy-status)](https://app.netlify.com/sites/zetkolek/deploys)

> A living laboratory and portfolio demonstrating the versatility of modern web engineering, lightweight in-browser AI, and the Astro Islands architecture.

---

## 🌟 Philosophy & Overview

**AI Greener** explores the boundary between high-performance static rendering and rich, interactive client applications:
- **Zero-Bloat Islands**: Each micro-application runs as an isolated React island inside a zero-JavaScript Astro static shell.
- **Accessible & "Greener" AI**: Running machine learning models directly on the client's GPU via WebGL without heavy backend inference costs.
- **Production-Ready Full-Stack**: Combining hybrid SSG/SSR rendering, serverless functions, multi-provider databases, and strict TypeScript verification.

---

## 🔬 Architectural & Technical Breakdown

### 1. ⚙️ Technical Stack & Software Development
- **Meta-Framework**: [Astro 4.x](https://astro.build/) configured in hybrid mode (`output: "hybrid"`).
- **Core Engine & Bundler**: Vite 5, Node.js 20 LTS, managed with **pnpm** (strict dependency locking).
- **Language & Typings**: **TypeScript 5.3** in strict mode (`strict: true`, `noImplicitAny: true`), with `@/*` path aliasing.
- **Code Quality & Tooling**:
  - `astro check` for template validation and cross-component type verification.
  - ESLint with plugins for Astro (`eslint-plugin-astro`), accessibility (`eslint-plugin-jsx-a11y`), and TypeScript ordering (`eslint-plugin-perfectionist`).
  - Prettier with automatic Tailwind class sorting and Astro formatting plugins.
- **Internationalization (i18n)**: Native Astro routing supporting English (`en`, default) and Polish (`pl`, prefixed `/pl/`).

---

### 2. 🏗️ Software Architecture & Islands Pattern
- **Astro Islands (Selective Hydration)**:
  - **Static Shell (SSG)**: Fast initial load, high Core Web Vitals, and zero unnecessary client JavaScript.
  - **Selective Hydration**:
    - `client:visible` for below-the-fold or on-demand components.
    - `client:only="react"` for browser-exclusive APIs (webcams, canvases, WebGL).
- **Domain-Driven Feature Layout**: Each experiment resides in an isolated directory inside `src/features/` with its own components, hooks, and local state.
- **Pluralistic State Management**: Showcases different state patterns suited to specific domain needs:
  - **Redux Toolkit**: Slice-based global state in `src/features/task-manager/`.
  - **MobX**: Reactive observable stores in `src/features/movie-app/`.
  - **TanStack React Query**: Server-state caching and synchronization.
  - **React Context + `useReducer`**: Complex form workflows and minimalist state machines (Bank Transactions, Hacker News).

---

### 3. 🗄️ Databases & Backend Services
- **Supabase (PostgreSQL)**:
  - Central data store for RAG (Retrieval-Augmented Generation) knowledge retrieval (e.g. Titanic dataset).
  - Utilizes database RPC stored procedures (`execute_sql`) for safe, controlled dynamic querying.
- **Firebase Platform**:
  - **Firebase Client SDK**: Authentication handling on the client (OAuth, email/password).
  - **Firebase Admin SDK**: Serverless session cookie verification, privileged authentication actions, and secure token validation.

---

### 4. ⚡ Hardware & Peripherals Integration
- **Client GPU Acceleration (WebGL)**:
  - **TensorFlow.js**: Uses `@tensorflow/tfjs-backend-webgl` for client-side neural network acceleration on the user's graphics processor (with CPU fallback).
  - **3D Graphics**: Three.js integration powered by `@react-three/fiber` and `@react-three/drei`.
- **Sensors & Video Hardware (Webcam)**:
  - Hardware camera streams via `react-webcam` and `navigator.mediaDevices.getUserMedia`.
  - Real-time frame processing on HTML5 `<canvas>` elements for computer vision models.
- **Hardware Peripherals (POS)**:
  - Includes drivers and SDK tools for **80MM Thermal Receipt Printers** (Bluetooth, COM/USB, Windows, Android, and iOS SDKs).

---

### 5. 🎨 Design System & UI / UX
- **Design Tokens & Tailwind CSS**:
  - Custom design tokens defined as CSS variables in `src/styles/theme.css` and mapped to Tailwind 3.4 utility classes (`primary`, `secondary`, `bgcolor`, `brcolor`).
  - Styled with DaisyUI and curated icon sets (Lucide React, Tabler Icons, Radix Icons).
- **Headless UI Primitives (Shadcn Pattern)**:
  - 25 accessible UI components in `src/components/ui/` built on **Radix UI** primitives using `class-variance-authority` (CVA) and `tailwind-merge`.
- **Theme Switching**:
  - Class-based dark mode (`[data-theme="dark"]`) with persistence via local storage and flash-free SSR initialization (`ThemeProvider.astro`).
- **Motion & Animations**:
  - **Framer Motion** for physics-based layout transitions and parallax effects.
  - Native SVG and CSS keyframe animations for zero-dependency graphic experiments.

---

### 6. 🧠 Algorithms & AI/ML
- **Computer Vision (Edge Deep Learning)**:
  - **COCO-SSD**: In-browser real-time object detection and classification across 80 object classes.
  - **MoveNet**: Real-time 17-keypoint human pose estimation from live webcam video.
- **Generative AI & NLP**:
  - **Text-to-SQL**: Natural language translation to structured relational PostgreSQL queries.
  - **RAG (Retrieval-Augmented Generation)**: Contextual enrichment of LLM prompts using vector/relational query results.
- **Data Structures & Algorithms**:
  - Classic computational geometry/interval algorithm implementations (e.g. `insert-interval` in `src/leet-code/`).
  - Time-series data transformations and statistical aggregation for exchange rate charts (NBP API + Chart.js).

---

### 7. 📐 Design Patterns
- **Islands Architecture**: Decoupling the static layout shell from interactive micro-frontends.
- **BFF / Secure Proxy Pattern**: Serverless endpoints (`src/pages/api/`) shield private API credentials (OpenAI, Gemini, TMDB, Parsera) from exposure to the browser.
- **Headless Component Pattern**: Separation of accessibility logic and state machines (Radix UI) from visual styling (Tailwind CSS).
- **Flux / Redux Pattern**: Predictable, unidirectional data flow with immutable state and dispatched actions.
- **Observer / Reactive Pattern**: Observable-driven UI updates in MobX and cache-driven updates in React Query.
- **Schema Validation Pattern**: Runtime contract enforcement on forms and APIs using **Zod** and **Yup**.

---

### 8. 🧪 Testing & Quality Assurance
- **End-to-End Testing (E2E)**:
  - Configured with **Playwright** for automated browser testing across Chromium, Firefox, and WebKit.
- **Static Verification**:
  - `pnpm check`: Full Astro and TypeScript type-checker covering components and pages.
  - Linting suites enforcing strict accessibility (a11y) and code cleanliness rules.
- **Data Integrity**:
  - Astro Content Collections validate MDX blog frontmatter at build time via strict Zod schemas (`src/content/config.ts`).

---

### 9. 🚀 Production, DevOps & Deployment
- **Deployment Platform**: **Netlify** powered by the official `@astrojs/netlify` adapter.
- **Hybrid Serving**:
  - Static pages deployed directly to Netlify's high-speed global Edge CDN.
  - Dynamic API routes (`src/pages/api/`) and auth flows (`netlify/functions/`) compiled into serverless functions (AWS Lambda).
- **Build & Optimization**:
  - Asset optimization and responsive image generation using **sharp**.
  - Automated XML sitemap generation via `@astrojs/sitemap` and RSS feed at `/rss.xml`.
  - Comprehensive OpenGraph and JSON-LD structured data generation per route (`src/config/pages.ts`).

---

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 20.x
- pnpm >= 9.x

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lukassso/astro-trek.git
   cd astro-trek
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in necessary keys (Firebase, Supabase, OpenAI, etc.).

4. **Run Development Server**:
   ```bash
   pnpm dev
   ```

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Start local Astro development server |
| `pnpm build` | Compile static pages and serverless endpoints for production |
| `pnpm preview` | Preview production build locally |
| `pnpm check` | Run type checking and template diagnostics across all `.astro` and `.ts` files |
| `pnpm format` | Format codebase using Prettier with Tailwind and Astro plugins |

---

<p align="center" style="padding-top: 40px;">Made with ❤️ for programming & accessible AI</p>
