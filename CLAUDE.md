# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server at http://localhost:3000
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — run `next lint` (extends `next/core-web-vitals`)

There is no test suite configured.

## Architecture

Next.js 14 App Router landing page (Spanish, `lang="es"`) for ArcoMob — a vendor of revestimientos alistonados (slatted wall panels) and molduras. TypeScript + Tailwind CSS. The only server-side surface is a single email-sending API route; there is no database or CMS.

- `app/layout.tsx` is the single root layout; it sets the Inter font, global metadata, and loads `app/globals.css`. Every page uses it.
- `app/page.tsx` is the home landing page and is composed by stacking section components from `components/` in a fixed order (Hero → Services → About → Portfolio → Comparison → Blog → Contact → Footer). Editing the landing page generally means editing one of those section components, not `page.tsx`.
- Other routes:
  - `app/cotizar/page.tsx` — quote-request form (client component). Submits to `/api/send-email` with `{ type: 'cotizacion', data }`.
  - `app/blog/page.tsx` and `app/blog/[id]/page.tsx` — blog list + post detail. Post data is hardcoded as in-file arrays (e.g. `blogPosts` in `app/blog/page.tsx`); there is no CMS.
  - `app/productos/[slug]/page.tsx` — product/catalog page driven by hardcoded data (e.g. `moldurasCategoriasOrden`, `moldurasSubcategoriaPreviewSrc`).
- `components/ContactSection.tsx` is the home page contact form; it submits to `/api/send-email` with `{ type: 'contacto', data }`.
- `app/api/send-email/route.ts` is the only backend. It is a Node-runtime route (`export const runtime = 'nodejs'`) that uses `nodemailer` over Gmail. Its `POST` handler accepts a discriminated union (`type: 'cotizacion' | 'contacto'`) — both forms go through this single endpoint, with separate HTML/text builders per type. When adding a new form, extend the `Payload` union and add a builder rather than creating a second route.
- `components/` holds the section components used by the home page plus shared `Header`/`Footer`. They are the primary edit surface for visual/content changes.
- Path alias `@/*` resolves to the repo root, so imports look like `import HeroSection from '@/components/HeroSection'`.
- Tailwind scans `app/`, `components/`, and `pages/`. The theme extends a `primary` color scale (sky blues) in `tailwind.config.ts`; prefer those tokens over arbitrary hex values for brand colors.
- Static assets live under `public/media/` (referenced as `/media/...`). Note: there is also an `app/media/` directory containing very large source images — these are not served by Next.js; assets meant to be served must be in `public/`.

## Environment

The email route reads three env vars (see `.env.local.example`):

- `GMAIL_USER` — Gmail address used as the SMTP sender (required)
- `GMAIL_APP_PASSWORD` — Gmail App Password, not the account password (required)
- `GMAIL_TO` — destination inbox; defaults to `GMAIL_USER` if unset

Without `GMAIL_USER` / `GMAIL_APP_PASSWORD` the route returns 500 with a Spanish error message — forms will fail in dev until `.env.local` is populated.

## Conventions

- UI copy is Spanish — keep new strings in Spanish to match. Server-side error messages returned from `/api/send-email` are also Spanish.
- Section components that use hooks (`useState`, `useEffect`) must start with `'use client'` (see `HeroSection.tsx`, `app/cotizar/page.tsx`). Server components by default otherwise.
- Use `next/image` for images and `next/link` for internal navigation, consistent with existing components.
