# KhaiBuilds — Portfolio Website

A responsive, bilingual (English/Vietnamese) **self-developed** portfolio built with Astro and TypeScript.

**Live demo:** https://khaibuilds.com/  
**Public source:** https://github.com/khaibuilds/khaibuilds-web  
**Technical case study:** [Problem, implementation, verification and limitations](docs/khaibuilds-web-case-study.md)

This is **not a paid client project**. The repository demonstrates source organization and repeatable checks, not unverified client outcomes.

## What it demonstrates

- English at `/` and Vietnamese at `/vi/`.
- Static responsive pages with separated routes, layouts and content.
- Explicit attribution of showcased projects as self-developed.
- Technical SEO basics, static QA, and protected external links.
- GitHub Actions, reproducible dependency installation and a SHA-pinned 9×9 Foundation verifier.

## Run and verify locally

**Stack:** Astro · TypeScript · CSS · GitHub Actions · Cloudflare Pages  
**Requirement:** Node.js 22.12 or newer.

```sh
npm ci
npm run check
npm run build
node scripts/g5-qa.mjs
npm run dev
```

`npm run build` writes the static site to `dist/`. Run `g5-qa.mjs` **after** building; it validates generated output.

## Where to look

- `src/pages/` — English and Vietnamese routes.
- `src/layouts/`, `src/styles/` — shared layout and styling.
- `src/data/projects.ts` — verified portfolio attribution and deliberately public links.
- `.github/workflows/ci.yml` — dependency, source, build and static QA checks.
- `.github/foundation/` — pinned static-site verification.
- `scripts/g5-qa.mjs` — static build-output QA.
- `docs/khaibuilds-web-case-study.md` — reproducible evidence and trade-offs.
- `docs/g5-project-evidence.md` — public-safe showcase attribution.

## Quality and release boundaries

CI indicates whether the source and generated pages satisfy the configured checks. It does **not** prove production deployment, cross-device browser QA, uptime or complete accessibility compliance.

The showcased 9×9 products are **self-developed**, not paid commissions. Their private source remains private. Changes to `main` and production release require separate approval and post-release verification.

## Contact and reuse

**Contact:** hi@khaibuilds.com

No open-source license is granted for this repository unless one is explicitly published. Third-party dependencies retain their own license terms.
