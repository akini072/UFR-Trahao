import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestCategory } from '../../types/request-category';
interface ButtonStatus {
  type: RequestCategory;
  name: string;
  route: string;
  isDisabled?: boolean;
}

@Component({
  selector: 'app-button-status',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './button-status.component.html',
  styleUrl: './button-status.component.css',
})
export class ButtonStatusComponent {
  @Input() status!: RequestCategory;
  @Input() color: string = 'bg-gray-300';
  @Input() displayDisabled: boolean = false;

  cardButton = `text-xs p-2 cursor-pointer text-default-white font-semibold rounded`;

  buttonOptions: ButtonStatus[] = [
    {
      type: 'open',
      name: 'ABERTA',
      route: '',
      isDisabled: true,
    },
    { type: 'budgeted', name: 'APROVAR/REJEITAR', route: 'visualizar-servico/3' },
    { type: 'rejected', name: 'RESGATAR', route: 'visualizar-servico/3' },
    {
      type: 'approved',
      name: 'APROVADA',
      route: '',
      isDisabled: true,
    },
    {
      type: 'redirected',
      name: 'REDIRECIONADA',
      route: '',
      isDisabled: true,
    },
    { type: 'fixed', name: 'PAGAR', route: 'visualizar-servico/3' },
    {
      type: 'paid',
      name: 'PAGO',
      route: '',
      isDisabled: true,
    },
    {
      type: 'finalized',
      name: 'FINALIZADA',
      route: '',
      isDisabled: true,
    },
  ];

  selectButton(status: RequestCategory) {
    return this.buttonOptions.find((button) => button.type === status);
  }
}
