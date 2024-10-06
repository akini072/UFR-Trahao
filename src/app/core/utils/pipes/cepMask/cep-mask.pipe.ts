import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepMask',
  standalone: true
})
export class CepMaskPipe implements PipeTransform {

  transform(value: string): string {

    const cep = value.replace(/\D/g, '');

    if (cep.length <= 2) {
      return cep;
    }
    if (cep.length <= 5) {
      return cep.replace(/(\d{2})(\d{0,3})/, '$1.$2');
    }
    return cep.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2-$3');
  }

}
