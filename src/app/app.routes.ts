import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./HomeCelebra/HomeCelebra.component').then(m => m.HomeCelebraComponent)
    }
];
