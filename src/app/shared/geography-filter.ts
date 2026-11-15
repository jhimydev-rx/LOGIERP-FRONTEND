import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api, errorText } from '../core/api';
import { Data } from '../core/contracts';

@Component({
  selector: 'app-geography-filter', standalone: true, imports: [FormsModule],
  template: `
    <div class="geography-fields">
      <label>Nivel geográfico
        <select [ngModel]="model['level']" [ngModelOptions]="{standalone: true}" (ngModelChange)="changeLevel($event)">
          <option value="departments">Departamentos</option>
          <option value="provinces">Provincias</option>
          <option value="districts">Distritos</option>
        </select>
      </label>
      @if (model['level'] !== 'departments') {
        <label>Departamento
          <select [ngModel]="department" [ngModelOptions]="{standalone: true}" (ngModelChange)="changeDepartment($event)" [disabled]="loadingDepartments()">
            <option value="">Seleccionar departamento</option>
            @for (row of departments(); track row['id']) { <option [value]="row['id']">{{ row['name'] }}</option> }
          </select>
        </label>
      }
      @if (model['level'] === 'districts') {
        <label>Provincia
          <select [ngModel]="model['parentId'] || ''" [ngModelOptions]="{standalone: true}" (ngModelChange)="model['parentId'] = $event" [disabled]="!department || loadingProvinces()">
            <option value="">Seleccionar provincia</option>
            @for (row of provinces(); track row['id']) { <option [value]="row['id']">{{ row['name'] }}</option> }
          </select>
        </label>
      }
    </div>
    @if (loadingDepartments() || loadingProvinces()) { <p role="status">Cargando ubicaciones…</p> }
    @if (error()) { <p role="alert">{{ error() }}</p><button type="button" (click)="retry()">Reintentar ubicaciones</button> }
    @if (model['level'] === 'districts' && department && !loadingProvinces() && !error() && !provinces().length) { <p>No hay provincias registradas en este departamento.</p> }
  `,
  styles: [`.geography-fields { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: 20px; } label { display: flex; flex-direction: column; gap: 8px; }`],
})
export class GeographyFilter implements OnInit {
  @Input({required: true}) model!: Data;
  private api = inject(Api);
  departments = signal<Data[]>([]);
  provinces = signal<Data[]>([]);
  loadingDepartments = signal(false);
  loadingProvinces = signal(false);
  error = signal('');
  department = '';
  private sequence = 0;

  async ngOnInit() {
    await this.loadDepartments();
    const parent = this.model['parentId'];
    const department = this.model['level'] === 'provinces' ? parent : this.model['_departmentId'];
    if (department) {
      await this.changeDepartment(department);
      if (this.model['level'] === 'districts' && this.provinces().some(row => row['id'] === parent)) this.model['parentId'] = parent;
    }
  }

  async loadDepartments() {
    this.loadingDepartments.set(true);
    this.error.set('');
    try { this.departments.set(await this.api.request<Data[]>('GET', '/api/configuration/geography/departments')); }
    catch (error) { this.error.set(errorText(error)); }
    finally { this.loadingDepartments.set(false); }
  }

  changeLevel(level: string) {
    this.model['level'] = level;
    void this.changeDepartment('');
  }

  async changeDepartment(id: string) {
    const sequence = ++this.sequence;
    this.department = id;
    this.model['_departmentId'] = id;
    this.model['parentId'] = this.model['level'] === 'provinces' ? id : '';
    this.provinces.set([]);
    this.error.set('');
    this.loadingProvinces.set(false);
    if (!id || this.model['level'] !== 'districts') return;
    this.loadingProvinces.set(true);
    try {
      const rows = await this.api.request<Data[]>('GET', '/api/configuration/geography/provinces', undefined, {parentId: id});
      if (sequence === this.sequence) this.provinces.set(rows);
    } catch (error) {
      if (sequence === this.sequence) this.error.set(errorText(error));
    } finally {
      if (sequence === this.sequence) this.loadingProvinces.set(false);
    }
  }

  async retry() {
    await this.loadDepartments();
    if (this.department) await this.changeDepartment(this.department);
  }
}
