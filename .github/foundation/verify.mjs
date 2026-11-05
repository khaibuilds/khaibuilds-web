#!/usr/bin/env node
// 9x9 Foundation M2: portable, read-only verification of trusted project sources.
// No third-party dependencies; never merges, pushes, publishes or deploys.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const profiles = new Set(['static-web','worker-d1','android']);
const safeDirs = new Set(['.git','node_modules','.gradle','build','.idea','.next','.cache','coverage']);
const publishedExt = new Set(['.html','.css','.js','.mjs','.json','.txt','.xml','.svg','.ico','.png','.jpg','.jpeg','.webp','.gif','.woff','.woff2','.ttf','.map','.wasm','.webmanifest','.avif','.pdf']);
const secretRules = [
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ['GitHub token', /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{50,}\b/],
  ['AWS access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ['Google API key', /\bAIza[0-9A-Za-z_-]{35}\b/],
  ['9x9 synthetic test secret', new RegExp('\\b9X9_SYNTHETIC_' + 'SECRET_DO_NOT_USE\\b')],
];

function argsParse(argv) {
  const o={root:process.cwd(),expectedSha:null,report:null,config:'foundation.config.json',mode:'verify'};
  if(argv[0]==='check' || argv[0]==='verify') o.mode=argv.shift();
  while(argv.length){
    const key=argv.shift();
    if(!['--root','--expected-sha','--report','--config'].includes(key) || !argv.length) throw Error('Unsupported argument or missing value: '+key);
    const val=argv.shift();
    o[{'--root':'root','--expected-sha':'expectedSha','--report':'report','--config':'config'}[key]]=val;
  }
  return o;
}
function run(args,cwd,limit=120000){
  const p=spawnSync(args[0],args.slice(1),{cwd,encoding:'utf8',timeout:limit,maxBuffer:512*1024,env:{...process.env,CI:'true'}});
  return {ok:p.status===0&&!p.error,exit:p.status,stdout:p.stdout||'',stderr:p.stderr||'',error:p.error?.code||null};
}
function mustInside(root,rel,label){
  if(typeof rel!=='string'||rel.length===0||path.isAbsolute(rel)) throw Error(label+' must be a relative path');
  const full=path.resolve(root,rel);if(!(full===root||full.startsWith(root+path.sep))) throw Error(label+' escapes project root');
  return full;
}
function traverse(base,maxFiles=6000,skipSourceDirs=true){
  const todo=[base],files=[];
  while(todo.length){
    const dir=todo.pop();
    for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
      const abs=path.join(dir,ent.name);
      if(ent.isSymbolicLink()){files.push({path:abs,symlink:true});continue}
      if(ent.isDirectory()) {if(!skipSourceDirs||!safeDirs.has(ent.name))todo.push(abs)}
      else if(ent.isFile())files.push({path:abs,symlink:false});
      if(files.length>maxFiles)throw Error('File scan limit exceeded');
    }
  }
  return files;
}
function parseConfig(root,file){
  const cfg=JSON.parse(fs.readFileSync(mustInside(root,file,'config'), 'utf8'));
  if(cfg.schema!=='9x9.foundation.toolkit.v1'|| !profiles.has(cfg.profile)) throw Error('Unsupported config schema/profile');
  if(!['none','npm-lock','gradle-verified'].includes(cfg.dependency_mode))throw Error('Invalid dependency_mode');
  for(const key of ['build','test']){
    if(!Array.isArray(cfg.commands?.[key])||!cfg.commands[key].length||cfg.commands[key].some(v=>typeof v!=='string'||!v.length))throw Error('Missing or invalid commands.'+key);
  }
  if(cfg.profile==='static-web') {
    if(!cfg.artifact_dir||typeof cfg.artifact_dir!=='string')throw Error('static-web needs artifact_dir');
    if(!Array.isArray(cfg.allowed_outputs)||!cfg.allowed_outputs.length || cfg.allowed_outputs.some(v=>typeof v!=='string'||!v||v.includes('..')||v.startsWith('/')||v.includes('\\')))throw Error('static-web needs a safe allowed_outputs list');
  }
  return cfg;
}
function allowedOutput(rel,patterns){
  const unix=rel.replaceAll(path.sep,'/');
  return patterns.some(p=>p.endsWith('/**')?unix.startsWith(p.slice(0,-2)) && unix.length>p.length-2:p===unix);
}
// Cloudflare Pages uses one extensionless header control file at the artifact root.
// It requires an exact manifest entry; wildcard grants never cover this exception.
function publishedFile(rel,patterns){
  return publishedExt.has(path.extname(rel).toLowerCase()) || (rel==='_headers' && patterns.includes('_headers'));
}
function verify(root,opt){
  const checks=[];
  const record=(name,ok,detail='')=>{checks.push({name,result:ok?'PASS':'FAIL',detail});};
  let cfg=null,sha=null,tree=null;
  try {
    const gitTop=run(['git','rev-parse','--show-toplevel'],root);
    record('git-top-level',gitTop.ok&&fs.realpathSync(gitTop.stdout.trim())===root,'--root must be the Git top-level directory');
  } catch(e){record('git-top-level',false,'Cannot resolve Git top-level directory')}
  const gitHead=run(['git','rev-parse','--verify','HEAD'],root);
  sha=gitHead.ok?gitHead.stdout.trim():null;
  const gitTree=run(['git','rev-parse','HEAD^{tree}'],root);
  tree=gitTree.ok?gitTree.stdout.trim():null;
  record('exact-source',!!sha&&/^[a-f0-9]{40}$/.test(sha)&&!!tree,'source_sha='+ (sha||'UNKNOWN'));
  const expected=opt.expectedSha||process.env.FOUNDATION_EXPECTED_SHA;
  record('expected-sha',!!expected && /^[a-f0-9]{40}$/.test(expected) && expected===sha,expected?'expected_sha='+expected:'Missing expected SHA (fail closed)');
  const gitDirty=run(['git','status','--porcelain','--untracked-files=all'],root);
  record('clean-source-tree',gitDirty.ok && gitDirty.stdout.trim()==='', 'Tracked/untracked source edits must be committed or ignored before verification');
  try {cfg=parseConfig(root,opt.config);record('profile-schema',true,cfg.profile)}
  catch(e){record('profile-schema',false,e.message)}
  if(cfg){
    // Source files + built assets; all scanned without disclosing matching content.
    try {
      const files=traverse(root);let bad=0,symlinks=0,first='';
      for(const file of files){
        const rel=path.relative(root,file.path).replaceAll(path.sep,'/');
        if(file.symlink){symlinks++;first ||=rel+' (symlink)';continue;}
        if(/(^|\/)\.env(?:\.|$)/.test(rel)&&!rel.endsWith('.env.example')){bad++;first ||=rel+' (sensitive filename)';continue}
        if(/\.(?:pem|p12|pfx|keystore|jks|key)$/i.test(rel)){bad++;first ||=rel+' (sensitive file type)';continue}
        const stat=fs.statSync(file.path);if(stat.size>2*1024*1024)continue;
        const buf=fs.readFileSync(file.path);if(buf.includes(0))continue;
        const content=buf.toString('utf8');
        for(const [label,regex] of secretRules){if(regex.test(content)){bad++;first ||=rel+' ('+label+')';break}}
      }
      record('secrets-and-paths',bad===0&&symlinks===0,`findings=${bad+symlinks}`+(first?' first='+first:''));
    }catch(e){record('secrets-and-paths',false,e.message)}
    if(cfg.dependency_mode==='npm-lock')record('dependency-lock',fs.existsSync(path.join(root,'package-lock.json'))||fs.existsSync(path.join(root,'npm-shrinkwrap.json')),'npm lockfile required');
    else if(cfg.dependency_mode==='gradle-verified')record('dependency-lock',fs.existsSync(path.join(root,'gradle','verification-metadata.xml')) && fs.existsSync(path.join(root,'gradle','wrapper','gradle-wrapper.properties')),'Gradle verification metadata and wrapper properties required');
    else record('dependency-lock',cfg.profile==='static-web','dependency_mode=none permitted for dependency-free static-web only');
    if(cfg.profile==='static-web' && opt.mode==='check'){
      try{
        const out=mustInside(root,cfg.artifact_dir,'artifact_dir');if(fs.realpathSync(out)!==out)throw Error('artifact_dir may not be a symlink');const items=traverse(out,6000,false);let bad=[];
        for(const f of items){const rel=path.relative(out,f.path);if(f.symlink||!publishedFile(rel,cfg.allowed_outputs)||!allowedOutput(rel,cfg.allowed_outputs)||/(^|[/\\])\./.test(rel)||/(^|[/\\])(private|secrets?)([/\\]|$)/i.test(rel))bad.push(rel);}
        const index=fs.existsSync(path.join(out,'index.html'));
        record('static-artifact-allowlist',index&&bad.length===0,`index=${index}, prohibited=${bad.length}`+(bad.length?' first='+bad[0]:''));
      }catch(e){record('static-artifact-allowlist',false,e.message)}
    }
    if(cfg.profile==='worker-d1'){
      const pre=cfg.bindings?.preview?.database_id,prod=cfg.bindings?.production?.database_id;
      record('worker-env-separation',typeof pre==='string'&&pre.length>0&&typeof prod==='string'&&prod.length>0&&pre!==prod,'distinct isolated DB identifiers required (no production DB in preview)');
    }
    if(cfg.profile==='android'){
      record('android-project',fs.existsSync(path.join(root,'gradlew'))&&fs.existsSync(path.join(root,'gradle','wrapper','gradle-wrapper.properties')),'Gradle wrapper required; actual build is delegated to project');
    }
    // Fail closed: do not run project-controlled build/test commands if provenance or safety gate failed.
    if(opt.mode==='verify' && checks.every(c=>c.result==='PASS')){
      for(const name of ['build','test']){
        const cmd=cfg.commands[name];
        // Commands are read from trusted repository source, never from external PR comments.
        const result=run(cmd,root,180000);
        record(name+'-command',result.ok,`exit=${result.exit??result.error??'UNKNOWN'}`);
      }
      if(cfg.profile==='static-web'){
        // Recheck built files after build command; build may create disallowed content.
        try{const out=mustInside(root,cfg.artifact_dir,'artifact_dir');if(fs.realpathSync(out)!==out)throw Error('artifact_dir may not be a symlink');const f=traverse(out,6000,false);let bad=0;for(const x of f){if(x.symlink||!publishedFile(path.relative(out,x.path),cfg.allowed_outputs)||!allowedOutput(path.relative(out,x.path),cfg.allowed_outputs)||/(^|[\\/])\./.test(path.relative(out,x.path))||/(^|[\\/])(private|secrets?)([\\/]|$)/i.test(path.relative(out,x.path)))bad++;
          else if(fs.statSync(x.path).size<2*1024*1024){let s=fs.readFileSync(x.path).toString('utf8');if(secretRules.some(([,r])=>r.test(s)))bad++;}}
          record('post-build-artifact',bad===0&&fs.existsSync(path.join(out,'index.html')),`prohibited=${bad}`);
        }catch(e){record('post-build-artifact',false,e.message)}
      }
    }
  }
  const ok=checks.every(c=>c.result==='PASS');
  return {schema:'9x9.foundation.toolkit.receipt.v1',profile:cfg?.profile||'UNKNOWN',source_sha:sha,source_tree:tree,expected_sha:expected||null,result:ok?'PASS':'FAIL',checks};
}
let options,root,receipt;
try{
  options=argsParse(process.argv.slice(2));root=fs.realpathSync(path.resolve(options.root));
  if(!fs.statSync(root).isDirectory()) throw Error('Invalid project root');
  receipt=verify(root,options);
}catch(e){console.error('FAIL '+e.message);process.exit(2)}
for(const c of receipt.checks)console.log(`${c.result} ${c.name} ${c.detail}`);
console.log(`${receipt.result} profile=${receipt.profile} source_sha=${receipt.source_sha||'UNKNOWN'}`);
if(options.report){try{const report=mustInside(root,options.report,'report');fs.mkdirSync(path.dirname(report),{recursive:true});fs.writeFileSync(report,JSON.stringify(receipt,null,2)+'\n')}catch(e){console.error('Could not write report: '+e.message);process.exitCode=2}}
if(receipt.result!=='PASS')process.exitCode=1;
