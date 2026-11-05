# KhaiBuilds public release gate

**Status: PRIVATE — publication and production cutover are NOT approved.**

## Source and provenance

- This is a new KhaiBuilds repository with a clean initial commit, created independently of the private 9×9 code repositories.
- The current website source is an exact **32-file snapshot** imported without its previous `.git` history, pull requests, tags or branches.
- Imported source tree SHA (before this candidate's release-gate CI update): `b4023dbd16c67d49bc93853b0cad27bf2e6dfc78`.
- The original private archive is retained separately. **Never transfer/fork/merge Git histories from it.**
- The Owner approved publishing only the vendored verifier `.github/foundation/verify.mjs` from 9×9 Foundation. The upstream Foundation repository remains Private. See `.github/foundation/README.md` for provenance and scope.

## Author identity gate

GitHub confirmed that commits made via the KhaiBuilds connection now use
`318708838+khaibuilds@users.noreply.github.com`.
The initial repository commit and candidate import must independently satisfy this requirement; neither the original Gmail author identity nor its legacy commit history may appear in this Public candidate.

The `scripts/public-history-gate.mjs` utility checks all **locally reachable** commits for exact expected author email, and GitHub noreply committer metadata. This repo's CI checks out **full history** (`fetch-depth: 0`), runs self-tests and the actual history audit. A green workflow is necessary, not sufficient, for publication: also inspect GitHub PR refs and repository history before authorizing Public.

**Do not rely on a normal PR merge, future email settings or `.mailmap` to erase an old author's address.**

## Owner-controlled publication checklist

- [ ] New candidate PR: Foundation CI PASS at the exact HEAD commit, including `npm audit --audit-level=high`, Astro checks, output allowlist, history self-test and full history audit.
- [ ] Owner approves merge to this repository's `main` while it remains Private.
- [ ] After merge, GitHub CI PASS on `main`; independently verify all main ancestor commit author/committer emails and check PR references for legacy history.
- [ ] Review all Public-facing content and confirm no confidential docs, keys, internal admin addresses or unreleased plans are present.
- [ ] Configure and verify the GitHub Public repo's `main` branch protection (required status checks, PR reviews, no force-push), using an Owner-authorized change.
- [ ] Owner separately approves **Private → Public**; never treat a merge approval as visibility approval.
- [ ] Cloudflare source migration, preview testing, DNS/production cutover and rollback require a separate later Owner approval. The existing production source is unchanged.

The public project documents implementation work, not an externally certified security audit or a paid-client delivery. This repository does not grant an open-source license unless one is separately added.
