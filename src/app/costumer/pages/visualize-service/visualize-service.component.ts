import { Component,OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  pageTitle: string = '';

  ngOnInit(): void {
      this.checkStatus();
  }

  requestList: Request[] = [
    {
      id: 1,
      title: 'Alisson da Silva',
      description: 'Computador',
      status: 'pending',
      created_at: '',
      image: ''
    }
  ];

  ngOnChanges(): void {
    console.log("Valor mudasse")
  }
  onReject(){
  }

  onApprove(){
  }

  onPay(){
  }

  checkStatus(){
    const request = this.requestList[0];

    switch (request.status){
      case 'approved':
        this.budgeted = false;
        this.finalized = true;
        this.pageTitle = 'Pague já!';
        break;
      case 'pending':
        this.budgeted = true;
        this.finalized = false;
        this.pageTitle = 'Aprove ou reprove o Orçamento!';
        break;
      default:
        this.budgeted = false;
        this.finalized = false;
        this.pageTitle = 'Visualizar Serviço';
        break;
    }
  }
  button: string = "flex items-center justify-between mb-4 flex md:justify-center";
}
