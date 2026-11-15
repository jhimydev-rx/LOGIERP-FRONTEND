import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api, errorText } from '../core/api';

interface AgencyOption { id: string; name: string; code: string; }

@Component({
  selector: 'app-agency-picker',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="field">
      <label>{{ label }}
        <select [ngModel]="value" [ngModelOptions]="{ standalone: true }"
          [disabled]="loading() || !!error()" (ngModelChange)="valueChange.emit($event)">
          <option value="">Seleccionar agencia</option>
          @if (value && !hasSelection()) {
            <option [value]="value">{{ loading() ? 'Cargando agencia…' : 'Agencia no disponible para consulta' }}</option>
          }
          @for (agency of filtered(); track agency.id) {
            <option [value]="agency.id">{{ agency.name || agency.code }}</option>
          }
        </select>
      </label>
      <label>Buscar {{ label.toLowerCase() }}
        <input type="search" [disabled]="loading()" (input)="search.set($any($event.target).value)" placeholder="Nombre o código" />
      </label>
      @if (loading()) { <p role="status">Cargando agencias…</p> }
      @if (error()) { <p role="alert">{{ error() }}</p><button type="button" (click)="load()">Reintentar</button> }
      @if (!loading() && !error() && !filtered().length) { <p>No hay agencias que coincidan.</p> }
    </div>
  `,
})
export class AgencyPicker implements OnInit {
  @Input() value = '';
  @Input() label = 'Agencia';
  @Output() valueChange = new EventEmitter<string>();
  private api = inject(Api);
  rows = signal<AgencyOption[]>([]);
  search = signal('');
  loading = signal(false);
  error = signal('');

  ngOnInit() { void this.load(); }

  hasSelection() { return this.rows().some(agency => agency.id === this.value); }

  filtered() {
    const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const query = normalize(this.search().trim());
    return this.rows().filter(agency => agency.id === this.value || normalize(`${agency.name} ${agency.code}`).includes(query));
  }

  async load() {
    this.loading.set(true);
    this.error.set('');
    try {
      const rows: AgencyOption[] = [];
      for (let page = 1; ; page++) {
        const batch = await this.api.request<AgencyOption[]>('GET', '/api/agencies', undefined, { page, pageSize: 100 });
        rows.push(...batch);
        if (batch.length < 100) break;
      }
      this.rows.set(rows);
    } catch (error) {
      this.error.set('No se pudieron consultar las agencias. ' + errorText(error));
    } finally {
      this.loading.set(false);
    }
  }
}
