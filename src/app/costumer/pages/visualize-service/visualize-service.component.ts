import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { StatusStepperComponent } from '../../components/status-stepper/status-stepper.component';
import { Request } from '../../../core/types/request';


@Component({
  selector: 'app-visualize-service',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ButtonComponent, CommonModule, StatusStepperComponent],
  templateUrl: './visualize-service.component.html',
  styleUrl: './visualize-service.component.css'
})



export class VisualizeServiceComponent implements OnChanges, OnInit {

  budgeted: boolean = false;
  finalized: boolean = false;
  rejected: boolean = false;
  pageTitle: string = '';

  ngOnInit(): void {
    this.checkStatus();
  }

  request: Request = {
    requestId: 1,
    requestDesc: 'Computador travando',
    equipmentDesc: 'Notebook Lenovo velho',
    defectDesc: 'A tela parou de funcionar do nada depois de dar tela azul e eu acidentalmente acertar um soco no computador. Eu não sei o que aconteceu, mas acho que o problema é na tela ou na placa mãe ou a placa de video porque travava toda hora.',
    status: [
      {
        requestStatusId: '0',
        dateTime: new Date(),
        category: 'open', // Replace 'someCategory' with the actual category
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request // Replace with actual request object if needed
      },
      {
        requestStatusId: '1',
        dateTime: new Date(),
        category: 'budgeted', // Replace 'someCategory' with the actual category
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request // Replace with actual request object if needed
      },
      {
        requestStatusId: '2',
        dateTime: new Date(),
        category: 'budgeted', // Replace 'someCategory' with the actual category
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request // Replace with actual request object if needed
      },
      {
        requestStatusId: '3',
        dateTime: new Date(),
        category: 'open', // Replace 'someCategory' with the actual category
        senderEmployee: '',
        inChargeEmployee: 'Alisson Gabriel',
        request: {} as Request // Replace with actual request object if needed
      }
    ],
    budget: 1500.00,
    repairDesc: '',
    customerOrientations: '',
    image: ''
  };

  ngOnChanges(): void {}
  
  onReject() {
    //Adicionar o Modal que rejeita o nosso orçamento.
  }

  onApprove() {
    //Adicionar o Modal que aprova o nosso orçamento.
  }

  onPay() {
    //Adicioanr o Modal que paga.
  }

  onRescue() {
    //Adicionar o Modal que resgata
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
  button: string = "flex items-center justify-between mb-4 flex md:justify-center";
}
