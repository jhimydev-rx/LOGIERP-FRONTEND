import { test, expect } from '@playwright/test';
test('Recepción y detalles muestran nombres de ubicaciones', async ({ page }) => {
 await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'test'));
 const row = { id: 'stock', packageId: 'package', warehouseId: 'warehouse-id', locationId: 'location-id', fromLocationId: 'location-id', toLocationId: 'destination-id' };
 await page.route('**/api/**', route => {
  const path = new URL(route.request().url()).pathname;
  const data = path === '/api/auth/me' ? { fullName: 'Test', permissions: ['WAREHOUSE:READ'], roles: [] } : path === '/api/warehouses' ? [{ id: 'warehouse-id', code: 'ALM-01', name: 'Almacén Lima' }] : path === '/api/warehouse-locations' ? [{ id: 'location-id', code: 'A-01', name: 'Estante principal' }, { id: 'destination-id', code: 'B-02', name: 'Zona de despacho' }] : [row];
  return route.fulfill({ json: data });
 });
 await page.goto('/modulos/recepcion');
 const table = page.locator('.records-table');
 await expect(table).toContainText('A-01 · Estante principal');
 await expect(table).toContainText('ALM-01 · Almacén Lima');
 await expect(table).not.toContainText('location-id');
 await page.getByRole('button', { name: 'Ver registro', exact: true }).click();
 await page.getByText('Información completa', { exact: true }).click();
 const detail = page.getByRole('region', { name: 'Registro seleccionado' });
 await expect(detail).toContainText('A-01 · Estante principal');
 await expect(detail).toContainText('B-02 · Zona de despacho');
 await expect(detail).not.toContainText('destination-id');
});
