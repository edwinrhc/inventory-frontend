import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {Product} from "../../core/models/product/product";
import {ProductsService} from "../../core/services/products.service";
import {UpdateProductoDto} from "../../core/models/product/dto/update-producto.dto";


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

  product: Product = {id: '', sku: '', name: '', description: '', price: 0};
  id!: string;

  constructor(
    private svc: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.svc.get(this.id).subscribe({
      next: prod => {
        this.product = prod;
      },
      error: err => {
        console.error('Error cargando producto', err);
        this.router.navigate(['products']);
      }
    })

  }


  onSubmit() {
    const dto: UpdateProductoDto = {
      sku: this.product.sku,
      name: this.product.name,
      description: this.product.description,
      price: Number(this.product.price),  // <- así te aseguras de enviar un number
    };

    this.svc.update(this.id, dto).subscribe({
      next: () => this.router.navigate(['/products']),
      error: err => {
        console.error('Error actualizando producto', {
          status: err.status,
          body: err.error
        });
        alert(`Error ${err.status}:\n${JSON.stringify(err.error, null, 2)}`);
      }
    });
  }




  onCancel() {
    this.router.navigate(['products']);
  }


}
