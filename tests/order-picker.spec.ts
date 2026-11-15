import {test,expect} from '@playwright/test';
test('Cotizaciones usa un único pedido por seguimiento y consulta la ruta correcta',async({page})=>{
 const id='11111111-1111-1111-1111-111111111111';let queried='';
 await page.addInitScript(()=>sessionStorage.setItem('logierp.session','test'));
 await page.route('**/api/**',r=>{
 const u=new URL(r.request().url());
 if(u.pathname==='/api/auth/me')return r.fulfill({json:{fullName:'Test',roles:[],permissions:['SALES:READ','ORDERS:READ']}});
 if(u.pathname==='/api/orders')return r.fulfill({json:[{id,trackingNumber:'LG-000000000021'}]});
 if(u.pathname.includes('/quotations/orders/'))queried=u.pathname+u.search;
 return r.fulfill({json:[]});
 });
 await page.goto('/modulos/cotizaciones');
 const select=page.getByRole('combobox',{name:'Pedido',exact:true});
 await expect(select).toHaveCount(1);
 await expect(select.locator('option')).toContainText(['Seleccionar pedido','LG-000000000021']);
 await select.selectOption(id);
 await expect(page.locator('input').filter({hasText:id})).toHaveCount(0);
 await page.getByRole('button',{name:'Consultar pedido',exact:true}).click();
 await expect.poll(()=>queried).toContain('/api/quotations/orders/'+id);
 expect(queried).not.toContain('OrderId=');
 await expect(page.getByText('Selecciona el pedido que deseas consultar.',{exact:true})).toHaveCount(0);
});
