import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';
import {LucideAngularModule,Plus,Trash2,SquarePen   } from "lucide-angular";
import {ProductTypeService} from "../../core/services/product-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductType} from "../../core/models/product-type/ProductType";
import {Product} from "../../core/models/product/product";
import {PaginatorComponent} from "../../shared/paginator/paginator.component";

@Component({
  selector: 'app-product-type-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    PaginatorComponent
  ],
  templateUrl: './product-type-list.component.html',
  styleUrl: './product-type-list.component.css'
})
export class ProductTypeListComponent implements  OnInit{

  t: ProductType[] = [];
  filter: string = '';

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages  = 1;


  readonly Plus = Plus;
  readonly Trash2  = Trash2 ;
  readonly SquarePen  = SquarePen ;

  constructor(
    private route: ActivatedRoute,
    private svc: ProductTypeService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    const qp = this.route.snapshot.queryParamMap.get('page');
    this.currentPage = qp ? +qp : 1;
    this.loadTypeProducts()
  }

  loadTypeProducts(): void{
    this.svc.list(this.currentPage, this.pageSize, this.filter)
      .subscribe(resp => {
        this.t      = resp.items;
        this.currentPage = resp.page;
        this.pageSize    = resp.limit;
        this.totalPages  = resp.totalPages;
      })
  }
  onFilterChange(): void {
    this.currentPage = 1;
    this.loadTypeProducts();
  }

  goToPage(page: number): void {
    // si no es válido, ignoro
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.loadTypeProducts();
  }



  goToCreateTypeProduct(): void {
    this.router.navigate(['product-types', 'create']);
  }

  onDelete(id:string):void{
    if(!confirm('¿Seguro que quieres eliminar este tipo de producto?')){
      return;
    }
    this.svc.remove(id).subscribe(() => {
     this.loadTypeProducts();
    })
  }

  toggleStatus(t: ProductType) {
    this.svc.updateStatus(t.id, !t.isActive)
      .subscribe({
        next: updated => t.isActive = updated.isActive,
        error: err => console.error('No se pudo actualizar estado', err)
      });
  }

  goToEdit(id: string) {
    // preserva la página en la URL
    this.router.navigate(
      ['/product-types', id, 'edit'],
      { queryParams: { page: this.currentPage } }
    );
  }




}
