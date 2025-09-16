import { Route } from "@angular/router";
import { InventoryPageComponent } from "./pages/inventory-page/inventory-page.component";
import { PosPageComponent } from "./pages/pos-page/pos-page.component";
import { MovementsPageComponent } from "./pages/movements-page/movements-page.component";
import { ItemsPageComponent } from "./pages/items-page/items-page.component";

export const inventoryRoutes: Route[] = [
  {
    path: '',
    component: InventoryPageComponent
  },
  {
    path: 'pos',
    component: PosPageComponent
  },
  {
    path: 'movements',
    component: MovementsPageComponent
  },
  {
    path: 'items',
    component: ItemsPageComponent
  }
];