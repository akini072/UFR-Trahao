import {
  Component,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { StatusStepperComponent } from '../../components/status-stepper/status-stepper.component';
import { Request } from '../../../core/types/request';
import { ModalService } from '../../../core/utils/modal.service';
import { ModalType } from '../../../core/types/modal-type';

@Component({
  selector: 'app-visualize-service',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    CommonModule,
    StatusStepperComponent,
  ],
  templateUrl: './visualize-service.component.html',
  styleUrl: './visualize-service.component.css',
})
export class VisualizeServiceComponent implements OnInit {
  budgeted: boolean = false;
  finalized: boolean = false;
  rejected: boolean = false;
  pageTitle: string = '';

  constructor(private modal: ModalService, private view: ViewContainerRef) {}

  ngOnInit(): void {
    this.checkStatus();
  }

  request: Request = {
    requestId: 1,
    requestDesc: 'Computador travando',
    equipmentDesc: 'Notebook Lenovo velho',
    defectDesc:
      'A tela parou de funcionar do nada depois de dar tela azul e eu acidentalmente acertar um soco no computador. Eu não sei o que aconteceu, mas acho que o problema é na tela ou na placa mãe ou a placa de video porque travava toda hora.',
    status: [
      {
        requestStatusId: '0',
        dateTime: new Date(),
        category: 'open',
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request
      },
      {
        requestStatusId: '1',
        dateTime: new Date(),
        category: 'budgeted',
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',

        request: {} as Request, // Replace with actual request object if needed
      },
      {
        requestStatusId: '2',
        dateTime: new Date(),
        category: 'rejected',
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request, // Replace with actual request object if needed
      },
      {
        requestStatusId: '3',
        dateTime: new Date(),
        category: 'approved',
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request
      },
      {
        requestStatusId: '4',
        dateTime: new Date(),
        category: 'redirected',
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request
      },
      {
        requestStatusId: '5',
        dateTime: new Date(),
        category: 'fixed',
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request
      },
      {
        requestStatusId: '6',
        dateTime: new Date(),
        category: 'paid',
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request
      },
      {
        requestStatusId: '7',
        dateTime: new Date(),
        category: 'finalized',
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request
      }
    ],
    budget: 1500.0,
    repairDesc: '',
    customerOrientations: '',
    image: '',
  };

  ngOnChanges(): void {}
  onReject() {
    //Adicionar o Modal que rejeita o nosso orçamento.
    const data = {
      title: 'Serviço Recusado',
      message: 'Por favor, informe o motivo da rejeição',
      label: 'Recusar',
    };
    this.modal.open(this.view, ModalType.INPUT, data).subscribe((value) => {
      console.log(value);
    });
  }

  onApprove() {
    //Adicionar o Modal que aprova o nosso orçamento.
    const data = {
      title: 'Serviço Aprovado',
      message: 'Serviço aprovado no valor de R$ xxxx',
      label: 'Aprovar',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value) => {
      console.log(value);
    });
  }

  onPay() {
    //Adicioanr o Modal que paga.
  }

  onRescue() {
    //Adicionar o Modal que resgata
    const data = {
      title: 'Resgatar Serviço',
      message: 'Deseja resgatar e aprovar esse serviço?',
      label: 'Resgatar',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value) => {
      console.log(value);
    });
  }

  checkStatus() {
    switch (this.request.status[this.request.status.length - 1].category) {
      case 'fixed':
        this.budgeted = false;
        this.finalized = true;
        this.rejected = false;
        this.pageTitle = 'Pagar Serviço';
        break;
      case 'budgeted':
        this.budgeted = true;
        this.finalized = false;
        this.rejected = false;
        this.pageTitle = 'Serviço orçado';
        break;
      case 'rejected':
        this.budgeted = false;
        this.finalized = false;
        this.rejected = true;
        this.pageTitle = 'Orçamento rejeitado';
        break;
      default:
        this.budgeted = false;
        this.finalized = false;
        this.rejected = false;
        this.pageTitle = 'Visualizar Serviço';
        break;
    }
  }
  button: string =
    'flex items-center justify-between mb-4 flex md:justify-center';
}
