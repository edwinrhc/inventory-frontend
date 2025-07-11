import {Component, OnInit} from '@angular/core';
import {Product} from "../../core/models/product/product";
import {ProductsService} from "../../core/services/products.service";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {LucideAngularModule,Plus,Trash2,SquarePen   } from "lucide-angular";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, FormsModule,LucideAngularModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{

  products: Product[] = [];
  filter: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  totalPagesArr: number[] = [];
  totalItems = 0;

  readonly Plus = Plus;
  readonly Trash2  = Trash2 ;
  readonly SquarePen  = SquarePen ;

  constructor(private svc: ProductsService,
              protected router: Router) {}

  ngOnInit(): void {
    // this.svc.list().subscribe({
    //   next: data => this.products = data,
    //   error: err => console.error('Error cargando productos',err)
    // });
    this.loadProducts();
  }

  loadProducts(): void {
    this.svc.list(this.currentPage, this.pageSize, this.filter)
      .subscribe(resp => {
        this.products      = resp.items;
        this.totalItems    = resp.totalItems;
        this.totalPagesArr = Array.from(
          { length: resp.totalPages },
          (_, i) => i + 1
        );
      });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPagesArr.length) return;
    this.currentPage = page;
    this.loadProducts();
  }


  onFilterChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  goToCreateProduct(): void {
    this.router.navigate(['products', 'create']);
  }

  onDelete(id: string): void {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) {
      return;
    }
    this.svc.remove(id).subscribe(() => {
      // refresca la página actual tras eliminar
      this.loadProducts();
    });
  }

  toggleStatus(p: Product) {
    this.svc.updateStatus(p.id, !p.isActive)
      .subscribe({
        next: updated => p.isActive = updated.isActive,
        error: err => console.error('No se pudo actualizar estado', err)
      });
  }

}
