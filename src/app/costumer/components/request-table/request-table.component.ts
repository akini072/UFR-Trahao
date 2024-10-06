import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonStatusComponent } from '../../../core/components/button-status/button-status.component';
import { RequestItem } from '../../../core/types/request-item';
import { LimitedDescriptionPipe } from '../../../core/utils/limited-description.pipe';
import { StatusTextPipe } from '../../../core/utils/pipes/statusText/status-text.pipe';
import { StatusColorPipe } from "../../../core/utils/pipes/statusColor/status-color.pipe";

@Component({
  selector: 'app-request-table',
  standalone: true,
  imports: [CommonModule, ButtonStatusComponent, LimitedDescriptionPipe, StatusTextPipe, StatusColorPipe],
  templateUrl: './request-table.component.html',
  styleUrl: './request-table.component.css',
})
export class RequestTableComponent {
  @Input() requests: RequestItem[] = [];

  style = {
    table: "table-auto border min-w-full border-gray-400 rounded-lg divide-gray-400 shadow",
    head: "bg-gray-50",
    col: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
    body: "bg-white divide-y divide-gray-200",
    idRow: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
    commomRow: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
  }
}
