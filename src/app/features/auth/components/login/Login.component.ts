// login.component.ts
import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <div class="login-container">
        <div class="header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>
        
        @if (errorMessage()) {
          <div class="error-message">{{ errorMessage() }}</div>
        }
        
        <form (ngSubmit)="onSubmit()">
          <div class="input-group">
            <input 
              [(ngModel)]="email" 
              name="email"
              type="email" 
              placeholder="Email"
              class="login-input"
              required>
          </div>
          
          <div class="input-group">
            <input 
              [(ngModel)]="password" 
              name="password"
              type="password" 
              placeholder="Password"
              class="login-input"
              required>
          </div>
          
          <button type="submit" [disabled]="isLoading()" class="signin-button">
            {{ isLoading() ? 'Signing in...' : 'Sign In' }}
          </button>
          
          <div class="signup-link">
            Don't have an account? 
            <a (click)="goToRegister()">Create one here</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./Login.component.css'] // Reutiliza los estilos del register
})
export class LoginComponent {
  private router = inject(Router);
  private http = inject(HttpClient);

  email = '';
  password = '';
  isLoading = signal(false);
  errorMessage = signal('');

  async onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const loginData = {
      email: this.email.trim().toLowerCase(),
      password: this.password
    };

    try {
      const response = await this.http.post<any>(
        `${environment.apiUrl}/auth/login`,
        loginData  // Cambiar aquí
      ).toPromise();
      console.log('Login successful:', response);
      
      // Guardar token
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      alert(`¡Bienvenido ${response.user.nombre}!`);
      this.router.navigate(['/app/dashboard']);
      
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMsg = error.error?.message || 'Error en el login';
      this.errorMessage.set(errorMsg);
    } finally {
      this.isLoading.set(false);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}