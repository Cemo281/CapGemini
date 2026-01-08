import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

interface LoginResponse { token: string; username?: string; user?: any; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:8080/auth';
  private tokenKey = 'authToken';
  private roleKey = 'userRole';
  private usernameKey = 'userName';
  
  private roleSubject = new BehaviorSubject<string | null>(this.getRoleFromStorage());
  private usernameSubject = new BehaviorSubject<string | null>(this.getUsernameFromStorage());
  
  public role$ = this.roleSubject.asObservable();
  public username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('AuthService initialized. Initial role from localStorage:', this.getRoleFromStorage());
    console.log('AuthService initialized. Initial username from localStorage:', this.getUsernameFromStorage());
  }

  login(username: string, password: string): Observable<void> {
    return this.http.post<LoginResponse>(`${this.api}/login`, { username, password })
      .pipe(map(res => {
        console.log('Login response from backend:', JSON.stringify(res, null, 2));
        console.log('Response keys:', Object.keys(res));
        if (res && res.token) {
          localStorage.setItem(this.tokenKey, res.token);
          // Store username from response
          if (res.username) {
            localStorage.setItem(this.usernameKey, res.username);
            this.usernameSubject.next(res.username);
            console.log('Username from response stored:', res.username);
          }
          // Decode JWT to extract role and username
          this.decodeAndStoreUserData(res.token, res.user);
          console.log('Login successful. Role stored:', this.getRole());
          console.log('Login successful. Username stored:', this.getUsername());
        } else {
          throw new Error('No token in response');
        }
      }));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.usernameKey);
    this.roleSubject.next(null);
    this.usernameSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private getRoleFromStorage(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  private getUsernameFromStorage(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  getRole(): string | null {
    return this.roleSubject.value;
  }

  getUsername(): string | null {
    return this.usernameSubject.value;
  }

  isAdmin(): boolean {
    const role = this.getRole();
    const isAdminUser = role === 'ADMIN' || role === 'admin';
    console.log('Checking admin status - Role:', role, 'Is Admin:', isAdminUser);
    return isAdminUser;
  }

  decodeAndStoreUserData(token: string, userFromResponse?: any) {
    try {
      console.log('decodeAndStoreUserData called with:', { token: token.substring(0, 50) + '...', userFromResponse });
      
      // Otherwise, decode the JWT
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('Invalid token format, expected 3 parts');
        localStorage.setItem(this.roleKey, 'USER');
        this.roleSubject.next('USER');
        return;
      }
      
      // Decode the payload (second part)
      const decoded = JSON.parse(atob(parts[1]));
      console.log('Decoded JWT payload - COMPLETE OBJECT:', JSON.stringify(decoded, null, 2));
      console.log('All keys in decoded JWT:', Object.keys(decoded));
      
      // Extract username from 'sub' (subject) field - this is standard JWT
      const username = decoded.sub || decoded.username || '';
      console.log('Extracted username from JWT:', username);
      if (username) {
        localStorage.setItem(this.usernameKey, username);
        this.usernameSubject.next(username);
        console.log('Username stored in localStorage and BehaviorSubject:', username);
      }
      
      // Try multiple possible field names for role
      let role = decoded.role 
        || decoded.roles 
        || decoded.ROLE
        || decoded.authorities
        || decoded.scope
        || decoded.authorities_list
        || decoded.user_roles
        || 'USER';
      
      console.log('Searched for role in fields: role, roles, ROLE, authorities, scope, authorities_list, user_roles');
      console.log('Found role value:', role);
      
      // If roles is an array, take the first one
      if (Array.isArray(role)) {
        role = role[0];
      }
      
      // Clean up role value (remove ROLE_ prefix if present)
      if (typeof role === 'string') {
        role = role.replace(/^ROLE_/, '').toUpperCase();
      }
      
      console.log('Setting role to localStorage and BehaviorSubject:', role);
      localStorage.setItem(this.roleKey, role);
      console.log('localStorage after set:', localStorage.getItem(this.roleKey));
      this.roleSubject.next(role);
      console.log('BehaviorSubject value after next():', this.roleSubject.value);
      console.log('Role extracted from JWT:', role);
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.setItem(this.roleKey, 'USER');
      this.roleSubject.next('USER');
    }
  }
}
