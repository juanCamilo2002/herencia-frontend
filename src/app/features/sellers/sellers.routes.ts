import { Route } from "@angular/router";
import { SellersListComponent } from "./components/sellers-list/sellers-list.component";
import { SellerFormComponent } from "./components/seller-form/seller-form.component";

export const sellersRoutes: Route[] = [
    { path: '', component: SellersListComponent },
    { path: 'new', component: SellerFormComponent },
    { path: ':id', component: SellerFormComponent }
]