import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppUser, AuthResponse, LoginRequest, RegisterRequest, RegisterResponse } from '../models/auth.models';

const STORAGE_USER_KEY = 'edu-support-user';
const STORAGE_TOKEN_KEY = 'edu-support-token';
const API_BASE = 'http://localhost:8080/api/v1';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly currentUserState = signal<AppUser | null>(this.readStoredUser());
  private readonly tokenState = signal<string | null>(localStorage.getItem(STORAGE_TOKEN_KEY));

  readonly currentUser = this.currentUserState.asReadonly();
  readonly token = this.tokenState.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUserState() && !!this.tokenState());
  readonly role = computed(() => this.currentUserState()?.role ?? null);

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE}/auth/login`, payload).pipe(
      tap((response) => this.storeSession(response))
    );
  }

  register(payload: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${API_BASE}/auth/register`, payload);
  }

  refreshProfile(): Observable<AppUser> {
    return this.http.get<AppUser>(`${API_BASE}/auth/me`).pipe(
      tap((user) => this.persistUser(user))
    );
  }

  logout(): void {
    this.currentUserState.set(null);
    this.tokenState.set(null);
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
  }

  hasRole(roles: string[]): boolean {
    const role = this.role();
    return role ? roles.includes(this.normalizeRole(role)) || roles.includes(role) : false;
  }

  normalizedRole(): 'student' | 'teacher' | 'admin' | null {
    const role = this.role();
    return role ? this.normalizeRole(role) as 'student' | 'teacher' | 'admin' : null;
  }

  private storeSession(response: AuthResponse): void {
    this.tokenState.set(response.token);
    this.currentUserState.set(response.user);
    localStorage.setItem(STORAGE_TOKEN_KEY, response.token);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(response.user));
  }

  private persistUser(user: AppUser): void {
    this.currentUserState.set(user);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
  }

  private readStoredUser(): AppUser | null {
    const rawUser = localStorage.getItem(STORAGE_USER_KEY);
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as AppUser;
    } catch {
      localStorage.removeItem(STORAGE_USER_KEY);
      return null;
    }
  }

  private normalizeRole(role: string): string {
    return role.replace('ROLE_', '').toLowerCase();
  }
}
