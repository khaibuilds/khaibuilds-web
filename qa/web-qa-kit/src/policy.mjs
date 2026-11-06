/** Security boundaries: only a small, explicitly listed local site. */
export const DEFAULT_VIEWPORTS = Object.freeze({
  mobile: {width: 390, height: 844}, desktop: {width: 1365, height: 768},
});
export function parseConfig(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Config must be an object');
  const {baseUrl, routes, outputDir = 'reports', viewports = DEFAULT_VIEWPORTS} = input;
  let base;
  try { base = new URL(baseUrl); } catch { throw new Error('Invalid baseUrl'); }
  if (base.protocol !== 'http:' || !['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname) ||
      base.username || base.password || base.pathname !== '/' || base.search || base.hash) {
    throw new Error('baseUrl must be an HTTP loopback origin without path or credentials');
  }
  if (!Array.isArray(routes) || routes.length === 0 || routes.length > 10) throw new Error('routes: 1–10 local paths required');
  const seen = new Set();
  for (const route of routes) {
    if (typeof route !== 'string' || route.length > 140 || !/^\/[A-Za-z0-9_/-]*$/.test(route) ||
        route.startsWith('//') || route.includes('..') || seen.has(route)) {
      throw new Error('Invalid or duplicate route: ' + String(route));
    }
    seen.add(route);
  }
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._/-]{0,79}$/.test(outputDir) ||
      outputDir.startsWith('/') || outputDir.includes('..') || outputDir.includes('//')) {
    throw new Error('outputDir must be a safe relative path');
  }
  if (!viewports || typeof viewports !== 'object' || Array.isArray(viewports)) throw new Error('Invalid viewports');
  const names = Object.keys(viewports);
  if (!names.length || names.length > 3 || names.some(n => !/^[a-z][a-z0-9-]{0,15}$/.test(n))) throw new Error('Provide 1–3 viewports');
  for (const {width, height, ...rest} of Object.values(viewports)) {
    if (!Number.isInteger(width) || width < 320 || width > 2560 ||
        !Number.isInteger(height) || height < 400 || height > 2000 || Object.keys(rest).length) {
      throw new Error('Invalid viewport dimensions');
    }
  }
  return {baseUrl: base.origin, routes, outputDir, viewports};
}
export function assessPage({status, title, lang, viewport, h1Count, overflowPx,
                            pageErrors = [], consoleErrors = [], httpErrors = [], externalRequests = []}) {
  const checks = [
    {id: 'http', pass: Number.isInteger(status) && status >= 200 && status < 400, detail: 'Document HTTP ' + (status ?? 'no response')},
    {id: 'title', pass: !!title?.trim(), detail: 'Non-empty page title'},
    {id: 'lang', pass: !!lang?.trim(), detail: 'HTML language declared'},
    {id: 'viewport', pass: !!viewport, detail: 'Viewport meta tag present'},
    {id: 'h1', pass: h1Count === 1, detail: 'Expected one H1; found ' + h1Count},
    {id: 'horizontal-overflow', pass: Number.isFinite(overflowPx) && overflowPx <= 2, detail: 'Horizontal overflow: ' + overflowPx + 'px'},
    {id: 'runtime-errors', pass: pageErrors.length === 0, detail: pageErrors.length + ' unhandled page errors'},
    {id: 'console-errors', pass: consoleErrors.length === 0, detail: consoleErrors.length + ' browser console errors'},
    {id: 'failed-resources', pass: httpErrors.length === 0, detail: httpErrors.length + ' same-origin HTTP errors'},
    {id: 'external-requests', pass: externalRequests.length === 0, detail: externalRequests.length + ' external requests blocked'},
  ];
  return {pass: checks.every(c => c.pass), checks};
}
