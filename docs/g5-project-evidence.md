# KhaiBuilds G5.3 — Selected project evidence

**Review:** 2026-11-06 (Asia/Ho_Chi_Minh)  
**Scope:** Source, ownership context and Cloudflare deployment metadata, read-only.  
**Approval context:** The Owner requested G5.3 after the KhaiBuilds public GitHub profile had already identified these projects as selected work. Publication in this **feature branch** is provisional until the consolidated PR is approved for merge.

## Publication principles

- These are **self-developed** products from KhaiBuilds / 9×9, not paid client commissions. No client names, testimonials, revenue figures or fabricated performance data.
- Source code stays private for 9×9 Tools and 9×9 LINK. Showcase their already-public product URLs only; **never** link to their private repositories.
- `stage: live` means a deployment was evidenced, not that browser interaction, uptime, availability, all feature claims or Cloudflare production equivalence has passed manual QA.
- No private documents, account IDs, deployment IDs, secrets or credentials are rendered on the public site. This file is evidence for the PR, not public-facing copy.

## Project 1 — 9×9 Tools

- Product: https://tools.9x9.vn/
- GitHub source (private): `9x9vn/9x9-tools`, `main` = `eece6823eddacee6b4d8c4504501a9882aca1e30`.
- README enumerates browser utilities including text, QR, Vietnamese lunar calendar, date tools and image editor.
- Cloudflare Workers: script `toolshome`, deployment `0408a3d2-e02b-4820-9c8a-d7c7a4a84dd7`, created 2026-11-01 04:53 UTC, version traffic 100%. Exact source commit-to-Worker-version mapping **not independently verified**.
- Public profile `KhaiBuilds/khaibuilds` already lists 9×9 Tools.
- Allowed copy: a set of practical browser utilities demonstrating JavaScript UI and responsive workflow.
- Not claimed: that every utility and every device has passed live QA or that its source is public.

## Project 2 — KhaiBuilds Website

- Product: https://khaibuilds.com/
- Public source: https://github.com/khaibuilds/khaibuilds-web
- GitHub production branch `main` at `7746e4fb6442e45ef505e1deea86a274a7ba540d`.
- Cloudflare Pages `khaibuilds-web`: production deployment `b95a37f8-33ba-4d5d-9cad-7e64abb87023`, `main`, exact same SHA, deployment status success (2026-11-05 16:07 UTC).
- README documents Astro, TypeScript, EN/VI routes, SEO, CI and Foundation static-web gate.
- Allowed copy: bilingual static portfolio website showing code organization, responsive implementation and reproducible CI.
- Not claimed: paid client commission, conversion results or completed browser QA of this G5 preview.

## Project 3 — 9×9 LINK

- Product: https://link.9x9.vn/
- GitHub source (private): `9x9vn/link-9x9`; `main` = `f2d19213041002efd20663f07da33fa7d4975e80`.
- Cloudflare Pages `link-9x9`: production deployment `e88699ee-b258-4e0b-97ce-858d574f9637`, `main`, matching SHA, deployment status success (2026-10-27 11:08 UTC).
- README documents Google sign-in, account-managed link pages and Pages Functions / D1 architecture.
- Allowed copy: link-page product with Google sign-in and account management; demonstrates focused web workflows.
- Not claimed: source available publicly, security certification, private user-data details or guaranteed uptime.

## G5.4 browser QA still required

The external web browser retrieval attempted to open all three products, but failed. Direct HTTP from the execution sandbox also could not resolve the domains. This is **an observation limitation of the tools**, not evidence that the websites are down.

Before merging, manually verify on mobile and desktop: product URLs resolve, displayed portfolio card destinations match, source link is public, EN/VI content is accurate, links open safely, responsive layout is usable, and no private repo paths appear in the rendered HTML. Also verify that the production deployment remains mapped to the expected GitHub commit before reporting a published release.
