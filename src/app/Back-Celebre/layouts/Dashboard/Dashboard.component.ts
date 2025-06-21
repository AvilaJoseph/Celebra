import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RecentActivity {
  customerName: string;
  customerAvatar: string;
  product: string;
  date: Date;
  status: 'completado' | 'pendiente' | 'cancelado';
  amount: number;
}

@Component({
  selector: 'Back-Celebre-Dashboard',
  imports: [
    CommonModule
  ],
  templateUrl: './Dashboard.component.html',
  styleUrl: './Dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  // Control del sidebar móvil
  sidebarOpen = false;

  // Estadísticas principales
  totalRevenue = 847293;
  totalUsers = 12847;
  totalOrders = 1247;
  conversionRate = 3.2;

  // Datos de actividad reciente
  recentActivity: RecentActivity[] = [
    {
      customerName: 'María González',
      customerAvatar: 'https://via.placeholder.com/32x32/6366f1/ffffff?text=MG',
      product: 'iPhone 15 Pro',
      date: new Date('2025-06-20T14:30:00'),
      status: 'completado',
      amount: 1299.99
    },
    {
      customerName: 'Carlos Rodríguez',
      customerAvatar: 'https://via.placeholder.com/32x32/8b5cf6/ffffff?text=CR',
      product: 'MacBook Air M3',
      date: new Date('2025-06-20T11:15:00'),
      status: 'pendiente',
      amount: 1499.00
    },
    {
      customerName: 'Ana López',
      customerAvatar: 'https://via.placeholder.com/32x32/10b981/ffffff?text=AL',
      product: 'Samsung Galaxy S24',
      date: new Date('2025-06-20T09:45:00'),
      status: 'completado',
      amount: 899.99
    },
    {
      customerName: 'Luis Martínez',
      customerAvatar: 'https://via.placeholder.com/32x32/f59e0b/ffffff?text=LM',
      product: 'iPad Pro 12.9"',
      date: new Date('2025-06-19T16:20:00'),
      status: 'cancelado',
      amount: 1099.00
    },
    {
      customerName: 'Carmen Vega',
      customerAvatar: 'https://via.placeholder.com/32x32/ef4444/ffffff?text=CV',
      product: 'AirPods Pro 2',
      date: new Date('2025-06-19T13:10:00'),
      status: 'completado',
      amount: 249.99
    },
    {
      customerName: 'Diego Herrera',
      customerAvatar: 'https://via.placeholder.com/32x32/06b6d4/ffffff?text=DH',
      product: 'Apple Watch Series 9',
      date: new Date('2025-06-19T10:30:00'),
      status: 'pendiente',
      amount: 429.00
    },
    {
      customerName: 'Isabella Torres',
      customerAvatar: 'https://via.placeholder.com/32x32/8b5cf6/ffffff?text=IT',
      product: 'Sony WH-1000XM5',
      date: new Date('2025-06-18T15:45:00'),
      status: 'completado',
      amount: 349.99
    }
  ];

  constructor() {
    // Inicialización del componente si es necesaria
  }

  // Métodos para controlar el sidebar móvil
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  // Métodos para filtros de gráficos (si se necesitan en el futuro)
  setTimeFilter(filter: '7D' | '30D' | '90D'): void {
    // Lógica para cambiar el filtro de tiempo
    console.log(`Filtro seleccionado: ${filter}`);
  }

  // Método para navegar a todas las actividades
  viewAllActivities(): void {
    // Lógica para mostrar todas las actividades
    console.log('Navegando a todas las actividades...');
  }

  // Método para manejar clicks en el menú del sidebar
  navigateToSection(section: string): void {
    // Lógica de navegación
    console.log(`Navegando a: ${section}`);
  }

  // Método para búsqueda (si se implementa)
  onSearch(query: string): void {
    // Lógica de búsqueda
    console.log(`Buscando: ${query}`);
  }
}