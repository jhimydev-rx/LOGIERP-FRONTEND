import { test, expect } from '@playwright/test';
test('Rutas filtra todas las páginas y permite limpiar', async ({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('logierp.session','test'));
 const rows=Array.from({length:101},(_,i)=>({id:`route-${i}`,code:`R${i}`,name:i===100?'Ruta especial':'Ruta común',originAgencyId:'origin',destinationAgencyId:'destination',isActive:i!==100}));
 await page.route('**/api/**',r=>{
  const url=new URL(r.request().url());
  const data=url.pathname==='/api/auth/me'?{fullName:'Test',permissions:['TRANSPORT:READ','AGENCIES:READ'],roles:[]}:url.pathname==='/api/agencies'?[{id:'origin',name:'Lima'},{id:'destination',name:'Arequipa'}]:url.pathname.startsWith('/api/agencies/')?{agency:{name:'Agencia'}}:rows.slice((Number(url.searchParams.get('Page')||1)-1)*100,Number(url.searchParams.get('Page')||1)*100);
  return r.fulfill({json:data});
 });
 await page.goto('/modulos/rutas');
 await page.getByRole('button',{name:'Filtros',exact:true}).click();
 await page.locator('#filter-name').fill('especial');
 await page.getByRole('combobox',{name:'Estado de la ruta',exact:true}).selectOption('Inactivo');
 await page.getByRole('combobox',{name:'Agencia de origen',exact:true}).selectOption('origin');
 await page.getByRole('button',{name:'Aplicar filtros',exact:true}).click();
 await expect(page.locator('.records-table tbody tr')).toHaveCount(1);
 await expect(page.locator('.records-table')).toContainText('R100');
 await expect(page.getByRole('button',{name:'Siguiente',exact:true})).toBeDisabled();
 await page.getByRole('button',{name:'Limpiar filtros',exact:true}).click();
 await expect(page.locator('.records-table tbody tr')).toHaveCount(20);
 await expect(page.getByRole('button',{name:'Siguiente',exact:true})).toBeEnabled();
});
