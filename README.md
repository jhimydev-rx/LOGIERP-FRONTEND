# LogiERP — frontend básico

Angular 22.2.3, Angular CLI 22.2.4 y TypeScript 6.0.2. Aplicación independiente del backend, con HTML y CSS mínimos, sin biblioteca visual adicional.

## Arranque local

Requisitos: Node.js 26, npm y el backend LogiERP configurado con PostgreSQL.

```bash
# Terminal del backend
cd /home/chboy/RiderProjects/LogiERP
dotnet run --project LogiERP.API --launch-profile http

# Terminal del frontend
cd /home/chboy/FRONT-LOGIERP
npm ci
npm start
```

Abrir http://127.0.0.1:4200 e ingresar con una cuenta existente. No incluye contraseñas ni modifica el administrador. El proxy de desarrollo dirige `/api` y `/health` a http://localhost:5263; cambiar `proxy.conf.json` si cambia ese puerto.

## Alcance y uso

Login, sesión, dashboard y formularios para las 104 operaciones de los controladores, más dos comprobaciones de salud. Incluye seguridad, configuración, agencias, pedidos, almacén, transporte, entregas, tarifas, cotizaciones, ventas, caja y compras. La matriz completa está en `docs/endpoint-coverage.json`.

Cada módulo muestra sus operaciones disponibles según los permisos devueltos por el backend. La API conserva la validación y autorización definitivas. El token vive en sessionStorage de la pestaña; cerrar sesión lo elimina y revoca en el backend.

1. Elegir módulo y operación. Las listas permiten indicar página y tamaño.
2. Consultar o registrar. Usar «Seleccionar» o «Usar este registro» para reutilizar un identificador y rellenar una edición.
3. Los formularios anidados permiten agregar paquetes, líneas, horarios y asignaciones. Los botones de búsqueda cargan hasta 100 opciones; también se pueden introducir IDs obtenidos de las consultas.
4. Los resultados muestran detalles completos, incluidos identificadores. Para operaciones entre recursos distintos, introducir el ID del recurso solicitado. Una venta, una sesión de caja y un pedido tienen IDs distintos.
5. Las fechas con hora se introducen en horario local y se envían en UTC. Los errores de validación y negocio se muestran en la pantalla.

La interfaz es deliberadamente básica: no incluye flujos guiados completos ni diseño visual. Algunos pasos requieren copiar identificadores de otro módulo. Consume lo que expone actualmente la API; no añade integración SUNAT ni operaciones inexistentes en el backend.

## Organización

- `src/app/core`: cliente HTTP, sesión, contrato y transformación de formularios.
- `src/app/data/api-contract.ts`: metadatos de endpoints, permisos y esquemas del Swagger actual.
- `src/app/pages`: login, indicadores y operaciones por módulo.
- `src/app/shared`: formularios recursivos y visualización de resultados.
- `docs/endpoint-coverage.json`: inventario de cobertura de rutas.
- `tests`: pruebas de navegación y flujo real en navegador.

Si cambia la API, actualizar sus metadatos y comprobar cobertura. El frontend no genera ni modifica código del backend.

## Verificación

Con el frontend ejecutándose:

```bash
npm run build
npx playwright install chromium
npm test
npm run check:coverage
npm run test:live
```

`npm test` prueba navegación y formularios de todos los módulos con respuestas simuladas, sesión expirada y permisos. `check:coverage` compara las rutas con el Swagger de localhost:5263. La cobertura de rutas no significa que cada flujo de negocio haya sido ejecutado desde navegador.

`test:live` ejecuta las pruebas de integración del backend y un flujo real de login, dashboard, alta/edición de proveedor, pedido con paquetes, validación y logout. Usa una base temporal que elimina al terminar, sin cambiar los datos ni credenciales de tu base habitual. Requiere las mismas dependencias locales de `tests/integration.py` del backend (Docker/PostgreSQL y .NET). Se puede indicar otra carpeta del backend con `LOGIERP_BACKEND`.

Para producción, `npm run build` genera `dist/front-logierp/browser`. El servidor que publique esos archivos debe redirigir rutas Angular a index.html y enviar `/api` y `/health` al backend: el proxy de `npm start` es solo de desarrollo.

Vite está fijado mediante `overrides` a 8.3.5, parche de la misma rama usada por Angular CLI, para corregir vulnerabilidades del servidor de desarrollo.

## Resultado de la verificación (24/10/2026)

- Compilación de producción correcta.
- Cuatro pruebas de interfaz correctas; caso de transición a edición repetido cinco veces correctamente.
- Flujo real de navegador correcto y 250 comprobaciones HTTP/bootstrap del backend correctas en base temporal.
- Cobertura contrastada: 106 operaciones, incluidas dos de salud.
- npm audit: cero vulnerabilidades reportadas al instalar las dependencias finales.
