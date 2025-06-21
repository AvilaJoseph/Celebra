import { Routes } from '@angular/router';
import { LoginComponent } from './Back-Celebre/Components/Login/Login.component';
import { RegisterComponent } from './Back-Celebre/Components/Register/Register.component';

export const routes: Routes = [
    // Página principal (sin layout)
    {
        path: '',
        loadComponent: () => import('./HomeCelebra/HomeCelebra.component').then(m => m.HomeCelebraComponent)
    },
    
    // Rutas de autenticación (sin layout)
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'register', 
        component: RegisterComponent 
    },
    
    // Layout principal con rutas protegidas
    {
        path: 'app',
        loadComponent: () => import('./Back-Celebre/layouts/Back-Celebre.component').then(b => b.BackCelebreComponent),
        children: [
            { 
                path: '', 
                redirectTo: 'dashboard', 
                pathMatch: 'full' 
            },
            // Dashboard principal (usuario)
            { 
                path: 'dashboard', 
                loadComponent: () => import('./Back-Celebre/Components/UserDashboard/UserDashboard.component').then(c => c.UserDashboardComponent)
            },
            // Perfil
            {
                path: 'profile',
                loadComponent: () => import('./Back-Celebre/Components/UserProfile/UserProfile.component').then(c => c.UserProfileComponent)
            },
            // Fotos (usando UserDashboard como placeholder)
            {
                path: 'photos',
                loadComponent: () => import('./Back-Celebre/Components/UserDashboard/UserDashboard.component').then(c => c.UserDashboardComponent)
            },
            {
                path: 'photos/approved',
                loadComponent: () => import('./Back-Celebre/Components/UserDashboard/UserDashboard.component').then(c => c.UserDashboardComponent)
            },
            {
                path: 'photos/pending',
                loadComponent: () => import('./Back-Celebre/Components/UserDashboard/UserDashboard.component').then(c => c.UserDashboardComponent)
            },
            {
                path: 'photos/rejected',
                loadComponent: () => import('./Back-Celebre/Components/UserDashboard/UserDashboard.component').then(c => c.UserDashboardComponent)
            },
            // Admin routes
            {
                path: 'admin',
                children: [
                    {
                        path: 'dashboard',
                        loadComponent: () => import('./Back-Celebre/Components/AdminDashboard/AdminDashboard.component').then(c => c.AdminDashboardComponent)
                    },
                    {
                        path: 'users',
                        loadComponent: () => import('./Back-Celebre/Components/AdminDashboard/AdminDashboard.component').then(c => c.AdminDashboardComponent)
                    },
                    {
                        path: 'sales',
                        loadComponent: () => import('./Back-Celebre/Components/AdminDashboard/AdminDashboard.component').then(c => c.AdminDashboardComponent)
                    }
                ]
            },
            // Settings apunta a UserProfile
            {
                path: 'settings',
                loadComponent: () => import('./Back-Celebre/Components/UserProfile/UserProfile.component').then(c => c.UserProfileComponent)
            }
        ]
    },
    
    // 404
    {
        path: '404',
        loadComponent: () => import('./Back-Celebre/Components/404/404.component').then(c => c.Component404)
    },
    
    // Redirect unknown routes
    { 
        path: '**', 
        redirectTo: '/404' 
    }
];