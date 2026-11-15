# LogiERP - frontend

Frontend Angular y TypeScript para el backend completo de LogiERP, incluido SUNAT beta. Diseño en azul oscuro, naranja y blanco, con logo vectorial, ilustración de transporte, tablas y formularios. Sin biblioteca visual adicional. Incluye exportación de reportes Excel de ventas, caja y compras.

## Arranque

```bash
cd LOGIERP-FRONTEND
npm ci
npm start
```

Abrir http://127.0.0.1:4200. El proxy de desarrollo envía `/api` y `/health` a `http://localhost:5263`. El backend debe estar iniciado y configurado localmente. Para SUNAT se necesita la versión completa, su base separada y su configuración beta existente; no ejecutar scripts SQL sobre la base de desarrollo del equipo.

En el checkout del backend completo configurado para beta:

```bash
dotnet run --project LogiERP.API --launch-profile http -- --sunat-beta
```

No se incluyen cuentas, contraseñas ni certificados en el frontend. Usa una cuenta existente de esa instancia. El servidor mantiene la validación y autorización definitivas; el menú refleja sus permisos. La sesión se conserva en sessionStorage y el cierre de sesión revoca el acceso en el backend.

## Funcionalidades

- Login y menú adaptable a escritorio/móvil, buscador de módulos y visibilidad según permisos.
- Dashboard con filtros, indicadores reales, distribución de pedidos por estado y saldo pendiente. No usa datos de ejemplo en la aplicación.
- Seguridad, configuración, agencias, pedidos, almacén, transporte, entregas, ventas, caja y compras.
- SUNAT beta: preparar comprobante desde una venta pagada, enviar con confirmación, listar, consultar detalle e intentos, descargar XML y CDR con autenticación. Los documentos beta no tienen validez tributaria. Si el backend está deshabilitado, el usuario no tiene permiso o el archivo no existe, se muestra el error correspondiente.
- Formularios anidados, selección de registros para edición, búsqueda de relaciones y manejo de errores. Algunos vínculos todavía requieren elegir o introducir el identificador del recurso; no confundir una venta, un pedido y una sesión de caja.
- Rutas de negocio y de salud inventariadas en `docs/endpoint-coverage.json`. La cobertura de rutas no significa que todos los casos de negocio se hayan probado desde el navegador.

## Uso

1. Abre un módulo: verás primero sus registros, filtros y paginación. Usa el botón principal para crear o selecciona una fila para ver sus acciones.
2. Las acciones del registro reutilizan su identificador y las ediciones rellenan los campos disponibles. El menú de operaciones de cada módulo permite cambiar entre consultas y gestión. En entregas y cotizaciones, elige primero el pedido.
3. Usa los buscadores para cargar opciones o agrega las filas necesarias en formularios de paquetes y líneas.
4. Las fechas se introducen en horario local y se envían en UTC. En el Dashboard, el período corresponde a la creación del pedido; sus cobros se acumulan independientemente de la fecha de pago.
5. Para SUNAT, prepara el comprobante, selecciona el registro devuelto, envía a beta y consulta el resultado. El XML se descarga tras la preparación; el CDR depende de la respuesta disponible. Una respuesta desconocida no equivale a aceptación.

En Caja, selecciona una sesión para ver el efectivo esperado, ingresos, egresos y movimientos. Desde ahí puedes cobrar, registrar movimientos y cerrar; las sesiones cerradas deshabilitan esas acciones. «Cambiar sesión» abre el historial. Los saldos proceden del backend.

## Organización

`src/app/core`: sesión, HTTP y transformación de formularios.
`src/app/data/api-contract.ts`: operaciones y esquemas del contrato completo.
`src/app/pages`: login, dashboard y pantalla de trabajo por módulo.
`src/app/shared`: campos y resultados reutilizables.
`public`: logo e ilustración SVG locales, sin servicios externos.
`docs/endpoint-coverage.json`: inventario de rutas.

## Comprobaciones

```bash
npm run build
npm test
npm run check:coverage
```

`npm test` necesita el frontend iniciado; `LOGIERP_FRONT_URL` permite usar otro puerto. `check:coverage` consulta el Swagger del backend en 5263; admite `LOGIERP_API_URL` o `LOGIERP_OPENAPI_FILE` para verificar otro contrato.

Para actualizar el contrato conservando etiquetas y permisos existentes:

```bash
node scripts/sync-contract.cjs /ruta/swagger.json
```

El sincronizador falla si encuentra una ruta nueva sin clasificar: revisar su módulo, permiso, comportamiento y pruebas antes de incorporarla.

El flujo real se ejecuta con `npm run test:live`. Indicar `LOGIERP_BACKEND` con el checkout del backend completo. Este comando usa Docker/PostgreSQL, genera una base temporal y la elimina al terminar. `LOGIERP_SUNAT_TEST=1` activa el arnés beta del backend, que requiere su configuración local y el proyecto SunatBetaChecks compilado; usa transporte SUNAT simulado, sin enviar comprobantes reales.

## Verificación del 09/11/2026

- Producción: compilación correcta.
- Contrato: coincidencia exacta de 113 rutas con el backend completo, revisión 4de161e.
- Navegador: 7 pruebas correctas (formularios, edición, permisos, sesión, SUNAT, descarga y móvil).
- Flujo real: login, dashboard, alta/edición de proveedor, pedido anidado, error de validación y cierre de sesión correctos.
- Backend: 304 comprobaciones HTTP/bootstrap correctas, incluyendo SUNAT con transporte simulado, en base temporal aislada.
- Revisión visual de login, dashboard y formularios, en escritorio y móvil.

La prueba local no acredita una emisión tributaria en producción ni reemplaza la configuración real del emisor. No se agregaron reportes ni exportaciones Excel/PDF/CSV.

Para publicar el frontend, `npm run build` genera `dist/front-logierp/browser`. El servidor final debe resolver las rutas de Angular hacia `index.html` y reenviar `/api` y `/health` al backend; el proxy de `npm start` solo funciona en desarrollo.

## Flujos de trabajo actualizados — 11/11/2026

Los módulos abren con listados, filtros y acciones por registro. Caja muestra saldos y movimientos, con cobro, movimiento y cierre desde la sesión seleccionada. Los formularios aparecen al elegir una acción. Se conserva el acceso a las operaciones adicionales.

Compilación correcta y flujo real del navegador aprobado: proveedor, pedido, movimiento y cierre de caja. Suite del backend: 304 comprobaciones en base temporal con SUNAT simulado. El cierre del navegador se ejecuta después de las pruebas SUNAT para no invalidar su sesión de prueba compartida.

## Revisión del frontend — 15/11/2026

Incluye selectores por nombre, permisos agrupados por módulo, geografía por niveles y consultas de entregas por programación e intento. El recorrido programación → intento entregado → constancia se verificó en navegador contra la API beta. La compilación de producción pasó; esto no certifica una revisión manual de todos los formularios.
