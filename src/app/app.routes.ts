import {Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ProductsListComponent} from "./products/products-list/products-list.component";
import {AuthGuard} from "./auth/auth.guard";
import {AdminLayoutComponent} from "./layout/admin-layout/admin-layout.component";

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'products',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./products/products-list/products-list.component')
                .then(m => m.ProductsListComponent),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./products/product-create/product-create.component')
                .then(m => m.ProductCreateComponent),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./products/product-edit/product-edit.component')
                .then(m => m.ProductEditComponent),
          },
        ],
      },
      {
        path: 'product-types',
        children:[
          {
            path: '',
            loadComponent: () =>
              import('./product-type/product-type-list/product-type-list.component')
                .then(m => m.ProductTypeListComponent),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./product-type/product-type-create/product-type-create.component')
                .then(m => m.ProductTypeCreateComponent),
          },
          {
            path: ':id/edit',
            loadComponent: () =>
              import('./product-type/product-type-edit/product-type-edit.component')
                .then(m => m.ProductTypeEditComponent),
          },
        ]
      },
      {
        path: 'inventory',
        children:[
          {
            path: 'list',
            loadComponent: () =>
              import('./inventory/inventory-document-list/inventory-document-list.component')
                .then(m => m.InventoryDocumentListComponent),
          },
          {
            path: 'ingreso',
            loadComponent: () =>
              import('./inventory/inventory-document/inventory-document.component')
                .then(m => m.InventoryDocumentComponent),
            data: { movementType: 'IN' }
          },
          {
            path: 'salida',
            loadComponent: () =>
              import('./inventory/inventory-document/inventory-document.component')
                .then(m => m.InventoryDocumentComponent),
            data: { movementType: 'OUT' }
          },
          {
            path: 'report',
            loadComponent: () =>
              import('./report/stock-list/stock-list.component')
                .then(m => m.StockListComponent)
          },
          {
            path: '',
            redirectTo: 'ingreso',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
