import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PhotoActivity {
  photoTitle: string;
  photoThumbnail: string;
  uploadDate: Date;
  status: 'aprobada' | 'pendiente' | 'rechazada';
  category: string;
}

@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule],
  templateUrl: './UserDashboard.component.html',
  styleUrl: './UserDashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDashboardComponent {
  // Control del sidebar móvil
  sidebarOpen = false;

  // Estadísticas de fotos del usuario
  totalPhotos = 147;
  approvedPhotos = 89;
  pendingPhotos = 23;
  rejectedPhotos = 35;

  // Calcular porcentajes
  get approvalRate(): number {
    return this.totalPhotos > 0 ? 
      Math.round((this.approvedPhotos / this.totalPhotos) * 100) : 0;
  }

  get rejectionRate(): number {
    return this.totalPhotos > 0 ? 
      Math.round((this.rejectedPhotos / this.totalPhotos) * 100) : 0;
  }

  // Actividad reciente de fotos
  recentPhotoActivity: PhotoActivity[] = [
    {
      photoTitle: 'Atardecer en la playa',
      photoThumbnail: 'https://via.placeholder.com/60x60/6366f1/ffffff?text=📸',
      uploadDate: new Date('2025-06-20T14:30:00'),
      status: 'aprobada',
      category: 'Naturaleza'
    },
    {
      photoTitle: 'Arquitectura moderna',
      photoThumbnail: 'https://via.placeholder.com/60x60/8b5cf6/ffffff?text=🏢',
      uploadDate: new Date('2025-06-20T11:15:00'),
      status: 'pendiente',
      category: 'Arquitectura'
    },
    {
      photoTitle: 'Retrato familiar',
      photoThumbnail: 'https://via.placeholder.com/60x60/10b981/ffffff?text=👨‍👩‍👧‍👦',
      uploadDate: new Date('2025-06-20T09:45:00'),
      status: 'aprobada',
      category: 'Retratos'
    },
    {
      photoTitle: 'Paisaje urbano',
      photoThumbnail: 'https://via.placeholder.com/60x60/f59e0b/ffffff?text=🌆',
      uploadDate: new Date('2025-06-19T16:20:00'),
      status: 'rechazada',
      category: 'Urbano'
    },
    {
      photoTitle: 'Macro de flor',
      photoThumbnail: 'https://via.placeholder.com/60x60/ef4444/ffffff?text=🌸',
      uploadDate: new Date('2025-06-19T13:10:00'),
      status: 'aprobada',
      category: 'Macro'
    }
  ];

  constructor() {}

  // Métodos para controlar el sidebar móvil
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  // Métodos para navegación
  viewAllPhotos(): void {
    console.log('Navegando a todas las fotos...');
  }

  uploadNewPhoto(): void {
    console.log('Navegando a subir nueva foto...');
  }

  navigateToSection(section: string): void {
    console.log(`Navegando a: ${section}`);
  }

  // Método para búsqueda
  onSearch(query: string): void {
    console.log(`Buscando fotos: ${query}`);
  }

  // Filtrar fotos por estado
  filterPhotosByStatus(status: 'aprobada' | 'pendiente' | 'rechazada'): void {
    console.log(`Filtrando fotos por estado: ${status}`);
  }
}