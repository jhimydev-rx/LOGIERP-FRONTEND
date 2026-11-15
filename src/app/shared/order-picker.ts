import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { Api, errorText } from '../core/api';
interface OrderOption { id: string; trackingNumber: string; }
@Component({
 selector: 'app-order-picker', standalone: true,
 template: `
 <div class="field">
   <label>Buscar pedido por seguimiento
     <input type="search" [disabled]="loading()" (input)="search.set($any($event.target).value)" placeholder="Ej.: LG-000000000021" />
   </label>
   <label>Pedido
     <select [value]="value" [disabled]="loading() || !!error()" (change)="valueChange.emit($any($event.target).value)">
       <option value="">Seleccionar pedido</option>
       @for (row of filtered(); track row.id) { <option [value]="row.id">{{ row.trackingNumber }}</option> }
     </select>
   </label>
   @if (loading()) { <p role="status">Cargando pedidos…</p> }
   @if (error()) { <p role="alert">{{ error() }}</p><button type="button" (click)="load()">Reintentar pedidos</button> }
   @if (!loading() && !error() && !filtered().length) { <p>No hay pedidos que coincidan.</p> }
 </div>`,
})
export class OrderPicker implements OnInit {
 @Input() value = '';
 @Output() valueChange = new EventEmitter<string>();
 private api = inject(Api);
 rows = signal<OrderOption[]>([]);
 search = signal(''); loading = signal(false); error = signal('');
 ngOnInit() { void this.load(); }
 filtered() { const q=this.search().trim().toLowerCase(); return this.rows().filter(row=>row.id===this.value || row.trackingNumber.toLowerCase().includes(q)); }
 async load() {
  this.loading.set(true);this.error.set('');
  try {
   const rows: OrderOption[]=[];
   for(let page=1;;page++) {
    const batch=await this.api.request<OrderOption[]>('GET','/api/orders',undefined,{page,pageSize:100});
    rows.push(...batch);if(batch.length<100)break;
   }
   this.rows.set(rows);
  } catch(e) { this.error.set('No se pudieron consultar los pedidos. '+errorText(e)); }
  finally { this.loading.set(false); }
 }
}
