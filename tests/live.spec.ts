import { test, expect } from '@playwright/test';

test('Flujo real: login, dashboard, proveedor, pedido anidado y error de negocio', async ({
  page,
}) => {
  test.skip(
    !process.env['LOGIERP_API_URL'],
    'Ejecutar con scripts/test-live.py para usar una base temporal.',
  );
  const backend = process.env['LOGIERP_API_URL']!;
  await page.route('**/api/**', async (route) => {
    const url = new URL(route.request().url());
    const response = await route.fetch({ url: backend + url.pathname + url.search });
    await route.fulfill({ response });
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/login');
  await page.getByLabel('Correo', { exact: true }).fill(process.env['LOGIERP_EMAIL']!);
  await page.getByLabel('Contraseña', { exact: true }).fill(process.env['LOGIERP_PASSWORD']!);
  await page.getByRole('button', { name: 'Ingresar', exact: true }).click();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByText('Pedidos registrados', { exact: true })).toBeVisible();
  await page.goto('/modulos/proveedores');
  await page
    .getByRole('navigation', { name: 'Operaciones' })
    .getByRole('button', { name: 'Registrar', exact: true })
    .click();
  await page.getByLabel('RUC', { exact: true }).fill('20999888777');
  await page.getByLabel('Razón social', { exact: true }).fill('Proveedor creado desde Angular');
  await page.locator('form button[type=submit]').click();
  await expect(page.getByRole('status')).toContainText('Operación completada');
  await page.getByRole('button', { name: 'Usar este registro', exact: true }).click();
  await page
    .getByRole('navigation', { name: 'Operaciones' })
    .getByRole('button', { name: 'Editar', exact: true })
    .click();
  await expect(page.getByLabel('Razón social', { exact: true })).toHaveValue(
    'Proveedor creado desde Angular',
  );
  await page.getByLabel('Razón social', { exact: true }).fill('Proveedor editado desde Angular');
  await page.locator('form button[type=submit]').click();
  await expect(page.getByRole('status')).toContainText('Operación completada');
  // Exercise UUID relationships and nested package/remitter forms through actual HTTP.
  const token = await page.evaluate(() => sessionStorage.getItem('logierp.session'));
  const response = await page.request.get(backend + '/api/agencies?pageSize=100', {
    headers: { Authorization: 'Bearer ' + token },
  });
  const agencies = await response.json();
  await page.goto('/modulos/pedidos');
  await page
    .getByRole('navigation', { name: 'Operaciones' })
    .getByRole('button', { name: 'Registrar', exact: true })
    .click();
  await page.getByLabel('Servicio', { exact: true }).fill('STANDARD');
  await page
    .getByLabel('Agencia de origen', { exact: true })
    .fill(agencies.find((a: any) => a.code === 'ORIGIN').id);
  await page
    .getByLabel('Agencia de destino', { exact: true })
    .fill(agencies.find((a: any) => a.code === 'DESTINATION').id);
  await page.locator('#body-sender-fullName').fill('Remitente Angular');
  await page.locator('#body-sender-phone').fill('999999999');
  await page.locator('#body-recipient-fullName').fill('Destinatario Angular');
  await page.locator('#body-recipient-phone').fill('999999999');
  await page.getByRole('button', { name: 'Añadir Paquetes', exact: true }).click();
  await page.locator('#body-packages-0-packageTypeCode').fill('BOX');
  await page.locator('#body-packages-0-description').fill('Paquete desde Angular');
  await page.locator('#body-packages-0-weightKg').fill('3');
  await page.locator('#body-packages-0-declaredValue').fill('10');
  await page.locator('form button[type=submit]').click();
  await expect(page.getByRole('status')).toContainText('Operación completada');
  await expect(page.getByText('REGISTERED', { exact: true }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Usar este registro', exact: true }).click();
  await page
    .getByRole('navigation', { name: 'Operaciones' })
    .getByRole('button', { name: 'Editar', exact: true })
    .click();
  await expect(page.getByRole('heading', {name:'Editar', exact:true})).toBeVisible();
  await expect(page.locator('#body-packages-0-description')).toHaveValue('Paquete desde Angular');
  await expect(page.locator('#body-packages-0-weightKg')).toHaveValue('3');
  await page.locator('#body-packages-0-weightKg').fill('-1');
  await page.locator('#body-packages-0-weightKg').blur();
  await expect(page.locator('#body-packages-0-weightKg')).toHaveValue('-1');
  await page.locator('form button[type=submit]').click();
  await expect(page.getByRole('alert')).toContainText('WeightKg');
  await page.getByRole('button', { name: 'Cerrar sesión', exact: true }).first().click();
  await expect(page).toHaveURL(/login/);
  expect(errors).toEqual([]);
});
