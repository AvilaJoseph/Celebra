import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./HomeCelebra/HomeCelebra.component').then(m => m.HomeCelebraComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./Back-Celebre/Back-Celebre.component').then(b => b.BackCelebreComponent)
    }

];
