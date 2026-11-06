// @ts-nocheck — standalone Node browser QA package; checked by its own tests/CI.
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const root = new URL('./site/', import.meta.url);
const files = {'/': 'index.html', '/about/': 'about.html', '/bad/': 'bad.html'};
export function createFixtureServer() {
  return createServer(async (req, res) => {
    const route = new URL(req.url, 'http://localhost').pathname;
    if (route === '/favicon.ico') {res.writeHead(204); res.end(); return;}
    const file = files[route];
    if (!file) {res.writeHead(404, {'content-type': 'text/plain'}); res.end('Not found'); return;}
    const html = await readFile(new URL(file, root), 'utf8');
    res.writeHead(200, {'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store'});
    res.end(html);
  });
}
export async function startFixtureServer() {
  const server = createFixtureServer();
  await new Promise((ok,fail) => server.once('error',fail).listen(0,'127.0.0.1',ok));
  return {server,baseUrl:'http://127.0.0.1:' + server.address().port};
}
