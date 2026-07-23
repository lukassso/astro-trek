# AI Greener — Experiment Registry

> *Each experiment "greens" a complex technology — making it lighter, fresher, and accessible.*

This document is the single source of truth for all micro-applications in the AI Greener laboratory. When adding a new experiment, register it here AND in `src/site.config.ts` (portfolioItems) and `src/config/pages.ts` (pagesData).

## Categories

| Icon | Category | Description |
|------|----------|-------------|
| 🧠 | AI / Machine Learning | Experiments using AI models, LLMs, or computer vision |
| 📊 | Data Visualization | Apps fetching and visualizing external data |
| 📦 | State Management | Demos of different state management patterns |
| 🎨 | Animation & UI | Visual experiments with advanced CSS, SVG, or motion libraries |
| 🔐 | Auth & Security | Authentication flows and security patterns |

---

## 🧠 AI / Machine Learning

### 1. Real-Time Object Detection
- **Path**: `/webcam-object-detection`
- **Source**: `src/features/webcam-object-detection/`
- **What it teaches**: Running ML models (COCO-SSD) directly in the browser using TensorFlow.js. No server needed — the model runs on the user's GPU via WebGL.
- **Key tech**: TensorFlow.js, COCO-SSD model, react-webcam
- **Hydration**: `client:only="react"` (requires browser APIs)

### 2. Real-Time Pose Detection
- **Path**: `/webcam-pose-detection`
- **Source**: `src/features/webcam-pose-detection/`
- **What it teaches**: Human pose estimation in the browser. Detects body keypoints (shoulders, elbows, knees) in real-time from webcam feed.
- **Key tech**: TensorFlow.js, MoveNet pose detection model
- **Hydration**: `client:only="react"` (requires browser APIs)

### 3. Playground AI (ChatGPT Interface)
- **Path**: `/dashboards/playground-ai`
- **Source**: `src/features/dashboards/playground-ai/`
- **What it teaches**: Building a user-facing LLM interface with adjustable model parameters (temperature, max tokens). Demonstrates the secure proxy pattern — API keys never leave the server.
- **Key tech**: OpenAI SDK, @ai-sdk/react, Shadcn UI
- **API endpoints**: `src/pages/api/ask-open-ai.ts`, `src/pages/api/openai.ts`
- **Security pattern**: Client → Astro SSR endpoint (with OPENAI_API_KEY) → OpenAI API

### 4. RAG Assistant (Retrieval-Augmented Generation)
- **Path**: `/rag-assistant`
- **Source**: `src/features/rag-assistant/`
- **What it teaches**: The RAG pattern — augmenting LLM responses with data from a custom knowledge base (Supabase). Demonstrates context retrieval, prompt engineering, and SQL generation.
- **Key tech**: Supabase, Gemini AI, context fetching
- **API endpoints**: `src/pages/api/ask-titanic.ts`, `src/pages/api/generate-idea.ts`

---

## 📊 Data Visualization

### 5. NBP Currency Explorer
- **Path**: `/nbp-currency-explorer`
- **Source**: `src/features/nbp-currency-explorer/`
- **What it teaches**: Fetching time-series data from a public API (National Bank of Poland), visualizing it with interactive charts, and building a multi-page SPA within an Astro island.
- **Key tech**: Chart.js, React Router, date-fns, SCSS
- **Data source**: NBP public REST API (no API key needed)

### 6. Movie App (TMDB)
- **Path**: `/movie-app`
- **Source**: `src/features/movie-app/`
- **What it teaches**: Building a feature-rich data-driven app with search, pagination, detail views, and loading states. Showcases MobX for observable state + React Query for server-state caching.
- **Key tech**: React Query (TanStack), MobX, React Router, Playwright (E2E tests)
- **API endpoint**: `src/pages/api/movies-api.ts`
- **State**: MobX stores for UI state, React Query for API cache

### 7. Random Person Generator
- **Path**: `/random-person`
- **Source**: Inline in page
- **What it teaches**: Simple REST API consumption with a polished UI. Generates random user profiles from randomuser.me API.
- **Key tech**: react-icons, REST API, Tailwind CSS

---

## 📦 State Management

### 8. Bank Transactions Dashboard
- **Path**: `/dashboards/bank-transactions`
- **Source**: `src/features/dashboards/bank-transactions/`
- **What it teaches**: Complex form handling with React Hook Form + Yup validation, combined with Context API + useReducer for CRUD operations. A complete dashboard with add, delete, and search.
- **Key tech**: React Hook Form, Yup, Radix UI, Context API, useReducer

### 9. Task Manager
- **Path**: `/task-manager`
- **Source**: `src/features/task-manager/`
- **What it teaches**: Redux Toolkit in practice — slices, actions, selectors, and the Redux DevTools workflow. A classic CRUD app with a modern Redux approach.
- **Key tech**: Redux Toolkit, react-redux, Context API

### 10. Hacker News Client
- **Path**: `/hacker-news`
- **Source**: `src/features/hacker-news/`
- **What it teaches**: Minimalist state management using Context API + useReducer (no external libraries). Fetching and displaying paginated data from the Hacker News API.
- **Key tech**: Context API, useReducer, REST API, Tailwind CSS

---

## 🎨 Animation & UI

### 11. Multi Select Component
- **Path**: `/multi-select`
- **Source**: Inline in page
- **What it teaches**: Building an accessible, keyboard-navigable multi-select component using headless UI primitives. Demonstrates the cmdk (Command Menu) pattern.
- **Key tech**: cmdk, Radix UI, Tailwind CSS

### 12. SVG Anime Universe
- **Path**: `/svg-anime-universe`
- **Source**: Inline in page
- **What it teaches**: Programmatic SVG manipulation — creating complex animations with moving circles using the SVG API and CSS animations. No animation library needed.
- **Key tech**: SVG API, CSS animations, TypeScript

### 13. Framer Parallax
- **Path**: `/framer-parallax`
- **Source**: Inline in page
- **What it teaches**: Scroll-driven animations with Framer Motion. Demonstrates the parallax effect pattern with `useScroll` and `useTransform` hooks.
- **Key tech**: Framer Motion, Tailwind CSS

---

## 🔐 Auth & Security

### 14. Firebase Authentication
- **Path**: `/firebase-auth/signin`
- **Source**: `src/pages/firebase-auth/`
- **What it teaches**: Complete authentication flow (sign in, sign up, password reset, third-party OAuth) using Firebase Auth. Server-side session validation with Firebase Admin SDK via Netlify Functions.
- **Key tech**: Firebase Auth, Firebase Admin SDK, React Hook Form, Zod validation
- **Server endpoints**: Netlify Functions in `netlify/functions/` (register, signin, signout, third-party-signin)
- **Security**: Client SDK for auth UI, Admin SDK (server-only) for session verification

---

## Unlisted Experiments

These exist in the codebase but are not registered in `portfolioItems`:

| Experiment | Path | API Endpoint | Notes |
|-----------|------|-------------|-------|
| URL Scraper | `/url-scraper` | `src/pages/api/scrape.ts` | Web scraping demo using Parsera API. Not in portfolio registry. |
