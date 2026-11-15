import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api, Session, errorText } from '../core/api';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="workspace-heading module-heading-copy"><img class="module-illustration" src="illustrations/reports.svg" alt="" width="110" height="75" /><div><span class="eyebrow">CONSULTAS Y DESCARGAS</span><h1>Reportes Excel</h1>
    <p>Descarga ventas, movimientos de caja o líneas de compra del período elegido.</p></div></div>
    <form class="work-form" (ngSubmit)="download()">
      <fieldset [disabled]="busy()">
        <label for="report-kind">Reporte</label>
        <select id="report-kind" name="kind" [(ngModel)]="kind" required>
          <option value="">Seleccionar reporte</option>
          @for (report of available(); track report.id) { <option [value]="report.id">{{ report.name }}</option> }
        </select>
        <label for="report-start">Desde</label><input id="report-start" name="start" type="date" [(ngModel)]="start" required />
        <label for="report-end">Hasta</label><input id="report-end" name="end" type="date" [(ngModel)]="end" required />
        <p>Fechas UTC, ambos días incluidos. Máximo 366 días y 10 000 filas; reduce el período si supera el límite.</p>
        <p>{{ note() }}</p>
        <button type="submit" class="primary" [disabled]="!kind">{{ busy() ? 'Generando…' : 'Descargar Excel' }}</button>
      </fieldset>
    </form>
    @if (!available().length) { <p>No tienes permisos para consultar estos reportes.</p> }
    @if (error()) { <p role="alert">{{ error() }}</p> }
    @if (message()) { <p role="status">{{ message() }}</p> }
  `,
})
export class Reports {
  api = inject(Api);
  session = inject(Session);
  kind = '';
  end = new Date().toISOString().slice(0, 10);
  start = this.end.slice(0, 8) + '01';
  busy = signal(false);
  error = signal('');
  message = signal('');
  available() {
    return [{ id: 'sales', name: 'Ventas', permission: 'SALES:READ' }, { id: 'cash', name: 'Movimientos de caja', permission: 'CASH:READ' }, { id: 'purchases', name: 'Compras por suministro', permission: 'PURCHASING:READ' }].filter(report => this.session.permits([report.permission]));
  }
  note() {
    return this.kind === 'sales' ? 'Se filtra por fecha de venta. Cobros acumulados a la fecha de consulta; las anuladas se identifican.' : this.kind === 'cash' ? 'Se filtra por fecha del movimiento. Incluye todos los medios de pago; no representa el saldo de efectivo.' : this.kind === 'purchases' ? 'Se filtra por fecha de la orden. Cantidades recibidas acumuladas a la fecha de consulta; las canceladas se identifican.' : '';
  }
  async download() {
    if (this.busy()) return;
    this.error.set(''); this.message.set('');
    if (!this.start || !this.end || this.start > this.end || !this.available().some(item => item.id === this.kind)) {
      this.error.set('Selecciona un reporte permitido y un período válido.'); return;
    }
    this.busy.set(true);
    try {
      await this.api.download('/api/reports/' + this.kind + '?' + new URLSearchParams({ startDate: this.start, endDate: this.end }));
      this.message.set('Archivo Excel descargado.');
    } catch (error) { this.error.set(errorText(error)); }
    finally { this.busy.set(false); }
  }
}
