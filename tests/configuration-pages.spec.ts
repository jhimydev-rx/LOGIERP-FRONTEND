import {test,expect} from '@playwright/test';
for(const exists of [false,true]) test(`Empresa separada, configurada=${exists}`,async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('logierp.session','test'));
 await page.route('**/api/**',r=>{
  const path=new URL(r.request().url()).pathname;
  if(path==='/api/auth/me')return r.fulfill({json:{fullName:'Test',permissions:['CONFIGURATION:READ','CONFIGURATION:CREATE','CONFIGURATION:UPDATE'],roles:[]}});
  if(path==='/api/configuration/company')return exists?r.fulfill({json:{id:1,legalName:'Empresa de prueba',tradeName:'Demo',ruc:'20123456789'}}):r.fulfill({status:404,json:{message:'Empresa no configurada.'}});
  return r.fulfill({json:[]});
 });
 await page.goto('/modulos/configuracion');
 await expect(page.getByRole('heading',{name:'Empresa',exact:true}).first()).toBeVisible();
 const nav=page.getByRole('navigation',{name:'Operaciones'});
 await expect(nav.getByRole('button',{name:'Consultar catálogo',exact:true})).toHaveCount(0);
 await expect(nav.getByRole('button',{name:exists?'Editar datos':'Configurar empresa',exact:true})).toBeVisible();
 if(!exists)await expect(page.getByText('Configura los datos de tu empresa',{exact:true})).toBeVisible();
 await nav.getByRole('button',{name:exists?'Editar datos':'Configurar empresa',exact:true}).click();
 if(exists)await expect(page.locator('#body-legalName')).toHaveValue('Empresa de prueba');
 await page.goto('/modulos/catalogos');
 await expect(page.getByRole('heading',{name:'Catálogos',exact:true})).toBeVisible();
 await expect(nav.getByRole('button',{name:'Consultar empresa',exact:true})).toHaveCount(0);
 await expect(nav.getByRole('button',{name:'Guardar opción del catálogo',exact:true})).toBeVisible();
 await page.goto('/modulos/geografia');
 await expect(page.getByRole('heading',{name:'Geografía',exact:true})).toBeVisible();
});
