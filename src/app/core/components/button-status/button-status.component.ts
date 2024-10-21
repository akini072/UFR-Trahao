import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RequestCategory } from '../../types/request-category';
import { AuthService } from '../../../auth/utils/auth.service';
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
  providers: [AuthService],
  templateUrl: './button-status.component.html',
  styleUrl: './button-status.component.css',
})
export class ButtonStatusComponent implements OnInit {
  @Input() status!: RequestCategory;
  @Input() id!: number;
  @Input() color: string = 'bg-gray-300';
  @Input() displayDisabled: boolean = false;
  buttonOptions: ButtonStatus[] = [];
  style = {
    cardButton: `text-xs p-2 cursor-pointer text-default-white font-semibold rounded`
  }

  constructor(private authService: AuthService) {}
  
  
  clientURI = this.authService.getCurrentUser().profile === 'Customer' ? '/cliente' : '/funcionario';
  ngOnInit() {
     this.buttonOptions = [
      {
        type: 'open',
        name: 'ABERTA',
        route: '',
        isDisabled: true,
      },
      { type: 'budgeted', name: 'APROVAR/REJEITAR', route: `${this.clientURI}/visualizar-servico/${this.id}`},
      { type: 'rejected', name: 'RESGATAR', route: `${this.clientURI}/visualizar-servico/${this.id}` },
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
      { type: 'fixed', name: 'PAGAR', route: `${this.clientURI}/visualizar-servico/${this.id}`},
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
  }

  selectButton(status: RequestCategory) {
    return this.buttonOptions.find((button) => button.type === status);
  }
}
