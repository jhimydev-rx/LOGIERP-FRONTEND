import { inject } from '@angular/core';
import { Routes, CanActivateFn, Router } from '@angular/router';
import { Api, Session } from './core/api';
import { Access } from './core/contracts';
const authenticated: CanActivateFn = async () => {
  const session = inject(Session);
  const api = inject(Api);
  const router = inject(Router);
  if (!session.token()) return router.createUrlTree(['/login']);
  try {
    session.user.set(await api.request<Access>('GET', '/api/auth/me'));
    return true;
  } catch {
    session.clear();
    return router.createUrlTree(['/login']);
  }
};
export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login').then((m) => m.Login) },
  {
    path: 'dashboard',
    canActivate: [authenticated],
    loadComponent: () => import('./pages/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'modulos/:module',
    canActivate: [authenticated],
    loadComponent: () => import('./pages/workspace').then((m) => m.Workspace),
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'dashboard' },
];
