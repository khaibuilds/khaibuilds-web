// @ts-nocheck — standalone Node browser QA package; checked by its own tests/CI.
import {lstat, mkdir, realpath, writeFile} from 'node:fs/promises';
import {resolve, join, sep} from 'node:path';
import {parseConfig, assessPage} from './policy.mjs';

function filename(route, viewport, index) {
  const slug = route === '/' ? 'home' : route.replace(/^\/+|\/+$/g, '').replaceAll('/', '-');
  return String(index).padStart(2, '0') + '-' + slug + '-' + viewport + '.png';
}
export async function runAudit(rawConfig, {chromium, cwd = process.cwd()} = {}) {
  const config = parseConfig(rawConfig);
  if (!chromium) throw new Error('Playwright chromium launcher required');
  const root = await realpath(resolve(cwd));
  let output = root;
  // Do not follow symlinks while creating report directories.
  for (const segment of config.outputDir.split('/')) {
    output = join(output, segment);
    try {
      const stat = await lstat(output);
      if (!stat.isDirectory() || stat.isSymbolicLink()) {
        throw new Error('Report output must not traverse links or files');
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      await mkdir(output);
    }
  }
  const outputReal = await realpath(output);
  if (!outputReal.startsWith(root + sep)) throw new Error('Output escapes current directory');
  const browser = await chromium.launch({headless: true}), results = [];
  try {
    for (const [routeIndex, route] of config.routes.entries()) {
      for (const [viewportName, viewport] of Object.entries(config.viewports)) {
        const context = await browser.newContext({viewport, serviceWorkers: 'block'});
        const page = await context.newPage();
        const pageErrors = [], consoleErrors = [], httpErrors = [], externalRequests = [];
        page.on('pageerror', e => pageErrors.push(String(e.message).slice(0, 240)));
        page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 240)); });
        page.on('response', r => {
          if (r.url().startsWith(config.baseUrl + '/') && r.status() >= 400) {
            httpErrors.push(r.status() + ' ' + new URL(r.url()).pathname);
          }
        });
        // Context routing also covers popups, unlike page-only routing.
        await context.route('**/*', async r => {
          const u = r.request().url();
          if (u.startsWith(config.baseUrl + '/') || u.startsWith('data:') || u.startsWith('blob:')) {
            await r.continue();
          } else {
            externalRequests.push(u.slice(0, 240));
            await r.abort();
          }
        });
        try {
          const response = await page.goto(config.baseUrl + route, {waitUntil: 'load', timeout: 12000});
          const data = await page.evaluate(() => ({
            title: document.title,
            lang: document.documentElement.lang,
            viewport: !!document.querySelector('meta[name="viewport"]'),
            h1Count: document.querySelectorAll('h1').length,
            overflowPx: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
          }));
          const assessed = assessPage({status: response?.status() ?? null, ...data,
            pageErrors, consoleErrors, httpErrors, externalRequests});
          const screenshot = filename(route, viewportName, routeIndex);
          await page.screenshot({path: join(output, screenshot), fullPage: true, animations: 'disabled'});
          results.push({route, viewport: viewportName, screenshot, ...assessed,
            observations: {pageErrors, consoleErrors, httpErrors, externalRequests}});
        } catch (e) {
          results.push({route, viewport: viewportName, pass: false, screenshot: null,
            checks: [{id: 'navigation', pass: false, detail: String(e.message).slice(0, 300)}],
            observations: {pageErrors, consoleErrors, httpErrors, externalRequests}});
        } finally {
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
  const report = {
    schema: 'khaibuilds.web-qa-kit.v1',
    scope: {baseUrl: config.baseUrl, routes: config.routes, viewports: Object.keys(config.viewports)},
    totals: {checks: results.length, passed: results.filter(r => r.pass).length, failed: results.filter(r => !r.pass).length},
    results,
    limitations: ['Not a full accessibility audit', 'Does not verify business logic or production uptime',
                  'Only authorized local loopback sites are allowed'],
  };
  await writeFile(join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n', 'utf8');
  return report;
}
