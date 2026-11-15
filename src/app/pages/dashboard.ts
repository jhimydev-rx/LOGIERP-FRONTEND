import { Component, inject, signal } from '@angular/core';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Api, Session, errorText } from '../core/api';
@Component({
  standalone: true,
  imports: [FormsModule, RouterLink, DecimalPipe, CurrencyPipe],
  template: `
    <div class="page-heading">
      <div>
        <span class="eyebrow">CENTRO DE OPERACIONES</span>
        <h1>Dashboard</h1>
      </div>
      <span class="today">{{ today }}</span>
    </div>
    <section class="welcome-band">
      <div>
        <span class="eyebrow light">TODO CONECTADO</span>
        <h2>Buen día, {{ firstName() }}.</h2>
        <p>Cada pedido tiene un destino.<br />Aquí empieza el siguiente paso.</p>
        <a class="hero-link" routerLink="/modulos/pedidos"
          >Ir a pedidos <span aria-hidden="true">↗</span></a
        >
      </div>
      <img src="/logierp-transport.svg" alt="Camión de reparto LogiERP" />
    </section>
    @if (session.permits(['DASHBOARD:READ'])) {
      <section class="section-heading">
        <div>
          <h2>Resumen de la operación</h2>
          <p class="muted">Consulta la actividad de tus agencias.</p>
        </div>
      </section>
      <form class="filter-form" (ngSubmit)="load()">
        <fieldset [disabled]="busy()">
          <div>
            <label for="from">Desde</label
            ><input id="from" name="from" type="datetime-local" [(ngModel)]="from" />
          </div>
          <div>
            <label for="to">Hasta (exclusivo)</label
            ><input id="to" name="to" type="datetime-local" [(ngModel)]="to" />
          </div>
          <div>
            <label for="agency">Agencia</label
            ><select id="agency" name="agency" [(ngModel)]="agency">
              <option value="">Todas</option>
              @for (item of agencies(); track item.id) {
                <option [value]="item.id">{{ item.name }}</option>
              }
            </select>
          </div>
          <button class="primary" type="submit">
            {{ busy() ? 'Cargando…' : 'Consultar indicadores' }}
          </button>
        </fieldset>
      </form>
      @if (data(); as summary) {
        <section class="metrics" aria-label="Indicadores" [attr.aria-busy]="busy()">
          <div>
            <span>Pedidos registrados</span><strong>{{ summary.registeredOrders | number }}</strong
            ><small>En el período seleccionado</small>
          </div>
          <div>
            <span>Entregas pendientes</span><strong>{{ summary.pendingDeliveries | number }}</strong
            ><small>En agencia o en reparto</small>
          </div>
          <div>
            <span>Total vendido</span
            ><strong>{{ summary.totalAmount | currency: 'PEN' : 'S/ ' : '1.2-2' }}</strong
            ><small>Ventas de estos pedidos</small>
          </div>
          <div>
            <span>Importe cobrado</span
            ><strong>{{ summary.paidAmount | currency: 'PEN' : 'S/ ' : '1.2-2' }}</strong
            ><small>Cobros acumulados</small>
          </div>
        </section>
        <div class="dashboard-detail">
          <section class="status-section">
            <h2>Pedidos por estado</h2>
            @for (row of states(); track row.code) {
              <div class="state-row">
                <span>{{ stateLabel(row.code) }}</span>
                <div class="bar-track"><div [style.width.%]="percentage(row.count)"></div></div>
                <strong>{{ row.count | number }}</strong>
              </div>
            } @empty {
              <div class="empty-state">
                <span aria-hidden="true">□</span>
                <h3>Aún no hay pedidos</h3>
                <p>Prueba otro período o registra tu primer envío.</p>
              </div>
            }
          </section>
          <section class="balance-section">
            <span class="eyebrow">POR COBRAR</span>
            <h2>{{ summary.pendingAmount | currency: 'PEN' : 'S/ ' : '1.2-2' }}</h2>
            <p>Saldo pendiente de los pedidos del período.</p>
            @if (session.permits(['SALES:READ'])) {
              <a routerLink="/modulos/ventas">Consultar ventas <span aria-hidden="true">→</span></a>
            }
          </section>
        </div>
        <p class="data-note">
          El período filtra la creación del pedido. Ventas y cobros muestran sus importes acumulados
          en soles.
        </p>
      } @else if (busy()) {
        <p role="status">Cargando indicadores…</p>
      }
    } @else {
      <p class="notice">
        Tu cuenta no tiene acceso a los indicadores. Usa el menú para entrar en tus módulos.
      </p>
    }
    @if (error()) {
      <p role="alert">{{ error() }}</p>
    }
    @if (agencyError()) {
      <p class="notice">{{ agencyError() }}</p>
    }
    <div class="connection-footer">
      <button class="text-button" type="button" (click)="ready()">Comprobar base de datos</button
      ><span role="status">{{ status() }}</span>
    </div>
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
  agencyError = signal('');
  status = signal('');
  today = new Intl.DateTimeFormat('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
  firstName() {
    return this.session.user()?.fullName.split(' ')[0] || 'equipo';
  }
  states(): { code: string; count: number }[] {
    return Object.entries(this.data()?.ordersByStatus ?? {}).map(([code, count]) => ({
      code,
      count: Number(count),
    }));
  }
  percentage(count: number) {
    return this.data()?.registeredOrders ? (count / this.data().registeredOrders) * 100 : 0;
  }
  stateLabel(code: string) {
    return (
      (
        {
          DRAFT: 'Borrador',
          REGISTERED: 'Registrados',
          RECEIVED: 'Recibidos',
          IN_TRANSIT: 'En tránsito',
          AT_AGENCY: 'En agencia',
          OUT_FOR_DELIVERY: 'En reparto',
          DELIVERED: 'Entregados',
          CANCELLED: 'Cancelados',
        } as Record<string, string>
      )[code] ?? code
    );
  }
  constructor() {
    if (this.session.permits(['AGENCIES:READ']))
      void this.api
        .request<any[]>('GET', '/api/agencies', undefined, { pageSize: 100 })
        .then((rows) => this.agencies.set(rows))
        .catch(() =>
          this.agencyError.set(
            'No se pudo cargar la lista de agencias. Puedes consultar el resumen general.',
          ),
        );
    if (this.session.permits(['DASHBOARD:READ'])) void this.load();
  }
  async load() {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    try {
      if (this.from && this.to && new Date(this.from) >= new Date(this.to))
        throw Error('La fecha de inicio debe ser anterior a la fecha final.');
      this.data.set(
        await this.api.request('GET', '/api/dashboard', undefined, {
          from: this.from ? new Date(this.from).toISOString() : undefined,
          to: this.to ? new Date(this.to).toISOString() : undefined,
          agencyId: this.agency,
        }),
      );
    } catch (error) {
      this.data.set(null);
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
