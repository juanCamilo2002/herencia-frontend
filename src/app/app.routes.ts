import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './core/layouts/dashboard-layout/dashboard-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.dashboardRoutes)


    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
