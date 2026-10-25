import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Api, Session, errorText } from '../core/api';
import { Data, Operation, Schema, Access } from '../core/contracts';
import { MODULES, OPERATIONS } from '../data/api-contract';
import { initial, payload, populate } from '../core/schema';
import { Fields } from '../shared/fields';
import { Result } from '../shared/result';

@Component({
  standalone: true,
  imports: [FormsModule, Fields, Result],
  template: `
    <h1>{{ title }}</h1>
    @if (operations().length === 0) {
      <p>No tienes operaciones disponibles en este módulo.</p>
    }
    <nav aria-label="Operaciones">
      @for (op of operations(); track op.key) {
        <button
          type="button"
          [disabled]="busy()"
          [attr.aria-pressed]="operation()?.key === op.key"
          (click)="choose(op)"
        >
          {{ op.title }}
        </button>
      }
    </nav>
    @for (op of operation() ? [operation()!] : []; track op.key) {
      <h2>{{ op.title }}</h2>
      @if (selected()) {
        <p>
          Registro seleccionado:
          {{ selected()!['name'] || selected()!['trackingNumber'] || selected()!['id'] }}
          <button (click)="clearSelection()" type="button">Limpiar selección</button>
        </p>
      }
      <form (ngSubmit)="execute()">
        <fieldset [disabled]="busy()">
          <app-fields
            [schema]="parameterSchema"
            [model]="parameters"
            prefix="params"
            [context]="module"
          />
          @if (op.body) {
            <app-fields [schema]="op.body" [model]="body" prefix="body" [context]="module" />
          }
          <button type="submit">{{ busy() ? 'Procesando…' : op.title }}</button>
        </fieldset>
      </form>
      <p>
        Los campos se validan al enviar. Las fechas y horas se introducen en tu zona horaria local.
      </p>
    }
    @if (error()) {
      <pre role="alert">{{ error() }}</pre>
    }
    @if (message()) {
      <p role="status">{{ message() }}</p>
    }
    @if (hasResult()) {
      <h2>Resultado</h2>
      <app-result [value]="result()" [selectable]="true" (selected)="select($event)" />
    }
  `,
})
export class Workspace {
  api = inject(Api);
  session = inject(Session);
  router = inject(Router);
  route = inject(ActivatedRoute);
  module = '';
  title = '';
  operation = signal<Operation | null>(null);
  busy = signal(false);
  selected = signal<Data | null>(null);
  result = signal<any>(null);
  hasResult = signal(false);
  error = signal('');
  message = signal('');
  parameters: Data = {};
  body: Data = {};
  parameterSchema: Schema = { type: 'object', properties: {} };
  private generation = 0;
  private selectedResource = '';
  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.generation++;
      this.module = params.get('module') ?? '';
      this.title = MODULES.find((m) => m.id === this.module)?.name ?? 'Módulo';
      this.selected.set(null);
      this.hasResult.set(false);
      this.error.set('');
      this.message.set('');
      this.busy.set(false);
      const op = this.operations()[0];
      this.operation.set(null);
      if (op) this.choose(op);
    });
  }
  operations() {
    return OPERATIONS.filter(
      (op) =>
        op.module === this.module &&
        op.path !== '/api/auth/login' &&
        this.session.permits(op.permissions),
    );
  }
  choose(op: Operation) {
    this.operation.set(op);
    this.error.set('');
    this.message.set('');
    this.parameterSchema = {
      type: 'object',
      properties: Object.fromEntries(op.parameters.map((p) => [p.name, p.schema])),
    };
    this.parameters = initial(this.parameterSchema);
    this.body = op.body ? initial(op.body) : {};
    if (this.selected()) this.applySelected(this.selected()!);
  }
  clearSelection() {
    this.selected.set(null);
    const op = this.operation();
    if (op) this.choose(op);
  }
  select(row: Data) {
    this.selectedResource = this.operation()?.path.split('/').slice(0, 3).join('/') ?? '';
    this.selected.set(row);
    this.applySelected(row);
    this.message.set('Registro seleccionado. Elige la operación que necesitas.');
  }
  private applySelected(row: Data) {
    const op = this.operation();
    if (!op) return;
    for (const p of op.parameters)
      if (p.in === 'path') {
        const sameResource = this.selectedResource === op.path.split('/').slice(0, 3).join('/');
        const candidate =
          (p.name !== 'id' || sameResource ? row[p.name] : undefined) ??
          ((p.name === 'id' && sameResource) || (p.name === 'orderId' && this.module === 'pedidos')
            ? row['id']
            : undefined);
        if (candidate !== undefined) this.parameters[p.name] = candidate;
      }
    if (op.method === 'PUT' && op.body) {
      // Responses often carry names of roles, not role IDs; never silently convert them.
      if (!op.path.endsWith('/roles')) this.body = populate(op.body, row);
    }
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
      this.session.user.set(access);
      if (generation !== this.generation) return;
      if (!this.session.permits(op.permissions))
        throw new Error('Tus permisos cambiaron. Esta operación ya no está disponible.');
      let path = op.path;
      const query: Data = {};
      const values = payload(this.parameterSchema, this.parameters);
      for (const p of op.parameters) {
        if (p.in === 'path') {
          const value = values[p.name];
          if (value === '' || value === null || value === undefined)
            throw new Error('Completa los identificadores o códigos de la operación.');
          path = path.replace('{' + p.name + '}', encodeURIComponent(String(value)));
        } else if (p.in === 'query') query[p.name] = values[p.name];
      }
      if (
        /(cancel|void|close|depart|dispatch|confirm|unassign|assignments|\/roles)$/.test(path) &&
        op.method !== 'GET' &&
        !window.confirm('¿Confirmas la operación «' + op.title + '»?')
      )
        return;
      const response = await this.api.request(
        op.method,
        path,
        op.body ? payload(op.body, this.body) : undefined,
        query,
      );
      if (generation !== this.generation) return;
      this.result.set(response);
      this.hasResult.set(response !== null && response !== undefined);
      this.message.set(
        op.method === 'GET' ? 'Consulta completada.' : 'Operación completada correctamente.',
      );
      if (path === '/api/auth/logout' || path === '/api/auth/password') {
        this.session.clear();
        await this.router.navigateByUrl('/login');
      }
    } catch (error) {
      if (generation === this.generation) this.error.set(errorText(error));
    } finally {
      if (generation === this.generation) this.busy.set(false);
    }
  }
}
