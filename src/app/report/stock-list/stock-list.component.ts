import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LucideAngularModule, Minus, Plus} from 'lucide-angular';
import {StockReportDto} from "../../core/models/stock/dto/stock-report.model";
import {ReportStockService} from "../../core/services/report.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PaginatorComponent} from "../../shared/paginator/paginator.component";

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, PaginatorComponent],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit{

  stockData: StockReportDto[] =  [];
  filter: string = '';

  currentPage = 1;
  pageSize    = 10;
  totalPages  = 1;

  totalPagesArr: number[] = [];
  totalItems = 0;

  constructor(

    private rss: ReportStockService,
    protected router: Router) {}

  protected readonly Minus = Minus;
  protected readonly Plus = Plus;


  ngOnInit(): void {

    this.loadStockData();
  }

  loadStockData(): void {
    this.rss.list(this.currentPage, this.pageSize, this.filter)
      .subscribe(resp => {
        this.stockData      = resp.items;
        this.currentPage = resp.page;
        this.pageSize    = resp.limit;
        this.totalPages  = resp.totalPages;
      });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.loadStockData();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadStockData();
  }

  onSalida(){
    this.router.navigate(['/inventory/salida']);
  }

  onIngreso(){
    this.router.navigate(['/inventory/ingreso']);
  }
}
