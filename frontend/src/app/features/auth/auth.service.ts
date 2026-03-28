import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5000/api';

  user = signal<any | null>(null);
  token = signal<string | null>(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  initUserFromStorage() {
    const token = this.token();
    const user = localStorage.getItem('user');
    if (!token || !user) return;

    try {
      this.user.set(JSON.parse(user));
    } catch {
      this.clearSession();
    }
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data, { withCredentials: true }).pipe(
      tap((res) => {
        this.token.set(res.data.token);
        localStorage.setItem('token', res.data.token);
        this.user.set(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }),
    );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, data);
  }

  getProfile() {
    return this.http.get<any>(`${this.baseUrl}/profile`).pipe(
      tap((res) => {
        this.user.set(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data));
      }),
    );
  }

  logout() {
    return this.http
      .post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.clearSession()));
  }

  getCurrentUserId(): string {
    console.log('USER: __', this.user());
    return this.user()?._id || '';
  }

  private clearSession() {
    this.token.set(null);
    this.user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn() {
    return !!this.token();
  }
}
