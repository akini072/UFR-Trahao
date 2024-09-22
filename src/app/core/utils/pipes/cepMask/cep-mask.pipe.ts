import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepMask',
  standalone: true
})
export class CepMaskPipe implements PipeTransform {

  transform(value: string): string {

    const cep = value.replace(/\D/g, '');

    switch(cep.length) {
      case 0: return  '__.___-___';
      case 1: return cep.replace(/(\d{1})/, '$1_.___-___');
      case 2: return cep.replace(/(\d{2})/, '$1.___-___');
      case 3: return cep.replace(/(\d{2})(\d{1})/, '$1.$2__-___');
      case 4: return cep.replace(/(\d{2})(\d{2})/, '$1.$2_-___');
      case 5: return cep.replace(/(\d{2})(\d{3})/, '$1.$2-___');
      case 6: return cep.replace(/(\d{2})(\d{3})(\d{1})/, '$1.$2-$3__');
      case 7: return cep.replace(/(\d{2})(\d{3})(\d{2})/, '$1.$2-$3_');
      case 8: return cep.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
      default: return value.slice(0, 10);
    }
  }

}
