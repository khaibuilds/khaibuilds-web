// Node-only static artifact verifier, executed by CI after the Foundation build.
// @ts-nocheck
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const dist = "dist";
const site = "https://khaibuilds.com";
const routes = [
  "", "services", "projects", "domains", "about", "collaborate", "contact",
  "services/website-bug-fixes", "services/javascript-tools",
  "services/static-site-maintenance", "services/personal-websites", "services/android-apps"
];
const drafts = ["privacy", "terms"];
const languages = ["", "vi/"];
const read = path => readFileSync(path, "utf8");
function allFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(item => {
    const path = join(dir, item.name);
    return item.isDirectory() ? allFiles(path) : [path];
  });
}
const fileFor = pathname => join(dist, pathname.endsWith("/") ? pathname + "index.html" : pathname);
const expectedPages = new Set();
const expectedSitemap = new Set();
const inboundAnchorLinks = new Set();

for (const prefix of languages) {
  for (const route of [...routes, ...drafts]) {
    const path = "/" + prefix + (route ? route + "/" : "");
    const url = site + path;
    const file = fileFor(path);
    expectedPages.add(relative(dist, file).replaceAll("\\", "/"));
    assert(existsSync(file), "Missing generated page: " + path);
    const html = read(file);
    const isDraft = drafts.includes(route);
    const lang = prefix ? "vi" : "en";
    if (!isDraft) expectedSitemap.add(url);
    assert(html.includes('<html lang="' + lang + '"'), "Wrong lang: " + path);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, "Wrong h1 count: " + path);
    assert(html.includes('name="viewport"'), "Missing viewport: " + path);
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert(description && description.length >= 35, "Missing/short description: " + path);
    assert(html.includes('<link rel="canonical" href="' + url + '"'), "Wrong canonical: " + path);
    assert(html.includes('name="robots" content="' + (isDraft ? 'noindex,follow' : 'index,follow') + '"'), "Wrong robots: " + path);
    for (const [language, pfx] of [["en", ""], ["vi", "vi/"]]) {
      const alternate = site + "/" + pfx + (route ? route + "/" : "");
      assert(html.includes('hreflang="' + language + '" href="' + alternate + '"'), "Missing alternate " + language + ": " + path);
    }
    assert(html.includes('href="#main"') && html.includes('id="main"'), "Broken skip link: " + path);
    assert(html.includes("<header") && html.includes("<footer"), "Missing landmarks: " + path);
    for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
      const href = match[1].replaceAll("&amp;", "&");
      if (href.startsWith("#")) {
        if (href.length > 1) assert(html.includes('id="' + href.slice(1) + '"'), "Broken anchor: " + path + " -> " + href);
        continue;
      }
      if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (/^https?:\/\//.test(href) && !href.startsWith(site)) continue;
      if (!href.startsWith("/") && !href.startsWith(site)) continue;
      const pathname = new URL(href, site).pathname;
      assert(existsSync(fileFor(pathname)), "Broken local link: " + path + " -> " + href);
    }
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      const href = match[1].replaceAll("&amp;", "&");
      if (href.startsWith("/") || href.startsWith(site)) {
        const pathname = new URL(href, site).pathname;
        if (pathname !== path) inboundAnchorLinks.add(pathname);
      }
    }
    if (route.startsWith("services/")) {
      const mobileNav = html.split('class="mobile-links"')[1]?.split("</nav>")[0] || "";
      assert(mobileNav.includes('href="/' + prefix + 'services/" aria-current="true"'),
        "Missing parent service state in mobile nav: " + path);
      assert(mobileNav.includes('href="' + path + '" aria-current="page"'),
        "Missing active service sublink state in mobile nav: " + path);
    }
    for (const a of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
      assert(/rel="[^"]*noopener[^"]*"/.test(a[0]) && /rel="[^"]*noreferrer[^"]*"/.test(a[0]),
        "Unsafe external new-tab link: " + path);
    }
    assert(!html.includes("github.com/9x9vn/link-9x9") && !html.includes("github.com/9x9vn/9x9-tools"),
      "Private source link leaked: " + path);
  }
}

for (const prefix of languages) {
  for (const route of [...routes, ...drafts]) {
    const path = "/" + prefix + (route ? route + "/" : "");
    assert(inboundAnchorLinks.has(path), "Orphan route with no inbound anchor link: " + path);
  }
}

const pages = allFiles(dist).filter(file => file.endsWith("/index.html"))
  .map(file => relative(dist, file).replaceAll("\\", "/"));
assert.deepEqual(pages.sort(), [...expectedPages].sort(), "Unexpected HTML routes");
const sitemap = read(join(dist, "sitemap.xml"));
const entries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.equal(entries.length, new Set(entries).size, "Duplicate sitemap entries");
assert.deepEqual(entries.sort(), [...expectedSitemap].sort(), "Sitemap must match all indexable routes exactly");
for (const asset of ["favicon.svg", "robots.txt", "lang.js", "_headers"]) {
  assert(existsSync(join(dist, asset)), "Missing asset: " + asset);
}
const headers = read(join(dist, "_headers"));
for (const key of ["Content-Security-Policy:", "X-Content-Type-Options:", "Referrer-Policy:", "Permissions-Policy:"]) {
  assert(headers.includes(key), "Missing security header: " + key);
}
for (const prefix of languages) {
  const home = read(join(dist, prefix + "index.html"));
  const work = read(join(dist, prefix + "projects/index.html"));
  const contact = read(join(dist, prefix + "contact/index.html"));
  assert.equal((home.match(/class="card portfolio-card"/g) || []).length, 3, "Home portfolio count: " + prefix);
  assert.equal((work.match(/class="card portfolio-card"/g) || []).length, 3, "Work portfolio count: " + prefix);
  // G6: published Work entries must offer specific, bilingual implementation evidence.
  assert.equal((work.match(/class="project-proof"/g) || []).length, 3,
    "Missing implementation evidence in Work portfolio: " + prefix);
  assert(work.includes(prefix ? "Điểm triển khai nổi bật" : "Implementation highlights"),
    "Missing localized implementation evidence heading: " + prefix);
  const about = read(join(dist, prefix + "about/index.html"));
  assert(about.includes(prefix ? "Portfolio giới thiệu các sản phẩm web tự phát triển" : "My portfolio features self-developed web projects"),
    "About positioning does not reflect deployed self-developed work: " + prefix);
  assert(!about.includes("work in progress or practice"), "Outdated portfolio claim: " + prefix);
  const serviceHub = read(join(dist, prefix + "services/index.html"));
  for (const index of ["S1", "S2"]) {
    assert(serviceHub.includes('class="card-number">' + index + '</span>'),
      "Selective service numbering overlaps core services: " + prefix + index);
  }
  const personalSite = read(join(dist, prefix + "services/personal-websites/index.html"));
  assert(personalSite.includes(prefix ? "Thiết kế giao diện tùy biến" : "Custom visual design without an agreed reference"),
    "Personal-site scope must exclude unbounded visual design: " + prefix);
  assert(contact.includes("data-copy-email=") && contact.includes("mailto:hi@khaibuilds.com"),
    "Missing contact actions: " + prefix);
  assert(home.includes("mailto:hi@khaibuilds.com?subject="), "Missing scoped CTA: " + prefix);
  assert(!/<form\b/.test(contact), "Unexpected personal-data form: " + prefix);
  const domainsPage = read(join(dist, prefix + "domains/index.html"));
  assert(/\.collaboration-name\[[^\]]+\]:before\{/.test(domainsPage),
    "Missing collaboration domain indicator style: " + prefix);
  for (const legalRoute of drafts) {
    const legalHtml = read(join(dist, prefix + legalRoute + "/index.html"));
    assert(!legalHtml.includes("· draft") && !legalHtml.includes("· bản nháp"),
      "Draft marker still present on finalized legal page: " + prefix + legalRoute);
  }
}
const cssBundle = allFiles(dist).filter(file => file.endsWith(".css")).map(read).join("\n");
assert(/\.card-link\{[^}]*min-height:40px/.test(cssBundle) && cssBundle.includes(".mobile-sublink"),
  "Missing UI/UX CSS regression markers in CSS bundle");
const langJS = read(join(dist, "lang.js"));
assert(langJS.includes("navigator.clipboard.writeText") && langJS.includes("localStorage") && langJS.includes("sessionStorage"),
  "Language and clipboard controls missing");
console.log("G5/G6/G7/G8 static QA PASS: " + pages.length + " pages, " + entries.length +
  " indexable routes, EN/VI SEO, all local links, no orphan routes, mobile nav hierarchy, finalized legal notices, accessibility landmarks, privacy and security checks.");
