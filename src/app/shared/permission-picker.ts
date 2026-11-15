import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { Api, errorText } from '../core/api';

import { permissionModules as modules, permissionActions as actions } from '../core/permission-labels';
interface Permission { id: string; module: string; action: string; name: string; }
@Component({
  selector: 'app-permission-picker', standalone: true,
  template: `
    <fieldset class="permission-picker">
      <legend>Permisos por módulo</legend>
      <p>{{ value.length }} permisos seleccionados. Marca únicamente las acciones que necesita el rol.</p>
      <label>Buscar módulo o acción
        <input type="search" (input)="search.set($any($event.target).value)" />
      </label>
      @if (loading()) { <p role="status">Cargando permisos…</p> }
      @if (error()) { <p role="alert">{{ error() }}</p><button type="button" (click)="load()">Reintentar</button> }
      @for (group of groups(); track group.code) {
        <details class="selection-disclosure" role="group" [attr.aria-label]="group.name" [open]="search().trim().length > 0">
          <summary>{{ group.name }} <span>{{ selectedCount(group.code) }} seleccionados</span></summary>
          <div class="permission-options">
            @for (permission of group.items; track permission.id) {
              <label class="permission-option">
                <input type="checkbox" [checked]="value.includes(permission.id)" (change)="toggle(permission.id, $any($event.target).checked)" />
                <span>{{ action(permission) }} <small>{{ permission.module }}:{{ permission.action }}</small></span>
              </label>
            }
          </div>
        </details>
      }
      @if (!loading() && !error() && !groups().length) { <p>No hay permisos que coincidan con la búsqueda.</p> }
    </fieldset>
  `,
})
export class PermissionPicker implements OnInit {
  @Input() value: string[] = [];
  @Output() valueChange = new EventEmitter<string[]>();
  private api = inject(Api);
  rows = signal<Permission[]>([]);
  search = signal('');
  loading = signal(false);
  error = signal('');
  ngOnInit() { void this.load(); }
  action(p: Permission) { return actions[p.action] || p.name || p.action; }
  normalize(text: string) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  groups() {
    const query = this.normalize(this.search());
    const groups = new Map<string, { code: string; name: string; items: Permission[] }>();
    for (const p of this.rows()) {
      const name = modules[p.module] || p.module;
      if (!this.normalize(name + ' ' + p.module + ' ' + this.action(p) + ' ' + p.action).includes(query)) continue;
      if (!groups.has(p.module)) groups.set(p.module, { code: p.module, name, items: [] });
      groups.get(p.module)!.items.push(p);
    }
    return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, 'es'));
  }
  selectedCount(code: string) {
    return this.rows().filter(permission => permission.module === code && this.value.includes(permission.id)).length;
  }
  toggle(id: string, checked: boolean) {
    this.valueChange.emit(checked ? [...new Set([...this.value, id])] : this.value.filter(value => value !== id));
  }
  async load() {
    this.loading.set(true); this.error.set('');
    try { this.rows.set(await this.api.request<Permission[]>('GET', '/api/permissions')); }
    catch (error) { this.error.set(errorText(error)); }
    finally { this.loading.set(false); }
  }
}
