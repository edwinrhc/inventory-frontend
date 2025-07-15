import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})

export class PaginatorComponent {
  /** Página actual (1-based) */
  @Input() currentPage = 1;
  /** Total de páginas */
  @Input() totalPages = 1;
  /** Evento que emite la nueva página */
  @Output() pageChange = new EventEmitter<number>();

  /** Construye el array mixto [1, '...', p-1, p, p+1, '...', total] */
  get displayedPages(): (number | '...')[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: (number | '...')[] = [];

    pages.push(1);
    if (current - 2 > 1) pages.push('...');
    for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
      pages.push(p);
    }
    if (current + 2 < total) pages.push('...');
    if (total > 1) pages.push(total);

    return pages;
  }

  /** Navega emitiendo pageChange si es válido */
  goTo(page: number | '...') {
    if (typeof page !== 'number' || page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.pageChange.emit(page);
  }


}
