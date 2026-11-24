# 🚀 Next.js Sales Analytics Portal

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)

A full-stack **Next.js 14** sales analytics portal using the App Router with server-side rendered KPI dashboards and built-in REST API routes — deployable to Vercel in one click.

---

## 📌 Business Problem
React dashboards served as static SPAs require a separate backend server and suffer from SEO issues and slow initial load. This Next.js portal server-renders the executive KPI summary at request time (zero client-side data fetching latency) while providing a built-in `/api/sales` JSON endpoint for programmatic access.

## 🏗️ Architecture (App Router)
```
app/
├── page.tsx            → Server Component: SSR executive dashboard
└── api/
    └── sales/
        └── route.ts    → API Route: GET /api/sales → JSON response
```

## ⚡ Next.js Concepts Demonstrated
- **App Router** with file-based routing (no pages/ directory)
- **Server Components** for zero-JS server-side rendering
- **API Routes** (`route.ts`) as a built-in backend layer
- **TypeScript** strict typing throughout
- **Vercel-ready** deployment configuration

## 🚀 Run It
```bash
npm install
npm run dev
# Dashboard: http://localhost:3000
# API:       http://localhost:3000/api/sales
```

## 👤 Author
**Sourojit Kar** | [github.com/Jeet908](https://github.com/Jeet908)
