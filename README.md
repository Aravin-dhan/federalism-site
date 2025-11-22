# Balamurugan · Federalism Under Siege

This repository powers Balamurugan's personal research notebook, newsletter-ready blog, and interview archive built with Astro v5, Tailwind CSS v4, and Keystatic (embedded mode). All content lives as Markdown/MDX in src/content/** and is mirrored to GitHub for Vercel deployments.

## Getting Started

`ash
npm install
npm run dev -- --host 0.0.0.0
`

Open http://localhost:4321/ for English or http://localhost:4321/ta for the Tamil landing page.

### Environment Variables

Create a .env with:

`nv
KEYSTATIC_USERNAME=admin
KEYSTATIC_PASSWORD=generate-a-strong-secret
KEYSTATIC_GITHUB_TOKEN=ghp_xxx
KEYSTATIC_GITHUB_REPO=Aravin-dhan/federalism-site
KEYSTATIC_GITHUB_BRANCH=main
`

- KEYSTATIC_USERNAME / KEYSTATIC_PASSWORD secure /keystatic and /api/keystatic using Basic Auth via src/middleware.ts.
- KEYSTATIC_GITHUB_* allow Keystatic to commit content edits back into this repo from the browser UI.

## Content Utilities

Two helper scripts make it easy to move between DOCX/Google Docs and the MDX collections:

| Script | Purpose |
| --- | --- |
| 
pm run import:docx -- --input path/to/file.docx --slug federalism-ch-01 --title "Chapter Draft" [--lang ta] [--draft false] | Converts any .docx (including Google Docs exports) into src/content/articles/<slug>/index.mdx, copies a placeholder hero image, and seeds frontmatter. |
| 
pm run export:docx -- --slug federalism-ch-01 [--output ./exports/ch-01.docx] | Reads the MDX article, strips imports, and writes a Word document to ./exports. |

> Tip: Google Docs → File → Download → Microsoft Word (.docx) and feed that into 
pm run import:docx.

All media assets stay co-located with the article folders to satisfy the offline-storage requirement. The public/ directory only contains globally shared images and downloadable PDFs.

## Site Structure

- **Homepage (/)**: Hero banner, latest writings grid, shareable quotes, and highlighted resources.
- **Writings (/writings)**: All articles pulled from the rticles collection.
- **Interviews (/interviews)**: Sorted list of ideos entries (YouTube/Podcast metadata).
- **Resources (/resources)**: Downloadable PDFs + dossiers from the esources collection.
- **Tamil mirrors (/ta, /ta/writings, /ta/interviews, etc.)** share the same data with localized UI strings for quick bilingual sharing.

## Keystatic Admin

Visit http://localhost:4321/keystatic (or the deployed /keystatic) and log in using the Basic Auth credentials defined above. All changes sync to GitHub using your PAT and can be deployed to Vercel automatically.

## Deployment

1. Push to main (git push origin main).
2. Connect Aravin-dhan/federalism-site to Vercel and set the same environment variables.
3. Vercel builds with the @astrojs/vercel adapter (Node 22). Static assets land under .vercel/output/static and serverless functions serve Keystatic + dynamic routes.

--

Questions or change requests? Open an issue or ping Balamurugan directly.
