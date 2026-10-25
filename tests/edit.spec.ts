import { test, expect } from '@playwright/test';
test('Nested edit retains changed numeric value', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'test'));
  const row = {
    id: '00000000-0000-0000-0000-000000000001',
    serviceTypeCode: 'STANDARD',
    packages: [{ id: '00000000-0000-0000-0000-000000000002', weightKg: 3, description: 'package' }],
  };
  await page.route('**/api/**', (r) =>
    r.fulfill({
      json: r.request().url().includes('/auth/me')
        ? { permissions: ['ORDERS:READ', 'ORDERS:UPDATE', 'ORDERS:CREATE'], fullName: 'Test' }
        : r.request().method() === 'POST'
          ? row
          : [row],
    }),
  );
  await page.goto('/modulos/pedidos');
  await page
    .getByRole('navigation', { name: 'Operaciones' })
    .getByRole('button', { name: 'Registrar', exact: true })
    .click();
  await page.getByRole('button', { name: 'Añadir Paquetes', exact: true }).click();
  await page.locator('#body-packages-0-weightKg').fill('3');
  await page.locator('form button[type=submit]').click();
  await page.getByRole('button', { name: 'Usar este registro', exact: true }).click();
  await page
    .getByRole('navigation', { name: 'Operaciones' })
    .getByRole('button', { name: 'Editar', exact: true })
    .click();
  await expect(page.getByRole('heading', {name:'Editar', exact:true})).toBeVisible();
  await expect(page.locator('#body-packages-0-weightKg')).toHaveValue('3');
  await page.locator('#body-packages-0-weightKg').fill('-1');
  await page.locator('#body-packages-0-weightKg').blur();
  await expect(page.locator('#body-packages-0-weightKg')).toHaveValue('-1');
});
