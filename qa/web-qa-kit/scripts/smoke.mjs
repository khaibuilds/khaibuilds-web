// @ts-nocheck — standalone Node browser QA package; checked by its own tests/CI.
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
import {chromium} from 'playwright';
import {startFixtureServer} from '../fixtures/server.mjs';
import {runAudit} from '../src/audit.mjs';

const cwd = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const {server,baseUrl} = await startFixtureServer();
try {
  const good = await runAudit({baseUrl,routes:['/','/about/'],outputDir:'reports/healthy'}, {chromium,cwd});
  assert.equal(good.totals.failed,0,JSON.stringify(good.results.filter(r=>!r.pass)));
  assert.equal(good.totals.passed,4);
  const bad = await runAudit({baseUrl,routes:['/bad/'],outputDir:'reports/intentionally-broken'}, {chromium,cwd});
  assert.equal(bad.totals.failed,2);
  const findings = bad.results.flatMap(r=>r.checks.filter(c=>!c.pass).map(c=>c.id));
  assert(findings.includes('runtime-errors'),'Missed intended JavaScript error');
  assert(findings.includes('h1'),'Missed duplicate H1');
  assert(findings.includes('horizontal-overflow'),'Missed horizontal overflow');
  console.log('PASS: 4 healthy viewport checks passed; 2 intentionally broken checks failed.');
} finally {
  await new Promise(ok=>server.close(ok));
}
