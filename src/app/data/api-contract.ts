import { Module, Operation, Schema } from '../core/contracts';

export const MODULES: Module[] = [
  {
    id: 'cuenta',
    name: 'Mi cuenta',
    group: 'Seguridad',
  },
  {
    id: 'usuarios',
    name: 'Usuarios',
    group: 'Seguridad',
  },
  {
    id: 'roles',
    name: 'Roles',
    group: 'Seguridad',
  },
  {
    id: 'permisos',
    name: 'Permisos',
    group: 'Seguridad',
  },
  {
    id: 'auditoria',
    name: 'Auditoría',
    group: 'Seguridad',
  },
  {
    id: 'configuracion',
    name: 'Empresa y catálogos',
    group: 'Configuración',
  },
  {
    id: 'agencias',
    name: 'Agencias y responsables',
    group: 'Agencias',
  },
  {
    id: 'pedidos',
    name: 'Pedidos y seguimiento',
    group: 'Pedidos',
  },
  {
    id: 'almacenes',
    name: 'Almacenes',
    group: 'Almacén',
  },
  {
    id: 'ubicaciones',
    name: 'Ubicaciones',
    group: 'Almacén',
  },
  {
    id: 'recepcion',
    name: 'Recepción y movimientos',
    group: 'Almacén',
  },
  {
    id: 'vehiculos',
    name: 'Vehículos',
    group: 'Transporte',
  },
  {
    id: 'conductores',
    name: 'Conductores',
    group: 'Transporte',
  },
  {
    id: 'rutas',
    name: 'Rutas',
    group: 'Transporte',
  },
  {
    id: 'viajes',
    name: 'Viajes',
    group: 'Transporte',
  },
  {
    id: 'entregas',
    name: 'Entregas e intentos',
    group: 'Entregas',
  },
  {
    id: 'tarifas',
    name: 'Tarifas',
    group: 'Ventas',
  },
  {
    id: 'cotizaciones',
    name: 'Cotizaciones',
    group: 'Ventas',
  },
  {
    id: 'ventas',
    name: 'Ventas y comprobantes',
    group: 'Ventas',
  },
  {
    id: 'series',
    name: 'Series de comprobantes',
    group: 'Ventas',
  },
  {
    id: 'cajas',
    name: 'Cajas',
    group: 'Caja',
  },
  {
    id: 'sesiones-caja',
    name: 'Sesiones y cobros',
    group: 'Caja',
  },
  {
    id: 'proveedores',
    name: 'Proveedores',
    group: 'Compras',
  },
  {
    id: 'suministros',
    name: 'Suministros',
    group: 'Compras',
  },
  {
    id: 'solicitudes',
    name: 'Solicitudes de compra',
    group: 'Compras',
  },
  {
    id: 'compras',
    name: 'Órdenes y recepciones',
    group: 'Compras',
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    group: 'Dashboard',
  },
];

export const OPERATIONS: Operation[] = [
  {
    key: 'GET /api/agencies',
    method: 'GET',
    path: '/api/agencies',
    module: 'agencias',
    title: 'Listar',
    permissions: ['AGENCIES:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/agencies',
    method: 'POST',
    path: '/api/agencies',
    module: 'agencias',
    title: 'Registrar',
    permissions: ['AGENCIES:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Agencies.SaveAgencyDto',
    },
  },
  {
    key: 'PUT /api/agencies/{id}',
    method: 'PUT',
    path: '/api/agencies/{id}',
    module: 'agencias',
    title: 'Editar',
    permissions: ['AGENCIES:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Agencies.SaveAgencyDto',
    },
  },
  {
    key: 'GET /api/agencies/{id}',
    method: 'GET',
    path: '/api/agencies/{id}',
    module: 'agencias',
    title: 'Consultar detalle',
    permissions: ['AGENCIES:READ'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'PUT /api/agencies/{id}/assignments',
    method: 'PUT',
    path: '/api/agencies/{id}/assignments',
    module: 'agencias',
    title: 'Horarios y responsables',
    permissions: ['SECURITY:MANAGE_ACCESS', 'AGENCIES:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Agencies.AgencyAssignmentsDto',
    },
  },
  {
    key: 'GET /api/audit',
    method: 'GET',
    path: '/api/audit',
    module: 'auditoria',
    title: 'Listar',
    permissions: ['SECURITY:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/cash-registers',
    method: 'GET',
    path: '/api/cash-registers',
    module: 'cajas',
    title: 'Listar',
    permissions: ['CASH:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/cash-registers',
    method: 'POST',
    path: '/api/cash-registers',
    module: 'cajas',
    title: 'Registrar',
    permissions: ['CASH:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.CashRegisters.SaveCashRegisterDto',
    },
  },
  {
    key: 'PUT /api/cash-registers/{id}',
    method: 'PUT',
    path: '/api/cash-registers/{id}',
    module: 'cajas',
    title: 'Editar',
    permissions: ['CASH:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.CashRegisters.SaveCashRegisterDto',
    },
  },
  {
    key: 'GET /api/cash-sessions',
    method: 'GET',
    path: '/api/cash-sessions',
    module: 'sesiones-caja',
    title: 'Listar',
    permissions: ['CASH:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'agencyId',
        in: 'query',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/cash-sessions/{id}',
    method: 'GET',
    path: '/api/cash-sessions/{id}',
    module: 'sesiones-caja',
    title: 'Consultar detalle',
    permissions: ['CASH:READ'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/cash-sessions',
    method: 'POST',
    path: '/api/cash-sessions',
    module: 'sesiones-caja',
    title: 'Abrir caja',
    permissions: ['CASH:OPEN'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.CashSessions.OpenCashSessionDto',
    },
  },
  {
    key: 'POST /api/cash-sessions/{id}/close',
    method: 'POST',
    path: '/api/cash-sessions/{id}/close',
    module: 'sesiones-caja',
    title: 'Cerrar caja',
    permissions: ['CASH:CLOSE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.CashSessions.CloseCashSessionDto',
    },
  },
  {
    key: 'POST /api/cash-sessions/{id}/movements',
    method: 'POST',
    path: '/api/cash-sessions/{id}/movements',
    module: 'sesiones-caja',
    title: 'Registrar movimiento',
    permissions: ['CASH:CREATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.CashMovements.RecordCashMovementDto',
    },
  },
  {
    key: 'POST /api/sales/{id}/payments',
    method: 'POST',
    path: '/api/sales/{id}/payments',
    module: 'sesiones-caja',
    title: 'Cobrar venta',
    permissions: ['CASH:CREATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.SalePayments.RecordSalePaymentDto',
    },
  },
  {
    key: 'GET /api/configuration/catalogs/{catalog}',
    method: 'GET',
    path: '/api/configuration/catalogs/{catalog}',
    module: 'configuracion',
    title: 'Consultar catálogo',
    permissions: ['CONFIGURATION:READ'],
    parameters: [
      {
        name: 'catalog',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    body: null,
  },
  {
    key: 'PUT /api/configuration/catalogs/{catalog}/{code}',
    method: 'PUT',
    path: '/api/configuration/catalogs/{catalog}/{code}',
    module: 'configuracion',
    title: 'Guardar catálogo',
    permissions: ['CONFIGURATION:CREATE', 'CONFIGURATION:UPDATE'],
    parameters: [
      {
        name: 'catalog',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
      },
      {
        name: 'code',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Catalogs.SaveCatalogDto',
    },
  },
  {
    key: 'GET /api/configuration/company',
    method: 'GET',
    path: '/api/configuration/company',
    module: 'configuracion',
    title: 'Consultar empresa',
    permissions: ['CONFIGURATION:READ'],
    parameters: [],
    body: null,
  },
  {
    key: 'PUT /api/configuration/company',
    method: 'PUT',
    path: '/api/configuration/company',
    module: 'configuracion',
    title: 'Guardar empresa',
    permissions: ['CONFIGURATION:CREATE', 'CONFIGURATION:UPDATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Companies.CompanyDto',
    },
  },
  {
    key: 'GET /api/configuration/geography/{level}',
    method: 'GET',
    path: '/api/configuration/geography/{level}',
    module: 'configuracion',
    title: 'Consultar geografía',
    permissions: ['CONFIGURATION:READ'],
    parameters: [
      {
        name: 'level',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
      },
      {
        name: 'parentId',
        in: 'query',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/dashboard',
    method: 'GET',
    path: '/api/dashboard',
    module: 'dashboard',
    title: 'Consultar',
    permissions: ['DASHBOARD:READ'],
    parameters: [
      {
        name: 'From',
        in: 'query',
        schema: {
          type: 'string',
          format: 'date-time',
        },
      },
      {
        name: 'To',
        in: 'query',
        schema: {
          type: 'string',
          format: 'date-time',
        },
      },
      {
        name: 'AgencyId',
        in: 'query',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/deliveries/orders/{orderId}/plans',
    method: 'GET',
    path: '/api/deliveries/orders/{orderId}/plans',
    module: 'entregas',
    title: 'Consultar programaciones',
    permissions: ['DELIVERIES:READ'],
    parameters: [
      {
        name: 'orderId',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/deliveries/plans/{id}/attempts',
    method: 'GET',
    path: '/api/deliveries/plans/{id}/attempts',
    module: 'entregas',
    title: 'Consultar intentos',
    permissions: ['DELIVERIES:READ'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/deliveries/attempts/{attemptId}/confirmation',
    method: 'GET',
    path: '/api/deliveries/attempts/{attemptId}/confirmation',
    module: 'entregas',
    title: 'Consultar constancia',
    permissions: ['DELIVERIES:READ'],
    parameters: [
      {
        name: 'attemptId',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/deliveries/plans',
    method: 'POST',
    path: '/api/deliveries/plans',
    module: 'entregas',
    title: 'Programar entrega',
    permissions: ['DELIVERIES:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.DeliveryPlans.CreateDeliveryPlanDto',
    },
  },
  {
    key: 'POST /api/deliveries/plans/{id}/dispatch',
    method: 'POST',
    path: '/api/deliveries/plans/{id}/dispatch',
    module: 'entregas',
    title: 'Salir a reparto',
    permissions: ['DELIVERIES:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/deliveries/plans/{id}/attempts',
    method: 'POST',
    path: '/api/deliveries/plans/{id}/attempts',
    module: 'entregas',
    title: 'Registrar intento fallido',
    permissions: ['DELIVERIES:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.DeliveryAttempts.RecordDeliveryAttemptDto',
    },
  },
  {
    key: 'POST /api/deliveries/plans/{id}/confirm',
    method: 'POST',
    path: '/api/deliveries/plans/{id}/confirm',
    module: 'entregas',
    title: 'Confirmar entrega',
    permissions: ['DELIVERIES:CONFIRM'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.DeliveryConfirmations.ConfirmDeliveryDto',
    },
  },
  {
    key: 'POST /api/deliveries/plans/{id}/return',
    method: 'POST',
    path: '/api/deliveries/plans/{id}/return',
    module: 'entregas',
    title: 'Retornar a agencia',
    permissions: ['DELIVERIES:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Trips.ArriveTripDto',
    },
  },
  {
    key: 'GET /api/drivers',
    method: 'GET',
    path: '/api/drivers',
    module: 'conductores',
    title: 'Listar',
    permissions: ['TRANSPORT:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/drivers',
    method: 'POST',
    path: '/api/drivers',
    module: 'conductores',
    title: 'Registrar',
    permissions: ['TRANSPORT:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Drivers.SaveDriverDto',
    },
  },
  {
    key: 'PUT /api/drivers/{id}',
    method: 'PUT',
    path: '/api/drivers/{id}',
    module: 'conductores',
    title: 'Editar',
    permissions: ['TRANSPORT:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Drivers.SaveDriverDto',
    },
  },
  {
    key: 'GET /api/orders',
    method: 'GET',
    path: '/api/orders',
    module: 'pedidos',
    title: 'Listar',
    permissions: ['ORDERS:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'search',
        in: 'query',
        schema: {
          type: 'string',
        },
      },
      {
        name: 'agencyId',
        in: 'query',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
      {
        name: 'status',
        in: 'query',
        schema: {
          type: 'string',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/orders/{id}',
    method: 'GET',
    path: '/api/orders/{id}',
    module: 'pedidos',
    title: 'Consultar detalle',
    permissions: ['ORDERS:READ'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/orders/tracking/{trackingNumber}',
    method: 'GET',
    path: '/api/orders/tracking/{trackingNumber}',
    module: 'pedidos',
    title: 'Seguimiento por guía',
    permissions: ['ORDERS:READ'],
    parameters: [
      {
        name: 'trackingNumber',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/orders',
    method: 'POST',
    path: '/api/orders',
    module: 'pedidos',
    title: 'Registrar',
    permissions: ['ORDERS:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Orders.SaveOrderDto',
    },
  },
  {
    key: 'PUT /api/orders/{id}',
    method: 'PUT',
    path: '/api/orders/{id}',
    module: 'pedidos',
    title: 'Editar',
    permissions: ['ORDERS:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Orders.SaveOrderDto',
    },
  },
  {
    key: 'POST /api/orders/{id}/cancel',
    method: 'POST',
    path: '/api/orders/{id}/cancel',
    module: 'pedidos',
    title: 'Cancelar',
    permissions: ['ORDERS:CANCEL'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Orders.CancelOrderDto',
    },
  },
  {
    key: 'GET /api/purchase-orders',
    method: 'GET',
    path: '/api/purchase-orders',
    module: 'compras',
    title: 'Listar',
    permissions: ['PURCHASING:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'agencyId',
        in: 'query',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/purchase-orders/{id}',
    method: 'GET',
    path: '/api/purchase-orders/{id}',
    module: 'compras',
    title: 'Consultar detalle',
    permissions: ['PURCHASING:READ'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/purchase-orders',
    method: 'POST',
    path: '/api/purchase-orders',
    module: 'compras',
    title: 'Registrar',
    permissions: ['PURCHASING:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseOrders.CreatePurchaseOrderDto',
    },
  },
  {
    key: 'POST /api/purchase-orders/{id}/status',
    method: 'POST',
    path: '/api/purchase-orders/{id}/status',
    module: 'compras',
    title: 'Cambiar estado',
    permissions: ['PURCHASING:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseOrders.ChangePurchaseStatusDto',
    },
  },
  {
    key: 'POST /api/purchase-orders/allocations',
    method: 'POST',
    path: '/api/purchase-orders/allocations',
    module: 'compras',
    title: 'Vincular solicitud',
    permissions: ['PURCHASING:UPDATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseAllocations.AllocatePurchaseDto',
    },
  },
  {
    key: 'POST /api/purchase-orders/{id}/receipts',
    method: 'POST',
    path: '/api/purchase-orders/{id}/receipts',
    module: 'compras',
    title: 'Registrar recepción',
    permissions: ['PURCHASING:RECEIVE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseReceipts.ReceivePurchaseDto',
    },
  },
  {
    key: 'GET /api/purchase-requests',
    method: 'GET',
    path: '/api/purchase-requests',
    module: 'solicitudes',
    title: 'Listar',
    permissions: ['PURCHASING:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'agencyId',
        in: 'query',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/purchase-requests/{id}',
    method: 'GET',
    path: '/api/purchase-requests/{id}',
    module: 'solicitudes',
    title: 'Consultar detalle',
    permissions: ['PURCHASING:READ'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/purchase-requests',
    method: 'POST',
    path: '/api/purchase-requests',
    module: 'solicitudes',
    title: 'Registrar',
    permissions: ['PURCHASING:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseRequests.CreatePurchaseRequestDto',
    },
  },
  {
    key: 'POST /api/purchase-requests/{id}/status',
    method: 'POST',
    path: '/api/purchase-requests/{id}/status',
    module: 'solicitudes',
    title: 'Cambiar estado',
    permissions: ['PURCHASING:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseOrders.ChangePurchaseStatusDto',
    },
  },
  {
    key: 'GET /api/suppliers',
    method: 'GET',
    path: '/api/suppliers',
    module: 'proveedores',
    title: 'Listar',
    permissions: ['PURCHASING:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/suppliers',
    method: 'POST',
    path: '/api/suppliers',
    module: 'proveedores',
    title: 'Registrar',
    permissions: ['PURCHASING:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Suppliers.SaveSupplierDto',
    },
  },
  {
    key: 'PUT /api/suppliers/{id}',
    method: 'PUT',
    path: '/api/suppliers/{id}',
    module: 'proveedores',
    title: 'Editar',
    permissions: ['PURCHASING:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Suppliers.SaveSupplierDto',
    },
  },
  {
    key: 'GET /api/supplies',
    method: 'GET',
    path: '/api/supplies',
    module: 'suministros',
    title: 'Listar',
    permissions: ['PURCHASING:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/supplies',
    method: 'POST',
    path: '/api/supplies',
    module: 'suministros',
    title: 'Registrar',
    permissions: ['PURCHASING:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Supplies.SaveSupplyDto',
    },
  },
  {
    key: 'PUT /api/supplies/{id}',
    method: 'PUT',
    path: '/api/supplies/{id}',
    module: 'suministros',
    title: 'Editar',
    permissions: ['PURCHASING:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Supplies.SaveSupplyDto',
    },
  },
  {
    key: 'GET /api/routes',
    method: 'GET',
    path: '/api/routes',
    module: 'rutas',
    title: 'Listar',
    permissions: ['TRANSPORT:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/routes',
    method: 'POST',
    path: '/api/routes',
    module: 'rutas',
    title: 'Registrar',
    permissions: ['TRANSPORT:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Routes.SaveRouteDto',
    },
  },
  {
    key: 'PUT /api/routes/{id}',
    method: 'PUT',
    path: '/api/routes/{id}',
    module: 'rutas',
    title: 'Editar',
    permissions: ['TRANSPORT:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Routes.SaveRouteDto',
    },
  },
  {
    key: 'POST /api/quotations',
    method: 'POST',
    path: '/api/quotations',
    module: 'cotizaciones',
    title: 'Registrar',
    permissions: ['SALES:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Quotations.CreateQuotationDto',
    },
  },
  {
    key: 'GET /api/quotations/orders/{orderId}',
    method: 'GET',
    path: '/api/quotations/orders/{orderId}',
    module: 'cotizaciones',
    title: 'Cotizaciones del pedido',
    permissions: ['SALES:READ'],
    parameters: [
      {
        name: 'orderId',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/receipt-series',
    method: 'GET',
    path: '/api/receipt-series',
    module: 'series',
    title: 'Listar',
    permissions: ['SALES:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/receipt-series',
    method: 'POST',
    path: '/api/receipt-series',
    module: 'series',
    title: 'Registrar',
    permissions: ['SALES:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.ReceiptSeries.SaveReceiptSeriesDto',
    },
  },
  {
    key: 'PUT /api/receipt-series/{id}',
    method: 'PUT',
    path: '/api/receipt-series/{id}',
    module: 'series',
    title: 'Editar',
    permissions: ['SALES:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.ReceiptSeries.SaveReceiptSeriesDto',
    },
  },
  {
    key: 'GET /api/sales',
    method: 'GET',
    path: '/api/sales',
    module: 'ventas',
    title: 'Listar',
    permissions: ['SALES:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'agencyId',
        in: 'query',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
      {
        name: 'orderId',
        in: 'query',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
      {
        name: 'pendingOnly',
        in: 'query',
        schema: {
          type: 'boolean',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/sales/{id}',
    method: 'GET',
    path: '/api/sales/{id}',
    module: 'ventas',
    title: 'Consultar detalle',
    permissions: ['SALES:READ'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/sales',
    method: 'POST',
    path: '/api/sales',
    module: 'ventas',
    title: 'Registrar',
    permissions: ['SALES:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Sales.CreateSaleDto',
    },
  },
  {
    key: 'POST /api/sales/{id}/void',
    method: 'POST',
    path: '/api/sales/{id}/void',
    module: 'ventas',
    title: 'Anular venta',
    permissions: ['SALES:CANCEL'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Orders.CancelOrderDto',
    },
  },
  {
    key: 'POST /api/sales/{id}/receipt',
    method: 'POST',
    path: '/api/sales/{id}/receipt',
    module: 'ventas',
    title: 'Emitir comprobante',
    permissions: ['SALES:CREATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Receipts.IssueReceiptDto',
    },
  },
  {
    key: 'GET /api/tariffs',
    method: 'GET',
    path: '/api/tariffs',
    module: 'tarifas',
    title: 'Listar',
    permissions: ['SALES:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/tariffs',
    method: 'POST',
    path: '/api/tariffs',
    module: 'tarifas',
    title: 'Registrar',
    permissions: ['SALES:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.TariffRules.SaveTariffRuleDto',
    },
  },
  {
    key: 'PUT /api/tariffs/{id}',
    method: 'PUT',
    path: '/api/tariffs/{id}',
    module: 'tarifas',
    title: 'Editar',
    permissions: ['SALES:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.TariffRules.SaveTariffRuleDto',
    },
  },
  {
    key: 'GET /api/trips',
    method: 'GET',
    path: '/api/trips',
    module: 'viajes',
    title: 'Listar',
    permissions: ['TRANSPORT:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/trips',
    method: 'POST',
    path: '/api/trips',
    module: 'viajes',
    title: 'Registrar',
    permissions: ['TRANSPORT:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Trips.CreateTripDto',
    },
  },
  {
    key: 'GET /api/trips/{id}/orders',
    method: 'GET',
    path: '/api/trips/{id}/orders',
    module: 'viajes',
    title: 'Consultar pedidos del viaje',
    permissions: ['TRANSPORT:READ'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/trips/{id}/orders/{orderId}',
    method: 'POST',
    path: '/api/trips/{id}/orders/{orderId}',
    module: 'viajes',
    title: 'Asignar pedido al viaje',
    permissions: ['TRANSPORT:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
      {
        name: 'orderId',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/trips/{id}/orders/{orderId}/unassign',
    method: 'POST',
    path: '/api/trips/{id}/orders/{orderId}/unassign',
    module: 'viajes',
    title: 'Desasignar pedido',
    permissions: ['TRANSPORT:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
      {
        name: 'orderId',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Orders.CancelOrderDto',
    },
  },
  {
    key: 'POST /api/trips/{id}/depart',
    method: 'POST',
    path: '/api/trips/{id}/depart',
    module: 'viajes',
    title: 'Registrar salida',
    permissions: ['TRANSPORT:DEPART'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/trips/{id}/arrive',
    method: 'POST',
    path: '/api/trips/{id}/arrive',
    module: 'viajes',
    title: 'Registrar llegada',
    permissions: ['TRANSPORT:ARRIVE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Trips.ArriveTripDto',
    },
  },
  {
    key: 'POST /api/trips/{id}/cancel',
    method: 'POST',
    path: '/api/trips/{id}/cancel',
    module: 'viajes',
    title: 'Cancelar',
    permissions: ['TRANSPORT:CANCEL'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Orders.CancelOrderDto',
    },
  },
  {
    key: 'POST /api/auth/login',
    method: 'POST',
    path: '/api/auth/login',
    module: 'cuenta',
    title: 'Login',
    permissions: [],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Users.LoginDto',
    },
  },
  {
    key: 'GET /api/auth/me',
    method: 'GET',
    path: '/api/auth/me',
    module: 'cuenta',
    title: 'Mi sesión',
    permissions: [],
    parameters: [],
    body: null,
  },
  {
    key: 'POST /api/auth/logout',
    method: 'POST',
    path: '/api/auth/logout',
    module: 'cuenta',
    title: 'Cerrar sesión',
    permissions: [],
    parameters: [],
    body: null,
  },
  {
    key: 'PUT /api/auth/password',
    method: 'PUT',
    path: '/api/auth/password',
    module: 'cuenta',
    title: 'Cambiar contraseña',
    permissions: [],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Users.ChangePasswordDto',
    },
  },
  {
    key: 'GET /api/permissions',
    method: 'GET',
    path: '/api/permissions',
    module: 'permisos',
    title: 'Listar',
    permissions: ['SECURITY:READ'],
    parameters: [],
    body: null,
  },
  {
    key: 'GET /api/roles',
    method: 'GET',
    path: '/api/roles',
    module: 'roles',
    title: 'Listar',
    permissions: ['SECURITY:READ'],
    parameters: [],
    body: null,
  },
  {
    key: 'POST /api/roles',
    method: 'POST',
    path: '/api/roles',
    module: 'roles',
    title: 'Registrar',
    permissions: ['SECURITY:MANAGE_ACCESS'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Roles.SaveRoleDto',
    },
  },
  {
    key: 'PUT /api/roles/{id}',
    method: 'PUT',
    path: '/api/roles/{id}',
    module: 'roles',
    title: 'Editar',
    permissions: ['SECURITY:MANAGE_ACCESS'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Roles.SaveRoleDto',
    },
  },
  {
    key: 'GET /api/users',
    method: 'GET',
    path: '/api/users',
    module: 'usuarios',
    title: 'Listar',
    permissions: ['SECURITY:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/users/{id}',
    method: 'GET',
    path: '/api/users/{id}',
    module: 'usuarios',
    title: 'Consultar detalle',
    permissions: ['SECURITY:READ'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/users',
    method: 'POST',
    path: '/api/users',
    module: 'usuarios',
    title: 'Registrar',
    permissions: ['SECURITY:CREATE', 'SECURITY:MANAGE_ACCESS'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Users.CreateUserDto',
    },
  },
  {
    key: 'PUT /api/users/{id}',
    method: 'PUT',
    path: '/api/users/{id}',
    module: 'usuarios',
    title: 'Editar',
    permissions: ['SECURITY:UPDATE', 'SECURITY:MANAGE_ACCESS'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Users.UpdateUserDto',
    },
  },
  {
    key: 'PUT /api/users/{id}/roles',
    method: 'PUT',
    path: '/api/users/{id}/roles',
    module: 'usuarios',
    title: 'Asignar roles',
    permissions: ['SECURITY:MANAGE_ACCESS'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Users.AssignRolesDto',
    },
  },
  {
    key: 'GET /api/vehicles',
    method: 'GET',
    path: '/api/vehicles',
    module: 'vehiculos',
    title: 'Listar',
    permissions: ['TRANSPORT:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/vehicles',
    method: 'POST',
    path: '/api/vehicles',
    module: 'vehiculos',
    title: 'Registrar',
    permissions: ['TRANSPORT:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Vehicles.SaveVehicleDto',
    },
  },
  {
    key: 'PUT /api/vehicles/{id}',
    method: 'PUT',
    path: '/api/vehicles/{id}',
    module: 'vehiculos',
    title: 'Editar',
    permissions: ['TRANSPORT:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Vehicles.SaveVehicleDto',
    },
  },
  {
    key: 'GET /api/warehouse/stock',
    method: 'GET',
    path: '/api/warehouse/stock',
    module: 'recepcion',
    title: 'Consultar existencias',
    permissions: ['WAREHOUSE:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'agencyId',
        in: 'query',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
      {
        name: 'locationId',
        in: 'query',
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: null,
  },
  {
    key: 'GET /api/warehouse/packages/{packageId}/movements',
    method: 'GET',
    path: '/api/warehouse/packages/{packageId}/movements',
    module: 'recepcion',
    title: 'Historial de movimientos',
    permissions: ['WAREHOUSE:READ'],
    parameters: [
      {
        name: 'packageId',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/warehouse/orders/{id}/receive',
    method: 'POST',
    path: '/api/warehouse/orders/{id}/receive',
    module: 'recepcion',
    title: 'Recibir pedido',
    permissions: ['WAREHOUSE:RECEIVE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Orders.ReceiveOrderDto',
    },
  },
  {
    key: 'POST /api/warehouse/orders/{orderId}/packages/{packageId}/move',
    method: 'POST',
    path: '/api/warehouse/orders/{orderId}/packages/{packageId}/move',
    module: 'recepcion',
    title: 'Mover paquete',
    permissions: ['WAREHOUSE:UPDATE'],
    parameters: [
      {
        name: 'orderId',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
      {
        name: 'packageId',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.PackageMovements.MovePackageDto',
    },
  },
  {
    key: 'GET /api/warehouse-locations',
    method: 'GET',
    path: '/api/warehouse-locations',
    module: 'ubicaciones',
    title: 'Listar',
    permissions: ['WAREHOUSE:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/warehouse-locations',
    method: 'POST',
    path: '/api/warehouse-locations',
    module: 'ubicaciones',
    title: 'Registrar',
    permissions: ['WAREHOUSE:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.WarehouseLocations.SaveWarehouseLocationDto',
    },
  },
  {
    key: 'PUT /api/warehouse-locations/{id}',
    method: 'PUT',
    path: '/api/warehouse-locations/{id}',
    module: 'ubicaciones',
    title: 'Editar',
    permissions: ['WAREHOUSE:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.WarehouseLocations.SaveWarehouseLocationDto',
    },
  },
  {
    key: 'GET /api/warehouses',
    method: 'GET',
    path: '/api/warehouses',
    module: 'almacenes',
    title: 'Listar',
    permissions: ['WAREHOUSE:READ'],
    parameters: [
      {
        name: 'Page',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
      {
        name: 'PageSize',
        in: 'query',
        schema: {
          type: 'integer',
          format: 'int32',
        },
      },
    ],
    body: null,
  },
  {
    key: 'POST /api/warehouses',
    method: 'POST',
    path: '/api/warehouses',
    module: 'almacenes',
    title: 'Registrar',
    permissions: ['WAREHOUSE:CREATE'],
    parameters: [],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Warehouses.SaveWarehouseDto',
    },
  },
  {
    key: 'PUT /api/warehouses/{id}',
    method: 'PUT',
    path: '/api/warehouses/{id}',
    module: 'almacenes',
    title: 'Editar',
    permissions: ['WAREHOUSE:UPDATE'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
        },
      },
    ],
    body: {
      $ref: '#/components/schemas/LogiERP.Application.DTOs.Warehouses.SaveWarehouseDto',
    },
  },
];

export const SCHEMAS: Record<string, Schema> = {
  'LogiERP.Application.DTOs.Agencies.AgencyAssignmentsDto': {
    type: 'object',
    properties: {
      openingHours: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.AgencyOpeningHours.AgencyOpeningHourDto',
        },
        nullable: true,
      },
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.UserAgencies.UserAgencyDto',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Agencies.AgencyDetailsDto': {
    type: 'object',
    properties: {
      agency: {
        $ref: '#/components/schemas/LogiERP.Application.DTOs.Agencies.AgencyDto',
      },
      openingHours: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.AgencyOpeningHours.AgencyOpeningHourDto',
        },
        nullable: true,
      },
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.UserAgencies.UserAgencyDto',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Agencies.AgencyDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      districtId: {
        type: 'string',
        format: 'uuid',
      },
      addressLine: {
        type: 'string',
        nullable: true,
      },
      phone: {
        type: 'string',
        nullable: true,
      },
      latitude: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      longitude: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Agencies.SaveAgencyDto': {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      districtId: {
        type: 'string',
        format: 'uuid',
      },
      addressLine: {
        type: 'string',
        nullable: true,
      },
      phone: {
        type: 'string',
        nullable: true,
      },
      latitude: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      longitude: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.AgencyOpeningHours.AgencyOpeningHourDto': {
    type: 'object',
    properties: {
      weekday: {
        type: 'integer',
        format: 'int32',
      },
      opensAt: {
        type: 'string',
        format: 'time',
      },
      closesAt: {
        type: 'string',
        format: 'time',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.AuditEvents.AuditDto': {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
      },
      userId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
      action: {
        type: 'string',
        nullable: true,
      },
      entityName: {
        type: 'string',
        nullable: true,
      },
      entityKey: {
        type: 'string',
        nullable: true,
      },
      occurredAt: {
        type: 'string',
        format: 'date-time',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.CashMovements.CashMovementDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      cashSessionId: {
        type: 'string',
        format: 'uuid',
      },
      conceptCode: {
        type: 'string',
        nullable: true,
      },
      paymentMethodCode: {
        type: 'string',
        nullable: true,
      },
      amount: {
        type: 'number',
        format: 'double',
      },
      occurredAt: {
        type: 'string',
        format: 'date-time',
      },
      recordedBy: {
        type: 'string',
        format: 'uuid',
      },
      description: {
        type: 'string',
        nullable: true,
      },
      externalReference: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.CashMovements.RecordCashMovementDto': {
    type: 'object',
    properties: {
      conceptCode: {
        type: 'string',
        nullable: true,
      },
      paymentMethodCode: {
        type: 'string',
        nullable: true,
      },
      amount: {
        type: 'number',
        format: 'double',
      },
      description: {
        type: 'string',
        nullable: true,
      },
      externalReference: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.CashRegisters.CashRegisterDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      agencyId: {
        type: 'string',
        format: 'uuid',
      },
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.CashRegisters.SaveCashRegisterDto': {
    type: 'object',
    properties: {
      agencyId: {
        type: 'string',
        format: 'uuid',
      },
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.CashSessions.CashSessionDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      cashRegisterId: {
        type: 'string',
        format: 'uuid',
      },
      openedBy: {
        type: 'string',
        format: 'uuid',
      },
      openedAt: {
        type: 'string',
        format: 'date-time',
      },
      openingCashAmount: {
        type: 'number',
        format: 'double',
      },
      closedBy: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
      closedAt: {
        type: 'string',
        format: 'date-time',
        nullable: true,
      },
      countedClosingCash: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      closingNotes: {
        type: 'string',
        nullable: true,
      },
      cashIn: {
        type: 'number',
        format: 'double',
      },
      cashOut: {
        type: 'number',
        format: 'double',
      },
      noncashIn: {
        type: 'number',
        format: 'double',
      },
      noncashOut: {
        type: 'number',
        format: 'double',
      },
      expectedCashAmount: {
        type: 'number',
        format: 'double',
      },
      cashDifference: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      movements: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.CashMovements.CashMovementDto',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.CashSessions.CloseCashSessionDto': {
    type: 'object',
    properties: {
      countedClosingCash: {
        type: 'number',
        format: 'double',
      },
      closingNotes: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.CashSessions.OpenCashSessionDto': {
    type: 'object',
    properties: {
      cashRegisterId: {
        type: 'string',
        format: 'uuid',
      },
      openingCashAmount: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Catalogs.CatalogDto': {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Catalogs.SaveCatalogDto': {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Companies.CompanyDto': {
    type: 'object',
    properties: {
      taxNumber: {
        type: 'string',
        nullable: true,
      },
      legalName: {
        type: 'string',
        nullable: true,
      },
      tradeName: {
        type: 'string',
        nullable: true,
      },
      districtId: {
        type: 'string',
        format: 'uuid',
      },
      addressLine: {
        type: 'string',
        nullable: true,
      },
      phone: {
        type: 'string',
        nullable: true,
      },
      email: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Dashboard.DashboardDto': {
    type: 'object',
    properties: {
      registeredOrders: {
        type: 'integer',
        format: 'int32',
      },
      ordersByStatus: {
        type: 'object',
        additionalProperties: {
          type: 'integer',
          format: 'int32',
        },
        nullable: true,
      },
      pendingDeliveries: {
        type: 'integer',
        format: 'int32',
      },
      totalAmount: {
        type: 'number',
        format: 'double',
      },
      paidAmount: {
        type: 'number',
        format: 'double',
      },
      pendingAmount: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.DeliveryAttempts.DeliveryAttemptDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      deliveryPlanId: {
        type: 'string',
        format: 'uuid',
      },
      attemptNumber: {
        type: 'integer',
        format: 'int32',
      },
      outcomeCode: {
        type: 'string',
        nullable: true,
      },
      attemptedAt: {
        type: 'string',
        format: 'date-time',
      },
      notes: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.DeliveryAttempts.RecordDeliveryAttemptDto': {
    type: 'object',
    properties: {
      outcomeCode: {
        type: 'string',
        nullable: true,
      },
      notes: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.DeliveryConfirmations.ConfirmDeliveryDto': {
    type: 'object',
    properties: {
      receiverName: {
        type: 'string',
        nullable: true,
      },
      documentTypeCode: {
        type: 'string',
        nullable: true,
      },
      documentNumber: {
        type: 'string',
        nullable: true,
      },
      evidenceReference: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.DeliveryConfirmations.DeliveryConfirmationDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      deliveryAttemptId: {
        type: 'string',
        format: 'uuid',
      },
      confirmationNumber: {
        type: 'string',
        nullable: true,
      },
      receiverName: {
        type: 'string',
        nullable: true,
      },
      documentTypeCode: {
        type: 'string',
        nullable: true,
      },
      documentNumber: {
        type: 'string',
        nullable: true,
      },
      evidenceReference: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.DeliveryPlans.CreateDeliveryPlanDto': {
    type: 'object',
    properties: {
      orderId: {
        type: 'string',
        format: 'uuid',
      },
      scheduledFor: {
        type: 'string',
        format: 'date-time',
      },
      driverId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.DeliveryPlans.DeliveryPlanDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      orderId: {
        type: 'string',
        format: 'uuid',
      },
      scheduledFor: {
        type: 'string',
        format: 'date-time',
      },
      driverId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
      cancelledAt: {
        type: 'string',
        format: 'date-time',
        nullable: true,
      },
      cancellationReason: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Drivers.DriverDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      documentTypeCode: {
        type: 'string',
        nullable: true,
      },
      documentNumber: {
        type: 'string',
        nullable: true,
      },
      fullName: {
        type: 'string',
        nullable: true,
      },
      licenseNumber: {
        type: 'string',
        nullable: true,
      },
      phone: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Drivers.SaveDriverDto': {
    type: 'object',
    properties: {
      documentTypeCode: {
        type: 'string',
        nullable: true,
      },
      documentNumber: {
        type: 'string',
        nullable: true,
      },
      fullName: {
        type: 'string',
        nullable: true,
      },
      licenseNumber: {
        type: 'string',
        nullable: true,
      },
      phone: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.OrderParties.SaveOrderPartyDto': {
    type: 'object',
    properties: {
      fullName: {
        type: 'string',
        nullable: true,
      },
      documentTypeCode: {
        type: 'string',
        nullable: true,
      },
      documentNumber: {
        type: 'string',
        nullable: true,
      },
      phone: {
        type: 'string',
        nullable: true,
      },
      email: {
        type: 'string',
        nullable: true,
      },
      addressLine: {
        type: 'string',
        nullable: true,
      },
      districtId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.OrderStatusHistories.OrderStatusHistoryDto': {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
      },
      statusCode: {
        type: 'string',
        nullable: true,
      },
      agencyId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
      changedBy: {
        type: 'string',
        format: 'uuid',
      },
      occurredAt: {
        type: 'string',
        format: 'date-time',
      },
      notes: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Orders.CancelOrderDto': {
    type: 'object',
    properties: {
      reason: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Orders.OrderDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      trackingNumber: {
        type: 'string',
        nullable: true,
      },
      serviceTypeCode: {
        type: 'string',
        nullable: true,
      },
      originAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      destinationAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },
      notes: {
        type: 'string',
        nullable: true,
      },
      statusCode: {
        type: 'string',
        nullable: true,
      },
      currentAgencyId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
      sender: {
        $ref: '#/components/schemas/LogiERP.Application.DTOs.OrderParties.SaveOrderPartyDto',
      },
      recipient: {
        $ref: '#/components/schemas/LogiERP.Application.DTOs.OrderParties.SaveOrderPartyDto',
      },
      packages: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.Packages.PackageDto',
        },
        nullable: true,
      },
      history: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.OrderStatusHistories.OrderStatusHistoryDto',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Orders.ReceiveOrderDto': {
    type: 'object',
    properties: {
      locationId: {
        type: 'string',
        format: 'uuid',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Orders.SaveOrderDto': {
    type: 'object',
    properties: {
      serviceTypeCode: {
        type: 'string',
        nullable: true,
      },
      originAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      destinationAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      notes: {
        type: 'string',
        nullable: true,
      },
      sender: {
        $ref: '#/components/schemas/LogiERP.Application.DTOs.OrderParties.SaveOrderPartyDto',
      },
      recipient: {
        $ref: '#/components/schemas/LogiERP.Application.DTOs.OrderParties.SaveOrderPartyDto',
      },
      packages: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.Packages.SavePackageDto',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PackageMovements.MovePackageDto': {
    type: 'object',
    properties: {
      fromLocationId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
      toLocationId: {
        type: 'string',
        format: 'uuid',
      },
      reason: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PackageMovements.PackageMovementDto': {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        format: 'int64',
      },
      packageId: {
        type: 'string',
        format: 'uuid',
      },
      fromLocationId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
      toLocationId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
      recordedBy: {
        type: 'string',
        format: 'uuid',
      },
      occurredAt: {
        type: 'string',
        format: 'date-time',
      },
      reason: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Packages.PackageDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      orderId: {
        type: 'string',
        format: 'uuid',
      },
      packageNumber: {
        type: 'integer',
        format: 'int32',
      },
      packageTypeCode: {
        type: 'string',
        nullable: true,
      },
      description: {
        type: 'string',
        nullable: true,
      },
      weightKg: {
        type: 'number',
        format: 'double',
      },
      lengthCm: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      widthCm: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      heightCm: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      declaredValue: {
        type: 'number',
        format: 'double',
      },
      isFragile: {
        type: 'boolean',
      },
      locationId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Packages.SavePackageDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
      packageTypeCode: {
        type: 'string',
        nullable: true,
      },
      description: {
        type: 'string',
        nullable: true,
      },
      weightKg: {
        type: 'number',
        format: 'double',
      },
      lengthCm: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      widthCm: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      heightCm: {
        type: 'number',
        format: 'double',
        nullable: true,
      },
      declaredValue: {
        type: 'number',
        format: 'double',
      },
      isFragile: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Permissions.PermissionDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      module: {
        type: 'string',
        nullable: true,
      },
      action: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseAllocations.AllocatePurchaseDto': {
    type: 'object',
    properties: {
      purchaseOrderLineId: {
        type: 'string',
        format: 'uuid',
      },
      purchaseRequestLineId: {
        type: 'string',
        format: 'uuid',
      },
      allocatedQuantity: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseAllocations.PurchaseAllocationDto': {
    type: 'object',
    properties: {
      purchaseOrderLineId: {
        type: 'string',
        format: 'uuid',
      },
      purchaseRequestLineId: {
        type: 'string',
        format: 'uuid',
      },
      allocatedQuantity: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseOrderLines.PurchaseOrderLineDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      purchaseOrderId: {
        type: 'string',
        format: 'uuid',
      },
      supplyId: {
        type: 'string',
        format: 'uuid',
      },
      orderedQuantity: {
        type: 'number',
        format: 'double',
      },
      unitCost: {
        type: 'number',
        format: 'double',
      },
      receivedQuantity: {
        type: 'number',
        format: 'double',
      },
      pendingQuantity: {
        type: 'number',
        format: 'double',
      },
      lineTotal: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseOrderLines.SavePurchaseOrderLineDto': {
    type: 'object',
    properties: {
      supplyId: {
        type: 'string',
        format: 'uuid',
      },
      orderedQuantity: {
        type: 'number',
        format: 'double',
      },
      unitCost: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseOrders.ChangePurchaseStatusDto': {
    type: 'object',
    properties: {
      statusCode: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseOrders.CreatePurchaseOrderDto': {
    type: 'object',
    properties: {
      supplierId: {
        type: 'string',
        format: 'uuid',
      },
      deliveryWarehouseId: {
        type: 'string',
        format: 'uuid',
      },
      expectedDeliveryDate: {
        type: 'string',
        format: 'date',
        nullable: true,
      },
      notes: {
        type: 'string',
        nullable: true,
      },
      lines: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseOrderLines.SavePurchaseOrderLineDto',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseOrders.PurchaseOrderDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      orderNumber: {
        type: 'string',
        nullable: true,
      },
      supplierId: {
        type: 'string',
        format: 'uuid',
      },
      deliveryWarehouseId: {
        type: 'string',
        format: 'uuid',
      },
      statusCode: {
        type: 'string',
        nullable: true,
      },
      orderedAt: {
        type: 'string',
        format: 'date-time',
      },
      expectedDeliveryDate: {
        type: 'string',
        format: 'date',
        nullable: true,
      },
      createdBy: {
        type: 'string',
        format: 'uuid',
      },
      notes: {
        type: 'string',
        nullable: true,
      },
      lines: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseOrderLines.PurchaseOrderLineDto',
        },
        nullable: true,
      },
      receipts: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseReceipts.PurchaseReceiptDto',
        },
        nullable: true,
      },
      totalAmount: {
        type: 'number',
        format: 'double',
      },
      receiptProgress: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseReceiptLines.PurchaseReceiptLineDto': {
    type: 'object',
    properties: {
      purchaseReceiptId: {
        type: 'string',
        format: 'uuid',
      },
      purchaseOrderLineId: {
        type: 'string',
        format: 'uuid',
      },
      receivedQuantity: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseReceiptLines.ReceivePurchaseLineDto': {
    type: 'object',
    properties: {
      purchaseOrderLineId: {
        type: 'string',
        format: 'uuid',
      },
      receivedQuantity: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseReceipts.PurchaseReceiptDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      purchaseOrderId: {
        type: 'string',
        format: 'uuid',
      },
      receivedAt: {
        type: 'string',
        format: 'date-time',
      },
      receivedBy: {
        type: 'string',
        format: 'uuid',
      },
      supplierDeliveryNote: {
        type: 'string',
        nullable: true,
      },
      lines: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseReceiptLines.PurchaseReceiptLineDto',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseReceipts.ReceivePurchaseDto': {
    type: 'object',
    properties: {
      supplierDeliveryNote: {
        type: 'string',
        nullable: true,
      },
      lines: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseReceiptLines.ReceivePurchaseLineDto',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseRequestLines.PurchaseRequestLineDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      purchaseRequestId: {
        type: 'string',
        format: 'uuid',
      },
      supplyId: {
        type: 'string',
        format: 'uuid',
      },
      requestedQuantity: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseRequestLines.SavePurchaseRequestLineDto': {
    type: 'object',
    properties: {
      supplyId: {
        type: 'string',
        format: 'uuid',
      },
      requestedQuantity: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseRequests.CreatePurchaseRequestDto': {
    type: 'object',
    properties: {
      agencyId: {
        type: 'string',
        format: 'uuid',
      },
      reason: {
        type: 'string',
        nullable: true,
      },
      lines: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseRequestLines.SavePurchaseRequestLineDto',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.PurchaseRequests.PurchaseRequestDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      agencyId: {
        type: 'string',
        format: 'uuid',
      },
      requestedBy: {
        type: 'string',
        format: 'uuid',
      },
      requestedAt: {
        type: 'string',
        format: 'date-time',
      },
      statusCode: {
        type: 'string',
        nullable: true,
      },
      reason: {
        type: 'string',
        nullable: true,
      },
      lines: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.PurchaseRequestLines.PurchaseRequestLineDto',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Quotations.CreateQuotationDto': {
    type: 'object',
    properties: {
      orderId: {
        type: 'string',
        format: 'uuid',
      },
      validUntil: {
        type: 'string',
        format: 'date-time',
      },
      notes: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Quotations.QuotationDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      orderId: {
        type: 'string',
        format: 'uuid',
      },
      tariffRuleId: {
        type: 'string',
        format: 'uuid',
      },
      quotedAmount: {
        type: 'number',
        format: 'double',
      },
      quotedAt: {
        type: 'string',
        format: 'date-time',
      },
      validUntil: {
        type: 'string',
        format: 'date-time',
      },
      createdBy: {
        type: 'string',
        format: 'uuid',
      },
      notes: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.ReceiptSeries.ReceiptSeriesDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      agencyId: {
        type: 'string',
        format: 'uuid',
      },
      code: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.ReceiptSeries.SaveReceiptSeriesDto': {
    type: 'object',
    properties: {
      agencyId: {
        type: 'string',
        format: 'uuid',
      },
      code: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Receipts.IssueReceiptDto': {
    type: 'object',
    properties: {
      receiptSeriesId: {
        type: 'string',
        format: 'uuid',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Receipts.ReceiptDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      saleId: {
        type: 'string',
        format: 'uuid',
      },
      receiptSeriesId: {
        type: 'string',
        format: 'uuid',
      },
      number: {
        type: 'integer',
        format: 'int64',
      },
      issuedAt: {
        type: 'string',
        format: 'date-time',
      },
      issuedBy: {
        type: 'string',
        format: 'uuid',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Roles.RoleDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      description: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
      permissionIds: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uuid',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Roles.SaveRoleDto': {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      description: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
      permissionIds: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uuid',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Routes.RouteDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      originAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      destinationAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      expectedDurationMinutes: {
        type: 'integer',
        format: 'int32',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Routes.SaveRouteDto': {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      originAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      destinationAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      expectedDurationMinutes: {
        type: 'integer',
        format: 'int32',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.SaleLines.SaleLineDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      saleId: {
        type: 'string',
        format: 'uuid',
      },
      lineNumber: {
        type: 'integer',
        format: 'int32',
      },
      description: {
        type: 'string',
        nullable: true,
      },
      quantity: {
        type: 'number',
        format: 'double',
      },
      unitPrice: {
        type: 'number',
        format: 'double',
      },
      discountAmount: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.SalePayments.RecordSalePaymentDto': {
    type: 'object',
    properties: {
      cashSessionId: {
        type: 'string',
        format: 'uuid',
      },
      paymentMethodCode: {
        type: 'string',
        nullable: true,
      },
      amount: {
        type: 'number',
        format: 'double',
      },
      externalReference: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Sales.CreateSaleDto': {
    type: 'object',
    properties: {
      quotationId: {
        type: 'string',
        format: 'uuid',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Sales.SaleDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      orderId: {
        type: 'string',
        format: 'uuid',
      },
      saleNumber: {
        type: 'string',
        nullable: true,
      },
      soldAt: {
        type: 'string',
        format: 'date-time',
      },
      soldBy: {
        type: 'string',
        format: 'uuid',
      },
      totalAmount: {
        type: 'number',
        format: 'double',
      },
      paidAmount: {
        type: 'number',
        format: 'double',
      },
      pendingAmount: {
        type: 'number',
        format: 'double',
      },
      isVoid: {
        type: 'boolean',
      },
      lines: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.SaleLines.SaleLineDto',
        },
        nullable: true,
      },
      payments: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/LogiERP.Application.DTOs.CashMovements.CashMovementDto',
        },
        nullable: true,
      },
      receipt: {
        $ref: '#/components/schemas/LogiERP.Application.DTOs.Receipts.ReceiptDto',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Suppliers.SaveSupplierDto': {
    type: 'object',
    properties: {
      taxNumber: {
        type: 'string',
        nullable: true,
      },
      legalName: {
        type: 'string',
        nullable: true,
      },
      districtId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
      addressLine: {
        type: 'string',
        nullable: true,
      },
      phone: {
        type: 'string',
        nullable: true,
      },
      email: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Suppliers.SupplierDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      taxNumber: {
        type: 'string',
        nullable: true,
      },
      legalName: {
        type: 'string',
        nullable: true,
      },
      districtId: {
        type: 'string',
        format: 'uuid',
        nullable: true,
      },
      addressLine: {
        type: 'string',
        nullable: true,
      },
      phone: {
        type: 'string',
        nullable: true,
      },
      email: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Supplies.SaveSupplyDto': {
    type: 'object',
    properties: {
      sku: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      unitCode: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Supplies.SupplyDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      sku: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      unitCode: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.TariffRules.SaveTariffRuleDto': {
    type: 'object',
    properties: {
      serviceTypeCode: {
        type: 'string',
        nullable: true,
      },
      originAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      destinationAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      validFrom: {
        type: 'string',
        format: 'date',
      },
      validTo: {
        type: 'string',
        format: 'date',
        nullable: true,
      },
      baseAmount: {
        type: 'number',
        format: 'double',
      },
      includedWeightKg: {
        type: 'number',
        format: 'double',
      },
      extraKgAmount: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.TariffRules.TariffRuleDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      serviceTypeCode: {
        type: 'string',
        nullable: true,
      },
      originAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      destinationAgencyId: {
        type: 'string',
        format: 'uuid',
      },
      validFrom: {
        type: 'string',
        format: 'date',
      },
      validTo: {
        type: 'string',
        format: 'date',
        nullable: true,
      },
      baseAmount: {
        type: 'number',
        format: 'double',
      },
      includedWeightKg: {
        type: 'number',
        format: 'double',
      },
      extraKgAmount: {
        type: 'number',
        format: 'double',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.TripOrders.TripOrderDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      tripId: {
        type: 'string',
        format: 'uuid',
      },
      orderId: {
        type: 'string',
        format: 'uuid',
      },
      assignedAt: {
        type: 'string',
        format: 'date-time',
      },
      unloadedAt: {
        type: 'string',
        format: 'date-time',
        nullable: true,
      },
      unassignedAt: {
        type: 'string',
        format: 'date-time',
        nullable: true,
      },
      unassignmentReason: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Trips.ArriveTripDto': {
    type: 'object',
    properties: {
      locationId: {
        type: 'string',
        format: 'uuid',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Trips.CreateTripDto': {
    type: 'object',
    properties: {
      routeId: {
        type: 'string',
        format: 'uuid',
      },
      vehicleId: {
        type: 'string',
        format: 'uuid',
      },
      driverId: {
        type: 'string',
        format: 'uuid',
      },
      scheduledDeparture: {
        type: 'string',
        format: 'date-time',
      },
      scheduledArrival: {
        type: 'string',
        format: 'date-time',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Trips.TripDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      routeId: {
        type: 'string',
        format: 'uuid',
      },
      vehicleId: {
        type: 'string',
        format: 'uuid',
      },
      driverId: {
        type: 'string',
        format: 'uuid',
      },
      scheduledDeparture: {
        type: 'string',
        format: 'date-time',
      },
      scheduledArrival: {
        type: 'string',
        format: 'date-time',
      },
      departedAt: {
        type: 'string',
        format: 'date-time',
        nullable: true,
      },
      arrivedAt: {
        type: 'string',
        format: 'date-time',
        nullable: true,
      },
      cancelledAt: {
        type: 'string',
        format: 'date-time',
        nullable: true,
      },
      cancellationReason: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.UserAgencies.UserAgencyDto': {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        format: 'uuid',
      },
      isManager: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Users.AccessDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      fullName: {
        type: 'string',
        nullable: true,
      },
      email: {
        type: 'string',
        nullable: true,
      },
      roles: {
        type: 'array',
        items: {
          type: 'string',
        },
        nullable: true,
      },
      permissions: {
        type: 'array',
        items: {
          type: 'string',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Users.AssignRolesDto': {
    type: 'object',
    properties: {
      roleIds: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uuid',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Users.ChangePasswordDto': {
    type: 'object',
    properties: {
      currentPassword: {
        type: 'string',
        nullable: true,
      },
      newPassword: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Users.CreateUserDto': {
    type: 'object',
    properties: {
      fullName: {
        type: 'string',
        nullable: true,
      },
      documentTypeCode: {
        type: 'string',
        nullable: true,
      },
      documentNumber: {
        type: 'string',
        nullable: true,
      },
      email: {
        type: 'string',
        nullable: true,
      },
      password: {
        type: 'string',
        nullable: true,
      },
      phone: {
        type: 'string',
        nullable: true,
      },
      roleIds: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uuid',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Users.LoginDto': {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        nullable: true,
      },
      password: {
        type: 'string',
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Users.LoginResponseDto': {
    type: 'object',
    properties: {
      accessToken: {
        type: 'string',
        nullable: true,
      },
      expiresAt: {
        type: 'string',
        format: 'date-time',
      },
      user: {
        $ref: '#/components/schemas/LogiERP.Application.DTOs.Users.AccessDto',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Users.UpdateUserDto': {
    type: 'object',
    properties: {
      fullName: {
        type: 'string',
        nullable: true,
      },
      email: {
        type: 'string',
        nullable: true,
      },
      phone: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Users.UserDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      fullName: {
        type: 'string',
        nullable: true,
      },
      email: {
        type: 'string',
        nullable: true,
      },
      documentTypeCode: {
        type: 'string',
        nullable: true,
      },
      documentNumber: {
        type: 'string',
        nullable: true,
      },
      phone: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
      roles: {
        type: 'array',
        items: {
          type: 'string',
        },
        nullable: true,
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Vehicles.SaveVehicleDto': {
    type: 'object',
    properties: {
      plate: {
        type: 'string',
        nullable: true,
      },
      vehicleTypeCode: {
        type: 'string',
        nullable: true,
      },
      capacityKg: {
        type: 'number',
        format: 'double',
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Vehicles.VehicleDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      plate: {
        type: 'string',
        nullable: true,
      },
      vehicleTypeCode: {
        type: 'string',
        nullable: true,
      },
      capacityKg: {
        type: 'number',
        format: 'double',
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.WarehouseLocations.SaveWarehouseLocationDto': {
    type: 'object',
    properties: {
      warehouseId: {
        type: 'string',
        format: 'uuid',
      },
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.WarehouseLocations.WarehouseLocationDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      warehouseId: {
        type: 'string',
        format: 'uuid',
      },
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Warehouses.SaveWarehouseDto': {
    type: 'object',
    properties: {
      agencyId: {
        type: 'string',
        format: 'uuid',
      },
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
  'LogiERP.Application.DTOs.Warehouses.WarehouseDto': {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
      },
      agencyId: {
        type: 'string',
        format: 'uuid',
      },
      code: {
        type: 'string',
        nullable: true,
      },
      name: {
        type: 'string',
        nullable: true,
      },
      isActive: {
        type: 'boolean',
      },
    },
    additionalProperties: false,
  },
};
