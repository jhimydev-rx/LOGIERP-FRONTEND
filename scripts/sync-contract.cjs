// Synchronize schemas and routes against a saved OpenAPI contract, preserving UI labels.
const fs = require('fs');
const ts = require('typescript');
const vm = require('vm');
const path = require('path');
const root = path.resolve(__dirname, '..');
const target = path.join(root, 'src/app/data/api-contract.ts');
const sandbox = { exports: {} };
vm.runInNewContext(
  ts.transpileModule(fs.readFileSync(target, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  sandbox,
);
const old = sandbox.exports;
const swagger = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const modules = [...old.MODULES];
if (!modules.some((m) => m.id === 'sunat'))
  modules.push({ id: 'sunat', name: 'SUNAT beta', group: 'Ventas' });
const sunat = {
  'POST /api/sunat-beta/invoices': ['Preparar comprobante', 'SUNAT:CREATE'],
  'POST /api/sunat-beta/invoices/{id}/send': ['Enviar a SUNAT beta', 'SUNAT:SEND'],
  'GET /api/sunat-beta/invoices': ['Listar', 'SUNAT:READ'],
  'GET /api/sunat-beta/invoices/{id}': ['Consultar detalle', 'SUNAT:READ'],
  'GET /api/sunat-beta/invoices/{id}/attempts': ['Consultar intentos', 'SUNAT:READ'],
  'GET /api/sunat-beta/invoices/{id}/xml': ['Descargar XML', 'SUNAT:READ'],
  'GET /api/sunat-beta/invoices/{id}/cdr': ['Descargar CDR', 'SUNAT:READ'],
};
const reports = {
  'GET /api/reports/sales': ['Exportar ventas Excel', 'SALES:READ', 'ventas'],
  'GET /api/reports/cash': ['Exportar caja Excel', 'CASH:READ', 'sesiones-caja'],
  'GET /api/reports/purchases': ['Exportar compras Excel', 'PURCHASING:READ', 'compras'],
};
// Endpoints added when the backend removed conditional logic from controllers.
const cancelPermissions = {
  agencies: 'AGENCIES:CANCEL',
  warehouses: 'WAREHOUSE:CANCEL',
  'warehouse-locations': 'WAREHOUSE:CANCEL',
  vehicles: 'TRANSPORT:CANCEL',
  drivers: 'TRANSPORT:CANCEL',
  routes: 'TRANSPORT:CANCEL',
  'cash-registers': 'CASH:CANCEL',
  suppliers: 'PURCHASING:CANCEL',
  supplies: 'PURCHASING:CANCEL',
  'receipt-series': 'SALES:CANCEL',
};
const statusActions = {
  'POST /api/purchase-requests/{id}/submit': ['Enviar solicitud', 'PURCHASING:UPDATE', 'solicitudes'],
  'POST /api/purchase-requests/{id}/approve': ['Aprobar solicitud', 'PURCHASING:APPROVE', 'solicitudes'],
  'POST /api/purchase-requests/{id}/reject': ['Rechazar solicitud', 'PURCHASING:APPROVE', 'solicitudes'],
  'POST /api/purchase-requests/{id}/cancel': ['Cancelar solicitud', 'PURCHASING:CANCEL', 'solicitudes'],
  'POST /api/purchase-orders/{id}/issue': ['Emitir orden', 'PURCHASING:UPDATE', 'compras'],
  'POST /api/purchase-orders/{id}/cancel': ['Cancelar orden', 'PURCHASING:CANCEL', 'compras'],
};
function activation(key) {
  const match = /^POST \/api\/([a-z-]+)\/\{id\}\/(activate|deactivate)$/.exec(key);
  if (!match || !cancelPermissions[match[1]]) return null;
  const update = old.OPERATIONS.find((o) => o.method === 'PUT' && o.path === `/api/${match[1]}/{id}`);
  if (!update) throw Error('Sin módulo para ' + key);
  return [match[2] === 'activate' ? 'Activar' : 'Desactivar', cancelPermissions[match[1]], update.module];
}
const operations = [];
for (const [route, methods] of Object.entries(swagger.paths)) {
  for (const [verb, definition] of Object.entries(methods)) {
    if (!['get', 'post', 'put', 'patch', 'delete'].includes(verb)) continue;
    if (route.startsWith('/health/')) continue;
    const method = verb.toUpperCase();
    const key = method + ' ' + route;
    const previous = old.OPERATIONS.find((o) => o.method === method && o.path === route);
    const metadata = sunat[key] || reports[key] || statusActions[key] || activation(key);
    if (!previous && !metadata) throw Error('Endpoint sin clasificar: ' + key);
    operations.push({
      ...(previous || { key, module: metadata[2] || 'sunat', title: metadata[0], permissions: [metadata[1]] }),
      method,
      path: route,
      parameters: definition.parameters || [],
      body: definition.requestBody?.content?.['application/json']?.schema || null,
      ...(route.startsWith('/api/reports/') || route.endsWith('/xml') || route.endsWith('/cdr') ? { download: true } : {}),
    });
  }
}
for (const op of old.OPERATIONS.filter(
  (o) => o.path.startsWith('/health/') && !operations.some((x) => x.path === o.path),
))
  operations.push(op);
fs.writeFileSync(
  target,
  "import { Module, Operation, Schema } from '../core/contracts';\n\nexport const MODULES: Module[] = " +
    JSON.stringify(modules, null, 2) +
    ';\n\nexport const OPERATIONS: Operation[] = ' +
    JSON.stringify(operations, null, 2) +
    ';\n\nexport const SCHEMAS: Record<string, Schema> = ' +
    JSON.stringify(swagger.components.schemas, null, 2) +
    ';\n',
);
fs.writeFileSync(
  path.join(root, 'docs/endpoint-coverage.json'),
  JSON.stringify(
    [
      ...operations.map((o) => ({
        method: o.method,
        path: o.path,
        module: o.module,
        title: o.title,
      })),
      { method: 'GET', path: '/health/live' },
      { method: 'GET', path: '/health/ready' },
    ],
    null,
    2,
  ) + '\n',
);
console.log(operations.length + ' operaciones sincronizadas');
