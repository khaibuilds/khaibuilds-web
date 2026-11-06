# KhaiBuilds Web QA Kit (GHP-3 candidate)

A **local-first browser QA tool** for mobile and desktop behavior checks. It complements, rather than duplicates, the 9×9 Foundation's source/build checks.

**Status:** Candidate on a feature branch. Not yet an independent public repository, production tool, paid client deliverable or certified accessibility scanner.

## Checks

- Actual browser navigation and HTTP status for explicitly listed routes.
- Unhandled JavaScript errors, console errors and failed same-origin resources.
- Title, HTML language, viewport metadata and one H1.
- Horizontal overflow at configured mobile and desktop widths.
- Screenshots and a structured JSON report with passed/failed checks.

Only explicit HTTP loopback origins (127.0.0.1, localhost) are allowed. No crawling, form submissions, credentials, arbitrary external sites or remote scans. Third-party requests are blocked.

## Setup and local test

Requires Node.js 22.12+.

```sh
cd qa/web-qa-kit
npm install --no-audit --no-fund
npx playwright install chromium
npm run test:unit
npm run test:browser
```

For an authorized local site on `http://127.0.0.1:4173`, update `qa.sample.json` paths, then run:

```sh
npm run qa
```

Generated screenshots and `report.json` are ignored under `reports/`. Exit codes: 0 means all checks passed, 1 QA findings, 2 setup or usage error.

The browser smoke test checks two healthy fixture pages in mobile and desktop viewports, and confirms that an intentionally broken fixture is detected. GitHub CI verifies browser behavior; local unit QA verifies input security boundaries and report generation.

## Limitations

This is **not** a full WCAG, security, SEO, cross-browser or live-uptime audit. A green run is not proof of production behavior. Screenshot artifacts may contain page content: run only against local authorized fixtures without customer secrets.

This feature branch is the staging area because the connected GitHub integration cannot create a dedicated repository. Move to a separate repo after Owner review. No open-source license is granted unless separately approved.
