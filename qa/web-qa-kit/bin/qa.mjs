// @ts-nocheck — standalone Node browser QA package; checked by its own tests/CI.
#!/usr/bin/env node
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {parseConfig} from '../src/policy.mjs';
import {runAudit} from '../src/audit.mjs';

async function main() {
  if (process.argv.length !== 4 || process.argv[2] !== '--config') {
    console.error('Usage: node bin/qa.mjs --config qa.sample.json');
    process.exitCode = 2;
    return;
  }
  const raw = JSON.parse(await readFile(resolve(process.cwd(), process.argv[3]), 'utf8'));
  parseConfig(raw); // Reject unsafe URLs before opening a browser.
  const {chromium} = await import('playwright');
  const report = await runAudit(raw, {chromium});
  console.log(JSON.stringify({totals: report.totals,
    report: (raw.outputDir || 'reports') + '/report.json'}, null, 2));
  if (report.totals.failed > 0) process.exitCode = 1;
}
main().catch(e => {console.error('Web QA Kit: ' + e.message); process.exitCode = 2;});
