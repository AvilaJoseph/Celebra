import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  template: `
    <header class="dashboard-header">
      <div class="header-left">
        <button class="mobile-menu-btn" (click)="toggleMobileMenu()">
          <span class="hamburger"></span>
        </button>
        <h1 class="logo">{{title}}</h1>
        <nav class="header-nav">
          <a *ngFor="let link of navLinks" 
             [href]="link.url" 
             class="nav-link"
             [class.active]="link.active">
            {{link.label}}
          </a>
        </nav>
      </div>
      <div class="header-right">
        <div class="search-box" *ngIf="showSearch">
          <input type="text" 
                 [placeholder]="searchPlaceholder" 
                 class="search-input"
                 (input)="onSearch($event)">
          <span class="search-icon">🔍</span>
        </div>
        <div class="notifications" (click)="onNotificationClick()">
          <span class="notification-icon">🔔</span>
          <span class="notification-badge" *ngIf="notificationCount > 0">
            {{notificationCount}}
          </span>
        </div>
        <div class="user-profile" (click)="onProfileClick()">
          <img [src]="userAvatar" [alt]="userName" class="profile-img">
          <span class="username">{{userName}}</span>
        </div>
      </div>
    </header>
  `,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() title = 'Back Celebre';
  @Input() userName = 'Usuario';
  @Input() userAvatar = 'https://via.placeholder.com/40x40/6366f1/ffffff?text=U';
  @Input() notificationCount = 0;
  @Input() showSearch = true;
  @Input() searchPlaceholder = 'Buscar...';
  @Input() navLinks: Array<{label: string, url: string, active: boolean}> = [];

  @Output() mobileMenuToggle = new EventEmitter<void>();
  @Output() searchQuery = new EventEmitter<string>();
  @Output() notificationClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();

  toggleMobileMenu(): void {
    this.mobileMenuToggle.emit();
  }

  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.emit(query);
  }

  onNotificationClick(): void {
    this.notificationClick.emit();
  }

  onProfileClick(): void {
    this.profileClick.emit();
  }
}