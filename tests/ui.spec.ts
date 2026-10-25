import { test, expect } from '@playwright/test';
import { OPERATIONS, MODULES } from '../src/app/data/api-contract';

const permissions = [...new Set(OPERATIONS.flatMap((op) => op.permissions))];
const access = {
  id: '00000000-0000-0000-0000-000000000001',
  fullName: 'Prueba UI',
  email: 'ui@example.invalid',
  roles: ['ADMIN'],
  permissions,
};
test('Todos los módulos y operaciones renderizan formularios sin errores', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/api/**', async (route) => {
    const path = new URL(route.request().url()).pathname;
    const data =
      path === '/api/auth/me'
        ? access
        : path === '/api/auth/login'
          ? { accessToken: 'mock-ui', user: access }
          : path === '/api/dashboard'
            ? {
                registeredOrders: 0,
                ordersByStatus: {},
                pendingDeliveries: 0,
                totalAmount: 0,
                paidAmount: 0,
                pendingAmount: 0,
              }
            : [];
    await route.fulfill({ json: data });
  });
  await page.goto('/login');
  await page.getByLabel('Correo', { exact: true }).fill('ui@example.invalid');
  await page.getByLabel('Contraseña', { exact: true }).fill('TemporaryTestPassword!');
  await page.getByRole('button', { name: 'Ingresar', exact: true }).click();
  await expect(page).toHaveURL(/dashboard/);
  let count = 0;
  for (const module of MODULES.filter((m) => m.id !== 'dashboard')) {
    await page.goto('/modulos/' + module.id);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(module.name);
    for (const op of OPERATIONS.filter(
      (op) => op.module === module.id && op.path !== '/api/auth/login',
    )) {
      await page
        .getByRole('navigation', { name: 'Operaciones' })
        .getByRole('button', { name: op.title, exact: true })
        .click();
      await expect(page.getByRole('heading', { level: 2 }).first()).toHaveText(op.title);
      await expect(page.locator('form button[type=submit]')).toBeVisible();
      count++;
    }
  }
  expect(count).toBe(102);
  expect(errors).toEqual([]);
});

test('Una sesión revocada vuelve al login y borra el token', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'expired'));
  await page.route('**/api/auth/me', (route) =>
    route.fulfill({ status: 401, json: { message: 'Sesión inválida' } }),
  );
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/login/);
  expect(await page.evaluate(() => sessionStorage.getItem('logierp.session'))).toBeNull();
});

test('Los permisos ocultan operaciones de escritura', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'reader'));
  await page.route('**/api/**', (route) =>
    route.fulfill({ json: { ...access, permissions: ['ORDERS:READ'] } }),
  );
  await page.goto('/modulos/pedidos');
  await expect(
    page
      .getByRole('navigation', { name: 'Operaciones' })
      .getByRole('button', { name: 'Listar', exact: true }),
  ).toBeVisible();
  await expect(
    page
      .getByRole('navigation', { name: 'Operaciones' })
      .getByRole('button', { name: 'Registrar', exact: true }),
  ).toHaveCount(0);
});
