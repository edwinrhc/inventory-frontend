import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from "@angular/router";
import {ProductType} from "../../core/models/product-type/ProductType";
import {ProductTypeService} from "../../core/services/product-type.service";

@Component({
  selector: 'app-product-type-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-type-create.component.html',
  styleUrl: './product-type-create.component.css'
})
export class ProductTypeCreateComponent {

  // @ts-ignore
  type: ProductType =  { name: '', description: ''};

  constructor(
    private svc: ProductTypeService,
    private router: Router
  ) {}

  onSubmit() {
    this.svc.create(this.type).subscribe({
      next: () => this.router.navigate(['product-types']),
      error: err => {
        console.error('Error creando tipo',err);
        alert('No se pudo crear el tipo de producto.')
      }
      });
  }

  onCancel(){
    this.router.navigate(['product-types']);
  }

}
