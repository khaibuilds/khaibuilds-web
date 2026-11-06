import {mkdir, writeFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
import {parseConfig, assessPage} from './policy.mjs';

function filename(route, viewport) {
  const slug = route === '/' ? 'home' : route.replace(/^\/+|\/+$/g, '').replaceAll('/', '-');
  return slug + '-' + viewport + '.png';
}
export async function runAudit(rawConfig, {chromium, cwd = process.cwd()} = {}) {
  const config = parseConfig(rawConfig);
  if (!chromium) throw new Error('Playwright chromium launcher required');
  const root = resolve(cwd), output = resolve(root, config.outputDir);
  if (!(output.startsWith(root + '/') || output.startsWith(root + '\\'))) throw new Error('Output escapes current directory');
  await mkdir(output, {recursive: true});
  const browser = await chromium.launch({headless: true}), results = [];
  try {
    for (const route of config.routes) {
      for (const [viewportName, viewport] of Object.entries(config.viewports)) {
        const page = await browser.newPage({viewport, serviceWorkers: 'block'});
        const pageErrors = [], consoleErrors = [], httpErrors = [], externalRequests = [];
        page.on('pageerror', e => pageErrors.push(String(e.message).slice(0, 240)));
        page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 240)); });
        page.on('response', r => {
          if (r.url().startsWith(config.baseUrl + '/') && r.status() >= 400) {
            httpErrors.push(r.status() + ' ' + new URL(r.url()).pathname);
          }
        });
        await page.route('**/*', async r => {
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
          const screenshot = filename(route, viewportName);
          await page.screenshot({path: join(output, screenshot), fullPage: true, animations: 'disabled'});
          results.push({route, viewport: viewportName, screenshot, ...assessed,
            observations: {pageErrors, consoleErrors, httpErrors, externalRequests}});
        } catch (e) {
          results.push({route, viewport: viewportName, pass: false, screenshot: null,
            checks: [{id: 'navigation', pass: false, detail: String(e.message).slice(0, 300)}],
            observations: {pageErrors, consoleErrors, httpErrors, externalRequests}});
        } finally {
          await page.close();
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
