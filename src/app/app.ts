import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { Session, Api, errorText } from './core/api';
import { MODULES, OPERATIONS } from './data/api-contract';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  template: `
    @if (session.user(); as user) {
      <a class="skip-link" href="#main-content">Saltar al contenido</a>
      <header class="topbar">
        <a class="brand" routerLink="/dashboard" aria-label="LogiERP, inicio"
          ><img src="/logierp-mark.svg" alt="" width="34" height="34" /><span
            >Logi<span class="brand-accent">ERP</span></span
          ></a
        >
        <span class="topbar-caption">GESTIÓN LOGÍSTICA</span>
        <div class="topbar-user">
          <span class="avatar">{{ user.fullName.slice(0, 1).toUpperCase() }}</span>
          <div>
            <strong>{{ user.fullName }}</strong
            ><small>{{ user.roles?.join(' · ') }}</small>
          </div>
          <button class="logout" type="button" [disabled]="busy()" (click)="logout()">
            Cerrar sesión
          </button>
        </div>
        <button
          type="button"
          class="menu-toggle"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="module-navigation"
          (click)="menuOpen.set(!menuOpen())"
        >
          Menú
        </button>
      </header>
    }
    <div [class.layout]="session.user()" [class.guest-layout]="!session.user()">
      @if (session.user()) {
        <aside [class.mobile-open]="menuOpen()" id="module-navigation">
          <div class="nav-label">ESPACIO DE TRABAJO</div>
          <label class="sr-only" for="module-search">Buscar módulo</label
          ><input
            id="module-search"
            class="module-search"
            placeholder="Buscar módulo…"
            [(ngModel)]="search"
          />
          <nav class="module-nav" aria-label="Módulos">
            <a class="dashboard-link" routerLink="/dashboard" routerLinkActive="active"
              ><span aria-hidden="true">▦</span> Dashboard</a
            >
            @if (session.permits(['SALES:READ']) || session.permits(['CASH:READ']) || session.permits(['PURCHASING:READ'])) {
              <a class="dashboard-link" routerLink="/reportes" routerLinkActive="active">Reportes Excel</a>
            }
            @for (group of groups; track group.id) {
              @if (modules(group).length) {
                <section class="nav-group">
                  <button type="button" class="nav-group-toggle"
                    [class.current-group]="activeGroup() === group.id"
                    [attr.aria-expanded]="isOpen(group.id)"
                    [attr.aria-controls]="'nav-' + group.id" (click)="toggle(group.id)">
                    <span class="group-symbol" aria-hidden="true">{{ group.symbol }}</span>
                    <span>{{ group.name }}</span><span class="group-chevron" aria-hidden="true">{{ isOpen(group.id) ? '−' : '+' }}</span>
                  </button>
                  <div class="nav-group-links" [id]="'nav-' + group.id" [hidden]="!isOpen(group.id)">
                    @for (module of modules(group); track module.id) {
                      <a [routerLink]="['/modulos', module.id]" routerLinkActive="active" ariaCurrentWhenActive="page">{{ module.name }}</a>
                    }
                  </div>
                </section>
              }
            }
            @if (search.trim() && !hasMatches()) {
              <p class="nav-empty">No encontramos ese módulo.</p>
            }
          </nav>
          <div class="sidebar-foot">
            <a routerLink="/modulos/cuenta" routerLinkActive="active" ariaCurrentWhenActive="page">Mi cuenta <span aria-hidden="true">↗</span></a>
            <small>LogiERP · Gestión logística</small>
          </div>
        </aside>
      }
      <main id="main-content">
        @if (error()) {
          <p role="alert">{{ error() }}</p>
        }
        <router-outlet />
      </main>
    </div>
  `,
})
export class App {
  session = inject(Session);
  api = inject(Api);
  router = inject(Router);
  busy = signal(false);
  error = signal('');
  menuOpen = signal(false);
  search = '';
  expanded = signal('operacion');
  activeGroup = signal('');
  groups = [
    { id: 'operacion', name: 'Operación', symbol: '↗', ids: ['pedidos', 'recepcion', 'entregas'] },
    { id: 'transporte', name: 'Transporte', symbol: '⇄', ids: ['viajes', 'rutas', 'vehiculos', 'conductores'] },
    { id: 'ventas', name: 'Ventas y facturación', symbol: '▤', ids: ['cotizaciones', 'ventas', 'sunat', 'tarifas', 'series'] },
    { id: 'caja', name: 'Caja', symbol: '▣', ids: ['sesiones-caja', 'cajas'] },
    { id: 'compras', name: 'Compras', symbol: '□', ids: ['solicitudes', 'compras', 'proveedores', 'suministros'] },
    { id: 'administracion', name: 'Administración', symbol: '▦', ids: ['agencias', 'almacenes', 'ubicaciones', 'configuracion', 'catalogos', 'geografia'] },
    { id: 'seguridad', name: 'Seguridad', symbol: '◇', ids: ['usuarios', 'roles', 'permisos', 'auditoria'] },
  ];
  constructor() {
    this.syncNavigation(this.router.url);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuOpen.set(false);
        this.search = '';
        this.syncNavigation(event.urlAfterRedirects);
      }
    });
  }
  private syncNavigation(url: string) {
    const id = url.split('?')[0].split('/')[2];
    const group = this.groups.find(group => group.ids.includes(id));
    this.activeGroup.set(group?.id ?? '');
    if (group) this.expanded.set(group.id);
  }
  private normalize(value: string) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();
  }
  modules(group: { name: string; ids: string[] }) {
    const search = this.normalize(this.search);
    return group.ids.flatMap(id => MODULES.filter(module => module.id === id)).filter(module =>
      (!search || this.normalize(module.name + ' ' + group.name).includes(search)) &&
      OPERATIONS.some(op => op.module === module.id && op.path !== '/api/auth/login' && this.session.permits(op.permissions)));
  }
  hasMatches() { return this.groups.some(group => this.modules(group).length > 0); }
  isOpen(id: string) { return Boolean(this.search.trim()) || this.expanded() === id; }
  toggle(id: string) {
    if (this.search.trim()) this.search = '';
    this.expanded.set(this.expanded() === id ? '' : id);
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
