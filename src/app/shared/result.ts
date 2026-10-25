import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Data } from '../core/contracts';
import { label } from '../core/schema';

@Component({
  selector: 'app-result',
  standalone: true,
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
                    <td>{{ scalar(row[key]) }}</td>
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
          <dd><app-result [value]="value[key]" /></dd>
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
  label = label;
  isArray = Array.isArray;
  isObject(value: any) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  keys(value: Data) {
    return Object.keys(value);
  }
  columns() {
    return Object.keys(this.value[0] ?? {})
      .filter((key) => !this.isObject(this.value[0][key]) && !Array.isArray(this.value[0][key]))
      .slice(0, 8);
  }
  scalar(value: any) {
    return value === null || value === undefined
      ? '—'
      : typeof value === 'boolean'
        ? value
          ? 'Sí'
          : 'No'
        : String(value);
  }
}
