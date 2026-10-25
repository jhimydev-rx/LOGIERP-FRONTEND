import { readFileSync } from 'node:fs';
const coverage = JSON.parse(
  readFileSync(new URL('../docs/endpoint-coverage.json', import.meta.url)),
);
const unique = new Set(coverage.map((op) => op.method + ' ' + op.path));
if (unique.size !== coverage.length) throw new Error('Duplicated endpoint');
const response = await fetch('http://localhost:5263/swagger/v1/swagger.json');
if (!response.ok) throw new Error('Start the API in Development to check coverage');
const api = await response.json();
const expected = Object.entries(api.paths).flatMap(([path, methods]) =>
  Object.keys(methods)
    .filter((m) => ['get', 'post', 'put', 'delete', 'patch'].includes(m))
    .map((m) => m.toUpperCase() + ' ' + path),
);
const missing = expected.filter((key) => !unique.has(key));
if (missing.length) throw new Error('Missing: ' + missing.join(', '));
console.log(
  `${expected.length} API operations covered; ${coverage.length} including health checks.`,
);
