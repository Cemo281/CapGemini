import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface LoginResponse { token: string; username?: string; role?: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:8080/auth';
  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private usernameKey = 'username';

  constructor(private http: HttpClient) {
    // Try to initialize role from server if token exists but role is missing
    if (this.getToken() && !this.getRawRole()) {
      this.fetchCurrentUserRole();
    }
  }

  login(username: string, password: string): Observable<void> {
    return this.http.post<LoginResponse>(`${this.api}/login`, { username, password })
      .pipe(map(res => {
        if (res && res.token) {
          localStorage.setItem(this.tokenKey, res.token);
          if (res.role) {
            localStorage.setItem(this.roleKey, res.role);
          }
          // Prefer server-provided username when present; otherwise fallback to the submitted username
          const usernameToStore = (res && res.username) ? res.username : username;
          localStorage.setItem(this.usernameKey, usernameToStore);
        } else {
          throw new Error('No token in response');
        }
      }));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.usernameKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // raw stored role (may be null)
  private getRawRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  // normalized role (uppercase, trimmed) or null
  getRole(): string | null {
    const r = this.getRawRole();
    return r ? r.toUpperCase().trim() : null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  getUsername(): string | null {
    const u = localStorage.getItem(this.usernameKey);
    return u ? u : null;
  }

  // Attempt to get user info (including role) from server using token
  fetchCurrentUserRole() {
    this.http.get<LoginResponse>(`${this.api}/me`).subscribe({
      next: (res) => {
        if (res && res.role) {
          localStorage.setItem(this.roleKey, res.role);
        }
        if (res && res.username) {
          localStorage.setItem(this.usernameKey, res.username);
        }
      },
      error: (err) => {
        console.warn('Failed to fetch current user role', err);
      }
    });
  }
} 
