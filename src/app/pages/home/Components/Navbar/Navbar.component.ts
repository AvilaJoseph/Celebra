import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'Home-Celebra-Navbar',
  imports: [
    CommonModule
  ],
  templateUrl: './Navbar.component.html',
  styleUrl: './Navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent { 

  // Desktop menu states
  showHomeModal = false;
  showSettingsModal = false;

  // Mobile menu states
  showMobileMenu = false;
  showHomeSubmenu = false;
  showSettingsSubmenu = false;

  /**
   * Toggle mobile menu visibility
   */
  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    
    // Close submenus when closing main menu
    if (!this.showMobileMenu) {
      this.closeAllSubmenus();
    }
    
    // Prevent body scroll when menu is open
    this.handleBodyScroll();
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu(): void {
    this.showMobileMenu = false;
    this.closeAllSubmenus();
    this.handleBodyScroll();
  }

  /**
   * Toggle Home submenu in mobile
   */
  toggleHomeSubmenu(): void {
    this.showHomeSubmenu = !this.showHomeSubmenu;
    
    // Close other submenus
    if (this.showHomeSubmenu) {
      this.showSettingsSubmenu = false;
    }
  }

  /**
   * Toggle Settings submenu in mobile
   */
  toggleSettingsSubmenu(): void {
    this.showSettingsSubmenu = !this.showSettingsSubmenu;
    
    // Close other submenus
    if (this.showSettingsSubmenu) {
      this.showHomeSubmenu = false;
    }
  }

  /**
   * Close all mobile submenus
   */
  private closeAllSubmenus(): void {
    this.showHomeSubmenu = false;
    this.showSettingsSubmenu = false;
  }

  /**
   * Handle body scroll based on menu state
   */
  private handleBodyScroll(): void {
    if (typeof document !== 'undefined') {
      if (this.showMobileMenu) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }
    }
  }

  /**
   * Handle window resize to close mobile menu on desktop
   */
  onWindowResize(): void {
    if (window.innerWidth > 768 && this.showMobileMenu) {
      this.closeMobileMenu();
    }
  }

  constructor() {
    // Listen for window resize events
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.onWindowResize());
    }
  }

  ngOnDestroy(): void {
    // Clean up event listener and reset body scroll
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', () => this.onWindowResize());
    }
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }
}