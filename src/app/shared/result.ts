import { display } from '../core/display';
import { ReferenceName } from './reference-name';
import { WarehouseName } from './warehouse-name';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TransportName } from './transport-name';
import { AgencyName } from './agency-name';
import { Data } from '../core/contracts';
import { label } from '../core/schema';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [ReferenceName, AgencyName, TransportName, WarehouseName],
  template: `
    @if (value === null || value === undefined) {
      <span>—</span>
    } @else if (isArray(value)) {
      @if (value.length === 0) {
        <p>Sin registros.</p>
      } @else if (isObject(value[0])) {
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                @if (selectable) {
                  <th>Acción</th>
                }
                @for (key of columns(); track key) {
                  <th>{{ label(key) }}</th>
                }
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              @for (row of value; track $index) {
                <tr>
                  @if (selectable) {
                    <td><button type="button" (click)="selected.emit(row)">Seleccionar</button></td>
                  }
                  @for (key of columns(); track key) {
                    <td>@if (isReference(key)) { <app-reference-name [id]="row[key]" [field]="key" /> } @else if (isAgency(key)) { <app-agency-name [id]="row[key]" /> } @else if (isWarehouse(key)) { <app-warehouse-name [id]="row[key]" [field]="key" /> } @else if (isTransport(key)) { <app-transport-name [id]="row[key]" [field]="key" /> } @else { {{ scalar(row[key]) }} }</td>
                  }
                  <td>
                    <details>
                      <summary>Ver detalle</summary>
                      <app-result [value]="row" />
                    </details>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      } @else {
        <ul>
          @for (item of value; track $index) {
            <li>{{ scalar(item) }}</li>
          }
        </ul>
      }
    } @else if (isObject(value)) {
      @if (selectable && value.id) {
        <button type="button" (click)="selected.emit(value)">Usar este registro</button>
      }
      <dl>
        @for (key of keys(value); track key) {
          <dt>{{ label(key) }}</dt>
          <dd>@if (isReference(key)) { <app-reference-name [id]="value[key]" [field]="key" /> } @else if (isAgency(key)) { <app-agency-name [id]="value[key]" /> } @else if (isWarehouse(key)) { <app-warehouse-name [id]="value[key]" [field]="key" /> } @else if (isTransport(key)) { <app-transport-name [id]="value[key]" [field]="key" /> } @else { <app-result [value]="value[key]" /> }</dd>
        }
      </dl>
    } @else {
      <span>{{ scalar(value) }}</span>
    }
  `,
})
export class Result {
  @Input() value: any;
  @Input() selectable = false;
  @Output() selected = new EventEmitter<Data>();
  isWarehouse(key: string) { return ['warehouseId', 'locationId', 'fromLocationId', 'toLocationId'].includes(key); }
  isTransport(key: string) { return ['vehicleId', 'driverId', 'routeId'].includes(key); }
  isAgency(key: string) { return ['agencyId', 'originAgencyId', 'destinationAgencyId'].includes(key); }
  isReference(key: string) { return ['userId', 'requestedBy', 'supplyId', 'orderId', 'purchaseRequestId', 'purchaseOrderId'].includes(key); }
  label = label;
  isArray = Array.isArray;
  isObject(value: any) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  keys(value: Data) {
    return Object.keys(value).filter(key => !['id', 'deliveryPlanId', 'deliveryAttemptId'].includes(key));
  }
  columns() {
    return Object.keys(this.value[0] ?? {})
      .filter((key) => !['id', 'deliveryPlanId', 'deliveryAttemptId'].includes(key) && !this.isObject(this.value[0][key]) && !Array.isArray(this.value[0][key]))
      .slice(0, 8);
  }
  scalar = display;
}
