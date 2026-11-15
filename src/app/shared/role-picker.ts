import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { Api, errorText } from '../core/api';

interface RoleOption { id: string; code: string; name: string; description?: string; isActive: boolean; }

@Component({
  selector: 'app-role-picker',
  standalone: true,
  template: `
    <fieldset class="permission-picker">
      <legend>Roles del usuario</legend>
      <p>Marca los roles que tendrá el usuario. Puedes seleccionar más de uno.</p>
      @if (loading()) { <p role="status">Cargando roles…</p> }
      @if (error()) {
        <p role="alert">{{ error() }}</p>
        <button type="button" (click)="load()">Reintentar carga de roles</button>
      }
      @if (!loading() && !error()) {
        <details class="selection-disclosure">
          <summary>Seleccionar roles <span>{{ value.length }} seleccionados</span></summary>
          <div class="selection-content">
        <label>Buscar rol <input type="search" (input)="search.set($any($event.target).value)" /></label>
        <p>{{ value.length }} {{ value.length === 1 ? 'rol seleccionado' : 'roles seleccionados' }}</p>
        <div class="permission-options">
          @for (role of filtered(); track role.id) {
            <label class="permission-option">
              <input type="checkbox" [checked]="value.includes(role.id)" (change)="toggle(role.id, $any($event.target).checked)" />
              <span>{{ role.name || role.code }}
                @if (role.description) { <small>{{ role.description }}</small> }
              </span>
            </label>
          } @empty { <p>No hay roles disponibles que coincidan con la búsqueda.</p> }
        </div>
          </div>
        </details>
      }
    </fieldset>
  `,
})
export class RolePicker implements OnInit {
  @Input() value: string[] = [];
  @Output() valueChange = new EventEmitter<string[]>();
  private api = inject(Api);
  rows = signal<RoleOption[]>([]);
  search = signal('');
  loading = signal(false);
  error = signal('');
  ngOnInit() { void this.load(); }
  filtered() {
    const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const query = normalize(this.search().trim());
    return this.rows().filter(role => normalize(`${role.name} ${role.code} ${role.description || ''}`).includes(query));
  }
  toggle(id: string, checked: boolean) {
    this.valueChange.emit(checked ? [...new Set([...this.value, id])] : this.value.filter(value => value !== id));
  }
  async load() {
    this.loading.set(true);
    this.error.set('');
    try {
      const rows = await this.api.request<RoleOption[]>('GET', '/api/roles');
      this.rows.set(rows.filter(role => role.isActive).sort((a, b) => a.name.localeCompare(b.name, 'es')));
    } catch (error) {
      this.error.set('No se pudieron cargar los roles. ' + errorText(error));
    } finally { this.loading.set(false); }
  }
}
