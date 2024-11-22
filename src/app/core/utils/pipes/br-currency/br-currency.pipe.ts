import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brCurrency',
  standalone: true
})
export class BrCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    let currency: string = value.toLocaleString('pt-BR', {
      style: 'currency', currency: 'BRL'
    })

    return currency;
  }

}
