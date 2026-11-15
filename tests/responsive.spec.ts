import {test,expect} from '@playwright/test';
for (const width of [320,390,768,1024]) {
  test(`Dashboard y selectores a ${width}px`, async ({page}) => {
    await page.setViewportSize({width,height:900});
    await page.addInitScript(()=>sessionStorage.setItem('logierp.session','test'));
    await page.route('**/api/**',route=>{
      const path=new URL(route.request().url()).pathname;
      const data=path==='/api/auth/me'?{fullName:'Administrador LogiERP',roles:['ADMIN'],permissions:['DASHBOARD:READ','SECURITY:READ','SECURITY:CREATE','SECURITY:MANAGE_ACCESS']}:
      path==='/api/dashboard'?{registeredOrders:120,ordersByStatus:{REGISTERED:80,IN_TRANSIT:40},pendingDeliveries:20,totalAmount:12345678.99,paidAmount:9999999,pendingAmount:2345679.99}:
      path==='/api/roles'?[{id:'role',code:'ADMIN',name:'Administrador',description:'Acceso a todas las funcionalidades',isActive:true}]:[];
      return route.fulfill({json:data});
    });
    await page.goto('/dashboard');
    await expect(page.getByRole('region',{name:'Indicadores'})).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({path:`../../tmp/dashboard-${width}.png`,fullPage:true});
    await page.goto('/modulos/usuarios');
    await page.getByRole('button',{name:'+ Nuevo usuario',exact:true}).click();
    const roles=page.getByRole('group',{name:'Roles del usuario',exact:true});
    await roles.locator('summary').click();
    await roles.getByRole('checkbox',{name:/Administrador/}).check();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({path:`../../tmp/form-${width}.png`,fullPage:true});
  });
}
