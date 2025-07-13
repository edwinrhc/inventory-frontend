import {CommonModule, DatePipe} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {InventoryDocument} from "../../core/models/inventory-document/inventory-document.model";
import {InventoryDocumentService} from "../../core/services/inventory-document.service";
import {Router, RouterLink} from "@angular/router";
import {Product} from "../../core/models/product/product";
import {LucideAngularModule,Plus,Minus,SquarePen   } from "lucide-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-inventory-document-list',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule, FormsModule, RouterLink],
  providers:[DatePipe],
  templateUrl: './inventory-document-list.component.html',
  styleUrl: './inventory-document-list.component.css'
})
export class InventoryDocumentListComponent implements  OnInit{

  docs: InventoryDocument[] = [];
  filter: string = '';
  // ← Nueva propiedad para filtrar por tipo
  filterType: 'ALL' | 'IN' | 'OUT' = 'ALL';

  currentPage: number = 1;
  pageSize: number = 10;

  totalPagesArr: number[] = [];
  totalItems = 0;

  loading = true;
  error: string | null = null;

  readonly Plus = Plus;
  readonly Minus  = Minus  ;
  readonly SquarePen  = SquarePen ;

  constructor(
    private svc: InventoryDocumentService,
    private datePipe: DatePipe,
    protected router: Router
  ) {}

  ngOnInit(): void {

    this.loadInventoryDocuments();
  }

  loadInventoryDocuments(): void{
    this.svc.list(this.currentPage, this.pageSize, this.filter)
      .subscribe(resp => {
        this.docs = resp.items;
        this.totalItems = resp.totalItems;
        this.totalPagesArr = Array.from(
          { length: resp.totalPages },
          (_, i) => i + 1
        );
        this.loading = false;
    })
  }

  get filteredDocs(): InventoryDocument[]{
    if(this.filterType === 'ALL'){
      return this.docs;
    }
    return this.docs.filter(d => d.type === this.filterType);
  }


  goToPage(page: number): void {
    if (page < 1 || page > this.totalPagesArr.length) return;
    this.currentPage = page;
    this.loadInventoryDocuments();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadInventoryDocuments();
  }


  fmtDate(d:string){
    return this.datePipe.transform(d, 'shortDate');
  }

  onSalida(){
    this.router.navigate(['/inventory/salida']);
  }

  onIngreso(){
    this.router.navigate(['/inventory/ingreso']);
  }

}
