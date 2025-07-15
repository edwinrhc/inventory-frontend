import {Component, OnInit} from '@angular/core';
import {Product} from "../../core/models/product/product";
import {ProductsService} from "../../core/services/products.service";
import {CommonModule} from "@angular/common";
import {Router,ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {LucideAngularModule,Plus,Trash2,SquarePen   } from "lucide-angular";
import {PaginatorComponent} from "../../shared/paginator/paginator.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    PaginatorComponent
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit{

  products: Product[] = [];
  filter: string = '';

  currentPage = 1;
  pageSize    = 10;
  totalPages  = 1;

  readonly Plus = Plus;
  readonly Trash2  = Trash2 ;
  readonly SquarePen  = SquarePen ;

  constructor(
              private route: ActivatedRoute,
              private svc: ProductsService,
              protected router: Router) {}

  ngOnInit(): void {

    const qp = this.route.snapshot.queryParamMap.get('page');
    this.currentPage = qp ? +qp : 1;
    this.loadProducts();
  }


  loadProducts(): void {
    this.svc.list(this.currentPage, this.pageSize, this.filter)
      .subscribe(resp => {
        this.products   = resp.items;
        this.currentPage = resp.page;
        this.pageSize    = resp.limit;
        this.totalPages  = resp.totalPages;
      });
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  goToPage(page: number): void {
    // si no es válido, ignoro
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
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

  goToEdit(id: string) {
    // preserva la página en la URL
    this.router.navigate(
      ['/products', id, 'edit'],
      { queryParams: { page: this.currentPage } }
    );
  }

}
