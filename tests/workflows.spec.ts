import { test, expect } from '@playwright/test';
const id = '11111111-1111-1111-1111-111111111111';
const sale = '22222222-2222-2222-2222-222222222222';
const access = {
  fullName: 'Operador',
  roles: ['ADMIN'],
  permissions: [
    'CASH:READ',
    'CASH:OPEN',
    'CASH:CREATE',
    'CASH:CLOSE',
    'SALES:READ',
    'PURCHASING:READ',
    'PURCHASING:CREATE',
    'PURCHASING:UPDATE',
  ],
};
const session = () => ({
  id,
  cashRegisterId: 'caja',
  openedAt: '2026-11-10T09:00:00Z',
  closedAt: null as string | null,
  openingCashAmount: 100,
  cashIn: 30,
  cashOut: 10,
  expectedCashAmount: 120,
  noncashIn: 0,
  noncashOut: 0,
  movements: [
    {
      id: 'movement',
      occurredAt: '2026-11-10T10:00:00Z',
      conceptCode: 'OTHER_INCOME',
      paymentMethodCode: 'CASH',
      amount: 30,
    },
  ],
});
test('Caja abre con sesión, saldo y movimientos; cobro usa venta y sesión distintas', async ({
  page,
}) => {
  const row = session();
  let payment: any;
  await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'workflow'));
  await page.route('**/api/**', async (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path === '/api/auth/me') return route.fulfill({ json: access });
    if (path === `/api/sales/${sale}/payments`) {
      payment = route.request().postDataJSON();
      row.cashIn += 25;
      row.expectedCashAmount += 25;
      return route.fulfill({
        json: { id: sale, totalAmount: 25, paidAmount: 25, pendingAmount: 0 },
      });
    }
    if (path === '/api/cash-sessions') return route.fulfill({ json: [row] });
    if (path === `/api/cash-sessions/${id}`) return route.fulfill({ json: row });
    return route.fulfill({ json: [] });
  });
  await page.goto('/modulos/sesiones-caja');
  const detail = page.getByRole('region', { name: 'Registro seleccionado' });
  await expect(detail.getByText('Sesión abierta', { exact: true })).toBeVisible();
  await expect(detail.getByText('S/ 120.00', { exact: true })).toBeVisible();
  await expect(detail.getByRole('heading', { name: 'Movimientos de la sesión' })).toBeVisible();
  await expect(page.locator('.action-workspace')).toHaveCount(0);
  await detail.getByRole('button', { name: 'Cobrar venta', exact: true }).click();
  await page.getByLabel('Venta', { exact: true }).fill(sale);
  await expect(page.getByLabel('Sesión de caja', { exact: true })).toHaveCount(0);
  await page.getByLabel('Medio de pago', { exact: true }).selectOption('CASH');
  await page.getByLabel('Importe (PEN)', { exact: true }).fill('25');
  await page
    .getByRole('region', { name: 'Acción en curso' })
    .getByRole('button', { name: 'Cobrar venta', exact: true })
    .click();
  await expect(detail.getByText('S/ 145.00', { exact: true })).toBeVisible();
  expect(payment.cashSessionId).toBe(id);
  expect(payment.amount).toBe(25);
});
test('Sesión cerrada conserva detalle y bloquea cobros y movimientos', async ({ page }) => {
  const row = {
    ...session(),
    closedAt: '2026-11-10T18:00:00Z',
    countedClosingCash: 119,
    cashDifference: -1,
  };
  await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'workflow'));
  await page.route('**/api/**', (r) =>
    r.fulfill({
      json: r.request().url().includes('/auth/me')
        ? access
        : r.request().url().includes(id)
          ? row
          : [row],
    }),
  );
  await page.goto('/modulos/sesiones-caja');
  await page.getByRole('button', { name: 'Ver sesión', exact: true }).click();
  const actions = page.getByRole('navigation', { name: 'Acciones del registro' });
  await expect(actions.getByRole('button', { name: 'Cobrar venta', exact: true })).toBeDisabled();
  await expect(
    actions.getByRole('button', { name: 'Registrar movimiento', exact: true }),
  ).toBeDisabled();
  await expect(page.getByText('Efectivo contado:', { exact: false })).toContainText('119.00');
});
test('Proveedor muestra listado antes del formulario y editar conserva el registro elegido', async ({
  page,
}) => {
  const row = { id, legalName: 'Proveedor Uno', taxNumber: '20123456789', isActive: true };
  await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'workflow'));
  await page.route('**/api/**', (r) =>
    r.fulfill({ json: r.request().url().includes('/auth/me') ? access : [row] }),
  );
  await page.goto('/modulos/proveedores');
  await expect(page.getByRole('cell', { name: 'Proveedor Uno', exact: true })).toBeVisible();
  await expect(page.locator('.action-workspace')).toHaveCount(0);
  await page.getByRole('button', { name: 'Ver registro', exact: true }).click();
  await page
    .getByRole('navigation', { name: 'Acciones del registro' })
    .getByRole('button', { name: 'Editar', exact: true })
    .click();
  await expect(page.getByLabel('Razón social', { exact: true })).toHaveValue('Proveedor Uno');
  await expect(page.getByLabel('Identificador', { exact: true })).toHaveCount(0);
});

test('Permisos se agrupan por módulo y conservan los identificadores al guardar', async ({ page }) => {
  let sent: any;
  await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'workflow'));
  await page.route('**/api/**', async route => {
    const path = new URL(route.request().url()).pathname;
    if (path === '/api/auth/me') return route.fulfill({ json: { ...access, permissions: ['SECURITY:READ', 'SECURITY:MANAGE_ACCESS'] } });
    if (path === '/api/permissions') return route.fulfill({ json: [
      { id, module: 'ORDERS', action: 'CREATE', name: 'CREATE' },
      { id: sale, module: 'PURCHASING', action: 'UPDATE', name: 'UPDATE' },
    ] });
    if (path === '/api/roles' && route.request().method() === 'POST') {
      sent = route.request().postDataJSON();
      return route.fulfill({ status: 201, json: { id: 'role', ...sent } });
    }
    return route.fulfill({ json: [] });
  });
  await page.goto('/modulos/roles');
  await page.getByRole('button', { name: /^\+ / }).click();
  await page.getByLabel('Nombre', { exact: true }).fill('Operador');
  const picker = page.getByRole('group', { name: 'Permisos por módulo', exact: true });
  await expect(picker.getByRole('group', { name: 'Pedidos', exact: true })).toBeVisible();
  await picker.getByRole('group', { name: 'Pedidos', exact: true }).locator('summary').click();
  await picker.getByRole('checkbox', { name: 'Crear ORDERS:CREATE', exact: true }).check();
  await picker.getByRole('searchbox', { name: 'Buscar módulo o acción' }).fill('compras');
  await expect(picker.getByRole('group', { name: 'Pedidos', exact: true })).toHaveCount(0);
  await picker.getByRole('checkbox', { name: 'Editar PURCHASING:UPDATE', exact: true }).check();
  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('region', { name: 'Acción en curso' }).getByRole('button', { name: 'Registrar', exact: true }).click();
  await expect.poll(() => sent?.permissionIds).toEqual([id, sale]);
});

test('Reportes filtra por permisos y muestra el error de descarga', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'workflow'));
  await page.route('**/api/**', route => route.request().url().includes('/auth/me')
    ? route.fulfill({ json: { ...access, permissions: ['SALES:READ'] } })
    : route.fulfill({ status: 400, json: { message: 'Reduce el período de consulta.' } }));
  await page.goto('/reportes');
  await expect(page.getByRole('option', { name: 'Ventas', exact: true })).toHaveCount(1);
  await expect(page.getByRole('option', { name: 'Movimientos de caja', exact: true })).toHaveCount(0);
  await page.getByLabel('Reporte', { exact: true }).selectOption('sales');
  await page.getByRole('button', { name: 'Descargar Excel', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Reduce el período');
  await expect(page.getByRole('status')).toHaveCount(0);
});

test('Catálogo de permisos distingue acciones repetidas por módulo', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'workflow'));
  await page.route('**/api/**', route => route.fulfill({ json: route.request().url().includes('/auth/me')
    ? { ...access, permissions: ['SECURITY:READ'] }
    : [{id:'a',module:'ORDERS',action:'CREATE',name:'CREATE'}, {id:'b',module:'PURCHASING',action:'CREATE',name:'CREATE'}, {id:'c',module:'CUSTOM',action:'REVIEW',name:'Revisar'}] }));
  await page.goto('/modulos/permisos');
  await expect(page.getByRole('region',{name:'Pedidos',exact:true}).getByText('ORDERS:CREATE')).toBeVisible();
  await expect(page.getByRole('region',{name:'Compras',exact:true}).getByText('PURCHASING:CREATE')).toBeVisible();
  await expect(page.getByRole('region',{name:'CUSTOM',exact:true})).toContainText('CUSTOM:REVIEW');
  await page.screenshot({path:'../../tmp/permissions-grouped.png',fullPage:true});
  await page.getByRole('searchbox',{name:'Buscar módulo o acción'}).fill('compras');
  await expect(page.getByRole('region',{name:'Pedidos',exact:true})).toHaveCount(0);
  await expect(page.getByRole('region',{name:'Compras',exact:true})).toBeVisible();
  await page.getByRole('searchbox').fill('sin coincidencias');
  await expect(page.getByRole('status')).toContainText('No hay permisos');
});

test('Roles cargan por nombre y envían sus IDs sin mostrarlos', async ({ page }) => {
  let sent: any;
  await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'workflow'));
  await page.route('**/api/**', route => {
    const path = new URL(route.request().url()).pathname;
    if (path === '/api/auth/me') return route.fulfill({json:{...access,permissions:['SECURITY:READ','SECURITY:CREATE','SECURITY:MANAGE_ACCESS']}});
    if (path === '/api/roles') return route.fulfill({json:[{id,code:'ADMIN',name:'Administrador',isActive:true},{id:sale,code:'CASHIER',name:'Cajero',isActive:true},{id:'disabled',code:'OLD',name:'Antiguo',isActive:false}]});
    if (path === '/api/users' && route.request().method() === 'POST') {
      sent=route.request().postDataJSON();return route.fulfill({status:201,json:{id,...sent}});
    }
    return route.fulfill({json:[]});
  });
  await page.goto('/modulos/usuarios');
  await page.getByRole('button',{name:'+ Nuevo usuario',exact:true}).click();
  const roles=page.getByRole('group',{name:'Roles del usuario',exact:true});
  await expect(roles.getByRole('checkbox',{name:'Administrador',exact:true})).not.toBeVisible();
  await roles.locator('summary').click();
  await roles.getByRole('checkbox',{name:'Administrador',exact:true}).check();
  await roles.getByRole('searchbox',{name:'Buscar rol'}).fill('cajero');
  await roles.getByRole('checkbox',{name:'Cajero',exact:true}).check();
  await roles.locator('summary').click();
  await expect(roles.locator('summary')).toContainText('2 seleccionados');
  await expect(roles.getByRole('checkbox',{name:'Cajero',exact:true})).not.toBeVisible();
  await roles.locator('summary').click();
  await expect(roles.getByRole('checkbox',{name:'Cajero',exact:true})).toBeChecked();
  await expect(roles).not.toContainText(id);
  await expect(roles.getByRole('checkbox',{name:'Antiguo'})).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Cargar opciones',exact:true})).toHaveCount(0);
  await page.getByRole('region',{name:'Acción en curso'}).getByRole('button',{name:'Registrar',exact:true}).click();
  await expect.poll(()=>sent?.roleIds).toEqual([id,sale]);
});
