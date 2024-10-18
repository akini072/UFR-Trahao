import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonStatusComponent } from '../../../core/components/button-status/button-status.component';
import { RequestItem } from '../../../core/types/request-item';
import { LimitedDescriptionPipe } from '../../../core/utils/limited-description.pipe';
import { StatusTextPipe } from '../../../core/utils/pipes/statusText/status-text.pipe';
import { StatusColorPipe } from "../../../core/utils/pipes/statusColor/status-color.pipe";
import { GlobalTableComponent } from "../../../core/components/global-table/global-table.component";
import { ButtonComponent } from "../../../core/components/button/button.component";

@Component({
  selector: 'app-request-table',
  standalone: true,
  imports: [CommonModule, ButtonStatusComponent, LimitedDescriptionPipe, StatusTextPipe, StatusColorPipe, GlobalTableComponent, ButtonComponent],
  templateUrl: './request-table.component.html',
  styleUrl: './request-table.component.css',
})
export class RequestTableComponent {
  @Input() requests: RequestItem[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() nextPage: () => void = () => {};
  @Input() previousPage: () => void = () => {};

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'EQUIPAMENTO' },
    { key: 'description', label: 'DESC. SOLICITAÇÃO' },
    { key: 'created_at', label: 'DATA SOLICITAÇÃO' },
    { key: 'status', label: 'STATUS' },
  ]

  style = {
    table: "table-auto border min-w-full border-gray-400 rounded-lg divide-gray-400 shadow",
    head: "bg-gray-50",
    col: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    body: "bg-white divide-y divide-gray-200",
    idRow: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
    commomRow: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
  }
}
