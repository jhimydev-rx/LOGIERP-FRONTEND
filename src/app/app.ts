import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Session, Api, errorText } from './core/api';
import { MODULES, OPERATIONS } from './data/api-contract';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <a routerLink="/dashboard">LogiERP</a>
      @if (session.user(); as user) {
        <span> · {{ user.fullName }} · {{ user.email }}</span>
        <button type="button" [disabled]="busy()" (click)="logout()">Cerrar sesión</button>
      }
    </header>
    @if (error()) {
      <p role="alert">{{ error() }}</p>
    }
    <div class="layout">
      @if (session.user()) {
        <aside>
          <nav aria-label="Módulos">
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            @for (group of groups; track group) {
              <details open>
                <summary>{{ group }}</summary>
                @for (module of modules(group); track module.id) {
                  <a [routerLink]="['/modulos', module.id]" routerLinkActive="active">{{
                    module.name
                  }}</a>
                }
              </details>
            }
          </nav>
        </aside>
      }
      <main><router-outlet /></main>
    </div>
  `,
})
export class App {
  session = inject(Session);
  api = inject(Api);
  router = inject(Router);
  busy = signal(false);
  error = signal('');
  groups = [...new Set(MODULES.filter((m) => m.id !== 'dashboard').map((m) => m.group))];
  modules(group: string) {
    return MODULES.filter(
      (m) =>
        m.group === group &&
        m.id !== 'dashboard' &&
        OPERATIONS.some(
          (op) =>
            op.module === m.id &&
            op.path !== '/api/auth/login' &&
            this.session.permits(op.permissions),
        ),
    );
  }
  async logout() {
    this.busy.set(true);
    this.error.set('');
    try {
      await this.api.request('POST', '/api/auth/logout');
      this.session.clear();
      await this.router.navigateByUrl('/login');
    } catch (error) {
      this.error.set(errorText(error));
    } finally {
      this.busy.set(false);
    }
  }
}
