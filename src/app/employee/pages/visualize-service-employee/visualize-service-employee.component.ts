import { Component,ViewContainerRef,ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { Request } from '../../../core/types/request';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../core/utils/modal.service';
import { ModalType } from '../../../core/types/modal-type';
import { RequestsService } from '../../../core/utils/requests.service';
import { ActivatedRoute } from '@angular/router';
import { StatusStepperComponent } from "../../../costumer/components/status-stepper/status-stepper.component";

@Component({
  selector: 'app-visualize-service-employee',
  standalone: true,
  imports: [ButtonComponent, NavbarComponent, FooterComponent, CommonModule, StatusStepperComponent],
  providers: [RequestsService],
  templateUrl: './visualize-service-employee.component.html',
  styleUrl: './visualize-service-employee.component.css'
})
export class VisualizeServiceEmployeeComponent {
  private serviceId!: number;
  open: boolean = false;
  approved: boolean = false;
  paid: boolean = false;
  request: Request;
  @ViewChild(StatusStepperComponent) statusStepper!: StatusStepperComponent;

  constructor(private modal: ModalService, 
    private view: ViewContainerRef,  
    private route: ActivatedRoute,
    private requestsService: RequestsService) {
    try{
      this.serviceId = Number.parseInt(this.route.snapshot.paramMap.get("id") || '');
      this.requestsService.getRequestById(this.serviceId).then((data: Request) => {
        this.request = data;
        this.checkStatus();
      });
    } catch(error){
      console.error(error);
    }
    this.request = {} as Request;
  }

  checkStatus(){
    this.statusStepper.setStatusSteps(this.request.status);
    switch (this.request.status[this.request.status.length-1].category) {
      case 'open':
        this.open = true;
        break;
      case 'approved':
        this.approved = true;
        break;
      case 'paid':
        this.paid = true;
        break;
    }

  }

  onFix=()=>{
    const data = {
      title: 'Serviço Realizado',
      message: 'Confirma que o serviço foi realizado?',
      label: 'Realizar',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe(() => {
      this.request.status[this.request.status.length-1].category = 'paid';
    });
    //implementar a lógica para arrumar o componente. deve guardar o funcionario, data e hora
  };

  onRedirect=()=>{
    //implementar a lógica para passar o concerto para outro funcionario
    const data = {
      title: 'Serviço Redirecionado',
      message: 'Por favor, informe o nome do funcionario a redirecionar',
      label: 'Redirecionar',
    };
    this.modal.open(this.view, ModalType.INPUT, data).subscribe((value) => {
    });
  };

  onBudget=()=>{
    //implementar lógica de salvar o valor do orçamento e timestamp junto do nome do funcionario
    const data = {
      title: 'Orçamento',
      message: 'Por favor, confira o valor do orçamento',
      label: 'Orçar',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value) => {
    });
  };

  onPaid=()=>{
    //inserir lógica de finalizar o serviço
    const data = {
      title: 'Finalização',
      message: 'Você confirma a finalização do serviço? Tem certeza mesmo?',
      label: 'Finalizar'
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value) => {
    });
  };

  styles = {
    main: 'container mx-auto p-4',
    submain: 'mb-4 px-8 p-4 border rounded-lg shadow-sm flex flex-wrap bg-white',
    submain2: 'mb-4 p-4 border rounded-lg shadow-sm bg-white',
    title: 'text-2xl font-bold mb-4 text-center',
    subtitle: 'text-xl font-bold mb-4 basis-full',
    basisHalf: 'basis-1/2 mb-4',
    basisFull: 'basis-full mb-4',
    semibold: 'font-semibold mb-2'
  }

}
