import { Component, Input, OnChanges, inject, signal } from '@angular/core';
import { TransportLookup } from './transport-name';
import { referenceLabel } from './reference-picker';
@Component({selector: 'app-reference-name', standalone: true, template: `<span>{{ name() }}</span>`})
export class ReferenceName implements OnChanges {
  @Input() id: string | null = null;
  @Input() field = '';
  private lookup = inject(TransportLookup);
  private sequence = 0;
  name = signal('—');
  async ngOnChanges() {
    const sequence = ++this.sequence;
    if (!this.id) { this.name.set('—'); return; }
    const resources: Record<string,string> = {userId:'users', requestedBy:'users', supplyId:'supplies', orderId:'orders', purchaseRequestId:'purchase-requests', purchaseOrderId:'purchase-orders'};
    this.name.set('Cargando…');
    try {
      const row = await this.lookup.find(resources[this.field], this.id);
      if (sequence === this.sequence) this.name.set(row ? referenceLabel(row) : 'Registro no disponible');
    } catch { if (sequence === this.sequence) this.name.set('Sin acceso al nombre del registro'); }
  }
}
