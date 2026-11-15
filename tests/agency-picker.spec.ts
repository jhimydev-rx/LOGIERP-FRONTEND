import { test, expect } from '@playwright/test';
test('Editar ruta muestra agencias seleccionadas y envía sus IDs internos', async ({ page }) => {
 await page.addInitScript(() => sessionStorage.setItem('logierp.session', 'test'));
 const row = {id:'route',code:'R1',name:'Ruta de prueba',originAgencyId:'origin',destinationAgencyId:'destination',expectedDurationMinutes:60,isActive:true};
 const agencies = [{id:'origin',name:'Lima Centro',code:'LIM'},{id:'destination',name:'Arequipa Centro',code:'ARE'},{id:'other',name:'Trujillo Centro',code:'TRU'}];
 let saved: any;
 await page.route('**/api/**', route => {
  const path = new URL(route.request().url()).pathname;
  if (route.request().method() === 'PUT') { saved = route.request().postDataJSON(); return route.fulfill({json:row}); }
  const data = path === '/api/auth/me' ? {fullName:'Test',permissions:['TRANSPORT:READ','TRANSPORT:UPDATE','AGENCIES:READ'],roles:[]} : path === '/api/agencies' ? agencies : path.startsWith('/api/agencies/') ? {agency:agencies.find(a=>a.id===path.split('/').pop())} : [row];
  return route.fulfill({json:data});
 });
 await page.goto('/modulos/rutas');
 await page.getByRole('button',{name:'Ver registro',exact:true}).click();
 await page.getByRole('region',{name:'Registro seleccionado'}).getByRole('button',{name:'Editar',exact:true}).click();
 const origin=page.getByRole('combobox',{name:'Agencia de origen',exact:true});
 const destination=page.getByRole('combobox',{name:'Agencia de destino',exact:true});
 await expect(origin.locator('option:checked')).toHaveText('Lima Centro');
 await expect(destination.locator('option:checked')).toHaveText('Arequipa Centro');
 await expect(page.locator('input[value="origin"]')).toHaveCount(0);
 await expect(page.locator('form').getByRole('button',{name:'Buscar opciones',exact:true})).toHaveCount(0);
 await destination.selectOption('other');
 await page.locator('form button[type=submit]').click();
 await expect.poll(()=>saved?.destinationAgencyId).toBe('other');
 expect(saved.originAgencyId).toBe('origin');
});
