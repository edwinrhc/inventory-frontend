import {Component, OnInit} from '@angular/core';
import {Product} from "../../core/models/product";
import {ProductsService} from "../../core/services/products.service";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{

  products: Product[] = [];
  filter: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private svc: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.svc.list().subscribe({
      next: data => this.products = data,
      error: err => console.error('Error cargando productos',err)
    });
  }


  filteredProducts(): Product[] {
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  }

  totalPages(): number[] {
    const total = this.filteredProducts().length;
    return Array.from({ length: Math.ceil(total / this.pageSize) }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  goToCreateProduct(): void {
    this.router.navigate(['/products/create']); // ajusta según tu ruta real
  }


}
