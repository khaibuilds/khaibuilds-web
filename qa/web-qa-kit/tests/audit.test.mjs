// @ts-nocheck — standalone Node browser QA package; checked by its own tests/CI.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {EventEmitter} from 'node:events';
import {runAudit} from '../src/audit.mjs';

function fakeChromium() {
  let closed=false;
  return {
    launch:async()=>({
      newPage:async()=>{
        const p=new EventEmitter();
        p.route=async()=>{};
        p.goto=async()=>({status:()=>200});
        p.evaluate=async()=>({title:'OK',lang:'en',viewport:true,h1Count:1,overflowPx:0});
        p.screenshot=async({path})=>writeFile(path,Buffer.from('fixture-image'));
        p.close=async()=>{};
        return p;
      },
      close:async()=>{closed=true;},
    }),
    wasClosed:()=>closed,
  };
}
test('creates JSON evidence and screenshots, then closes browser',async()=>{
  const cwd=await mkdtemp(join(tmpdir(),'ghp3-')),chromium=fakeChromium();
  try {
    const report=await runAudit({baseUrl:'http://127.0.0.1:4173',routes:['/'],outputDir:'reports'},{chromium,cwd});
    assert.deepEqual(report.totals,{checks:2,passed:2,failed:0});
    const persisted=JSON.parse(await readFile(join(cwd,'reports/report.json'),'utf8'));
    assert.equal(persisted.schema,'khaibuilds.web-qa-kit.v1');
    assert.equal(persisted.results[0].screenshot,'home-mobile.png');
    assert.equal(chromium.wasClosed(),true);
  } finally {await rm(cwd,{recursive:true,force:true});}
});
