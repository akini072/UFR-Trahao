import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonePipe',
  standalone: true
})
export class PhonePipePipe implements PipeTransform {

  transform(value: string): string {
    const phone = value.replace(/\D/g, '');

    if (phone.length <= 2) {
      return phone;
    }

    if (phone.length <= 7) {
      return phone.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    if (phone.length == 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }

}
