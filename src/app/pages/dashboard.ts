import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api, Session, errorText } from '../core/api';
import { Result } from '../shared/result';
@Component({
  standalone: true,
  imports: [FormsModule, Result],
  template: `
    <h1>Dashboard</h1>
    @if (session.permits(['DASHBOARD:READ'])) {
      <form (ngSubmit)="load()">
        <fieldset [disabled]="busy()">
          <label for="from">Desde</label
          ><input id="from" name="from" type="datetime-local" [(ngModel)]="from" />
          <label for="to">Hasta (exclusivo)</label
          ><input id="to" name="to" type="datetime-local" [(ngModel)]="to" />
          <label for="agency">Agencia</label
          ><select id="agency" name="agency" [(ngModel)]="agency">
            <option value="">Todas</option>
            @for (item of agencies(); track item.id) {
              <option [value]="item.id">{{ item.name }}</option>
            }
          </select>
          <button type="submit">{{ busy() ? 'Cargando…' : 'Consultar indicadores' }}</button>
        </fieldset>
      </form>
      <p>
        El período corresponde a la creación del pedido. Los importes muestran sus ventas y cobros
        acumulados en PEN.
      </p>
      @if (data()) {
        <app-result [value]="data()" />
      }
    } @else {
      <p>Tu cuenta no tiene acceso a los indicadores. Usa el menú para entrar en tus módulos.</p>
    }
    @if (error()) {
      <p role="alert">{{ error() }}</p>
    }
    <button type="button" (click)="ready()">Comprobar base de datos</button>
    <p role="status">{{ status() }}</p>
  `,
})
export class Dashboard {
  api = inject(Api);
  session = inject(Session);
  from = '';
  to = '';
  agency = '';
  agencies = signal<any[]>([]);
  data = signal<any>(null);
  busy = signal(false);
  error = signal('');
  status = signal('');
  constructor() {
    if (this.session.permits(['AGENCIES:READ']))
      void this.api
        .request<any[]>('GET', '/api/agencies', undefined, { pageSize: 100 })
        .then((rows) => this.agencies.set(rows))
        .catch(() => {});
    if (this.session.permits(['DASHBOARD:READ'])) void this.load();
  }
  async load() {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    try {
      this.data.set(
        await this.api.request('GET', '/api/dashboard', undefined, {
          from: this.from ? new Date(this.from).toISOString() : undefined,
          to: this.to ? new Date(this.to).toISOString() : undefined,
          agencyId: this.agency,
        }),
      );
    } catch (error) {
      this.error.set(errorText(error));
    } finally {
      this.busy.set(false);
    }
  }
  async ready() {
    try {
      await this.api.request('GET', '/health/ready');
      this.status.set('Base de datos disponible.');
    } catch (error) {
      this.status.set(errorText(error));
    }
  }
}
