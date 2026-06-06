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
    localStorage.setItem('kachaoo_auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('kachaoo_auth_token');
  }

  logout(): void {
    localStorage.removeItem('kachaoo_auth_token');
  }
}
