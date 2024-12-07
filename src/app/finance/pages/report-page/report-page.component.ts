import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';

import { NavbarComponent, FooterComponent } from "../../../core/components";
import { MonthlyReport, MonthlyReportItem } from '../../types/monthlyReport';
import { Column, GlobalTableComponent } from "../../../core/components/global-table/global-table.component";

@Component({
  selector: 'app-report-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, GlobalTableComponent],
  templateUrl: './report-page.component.html',
  styleUrl: './report-page.component.css'
})

export class ReportPageComponent {
  currentPage: number = 1;
  itemsPerPage: number = 13;
  totalPages: number = 1;
  searchQuery: string | undefined;
  activeFilters: { filter: string; value?: string }[] = [];

  style ={
    title: 'px-4 text-2xl font-bold text-primary-8 my-8',
    innerContainer: 'flex justify-end  gap-4',
    searchContainer: 'flex gap-2',
    wrapper: 'flex flex-col w-full px-4 min-h-screen',
  }

  columns: Column[] = [{
    label: 'Mês',
    key: 'month',
  }, {
    label: 'Receita',
    key: 'revenue',
  }, {
    label: 'Despesas',
    key: 'expenses',
  }, {
    label: 'Lucro',
    key: 'profit',
  }];
  ;

  reportData: MonthlyReport = {
    items: [
      {
        month: 'Janeiro/2024',
        revenue: 1000,
        expenses: 500,
        profit: 500,
      },
      {
        month: 'Fevereiro/2024',
        revenue: 1200,
        expenses: 600,
        profit: 600,
      },
      {
        month: 'Março/2024',
        revenue: 1500,
        expenses: 800,
        profit: 700,
      },
      {
        month: 'Abril/2024',
        revenue: 1000,
        expenses: 400,
        profit: 600,
      }, 
      {
        month: 'Maio/2024',
        revenue: 1000,
        expenses: 400,
        profit: 600,
      },
      {
        month: 'Junho/2024',
        revenue: 1000,
        expenses: 400,
        profit: 600,
      },
      {
        month: 'Julho/2024',
        revenue: 1000,
        expenses: 400,
        profit: 600,
      },
      {
        month: 'Agosto/2024',
        revenue: 1000,
        expenses: 400,
        profit: 600,
      },
      {
        month: 'Setembro/2024',
        revenue: 1000,
        expenses: 400,
        profit: 600,
      },
      {
        month: 'Outubro/2024',
        revenue: 1000,
        expenses: 400,
        profit: 600,
      },
      {
        month: 'Total/2024',
        revenue: 5700,
        expenses: 3000,
        profit: 2700,
      }
    ],
  }

  activeReportList: MonthlyReport = {
    items: this.reportData.items,
  }

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.updateTotalPages();
  }

  ngOnInit(): void {
    this.activeReportList = this.reportData;

  }

 searchKeyboard(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    const filteredList = this.reportData.items.filter((item) => {
      return this.activeFilters.every(
        (f) => item[f.filter as keyof MonthlyReportItem] === f.value
      );
    });

    this.activeReportList.items = filteredList.filter((item) => {
      return Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchQuery)
      );
    });
  }

  updateTotalPages() {
    this.totalPages =
      Math.ceil(this.activeReportList.items.length / this.itemsPerPage) || 1;
  }

  getPaginatedRequests(searchQuery?: string): MonthlyReport {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage - 1;


    let list = this.activeReportList.items;

    if (searchQuery) {
      list = list.filter(
        (item) =>
          item.month.toLowerCase().includes(searchQuery) || item.revenue.toString().toLowerCase().includes(searchQuery) || item.expenses.toString().toLowerCase().includes(searchQuery) || item.profit.toString().toLowerCase().includes(searchQuery)
      );
    }

    this.activeReportList.items = list;

    this.updateTotalPages();
    return { items: list.slice(startIndex, endIndex) };
  }

  nextPage = () => {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.cdr.detectChanges();
    }
  };

  previousPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cdr.detectChanges();
    }
  };

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cdr.detectChanges();
    }
  }

  applyFilter = (filter: string, value?: string) => {
    const key = filter === 'date' ? 'created_at' : filter;

    const existingFilterIndex = this.activeFilters.findIndex(
      (f) => f.filter === key
    );

    if (existingFilterIndex !== -1) {
      if (!value || value === 'all' || value === '') {
        this.activeFilters.splice(existingFilterIndex, 1);
      } else {
        this.activeFilters[existingFilterIndex].value = value;
      }
    } else {
      if (value && value !== 'all' && value !== '') {
        this.activeFilters.push({ filter: key, value });
      }
    }
    
    this.activeReportList.items = this.reportData.items.filter((item) => {
      return this.activeFilters.every(
        (f) => {
            return item[f.filter as keyof MonthlyReportItem] === f.value
        }
      );
    });
    
    this.cdr.detectChanges();

    this.goToPage(1);
  };
}
