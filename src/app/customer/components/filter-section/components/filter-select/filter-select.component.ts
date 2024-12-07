import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusTextPipe } from '../../../../../core/utils/pipes';
import { requestCategories } from '../../../../../core/types';
export type FilterType = 'status' | 'date' | 'customer' //TODO adicionar outras opções de filtro;

export interface FilterOption {
  label: string;
  value: string;
  onFiltered: () => void;
}

@Component({
  selector: 'app-filter-select',
  standalone: true,
  imports: [CommonModule, StatusTextPipe],
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.css'],
})
export class FilterSelectComponent implements OnInit {
  @Input() filterType: FilterType = 'status';
  @Input() onFilter: ((filterType: FilterType, value?: string) => void) = () => {};

  filterLabelMap: { [key: string]: string } = {
    status: 'Status:',
    date: 'Data:',
    order: 'Ordenar por:',
    customer: 'Cliente:',
  }

  filterOptions: FilterOption[] = [];

  ngOnInit(): void {
    this.filterOptions = this.getFilterOptions();
  }

  handleFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement?.value || '';
    this.onFilter(this.filterType, value);
  }
  

  getFilterOptions(): FilterOption[] {
    switch (this.filterType) {
      case 'status':
        return requestCategories.map((category) => ({
          label: category,
          value: category,
          onFiltered: () => this.onFilter?.(this.filterType, category),
        }));
      case 'date':
        return [];
      case 'customer':
        //TODO: Implementar a busca de clientes
        return [];
      default:
        return [];
    }
  }

  style = {
    container: 'flex gap-4 items-center',
    label: 'text-primary-6',
    select: 'border-2 border-primary-6 p-2 rounded text-primary-6',
    option: '',
    inputDate: 'border-2 border-primary-6 p-1.5 rounded text-primary-6'
  };
}