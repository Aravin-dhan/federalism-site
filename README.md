# Balamurugan K · Federalism Under Siege

Astro v5 + Tailwind CSS v4 + TypeScript + Keystatic (embedded mode) power this bilingual personal site for Balamurugan K. The project ships static pages, a research blog, interview catalogue, and resource library that can be edited entirely through Git-backed content collections. Every article folder stores its own images to satisfy the “always keep two copies” requirement (GitHub + local clone).

---

## 1. Project Snapshot

| Feature | Implementation |
| --- | --- |
| **Site generator** | Astro 5 with the Vercel adapter (“server” output keeps `/keystatic` interactive). |
| **Styling** | Tailwind CSS 4 + custom theme (Playfair Display, Inter, Noto Serif Tamil; cream/slate/red palette). |
| **CMS** | Keystatic in embedded mode, protected by Astro middleware (Basic Auth). |
| **Content** | Astro Content Collections<br>• `articles` → folder-per-post `src/content/articles/<slug>/index.mdx`<br>• `pages` → static About/Manifesto/Contact files<br>• `resources` → downloadable PDFs/EPUBs<br>• `videos` → interview metadata (YouTube embeds). |
| **Localization** | Astro i18n (`en` default, `ta` Tamil). Navbar exposes `/ta` switch. Tamil text automatically gets the `font-tamil` utility. |
| **Accessibility** | WCAG AA contrast, semantic HTML sections, 18px base font, skip link, and a high-contrast toggle scaffolded in the layout. |
| **Deployment** | GitHub → Vercel (free tier). CI/CD triggers on pushes to `main`. |
| **Backups** | Local repo + GitHub remote + Keystatic Git commits keep ≥3 copies of each Markdown + asset. |

---

## 2. Prerequisites

- **Node.js 20 LTS** (Astro 5 + Tailwind 4 require an up-to-date ESM toolchain).
- **Git** with write access to `Aravin-dhan/federalism-site`.
- **GitHub PAT** (`repo` scope) for Keystatic’s Git-backed storage when editing in the browser.

---

## 3. Setup & Local Development

```bash
git clone git@github.com:Aravin-dhan/federalism-site.git
cd federalism-site
npm install
# Dev server + LAN preview
npm run dev -- --host 0.0.0.0
```

Visit:
- `http://localhost:4321/` – English landing page.
- `http://localhost:4321/ta` – Tamil landing page.
- `http://localhost:4321/keystatic` – Admin UI (prompts for Basic Auth).

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Astro dev server (includes Keystatic + Tailwind HMR). |
| `npm run build` | Production build (generates `.vercel/output`). |
| `npm run preview` | Preview the production build locally. |
| `npm run import:docx -- --input ./draft.docx --slug fiscal-crisis --title "Fiscal Crisis"` | Convert a Word/Google Doc export into an article folder with MDX + hero image placeholder. |
| `npm run export:docx -- --slug fiscal-crisis --output ./exports/fiscal-crisis.docx` | Turn an existing article back into a DOCX for editors who prefer Word. |

> **Tip:** Google Docs → *File → Download → Microsoft Word (.docx)*. Feed that file to `import:docx` to get frontmatter + Markdown inside `src/content/articles/<slug>/index.mdx`.

---

## 4. Environment Variables

Create a `.env` (never commit it) with:

```env
KEYSTATIC_USERNAME=<strong-username>        # Basic Auth user for /keystatic
KEYSTATIC_PASSWORD=<strong-password>        # Basic Auth password
KEYSTATIC_GITHUB_TOKEN=ghp_xxx              # PAT with repo scope
KEYSTATIC_GITHUB_REPO=Aravin-dhan/federalism-site
KEYSTATIC_GITHUB_BRANCH=main
```

Optional fallbacks for local experiments:

```env
ADMIN_USERNAME=<alt user>
ADMIN_PASSWORD=<alt pass>
```

Security Notes:

- `src/middleware.ts` enforces Basic Auth on `/keystatic` and `/api/keystatic`. If no env vars exist **and** `import.meta.env.DEV` is true, it falls back to `bala-admin` / `federalism@local`. Do **not** rely on that in production.
- Set the five `KEYSTATIC_*` variables in the Vercel dashboard so the deployed CMS can read/write.
- Never bake PATs or passwords into the repo or in client-visible code. Astro middleware keeps them server-side.

---

## 5. Content Model & Layout

```
├─ public/
│  ├─ images/…            # Global shared assets
│  └─ resources/…         # Uploaded PDFs/EPUBs/DOCX from Keystatic
├─ src/
│  ├─ components/         # Hero, Navbar, ArticleCard, ShareQuote, LanguageToggle, etc.
│  ├─ content/
│  │  ├─ articles/<slug>/index.mdx (+ local images)
│  │  ├─ pages/<slug>.mdx
│  │  ├─ resources/<slug>.mdx
│  │  └─ videos/<slug>.mdx
│  ├─ layouts/Layout.astro
│  ├─ middleware.ts       # Basic Auth guard for Keystatic
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ ta/index.astro
│  │  ├─ …
│  │  └─ keystatic/[...params].astro
│  └─ shims/direction-default.js  # Fixes Keystatic’s CommonJS dependency
├─ astro.config.mjs        # Astro + Tailwind + Keystatic + React integration
├─ keystatic.config.ts     # Collection schemas + GitHub/local storage toggle
└─ tailwind.config.mjs     # Theme tokens (colors + fonts)
```

### Collection Fields

- **Articles**
  - `title`, `slug`, `pubDate`, `updatedDate`, `author`, `tags[]`, `draft`, `category`, `heroImage`, `lang (en|ta)`, `summary`, `content (MDX)`.
  - Images uploaded in Keystatic land inside the same article folder thanks to the `directory/publicPath` settings.
- **Pages**
  - `title`, `slug`, `description`, `order`, `draft`, `lang`, `content`.
- **Resources**
  - `title`, `slug`, `description`, `file (PDF/EPUB/DOCX)`, `fileType`, `publishedOn`, `lang`, `tags[]`, `content`.
- **Videos**
  - Metadata for interviews (title, URL, description, date) surfaced on `/interviews`.

Frontmatter controls visibility:

- `draft: true` → only rendered in dev/CMS.
- `pubDate` in the future → filtered out of builds.
- `lang: 'ta'` → page appears on `/ta/...` routes with Tamil UI labels.

---

## 6. Styling, Accessibility & Localization

- **Theme** (configured in `tailwind.config.mjs` + `src/styles/global.css`):
  - `bg-paper` `#F7F5F0`, `text-slate` `#2C2C2C`, `accent-red` `#B93632`, `highlight-gold` `#C5A059`.
  - Font utilities: `font-serif` (Playfair Display), `font-sans` (Inter), `font-tamil` (Noto Serif Tamil).
- **Components**:
  - `Hero.astro` with split layout, CTA button, and ticker.
  - `ArticleCard.astro`, `ArticleHeader.astro`, `ShareQuote.astro`, `ShareCard.astro`, `LanguageToggle.astro`.
  - Navbar includes Writings, Interviews, Bookmarks, Resources, Contact, About, plus Tamil equivalents. Subtitle reads “Public Servant.”
- **Accessibility**:
  - Semantic landmarks everywhere (`<header>`, `<main>`, `<article>`, `<section>`).
  - 18px base font, 1.6 line-height, focus outlines enabled.
  - Buttons/links ship with `aria-label`s where text isn’t explicit.
  - Astro `<Image />` handles responsive/lazy-loaded images to keep Vercel bandwidth low.
- **Localization**:
  - Astro’s i18n routes deliver `/ta` automatically.
  - Tamil text uses `lang="ta"` + `font-tamil` so rendering is crisp on low-end Android browsers.

---

## 7. Keystatic Admin Flow

1. Run `npm run dev`.
2. Open `/keystatic` and authenticate (Basic Auth).
3. Edit entries. When you hit **Save**:
   - Dev/local: files update in `src/content/**` (trackable via `git status`).
   - Production: Keystatic commits via GitHub storage using your PAT.
4. Assets uploaded via Keystatic stay within the corresponding folder (`articles/<slug>`, etc.) to keep everything portable/offline.

### Known Issues & Fixes

| Symptom | Fix |
| --- | --- |
| `Outdated Optimize Dep` 504 for `/node_modules/.vite/deps` | Stop dev server, delete `node_modules/.vite`, then rerun `npm run dev`. Vite is configured with `optimizeDeps.noDiscovery = true` to avoid stale caches. |
| `No renderer for .js` when loading `/keystatic` | Ensure `@astrojs/react` integration remains enabled in `astro.config.mjs` (required because Keystatic’s UI uses React islands). |
| `lodash/debounce` / `direction` / `is-hotkey` export errors | Keep the aliases already defined in `astro.config.mjs` plus the shim `src/shims/direction-default.js`. Do not delete them during refactors. |
| “Keystatic credentials missing” (500) | Provide `KEYSTATIC_USERNAME` + `KEYSTATIC_PASSWORD` (or the `ADMIN_*` overrides) in your `.env`, or set `NODE_ENV=development` for the fallback credentials. |
| React “production mode but dead code elimination missing” | Leave the `process.env.NODE_ENV` define in `astro.config.mjs`. If you customize the Vite config, ensure it persists. |

---

## 8. Deployment Workflow (Vercel Free Tier)

1. **Push code**: `git push origin main`.
2. **Vercel project**: link to GitHub repo `Aravin-dhan/federalism-site`.
3. **Environment variables**: set all five `KEYSTATIC_*` secrets (and optionally `ADMIN_*` if you want overrides) in Vercel → Project Settings → Environment Variables.
4. **Review build**: Vercel runs `npm install && npm run build`.
5. **Backups**:
   - GitHub keeps history (primary remote backup).
   - Local clone keeps offline copy.
   - Keystatic GitHub storage ensures edits made through the CMS immediately hit Git history.

---

## 9. Maintenance Checklist

- [ ] Keep Node/npm updated (Astro frequently relies on latest features).
- [ ] Rotate `KEYSTATIC_*` credentials quarterly; update Vercel + local `.env`.
- [ ] Export DOCX archives of major posts via `npm run export:docx` and store them in your preferred cloud drive.
- [ ] Re-run `npm run build && npm run preview` before tagging releases to ensure Keystatic + Astro integrations stay healthy.
- [ ] Periodically review Lighthouse/axe scores for accessibility regressions.
- [ ] When updating dependencies, rerun `/keystatic` to confirm shims/aliases still satisfy Keystatic’s React bundle.

---

Need changes or support? Open an issue or ping the Balamurugan K media/research team.
