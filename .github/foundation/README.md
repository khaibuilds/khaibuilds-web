# 9×9 Foundation — public provenance and scope

This repository includes a **vendored copy** of the 9×9 Foundation verification utility for reproducible, local CI checks of this static website. The full upstream `9x9vn/9x9-foundation` repository remains **Private** and is not a dependency fetched by this project's CI.

- Vendored file: `.github/foundation/verify.mjs`
- Original location: `9x9vn/9x9-foundation/tools/verify.mjs`
- Reviewed upstream commit: `e3f8cd798ad0500ae206e8614cfd65ed90c82eeb`
- Git blob SHA of identical verifier: `9030150bf2544fa7d64c1aef31d7b0bc45893824`
- Configuration: `foundation.config.json`
- Execution: `.github/workflows/ci.yml`
- Runtime: Node.js built-in modules; no direct third-party npm dependencies in the verifier

**Publication decision (2026-11-05):** the Owner of 9×9 and KhaiBuilds authorizes public disclosure of this *specific vendored verifier* as part of the KhaiBuilds portfolio source. This does not authorize disclosure of other Foundation modules, private repositories, infrastructure records, credentials, or internal operating documents. The decision does not by itself grant others a right to redistribute or commercially relicense the source. No repository-wide open-source license is implied.

This is a QA utility, **not** a security certification or production-release mechanism. It checks source consistency, likely secrets, and allowed static outputs. Security testing, legal review, live browser testing, and Cloudflare release approval remain separate.

Keep the verifier SHA-pinned and review upgrades explicitly.
