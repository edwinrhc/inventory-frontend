import { Component } from '@angular/core';
import {Product} from "../../core/models/product";
import {ProductsService} from "../../core/services/products.service";
import {Router, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {

  // @ts-ignore
  product: Product = { sku: '', name: '', price: 0 }

  constructor(
    private svc: ProductsService,
    private router: Router
  ) {}

  onSubmit() {
    this.svc.create(this.product).subscribe({
      next: () => this.router.navigate(['products']),
      error: err =>
      {
        console.error('Error creando producto', err);
        alert('Ocurrió un error al crear el producto. Revisa la consola y el endpoint.');
      }
    })
  }

  onCancel() {
    this.router.navigate(['products'])
  }
}
