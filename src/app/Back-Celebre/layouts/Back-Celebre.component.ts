import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from '../Components/Base/Header/Header.component';
import { SidebarComponent } from '../Components/Base/Sidebar/Sidebar.component';
import { UploadModalComponent } from '../Components/Base/Upload/Upload.component';

@Component({
  selector: 'app-back-celebre',
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, UploadModalComponent],
  templateUrl: './Back-Celebre.component.html',
  styleUrl: './Back-Celebre.component.css'
})
export class BackCelebreComponent {
  sidebarOpen = false;
  uploadModalOpen = false;
  notificationCount = 3;
  
  currentUser = {
    name: 'Usuario',
    avatar: 'https://via.placeholder.com/40x40/6366f1/ffffff?text=U',
    role: 'user' // 'admin' | 'user'
  };

  constructor(private router: Router) {}

  getNavLinks() {
    const currentRoute = this.router.url;
    
    if (this.currentUser.role === 'admin') {
      return [
        { label: 'Dashboard', url: '/app/admin/dashboard', active: currentRoute.includes('/admin/dashboard') },
        { label: 'Analytics', url: '/app/admin/analytics', active: currentRoute.includes('/admin/analytics') },
        { label: 'Users', url: '/app/admin/users', active: currentRoute.includes('/admin/users') }
      ];
    }
    
    return [
      { label: 'Dashboard', url: '/app/dashboard', active: currentRoute === '/app/dashboard' },
      { label: 'Mis Fotos', url: '/app/photos', active: currentRoute.includes('/photos') },
      { label: 'Perfil', url: '/app/profile', active: currentRoute === '/app/profile' }
    ];
  }

  getSidebarSections() {
    if (this.currentUser.role === 'admin') {
      return [
        {
          title: 'Administración',
          items: [
            { icon: '📊', text: 'Dashboard', id: '/app/admin/dashboard', active: this.router.url === '/app/admin/dashboard' },
            { icon: '👥', text: 'Usuarios', id: '/app/admin/users' },
            { icon: '💰', text: 'Ventas', id: '/app/admin/sales' },
            { icon: '📦', text: 'Productos', id: '/app/admin/products' }
          ]
        },
        {
          title: 'Sistema',
          items: [
            { icon: '📈', text: 'Reportes', id: '/app/admin/reports' },
            { icon: '⚙️', text: 'Configuración', id: '/app/admin/settings' }
          ]
        }
      ];
    }
    
    return [
      {
        title: 'Fotos',
        items: [
          { icon: '📊', text: 'Dashboard', id: '/app/dashboard', active: this.router.url === '/app/dashboard' },
          { icon: '📸', text: 'Mis fotos', id: '/app/photos' },
          { icon: '⬆️', text: 'Subir', id: 'upload' },
          { icon: '✅', text: 'Aprobadas', id: '/app/photos/approved' },
          { icon: '⏱️', text: 'Pendientes', id: '/app/photos/pending' },
          { icon: '❌', text: 'Rechazadas', id: '/app/photos/rejected' }
        ]
      },
      {
        title: 'Cuenta',
        items: [
          { icon: '👤', text: 'Perfil', id: '/app/profile' },
          { icon: '⚙️', text: 'Configuración', id: '/app/settings' },
          { icon: '🚪', text: 'Cerrar sesión', id: 'logout' }
        ]
      }
    ];
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  navigate(route: string): void {
    if (route === 'upload') {
      this.uploadModalOpen = true;
    } else if (route === 'logout') {
      this.logout();
    } else {
      this.router.navigate([route]);
    }
    this.closeSidebar();
  }

  goToProfile(): void {
    this.router.navigate(['/app/profile']);
  }

  onNotificationClick(): void {
    // Abrir panel de notificaciones
    console.log('Abrir notificaciones');
  }

  closeUploadModal(): void {
    this.uploadModalOpen = false;
  }

  onFilesUploaded(files: any[]): void {
    console.log('Archivos subidos:', files);
    this.notificationCount++;
  }

  logout(): void {
    // Lógica de logout
    this.router.navigate(['/login']);
  }
}