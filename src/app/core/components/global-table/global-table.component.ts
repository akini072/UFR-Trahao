import { StatusTextPipe } from '../../../core/utils/pipes/statusText/status-text.pipe';
import { StatusColorPipe } from "../../../core/utils/pipes/statusColor/status-color.pipe";
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { LimitedDescriptionPipe } from '../../utils/limited-description.pipe';
import { ButtonStatusComponent } from '../button-status/button-status.component';
import { ButtonComponent, ButtonProps } from '../button/button.component';
import { PaginationControlComponent } from "../pagination-control/pagination-control.component";

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
    PaginationControlComponent
],
  templateUrl: './global-table.component.html',
  styleUrls: ['./global-table.component.css'],
})

export class GlobalTableComponent<T> implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: Column[] = [];
  @Input() actions: { key: string, label: string, onClick: (item: T) => void }[] = [];
  @Input() actionTemplate?: TemplateRef<any>;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() nextPage: () => void = () => {};
  @Input() previousPage: () => void = () => {};

  

  style = {
    table: "table-auto border min-w-full border-gray-400 rounded-lg divide-gray-400 shadow",
    head: "bg-gray-50",
    col: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    body: "bg-white divide-y divide-gray-200",
    idRow: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
    commomRow: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
    actionsContainer: "flex gap-4 items-center justify-between",
  };

  ngOnInit(): void {
    console.log(this.data);
  }
}