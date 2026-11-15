import { readFileSync } from 'node:fs';
const coverage = JSON.parse(
  readFileSync(new URL('../docs/endpoint-coverage.json', import.meta.url)),
);
const unique = new Set(coverage.map((op) => op.method + ' ' + op.path));
if (unique.size !== coverage.length) throw new Error('Duplicated endpoint');
const api = process.env.LOGIERP_OPENAPI_FILE
  ? JSON.parse(readFileSync(process.env.LOGIERP_OPENAPI_FILE, 'utf8'))
  : await (async () => {
      const response = await fetch(
        (process.env.LOGIERP_API_URL || 'http://localhost:5263') + '/swagger/v1/swagger.json',
      );
      if (!response.ok) throw new Error('Start the API in Development to check coverage');
      return response.json();
    })();
const expected = Object.entries(api.paths).flatMap(([path, methods]) =>
  Object.keys(methods)
    .filter((m) => ['get', 'post', 'put', 'delete', 'patch'].includes(m))
    .map((m) => m.toUpperCase() + ' ' + path),
);
const missing = expected.filter((key) => !unique.has(key));
const extra = [...unique].filter((key) => !expected.includes(key));
if (missing.length || extra.length)
  throw new Error('Missing: ' + missing.join(', ') + '; Extra: ' + extra.join(', '));
console.log(`${expected.length} rutas coinciden exactamente con el contrato del backend.`);
