import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthResponse {
  message: string;
  session: { access_token: string };
  user: { email: string };
}

export interface RegisterPayload {
  email?: string | null;
  password?: string | null;
  username?: string | null;
}

export interface LoginPayload {
  email?: string | null;
  password?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  register(data: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((res) => {
        if (res.session?.access_token) {
          this.setToken(res.session.access_token);
        }
      }),
    );
  }

  login(data: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((res) => {
        if (res.session?.access_token) {
          this.setToken(res.session.access_token);
        }
      }),
    );
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('kachaoo_auth_token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('kachaoo_auth_token');
    }
    return null;
  }

  getUsername(): string {
    const token = this.getToken();
    if (!token) {
      return 'Usuario';
    }
    try {
      const payloadBase64Url = token.split('.')[1];
      const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payloadJson = decodeURIComponent(
        atob(payloadBase64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );
      const payload = JSON.parse(payloadJson);
      return payload.user_metadata?.username || payload.email?.split('@')[0] || 'Usuario';
    } catch {
      return 'Usuario';
    }
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const payloadBase64Url = token.split('.')[1];
      const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payloadJson = decodeURIComponent(
        atob(payloadBase64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );
      const payload = JSON.parse(payloadJson);
      return payload.sub || null;
    } catch {
      return null;
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('kachaoo_auth_token');
    }
  }
}
