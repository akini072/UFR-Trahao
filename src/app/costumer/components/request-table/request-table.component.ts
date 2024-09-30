import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonStatusComponent } from '../../../core/components/button-status/button-status.component';
import { RequestItem } from '../../pages/costumer-homepage/costumer-homepage.component';
import { RequestCategory } from '../../../core/types/request-category';
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
}
