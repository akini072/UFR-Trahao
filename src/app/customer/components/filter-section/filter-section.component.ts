import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FilterSelectComponent } from './components/filter-select/filter-select.component';

@Component({
  selector: 'app-filter-section',
  standalone: true,
  templateUrl: './filter-section.component.html',
  styleUrl: './filter-section.component.css',
  imports: [CommonModule, FilterSelectComponent],
})
export class FilterSectionComponent implements OnChanges {
  @Input()
  filterAction!: (category: string, value?: string) => void;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterAction']) {
      this.onFilter = (category: string, value?: string) => {
        this.filterAction(category, value);
      };
    }
  }

  ngOnInit() {}

  onFilter(category: string, value?: string): void {
    this.filterAction(category, value);
  }

  style = {
    container: 'w-full flex flex-col px-20 gap-4',
    header: 'text-primary-6 font-bold text-xl',
    filtersContainer: 'flex gap-8'
  };
}
