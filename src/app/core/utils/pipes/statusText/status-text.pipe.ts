import { Pipe, PipeTransform } from '@angular/core';
import { RequestCategory } from '../../../types/request-category';

@Pipe({
  name: 'statusText',
  standalone: true
})
export class StatusTextPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'open':
        return 'Aberta';
      case 'budgeted':
        return 'Orçada';
      case 'rejected':
        return 'Rejeitada';
      case 'approved':
        return 'Aprovada';
      case 'redirected':
        return 'Redirecionada';
      case 'fixed':
        return 'Arrumada';
      case 'paid':
        return 'Paga';
      case 'finalized':
        return 'Finalizada';
      default:
        return 'Indefinido';
    }
  }

}
