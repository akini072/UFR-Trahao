import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfMask',
  standalone: true
})
export class CpfMaskPipe implements PipeTransform {

  transform(value: string): string {

    const cpf = value.replace(/\D/g, '');

    switch(cpf.length) {
      case 0: return  '___.___.___-__';
      case 1: return cpf.replace(/(\d{1})/, '$1__.___.___-__');
      case 2: return cpf.replace(/(\d{2})/, '$1_.___.___-__');
      case 3: return cpf.replace(/(\d{3})/, '$1.___.___-__');
      case 4: return cpf.replace(/(\d{3})(\d{1})/, '$1.$2__.___-__');
      case 5: return cpf.replace(/(\d{3})(\d{2})/, '$1.$2_.___-__');
      case 6: return cpf.replace(/(\d{3})(\d{3})/, '$1.$2.___-__');
      case 7: return cpf.replace(/(\d{3})(\d{3})(\d{1})/, '$1.$2.$3__-__');
      case 8: return cpf.replace(/(\d{3})(\d{3})(\d{2})/, '$1.$2.$3_-__');
      case 9: return cpf.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-__');
      case 10: return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4_');
      case 11: return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      default: return value.slice(0, 14);
    }
  }

}
