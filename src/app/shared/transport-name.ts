import { Component, Injectable, Input, OnChanges, inject, signal } from '@angular/core';
import { Api, Session } from '../core/api';
import { Data } from '../core/contracts';

@Injectable({ providedIn: 'root' })
export class TransportLookup {
  private api = inject(Api);
  private session = inject(Session);
  private pending = new Map<string, Promise<Data[]>>();
  async find(resource: string, id: string) {
    const key = this.session.token() + ':' + resource;
    let request = this.pending.get(key);
    if (!request) {
      request = this.load(resource);
      this.pending.set(key, request);
      const cleanup = () => this.pending.delete(key);
      request.then(cleanup, cleanup);
    }
    return (await request).find(row => row['id'] === id);
  }
  private async load(resource: string) {
    const rows: Data[] = [];
    for (let page = 1; ; page++) {
      const batch = await this.api.request<Data[]>('GET', '/api/' + resource, undefined, { page, pageSize: 100 });
      rows.push(...batch);
      if (batch.length < 100) return rows;
    }
  }
}

@Component({ selector: 'app-transport-name', standalone: true, template: `<span>{{ name() }}</span>` })
export class TransportName implements OnChanges {
  @Input() id: string | null = null;
  @Input() field = '';
  private lookup = inject(TransportLookup);
  private sequence = 0;
  name = signal('—');
  async ngOnChanges() {
    const sequence = ++this.sequence;
    if (!this.id) { this.name.set('—'); return; }
    const resource = this.field === 'vehicleId' ? 'vehicles' : this.field === 'driverId' ? 'drivers' : 'routes';
    const label = this.field === 'vehicleId' ? 'Vehículo' : this.field === 'driverId' ? 'Conductor' : 'Ruta';
    this.name.set('Cargando…');
    try {
      const row = await this.lookup.find(resource, this.id);
      const name = row?.[this.field === 'vehicleId' ? 'plate' : this.field === 'driverId' ? 'fullName' : 'name'];
      if (sequence === this.sequence) this.name.set(name || `${label} no encontrado`);
    } catch {
      if (sequence === this.sequence) this.name.set(`${label} no disponible para consulta`);
    }
  }
}
