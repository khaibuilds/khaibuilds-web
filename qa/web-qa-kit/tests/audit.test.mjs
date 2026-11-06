// @ts-nocheck — standalone Node browser QA package; checked by its own tests/CI.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, readFile, rm, symlink, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {EventEmitter} from 'node:events';
import {runAudit} from '../src/audit.mjs';

function fakeChromium() {
  let closed = false;
  const routed = [];
  return {
    launch: async () => ({
      newContext: async () => ({
        route: async (pattern) => { routed.push(pattern); },
        newPage: async () => {
          const page = new EventEmitter();
          page.goto = async () => ({status: () => 200});
          page.evaluate = async () => ({
            title: 'OK', lang: 'en', viewport: true, h1Count: 1, overflowPx: 0,
          });
          page.screenshot = async ({path}) => writeFile(path, Buffer.from('fixture-image'));
          return page;
        },
        close: async () => {},
      }),
      close: async () => { closed = true; },
    }),
    wasClosed: () => closed,
    routed,
  };
}

test('creates JSON evidence, unique screenshots and closes browser', async () => {
  const cwd = await mkdtemp(join(tmpdir(), 'ghp3-')), chromium = fakeChromium();
  try {
    const report = await runAudit({baseUrl: 'http://127.0.0.1:4173', routes: ['/'],
      outputDir: 'reports'}, {chromium, cwd});
    assert.deepEqual(report.totals, {checks: 2, passed: 2, failed: 0});
    const persisted = JSON.parse(await readFile(join(cwd, 'reports/report.json'), 'utf8'));
    assert.equal(persisted.schema, 'khaibuilds.web-qa-kit.v1');
    assert.equal(persisted.results[0].screenshot, '00-home-mobile.png');
    assert.equal(chromium.wasClosed(), true);
    assert.equal(chromium.routed.length, 2, 'All viewports must use context-level request blocking');
    const second = await runAudit({baseUrl: 'http://127.0.0.1:4173',
      routes: ['/a-b/', '/a/b'], outputDir: 'reports/collision-test'}, {chromium, cwd});
    assert.deepEqual(second.results.map(r => r.screenshot), [
      '00-a-b-mobile.png', '00-a-b-desktop.png', '01-a-b-mobile.png', '01-a-b-desktop.png',
    ]);
  } finally {
    await rm(cwd, {recursive: true, force: true});
  }
});

test('rejects output symlink that escapes the working directory', async () => {
  const cwd = await mkdtemp(join(tmpdir(), 'ghp3-root-'));
  const outside = await mkdtemp(join(tmpdir(), 'ghp3-outside-'));
  try {
    await symlink(outside, join(cwd, 'reports'), 'dir');
    await assert.rejects(() => runAudit({baseUrl: 'http://127.0.0.1:4173',
      routes: ['/'], outputDir: 'reports'}, {chromium: fakeChromium(), cwd}),
      /must not traverse links or files/);
  } finally {
    await rm(cwd, {recursive: true, force: true});
    await rm(outside, {recursive: true, force: true});
  }
});
