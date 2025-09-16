import { Routes } from "@angular/router";
import { DashboardPageComponent } from "./pages/dashboard-page/dashboard-page.component";

export const dashboardRoutes: Routes = [
    { path: '', component: DashboardPageComponent },
    {
        path: 'inventory',
        loadChildren: () => import('../inventory/inventory.routes').then(m => m.inventoryRoutes)
    },
    {
        path: 'sellers',
        loadChildren: () => import('../sellers/sellers.routes').then(m => m.sellersRoutes)
    }
]