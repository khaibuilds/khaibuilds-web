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
    for (const a of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
      assert(/rel="[^"]*noopener[^"]*"/.test(a[0]) && /rel="[^"]*noreferrer[^"]*"/.test(a[0]),
        "Unsafe external new-tab link: " + path);
    }
    assert(!html.includes("github.com/9x9vn/link-9x9") && !html.includes("github.com/9x9vn/9x9-tools"),
      "Private source link leaked: " + path);
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
  assert(contact.includes("data-copy-email=") && contact.includes("mailto:hi@khaibuilds.com"),
    "Missing contact actions: " + prefix);
  assert(home.includes("mailto:hi@khaibuilds.com?subject="), "Missing scoped CTA: " + prefix);
  assert(!/<form\b/.test(contact), "Unexpected personal-data form: " + prefix);
}
const langJS = read(join(dist, "lang.js"));
assert(langJS.includes("navigator.clipboard.writeText") && langJS.includes("localStorage") && langJS.includes("sessionStorage"),
  "Language and clipboard controls missing");
console.log("G5.4 static QA PASS: " + pages.length + " pages, " + entries.length +
  " indexable routes, EN/VI SEO, all local links, accessibility landmarks, privacy and security checks.");
