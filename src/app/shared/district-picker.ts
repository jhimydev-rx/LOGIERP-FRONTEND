import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../core/api';
import { Data } from '../core/contracts';
@Component({
  selector: 'app-district-picker', standalone: true, imports: [FormsModule],
  template: `
    <fieldset><legend>Ubicación geográfica</legend>
      <label>Departamento<select [ngModel]="department" [ngModelOptions]="{standalone: true}" (ngModelChange)="changeDepartment($event)" [disabled]="loading()">
        <option value="">Seleccionar departamento</option>
        @for (row of departments(); track row['id']) { <option [value]="row['id']">{{ row['name'] }}</option> }
      </select></label>
      <label>Provincia<select [ngModel]="province" [ngModelOptions]="{standalone: true}" (ngModelChange)="changeProvince($event)" [disabled]="!department || loading()">
        <option value="">Seleccionar provincia</option>
        @for (row of provinces(); track row['id']) { <option [value]="row['id']">{{ row['name'] }}</option> }
      </select></label>
      <label>Distrito<select [ngModel]="value" [ngModelOptions]="{standalone: true}" (ngModelChange)="valueChange.emit($event)" [disabled]="!province || loading()">
        <option value="">Seleccionar distrito</option>
        @if (value && !hasSelected()) { <option [value]="value">Distrito actual no disponible para consulta</option> }
        @for (row of districts(); track row['id']) { <option [value]="row['id']">{{ row['name'] }}</option> }
      </select></label>
      @if (loading()) { <p role="status">Cargando ubicaciones…</p> }
      @if (error()) { <p role="alert">{{ error() }}</p><button type="button" (click)="retry()">Reintentar ubicaciones</button> }
    </fieldset>
  `,
})
export class DistrictPicker implements OnInit {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  private api = inject(Api);
  private sequence = 0;
  departments = signal<Data[]>([]);
  provinces = signal<Data[]>([]);
  districts = signal<Data[]>([]);
  loading = signal(false);
  error = signal('');
  department = '';
  province = '';
  hasSelected() { return this.districts().some(row => row['id'] === this.value); }
  rows(level: string, parentId?: string) { return this.api.request<Data[]>('GET', '/api/configuration/geography/' + level, undefined, parentId ? {parentId} : {}); }
  async ngOnInit() {
    this.loading.set(true);
    this.error.set('');
    try {
      this.departments.set(await this.rows('departments'));
      // Existing district values must be preserved when opening an edit form.
      if (this.value) {
        for (const department of this.departments()) {
          const provinces = await this.rows('provinces', department['id']);
          for (const province of provinces) {
            const districts = await this.rows('districts', province['id']);
            if (districts.some(row => row['id'] === this.value)) {
              this.department = department['id']; this.province = province['id'];
              this.provinces.set(provinces); this.districts.set(districts); return;
            }
          }
        }
      }
    } catch { this.error.set('No se pudieron cargar las ubicaciones.'); }
    finally { this.loading.set(false); }
  }
  async changeDepartment(id: string) {
    this.department = id; this.province = ''; this.valueChange.emit('');
    this.provinces.set([]); this.districts.set([]);
    await this.loadChildren('provinces', id);
  }
  async changeProvince(id: string) {
    this.province = id; this.valueChange.emit(''); this.districts.set([]);
    await this.loadChildren('districts', id);
  }
  async loadChildren(level: string, id: string) {
    const sequence = ++this.sequence;
    this.error.set(''); this.loading.set(!!id);
    if (!id) return;
    try {
      const rows = await this.rows(level, id);
      if (sequence === this.sequence) (level === 'provinces' ? this.provinces : this.districts).set(rows);
    } catch { if (sequence === this.sequence) this.error.set('No se pudieron cargar las ubicaciones.'); }
    finally { if (sequence === this.sequence) this.loading.set(false); }
  }
  async retry() {
    if (this.province) await this.loadChildren('districts', this.province);
    else if (this.department) await this.loadChildren('provinces', this.department);
    else await this.ngOnInit();
  }
}
