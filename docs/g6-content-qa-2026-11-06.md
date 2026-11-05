# KhaiBuilds G6 — Content & Credibility QA

**Date:** 2026-11-06 (Asia/Ho_Chi_Minh)  
**Repository:** `khaibuilds/khaibuilds-web`  
**Branch:** `feat/g6-content-credibility-20261106`  
**Base:** G5 production `main` at `0db8a05d624b4a0036beb4d90239a28ac907109c`  
**Release:** PR review only; no merge and no production change authorized.

## Scope of this change

1. **About EN/VI:** replace the misleading claim that published self-developed projects are merely "work in progress or practice." The wording now distinguishes published self-developed work from **paid client commissions** and does not invent clients or outcomes.
2. **Work EN/VI:** add two concise, factual implementation highlights per published project (9×9 Tools, KhaiBuilds Website, 9×9 LINK). Display these on the full Work pages, not on Home. Public product links and the *public* KhaiBuilds source repo remain unchanged; no private 9×9 repo links are disclosed.
3. **Services EN/VI:** label conditional services separately (S1/S2; "Selective service / Dịch vụ có chọn lọc"). Align the Vietnamese personal-website exclusions with the English constraints on design references and revision limits.
4. **Automated QA:** extend the existing G5/G6 build artifact verifier to check Work evidence, About positioning, separated service indexes, and aligned personal-site exclusions, on top of the existing 28-page bilingual route/link/SEO/legal checks.

## Evidence boundaries

- G5 project evidence is recorded in `docs/g5-project-evidence.md`. It supports deployment and described implementation, **not** every external project's full functional QA, user metrics, customer outcomes or guaranteed uptime.
- "Deployed" is a publication state. It is not a promise that every interaction has been independently tested.
- Privacy and Terms remain **draft** and `noindex`, per previously accepted G5 release conditions. Owner factual/legal review has **not** been completed in G6. Do not remove draft labels or imply legal sign-off.
- No new services, testimonials, pricing promises, private code disclosures, DNS settings or emails are introduced.
- The external site-fetch tool could not open live routes in this session. That access limit is **not** evidence of a website outage. Confirm preview deployment and use an actual browser before calling UI interactions PASS.

## Verification gates for the PR

- [ ] GitHub Actions at **final PR head SHA**: npm audit/history/Foundation checks, Astro check/build and G5/G6 static QA all pass.
- [ ] Cloudflare **preview** deployment succeeds and matches final PR head SHA; preview must not be mistaken for production.
- [ ] Manual EN/VI review of Home, Work, About, Services and personal-websites on narrow mobile and desktop: no clipping, overlong proof cards, broken language links, or misleading project claims.
- [ ] Public project links and public source link work; source code of private projects stays private.
- [ ] Test email compose and copy in a real browser, and perform an actual test email if mail delivery matters.
- [ ] Privacy/Terms factual/legal copy reviewed by Owner separately before treating as final.
- [ ] Owner explicitly approves merge and production release. After approval, compare main SHA and Cloudflare production SHA and independently check live pages.

## Review focus

- Is the level of implementation detail appropriate for an international freelance portfolio without overstating paid-client experience?
- Are "Selective service" and S1/S2 clearer than duplicate 01/02 numbering?
- Should Domains navigation remain primary? G6 does not move it because domain partnerships are a distinct Owner-approved activity and changing site navigation is not required to correct content.

**End state sought:** accurate bilingual claims and concrete project evidence with unchanged production and an auditable PR for Owner decision.
