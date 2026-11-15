import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { Access, LoginResponse } from './contracts';

const KEY = 'logierp.session';
@Injectable({ providedIn: 'root' })
export class Session {
  user = signal<Access | null>(null);
  token = signal(sessionStorage.getItem(KEY) ?? '');
  save(response: LoginResponse) {
    this.token.set(response.accessToken);
    this.user.set(response.user);
    sessionStorage.setItem(KEY, response.accessToken);
  }
  clear() {
    this.token.set('');
    this.user.set(null);
    sessionStorage.removeItem(KEY);
  }
  permits(permissions: string[]) {
    return permissions.every((permission) => this.user()?.permissions.includes(permission));
  }
}
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const session = inject(Session);
  const router = inject(Router);
  const local = request.url.startsWith('/api/') || request.url.startsWith('/health/');
  const outgoing =
    local && session.token()
      ? request.clone({ setHeaders: { Authorization: `Bearer ${session.token()}` } })
      : request;
  return next(outgoing).pipe(
    catchError((error) => {
      if (local && error.status === 401 && request.url !== '/api/auth/login') {
        session.clear();
        void router.navigateByUrl('/login');
      }
      return throwError(() => error);
    }),
  );
};
@Injectable({ providedIn: 'root' })
export class Api {
  private http = inject(HttpClient);
  async download(path: string): Promise<void> {
    let response;
    try {
      response = await firstValueFrom(
        this.http.get(path, { observe: 'response', responseType: 'blob' }),
      );
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.error instanceof Blob) {
        try {
          const detail = JSON.parse(await error.error.text());
          throw new Error(detail.message ?? detail.title ?? 'No se pudo descargar el archivo.');
        } catch (decoded) {
          if (decoded instanceof Error && !(decoded instanceof SyntaxError)) throw decoded;
        }
      }
      throw error;
    }
    if (!response.body) throw new Error('El archivo todavía no está disponible.');
    const disposition = response.headers.get('Content-Disposition') ?? '';
    const encoded = disposition.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
    const plain = disposition.match(/filename="?([^";]+)"?/i)?.[1];
    let name = path.startsWith('/api/reports/') ? 'reporte.xlsx' : path.endsWith('/cdr') ? 'constancia-cdr.zip' : 'comprobante.xml';
    try {
      name = encoded ? decodeURIComponent(encoded) : plain || name;
    } catch {
      /* Keep safe fallback name. */
    }
    name = name.replace(/[\\/\x00-\x1f]/g, '_');
    const url = URL.createObjectURL(response.body);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  request<T = unknown>(
    method: string,
    path: string,
    body?: unknown,
    query: Record<string, any> = {},
  ): Promise<T> {
    const params = Object.fromEntries(
      Object.entries(query)
        .filter(([, v]) => v !== '' && v !== null && v !== undefined)
        .map(([k, v]) => [k, String(v)]),
    );
    return firstValueFrom(this.http.request<T>(method, path, { body, params }));
  }
}
export function errorText(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0 || error.status === 504)
      return 'No se pudo conectar con la API. Comprueba que esté iniciada en el puerto 5263.';
    if (error.status === 403) return 'Tu cuenta no tiene permiso para esta operación.';
    if (error.status === 429)
      return 'Demasiados intentos. Espera un minuto antes de volver a intentarlo.';
    const body = error.error;
    const details = body?.errors
      ? Object.entries(body.errors)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('\n')
      : '';
    return [body?.message ?? body?.title ?? `Error HTTP ${error.status}`, details]
      .filter(Boolean)
      .join('\n');
  }
  return error instanceof Error ? error.message : 'No se pudo completar la operación.';
}
