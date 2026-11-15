import { display } from '../core/display';
import { ReferenceName } from '../shared/reference-name';
import { GeographyFilter } from '../shared/geography-filter';
import { HttpErrorResponse } from '@angular/common/http';
import { WarehouseName } from '../shared/warehouse-name';
import { Component, inject, signal, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Api, Session, errorText } from '../core/api';
import { Data, Operation, Schema, Access } from '../core/contracts';
import { MODULES, OPERATIONS } from '../data/api-contract';
import { permissionModules, permissionActions } from '../core/permission-labels';
import { WORKSPACES } from '../data/workspaces';
import { initial, payload, populate, label, resolve } from '../core/schema';
import { Fields } from '../shared/fields';
import { TransportName } from '../shared/transport-name';
import { AgencyName } from '../shared/agency-name';
import { Result } from '../shared/result';

@Component({
  standalone: true,
  imports: [ReferenceName, GeographyFilter, FormsModule, Fields, Result, AgencyName, TransportName, WarehouseName],
  template: `
    <div class="workspace-heading workspace-heading-actions">
      <div class="module-heading-copy">
        <img class="module-illustration" [src]="'illustrations/' + profile().illustration + '.svg'" alt="" width="110" height="75" />
        <div>
        <span class="eyebrow">GESTIÓN DE OPERACIONES</span>
        <h1>{{ title }}</h1>
        <p>{{ profile().intro }}</p>
        </div>
      </div>
      @if (createOperation(); as create) {
        <button type="button" class="primary" [disabled]="busy()" (click)="choose(create)">
          {{ module === 'configuracion' ? operationTitle(create) : '+ ' + (profile().create || create.title) }}
        </button>
      }
    </div>
    <div class="module-layout" [class.with-operation-menu]="operations().length > 0">
    @if (operations().length) {
      <nav class="module-operations" aria-label="Operaciones">
        <div class="operation-menu-heading">
          <span class="eyebrow">EN ESTE MÓDULO</span>
          <h2>¿Qué deseas hacer?</h2>
          <p>Elige una opción para trabajar en el área central.</p>
        </div>
        <button type="button" class="mobile-operation-toggle" [attr.aria-expanded]="operationMenuOpen()" (click)="operationMenuOpen.set(!operationMenuOpen())">
          {{ operationMenuOpen() ? 'Ocultar opciones' : 'Elegir sección o acción' }}
        </button>
        <div class="operation-menu-sections" [class.expanded]="operationMenuOpen()">
        @for (group of operationGroups(); track group.title) {
          @if (group.items.length) {
            <div class="operation-group" role="group" [attr.aria-label]="group.title">
              <span class="operation-group-label">{{ group.title }}</span>
              <div class="operation-group-buttons">
                @for (op of group.items; track op.key) {
                  <button type="button" [disabled]="busy() || actionBlocked(op)"
                    [attr.aria-pressed]="operation()?.key === op.key || (!operation() && listOperation()?.key === op.key)"
                    (click)="choose(op)">{{ operationTitle(op) }}</button>
                }
              </div>
            </div>
          }
        }
        </div>
      </nav>
    }
    <div class="module-content">
    @if (module === 'sunat') {
      <div class="beta-note">
        <span class="beta-badge">BETA</span
        ><span
          >Comprobantes de prueba, sin validez tributaria. La aceptación depende de la respuesta del
          servicio.</span
        >
      </div>
    }
    @if (profile().steps; as steps) {
      <ol class="workflow-steps" aria-label="Etapas del proceso">
        @for (step of steps; track step; let i = $index) {
          <li>
            <span>{{ i + 1 }}</span
            >{{ step }}
          </li>
        }
      </ol>
    }
    @if (error()) {
      <p role="alert">{{ error() }}</p>
    }
    @if (message()) {
      <p class="success-message" role="status">{{ message() }}</p>
    }

    <div class="module-browse" [hidden]="!!operation()">
    @if (module === 'configuracion' && loaded() && !objectRecord() && !listError()) {
      <div class="notice">
        <h2>Configura los datos de tu empresa</h2>
        <p>Esta ficha se registra una sola vez. Después podrás editarla cuando cambien los datos.</p>
      </div>
    }
    @if (listOperation(); as list) {
      <div class="records-toolbar">
        <h2>
          {{
            module === 'sesiones-caja' && selected() ? 'Historial de sesiones' : profile().records
          }}
        </h2>
        <div class="records-tools">
          @if (module === 'sesiones-caja' && selected()) {
            <button
              type="button"
              [attr.aria-expanded]="showCashHistory()"
              (click)="showCashHistory.set(!showCashHistory())"
            >
              {{ showCashHistory() ? 'Ocultar historial' : 'Cambiar sesión' }}
            </button>
          }
          @if (filterKeys().length) {
            <button
              type="button"
              [attr.aria-expanded]="showFilters()"
              (click)="showFilters.set(!showFilters())"
            >
              {{ contextRequired() ? (module === 'catalogos' ? 'Elegir catálogo' : module === 'geografia' ? 'Elegir nivel' : 'Elegir pedido') : 'Filtros' }}
            </button>
          }
          <button
            type="button"
            [disabled]="loading() || busy() || !canLoad()"
            (click)="loadRecords()"
          >
            {{ loading() ? 'Actualizando…' : 'Actualizar' }}
          </button>
        </div>
      </div>
      @if (filterKeys().length && (showFilters() || (contextRequired() && !loaded()))) {
        <form class="work-form records-filter" (ngSubmit)="applyFilters()">
          <fieldset [disabled]="loading() || busy()">
            @if (module === 'geografia') {
              <app-geography-filter [model]="filters" />
            } @else {
            <app-fields
              [schema]="filterSchema"
              [model]="filters"
              prefix="filter"
              [context]="module"
            />
            }
            <button type="submit">
              {{ contextRequired() ? (module === 'catalogos' || module === 'geografia' ? 'Consultar' : 'Consultar pedido') : 'Aplicar filtros' }}
            </button>
            @if (module === 'rutas') {
              <button type="button" (click)="resetRouteFilters()">Limpiar filtros</button>
            }
          </fieldset>
        </form>
      }
      @if (listError()) {
        <p role="alert">{{ listError() }}</p>
      }
      @if (loading() && !loaded()) {
        <p class="loading-line" role="status">Cargando {{ profile().records.toLowerCase() }}…</p>
      }
      @if (loaded() && !listError()) {
        @if (module === 'permisos') {
          <label class="permission-search">Buscar módulo o acción
            <input type="search" [ngModel]="permissionSearch()" (ngModelChange)="permissionSearch.set($event)" />
          </label>
          @for (group of permissionGroups(); track group.code) {
            <section class="permission-catalog-group" [attr.aria-label]="group.name">
              <h3>{{ group.name }} <small>{{ group.code }} · {{ group.items.length }} permisos</small></h3>
              <div class="table-scroll">
                <table>
                  <thead><tr><th scope="col">Acción</th><th scope="col">Código del permiso</th></tr></thead>
                  <tbody>
                    @for (permission of group.items; track permission['id']) {
                      <tr><td>{{ permissionAction(permission) }}</td><td><code>{{ group.code }}:{{ permission['action'] }}</code></td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </section>
          } @empty {
            <p role="status">No hay permisos que coincidan con la búsqueda.</p>
          }
        } @else if (rows().length) {
          <div
            class="table-scroll records-table"
            [hidden]="module === 'sesiones-caja' && selected() && !showCashHistory()"
            [attr.aria-busy]="loading()"
          >
            <table>
              <thead>
                <tr>
                  @for (column of columns(); track column) {
                    <th scope="col">{{ column === '_state' ? 'Estado' : label(column) }}</th>
                  }
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                @for (row of rows(); track row['id'] || $index) {
                  <tr [class.selected-row]="selected()?.['id'] && selected()?.['id'] === row['id']">
                    @for (column of columns(); track column) {
                      <td>
                        @if (['agencyId', 'originAgencyId', 'destinationAgencyId'].includes(column)) {
                          <app-agency-name [id]="row[column]" />
                        } @else if (['vehicleId', 'driverId', 'routeId'].includes(column)) {
                          <app-transport-name [id]="row[column]" [field]="column" />
                        } @else if (['warehouseId', 'locationId', 'fromLocationId', 'toLocationId'].includes(column)) {
                          <app-warehouse-name [id]="row[column]" [field]="column" />
                        } @else if (['orderId', 'userId', 'requestedBy', 'supplyId'].includes(column)) {
                          <app-reference-name [id]="row[column]" [field]="column" />
                        } @else if (isStatus(column)) {
                          <span
                            class="record-status"
                            [class.status-muted]="isInactive(row, column)"
                            >{{ cell(row, column) }}</span
                          >
                        } @else {
                          {{ cell(row, column) }}
                        }
                      </td>
                    }
                    <td>
                      <button type="button" [disabled]="busy()" (click)="selectRecord(row)">
                        {{ module === 'sesiones-caja' ? 'Ver sesión' : 'Ver registro' }}
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        } @else if (objectRecord()) {
          <section class="object-overview"><app-result [value]="objectRecord()" /></section>
        } @else if (module !== 'configuracion') {
          <div class="empty-state">
            <img class="empty-illustration" [src]="'illustrations/' + profile().illustration + '.svg'" alt="" width="132" height="90" loading="lazy" />
            <h3>{{ emptyTitle() }}</h3>
            <p>
              {{
                contextRequired()
                  ? (module === 'catalogos' || module === 'geografia' ? 'No hay registros para esta consulta.' : 'Este pedido no tiene registros para esta consulta.')
                  : 'No se encontraron registros con los filtros actuales.'
              }}
            </p>
            @if (createOperation(); as create) {
              <button type="button" (click)="choose(create)">
                {{ profile().create || create.title }}
              </button>
            }
          </div>
        }
        @if (hasPagination() && (module !== 'sesiones-caja' || !selected() || showCashHistory())) {
          <div class="pagination">
            <span>Página {{ page }} · {{ rows().length }} registros en esta página</span>
            <div>
              <button
                type="button"
                [disabled]="page <= 1 || loading() || busy()"
                (click)="changePage(-1)"
              >
                Anterior</button
              ><button
                type="button"
                [disabled]="(module === 'rutas' ? page * pageSize >= routeTotal : rows().length < pageSize) || loading() || busy()"
                (click)="changePage(1)"
              >
                Siguiente
              </button>
            </div>
          </div>
        }
      }
    } @else {
      <div class="notice">
        {{
          operations().length
            ? 'Tu cuenta puede realizar las acciones habilitadas, pero no consultar el listado de este módulo.'
            : 'No tienes acceso a este módulo.'
        }}
      </div>
    }

    @if (selected(); as record) {
      <section
        class="record-workspace"
        #recordPanel
        tabindex="-1"
        aria-label="Registro seleccionado"
      >
        <div class="record-heading">
          <div>
            <span class="eyebrow">{{
              module === 'sesiones-caja' ? 'SESIÓN SELECCIONADA' : 'REGISTRO SELECCIONADO'
            }}</span>
            <h2>{{ recordName(record) }}</h2>
          </div>
          <button type="button" (click)="clearSelection()" [disabled]="busy()">
            Cerrar detalle
          </button>
        </div>
        @if (detailLoading()) {
          <p role="status">Actualizando detalle…</p>
        }
        @if (module === 'sesiones-caja') {
          <p class="session-state">
            <span class="record-status" [class.status-muted]="record['closedAt']">{{
              record['closedAt'] ? 'Sesión cerrada' : 'Sesión abierta'
            }}</span
            ><span>Apertura: {{ date(record['openedAt']) }}</span>
            @if (record['closedAt']) {
              <span>Cierre: {{ date(record['closedAt']) }}</span>
            }
          </p>
          <div class="metrics cash-metrics">
            <div>
              <span>Efectivo inicial</span><strong>{{ money(record['openingCashAmount']) }}</strong>
            </div>
            <div>
              <span>Ingresos en efectivo</span><strong>{{ money(record['cashIn']) }}</strong>
            </div>
            <div>
              <span>Salidas en efectivo</span><strong>{{ money(record['cashOut']) }}</strong>
            </div>
            <div>
              <span>Efectivo esperado</span
              ><strong>{{ money(record['expectedCashAmount']) }}</strong>
            </div>
          </div>
          @if (record['closedAt']) {
            <p class="cash-reconciliation">
              Efectivo contado: <strong>{{ money(record['countedClosingCash']) }}</strong> ·
              Diferencia: <strong>{{ money(record['cashDifference']) }}</strong>
            </p>
          }
        }
        <nav class="record-actions" aria-label="Acciones del registro">
          @for (op of contextualOperations(); track op.key) {
            <button
              type="button"
              [disabled]="busy() || detailLoading() || actionBlocked(op)"
              (click)="choose(op)"
            >
              {{ operationTitle(op) }}
            </button>
          }
        </nav>
        @if (module === 'sesiones-caja') {
          <h3>Movimientos de la sesión</h3>
          @if (record['movements']?.length) {
            <div class="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Concepto</th>
                    <th>Medio de pago</th>
                    <th>Importe</th>
                  </tr>
                </thead>
                <tbody>
                  @for (movement of record['movements']; track movement.id) {
                    <tr>
                      <td>{{ date(movement.occurredAt) }}</td>
                      <td>{{ statusLabel(movement.conceptCode) }}</td>
                      <td>{{ statusLabel(movement.paymentMethodCode) }}</td>
                      <td>{{ money(movement.amount) }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          } @else {
            <p class="muted">No hay movimientos registrados en esta sesión.</p>
          }
          <p class="data-note">
            Otros medios: ingresos {{ money(record['noncashIn']) }} · salidas
            {{ money(record['noncashOut']) }}. No se suman al efectivo esperado.
          </p>
        } @else {
          <details class="full-record">
            <summary>Información completa</summary>
            <app-result [value]="record" />
          </details>
        }
      </section>
    }

    </div>
    @if (operation(); as op) {
      <section class="action-workspace" #actionPanel tabindex="-1" aria-label="Acción en curso">
        <div class="record-heading">
          <div>
            <span class="eyebrow">{{ op.method === 'GET' ? 'CONSULTA' : 'GESTIONAR' }}</span>
            <h2>{{ operationTitle(op) }}</h2>
          </div>
          <button type="button" [disabled]="busy()" (click)="closeAction()">Cancelar acción</button>
        </div>
        @if (selected() && boundToSelection) {
          <p class="action-context">{{ recordName(selected()!) }}</p>
        }
        <form class="work-form" (ngSubmit)="execute()">
          <fieldset [disabled]="busy()">
            <app-fields
              [schema]="visibleParameterSchema"
              [model]="parameters"
              prefix="params"
              [context]="module"
              [resource]="parameterResource()"
            />
            @if (op.body) {
              <app-fields
                [schema]="visibleBodySchema"
                [model]="body"
                prefix="body"
                [context]="module"
              />
            }
            @if (op.download) {
              <p>Descarga el archivo con los datos de la consulta.</p>
            }
            <button type="submit">{{ busy() ? 'Procesando…' : operationTitle(op) }}</button>
          </fieldset>
        </form>
        <p class="form-hint">Las fechas y horas se introducen en tu zona horaria local.</p>
      </section>
    }
    @if (hasResult()) {
      <section class="operation-result">
        <h2>{{ resultTitle() }}</h2>
        <app-result [value]="result()" [selectable]="!operation()?.path?.endsWith('/confirmation')" (selected)="selectResult($event)" />
      </section>
    }
    </div>
    </div>
  `,
})
export class Workspace implements OnDestroy {
  api = inject(Api);
  session = inject(Session);
  router = inject(Router);
  route = inject(ActivatedRoute);
  @ViewChild('actionPanel') actionPanel?: ElementRef<HTMLElement>;
  @ViewChild('recordPanel') recordPanel?: ElementRef<HTMLElement>;
  permissionSearch = signal('');
  operationMenuOpen = signal(false);
  module = '';
  title = '';
  page = 1;
  pageSize = 20;
  operation = signal<Operation | null>(null);
  busy = signal(false);
  selected = signal<Data | null>(null);
  result = signal<any>(null);
  hasResult = signal(false);
  resultTitle = signal('Detalle de la operación');
  error = signal('');
  message = signal('');
  rows = signal<Data[]>([]);
  routeTotal = 0;
  objectRecord = signal<Data | null>(null);
  showCashHistory = signal(false);
  loading = signal(false);
  loaded = signal(false);
  listError = signal('');
  detailLoading = signal(false);
  showFilters = signal(false);
  parameters: Data = {};
  body: Data = {};
  filters: Data = {};
  boundToSelection = false;
  parameterSchema: Schema = { type: 'object', properties: {} };
  visibleParameterSchema: Schema = this.parameterSchema;
  visibleBodySchema: Schema = { type: 'object', properties: {} };
  filterSchema: Schema = { type: 'object', properties: {} };
  private generation = 0;
  private listSequence = 0;
  private detailSequence = 0;
  private selectedResource = '';
  private resultResource = '';
  private subscription: Subscription;
  label = label;
  constructor() {
    this.subscription = this.route.paramMap.subscribe((params) => {
      this.generation++;
      this.listSequence++;
      this.detailSequence++;
      this.module = params.get('module') ?? '';
      this.permissionSearch.set('');
      this.title = MODULES.find((m) => m.id === this.module)?.name ?? 'Módulo';
      this.selected.set(null);
      this.operation.set(null);
      this.hasResult.set(false);
      this.rows.set([]);
      this.objectRecord.set(null);
      this.error.set('');
      this.message.set('');
      this.listError.set('');
      this.loaded.set(false);
      this.loading.set(false);
      this.busy.set(false);
      this.detailLoading.set(false);
      this.selectedResource = '';
      this.page = 1;
      this.showCashHistory.set(false);
      const op = this.listOperation();
      this.filterSchema = {
        type: 'object',
        properties: Object.fromEntries(
          (op ? this.parametersFor(op) : [])
            .filter((p) => !['page', 'pagesize'].includes(p.name.toLowerCase()))
            .map((p) => [p.name, p.schema]),
        ),
      };
      if (this.module === 'rutas') {
        this.filterSchema = {
          type: 'object',
          properties: {
            code: { type: 'string' },
            name: { type: 'string' },
            originAgencyId: { type: 'string' },
            destinationAgencyId: { type: 'string' },
            routeStatus: { type: 'string', enum: ['Activo', 'Inactivo'] },
          },
        };
      }
      this.filters = initial(this.filterSchema);
      if (this.module === 'geografia') this.filters['level'] = 'departments';
      this.showFilters.set(this.contextRequired());
      if (op && this.canLoad()) void this.loadRecords();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.generation++;
    this.listSequence++;
    this.detailSequence++;
  }
  profile() {
    return (
      WORKSPACES[this.module] ?? {
        illustration: 'agency',
        intro: 'Consulta y gestiona tus registros.',
        records: 'Registros',
        columns: [],
      }
    );
  }
  operations() {
    return OPERATIONS.filter(
      (op) =>
        op.module === this.module &&
        op.path !== '/api/auth/login' &&
        this.session.permits(op.permissions),
    );
  }
  permissionAction(row: Data) {
    return permissionActions[row['action']] || row['name'] || row['action'];
  }
  permissionGroups() {
    const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const query = normalize(this.permissionSearch().trim());
    const groups = new Map<string, { code: string; name: string; items: Data[] }>();
    for (const row of this.rows()) {
      const code = row['module'] || 'Sin módulo';
      const name = permissionModules[code] || code;
      if (!normalize(`${name} ${code}:${row['action']} ${this.permissionAction(row)} ${row['name'] || ''}`).includes(query)) continue;
      if (!groups.has(code)) groups.set(code, { code, name, items: [] });
      groups.get(code)!.items.push(row);
    }
    return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, 'es'));
  }
  operationGroups() {
    const operations = this.operations();
    return [
      { title: 'Consultar', items: operations.filter(op => op.method === 'GET' && !op.download) },
      { title: 'Gestionar', items: operations.filter(op => op.method !== 'GET' && !op.download) },
      { title: 'Descargar', items: operations.filter(op => op.download) },
    ];
  }
  parametersFor(op: Operation) {
    const pathNames = new Set(op.parameters.filter(p => p.in === 'path').map(p => p.name.toLowerCase()));
    return op.parameters.filter(p => p.in !== 'query' || !pathNames.has(p.name.toLowerCase()));
  }
  listOperation() {
    const read = this.operations().filter((op) => op.method === 'GET' && !op.download);
    return (
      read.find((op) => !op.path.includes('{')) ??
      (['cotizaciones', 'entregas', 'catalogos', 'geografia'].includes(this.module) ? read[0] : undefined)
    );
  }
  operationTitle(op: Operation) {
    if (op.path === '/api/configuration/company' && op.method === 'PUT') return this.objectRecord() ? 'Editar datos' : 'Configurar empresa';
    return op.title;
  }
  createOperation() {
    if (this.module === 'configuracion') return this.operations().find(op => op.method === 'PUT');
    return this.operations().find(
      (op) =>
        op.method === 'POST' &&
        !op.path.includes('{') &&
        !op.path.startsWith('/api/auth/') &&
        !op.path.endsWith('/allocations'),
    );
  }
  resource(path: string) {
    return path.split('/{')[0];
  }
  contextRequired() {
    return Boolean(this.listOperation()?.parameters.some((p) => p.in === 'path'));
  }
  canLoad() {
    if (this.module === 'geografia') return this.filters['level'] === 'departments' ||
      (['provinces', 'districts'].includes(this.filters['level']) && Boolean(this.filters['parentId']));
    return (
      this.listOperation()
        ?.parameters.filter((p) => p.in === 'path')
        .every((p) => Boolean(this.filters[p.name])) ?? false
    );
  }
  filterKeys() {
    return Object.keys(this.filterSchema.properties ?? {});
  }
  hasPagination() {
    return this.listOperation()?.parameters.some((p) => p.name.toLowerCase() === 'page') ?? false;
  }
  async resetRouteFilters() {
    this.filters = initial(this.filterSchema);
    await this.applyFilters();
  }
  async applyFilters() {
    this.page = 1;
    this.clearSelection();
    await this.loadRecords();
  }
  async changePage(delta: number) {
    this.page = Math.max(1, this.page + delta);
    this.clearSelection();
    await this.loadRecords();
  }
  async loadRecords() {
    const op = this.listOperation();
    if (!op || !this.canLoad()) {
      this.listError.set(this.module === 'catalogos' ? 'Selecciona el catálogo que deseas consultar.' : this.module === 'geografia' ? (this.filters['level'] === 'districts' ? 'Selecciona el departamento y la provincia para consultar sus distritos.' : 'Selecciona un departamento para consultar sus provincias.') : 'Selecciona el pedido que deseas consultar.');
      return;
    }
    const sequence = ++this.listSequence,
      generation = this.generation;
    this.loading.set(true);
    this.listError.set('');
    try {
      let path = op.path;
      const query: Data = {};
      const values = payload(this.filterSchema, this.filters);
      for (const p of this.parametersFor(op)) {
        const key = p.name.toLowerCase();
        const value =
          key === 'page' ? this.page : key === 'pagesize' ? this.pageSize : values[p.name];
        if (p.in === 'path')
          path = path.replace('{' + p.name + '}', encodeURIComponent(String(value)));
        else query[p.name] = value;
      }
      let response: any;
      if (this.module === 'rutas') {
        const routes: Data[] = [];
        for (let page = 1; ; page++) {
          const batch = await this.api.request<Data[]>('GET', path, undefined, { Page: page, PageSize: 100 });
          if (sequence !== this.listSequence || generation !== this.generation) return;
          routes.push(...batch);
          if (batch.length < 100) break;
        }
        const normalize = (value: unknown) => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
        const matches = routes.filter(row =>
          (!values['code'] || normalize(row['code']).includes(normalize(values['code']))) &&
          (!values['name'] || normalize(row['name']).includes(normalize(values['name']))) &&
          (!values['originAgencyId'] || row['originAgencyId'] === values['originAgencyId']) &&
          (!values['destinationAgencyId'] || row['destinationAgencyId'] === values['destinationAgencyId']) &&
          (!values['routeStatus'] || row['isActive'] === (values['routeStatus'] === 'Activo')));
        this.routeTotal = matches.length;
        this.page = Math.min(this.page, Math.max(1, Math.ceil(matches.length / this.pageSize)));
        response = matches.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
      } else {
        response = await this.api.request<any>('GET', path, undefined, query);
      }
      if (sequence !== this.listSequence || generation !== this.generation) return;
      this.rows.set(Array.isArray(response) ? response : []);
      this.objectRecord.set(
        response && !Array.isArray(response) && typeof response === 'object' ? response : null,
      );
      this.loaded.set(true);
      if (this.module === 'sesiones-caja' && !this.selected()) {
        const opened = this.rows().find((row) => !row['closedAt']);
        if (opened) await this.selectRecord(opened, false);
      }
    } catch (error) {
      if (sequence === this.listSequence && generation === this.generation) {
        if (this.module === 'configuracion' && error instanceof HttpErrorResponse && error.status === 404 && errorText(error).includes('Empresa no configurada')) {
          this.loaded.set(true);
          this.listError.set('');
        } else {
          this.listError.set(errorText(error));
        }
        this.rows.set([]);
        this.objectRecord.set(null);
      }
    } finally {
      if (sequence === this.listSequence && generation === this.generation) this.loading.set(false);
    }
  }
  columns() {
    const rows = this.rows();
    if (!rows.length) return [];
    const preferred = this.profile().columns.filter((key) =>
      rows.some((row) => row[key] !== undefined),
    );
    const columns = preferred.length
      ? preferred
      : Object.keys(rows[0])
          .filter((key) => key !== 'id' && !key.endsWith('Id') && typeof rows[0][key] !== 'object')
          .slice(0, 5);
    return this.module === 'sesiones-caja' ? ['_state', ...columns] : columns;
  }
  isStatus(key: string) {
    return ['_state', 'status', 'statusCode', 'isActive', 'isVoid', 'receiptProgress'].includes(
      key,
    );
  }
  isInactive(row: Data, key: string) {
    return key === '_state'
      ? Boolean(row['closedAt'])
      : row[key] === false || ['CANCELLED', 'REJECTED', 'CLOSED'].includes(row[key]);
  }
  cell(row: Data, key: string): string {
    if (key === '_state') return row['closedAt'] ? 'Cerrada' : 'Abierta';
    const value = row[key];
    if (value === null || value === undefined) return '—';
    if (this.isStatus(key))
      return typeof value === 'boolean'
        ? key === 'isVoid'
          ? value
            ? 'Anulada'
            : 'Vigente'
          : value
            ? 'Activo'
            : 'Inactivo'
        : this.statusLabel(value);
    if (
      /At$|Date$|Departure$|Arrival$|For$|Until$|From$|To$/.test(key) &&
      typeof value === 'string'
    )
      return this.date(value);
    if (/Amount$|Cost$/.test(key) && typeof value === 'number') return this.money(value);
    if (Array.isArray(value))
      return value.every((v) => typeof v !== 'object')
        ? value.join(', ')
        : `${value.length} registros`;
    if (typeof value === 'object') return value.name ?? value.fullName ?? 'Ver detalle';
    return display(value);
  }
  money(value: unknown) {
    return value === null || value === undefined
      ? '—'
      : new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(
          Number(value),
        );
  }
  date(value: unknown) {
    if (!value) return '—';
    if (/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return new Intl.DateTimeFormat('es-PE', {dateStyle:'short'}).format(new Date(String(value) + 'T12:00:00'));
    const d = new Date(String(value));
    return Number.isNaN(d.getTime())
      ? String(value)
      : new Intl.DateTimeFormat('es-PE', { dateStyle: 'short', timeStyle: 'short' }).format(d);
  }
  statusLabel = display;
  emptyTitle() {
    return this.module === 'sesiones-caja'
      ? 'Todavía no hay sesiones de caja'
      : 'Sin registros para mostrar';
  }
  recordName(row: Data) {
    if (this.module === 'entregas') {
      if (row['confirmationNumber']) return 'Constancia ' + row['confirmationNumber'];
      if (row['attemptNumber']) return 'Intento ' + row['attemptNumber'] + ' · ' + this.statusLabel(row['outcomeCode']) + ' · ' + this.date(row['attemptedAt']);
      if (row['scheduledFor']) return 'Entrega programada · ' + this.date(row['scheduledFor']);
    }
    if (this.module === 'solicitudes') return row['reason'] || 'Solicitud del ' + this.date(row['requestedAt']);
    if (this.module === 'sesiones-caja') return 'Sesión del ' + this.date(row['openedAt']);
    return (
      row['name'] ||
      row['fullName'] ||
      row['legalName'] ||
      row['trackingNumber'] ||
      (row['series'] ? row['series'] + '-' + row['number'] : row['code']) ||
      this.profile().records + ' · ' + String(row['id'] ?? '').slice(0, 8)
    );
  }
  async selectRecord(row: Data, focus = true) {
    this.selectedResource = this.listOperation() ? this.resource(this.listOperation()!.path) : '';
    // Delivery lists contain plans, although the lookup route is nested under an order.
    if (this.module === 'entregas') this.selectedResource = '/api/deliveries/plans';
    this.selected.set(row);
    this.showCashHistory.set(false);
    this.operation.set(null);
    this.hasResult.set(false);
    this.error.set('');
    await this.refreshSelected();
    if (focus)
      setTimeout(() => {
        this.recordPanel?.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
        this.recordPanel?.nativeElement.focus({ preventScroll: true });
      });
  }
  private async refreshSelected() {
    const row = this.selected();
    if (!row?.['id']) return;
    const op = this.operations().find(
      (op) => op.method === 'GET' && !op.download && op.path === this.selectedResource + '/{id}',
    );
    if (!op) return;
    const seq = ++this.detailSequence,
      generation = this.generation;
    this.detailLoading.set(true);
    try {
      const detail = await this.api.request<Data>(
        'GET',
        op.path.replace('{id}', encodeURIComponent(row['id'])),
      );
      if (seq === this.detailSequence && generation === this.generation) this.selected.set(detail);
    } catch (error) {
      if (seq === this.detailSequence && generation === this.generation)
        this.error.set(errorText(error));
    } finally {
      if (seq === this.detailSequence && generation === this.generation)
        this.detailLoading.set(false);
    }
  }
  contextualOperations() {
    return this.operations().filter(
      (op) =>
        op !== this.listOperation() &&
        op !== this.createOperation() &&
        ((this.resource(op.path) === this.selectedResource && op.path.includes('{')) ||
          (this.module === 'sesiones-caja' && op.path.endsWith('/payments'))),
    );
  }
  actionBlocked(op: Operation) {
    if (this.module === 'entregas' && op.path.endsWith('/confirmation') && this.selectedResource === '/api/deliveries/attempts')
      return this.selected()?.['outcomeCode'] !== 'DELIVERED';
    return (
      this.module === 'sesiones-caja' &&
      Boolean(this.selected()?.['closedAt']) &&
      op.method !== 'GET' &&
      this.contextualOperations().includes(op)
    );
  }
  clearSelection() {
    this.detailSequence++;
    this.selected.set(null);
    this.selectedResource = '';
    this.detailLoading.set(false);
    this.closeAction();
  }
  closeAction() {
    if (this.busy()) return;
    this.operation.set(null);
    this.hasResult.set(false);
    this.error.set('');
  }
  choose(op: Operation) {
    this.operationMenuOpen.set(false);
    if (this.busy() || this.actionBlocked(op) || this.operation()?.key === op.key) return;
    if (op === this.listOperation()) {
      this.operation.set(null);
      this.showFilters.set(this.filterKeys().length > 0);
      return;
    }
    this.operation.set(op);
    this.error.set('');
    this.message.set('');
    this.hasResult.set(false);
    this.parameterSchema = {
      type: 'object',
      properties: Object.fromEntries(this.parametersFor(op).map((p) => [p.name, p.schema])),
    };
    this.parameters = initial(this.parameterSchema);
    this.body = op.body ? initial(op.body) : {};
    this.boundToSelection = false;
    const hidden = new Set<string>(),
      row = this.selected() ?? this.objectRecord();
    const rowResource = this.selected()
      ? this.selectedResource
      : this.listOperation()
        ? this.resource(this.listOperation()!.path)
        : '';
    if (row) {
      for (const p of op.parameters.filter((p) => p.in === 'path')) {
        const same = this.resource(op.path) === rowResource;
        const value =
          p.name === 'id'
            ? same
              ? row['id']
              : undefined
            : (row[p.name] ??
              (p.name === 'attemptId' && rowResource === '/api/deliveries/attempts' ? row['id'] : undefined) ??
              (p.name === 'orderId' && this.module === 'pedidos' ? row['id'] : undefined));
        if (value !== undefined && value !== null) {
          this.parameters[p.name] = value;
          hidden.add(p.name);
          this.boundToSelection = true;
        }
      }
      if (
        op.method === 'PUT' &&
        op.body &&
        !op.path.endsWith('/roles') &&
        this.resource(op.path) === rowResource
      )
        this.body = populate(op.body, row);
      if (this.module === 'sesiones-caja' && op.path.endsWith('/payments')) {
        this.body['cashSessionId'] = row['id'];
        this.boundToSelection = true;
      }
    }
    this.visibleParameterSchema = {
      ...this.parameterSchema,
      properties: Object.fromEntries(
        Object.entries(this.parameterSchema.properties ?? {}).filter(([key]) => !hidden.has(key)),
      ),
    };
    this.visibleBodySchema = op.body ? resolve(op.body) : { type: 'object', properties: {} };
    if (this.module === 'sesiones-caja' && op.path.endsWith('/payments') && row)
      this.visibleBodySchema = {
        ...this.visibleBodySchema,
        properties: Object.fromEntries(
          Object.entries(this.visibleBodySchema.properties ?? {}).filter(
            ([key]) => key !== 'cashSessionId',
          ),
        ),
      };
    setTimeout(() => {
      this.actionPanel?.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
      this.actionPanel?.nativeElement.focus({ preventScroll: true });
    });
  }
  parameterResource() {
    const path = this.operation()?.path ?? '';
    if (path.includes('/orders/')) return 'orders';
    if (path.includes('/sales/')) return 'sales';
    if (path.includes('/cash-sessions/')) return 'cash-sessions';
    return '';
  }
  selectResult(row: Data) {
    this.selected.set(row);
    this.selectedResource = this.resultResource;
    this.operation.set(null);
    this.hasResult.set(false);
    this.error.set('');
    void this.refreshSelected();
  }
  async execute() {
    const op = this.operation();
    if (!op || this.busy()) return;
    const generation = this.generation;
    this.error.set('');
    this.message.set('');
    this.busy.set(true);
    try {
      const access = await this.api.request<Access>('GET', '/api/auth/me');
      if (generation !== this.generation) return;
      this.session.user.set(access);
      if (!this.session.permits(op.permissions))
        throw Error('Tus permisos cambiaron. Esta operación ya no está disponible.');
      let path = op.path;
      const query: Data = {},
        values = payload(this.parameterSchema, this.parameters);
      for (const p of this.parametersFor(op)) {
        if (p.in === 'path') {
          const value = values[p.name];
          if (value === '' || value === null || value === undefined)
            throw Error('Selecciona el registro necesario para continuar.');
          path = path.replace('{' + p.name + '}', encodeURIComponent(String(value)));
        } else if (p.in === 'query') query[p.name] = values[p.name];
      }
      if (
        /(cancel|void|close|depart|dispatch|confirm|send|unassign|assignments|\/roles)$/.test(
          path,
        ) &&
        op.method !== 'GET' &&
        !window.confirm('¿Confirmas la operación «' + op.title + '»?')
      )
        return;
      if (op.download) {
        const parameters = new URLSearchParams(Object.entries(query).filter(([, value]) => value !== undefined && value !== null && value !== '').map(([key, value]) => [key, String(value)]));
        await this.api.download(path + (parameters.size ? '?' + parameters.toString() : ''));
        if (generation === this.generation) this.message.set('Archivo descargado correctamente.');
        return;
      }
      const response = await this.api.request<any>(
        op.method,
        path,
        op.body ? payload(op.body, this.body) : undefined,
        query,
      );
      if (generation !== this.generation) return;
      if (path === '/api/auth/logout' || path === '/api/auth/password') {
        this.session.clear();
        await this.router.navigateByUrl('/login');
        return;
      }
      this.resultResource = op.path === '/api/deliveries/plans/{id}/attempts'
        ? '/api/deliveries/attempts'
        : op.path === '/api/deliveries/orders/{orderId}/plans'
          ? '/api/deliveries/plans'
          : this.resource(op.path);
      this.resultTitle.set(op.method === 'GET' ? op.title : 'Operación completada');
      this.result.set(response);
      this.hasResult.set(response !== null && response !== undefined);
      this.message.set(
        op.method === 'GET' ? 'Consulta completada.' : 'Operación completada correctamente.',
      );
      if (op.method !== 'GET') {
        this.operation.set(null);
        if (
          response?.id &&
          this.listOperation() &&
          this.resource(op.path) === this.resource(this.listOperation()!.path) &&
          (op.path === this.listOperation()!.path || response.id === this.selected()?.['id'])
        ) {
          this.selectedResource = this.resource(op.path);
          this.selected.set(response);
          this.hasResult.set(false);
        }
        if (this.module === 'sesiones-caja' && this.selected()) this.hasResult.set(false);
        if (this.listOperation() && this.canLoad()) await this.loadRecords();
        if (generation !== this.generation) return;
        if (this.selected()) await this.refreshSelected();
      }
    } catch (error) {
      if (generation === this.generation) this.error.set(errorText(error));
    } finally {
      if (generation === this.generation) this.busy.set(false);
    }
  }
}
