import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ProductsListComponent} from "./products-list/products-list/products-list.component";
import {AuthGuard} from "./auth/auth.guard";
import {AdminLayoutComponent} from "./layout/admin-layout/admin-layout.component";

export const routes: Routes = [

  {
    path: 'auth/login',
    component: LoginComponent
  },

  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path:'',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./products-list/products-list/products-list.component').then(m => m.ProductsListComponent)
      },
      // {
      //   path: 'inventory',
      //   loadComponent: () =>
      //     import('./inventory/inventory.component').then(
      //       (m) => m.InventoryComponent
      //     ),
      // },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'auth/login'
  }

];
