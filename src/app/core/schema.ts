import { Schema, Data } from './contracts';
import { SCHEMAS } from '../data/api-contract';

export function resolve(schema: Schema): Schema {
  if (schema.$ref) return resolve(SCHEMAS[schema.$ref.split('/').pop()!] ?? {});
  if (schema.allOf?.length) return { ...resolve(schema.allOf[0]), ...schema, allOf: undefined };
  return schema;
}
export function initial(schema: Schema, name = ''): any {
  const s = resolve(schema);
  if (s.default !== undefined) return s.default;
  if (s.type === 'object')
    return Object.fromEntries(
      Object.entries(s.properties ?? {}).map(([key, value]) => [key, initial(value, key)]),
    );
  if (s.type === 'array') return [];
  if (s.type === 'boolean') return name === 'isActive';
  if (name.toLowerCase() === 'page') return 1;
  if (name.toLowerCase() === 'pagesize') return 20;
  return '';
}
// Only send contract fields; never echo response-only fields back to the API.
export function payload(schema: Schema, value: any): any {
  const s = resolve(schema);
  if (s.type === 'object')
    return Object.fromEntries(
      Object.entries(s.properties ?? {}).map(([key, child]) => [key, payload(child, value?.[key])]),
    );
  if (s.type === 'array') return (value ?? []).map((entry: any) => payload(s.items ?? {}, entry));
  if (s.type === 'boolean') return Boolean(value);
  if (value === '' || value === undefined || value === null)
    return s.nullable ? null : s.type === 'string' ? '' : undefined;
  if (s.type === 'number' || s.type === 'integer') return Number(value);
  if (s.format === 'date-time') {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) throw new Error('Fecha y hora inválidas.');
    return date.toISOString();
  }
  return value;
}
export function populate(schema: Schema, value: any): any {
  const s = resolve(schema);
  if (s.type === 'object')
    return Object.fromEntries(
      Object.entries(s.properties ?? {}).map(([key, child]) => [
        key,
        populate(child, value?.[key]),
      ]),
    );
  if (s.type === 'array')
    return (Array.isArray(value) ? value : []).map((entry) => populate(s.items ?? {}, entry));
  if (value === undefined || value === null) return initial(schema);
  if (s.format === 'date-time') {
    const d = new Date(value);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }
  return value;
}
const labels: Record<string, string> = {
  id: 'Identificador',
  orderId: 'Pedido',
  agencyId: 'Agencia',
  originAgencyId: 'Agencia de origen',
  destinationAgencyId: 'Agencia de destino',
  fullName: 'Nombre completo',
  email: 'Correo',
  password: 'Contraseña',
  currentPassword: 'Contraseña actual',
  newPassword: 'Contraseña nueva',
  code: 'Código',
  name: 'Nombre',
  description: 'Descripción',
  notes: 'Observaciones',
  isActive: 'Activo',
  reason: 'Motivo',
  page: 'Página',
  pageSize: 'Resultados por página',
  search: 'Buscar',
  status: 'Estado',
  statusCode: 'Estado',
  roleIds: 'Roles',
  permissionIds: 'Permisos',
  documentTypeCode: 'Tipo de documento',
  documentNumber: 'Número de documento',
  phone: 'Teléfono',
  addressLine: 'Dirección',
  districtId: 'Distrito',
  parentId: 'Departamento o provincia',
  warehouseId: 'Almacén',
  locationId: 'Ubicación',
  fromLocationId: 'Ubicación de origen',
  toLocationId: 'Ubicación de destino',
  serviceTypeCode: 'Servicio',
  packageTypeCode: 'Tipo de paquete',
  packages: 'Paquetes',
  sender: 'Remitente',
  recipient: 'Destinatario',
  weightKg: 'Peso (kg)',
  declaredValue: 'Valor declarado (PEN)',
  widthCm: 'Ancho (cm)',
  heightCm: 'Alto (cm)',
  lengthCm: 'Largo (cm)',
  vehicleId: 'Vehículo',
  driverId: 'Conductor',
  routeId: 'Ruta',
  plate: 'Placa',
  licenseNumber: 'Licencia',
  vehicleTypeCode: 'Tipo de vehículo',
  capacityKg: 'Capacidad (kg)',
  scheduledDeparture: 'Salida prevista',
  scheduledArrival: 'Llegada prevista',
  scheduledFor: 'Entrega programada',
  outcomeCode: 'Resultado del intento',
  receiverName: 'Nombre de quien recibe',
  evidenceReference: 'Referencia de evidencia',
  openingHours: 'Horarios',
  users: 'Responsables',
  userId: 'Usuario',
  isManager: 'Responsable principal',
  weekday: 'Día (1–7)',
  opensAt: 'Hora de apertura',
  closesAt: 'Hora de cierre',
  cashRegisterId: 'Caja',
  cashSessionId: 'Sesión de caja',
  openingCashAmount: 'Efectivo inicial (PEN)',
  countedClosingCash: 'Efectivo contado (PEN)',
  closingNotes: 'Observaciones del cierre',
  amount: 'Importe (PEN)',
  paymentMethodCode: 'Medio de pago',
  conceptCode: 'Concepto',
  externalReference: 'Referencia externa',
  quotationId: 'Cotización',
  receiptSeriesId: 'Serie',
  validFrom: 'Vigente desde',
  validTo: 'Vigente hasta',
  validUntil: 'Vencimiento',
  baseAmount: 'Importe base (PEN)',
  includedWeightKg: 'Peso incluido (kg)',
  extraKgAmount: 'Importe por kg adicional (PEN)',
  supplierId: 'Proveedor',
  supplyId: 'Suministro',
  taxNumber: 'RUC',
  legalName: 'Razón social',
  tradeName: 'Nombre comercial',
  sku: 'SKU',
  unitCode: 'Unidad',
  lines: 'Líneas',
  requestedQuantity: 'Cantidad solicitada',
  orderedQuantity: 'Cantidad comprada',
  receivedQuantity: 'Cantidad recibida',
  unitCost: 'Costo unitario',
  purchaseOrderLineId: 'Línea de compra',
  purchaseRequestLineId: 'Línea de solicitud',
  allocatedQuantity: 'Cantidad asignada',
  deliveryWarehouseId: 'Almacén de entrega',
  supplierDeliveryNote: 'Guía del proveedor',
  expectedDeliveryDate: 'Fecha prevista',
  from: 'Desde',
  to: 'Hasta (exclusivo)',
  pendingOnly: 'Solo con saldo pendiente',
  trackingNumber: 'Guía',
  catalog: 'Catálogo',
  level: 'Nivel geográfico',
  registeredOrders: 'Pedidos registrados',
  pendingDeliveries: 'Entregas pendientes',
  totalAmount: 'Importe total',
  paidAmount: 'Cobrado',
  pendingAmount: 'Pendiente',
  ordersByStatus: 'Pedidos por estado',
};
export function label(name: string): string {
  return (
    labels[name] ??
    labels[name.charAt(0).toLowerCase() + name.slice(1)] ??
    name.replace(/([A-Z])/g, ' $1').replace(/^./, (text) => text.toUpperCase())
  );
}
