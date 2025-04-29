import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  link: string;
  active?: boolean;
}

@Component({
  selector: 'Back-Celebre-Navbar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './Navbar.component.html',
  styleUrl: './Navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  // Menu items data
  menuItems: MenuItem[] = [
    { 
      icon: 'dashboard', 
      label: 'Dashboard', 
      link: '/dashboard', 
      active: true 
    },
    { 
      icon: 'food', 
      label: 'Food Order', 
      link: '/food-order',
      active: false
    },
    { 
      icon: 'menu', 
      label: 'Manage Menu', 
      link: '/manage-menu',
      active: false
    },
    { 
      icon: 'users', 
      label: 'Customer Review', 
      link: '/customer-review',
      active: false
    }
  ];

  // Other items data
  otherItems: MenuItem[] = [
    { 
      icon: 'settings', 
      label: 'Settings', 
      link: '/settings',
      active: false
    },
    { 
      icon: 'payment', 
      label: 'Payment', 
      link: '/payment',
      active: false
    },
    { 
      icon: 'accounts', 
      label: 'Accounts', 
      link: '/accounts',
      active: false
    },
    { 
      icon: 'help', 
      label: 'Help', 
      link: '/help',
      active: false
    }
  ];

  // Method to set active menu item
  setActive(menuType: string, index: number): void {
    if (menuType === 'menu') {
      this.menuItems.forEach((item, i) => {
        item.active = i === index;
      });
      // Reset other menu when main menu is selected
      this.otherItems.forEach(item => {
        item.active = false;
      });
    } else {
      this.otherItems.forEach((item, i) => {
        item.active = i === index;
      });
      // Reset main menu when other menu is selected
      this.menuItems.forEach(item => {
        item.active = false;
      });
    }
  }

 }
