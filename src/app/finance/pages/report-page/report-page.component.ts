import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';

import { BrCurrencyPipe } from '../../../core/utils/pipes';
import { ReportPageService } from './services/report-page.service';
import { DefaultReport, CategoryReport } from './services/report-page.service';
import { DateInputComponent } from "../../../core/components/date-input/date-input.component";
import { NavbarComponent, FooterComponent, ButtonComponent, ButtonProps } from '../../../core/components';
import { GlobalTableComponent, Column, } from '../../../core/components/global-table/global-table.component';
import { FilterSelectComponent } from "../../../customer/components/filter-section/components/filter-select/filter-select.component";

@Component({
  selector: 'app-report-page',
  standalone: true,
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css'],
  providers: [ReportPageService, DatePipe, BrCurrencyPipe],
  imports: [
    NavbarComponent,
    GlobalTableComponent,
    FooterComponent,
    CommonModule,
    HttpClientModule,
    DateInputComponent,
    ButtonComponent
],
})
export class ReportPageComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 1;
  columns: Column[] = [];
  reportData: { items: DefaultReport[] | CategoryReport[] } = { items: [] };
  totalRequests: number = 0;
  reportPageService: ReportPageService;
  type: 'default' | 'category' = 'default';
  formattedData: DefaultReport[] | CategoryReport[] = [];
  datePipe: DatePipe;
  style = {
    wrapper: 'h-min-screen',
    title: 'px-4 text-2xl font-bold text-primary-8 my-8',
    tableContainer: 'w-10/12 mx-auto',
    select: 'border-2 border-primary-6 p-2 rounded text-primary-6',
    filterSection: 'flex flex-wrap gap-4 items-end w-10/12 mx-auto my-8',
    inputContainer: 'flex flex-col flex-wrap gap-1 items-start',
    buttonContainer: 'flex',
  };
  brCurrencyPipe: BrCurrencyPipe;
  startDate!: string  
  endDate!: string 

  constructor(
    @Inject(ReportPageService) reportPageService: ReportPageService,
    @Inject(DatePipe) datePipe: DatePipe,
    @Inject(BrCurrencyPipe) brCurrencyPipe: BrCurrencyPipe
  ) {
    this.reportPageService = reportPageService;
    this.datePipe = datePipe;
    this.brCurrencyPipe = brCurrencyPipe;
  }

  ngOnInit(): void {
    this.fetchReportData(this.type);
  }

  async fetchReportData(
    type: 'default' | 'category',
    startDate?: string,
    endDate?: string
  ) {
    try {
      const data = await this.reportPageService.getReportList(
        type,
        startDate,
        endDate
      );

      if (type === 'default') {
        this.columns = [
          {
            key: 'date',
            label: 'Dia',
          },
          {
            key: 'budget',
            label: 'Valor',
          },
        ];

        this.formattedData = (data as DefaultReport[]).map(
          (item: DefaultReport) => {
            return {
              date:
               item.date === null ? "TOTAL" : this.datePipe.transform(new Date(item.date), 'dd/MM/yyyy') || '',
              budget: this.brCurrencyPipe.transform(Number(item.budget)),
            };
          }
        );
      } else {
        this.columns = [
          {
            key: 'category',
            label: 'Categoria',
          },
          {
            key: 'value',
            label: 'Valor',
          },
        ];

        this.formattedData = (data as CategoryReport[]).map(
          (item: CategoryReport) => {
            return {
              ...item,
              value: this.brCurrencyPipe.transform(Number(item.budget)),
            };
          }
        ) as CategoryReport[];
      }

      this.reportData.items = this.formattedData;
      this.totalRequests = data.length;
      this.updateTotalPages();
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  }

  updateTotalPages() {
    this.totalPages = Math.ceil(this.totalRequests / 10);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getPaginatedRequests() {
    const startIndex = (this.currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return {
      items: this.reportData.items.slice(startIndex, endIndex),
    };
  }

  handleFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement?.value || ''
    this.setFilterType(value as 'default' | 'category');
    if(value === 'category'){
      this.startDate = '';
      this.endDate = '';
    }
  }

  setFilterType(type: 'default' | 'category') {
    this.type = type;
    this.fetchReportData(this.type);
  }
  
  formatDateToISOString(date: string): string {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split('.')[0];
  }

  handleStartDateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';
    this.startDate = this.formatDateToISOString(value);
  }



  handleEndDateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';
    this.endDate = this.formatDateToISOString(value);
  }

  applyFilter(){
    this.fetchReportData(this.type, this.startDate, this.endDate);
  }

  applyFilterButtonProps: ButtonProps = {
    text: 'Aplicar',
    color: 'primary-8',
    size: 'medium',
    textColor: 'white',
    hoverColor: 'primary-7',
    onClick: ()=>{this.applyFilter()},
    extraClasses: 'align-self-end justify-self-end'
  };
}
