# KhaiBuilds — Portfolio Website

A responsive, bilingual (English/Vietnamese) website for KhaiBuilds, an independent digital project and services portfolio.

**Live website:** https://khaibuilds.com

This is a self-developed portfolio example, **not a paid client project**. The repository demonstrates implementation and verification practices; it does not imply any unverified client outcomes.

## What it demonstrates

- Static, responsive pages using Astro and TypeScript
- English at `/`, Vietnamese at `/vi/`
- Clearly scoped service pages and data-driven page content
- Semantic HTML, accessibility checks, technical SEO, sitemap and metadata
- Reproducible builds and CI checks using a SHA-pinned 9×9 Foundation static-web verifier

## Technology

Astro · TypeScript · CSS · GitHub Actions · Cloudflare Pages

## Run locally

Requires Node.js 22.12 or later.

```sh
npm ci
npm run check
npm run build
npm run dev
```

Production build: `npm run build` → `dist/`.

## Project structure

- `src/pages/` — routes in English and Vietnamese
- `src/layouts/` and `src/styles/` — layout and styling
- `src/data/` — public-facing service/domain data and a reviewed, owner-approved self-developed project registry
- `src/lib/` — content and contact helpers
- `public/` — static assets, security headers, robots and sitemap
- `.github/workflows/ci.yml` — build, source and artifact checks
- `.github/foundation/` — SHA-pinned static-web quality verifier

The domain catalogue is published as part of the website. It should not be interpreted as verified transfer availability or pricing. Privacy and terms pages must not be presented as finalized legal advice.

## Selected project evidence

The portfolio presents three **self-developed** projects, not paid client work: 9×9 Tools, KhaiBuilds Website and 9×9 LINK. Only the public KhaiBuilds Website repository is linked as source; the 9×9 repositories remain private. See `docs/g5-project-evidence.md` for source/deployment evidence and the remaining browser QA limitations.

## Quality and release

CI is evidence of a successful code check, **not** evidence that a Cloudflare production release or browser-level QA has passed. Production deployment is managed separately and requires approval and post-release checks.

## Contact

hi@khaibuilds.com

## Reuse

No open-source license is granted by this repository unless an explicit license is published. Third-party dependencies retain their respective licenses.
