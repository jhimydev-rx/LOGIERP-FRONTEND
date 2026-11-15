import { Component, Input, Output, EventEmitter, OnChanges, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../core/api';
import { TransportLookup } from './transport-name';
import { OPERATIONS } from '../data/api-contract';
import { Data } from '../core/contracts';

export function referenceLabel(row: Data): string {
  return row['_displayName'] || row['name'] || row['fullName'] || row['legalName'] || row['trackingNumber'] ||
    row['saleNumber'] || row['orderNumber'] || row['plate'] || row['reason'] || row['code'] ||
    (row['openedAt'] ? 'Sesión del ' + new Date(row['openedAt']).toLocaleString('es-PE') : '') || 'Registro sin nombre';
}
@Component({
  selector: 'app-reference-picker', standalone: true, imports: [FormsModule],
  template: `
    <label>{{ label }}
      <select [ngModel]="value" [ngModelOptions]="{standalone: true}" (ngModelChange)="valueChange.emit($event)" [disabled]="loading()">
        <option value="">Seleccionar {{ label.toLowerCase() }}</option>
        @if (value && !hasSelected()) { <option [value]="value">{{ loading() ? 'Cargando selección…' : 'Selección actual no disponible para consulta' }}</option> }
        @for (row of filtered(); track optionValue(row)) { <option [value]="optionValue(row)">{{ name(row) }}</option> }
      </select>
    </label>
    <label>Buscar {{ label.toLowerCase() }}
      <input type="search" [ngModel]="search" [ngModelOptions]="{standalone: true}" (ngModelChange)="search = $event" />
    </label>
    @if (loading()) { <p role="status">Cargando opciones…</p> }
    @if (error()) { <p role="alert">{{ error() }}</p><button type="button" (click)="load()">Reintentar {{ label.toLowerCase() }}</button> }
    @if (!loading() && !error() && !rows().length) { <p>No hay opciones disponibles.</p> }
  `,
})
export class ReferencePicker implements OnChanges {
  @Input() route = '';
  @Input() label = '';
  @Input() code = false;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  private api = inject(Api);
  private lookup = inject(TransportLookup);
  private sequence = 0;
  private loadedRoute = '';
  rows = signal<Data[]>([]);
  loading = signal(false);
  error = signal('');
  search = '';
  name = referenceLabel;
  optionValue(row: Data) { return String(this.code ? row['code'] : row['id']); }
  hasSelected() { return this.rows().some(row => this.optionValue(row) === this.value); }
  filtered() {
    const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return this.rows().filter(row => this.optionValue(row) === this.value || normalize(this.name(row)).includes(normalize(this.search)));
  }
  ngOnChanges() { if (this.route !== this.loadedRoute) { this.loadedRoute = this.route; void this.load(); } }
  async load() {
    const sequence = ++this.sequence;
    this.loading.set(true);
    this.error.set('');
    this.rows.set([]);
    try {
      const rows: Data[] = [];
      for (let page = 1; ; page++) {
        const batch = await this.api.request<Data[]>('GET', '/api/' + this.route, undefined, {page, pageSize: 100});
        if (sequence !== this.sequence) return;
        rows.push(...batch);
        const paginated = OPERATIONS.some(op => op.method === 'GET' && op.path === '/api/' + this.route && op.parameters.some(parameter => parameter.name.toLowerCase() === 'page'));
        if (batch.length < 100 || !paginated) break;
      }
      if (this.route === 'warehouse-locations') {
        await Promise.all(rows.map(async row => {
          try {
            const warehouse = await this.lookup.find('warehouses', row['warehouseId']);
            row['_displayName'] = [row['code'], row['name'], warehouse?.['name'] || 'Almacén no disponible'].filter(Boolean).join(' · ');
          } catch { row['_displayName'] = [row['code'], row['name'], 'Almacén no disponible'].filter(Boolean).join(' · '); }
        }));
      }
      if (sequence === this.sequence) this.rows.set(rows);
    } catch { if (sequence === this.sequence) this.error.set('No se pudieron consultar las opciones. Revisa el acceso o reintenta.'); }
    finally { if (sequence === this.sequence) this.loading.set(false); }
  }
}
