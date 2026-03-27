import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  user = signal<any | null>(null);
  token = signal<string | null>(localStorage.getItem('token'));

  constructor(private http: HttpClient) {}

  initUserFromStorage() {
    const token = this.token();
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.user.set({
        _id: payload.id,
        email: payload.email,
      });
    } catch {
      this.clearSession();
    }
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/login`, data, { withCredentials: true }).pipe(
      tap((res) => {
        this.token.set(res.data.token);
        localStorage.setItem('token', res.data.token);
        this.user.set(res.data.user);
      }),
    );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  logout() {
    return this.http
      .post(`${this.baseUrl}/logout`, {}, { withCredentials: true })
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
  }

  isLoggedIn() {
    return !!this.token();
  }
}
