import { StatusTextPipe } from '../../../core/utils/pipes/statusText/status-text.pipe';
import { StatusColorPipe } from "../../../core/utils/pipes/statusColor/status-color.pipe";
import { CommonModule } from '@angular/common';
import { Component, OnInit, OnChanges, SimpleChanges, Input, TemplateRef } from '@angular/core';
import { LimitedDescriptionPipe } from '../../utils/limited-description.pipe';
import { ButtonStatusComponent } from '../button-status/button-status.component';
import { ButtonComponent, ButtonProps } from '../button/button.component';
import { PaginationControlComponent } from "../pagination-control/pagination-control.component";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ToggleSwitchComponent } from "../toggle-switch/toggle-switch.component"; 

interface Column {
  key: string;
  label: string;
  template?: TemplateRef<any>;
}

@Component({
  selector: 'app-global-table',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ButtonStatusComponent,
    LimitedDescriptionPipe,
    StatusTextPipe,
    StatusColorPipe,
    PaginationControlComponent,
    ToggleSwitchComponent
  ],
  templateUrl: './global-table.component.html',
  styleUrls: ['./global-table.component.css'],
})
export class GlobalTableComponent<T> implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() reportData!: any[];
  @Input() enableReport: boolean = false;
  @Input() title: string = '';
  @Input() columns: Column[] = [];
  @Input() actions: { key: string, label: string, onClick: (item: T) => void }[] = [];
  @Input() actionTemplate?: TemplateRef<any>;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() nextPage: () => void = () => {};
  @Input() previousPage: () => void = () => {};

  filtersEnabled: boolean = false;

  style = {
    table: "table-auto border min-w-full border-gray-400 rounded-lg divide-gray-400 shadow",
    head: "bg-gray-50",
    col: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    body: "bg-white divide-y divide-gray-200",
    idRow: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
    commomRow: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
    actionsContainer: "flex gap-4 items-center justify-between",
    reportRow: "flex gap-4 items-center justify-between w-full",
  };

  generateReportButton: ButtonProps = {
    text: 'Gerar relatório',
    color: 'primary-8',
    size: 'medium',
    textColor: 'white',
    hoverColor: 'primary-6',
    onClick: ()=>{},	
    extraClasses: 'mb-4',
  };

  updateReportFunction(data: any[]): void {
    this.generateReportButton = {
      ...this.generateReportButton,
      onClick: () => {
        const doc = new jsPDF();
        autoTable(doc, {
          head: [this.columns.map((column) => column.label)],
          theme: 'grid',
          body: data.map((item) => this.columns.map((column) => {
            if (column.template) {
              return column.template.createEmbeddedView({ $implicit: item }).rootNodes[0].innerText;
            }
            return item[column.key];
          })),
        });
        doc.save(this.title ? `relatorio-${this.title}.pdf` : 'relatorio.pdf');
      }
    };
  }

  toggleFilters = (): void => {
    this.filtersEnabled = !this.filtersEnabled;
    this.updateReportFunction(this.filtersEnabled ? this.data : this.reportData);
  };
  

  ngOnInit(): void {
    this.updateReportFunction(this.reportData ? this.reportData : this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['reportData'] || changes['filtersEnabled']) {
      this.updateReportFunction(this.filtersEnabled ? this.data : this.reportData);
    }
  }
}