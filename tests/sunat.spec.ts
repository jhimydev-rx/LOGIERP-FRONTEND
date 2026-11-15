import { test, expect } from '@playwright/test';
const user = {
  id: 'u',
  fullName: 'Operador SUNAT',
  email: 'beta@example.invalid',
  roles: ['ADMIN'],
  permissions: ['SUNAT:READ', 'SUNAT:CREATE', 'SUNAT:SEND'],
};
const invoice = {
  id: '11111111-1111-1111-1111-111111111111',
  series: 'F001',
  number: 1,
  status: 'PREPARED',
};
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'sunat-test'));
  await page.route('**/api/**', (route) =>
    route.fulfill({
      json: route.request().url().endsWith('/auth/me')
        ? user
        : /invoices\/[^/]+$/.test(route.request().url())
          ? invoice
          : [invoice],
    }),
  );
});
test('SUNAT descarga XML/CDR autenticados y muestra errores sin fingir éxito', async ({ page }) => {
  await page.goto('/modulos/sunat');
  await page.getByRole('button', { name: 'Ver registro', exact: true }).click();
  await page.route('**/api/sunat-beta/invoices/*/xml', (route) => {
    expect(route.request().headers()['authorization']).toBe('Bearer sunat-test');
    return route.fulfill({
      body: '<Invoice>TEST</Invoice>',
      contentType: 'application/xml',
      headers: { 'Content-Disposition': 'attachment; filename="F001-1.xml"' },
    });
  });
  await page
    .getByRole('navigation', { name: 'Operaciones' })
    .getByRole('button', { name: 'Descargar XML', exact: true })
    .click();
  const download = page.waitForEvent('download');
  await page.locator('form button[type=submit]').click();
  expect((await download).suggestedFilename()).toBe('F001-1.xml');
  await page.route('**/api/sunat-beta/invoices/*/cdr', (route) =>
    route.fulfill({ status: 404, json: { message: 'El CDR todavía no está disponible.' } }),
  );
  await page
    .getByRole('navigation', { name: 'Operaciones' })
    .getByRole('button', { name: 'Descargar CDR', exact: true })
    .click();
  await page.locator('form button[type=submit]').click();
  await expect(page.getByRole('alert')).toContainText('El CDR todavía no está disponible.');
  await page.route('**/api/sunat-beta/invoices/*/cdr', (route) =>
    route.fulfill({
      body: Buffer.from('PK-test'),
      contentType: 'application/zip',
      headers: { 'Content-Disposition': 'attachment; filename="R-F001-1.zip"' },
    }),
  );
  const cdr = page.waitForEvent('download');
  await page.locator('form button[type=submit]').click();
  expect((await cdr).suggestedFilename()).toBe('R-F001-1.zip');
});
test('Preparar factura envía las entradas del contrato; enviar requiere confirmación', async ({
  page,
}) => {
  await page.goto('/modulos/sunat');
  await page
    .getByRole('navigation', { name: 'Operaciones' })
    .getByRole('button', { name: 'Preparar comprobante', exact: true })
    .click();
  await page.getByLabel('Venta', { exact: true }).fill(invoice.id);
  await page.getByLabel('Serie', { exact: true }).fill('F001');
  await page.getByLabel('RUC del cliente', { exact: true }).fill('20123456789');
  await page.getByLabel('Razón social del cliente', { exact: true }).fill('Cliente de prueba');
  await page.getByLabel('Dirección del cliente', { exact: true }).fill('Dirección de prueba');
  await page.route('**/api/sunat-beta/invoices', (route) => {
    if (route.request().method() === 'POST')
      expect(route.request().postDataJSON()).toEqual({
        saleId: invoice.id,
        series: 'F001',
        customerRuc: '20123456789',
        customerName: 'Cliente de prueba',
        customerAddress: 'Dirección de prueba',
      });
    return route.fulfill({ json: invoice });
  });
  await page.locator('form button[type=submit]').click();
  await expect(page.getByRole('region', { name: 'Registro seleccionado' })).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Operaciones' })
    .getByRole('button', { name: 'Enviar a SUNAT beta', exact: true })
    .click();
  page.once('dialog', (dialog) => dialog.dismiss());
  await page.locator('form button[type=submit]').click();
  await expect(page.getByRole('status')).toHaveCount(0);
});
test('Navegación móvil accesible y sin desbordamiento horizontal', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/modulos/sunat');
  await page.getByRole('button', { name: 'Menú', exact: true }).click();
  await expect(page.getByRole('navigation', { name: 'Módulos' })).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Módulos' })
    .getByRole('link', { name: 'SUNAT beta' })
    .click();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
});
