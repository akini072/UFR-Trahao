import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitedDescription',
  standalone: true
})
export class LimitedDescriptionPipe implements PipeTransform {
  transform(description: string, maxLength: number): string {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }
}