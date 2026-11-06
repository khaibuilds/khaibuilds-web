// @ts-nocheck — standalone Node browser QA package; checked by its own tests/CI.
import test from 'node:test';
import assert from 'node:assert/strict';
import {parseConfig, assessPage} from '../src/policy.mjs';
const ok = {baseUrl:'http://127.0.0.1:4173',routes:['/','/about/']};
test('accepts a restricted local target',()=>{
  const x=parseConfig(ok);
  assert.equal(x.baseUrl,'http://127.0.0.1:4173');
  assert.equal(x.routes.length,2);
  assert.deepEqual(Object.keys(x.viewports),['mobile','desktop']);
});
test('rejects external targets or credentials',()=>{
  for(const baseUrl of ['https://example.com','http://example.com','http://192.168.1.1',
    'http://169.254.169.254','file:///etc/passwd','http://user:pass@127.0.0.1',
    'http://127.0.0.1:4173/private','http://127.0.0.1:4173?token=x','http://127.0.0.1.evil.org']){
    assert.throws(()=>parseConfig({...ok,baseUrl}),/loopback|Invalid/);
  }
});
test('rejects path traversal and duplicate/oversized routes',()=>{
  for(const routes of [['/../../secret'],['//host'],['/%2e%2e/'],['/a?edit'],['/a#frag'],['/a\\b'],
    ['/a','/a'],[],Array.from({length:11},(_,i)=>'/p'+i)]){
    assert.throws(()=>parseConfig({...ok,routes}),/route/);
  }
});
test('rejects unsafe output paths and viewport sizes',()=>{
  for(const outputDir of ['../outside','/tmp/reports','x/../y','.','.foo/../x']){
    assert.throws(()=>parseConfig({...ok,outputDir}),/outputDir/);
  }
  assert.throws(()=>parseConfig({...ok,viewports:{mobile:{width:200,height:800}}}),/viewport/i);
});
test('scores a healthy page',()=>{
  const x=assessPage({status:200,title:'Page',lang:'en',viewport:true,h1Count:1,overflowPx:0});
  assert.equal(x.pass,true);
  assert.equal(x.checks.length,10);
});
test('finds actual markup and browser problems',()=>{
  const x=assessPage({status:404,title:'',lang:'',viewport:false,h1Count:0,overflowPx:100,
    pageErrors:['boom'],consoleErrors:['bad'],httpErrors:['404 /missing'],externalRequests:['blocked']});
  assert.equal(x.pass,false);
  assert.deepEqual(x.checks.filter(c=>!c.pass).map(c=>c.id),[
    'http','title','lang','viewport','h1','horizontal-overflow',
    'runtime-errors','console-errors','failed-resources','external-requests']);
});
