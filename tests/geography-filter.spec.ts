import {test,expect} from '@playwright/test';
test('Geografía selecciona padres por nombre y no consulta distritos sin provincia',async({page})=>{
 await page.addInitScript(()=>sessionStorage.setItem('logierp.session','test'));
 let districtCalls=0;
 await page.route('**/api/**',r=>{
  const u=new URL(r.request().url());
  if(u.pathname.endsWith('/districts')){districtCalls++;expect(u.searchParams.get('parentId')).toBe('province-id');}
  const data=u.pathname==='/api/auth/me'?{fullName:'Test',permissions:['CONFIGURATION:READ'],roles:[]}:u.pathname.endsWith('/departments')?[{id:'department-id',name:'Lima'}]:u.pathname.endsWith('/provinces')?[{id:'province-id',name:'Lima Metropolitana'}]:[{id:'district-id',name:'Miraflores'}];
  return r.fulfill({json:data});
 });
 await page.goto('/modulos/geografia');
 await page.getByRole('combobox',{name:'Nivel geográfico',exact:true}).selectOption('districts');
 await page.getByRole('button',{name:'Consultar',exact:true}).click();
 expect(districtCalls).toBe(0);
 await expect(page.getByRole('alert')).toContainText('Selecciona el departamento y la provincia');
 await page.getByRole('combobox',{name:'Departamento',exact:true}).selectOption('department-id');
 await page.getByRole('combobox',{name:'Provincia',exact:true}).selectOption('province-id');
 await page.getByRole('button',{name:'Consultar',exact:true}).click();
 await expect(page.locator('.records-table')).toContainText('Miraflores');
 expect(districtCalls).toBe(1);
 await page.getByRole('combobox',{name:'Nivel geográfico',exact:true}).selectOption('provinces');
 await expect(page.getByRole('combobox',{name:'Departamento',exact:true})).toHaveValue('');
});
