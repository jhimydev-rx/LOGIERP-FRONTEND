import { Component, Input, OnChanges, inject, signal } from '@angular/core';
import { Api } from '../core/api';

@Component({
  selector: 'app-agency-name',
  standalone: true,
  template: `<span>{{ name() }}</span>`,
})
export class AgencyName implements OnChanges {
  @Input() id: string | null = null;
  private api = inject(Api);
  private sequence = 0;
  name = signal('—');
  async ngOnChanges() {
    const sequence = ++this.sequence;
    if (!this.id) { this.name.set('—'); return; }
    this.name.set('Cargando agencia…');
    try {
      const response = await this.api.request<{agency: {name: string; code: string}}>('GET', '/api/agencies/' + encodeURIComponent(this.id));
      const agency = response.agency;
      if (sequence === this.sequence) this.name.set(agency?.name || agency?.code || 'Agencia no disponible para consulta');
    } catch {
      if (sequence === this.sequence) this.name.set('Agencia no disponible para consulta');
    }
  }
}
