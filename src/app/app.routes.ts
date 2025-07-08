import { Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ProductsListComponent} from "./products-list/products-list/products-list.component";
import {AuthGuard} from "./auth/auth.guard";

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  // rutas protegidas detrás de AuthGuard:
  { path: 'products', component: ProductsListComponent, canActivate: [AuthGuard] },
  // { path: 'inventory',     component: InventoryListComponent, canActivate: [AuthGuard] },
  // { path: 'products', component: ProductsListComponent, canActivate: [AuthGuard] },
  // ...
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' }
];
