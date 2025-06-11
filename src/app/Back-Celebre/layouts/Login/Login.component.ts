import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './Login.component.html',
  styleUrl: './Login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  
  // Form data
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  /**
   * Toggle password visibility
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.email && this.password) {
      console.log('Login attempt:', {
        email: this.email,
        password: this.password
      });
      
      // Here you would typically call your authentication service
      // this.authService.login(this.email, this.password);
      
      // For now, just show an alert
      alert('Login functionality would be implemented here!');
    } else {
      alert('Please fill in all fields');
    }
  }

  /**
   * Handle social login
   */
  onSocialLogin(provider: string): void {
    console.log(`${provider} login clicked`);
    alert(`${provider} login would be implemented here!`);
  }
}