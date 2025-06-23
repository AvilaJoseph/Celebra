// Register.component.ts
import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './Register.component.html',
  styleUrl: './Register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private router = inject(Router);
  private http = inject(HttpClient);

  // Form data usando signals para mejor performance
  firstName = signal('');
  lastName = signal('');
  email = signal('');
  phone = signal('');
  password = signal('');
  confirmPassword = signal('');
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  /**
   * Toggle password visibility
   */
  togglePassword(): void {
    this.showPassword.update(value => !value);
  }

  /**
   * Toggle confirm password visibility
   */
  toggleConfirmPassword(): void {
    this.showConfirmPassword.update(value => !value);
  }

  /**
   * Validate form data
   */
  private validateForm(): boolean {
    const errors: string[] = [];

    if (!this.firstName().trim()) errors.push('First name is required');
    if (!this.lastName().trim()) errors.push('Last name is required');
    if (!this.email().trim()) errors.push('Email is required');
    if (!this.phone().trim()) errors.push('Phone number is required');
    if (!this.password()) errors.push('Password is required');
    if (!this.confirmPassword()) errors.push('Confirm password is required');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.email() && !emailRegex.test(this.email())) {
      errors.push('Please enter a valid email address');
    }

    // Phone validation (basic)
    const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
    if (this.phone() && !phoneRegex.test(this.phone())) {
      errors.push('Please enter a valid phone number');
    }

    // Password validation
    if (this.password() && this.password().length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    // Password confirmation
    if (this.password() !== this.confirmPassword()) {
      errors.push('Passwords do not match');
    }

    if (errors.length > 0) {
      this.errorMessage.set(errors.join(', '));
      return false;
    }

    this.errorMessage.set('');
    return true;
  }

  /**
   * Handle form submission
   */
  async onSubmit(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const registerData = {
      email: this.email().trim().toLowerCase(),
      password: this.password(),
      nombre: `${this.firstName().trim()} ${this.lastName().trim()}`,
      telefono: this.phone().trim()
    };

    try {
      const response = await this.http.post<any>(
        `${environment.apiUrl}/auth/register`,
        registerData  // Cambiar aquí
      ).toPromise();
      
      console.log('Registration successful:', response);
      alert(`¡Registro exitoso! Bienvenido ${response.user.nombre}`);
      this.router.navigate(['/app/dashboard']);
    } 
      catch (error: any) {
      console.error('Registration error:', error);
      const errorMsg = error.error?.message || 'Error en el registro';
      this.errorMessage.set(errorMsg);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Handle back to login
   */
  onBackToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  /**
   * Update form field values
   */
  updateFirstName(value: string): void {
    this.firstName.set(value);
  }

  updateLastName(value: string): void {
    this.lastName.set(value);
  }

  updateEmail(value: string): void {
    this.email.set(value);
  }

  updatePhone(value: string): void {
    this.phone.set(value);
  }

  updatePassword(value: string): void {
    this.password.set(value);
  }

  updateConfirmPassword(value: string): void {
    this.confirmPassword.set(value);
  }
}