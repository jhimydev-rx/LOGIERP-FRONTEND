import { DistrictPicker } from './district-picker';
import { ReferencePicker } from './reference-picker';
import { display } from '../core/display';
import { AgencyPicker } from './agency-picker';
import { Component, Input, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Schema, Data } from '../core/contracts';
import { initial, label, resolve } from '../core/schema';
import { Api } from '../core/api';
import { OrderPicker } from './order-picker';
import { RolePicker } from './role-picker';
import { PermissionPicker } from './permission-picker';

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [DistrictPicker, ReferencePicker, FormsModule, PermissionPicker, RolePicker, OrderPicker, AgencyPicker],
  template: `
    @for (key of keys(); track key) {
      @let s = schemaFor(key);
      @if (key === 'permissionIds') {
        <app-permission-picker [value]="model[key] || []" (valueChange)="setValue(key, $event)" />
      } @else if (key === 'roleIds') {
        <app-role-picker [value]="model[key] || []" (valueChange)="setValue(key, $event)" />
       } @else if (['agencyid', 'originagencyid', 'destinationagencyid'].includes(key.toLowerCase())) {
        <app-agency-picker [label]="label(key)" [value]="model[key] || ''" (valueChange)="setValue(key, $event)" />
      } @else if ((key.toLowerCase() === 'orderid' || (key.toLowerCase() === 'id' && resource === 'orders'))) {
        <app-order-picker [value]="model[key] || ''" (valueChange)="setValue(key, $event)" />
      } @else if (key.toLowerCase() === 'districtid') {
        <app-district-picker [value]="model[key] || ''" (valueChange)="setValue(key, $event)" />
      } @else if (s.type !== 'array' && lookupFor(key) && key !== 'quotationId') {
        <app-reference-picker [route]="lookupFor(key)" [label]="label(key)" [code]="key.endsWith('Code')" [value]="model[key] || ''" (valueChange)="setValue(key, $event)" />
      } @else if (s.type === 'object') {
        <fieldset>
          <legend>{{ label(key) }}</legend>
          <app-fields
            [schema]="s"
            [model]="model[key]"
            [prefix]="prefix + '-' + key"
            [context]="context"
          />
        </fieldset>
      } @else if (s.type === 'array') {
        <fieldset>
          <legend>{{ label(key) }}</legend>
          @for (entry of model[key]; track itemKey(entry, $index); let i = $index) {
            <fieldset>
              <legend>{{ label(key) }} {{ i + 1 }}</legend>
              @if (resolve(s.items || {}).type === 'object') {
                <app-fields
                  [schema]="s.items || {}"
                  [model]="entry"
                  [prefix]="prefix + '-' + key + '-' + i"
                  [context]="context"
                />
              } @else {
                <label [for]="prefix + key + i">{{ label(key) }} {{ i + 1 }}</label>
                <input
                  [id]="prefix + key + i"
                  [value]="model[key][i]"
                  (input)="setItem(key, i, $any($event.target).value)"
                  [attr.list]="prefix + key + '-options'"
                />
              }
              <button type="button" (click)="model[key].splice(i, 1)">
                Quitar {{ label(key) }}
              </button>
            </fieldset>
          }
          <button type="button" (click)="model[key].push(initial(s.items || {}))">
            Añadir {{ label(key) }}
          </button>
          @if (lookupFor(key)) {
            <button type="button" (click)="load(key)">Cargar opciones</button>
          }
          <datalist [id]="prefix + key + '-options'">
            @for (option of options()[key] || []; track option.value) {
              <option [value]="option.value">{{ option.text }}</option>
            }
          </datalist>
        </fieldset>
      } @else {
        <div class="field">
          <label [for]="prefix + '-' + key">{{ label(key) }}</label>
          @if (s.type === 'boolean') {
            <input
              type="checkbox"
              [id]="prefix + '-' + key"
              [checked]="model[key]"
              (change)="setValue(key, $any($event.target).checked)"
            />
          } @else if (choices(key).length) {
            <select
              [id]="prefix + '-' + key"
              [value]="model[key] ?? ''"
              (input)="setValue(key, $any($event.target).value)"
            >
              <option value="">Seleccionar</option>
              @for (choice of choices(key); track choice) {
                <option [value]="choice">{{ display(choice) }}</option>
              }
            </select>
          } @else {
            @if (!lookupFor(key)) {
            <input
              [id]="prefix + '-' + key"
              [type]="inputType(key, s)"
              [step]="s.type === 'integer' ? '1' : 'any'"
              [value]="model[key] ?? ''"
              (input)="setValue(key, $any($event.target).value)"
              [attr.list]="prefix + '-' + key + '-options'"
              [autocomplete]="key.toLowerCase().includes('password') ? 'new-password' : 'off'"
            />
            }
            @if (lookupFor(key)) {
              <button type="button" (click)="load(key)">Buscar opciones</button>
              @if (key === 'quotationId' && quotationOrders().length) {
                <label>Pedido de la cotización
                  <select (change)="loadQuotations(key, $any($event.target).value)">
                    <option value="">Elegir pedido por seguimiento</option>
                    @for (order of quotationOrders(); track order['id']) {
                      <option [value]="order['id']">{{ order['trackingNumber'] || order['id'] }}</option>
                    }
                  </select>
                </label>
              }
              @if ((options()[key] || []).length) {
                <label>Buscar {{ label(key) }}
                  <input type="search" (input)="searches[key] = $any($event.target).value" />
                </label>
                <select
                  [attr.aria-label]="'Seleccionar ' + label(key)"
                  [value]="model[key] || ''"
                  (change)="setValue(key, $any($event.target).value)"
                >
                  <option value="">Elegir un registro</option>
                  @for (option of filteredOptions(key); track option.value) {
                    <option [value]="option.value">{{ option.text }}</option>
                  }
                </select>
              }
            }
            <datalist [id]="prefix + '-' + key + '-options'">
              @for (option of options()[key] || []; track option.value) {
                <option [value]="option.value">{{ option.text }}</option>
              }
            </datalist>
          }
        </div>
      }
    }
    @if (notice()) {
      <p role="status">{{ notice() }}</p>
    }
  `,
})
export class Fields {
  @Input({ required: true }) schema!: Schema;
  @Input({ required: true }) model!: Data;
  @Input() prefix = 'field';
  @Input() context = '';
  @Input() resource = '';
  api = inject(Api);
  options = signal<Record<string, { value: string; text: string }[]>>({});
  notice = signal('');
  quotationOrders = signal<Data[]>([]);
  searches: Record<string, string> = {};
  filteredOptions(key: string) {
    const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const query = normalize(this.searches[key] || '');
    return (this.options()[key] || []).filter(option => option.value === this.model[key] || normalize(option.text).includes(query));
  }
  label = (key: string) =>
    key === 'id' && this.resource
      ? this.resource === 'sales'
        ? 'Venta'
        : 'Sesión de caja'
      : label(key);
  display = display;
  resolve = resolve;
  initial = initial;
  itemKey(entry: any, index: number) {
    return entry !== null && typeof entry === 'object' ? entry : index;
  }
  setValue(key: string, value: any) {
    this.model[key] = value;
  }
  setItem(key: string, index: number, value: any) {
    this.model[key][index] = value;
  }
  keys() {
    return Object.keys(resolve(this.schema).properties ?? {}).filter(key => !(key === 'id' && this.prefix.includes('packages')));
  }
  schemaFor(key: string) {
    return resolve(resolve(this.schema).properties?.[key] ?? {});
  }
  inputType(key: string, s: Schema) {
    if (key.toLowerCase().includes('password')) return 'password';
    if (s.type === 'number' || s.type === 'integer') return 'number';
    if (s.format === 'date-time') return 'datetime-local';
    if (s.format === 'date') return 'date';
    if (s.format === 'time' || ['opensAt', 'closesAt'].includes(key)) return 'time';
    return key === 'email' ? 'email' : 'text';
  }
  choices(key: string): string[] {
    const common: Record<string, string[]> = {
      documentTypeCode: ['DNI', 'CE', 'PASSPORT', 'RUC'],
      paymentMethodCode: ['CASH', 'CARD', 'TRANSFER', 'WALLET'],
      conceptCode: [
        'OTHER_INCOME',
        'OPERATING_EXPENSE',
        'SUPPLIER_PAYMENT',
        'CORRECTION_IN',
        'CORRECTION_OUT',
      ],
      outcomeCode: ['ABSENT', 'REJECTED', 'BAD_ADDRESS', 'OTHER'],
      catalog: [
        'document-types',
        'service-types',
        'package-types',
        'units-of-measure',
        'vehicle-types',
        'modules',
        'payment-methods',
        'order-statuses',
      ],
      level: ['departments', 'provinces', 'districts'],
      status: [
        'DRAFT',
        'REGISTERED',
        'RECEIVED',
        'IN_TRANSIT',
        'AT_AGENCY',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'CANCELLED',
      ],
    };
    if (key === 'statusCode')
      return this.context.includes('solicitudes')
        ? ['SUBMITTED', 'APPROVED', 'REJECTED', 'CANCELLED']
        : ['ISSUED', 'CANCELLED'];
    return common[key] ?? this.schemaFor(key).enum ?? [];
  }
  lookupFor(key: string): string {
    key = key.charAt(0).toLowerCase() + key.slice(1);
    if (key === 'id' && this.resource) return this.resource;
    const routes: Record<string, string> = {
      saleId: 'sales',
      agencyId: 'agencies',
      originAgencyId: 'agencies',
      destinationAgencyId: 'agencies',
      warehouseId: 'warehouses',
      deliveryWarehouseId: 'warehouses',
      locationId: 'warehouse-locations',
      fromLocationId: 'warehouse-locations',
      toLocationId: 'warehouse-locations',
      vehicleId: 'vehicles',
      driverId: 'drivers',
      routeId: 'routes',
      orderId: 'orders',
      quotationId: 'quotations',
      cashRegisterId: 'cash-registers',
      cashSessionId: 'cash-sessions',
      supplierId: 'suppliers',
      supplyId: 'supplies',
      roleIds: 'roles',
      permissionIds: 'permissions',
      userId: 'users',
      receiptSeriesId: 'receipt-series',
      serviceTypeCode: 'configuration/catalogs/service-types',
      packageTypeCode: 'configuration/catalogs/package-types',
      unitCode: 'configuration/catalogs/units-of-measure',
      vehicleTypeCode: 'configuration/catalogs/vehicle-types',
      districtId: 'configuration/geography/districts',
    };
    return routes[key] ?? '';
  }
  async loadQuotations(key: string, orderId: string) {
    this.options.update(current => ({ ...current, [key]: [] }));
    this.model[key] = '';
    if (!orderId) return;
    this.notice.set('Cargando cotizaciones…');
    try {
      const rows = await this.api.request<Data[]>('GET', '/api/quotations/orders/' + encodeURIComponent(orderId));
      this.options.update(current => ({ ...current, [key]: rows.map(row => ({ value: String(row['id']), text: 'S/ ' + row['quotedAmount'] + ' · ' + (row['quotedAt'] ? new Date(row['quotedAt']).toLocaleString('es-PE') : row['id']) })) }));
      this.notice.set(rows.length ? 'Selecciona la cotización del pedido.' : 'Este pedido no tiene cotizaciones.');
    } catch { this.notice.set('No se pudieron cargar las cotizaciones del pedido.'); }
  }
  async load(key: string) {
    let route = this.lookupFor(key);
    this.notice.set('Cargando opciones…');
    if (key === 'quotationId') {
      try {
        this.quotationOrders.set(await this.api.request<Data[]>('GET', '/api/orders', undefined, { page: 1, pageSize: 100 }));
        this.notice.set('Elige un pedido para ver sus cotizaciones (hasta 100 pedidos).');
      } catch { this.notice.set('No se pudieron consultar los pedidos. Revisa tus permisos e intenta nuevamente.'); }
      return;
    }
    try {
      const rows = await this.api.request<Data[]>('GET', '/api/' + route, undefined, {
        page: 1,
        pageSize: 100,
      });
      this.options.update((current) => ({
        ...current,
        [key]: rows.map((row) => ({
          value: String(key.endsWith('Code') ? row['code'] : row['id']),
          text: [
            row['name'] ??
              row['fullName'] ??
              row['legalName'] ??
              row['trackingNumber'] ??
              row['saleNumber'] ??
              row['orderNumber'] ??
              row['plate'] ??
              row['code'] ??
              row['quotedAmount'] ??
              (row['totalAmount'] !== undefined
                ? 'Venta · S/ ' + row['totalAmount'] + ' · ' + row['id'].slice(0, 8)
                : undefined) ??
              row['openedAt'] ??
              row['id'],
            row['action'],
          ]
            .filter(Boolean)
            .join(' · '),
        })),
      }));
      this.notice.set(
        `${rows.length} opciones cargadas (hasta 100). Selecciona un registro por su nombre.`,
      );
    } catch {
      this.notice.set(
        'No se pudieron cargar opciones para tu cuenta. Reintenta la carga de opciones.',
      );
    }
  }
}
