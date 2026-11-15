import {test,expect} from '@playwright/test';
test('Rutas muestra agencias por nombre en listado y detalle',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('logierp.session','test'));
 const row={id:'route',code:'DEMO-R2',name:'Ruta DEMO',originAgencyId:'origin',destinationAgencyId:'destination',expectedDurationMinutes:120,isActive:true};
 await page.route('**/api/**',r=>{
 const path=new URL(r.request().url()).pathname;
 const data=path==='/api/auth/me'?{fullName:'Test',permissions:['TRANSPORT:READ','AGENCIES:READ'],roles:[]}:
 path==='/api/agencies/origin'?{agency:{name:'Arequipa Centro',code:'ARE'},openingHours:[],users:[]}:path==='/api/agencies/destination'?{agency:{name:'Trujillo Centro',code:'TRU'},openingHours:[],users:[]}:path==='/api/routes/route'?row:[row];
 return r.fulfill({json:data});
 });
 await page.goto('/modulos/rutas');
 await expect(page.locator('.records-table')).toContainText('Arequipa Centro');
 await page.getByRole('button',{name:'Ver registro',exact:true}).click();
 await page.getByText('Información completa',{exact:true}).click();
 const detail=page.getByRole('region',{name:'Registro seleccionado'});
 await expect(detail).toContainText('Arequipa Centro');
 await expect(detail).toContainText('Trujillo Centro');
 await expect(detail).toContainText('Duración estimada (minutos)');
 await expect(detail.locator('dd').filter({hasText:/^origin$/})).toHaveCount(0);
});
