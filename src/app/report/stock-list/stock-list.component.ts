import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { LucideAngularModule } from 'lucide-angular';
import {StockReportDto} from "../../core/models/stock/dto/stock-report.model";
import {ReportStockService} from "../../core/services/report.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit{

  stockData: StockReportDto[] =  [];
  filter: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  totalPagesArr: number[] = [];
  totalItems = 0;

  constructor(
    private rss: ReportStockService,
    protected router: Router) {}




  ngOnInit(): void {

    this.loadStockData();
  }

  loadStockData(): void {
    this.rss.list(this.currentPage, this.pageSize, this.filter)
      .subscribe(resp => {
        this.stockData      = resp.items;
        this.totalItems    = resp.totalItems;
        this.totalPagesArr = Array.from(
          { length: resp.totalPages },
          (_, i) => i + 1
        );
      });
  }

  goToPage(page: number): void {
    if(page < 1 || page > this.totalPagesArr.length) return;
    this.currentPage = page;
    this.loadStockData();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadStockData();
  }


}
