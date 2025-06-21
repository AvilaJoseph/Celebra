import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './Register.component.html',
  styleUrl: './Register.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  
  // Form data
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  /**
   * Toggle password visibility
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggle confirm password visibility
   */
  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.firstName && this.lastName && this.email && this.phone && this.password && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      console.log('Register attempt:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        password: this.password
      });
      
      // Here you would typically call your registration service
      // this.authService.register(this.firstName, this.lastName, this.email, this.phone, this.password);
      
      // For now, just show an alert
      alert('Registration functionality would be implemented here!');
    } else {
      alert('Please fill in all fields');
    }
  }

  /**
   * Handle back to login
   */
  onBackToLogin(event: Event): void {
    event.preventDefault();
    console.log('Back to login clicked');
    alert('Navigation to login would be implemented here!');
  }
}