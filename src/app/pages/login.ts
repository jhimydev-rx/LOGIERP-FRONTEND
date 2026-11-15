import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api, Session, errorText } from '../core/api';
import { LoginResponse } from '../core/contracts';
@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="login-layout">
      <div class="login-story">
        <a class="brand" href="/login"
          ><img src="/logierp-mark.svg" alt="" width="42" height="42" /><span
            >Logi<span class="brand-accent">ERP</span></span
          ></a
        >
        <div class="login-pitch">
          <span class="eyebrow light">DE ORIGEN A DESTINO</span>
          <h2>Tu operación,<br />siempre en movimiento.</h2>
          <p>
            Conecta tus agencias, organiza tus envíos y acompaña cada entrega desde un solo lugar.
          </p>
        </div>
        <img
          class="login-truck"
          src="/logierp-transport.svg"
          alt="Camión de LogiERP conectando agencias y entregas"
        />
        <div class="login-story-footer">
          <span>Pedidos · Transporte · Entregas</span><span>LOGIERP / OPERACIONES</span>
        </div>
      </div>
      <div class="login-access">
        <div class="login-form-wrap">
          <span class="eyebrow">BIENVENIDO A LOGIERP</span>
          <h1>Iniciar sesión</h1>
          <p class="muted">Ingresa a tu espacio de trabajo.</p>
          <form (ngSubmit)="login()">
            <fieldset [disabled]="busy()">
              <label for="email">Correo</label
              ><input
                id="email"
                name="email"
                type="email"
                [(ngModel)]="email"
                autocomplete="username"
                placeholder="tu@correo.com"
                required
              />
              <label for="password">Contraseña</label
              ><input
                id="password"
                name="password"
                type="password"
                [(ngModel)]="password"
                autocomplete="current-password"
                placeholder="Tu contraseña"
                required
              />
              <button class="primary login-submit" type="submit">
                {{ busy() ? 'Ingresando…' : 'Ingresar' }}<span aria-hidden="true">→</span>
              </button>
            </fieldset>
          </form>
          @if (error()) {
            <p role="alert">{{ error() }}</p>
          }
          <div class="login-help">
            <p>¿Necesitas acceso? Contacta al administrador de tu equipo.</p>
            <button class="text-button" type="button" (click)="health()">Comprobar conexión</button>
            <p role="status">{{ status() }}</p>
          </div>
        </div>
        <small class="login-bottom">LogiERP · Gestión de operaciones logísticas</small>
      </div>
    </section>
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
