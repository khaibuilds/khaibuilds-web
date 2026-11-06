# Case Study — KhaiBuilds Portfolio Website

**Project:** Self-developed portfolio (not a paid client commission)  
**Demo:** https://khaibuilds.com/  
**Public source:** https://github.com/khaibuilds/khaibuilds-web

## Problem

Present technical work in English and Vietnamese without adding unnecessary server-side complexity. The site must keep project claims accurate, offer clear contact paths, support mobile layouts, and make code changes independently reviewable.

## Solution and trade-offs

- **Astro and TypeScript:** A mostly static site, with English at `/` and Vietnamese at `/vi/`.
- **Organized source:** Routes in `src/pages/`, shared layouts/styles, and project data in `src/data/projects.ts`.
- **Attribution gate:** Selected work is labeled as self-developed. Only intentionally public source is linked.
- **Static-first architecture:** Avoids maintaining a backend merely to serve a portfolio.
- **Reviewable delivery:** Feature branches, pull requests, automated checks, and separate release approval.

## Repeatable checks

Requires Node.js **22.12+**. After checkout:

```sh
npm ci
npm run check
npm run build
node scripts/g5-qa.mjs
```

The [GitHub Actions workflow](../.github/workflows/ci.yml) also performs dependency auditing, a clean-source/history gate, a pinned 9×9 Foundation static verifier, and assertions on bilingual routes, navigation, attribution, metadata, and static security markers.

## Acceptance evidence

| Requirement | Where to verify | Limitation |
| --- | --- | --- |
| EN and VI pages | `src/pages/`, generated `dist/`, CI route checks | Does not prove translation quality |
| Correct project attribution | `src/data/projects.ts` and CI project checks | Does not establish paid client experience |
| Static SEO and safe links | `scripts/g5-qa.mjs` and workflow assertions | Does not prove live rankings or full accessibility |
| Reproducible build | `npm ci`, `npm run check`, `npm run build` | Does not prove Cloudflare production is current |

## Honest verification status

This case study documents **available checks**, not the result of a check that has not run. Review the CI outcome attached to the specific pull request. CI passing does **not** establish browser-level QA, third-party security review, user satisfaction, or a production deployment.

Before release, manually verify representative mobile and desktop browsers, external links, and production-to-approved-commit mapping. No invented screenshots, performance metrics, testimonials, or client results are presented.
