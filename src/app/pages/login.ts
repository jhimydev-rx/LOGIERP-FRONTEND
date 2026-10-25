import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api, Session, errorText } from '../core/api';
import { LoginResponse } from '../core/contracts';
@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1>LogiERP · Iniciar sesión</h1>
    <form (ngSubmit)="login()">
      <fieldset [disabled]="busy()">
        <label for="email">Correo</label
        ><input
          id="email"
          name="email"
          type="email"
          [(ngModel)]="email"
          autocomplete="username"
          required
        />
        <label for="password">Contraseña</label
        ><input
          id="password"
          name="password"
          type="password"
          [(ngModel)]="password"
          autocomplete="current-password"
          required
        />
        <button type="submit">{{ busy() ? 'Ingresando…' : 'Ingresar' }}</button>
      </fieldset>
    </form>
    @if (error()) {
      <p role="alert">{{ error() }}</p>
    }
    <button type="button" (click)="health()">Comprobar conexión</button>
    <p role="status">{{ status() }}</p>
  `,
})
export class Login {
  api = inject(Api);
  session = inject(Session);
  router = inject(Router);
  email = '';
  password = '';
  busy = signal(false);
  error = signal('');
  status = signal('');
  async login() {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    try {
      const response = await this.api.request<LoginResponse>('POST', '/api/auth/login', {
        email: this.email,
        password: this.password,
      });
      this.session.save(response);
      this.password = '';
      await this.router.navigateByUrl('/dashboard');
    } catch (error) {
      this.error.set(errorText(error));
    } finally {
      this.busy.set(false);
    }
  }
  async health() {
    try {
      await this.api.request('GET', '/health/live');
      this.status.set('API disponible.');
    } catch (error) {
      this.status.set(errorText(error));
    }
  }
}
