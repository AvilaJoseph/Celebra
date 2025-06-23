import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signals (como useState en React)
  private userSignal = signal<User | null>(null);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);

  // Computed values (como useMemo en React)
  readonly user = this.userSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.userSignal());
  readonly isAdmin = computed(() => this.userSignal()?.rol === 'admin');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuth();
  }

  // Hook pattern: useAuth
  useAuth() {
    return {
      user: this.user,
      loading: this.loading,
      error: this.error,
      isAuthenticated: this.isAuthenticated,
      isAdmin: this.isAdmin,
      login: this.login.bind(this),
      register: this.register.bind(this),
      logout: this.logout.bind(this),
      clearError: this.clearError.bind(this)
    };
  }

  private initializeAuth() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.loadingSignal.set(true);
      this.getProfile().subscribe({
        next: (response) => {
          this.userSignal.set(response.user);
          this.loadingSignal.set(false);
        },
        error: () => {
          this.logout();
          this.loadingSignal.set(false);
        }
      });
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.post<AuthResponse>(`${environment.api.baseUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.setSession(response);
          this.userSignal.set(response.user);
          this.loadingSignal.set(false);
          this.router.navigate(['/app/dashboard']);
        }),
        catchError(error => {
          this.errorSignal.set(error.error?.message || 'Error en el login');
          this.loadingSignal.set(false);
          return of(error);
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.http.post<AuthResponse>(`${environment.api.baseUrl}/auth/register`, userData)
      .pipe(
        tap(response => {
          this.setSession(response);
          this.userSignal.set(response.user);
          this.loadingSignal.set(false);
          this.router.navigate(['/app/dashboard']);
        }),
        catchError(error => {
          this.errorSignal.set(error.error?.message || 'Error en el registro');
          this.loadingSignal.set(false);
          return of(error);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.userSignal.set(null);
    this.errorSignal.set(null);
    this.router.navigate(['/login']);
  }

  private getProfile(): Observable<{user: User}> {
    return this.http.get<{user: User}>(`${environment.api.baseUrl}/auth/profile`);
  }

  private setSession(authResult: AuthResponse) {
    localStorage.setItem('access_token', authResult.access_token);
  }

  private clearError() {
    this.errorSignal.set(null);
  }
}