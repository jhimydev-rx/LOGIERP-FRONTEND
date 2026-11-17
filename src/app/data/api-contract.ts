import { Module, Operation, Schema } from '../core/contracts';

export const MODULES: Module[] = [
  {
    "id": "cuenta",
    "name": "Mi cuenta",
    "group": "Seguridad"
  },
  {
    "id": "usuarios",
    "name": "Usuarios",
    "group": "Seguridad"
  },
  {
    "id": "roles",
    "name": "Roles",
    "group": "Seguridad"
  },
  {
    "id": "permisos",
    "name": "Permisos",
    "group": "Seguridad"
  },
  {
    "id": "auditoria",
    "name": "Auditoría",
    "group": "Seguridad"
  },
  {
    "id": "catalogos",
    "name": "Catálogos",
    "group": "Configuración"
  },
  {
    "id": "geografia",
    "name": "Geografía",
    "group": "Configuración"
  },
  {
    "id": "configuracion",
    "name": "Empresa",
    "group": "Configuración"
  },
  {
    "id": "agencias",
    "name": "Agencias y responsables",
    "group": "Agencias"
  },
  {
    "id": "pedidos",
    "name": "Pedidos y seguimiento",
    "group": "Pedidos"
  },
  {
    "id": "almacenes",
    "name": "Almacenes",
    "group": "Almacén"
  },
  {
    "id": "ubicaciones",
    "name": "Ubicaciones",
    "group": "Almacén"
  },
  {
    "id": "recepcion",
    "name": "Recepción y movimientos",
    "group": "Almacén"
  },
  {
    "id": "vehiculos",
    "name": "Vehículos",
    "group": "Transporte"
  },
  {
    "id": "conductores",
    "name": "Conductores",
    "group": "Transporte"
  },
  {
    "id": "rutas",
    "name": "Rutas",
    "group": "Transporte"
  },
  {
    "id": "viajes",
    "name": "Viajes",
    "group": "Transporte"
  },
  {
    "id": "entregas",
    "name": "Entregas e intentos",
    "group": "Entregas"
  },
  {
    "id": "tarifas",
    "name": "Tarifas",
    "group": "Ventas"
  },
  {
    "id": "cotizaciones",
    "name": "Cotizaciones",
    "group": "Ventas"
  },
  {
    "id": "ventas",
    "name": "Ventas y comprobantes",
    "group": "Ventas"
  },
  {
    "id": "series",
    "name": "Series de comprobantes",
    "group": "Ventas"
  },
  {
    "id": "cajas",
    "name": "Cajas",
    "group": "Caja"
  },
  {
    "id": "sesiones-caja",
    "name": "Sesiones y cobros",
    "group": "Caja"
  },
  {
    "id": "proveedores",
    "name": "Proveedores",
    "group": "Compras"
  },
  {
    "id": "suministros",
    "name": "Suministros",
    "group": "Compras"
  },
  {
    "id": "solicitudes",
    "name": "Solicitudes de compra",
    "group": "Compras"
  },
  {
    "id": "compras",
    "name": "Órdenes y recepciones",
    "group": "Compras"
  },
  {
    "id": "dashboard",
    "name": "Dashboard",
    "group": "Dashboard"
  },
  {
    "id": "sunat",
    "name": "SUNAT beta",
    "group": "Ventas"
  }
];

export const OPERATIONS: Operation[] = [
  {
    "key": "GET /api/agencies",
    "method": "GET",
    "path": "/api/agencies",
    "module": "agencias",
    "title": "Listar",
    "permissions": [
      "AGENCIES:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/agencies",
    "method": "POST",
    "path": "/api/agencies",
    "module": "agencias",
    "title": "Registrar",
    "permissions": [
      "AGENCIES:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Agencies.Commands.CreateAgencyCommand"
    }
  },
  {
    "key": "PUT /api/agencies/{id}",
    "method": "PUT",
    "path": "/api/agencies/{id}",
    "module": "agencias",
    "title": "Editar",
    "permissions": [
      "AGENCIES:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Agencies.Commands.UpdateAgencyCommand"
    }
  },
  {
    "key": "GET /api/agencies/{id}",
    "method": "GET",
    "path": "/api/agencies/{id}",
    "module": "agencias",
    "title": "Consultar detalle",
    "permissions": [
      "AGENCIES:READ"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/agencies/{id}/activate",
    "module": "agencias",
    "title": "Activar",
    "permissions": [
      "AGENCIES:CANCEL"
    ],
    "method": "POST",
    "path": "/api/agencies/{id}/activate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/agencies/{id}/deactivate",
    "module": "agencias",
    "title": "Desactivar",
    "permissions": [
      "AGENCIES:CANCEL"
    ],
    "method": "POST",
    "path": "/api/agencies/{id}/deactivate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "PUT /api/agencies/{id}/assignments",
    "method": "PUT",
    "path": "/api/agencies/{id}/assignments",
    "module": "agencias",
    "title": "Horarios y responsables",
    "permissions": [
      "SECURITY:MANAGE_ACCESS",
      "AGENCIES:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Agencies.Commands.SetAgencyAssignmentsCommand"
    }
  },
  {
    "key": "GET /api/audit",
    "method": "GET",
    "path": "/api/audit",
    "module": "auditoria",
    "title": "Listar",
    "permissions": [
      "SECURITY:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/auth/login",
    "method": "POST",
    "path": "/api/auth/login",
    "module": "cuenta",
    "title": "Login",
    "permissions": [],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Auth.Commands.LoginCommand"
    }
  },
  {
    "key": "GET /api/auth/me",
    "method": "GET",
    "path": "/api/auth/me",
    "module": "cuenta",
    "title": "Mi sesión",
    "permissions": [],
    "parameters": [],
    "body": null
  },
  {
    "key": "POST /api/auth/logout",
    "method": "POST",
    "path": "/api/auth/logout",
    "module": "cuenta",
    "title": "Cerrar sesión",
    "permissions": [],
    "parameters": [],
    "body": null
  },
  {
    "key": "PUT /api/auth/password",
    "method": "PUT",
    "path": "/api/auth/password",
    "module": "cuenta",
    "title": "Cambiar contraseña",
    "permissions": [],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Users.Commands.ChangePasswordCommand"
    }
  },
  {
    "key": "GET /api/cash-registers",
    "method": "GET",
    "path": "/api/cash-registers",
    "module": "cajas",
    "title": "Listar",
    "permissions": [
      "CASH:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/cash-registers",
    "method": "POST",
    "path": "/api/cash-registers",
    "module": "cajas",
    "title": "Registrar",
    "permissions": [
      "CASH:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.CashRegisters.Commands.CreateCashRegisterCommand"
    }
  },
  {
    "key": "PUT /api/cash-registers/{id}",
    "method": "PUT",
    "path": "/api/cash-registers/{id}",
    "module": "cajas",
    "title": "Editar",
    "permissions": [
      "CASH:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.CashRegisters.Commands.UpdateCashRegisterCommand"
    }
  },
  {
    "key": "POST /api/cash-registers/{id}/activate",
    "module": "cajas",
    "title": "Activar",
    "permissions": [
      "CASH:CANCEL"
    ],
    "method": "POST",
    "path": "/api/cash-registers/{id}/activate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/cash-registers/{id}/deactivate",
    "module": "cajas",
    "title": "Desactivar",
    "permissions": [
      "CASH:CANCEL"
    ],
    "method": "POST",
    "path": "/api/cash-registers/{id}/deactivate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/cash-sessions",
    "method": "GET",
    "path": "/api/cash-sessions",
    "module": "sesiones-caja",
    "title": "Listar",
    "permissions": [
      "CASH:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "AgencyId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/cash-sessions",
    "method": "POST",
    "path": "/api/cash-sessions",
    "module": "sesiones-caja",
    "title": "Abrir caja",
    "permissions": [
      "CASH:OPEN"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.CashSessions.Commands.OpenCashSessionCommand"
    }
  },
  {
    "key": "GET /api/cash-sessions/{id}",
    "method": "GET",
    "path": "/api/cash-sessions/{id}",
    "module": "sesiones-caja",
    "title": "Consultar detalle",
    "permissions": [
      "CASH:READ"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/cash-sessions/{id}/close",
    "method": "POST",
    "path": "/api/cash-sessions/{id}/close",
    "module": "sesiones-caja",
    "title": "Cerrar caja",
    "permissions": [
      "CASH:CLOSE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.CashSessions.Commands.CloseCashSessionCommand"
    }
  },
  {
    "key": "POST /api/cash-sessions/{id}/movements",
    "method": "POST",
    "path": "/api/cash-sessions/{id}/movements",
    "module": "sesiones-caja",
    "title": "Registrar movimiento",
    "permissions": [
      "CASH:CREATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.CashMovements.Commands.RecordCashMovementCommand"
    }
  },
  {
    "key": "POST /api/sales/{id}/payments",
    "method": "POST",
    "path": "/api/sales/{id}/payments",
    "module": "sesiones-caja",
    "title": "Cobrar venta",
    "permissions": [
      "CASH:CREATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.SalePayments.Commands.RecordSalePaymentCommand"
    }
  },
  {
    "key": "GET /api/configuration/catalogs/{catalog}",
    "method": "GET",
    "path": "/api/configuration/catalogs/{catalog}",
    "module": "catalogos",
    "title": "Consultar catálogo",
    "permissions": [
      "CONFIGURATION:READ"
    ],
    "parameters": [
      {
        "name": "catalog",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "body": null
  },
  {
    "key": "PUT /api/configuration/catalogs/{catalog}/{code}",
    "method": "PUT",
    "path": "/api/configuration/catalogs/{catalog}/{code}",
    "module": "catalogos",
    "title": "Guardar opción del catálogo",
    "permissions": [
      "CONFIGURATION:CREATE",
      "CONFIGURATION:UPDATE"
    ],
    "parameters": [
      {
        "name": "catalog",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "code",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Catalogs.Commands.SaveCatalogCommand"
    }
  },
  {
    "key": "GET /api/configuration/company",
    "method": "GET",
    "path": "/api/configuration/company",
    "module": "configuracion",
    "title": "Consultar empresa",
    "permissions": [
      "CONFIGURATION:READ"
    ],
    "parameters": [],
    "body": null
  },
  {
    "key": "PUT /api/configuration/company",
    "method": "PUT",
    "path": "/api/configuration/company",
    "module": "configuracion",
    "title": "Guardar empresa",
    "permissions": [
      "CONFIGURATION:CREATE",
      "CONFIGURATION:UPDATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Companies.Commands.SaveCompanyCommand"
    }
  },
  {
    "key": "GET /api/configuration/geography/{level}",
    "method": "GET",
    "path": "/api/configuration/geography/{level}",
    "module": "geografia",
    "title": "Consultar geografía",
    "permissions": [
      "CONFIGURATION:READ"
    ],
    "parameters": [
      {
        "name": "level",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "parentId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/dashboard",
    "method": "GET",
    "path": "/api/dashboard",
    "module": "dashboard",
    "title": "Consultar",
    "permissions": [
      "DASHBOARD:READ"
    ],
    "parameters": [
      {
        "name": "From",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "date-time"
        }
      },
      {
        "name": "To",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "date-time"
        }
      },
      {
        "name": "AgencyId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/deliveries/orders/{orderId}/plans",
    "method": "GET",
    "path": "/api/deliveries/orders/{orderId}/plans",
    "module": "entregas",
    "title": "Consultar programaciones",
    "permissions": [
      "DELIVERIES:READ"
    ],
    "parameters": [
      {
        "name": "orderId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/deliveries/plans/{id}/attempts",
    "method": "GET",
    "path": "/api/deliveries/plans/{id}/attempts",
    "module": "entregas",
    "title": "Consultar intentos",
    "permissions": [
      "DELIVERIES:READ"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/deliveries/plans/{id}/attempts",
    "method": "POST",
    "path": "/api/deliveries/plans/{id}/attempts",
    "module": "entregas",
    "title": "Registrar intento fallido",
    "permissions": [
      "DELIVERIES:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.DeliveryAttempts.Commands.RecordDeliveryAttemptCommand"
    }
  },
  {
    "key": "GET /api/deliveries/attempts/{attemptId}/confirmation",
    "method": "GET",
    "path": "/api/deliveries/attempts/{attemptId}/confirmation",
    "module": "entregas",
    "title": "Consultar constancia",
    "permissions": [
      "DELIVERIES:READ"
    ],
    "parameters": [
      {
        "name": "attemptId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/deliveries/plans",
    "method": "POST",
    "path": "/api/deliveries/plans",
    "module": "entregas",
    "title": "Programar entrega",
    "permissions": [
      "DELIVERIES:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.DeliveryPlans.Commands.CreateDeliveryPlanCommand"
    }
  },
  {
    "key": "POST /api/deliveries/plans/{id}/dispatch",
    "method": "POST",
    "path": "/api/deliveries/plans/{id}/dispatch",
    "module": "entregas",
    "title": "Salir a reparto",
    "permissions": [
      "DELIVERIES:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/deliveries/plans/{id}/confirm",
    "method": "POST",
    "path": "/api/deliveries/plans/{id}/confirm",
    "module": "entregas",
    "title": "Confirmar entrega",
    "permissions": [
      "DELIVERIES:CONFIRM"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.DeliveryConfirmations.Commands.ConfirmDeliveryCommand"
    }
  },
  {
    "key": "POST /api/deliveries/plans/{id}/return",
    "method": "POST",
    "path": "/api/deliveries/plans/{id}/return",
    "module": "entregas",
    "title": "Retornar a agencia",
    "permissions": [
      "DELIVERIES:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.DeliveryPlans.Commands.ReturnDeliveryCommand"
    }
  },
  {
    "key": "GET /api/drivers",
    "method": "GET",
    "path": "/api/drivers",
    "module": "conductores",
    "title": "Listar",
    "permissions": [
      "TRANSPORT:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/drivers",
    "method": "POST",
    "path": "/api/drivers",
    "module": "conductores",
    "title": "Registrar",
    "permissions": [
      "TRANSPORT:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Drivers.Commands.CreateDriverCommand"
    }
  },
  {
    "key": "PUT /api/drivers/{id}",
    "method": "PUT",
    "path": "/api/drivers/{id}",
    "module": "conductores",
    "title": "Editar",
    "permissions": [
      "TRANSPORT:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Drivers.Commands.UpdateDriverCommand"
    }
  },
  {
    "key": "POST /api/drivers/{id}/activate",
    "module": "conductores",
    "title": "Activar",
    "permissions": [
      "TRANSPORT:CANCEL"
    ],
    "method": "POST",
    "path": "/api/drivers/{id}/activate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/drivers/{id}/deactivate",
    "module": "conductores",
    "title": "Desactivar",
    "permissions": [
      "TRANSPORT:CANCEL"
    ],
    "method": "POST",
    "path": "/api/drivers/{id}/deactivate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/orders",
    "method": "GET",
    "path": "/api/orders",
    "module": "pedidos",
    "title": "Listar",
    "permissions": [
      "ORDERS:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "Search",
        "in": "query",
        "schema": {
          "type": "string"
        }
      },
      {
        "name": "AgencyId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "Status",
        "in": "query",
        "schema": {
          "type": "string"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/orders",
    "method": "POST",
    "path": "/api/orders",
    "module": "pedidos",
    "title": "Registrar",
    "permissions": [
      "ORDERS:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Orders.Commands.CreateOrderCommand"
    }
  },
  {
    "key": "GET /api/orders/{id}",
    "method": "GET",
    "path": "/api/orders/{id}",
    "module": "pedidos",
    "title": "Consultar detalle",
    "permissions": [
      "ORDERS:READ"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "PUT /api/orders/{id}",
    "method": "PUT",
    "path": "/api/orders/{id}",
    "module": "pedidos",
    "title": "Editar",
    "permissions": [
      "ORDERS:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Orders.Commands.UpdateOrderCommand"
    }
  },
  {
    "key": "GET /api/orders/tracking/{trackingNumber}",
    "method": "GET",
    "path": "/api/orders/tracking/{trackingNumber}",
    "module": "pedidos",
    "title": "Seguimiento por guía",
    "permissions": [
      "ORDERS:READ"
    ],
    "parameters": [
      {
        "name": "trackingNumber",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/orders/{id}/cancel",
    "method": "POST",
    "path": "/api/orders/{id}/cancel",
    "module": "pedidos",
    "title": "Cancelar",
    "permissions": [
      "ORDERS:CANCEL"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Orders.Commands.CancelOrderCommand"
    }
  },
  {
    "key": "GET /api/permissions",
    "method": "GET",
    "path": "/api/permissions",
    "module": "permisos",
    "title": "Listar",
    "permissions": [
      "SECURITY:READ"
    ],
    "parameters": [],
    "body": null
  },
  {
    "key": "GET /api/purchase-orders",
    "method": "GET",
    "path": "/api/purchase-orders",
    "module": "compras",
    "title": "Listar",
    "permissions": [
      "PURCHASING:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "AgencyId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/purchase-orders",
    "method": "POST",
    "path": "/api/purchase-orders",
    "module": "compras",
    "title": "Registrar",
    "permissions": [
      "PURCHASING:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.PurchaseOrders.Commands.CreatePurchaseOrderCommand"
    }
  },
  {
    "key": "GET /api/purchase-orders/{id}",
    "method": "GET",
    "path": "/api/purchase-orders/{id}",
    "module": "compras",
    "title": "Consultar detalle",
    "permissions": [
      "PURCHASING:READ"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/purchase-orders/{id}/issue",
    "module": "compras",
    "title": "Emitir orden",
    "permissions": [
      "PURCHASING:UPDATE"
    ],
    "method": "POST",
    "path": "/api/purchase-orders/{id}/issue",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/purchase-orders/{id}/cancel",
    "module": "compras",
    "title": "Cancelar orden",
    "permissions": [
      "PURCHASING:CANCEL"
    ],
    "method": "POST",
    "path": "/api/purchase-orders/{id}/cancel",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/purchase-orders/allocations",
    "method": "POST",
    "path": "/api/purchase-orders/allocations",
    "module": "compras",
    "title": "Vincular solicitud",
    "permissions": [
      "PURCHASING:UPDATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.PurchaseAllocations.Commands.AllocatePurchaseCommand"
    }
  },
  {
    "key": "POST /api/purchase-orders/{id}/receipts",
    "method": "POST",
    "path": "/api/purchase-orders/{id}/receipts",
    "module": "compras",
    "title": "Registrar recepción",
    "permissions": [
      "PURCHASING:RECEIVE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.PurchaseReceipts.Commands.ReceivePurchaseCommand"
    }
  },
  {
    "key": "GET /api/purchase-requests",
    "method": "GET",
    "path": "/api/purchase-requests",
    "module": "solicitudes",
    "title": "Listar",
    "permissions": [
      "PURCHASING:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "AgencyId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/purchase-requests",
    "method": "POST",
    "path": "/api/purchase-requests",
    "module": "solicitudes",
    "title": "Registrar",
    "permissions": [
      "PURCHASING:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.PurchaseRequests.Commands.CreatePurchaseRequestCommand"
    }
  },
  {
    "key": "GET /api/purchase-requests/{id}",
    "method": "GET",
    "path": "/api/purchase-requests/{id}",
    "module": "solicitudes",
    "title": "Consultar detalle",
    "permissions": [
      "PURCHASING:READ"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/purchase-requests/{id}/submit",
    "module": "solicitudes",
    "title": "Enviar solicitud",
    "permissions": [
      "PURCHASING:UPDATE"
    ],
    "method": "POST",
    "path": "/api/purchase-requests/{id}/submit",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/purchase-requests/{id}/approve",
    "module": "solicitudes",
    "title": "Aprobar solicitud",
    "permissions": [
      "PURCHASING:APPROVE"
    ],
    "method": "POST",
    "path": "/api/purchase-requests/{id}/approve",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/purchase-requests/{id}/reject",
    "module": "solicitudes",
    "title": "Rechazar solicitud",
    "permissions": [
      "PURCHASING:APPROVE"
    ],
    "method": "POST",
    "path": "/api/purchase-requests/{id}/reject",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/purchase-requests/{id}/cancel",
    "module": "solicitudes",
    "title": "Cancelar solicitud",
    "permissions": [
      "PURCHASING:CANCEL"
    ],
    "method": "POST",
    "path": "/api/purchase-requests/{id}/cancel",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/quotations",
    "method": "POST",
    "path": "/api/quotations",
    "module": "cotizaciones",
    "title": "Registrar",
    "permissions": [
      "SALES:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Quotations.Commands.CreateQuotationCommand"
    }
  },
  {
    "key": "GET /api/quotations/orders/{orderId}",
    "method": "GET",
    "path": "/api/quotations/orders/{orderId}",
    "module": "cotizaciones",
    "title": "Cotizaciones del pedido",
    "permissions": [
      "SALES:READ"
    ],
    "parameters": [
      {
        "name": "orderId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "OrderId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/receipt-series",
    "method": "GET",
    "path": "/api/receipt-series",
    "module": "series",
    "title": "Listar",
    "permissions": [
      "SALES:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/receipt-series",
    "method": "POST",
    "path": "/api/receipt-series",
    "module": "series",
    "title": "Registrar",
    "permissions": [
      "SALES:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.ReceiptSeries.Commands.CreateReceiptSeriesCommand"
    }
  },
  {
    "key": "PUT /api/receipt-series/{id}",
    "method": "PUT",
    "path": "/api/receipt-series/{id}",
    "module": "series",
    "title": "Editar",
    "permissions": [
      "SALES:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.ReceiptSeries.Commands.UpdateReceiptSeriesCommand"
    }
  },
  {
    "key": "POST /api/receipt-series/{id}/activate",
    "module": "series",
    "title": "Activar",
    "permissions": [
      "SALES:CANCEL"
    ],
    "method": "POST",
    "path": "/api/receipt-series/{id}/activate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/receipt-series/{id}/deactivate",
    "module": "series",
    "title": "Desactivar",
    "permissions": [
      "SALES:CANCEL"
    ],
    "method": "POST",
    "path": "/api/receipt-series/{id}/deactivate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/reports/sales",
    "module": "ventas",
    "title": "Exportar ventas Excel",
    "permissions": [
      "SALES:READ"
    ],
    "method": "GET",
    "path": "/api/reports/sales",
    "parameters": [
      {
        "name": "StartDate",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "date"
        }
      },
      {
        "name": "EndDate",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "date"
        }
      }
    ],
    "body": null,
    "download": true
  },
  {
    "key": "GET /api/reports/cash",
    "module": "sesiones-caja",
    "title": "Exportar caja Excel",
    "permissions": [
      "CASH:READ"
    ],
    "method": "GET",
    "path": "/api/reports/cash",
    "parameters": [
      {
        "name": "StartDate",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "date"
        }
      },
      {
        "name": "EndDate",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "date"
        }
      }
    ],
    "body": null,
    "download": true
  },
  {
    "key": "GET /api/reports/purchases",
    "module": "compras",
    "title": "Exportar compras Excel",
    "permissions": [
      "PURCHASING:READ"
    ],
    "method": "GET",
    "path": "/api/reports/purchases",
    "parameters": [
      {
        "name": "StartDate",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "date"
        }
      },
      {
        "name": "EndDate",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "date"
        }
      }
    ],
    "body": null,
    "download": true
  },
  {
    "key": "GET /api/roles",
    "method": "GET",
    "path": "/api/roles",
    "module": "roles",
    "title": "Listar",
    "permissions": [
      "SECURITY:READ"
    ],
    "parameters": [],
    "body": null
  },
  {
    "key": "POST /api/roles",
    "method": "POST",
    "path": "/api/roles",
    "module": "roles",
    "title": "Registrar",
    "permissions": [
      "SECURITY:MANAGE_ACCESS"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Roles.Commands.CreateRoleCommand"
    }
  },
  {
    "key": "PUT /api/roles/{id}",
    "method": "PUT",
    "path": "/api/roles/{id}",
    "module": "roles",
    "title": "Editar",
    "permissions": [
      "SECURITY:MANAGE_ACCESS"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Roles.Commands.UpdateRoleCommand"
    }
  },
  {
    "key": "GET /api/routes",
    "method": "GET",
    "path": "/api/routes",
    "module": "rutas",
    "title": "Listar",
    "permissions": [
      "TRANSPORT:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/routes",
    "method": "POST",
    "path": "/api/routes",
    "module": "rutas",
    "title": "Registrar",
    "permissions": [
      "TRANSPORT:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Routes.Commands.CreateRouteCommand"
    }
  },
  {
    "key": "PUT /api/routes/{id}",
    "method": "PUT",
    "path": "/api/routes/{id}",
    "module": "rutas",
    "title": "Editar",
    "permissions": [
      "TRANSPORT:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Routes.Commands.UpdateRouteCommand"
    }
  },
  {
    "key": "POST /api/routes/{id}/activate",
    "module": "rutas",
    "title": "Activar",
    "permissions": [
      "TRANSPORT:CANCEL"
    ],
    "method": "POST",
    "path": "/api/routes/{id}/activate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/routes/{id}/deactivate",
    "module": "rutas",
    "title": "Desactivar",
    "permissions": [
      "TRANSPORT:CANCEL"
    ],
    "method": "POST",
    "path": "/api/routes/{id}/deactivate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/sales",
    "method": "GET",
    "path": "/api/sales",
    "module": "ventas",
    "title": "Listar",
    "permissions": [
      "SALES:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "AgencyId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "OrderId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "PendingOnly",
        "in": "query",
        "schema": {
          "type": "boolean"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/sales",
    "method": "POST",
    "path": "/api/sales",
    "module": "ventas",
    "title": "Registrar",
    "permissions": [
      "SALES:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Sales.Commands.CreateSaleCommand"
    }
  },
  {
    "key": "GET /api/sales/{id}",
    "method": "GET",
    "path": "/api/sales/{id}",
    "module": "ventas",
    "title": "Consultar detalle",
    "permissions": [
      "SALES:READ"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/sales/{id}/void",
    "method": "POST",
    "path": "/api/sales/{id}/void",
    "module": "ventas",
    "title": "Anular venta",
    "permissions": [
      "SALES:CANCEL"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Sales.Commands.VoidSaleCommand"
    }
  },
  {
    "key": "POST /api/sales/{id}/receipt",
    "method": "POST",
    "path": "/api/sales/{id}/receipt",
    "module": "ventas",
    "title": "Emitir comprobante",
    "permissions": [
      "SALES:CREATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Receipts.Commands.IssueReceiptCommand"
    }
  },
  {
    "key": "POST /api/sunat-beta/invoices",
    "module": "sunat",
    "title": "Preparar comprobante",
    "permissions": [
      "SUNAT:CREATE"
    ],
    "method": "POST",
    "path": "/api/sunat-beta/invoices",
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.SunatInvoices.Commands.PrepareSunatInvoiceCommand"
    }
  },
  {
    "key": "GET /api/sunat-beta/invoices",
    "module": "sunat",
    "title": "Listar",
    "permissions": [
      "SUNAT:READ"
    ],
    "method": "GET",
    "path": "/api/sunat-beta/invoices",
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/sunat-beta/invoices/{id}/send",
    "module": "sunat",
    "title": "Enviar a SUNAT beta",
    "permissions": [
      "SUNAT:SEND"
    ],
    "method": "POST",
    "path": "/api/sunat-beta/invoices/{id}/send",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/sunat-beta/invoices/{id}",
    "module": "sunat",
    "title": "Consultar detalle",
    "permissions": [
      "SUNAT:READ"
    ],
    "method": "GET",
    "path": "/api/sunat-beta/invoices/{id}",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/sunat-beta/invoices/{id}/attempts",
    "module": "sunat",
    "title": "Consultar intentos",
    "permissions": [
      "SUNAT:READ"
    ],
    "method": "GET",
    "path": "/api/sunat-beta/invoices/{id}/attempts",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/sunat-beta/invoices/{id}/xml",
    "module": "sunat",
    "title": "Descargar XML",
    "permissions": [
      "SUNAT:READ"
    ],
    "method": "GET",
    "path": "/api/sunat-beta/invoices/{id}/xml",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null,
    "download": true
  },
  {
    "key": "GET /api/sunat-beta/invoices/{id}/cdr",
    "module": "sunat",
    "title": "Descargar CDR",
    "permissions": [
      "SUNAT:READ"
    ],
    "method": "GET",
    "path": "/api/sunat-beta/invoices/{id}/cdr",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null,
    "download": true
  },
  {
    "key": "GET /api/suppliers",
    "method": "GET",
    "path": "/api/suppliers",
    "module": "proveedores",
    "title": "Listar",
    "permissions": [
      "PURCHASING:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/suppliers",
    "method": "POST",
    "path": "/api/suppliers",
    "module": "proveedores",
    "title": "Registrar",
    "permissions": [
      "PURCHASING:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Suppliers.Commands.CreateSupplierCommand"
    }
  },
  {
    "key": "PUT /api/suppliers/{id}",
    "method": "PUT",
    "path": "/api/suppliers/{id}",
    "module": "proveedores",
    "title": "Editar",
    "permissions": [
      "PURCHASING:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Suppliers.Commands.UpdateSupplierCommand"
    }
  },
  {
    "key": "POST /api/suppliers/{id}/activate",
    "module": "proveedores",
    "title": "Activar",
    "permissions": [
      "PURCHASING:CANCEL"
    ],
    "method": "POST",
    "path": "/api/suppliers/{id}/activate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/suppliers/{id}/deactivate",
    "module": "proveedores",
    "title": "Desactivar",
    "permissions": [
      "PURCHASING:CANCEL"
    ],
    "method": "POST",
    "path": "/api/suppliers/{id}/deactivate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/supplies",
    "method": "GET",
    "path": "/api/supplies",
    "module": "suministros",
    "title": "Listar",
    "permissions": [
      "PURCHASING:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/supplies",
    "method": "POST",
    "path": "/api/supplies",
    "module": "suministros",
    "title": "Registrar",
    "permissions": [
      "PURCHASING:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Supplies.Commands.CreateSupplyCommand"
    }
  },
  {
    "key": "PUT /api/supplies/{id}",
    "method": "PUT",
    "path": "/api/supplies/{id}",
    "module": "suministros",
    "title": "Editar",
    "permissions": [
      "PURCHASING:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Supplies.Commands.UpdateSupplyCommand"
    }
  },
  {
    "key": "POST /api/supplies/{id}/activate",
    "module": "suministros",
    "title": "Activar",
    "permissions": [
      "PURCHASING:CANCEL"
    ],
    "method": "POST",
    "path": "/api/supplies/{id}/activate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/supplies/{id}/deactivate",
    "module": "suministros",
    "title": "Desactivar",
    "permissions": [
      "PURCHASING:CANCEL"
    ],
    "method": "POST",
    "path": "/api/supplies/{id}/deactivate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/tariffs",
    "method": "GET",
    "path": "/api/tariffs",
    "module": "tarifas",
    "title": "Listar",
    "permissions": [
      "SALES:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/tariffs",
    "method": "POST",
    "path": "/api/tariffs",
    "module": "tarifas",
    "title": "Registrar",
    "permissions": [
      "SALES:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.TariffRules.Commands.CreateTariffRuleCommand"
    }
  },
  {
    "key": "PUT /api/tariffs/{id}",
    "method": "PUT",
    "path": "/api/tariffs/{id}",
    "module": "tarifas",
    "title": "Editar",
    "permissions": [
      "SALES:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.TariffRules.Commands.UpdateTariffRuleCommand"
    }
  },
  {
    "key": "GET /api/trips",
    "method": "GET",
    "path": "/api/trips",
    "module": "viajes",
    "title": "Listar",
    "permissions": [
      "TRANSPORT:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/trips",
    "method": "POST",
    "path": "/api/trips",
    "module": "viajes",
    "title": "Registrar",
    "permissions": [
      "TRANSPORT:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Trips.Commands.CreateTripCommand"
    }
  },
  {
    "key": "GET /api/trips/{id}/orders",
    "method": "GET",
    "path": "/api/trips/{id}/orders",
    "module": "viajes",
    "title": "Consultar pedidos del viaje",
    "permissions": [
      "TRANSPORT:READ"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/trips/{id}/orders/{orderId}",
    "method": "POST",
    "path": "/api/trips/{id}/orders/{orderId}",
    "module": "viajes",
    "title": "Asignar pedido al viaje",
    "permissions": [
      "TRANSPORT:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "orderId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/trips/{id}/orders/{orderId}/unassign",
    "method": "POST",
    "path": "/api/trips/{id}/orders/{orderId}/unassign",
    "module": "viajes",
    "title": "Desasignar pedido",
    "permissions": [
      "TRANSPORT:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "orderId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.TripOrders.Commands.UnassignTripOrderCommand"
    }
  },
  {
    "key": "POST /api/trips/{id}/depart",
    "method": "POST",
    "path": "/api/trips/{id}/depart",
    "module": "viajes",
    "title": "Registrar salida",
    "permissions": [
      "TRANSPORT:DEPART"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/trips/{id}/arrive",
    "method": "POST",
    "path": "/api/trips/{id}/arrive",
    "module": "viajes",
    "title": "Registrar llegada",
    "permissions": [
      "TRANSPORT:ARRIVE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Trips.Commands.ArriveTripCommand"
    }
  },
  {
    "key": "POST /api/trips/{id}/cancel",
    "method": "POST",
    "path": "/api/trips/{id}/cancel",
    "module": "viajes",
    "title": "Cancelar",
    "permissions": [
      "TRANSPORT:CANCEL"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Trips.Commands.CancelTripCommand"
    }
  },
  {
    "key": "GET /api/users",
    "method": "GET",
    "path": "/api/users",
    "module": "usuarios",
    "title": "Listar",
    "permissions": [
      "SECURITY:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/users",
    "method": "POST",
    "path": "/api/users",
    "module": "usuarios",
    "title": "Registrar",
    "permissions": [
      "SECURITY:CREATE",
      "SECURITY:MANAGE_ACCESS"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Users.Commands.CreateUserCommand"
    }
  },
  {
    "key": "GET /api/users/{id}",
    "method": "GET",
    "path": "/api/users/{id}",
    "module": "usuarios",
    "title": "Consultar detalle",
    "permissions": [
      "SECURITY:READ"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "PUT /api/users/{id}",
    "method": "PUT",
    "path": "/api/users/{id}",
    "module": "usuarios",
    "title": "Editar",
    "permissions": [
      "SECURITY:UPDATE",
      "SECURITY:MANAGE_ACCESS"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Users.Commands.UpdateUserCommand"
    }
  },
  {
    "key": "PUT /api/users/{id}/roles",
    "method": "PUT",
    "path": "/api/users/{id}/roles",
    "module": "usuarios",
    "title": "Asignar roles",
    "permissions": [
      "SECURITY:MANAGE_ACCESS"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Users.Commands.AssignUserRolesCommand"
    }
  },
  {
    "key": "GET /api/vehicles",
    "method": "GET",
    "path": "/api/vehicles",
    "module": "vehiculos",
    "title": "Listar",
    "permissions": [
      "TRANSPORT:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/vehicles",
    "method": "POST",
    "path": "/api/vehicles",
    "module": "vehiculos",
    "title": "Registrar",
    "permissions": [
      "TRANSPORT:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Vehicles.Commands.CreateVehicleCommand"
    }
  },
  {
    "key": "PUT /api/vehicles/{id}",
    "method": "PUT",
    "path": "/api/vehicles/{id}",
    "module": "vehiculos",
    "title": "Editar",
    "permissions": [
      "TRANSPORT:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Vehicles.Commands.UpdateVehicleCommand"
    }
  },
  {
    "key": "POST /api/vehicles/{id}/activate",
    "module": "vehiculos",
    "title": "Activar",
    "permissions": [
      "TRANSPORT:CANCEL"
    ],
    "method": "POST",
    "path": "/api/vehicles/{id}/activate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/vehicles/{id}/deactivate",
    "module": "vehiculos",
    "title": "Desactivar",
    "permissions": [
      "TRANSPORT:CANCEL"
    ],
    "method": "POST",
    "path": "/api/vehicles/{id}/deactivate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/warehouse-locations",
    "method": "GET",
    "path": "/api/warehouse-locations",
    "module": "ubicaciones",
    "title": "Listar",
    "permissions": [
      "WAREHOUSE:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/warehouse-locations",
    "method": "POST",
    "path": "/api/warehouse-locations",
    "module": "ubicaciones",
    "title": "Registrar",
    "permissions": [
      "WAREHOUSE:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.WarehouseLocations.Commands.CreateWarehouseLocationCommand"
    }
  },
  {
    "key": "PUT /api/warehouse-locations/{id}",
    "method": "PUT",
    "path": "/api/warehouse-locations/{id}",
    "module": "ubicaciones",
    "title": "Editar",
    "permissions": [
      "WAREHOUSE:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.WarehouseLocations.Commands.UpdateWarehouseLocationCommand"
    }
  },
  {
    "key": "POST /api/warehouse-locations/{id}/activate",
    "module": "ubicaciones",
    "title": "Activar",
    "permissions": [
      "WAREHOUSE:CANCEL"
    ],
    "method": "POST",
    "path": "/api/warehouse-locations/{id}/activate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/warehouse-locations/{id}/deactivate",
    "module": "ubicaciones",
    "title": "Desactivar",
    "permissions": [
      "WAREHOUSE:CANCEL"
    ],
    "method": "POST",
    "path": "/api/warehouse-locations/{id}/deactivate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/warehouse/stock",
    "method": "GET",
    "path": "/api/warehouse/stock",
    "module": "recepcion",
    "title": "Consultar existencias",
    "permissions": [
      "WAREHOUSE:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "AgencyId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "LocationId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "GET /api/warehouse/packages/{packageId}/movements",
    "method": "GET",
    "path": "/api/warehouse/packages/{packageId}/movements",
    "module": "recepcion",
    "title": "Historial de movimientos",
    "permissions": [
      "WAREHOUSE:READ"
    ],
    "parameters": [
      {
        "name": "packageId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "PackageId",
        "in": "query",
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/warehouse/orders/{id}/receive",
    "method": "POST",
    "path": "/api/warehouse/orders/{id}/receive",
    "module": "recepcion",
    "title": "Recibir pedido",
    "permissions": [
      "WAREHOUSE:RECEIVE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Orders.Commands.ReceiveOrderCommand"
    }
  },
  {
    "key": "POST /api/warehouse/orders/{orderId}/packages/{packageId}/move",
    "method": "POST",
    "path": "/api/warehouse/orders/{orderId}/packages/{packageId}/move",
    "module": "recepcion",
    "title": "Mover paquete",
    "permissions": [
      "WAREHOUSE:UPDATE"
    ],
    "parameters": [
      {
        "name": "orderId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      },
      {
        "name": "packageId",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.PackageMovements.Commands.MovePackageCommand"
    }
  },
  {
    "key": "GET /api/warehouses",
    "method": "GET",
    "path": "/api/warehouses",
    "module": "almacenes",
    "title": "Listar",
    "permissions": [
      "WAREHOUSE:READ"
    ],
    "parameters": [
      {
        "name": "Page",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      },
      {
        "name": "PageSize",
        "in": "query",
        "schema": {
          "type": "integer",
          "format": "int32"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/warehouses",
    "method": "POST",
    "path": "/api/warehouses",
    "module": "almacenes",
    "title": "Registrar",
    "permissions": [
      "WAREHOUSE:CREATE"
    ],
    "parameters": [],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Warehouses.Commands.CreateWarehouseCommand"
    }
  },
  {
    "key": "PUT /api/warehouses/{id}",
    "method": "PUT",
    "path": "/api/warehouses/{id}",
    "module": "almacenes",
    "title": "Editar",
    "permissions": [
      "WAREHOUSE:UPDATE"
    ],
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": {
      "$ref": "#/components/schemas/LogiERP.Application.UseCases.Warehouses.Commands.UpdateWarehouseCommand"
    }
  },
  {
    "key": "POST /api/warehouses/{id}/activate",
    "module": "almacenes",
    "title": "Activar",
    "permissions": [
      "WAREHOUSE:CANCEL"
    ],
    "method": "POST",
    "path": "/api/warehouses/{id}/activate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  },
  {
    "key": "POST /api/warehouses/{id}/deactivate",
    "module": "almacenes",
    "title": "Desactivar",
    "permissions": [
      "WAREHOUSE:CANCEL"
    ],
    "method": "POST",
    "path": "/api/warehouses/{id}/deactivate",
    "parameters": [
      {
        "name": "id",
        "in": "path",
        "required": true,
        "schema": {
          "type": "string",
          "format": "uuid"
        }
      }
    ],
    "body": null
  }
];

export const SCHEMAS: Record<string, Schema> = {
  "LogiERP.Application.DTOs.Agencies.AgencyDetailsDto": {
    "type": "object",
    "properties": {
      "agency": {
        "$ref": "#/components/schemas/LogiERP.Application.DTOs.Agencies.AgencyDto"
      },
      "openingHours": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.UseCases.AgencyOpeningHours.Commands.AgencyOpeningHourInput"
        },
        "nullable": true
      },
      "users": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.UseCases.UserAgencies.Commands.UserAgencyInput"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Agencies.AgencyDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "districtId": {
        "type": "string",
        "format": "uuid"
      },
      "addressLine": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "latitude": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "longitude": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.AuditEvents.AuditDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "userId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "action": {
        "type": "string",
        "nullable": true
      },
      "entityName": {
        "type": "string",
        "nullable": true
      },
      "entityKey": {
        "type": "string",
        "nullable": true
      },
      "occurredAt": {
        "type": "string",
        "format": "date-time"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.CashMovements.CashMovementDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "cashSessionId": {
        "type": "string",
        "format": "uuid"
      },
      "conceptCode": {
        "type": "string",
        "nullable": true
      },
      "paymentMethodCode": {
        "type": "string",
        "nullable": true
      },
      "amount": {
        "type": "number",
        "format": "double"
      },
      "occurredAt": {
        "type": "string",
        "format": "date-time"
      },
      "recordedBy": {
        "type": "string",
        "format": "uuid"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "externalReference": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.CashRegisters.CashRegisterDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "agencyId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.CashSessions.CashSessionDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "cashRegisterId": {
        "type": "string",
        "format": "uuid"
      },
      "openedBy": {
        "type": "string",
        "format": "uuid"
      },
      "openedAt": {
        "type": "string",
        "format": "date-time"
      },
      "openingCashAmount": {
        "type": "number",
        "format": "double"
      },
      "closedBy": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "closedAt": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "countedClosingCash": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "closingNotes": {
        "type": "string",
        "nullable": true
      },
      "cashIn": {
        "type": "number",
        "format": "double"
      },
      "cashOut": {
        "type": "number",
        "format": "double"
      },
      "noncashIn": {
        "type": "number",
        "format": "double"
      },
      "noncashOut": {
        "type": "number",
        "format": "double"
      },
      "expectedCashAmount": {
        "type": "number",
        "format": "double"
      },
      "cashDifference": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "movements": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.DTOs.CashMovements.CashMovementDto"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Catalogs.CatalogDto": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Companies.CompanyDto": {
    "type": "object",
    "properties": {
      "taxNumber": {
        "type": "string",
        "nullable": true
      },
      "legalName": {
        "type": "string",
        "nullable": true
      },
      "tradeName": {
        "type": "string",
        "nullable": true
      },
      "districtId": {
        "type": "string",
        "format": "uuid"
      },
      "addressLine": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Dashboard.DashboardDto": {
    "type": "object",
    "properties": {
      "registeredOrders": {
        "type": "integer",
        "format": "int32"
      },
      "ordersByStatus": {
        "type": "object",
        "additionalProperties": {
          "type": "integer",
          "format": "int32"
        },
        "nullable": true
      },
      "pendingDeliveries": {
        "type": "integer",
        "format": "int32"
      },
      "totalAmount": {
        "type": "number",
        "format": "double"
      },
      "paidAmount": {
        "type": "number",
        "format": "double"
      },
      "pendingAmount": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.DeliveryAttempts.DeliveryAttemptDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "deliveryPlanId": {
        "type": "string",
        "format": "uuid"
      },
      "attemptNumber": {
        "type": "integer",
        "format": "int32"
      },
      "outcomeCode": {
        "type": "string",
        "nullable": true
      },
      "attemptedAt": {
        "type": "string",
        "format": "date-time"
      },
      "notes": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.DeliveryConfirmations.DeliveryConfirmationDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "deliveryAttemptId": {
        "type": "string",
        "format": "uuid"
      },
      "confirmationNumber": {
        "type": "string",
        "nullable": true
      },
      "receiverName": {
        "type": "string",
        "nullable": true
      },
      "documentTypeCode": {
        "type": "string",
        "nullable": true
      },
      "documentNumber": {
        "type": "string",
        "nullable": true
      },
      "evidenceReference": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.DeliveryPlans.DeliveryPlanDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "orderId": {
        "type": "string",
        "format": "uuid"
      },
      "scheduledFor": {
        "type": "string",
        "format": "date-time"
      },
      "driverId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "cancelledAt": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "cancellationReason": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Drivers.DriverDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "documentTypeCode": {
        "type": "string",
        "nullable": true
      },
      "documentNumber": {
        "type": "string",
        "nullable": true
      },
      "fullName": {
        "type": "string",
        "nullable": true
      },
      "licenseNumber": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.OrderStatusHistories.OrderStatusHistoryDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "statusCode": {
        "type": "string",
        "nullable": true
      },
      "agencyId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "changedBy": {
        "type": "string",
        "format": "uuid"
      },
      "occurredAt": {
        "type": "string",
        "format": "date-time"
      },
      "notes": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Orders.OrderDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "trackingNumber": {
        "type": "string",
        "nullable": true
      },
      "serviceTypeCode": {
        "type": "string",
        "nullable": true
      },
      "originAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "destinationAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "createdAt": {
        "type": "string",
        "format": "date-time"
      },
      "notes": {
        "type": "string",
        "nullable": true
      },
      "statusCode": {
        "type": "string",
        "nullable": true
      },
      "currentAgencyId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "sender": {
        "$ref": "#/components/schemas/LogiERP.Application.UseCases.OrderParties.Commands.SaveOrderPartyInput"
      },
      "recipient": {
        "$ref": "#/components/schemas/LogiERP.Application.UseCases.OrderParties.Commands.SaveOrderPartyInput"
      },
      "packages": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.DTOs.Packages.PackageDto"
        },
        "nullable": true
      },
      "history": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.DTOs.OrderStatusHistories.OrderStatusHistoryDto"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.PackageMovements.PackageMovementDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "packageId": {
        "type": "string",
        "format": "uuid"
      },
      "fromLocationId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "toLocationId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "recordedBy": {
        "type": "string",
        "format": "uuid"
      },
      "occurredAt": {
        "type": "string",
        "format": "date-time"
      },
      "reason": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Packages.PackageDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "orderId": {
        "type": "string",
        "format": "uuid"
      },
      "packageNumber": {
        "type": "integer",
        "format": "int32"
      },
      "packageTypeCode": {
        "type": "string",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "weightKg": {
        "type": "number",
        "format": "double"
      },
      "lengthCm": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "widthCm": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "heightCm": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "declaredValue": {
        "type": "number",
        "format": "double"
      },
      "isFragile": {
        "type": "boolean"
      },
      "locationId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Permissions.PermissionDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "module": {
        "type": "string",
        "nullable": true
      },
      "action": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.PurchaseAllocations.PurchaseAllocationDto": {
    "type": "object",
    "properties": {
      "purchaseOrderLineId": {
        "type": "string",
        "format": "uuid"
      },
      "purchaseRequestLineId": {
        "type": "string",
        "format": "uuid"
      },
      "allocatedQuantity": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.PurchaseOrderLines.PurchaseOrderLineDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "purchaseOrderId": {
        "type": "string",
        "format": "uuid"
      },
      "supplyId": {
        "type": "string",
        "format": "uuid"
      },
      "orderedQuantity": {
        "type": "number",
        "format": "double"
      },
      "unitCost": {
        "type": "number",
        "format": "double"
      },
      "receivedQuantity": {
        "type": "number",
        "format": "double"
      },
      "pendingQuantity": {
        "type": "number",
        "format": "double"
      },
      "lineTotal": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.PurchaseOrders.PurchaseOrderDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "orderNumber": {
        "type": "string",
        "nullable": true
      },
      "supplierId": {
        "type": "string",
        "format": "uuid"
      },
      "deliveryWarehouseId": {
        "type": "string",
        "format": "uuid"
      },
      "statusCode": {
        "type": "string",
        "nullable": true
      },
      "orderedAt": {
        "type": "string",
        "format": "date-time"
      },
      "expectedDeliveryDate": {
        "type": "string",
        "format": "date",
        "nullable": true
      },
      "createdBy": {
        "type": "string",
        "format": "uuid"
      },
      "notes": {
        "type": "string",
        "nullable": true
      },
      "lines": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.DTOs.PurchaseOrderLines.PurchaseOrderLineDto"
        },
        "nullable": true
      },
      "receipts": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.DTOs.PurchaseReceipts.PurchaseReceiptDto"
        },
        "nullable": true
      },
      "totalAmount": {
        "type": "number",
        "format": "double"
      },
      "receiptProgress": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.PurchaseReceiptLines.PurchaseReceiptLineDto": {
    "type": "object",
    "properties": {
      "purchaseReceiptId": {
        "type": "string",
        "format": "uuid"
      },
      "purchaseOrderLineId": {
        "type": "string",
        "format": "uuid"
      },
      "receivedQuantity": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.PurchaseReceipts.PurchaseReceiptDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "purchaseOrderId": {
        "type": "string",
        "format": "uuid"
      },
      "receivedAt": {
        "type": "string",
        "format": "date-time"
      },
      "receivedBy": {
        "type": "string",
        "format": "uuid"
      },
      "supplierDeliveryNote": {
        "type": "string",
        "nullable": true
      },
      "lines": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.DTOs.PurchaseReceiptLines.PurchaseReceiptLineDto"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.PurchaseRequestLines.PurchaseRequestLineDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "purchaseRequestId": {
        "type": "string",
        "format": "uuid"
      },
      "supplyId": {
        "type": "string",
        "format": "uuid"
      },
      "requestedQuantity": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.PurchaseRequests.PurchaseRequestDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "agencyId": {
        "type": "string",
        "format": "uuid"
      },
      "requestedBy": {
        "type": "string",
        "format": "uuid"
      },
      "requestedAt": {
        "type": "string",
        "format": "date-time"
      },
      "statusCode": {
        "type": "string",
        "nullable": true
      },
      "reason": {
        "type": "string",
        "nullable": true
      },
      "lines": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.DTOs.PurchaseRequestLines.PurchaseRequestLineDto"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Quotations.QuotationDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "orderId": {
        "type": "string",
        "format": "uuid"
      },
      "tariffRuleId": {
        "type": "string",
        "format": "uuid"
      },
      "quotedAmount": {
        "type": "number",
        "format": "double"
      },
      "quotedAt": {
        "type": "string",
        "format": "date-time"
      },
      "validUntil": {
        "type": "string",
        "format": "date-time"
      },
      "createdBy": {
        "type": "string",
        "format": "uuid"
      },
      "notes": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.ReceiptSeries.ReceiptSeriesDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "agencyId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Receipts.ReceiptDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "saleId": {
        "type": "string",
        "format": "uuid"
      },
      "receiptSeriesId": {
        "type": "string",
        "format": "uuid"
      },
      "number": {
        "type": "integer",
        "format": "int64"
      },
      "issuedAt": {
        "type": "string",
        "format": "date-time"
      },
      "issuedBy": {
        "type": "string",
        "format": "uuid"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Roles.RoleDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      },
      "permissionIds": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Routes.RouteDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "originAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "destinationAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "expectedDurationMinutes": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.SaleLines.SaleLineDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "saleId": {
        "type": "string",
        "format": "uuid"
      },
      "lineNumber": {
        "type": "integer",
        "format": "int32"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "quantity": {
        "type": "number",
        "format": "double"
      },
      "unitPrice": {
        "type": "number",
        "format": "double"
      },
      "discountAmount": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Sales.SaleDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "orderId": {
        "type": "string",
        "format": "uuid"
      },
      "saleNumber": {
        "type": "string",
        "nullable": true
      },
      "soldAt": {
        "type": "string",
        "format": "date-time"
      },
      "soldBy": {
        "type": "string",
        "format": "uuid"
      },
      "totalAmount": {
        "type": "number",
        "format": "double"
      },
      "paidAmount": {
        "type": "number",
        "format": "double"
      },
      "pendingAmount": {
        "type": "number",
        "format": "double"
      },
      "isVoid": {
        "type": "boolean"
      },
      "lines": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.DTOs.SaleLines.SaleLineDto"
        },
        "nullable": true
      },
      "payments": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.DTOs.CashMovements.CashMovementDto"
        },
        "nullable": true
      },
      "receipt": {
        "$ref": "#/components/schemas/LogiERP.Application.DTOs.Receipts.ReceiptDto"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Suppliers.SupplierDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "taxNumber": {
        "type": "string",
        "nullable": true
      },
      "legalName": {
        "type": "string",
        "nullable": true
      },
      "districtId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "addressLine": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Supplies.SupplyDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "sku": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "unitCode": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.TariffRules.TariffRuleDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "serviceTypeCode": {
        "type": "string",
        "nullable": true
      },
      "originAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "destinationAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "validFrom": {
        "type": "string",
        "format": "date"
      },
      "validTo": {
        "type": "string",
        "format": "date",
        "nullable": true
      },
      "baseAmount": {
        "type": "number",
        "format": "double"
      },
      "includedWeightKg": {
        "type": "number",
        "format": "double"
      },
      "extraKgAmount": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.TripOrders.TripOrderDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "tripId": {
        "type": "string",
        "format": "uuid"
      },
      "orderId": {
        "type": "string",
        "format": "uuid"
      },
      "assignedAt": {
        "type": "string",
        "format": "date-time"
      },
      "unloadedAt": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "unassignedAt": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "unassignmentReason": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Trips.TripDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "routeId": {
        "type": "string",
        "format": "uuid"
      },
      "vehicleId": {
        "type": "string",
        "format": "uuid"
      },
      "driverId": {
        "type": "string",
        "format": "uuid"
      },
      "scheduledDeparture": {
        "type": "string",
        "format": "date-time"
      },
      "scheduledArrival": {
        "type": "string",
        "format": "date-time"
      },
      "departedAt": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "arrivedAt": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "cancelledAt": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "cancellationReason": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Users.AccessDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "fullName": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      },
      "roles": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "nullable": true
      },
      "permissions": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Users.LoginResponseDto": {
    "type": "object",
    "properties": {
      "accessToken": {
        "type": "string",
        "nullable": true
      },
      "expiresAt": {
        "type": "string",
        "format": "date-time"
      },
      "user": {
        "$ref": "#/components/schemas/LogiERP.Application.DTOs.Users.AccessDto"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Users.UserDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "fullName": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      },
      "documentTypeCode": {
        "type": "string",
        "nullable": true
      },
      "documentNumber": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      },
      "roles": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Vehicles.VehicleDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "plate": {
        "type": "string",
        "nullable": true
      },
      "vehicleTypeCode": {
        "type": "string",
        "nullable": true
      },
      "capacityKg": {
        "type": "number",
        "format": "double"
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.WarehouseLocations.WarehouseLocationDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "warehouseId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.DTOs.Warehouses.WarehouseDto": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "agencyId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Agencies.Commands.CreateAgencyCommand": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "districtId": {
        "type": "string",
        "format": "uuid"
      },
      "addressLine": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "latitude": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "longitude": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Agencies.Commands.SetAgencyAssignmentsCommand": {
    "type": "object",
    "properties": {
      "openingHours": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.UseCases.AgencyOpeningHours.Commands.AgencyOpeningHourInput"
        },
        "nullable": true
      },
      "users": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.UseCases.UserAgencies.Commands.UserAgencyInput"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Agencies.Commands.UpdateAgencyCommand": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "districtId": {
        "type": "string",
        "format": "uuid"
      },
      "addressLine": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "latitude": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "longitude": {
        "type": "number",
        "format": "double",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.AgencyOpeningHours.Commands.AgencyOpeningHourInput": {
    "type": "object",
    "properties": {
      "weekday": {
        "type": "integer",
        "format": "int32"
      },
      "opensAt": {
        "type": "string",
        "format": "time"
      },
      "closesAt": {
        "type": "string",
        "format": "time"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Auth.Commands.LoginCommand": {
    "type": "object",
    "properties": {
      "email": {
        "type": "string",
        "nullable": true
      },
      "password": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.CashMovements.Commands.RecordCashMovementCommand": {
    "type": "object",
    "properties": {
      "conceptCode": {
        "type": "string",
        "nullable": true
      },
      "paymentMethodCode": {
        "type": "string",
        "nullable": true
      },
      "amount": {
        "type": "number",
        "format": "double"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "externalReference": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.CashRegisters.Commands.CreateCashRegisterCommand": {
    "type": "object",
    "properties": {
      "agencyId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.CashRegisters.Commands.UpdateCashRegisterCommand": {
    "type": "object",
    "properties": {
      "agencyId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.CashSessions.Commands.CloseCashSessionCommand": {
    "type": "object",
    "properties": {
      "countedClosingCash": {
        "type": "number",
        "format": "double"
      },
      "closingNotes": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.CashSessions.Commands.OpenCashSessionCommand": {
    "type": "object",
    "properties": {
      "cashRegisterId": {
        "type": "string",
        "format": "uuid"
      },
      "openingCashAmount": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Catalogs.Commands.SaveCatalogCommand": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Companies.Commands.SaveCompanyCommand": {
    "type": "object",
    "properties": {
      "taxNumber": {
        "type": "string",
        "nullable": true
      },
      "legalName": {
        "type": "string",
        "nullable": true
      },
      "tradeName": {
        "type": "string",
        "nullable": true
      },
      "districtId": {
        "type": "string",
        "format": "uuid"
      },
      "addressLine": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.DeliveryAttempts.Commands.RecordDeliveryAttemptCommand": {
    "type": "object",
    "properties": {
      "outcomeCode": {
        "type": "string",
        "nullable": true
      },
      "notes": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.DeliveryConfirmations.Commands.ConfirmDeliveryCommand": {
    "type": "object",
    "properties": {
      "receiverName": {
        "type": "string",
        "nullable": true
      },
      "documentTypeCode": {
        "type": "string",
        "nullable": true
      },
      "documentNumber": {
        "type": "string",
        "nullable": true
      },
      "evidenceReference": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.DeliveryPlans.Commands.CreateDeliveryPlanCommand": {
    "type": "object",
    "properties": {
      "orderId": {
        "type": "string",
        "format": "uuid"
      },
      "scheduledFor": {
        "type": "string",
        "format": "date-time"
      },
      "driverId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.DeliveryPlans.Commands.ReturnDeliveryCommand": {
    "type": "object",
    "properties": {
      "locationId": {
        "type": "string",
        "format": "uuid"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Drivers.Commands.CreateDriverCommand": {
    "type": "object",
    "properties": {
      "documentTypeCode": {
        "type": "string",
        "nullable": true
      },
      "documentNumber": {
        "type": "string",
        "nullable": true
      },
      "fullName": {
        "type": "string",
        "nullable": true
      },
      "licenseNumber": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Drivers.Commands.UpdateDriverCommand": {
    "type": "object",
    "properties": {
      "documentTypeCode": {
        "type": "string",
        "nullable": true
      },
      "documentNumber": {
        "type": "string",
        "nullable": true
      },
      "fullName": {
        "type": "string",
        "nullable": true
      },
      "licenseNumber": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.OrderParties.Commands.SaveOrderPartyInput": {
    "type": "object",
    "properties": {
      "fullName": {
        "type": "string",
        "nullable": true
      },
      "documentTypeCode": {
        "type": "string",
        "nullable": true
      },
      "documentNumber": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      },
      "addressLine": {
        "type": "string",
        "nullable": true
      },
      "districtId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Orders.Commands.CancelOrderCommand": {
    "type": "object",
    "properties": {
      "reason": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Orders.Commands.CreateOrderCommand": {
    "type": "object",
    "properties": {
      "serviceTypeCode": {
        "type": "string",
        "nullable": true
      },
      "originAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "destinationAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "notes": {
        "type": "string",
        "nullable": true
      },
      "sender": {
        "$ref": "#/components/schemas/LogiERP.Application.UseCases.OrderParties.Commands.SaveOrderPartyInput"
      },
      "recipient": {
        "$ref": "#/components/schemas/LogiERP.Application.UseCases.OrderParties.Commands.SaveOrderPartyInput"
      },
      "packages": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.UseCases.Packages.Commands.SavePackageInput"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Orders.Commands.ReceiveOrderCommand": {
    "type": "object",
    "properties": {
      "locationId": {
        "type": "string",
        "format": "uuid"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Orders.Commands.UpdateOrderCommand": {
    "type": "object",
    "properties": {
      "serviceTypeCode": {
        "type": "string",
        "nullable": true
      },
      "originAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "destinationAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "notes": {
        "type": "string",
        "nullable": true
      },
      "sender": {
        "$ref": "#/components/schemas/LogiERP.Application.UseCases.OrderParties.Commands.SaveOrderPartyInput"
      },
      "recipient": {
        "$ref": "#/components/schemas/LogiERP.Application.UseCases.OrderParties.Commands.SaveOrderPartyInput"
      },
      "packages": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.UseCases.Packages.Commands.SavePackageInput"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.PackageMovements.Commands.MovePackageCommand": {
    "type": "object",
    "properties": {
      "fromLocationId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "toLocationId": {
        "type": "string",
        "format": "uuid"
      },
      "reason": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Packages.Commands.SavePackageInput": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "packageTypeCode": {
        "type": "string",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "weightKg": {
        "type": "number",
        "format": "double"
      },
      "lengthCm": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "widthCm": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "heightCm": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "declaredValue": {
        "type": "number",
        "format": "double"
      },
      "isFragile": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.PurchaseAllocations.Commands.AllocatePurchaseCommand": {
    "type": "object",
    "properties": {
      "purchaseOrderLineId": {
        "type": "string",
        "format": "uuid"
      },
      "purchaseRequestLineId": {
        "type": "string",
        "format": "uuid"
      },
      "allocatedQuantity": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.PurchaseOrderLines.Commands.SavePurchaseOrderLineInput": {
    "type": "object",
    "properties": {
      "supplyId": {
        "type": "string",
        "format": "uuid"
      },
      "orderedQuantity": {
        "type": "number",
        "format": "double"
      },
      "unitCost": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.PurchaseOrders.Commands.CreatePurchaseOrderCommand": {
    "type": "object",
    "properties": {
      "supplierId": {
        "type": "string",
        "format": "uuid"
      },
      "deliveryWarehouseId": {
        "type": "string",
        "format": "uuid"
      },
      "expectedDeliveryDate": {
        "type": "string",
        "format": "date",
        "nullable": true
      },
      "notes": {
        "type": "string",
        "nullable": true
      },
      "lines": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.UseCases.PurchaseOrderLines.Commands.SavePurchaseOrderLineInput"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.PurchaseReceiptLines.Commands.ReceivePurchaseLineInput": {
    "type": "object",
    "properties": {
      "purchaseOrderLineId": {
        "type": "string",
        "format": "uuid"
      },
      "receivedQuantity": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.PurchaseReceipts.Commands.ReceivePurchaseCommand": {
    "type": "object",
    "properties": {
      "supplierDeliveryNote": {
        "type": "string",
        "nullable": true
      },
      "lines": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.UseCases.PurchaseReceiptLines.Commands.ReceivePurchaseLineInput"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.PurchaseRequestLines.Commands.SavePurchaseRequestLineInput": {
    "type": "object",
    "properties": {
      "supplyId": {
        "type": "string",
        "format": "uuid"
      },
      "requestedQuantity": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.PurchaseRequests.Commands.CreatePurchaseRequestCommand": {
    "type": "object",
    "properties": {
      "agencyId": {
        "type": "string",
        "format": "uuid"
      },
      "reason": {
        "type": "string",
        "nullable": true
      },
      "lines": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/LogiERP.Application.UseCases.PurchaseRequestLines.Commands.SavePurchaseRequestLineInput"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Quotations.Commands.CreateQuotationCommand": {
    "type": "object",
    "properties": {
      "orderId": {
        "type": "string",
        "format": "uuid"
      },
      "validUntil": {
        "type": "string",
        "format": "date-time"
      },
      "notes": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.ReceiptSeries.Commands.CreateReceiptSeriesCommand": {
    "type": "object",
    "properties": {
      "agencyId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.ReceiptSeries.Commands.UpdateReceiptSeriesCommand": {
    "type": "object",
    "properties": {
      "agencyId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Receipts.Commands.IssueReceiptCommand": {
    "type": "object",
    "properties": {
      "receiptSeriesId": {
        "type": "string",
        "format": "uuid"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Roles.Commands.CreateRoleCommand": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      },
      "permissionIds": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Roles.Commands.UpdateRoleCommand": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      },
      "permissionIds": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Routes.Commands.CreateRouteCommand": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "originAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "destinationAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "expectedDurationMinutes": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Routes.Commands.UpdateRouteCommand": {
    "type": "object",
    "properties": {
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "originAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "destinationAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "expectedDurationMinutes": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.SalePayments.Commands.RecordSalePaymentCommand": {
    "type": "object",
    "properties": {
      "cashSessionId": {
        "type": "string",
        "format": "uuid"
      },
      "paymentMethodCode": {
        "type": "string",
        "nullable": true
      },
      "amount": {
        "type": "number",
        "format": "double"
      },
      "externalReference": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Sales.Commands.CreateSaleCommand": {
    "type": "object",
    "properties": {
      "quotationId": {
        "type": "string",
        "format": "uuid"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Sales.Commands.VoidSaleCommand": {
    "type": "object",
    "properties": {
      "reason": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.SunatInvoices.Commands.PrepareSunatInvoiceCommand": {
    "type": "object",
    "properties": {
      "saleId": {
        "type": "string",
        "format": "uuid"
      },
      "series": {
        "type": "string",
        "nullable": true
      },
      "customerRuc": {
        "type": "string",
        "nullable": true
      },
      "customerName": {
        "type": "string",
        "nullable": true
      },
      "customerAddress": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Suppliers.Commands.CreateSupplierCommand": {
    "type": "object",
    "properties": {
      "taxNumber": {
        "type": "string",
        "nullable": true
      },
      "legalName": {
        "type": "string",
        "nullable": true
      },
      "districtId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "addressLine": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Suppliers.Commands.UpdateSupplierCommand": {
    "type": "object",
    "properties": {
      "taxNumber": {
        "type": "string",
        "nullable": true
      },
      "legalName": {
        "type": "string",
        "nullable": true
      },
      "districtId": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "addressLine": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Supplies.Commands.CreateSupplyCommand": {
    "type": "object",
    "properties": {
      "sku": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "unitCode": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Supplies.Commands.UpdateSupplyCommand": {
    "type": "object",
    "properties": {
      "sku": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "unitCode": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.TariffRules.Commands.CreateTariffRuleCommand": {
    "type": "object",
    "properties": {
      "serviceTypeCode": {
        "type": "string",
        "nullable": true
      },
      "originAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "destinationAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "validFrom": {
        "type": "string",
        "format": "date"
      },
      "validTo": {
        "type": "string",
        "format": "date",
        "nullable": true
      },
      "baseAmount": {
        "type": "number",
        "format": "double"
      },
      "includedWeightKg": {
        "type": "number",
        "format": "double"
      },
      "extraKgAmount": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.TariffRules.Commands.UpdateTariffRuleCommand": {
    "type": "object",
    "properties": {
      "serviceTypeCode": {
        "type": "string",
        "nullable": true
      },
      "originAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "destinationAgencyId": {
        "type": "string",
        "format": "uuid"
      },
      "validFrom": {
        "type": "string",
        "format": "date"
      },
      "validTo": {
        "type": "string",
        "format": "date",
        "nullable": true
      },
      "baseAmount": {
        "type": "number",
        "format": "double"
      },
      "includedWeightKg": {
        "type": "number",
        "format": "double"
      },
      "extraKgAmount": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.TripOrders.Commands.UnassignTripOrderCommand": {
    "type": "object",
    "properties": {
      "reason": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Trips.Commands.ArriveTripCommand": {
    "type": "object",
    "properties": {
      "locationId": {
        "type": "string",
        "format": "uuid"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Trips.Commands.CancelTripCommand": {
    "type": "object",
    "properties": {
      "reason": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Trips.Commands.CreateTripCommand": {
    "type": "object",
    "properties": {
      "routeId": {
        "type": "string",
        "format": "uuid"
      },
      "vehicleId": {
        "type": "string",
        "format": "uuid"
      },
      "driverId": {
        "type": "string",
        "format": "uuid"
      },
      "scheduledDeparture": {
        "type": "string",
        "format": "date-time"
      },
      "scheduledArrival": {
        "type": "string",
        "format": "date-time"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.UserAgencies.Commands.UserAgencyInput": {
    "type": "object",
    "properties": {
      "userId": {
        "type": "string",
        "format": "uuid"
      },
      "isManager": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Users.Commands.AssignUserRolesCommand": {
    "type": "object",
    "properties": {
      "roleIds": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Users.Commands.ChangePasswordCommand": {
    "type": "object",
    "properties": {
      "currentPassword": {
        "type": "string",
        "nullable": true
      },
      "newPassword": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Users.Commands.CreateUserCommand": {
    "type": "object",
    "properties": {
      "fullName": {
        "type": "string",
        "nullable": true
      },
      "documentTypeCode": {
        "type": "string",
        "nullable": true
      },
      "documentNumber": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      },
      "password": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "roleIds": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Users.Commands.UpdateUserCommand": {
    "type": "object",
    "properties": {
      "fullName": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      },
      "phone": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Vehicles.Commands.CreateVehicleCommand": {
    "type": "object",
    "properties": {
      "plate": {
        "type": "string",
        "nullable": true
      },
      "vehicleTypeCode": {
        "type": "string",
        "nullable": true
      },
      "capacityKg": {
        "type": "number",
        "format": "double"
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Vehicles.Commands.UpdateVehicleCommand": {
    "type": "object",
    "properties": {
      "plate": {
        "type": "string",
        "nullable": true
      },
      "vehicleTypeCode": {
        "type": "string",
        "nullable": true
      },
      "capacityKg": {
        "type": "number",
        "format": "double"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.WarehouseLocations.Commands.CreateWarehouseLocationCommand": {
    "type": "object",
    "properties": {
      "warehouseId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.WarehouseLocations.Commands.UpdateWarehouseLocationCommand": {
    "type": "object",
    "properties": {
      "warehouseId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Warehouses.Commands.CreateWarehouseCommand": {
    "type": "object",
    "properties": {
      "agencyId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "isActive": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "LogiERP.Application.UseCases.Warehouses.Commands.UpdateWarehouseCommand": {
    "type": "object",
    "properties": {
      "agencyId": {
        "type": "string",
        "format": "uuid"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  }
};
