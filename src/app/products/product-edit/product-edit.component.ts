import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {Product} from "../../core/models/product/product";
import {ProductsService} from "../../core/services/products.service";
import {UpdateProductoDto} from "../../core/models/product/dto/update-producto.dto";
import {ProductType} from "../../core/models/product-type/ProductType";
import {ProductTypeService} from "../../core/services/product-type.service";


@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  product: Product = {
    id: '',
    sku: '',
    name: '',
    description: '',
    price: 0,
    isActive: true,
    productTypeId: ''  };

  types: ProductType[] = [];
  id!: string;

  constructor(
    private svc: ProductsService,
    private typeSvc: ProductTypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    // Cargamos paralelo: producto y tipos
    this.svc.get(this.id).subscribe({
      next: prod => this.product = prod,
      error: () => this.router.navigate(['products'])
    });
    this.typeSvc.list(1, 100, '').subscribe({
      next: resp => this.types = resp.items,
      error: err => console.error('Error cargando tipos', err)
    });
  }


  onSubmit() {
    const dto: UpdateProductoDto = {
      sku: this.product.sku,
      name: this.product.name,
      description: this.product.description,
      price: Number(this.product.price),
      productTypeId: this.product.productTypeId, // ← incluirlo
    };

    this.svc.update(this.id, dto).subscribe({
      next: () => this.router.navigate(['/products']),
      error: err => {
        console.error('Error actualizando producto', err);
        alert(`Error ${err.status}: ${JSON.stringify(err.error, null,2)}`);
      }
    });
  }


  onCancel() {
    this.router.navigate(['products']);
  }


}
