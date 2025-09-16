import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ColumnDef<T> {
  key?: keyof T;
  label: string;
  template?: any;
}

@Component({
  selector: 'app-datatable',
  imports: [NgTemplateOutlet, FormsModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css'
})
export class DatatableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: ColumnDef<T>[] = [];
  @Input() pageSize: number = 5;
  @Output() rowClick = new EventEmitter<T>();

  currentPage = 1;
  searchTerm = '';
  sortColumn: keyof T | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  /** global filter */
  get filteredData(): T[] {
    if (!this.searchTerm) return this.data;

    return this.data.filter((row) =>
      Object.values(row as object).some((val =>
        val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      )
    );
  }

  /** sorted data */
  get sortedData(): T[] {
    if (!this.sortColumn) return this.filteredData;

    return [...this.filteredData].sort((a, b) => {
      const valA = a[this.sortColumn!] ?? '';
      const valB = b[this.sortColumn!] ?? '';

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /** paginated data */
  get paginatedData(): T[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.sortedData.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.sortedData.length / this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  /** change column sorted */
  toggleSort(col: ColumnDef<T>) {
    if (!col.key) return;
    if (this.sortColumn === col.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col.key;
      this.sortDirection = 'asc'
    }
  }
 
}
