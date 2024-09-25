import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestStatus } from '../../types/request';
import { RouterModule } from '@angular/router';

interface ButtonStatus{
  type?: RequestStatus;
  name: string;
  route: string;
}

@Component({
  selector: 'app-button-status',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './button-status.component.html',
  styleUrl: './button-status.component.css'
})

export class ButtonStatusComponent {
  @Input() status: RequestStatus | undefined;

  button = "flex justify-center rounded-lg px-4 py-2 mx-2";

  buttonVisualize = `${this.button} align-end bg-primary-2 hover:bg-primary-1 text-white`;
  buttonOrcada = `${this.button} text-white bg-primary-4 hover:bg-primary-3`;
  buttonRejeitada = `${this.button} text-default-white bg-secondary-5 hover:bg-secondary-4`;
  buttonPagar = `${this.button} bg-primary-8 text-white hover:bg-primary-7`;

  getButtonClass(status: RequestStatus): string {
    let classButton: string;
    switch(status) {
      case 'pending':
        classButton = this.buttonOrcada;
        break;

      case 'approved':
        classButton = this.buttonVisualize;
        break;

      case 'rejected':
        classButton = this.buttonRejeitada;
        break;

      case 'paid':
        classButton = this.buttonPagar;
        break;

      default:
        classButton = this.button;
        break;

      }
      return classButton;
  }

  buttonStatus: ButtonStatus[] = [
    { name: 'Orçada', route: 'orcamento'},
    { type: 'approved',name: 'Visualizar Serviço', route: '/servico'},
    { type: 'rejected',name: 'Rejeitada', route: '/resgatar'},
    { type: 'pending',name: 'Pagamento', route: '/pagamento'}
  ]

  selectedButton: ButtonStatus = this.buttonStatus.filter(button => button.type === this.status)[0] || { name: 'Indefinido', route: '' };

}


