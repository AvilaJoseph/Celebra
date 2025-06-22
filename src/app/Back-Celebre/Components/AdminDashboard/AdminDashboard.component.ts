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
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './AdminDashboard.component.html',
  styleUrl: './AdminDashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {
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

  // Métodos para filtros de gráficos
  setTimeFilter(filter: '7D' | '30D' | '90D'): void {
    console.log(`Filtro seleccionado: ${filter}`);
    // Aquí implementarías la lógica para cambiar los datos del gráfico
  }

  // Método para navegar a todas las actividades
  viewAllActivities(): void {
    console.log('Navegando a todas las actividades...');
    // Lógica para mostrar todas las actividades
  }

  // Método para manejar clicks en métricas
  onStatClick(statType: string): void {
    console.log(`Click en métrica: ${statType}`);
    // Lógica para mostrar detalles de la métrica
  }

  // Método para exportar datos
  exportData(): void {
    console.log('Exportando datos...');
    // Lógica para exportar reportes
  }

  // Método para gestionar usuarios
  manageUsers(): void {
    console.log('Gestionando usuarios...');
    // Navegar a gestión de usuarios
  }

  // Método para gestionar productos
  manageProducts(): void {
    console.log('Gestionando productos...');
    // Navegar a gestión de productos
  }

  // Getter para calcular métricas adicionales
  get averageOrderValue(): number {
    return this.totalOrders > 0 ? this.totalRevenue / this.totalOrders : 0;
  }

  get recentOrdersCount(): number {
    const today = new Date();
    const threeDaysAgo = new Date(today.getTime() - (3 * 24 * 60 * 60 * 1000));
    
    return this.recentActivity.filter(activity => 
      activity.date >= threeDaysAgo && activity.status === 'completado'
    ).length;
  }

  get pendingOrdersCount(): number {
    return this.recentActivity.filter(activity => 
      activity.status === 'pendiente'
    ).length;
  }
}