# Public release gate — privacy and source history

**Status:** NOT APPROVED FOR PUBLIC VISIBILITY. Completing normal PR review does not mean the Git history is privacy-safe.

## Two independent release decisions

1. The Owner authorized publication of only the reviewed 9×9 Foundation verifier vendored in this repository. The upstream Foundation repository stays Private.
2. The Owner chose **GitHub noreply** author identity and removal of old commit-email metadata from any repository intended to become Public.

## Required actions before changing visibility

1. On the KhaiBuilds GitHub account, enable **Settings → Emails → Keep my email addresses private** and verify the account-provided noreply address. For recent accounts this normally has the form `ID+USERNAME@users.noreply.github.com`. Configure any local Git author identities accordingly. ChatGPT's connected GitHub operations do not currently expose the account-email setting.
2. The current private repository's Git history includes commits authored with the account's Gmail address. **Adding a new commit, a `.mailmap`, or merging a normal PR will not remove the original metadata.**
3. A force-pushed rewrite is **not sufficient assurance** for this repo, because its prior pull requests can retain references to the old commits. Safest path: keep this repo **Private** as an archive, and create a truly fresh repository/history for the Public release. If preserving the exact `KhaiBuilds/khaibuilds-web` name is necessary, the Owner can first rename this Private repo to an archive name, then create a new empty Private repo under the desired name. Keep Cloudflare production separate until its dedicated approved migration.
4. Import only the approved working-tree files to the new clean repository with the confirmed noreply author identity; do **not** fork, transfer, merge histories, or copy `.git`.
5. Use `node scripts/public-history-gate.mjs` in a **complete, unshallow local clone with all branch/tag refs fetched**. It must PASS; independently inspect GitHub's commit history and PR references. A local log scan cannot prove absence of deleted, hidden, cached, or GitHub PR references.
6. Run Foundation check, `npm audit --audit-level=high`, build and live-preview QA on the new repository. Set and verify its `main` branch protections/required status checks when eligible. Request a separate, explicit Owner approval before making it Public.

**Never make this existing repository Public merely because the CI/self-tests are green.** Public visibility and production cutover are distinct approval gates.

## Why a fresh history is safer

GitHub documents that history rewrites can leave old commits accessible through cached SHA references and pull requests. Treat an old-repository rewrite as a specialist operation requiring an explicit plan, not a normal mergeable PR.

- GitHub Docs: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
- GitHub Docs: https://docs.github.com/en/account-and-profile/concepts/email-addresses
