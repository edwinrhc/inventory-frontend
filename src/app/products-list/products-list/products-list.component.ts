import {Component, OnInit} from '@angular/core';
import {Product} from "../../core/models/product";
import {ProductsService} from "../../core/services/products.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{

  products: Product[] = [];

  constructor(private svc: ProductsService) {}

  ngOnInit(): void {
    this.svc.list().subscribe({
      next: data => this.products = data,
      error: err => console.error('Error cargando productos',err)
    });
  }


}
