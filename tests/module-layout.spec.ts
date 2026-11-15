import { test, expect } from '@playwright/test';
for (const width of [1440, 390]) {
 test(`Menú de módulo y tarea central a ${width}px`, async ({page}) => {
  await page.setViewportSize({width,height:900});
  await page.addInitScript(()=>sessionStorage.setItem('logierp.session','test'));
  const row={id:'route',name:'Lima - Arequipa',code:'R1',originAgencyId:'origin',destinationAgencyId:'destination',isActive:true};
  await page.route('**/api/**',r=>{
   const path=new URL(r.request().url()).pathname;
   return r.fulfill({json:path==='/api/auth/me'?{fullName:'Administrador',permissions:['TRANSPORT:READ','TRANSPORT:UPDATE','TRANSPORT:CREATE','AGENCIES:READ'],roles:[]}:path==='/api/agencies'?[{id:'origin',name:'Lima Centro'},{id:'destination',name:'Arequipa Centro'}]:path.startsWith('/api/agencies/')?{agency:{name:path.endsWith('origin')?'Lima Centro':'Arequipa Centro'}}:[row]});
  });
  await page.goto('/modulos/rutas');
  const menu=page.getByRole('navigation',{name:'Operaciones'});
  await expect(page.locator('.records-table')).toBeVisible();
  if(width>1100){const a=await menu.boundingBox(), b=await page.locator('.module-content').boundingBox();expect(a!.x).toBeGreaterThan(b!.x+b!.width);}
  if(width<=1100) await menu.getByRole('button',{name:'Elegir sección o acción'}).click();
  await menu.getByRole('button',{name:'Registrar',exact:true}).click();
  await expect(page.getByRole('region',{name:'Acción en curso'})).toBeVisible();
  await expect(page.locator('.records-table')).toBeHidden();
  await page.getByRole('button',{name:'Cancelar acción',exact:true}).click();
  await expect(page.locator('.records-table')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
  await page.screenshot({path:`/tmp/module-layout-${width}.png`,fullPage:true});
 });
}
