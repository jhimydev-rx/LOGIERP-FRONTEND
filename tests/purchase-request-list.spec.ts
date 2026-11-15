import { test, expect } from '@playwright/test';
test('Solicitudes muestra motivo agencia fecha y estado con el contrato real', async ({ page }) => {
 await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'test'));
 const row = {id:'request-id',agencyId:'agency-id',requestedBy:'user-id',requestedAt:'2026-11-13T12:00:00Z',reason:'Reposición de cajas',statusCode:'DRAFT',lines:[]};
 await page.route('**/api/**', route => {
  const path = new URL(route.request().url()).pathname;
  return route.fulfill({json:path==='/api/auth/me'?{fullName:'Test',permissions:['PURCHASING:READ','AGENCIES:READ'],roles:[]}:path==='/api/agencies/agency-id'?{agency:{name:'Lima Centro'}}:path==='/api/purchase-requests/request-id'?row:[row]});
 });
 await page.goto('/modulos/solicitudes');
 const table=page.locator('.records-table');
 for(const name of ['Motivo','Agencia','Fecha de solicitud','Estado']) await expect(table.getByRole('columnheader',{name,exact:true})).toBeVisible();
 await expect(table).toContainText('Reposición de cajas');
 await expect(table).toContainText('Lima Centro');
 await expect(table).toContainText('13/11/26');
 await page.getByRole('button',{name:'Ver registro',exact:true}).click();
 await expect(page.getByRole('region',{name:'Registro seleccionado'}).getByRole('heading',{name:'Reposición de cajas',exact:true})).toBeVisible();
});
