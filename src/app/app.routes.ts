import { Routes } from '@angular/router';
import { DashboardComponent } from './Back-Celebre/layouts/Dashboard/Dashboard.component';
import { LoginComponent } from './Back-Celebre/layouts/Login/Login.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./HomeCelebra/HomeCelebra.component').then(m => m.HomeCelebraComponent)
    },
    {
        path: 'back',
        loadComponent: () => import('./Back-Celebre/Back-Celebre.component').then(b => b.BackCelebreComponent),
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'login', component: LoginComponent }
        ]
    }
];
