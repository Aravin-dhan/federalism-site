# Agent Runbook · Federalism Under Siege

This document keeps future agents aligned on the current status, guardrails, and operational checklists for the Balamurugan K site. Update it whenever you touch architectural pieces, secrets, or workflows.

---

## 1. Current State Snapshot (2025-11-22)

- **Framework**: Astro 5 + Tailwind 4 + TypeScript.
- **CMS**: Keystatic (embedded) served from `/keystatic`, secured by Basic Auth via `src/middleware.ts`.
- **Hosting**: GitHub → Vercel free tier. Builds succeed on Node 20.
- **Design**: Light mode only (cream background, slate text, brick-red accents), fonts Playfair/Inter/Noto Serif Tamil.
- **Content**:
  - Articles/pages/resources/videos live under `src/content/**` with co-located assets.
  - Tamil + English routes using Astro i18n (`/` and `/ta` trees).
- **Notable features**:
  - Navbar links: Writings, Interviews, Bookmarks, Resources, Contact, About (+ Tamil equivalents).
  - Contact page uses a simple form + `mailto:contact@irsbala.in` (phone/address intentionally blank).
  - Interviews link out to `https://www.youtube.com/@aramporulkalvi`.
  - Share feature shows CTA when users highlight article text (client-side script).

---

## 2. Local Dev Checklist

1. `npm install` (Node 20).
2. Create `.env` with `KEYSTATIC_USERNAME/KEYSTATIC_PASSWORD`. If absent, dev defaults `bala-admin` / `federalism@local` kick in.
3. `npm run dev -- --host 0.0.0.0`.
4. Test pages: `/`, `/ta`, `/writings`, `/interviews`, `/bookmarks`, `/resources`, `/contact`.
5. Test Keystatic:
   - `http://localhost:4321/keystatic`
   - Verify login prompt.
   - Create dummy draft entry; ensure assets land beside MDX file.
6. Run `npm run build && npm run preview` before pushing.

---

## 3. Secrets & Access

| Secret | Where | Notes |
| --- | --- | --- |
| `KEYSTATIC_USERNAME` | `.env`, Vercel env | Required to unlock `/keystatic`. |
| `KEYSTATIC_PASSWORD` | `.env`, Vercel env | Pair with username; rotate quarterly. |
| `KEYSTATIC_GITHUB_TOKEN` | `.env`, Vercel env | PAT with `repo` scope to allow browser-based commits. |
| `KEYSTATIC_GITHUB_REPO` | `.env`, Vercel env | Defaults to `Aravin-dhan/federalism-site`. |
| `KEYSTATIC_GITHUB_BRANCH` | `.env`, Vercel env | Defaults to `main`. |
| `ADMIN_USERNAME/ADMIN_PASSWORD` | optional `.env` | Legacy aliases the middleware also accepts. |

Never hard-code secrets in commits. For Vercel, set them under Project Settings → Environment Variables.

---

## 4. Keystatic / Vite Gotchas

- **React renderer required**: Keystatic UI uses React. Keep `@astrojs/react` in `astro.config.mjs`.
- **Optimize deps disabled**: `optimizeDeps.noDiscovery = true` prevents Vite from auto-prebundling Keystatic dependencies (which previously caused 504 errors). Do not remove unless you know the consequences.
- **Aliases & shims**:
  - `lodash/debounce` → `lodash-es/debounce`.
  - `direction` → `src/shims/direction-default.js`.
  - Keep `ssr.noExternal` list for `@keystatic/*` packages.
- **Basic Auth guard**: `src/middleware.ts` intercepts `/keystatic`, `/api/keystatic`. If you add new admin routes, include them in `PROTECTED_PREFIXES`.
- **Storage toggle**: `keystatic.config.ts` chooses GitHub storage when `NODE_ENV === 'production'`, otherwise local. Don’t accidentally run production builds without the GitHub token—Keystatic will error.

Troubleshooting quick refs live in the README (“Known Issues & Fixes”).

---

## 5. Content Operations

- **Articles**: `src/content/articles/<slug>/index.mdx` with `heroImage` placed in the same folder. Use `npm run import:docx` for long drafts.
- **Pages**: `src/content/pages/*.mdx` (About, Manifesto, Contact, Tamil counterparts). Keep `lang` field accurate so Astro serves them under `/` or `/ta`.
- **Resources**: Upload via Keystatic → stored in `public/resources`. Always provide `fileType`.
- **Videos/Interviews**: Maintain `src/content/videos` (YouTube metadata). Interview page automatically sorts by `pubDate`.
- **Bookmarks (Interesting Reads)**: Placeholder page exists; once the collection is defined, add Keystatic support before populating.
- **Dark mode**: Not implemented; palette intentionally light. If you introduce dark mode later, revisit color contrast + Tamil font handling.

---

## 6. Outstanding / Future Considerations

- [ ] Implement Bookmarks collection in Keystatic so Balamurugan can curate “Interesting Reads” from the CMS.
>- [ ] Add phone/address once communication team supplies final values (Contact page currently blank).
>- [ ] Consider adding RSS + newsletter automation (syndication requirement).
>- [ ] Evaluate storing DOCX exports in an additional cloud bucket for redundancy.

Keep this section updated whenever you finish or add tasks.

---

## 7. Hand-off Notes

- Always test `/keystatic` after dependency upgrades.
- Never push commits containing actual PATs or passwords.
- When referencing the principal publicly, use “Balamurugan K” (requested style guide).
- Replace any lingering references to `A.CHENNAIHOME` if they surface again.
- Accessibility > aesthetics: if in doubt, default to semantic HTML + WCAG AA contrast.

Happy shipping!
