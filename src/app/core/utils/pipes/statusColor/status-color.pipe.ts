import { Pipe, PipeTransform } from '@angular/core';
import {
  statusBGColor,
  statusBorderColor,
  statusTextColor,
  statusColor
} from '../../../types/status-color';
import { RequestCategory } from '../../../types/request-category';

@Pipe({
  name: 'statusColor',
  standalone: true,
})
export class StatusColorPipe implements PipeTransform {
  transform(
    status: RequestCategory,
    type?: 'background' | 'border' | 'text' 
  ): string {
    const map =
      type ? (type === 'background'
        ? statusBGColor
        : type === 'border'
        ? statusBorderColor
        : statusTextColor) : statusColor;

    const defaultReturn =
      type === 'background'
        ? 'bg-gray-300'
        : type === 'border'
        ? 'border-gray-300'
        : 'text-gray-300';

    return map[status] || defaultReturn;
  }
}
