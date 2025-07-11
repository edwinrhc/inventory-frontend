import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';
import {LucideAngularModule,Plus,Trash2,SquarePen   } from "lucide-angular";
import {ProductTypeService} from "../../core/services/product-type.service";
import {Router} from "@angular/router";
import {ProductType} from "../../core/models/product-type/ProductType";
import {Product} from "../../core/models/product/product";

@Component({
  selector: 'app-product-type-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './product-type-list.component.html',
  styleUrl: './product-type-list.component.css'
})
export class ProductTypeListComponent implements  OnInit{

  t: ProductType[] = [];
  filter: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  totalPagesArr: number[] = [];
  totalItems = 0;

  readonly Plus = Plus;
  readonly Trash2  = Trash2 ;
  readonly SquarePen  = SquarePen ;

  constructor(
    private svc: ProductTypeService,
    protected router: Router
  ) {}

  ngOnInit(): void {

    this.loadTypeProducts()
  }
  loadTypeProducts(): void{
    this.svc.list(this.currentPage, this.pageSize, this.filter)
      .subscribe(resp => {
        this.t      = resp.items;
        this.totalItems    = resp.totalItems;
        this.totalPagesArr = Array.from(
          { length: resp.totalPages },
          (_, i) => i + 1
        );
      })
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPagesArr.length) return;
    this.currentPage = page;
    this.loadTypeProducts();
  }

  onFilterChange(): void {
    this.currentPage = 1;
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




}
