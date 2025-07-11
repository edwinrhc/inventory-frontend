import {Component, OnInit} from '@angular/core';
import {Product} from "../../core/models/product/product";
import {ProductsService} from "../../core/services/products.service";
import {Router, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ProductType} from "../../core/models/product-type/ProductType";
import {ProductTypeService} from "../../core/services/product-type.service";
import {CreateProductDto} from "../../core/models/product/dto/create-product.dto";


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
export class ProductCreateComponent implements OnInit{

  // @ts-ignore
  product: CreateProductDto = {
    sku: '',
    name: '',
    price: 0,
    description: '',
    productTypeId: '',      // ← inicializamos vacío
  };
  types: ProductType[] = [];


  constructor(
    private svc: ProductsService,
    private typeSvc: ProductTypeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.typeSvc.list(1, 100, '').subscribe(resp => {
      this.types = resp.items;
    });
  }

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
