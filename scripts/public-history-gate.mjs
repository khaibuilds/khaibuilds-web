#!/usr/bin/env node
// @ts-nocheck
// A pre-public, read-only local gate. Does not rewrite or mutate Git history.
import { execFileSync } from 'node:child_process';

const expectedAuthor = '318708838+khaibuilds@users.noreply.github.com';
const noReplyPattern = /^(?:[0-9]+\+)?[a-z0-9-]+@users\.noreply\.github\.com$/i;

function checkRow(row) {
  const parts = row.trim().split('\t');
  if (parts.length !== 3 || !/^[a-f0-9]{40}$/.test(parts[0])) return 'invalid';
  const [, author, committer] = parts;
  if (author.toLowerCase() !== expectedAuthor.toLowerCase()) return 'author';
  if (!(committer.toLowerCase() === 'noreply@github.com' || noReplyPattern.test(committer))) return 'committer';
  return null;
}

function selfTest() {
  const sha = 'a'.repeat(40);
  const ok = sha+'\t'+expectedAuthor+'\tnoreply@github.com';
  const badAuthor = sha+'\tname@example.com\tnoreply@github.com';
  const badCommitter = sha+'\t'+expectedAuthor+'\tname@example.com';
  if (checkRow(ok) !== null || checkRow(badAuthor) !== 'author'
      || checkRow(badCommitter) !== 'committer'
      || checkRow('bad') !== 'invalid') throw new Error('public-history-gate self-test failed');
  console.log('PASS public-history-gate self-test');
}

function git(...args) {
  try { return execFileSync('git', args, { encoding: 'utf8', timeout: 20_000, stdio: ['ignore','pipe','pipe'] }).trim(); }
  catch { throw new Error('Git inspection failed; check repository and local Git installation'); }
}

function audit() {
  if (git('rev-parse', '--is-shallow-repository') !== 'false') throw new Error('FAIL: unshallow clone required');
  const log = git('log', '--all', '--format=%H%x09%ae%x09%ce');
  if (!log) throw new Error('FAIL: no commits available for review');
  const bad = [];
  const rows = log.split(/\r?\n/);
  for (const row of rows) {
    const reason = checkRow(row);
    if (reason) bad.push({ sha: row.slice(0,12), reason });
  }
  if (bad.length) {
    console.error('FAIL: '+bad.length+' of '+rows.length+' reachable commits have unacceptable or invalid author/committer metadata.');
    for (const item of bad.slice(0,15)) console.error('  '+item.sha+' ('+item.reason+')');
    console.error('Keep this repository Private. Never rely on a normal PR merge to rewrite existing commits.');
    process.exitCode = 1;
  } else {
    console.log('PASS: '+rows.length+' reachable commits use approved noreply identity.');
    console.log('LIMIT: still inspect GitHub PR refs, unreferenced commits and caches before Public.');
  }
}

try {
  if (process.argv.slice(2).join(' ') === '--self-test') selfTest();
  else if (process.argv.length === 2) audit();
  else throw new Error('Usage: node scripts/public-history-gate.mjs [--self-test]');
} catch (err) {
  console.error(String(err.message || err));
  process.exitCode = 1;
}
