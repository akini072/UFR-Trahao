import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { Request } from '../../../core/types/request';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../core/utils/modal.service';
import { ModalType } from '../../../core/types/modal-type';
import { RequestsService } from '../../../core/utils/requests.service';
import { CustomerService } from '../../../core/utils/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CpfMaskPipe } from '../../../core/utils/pipes/cpfMask/cpf-mask.pipe';
import { AddressPipePipe } from '../../../core/utils/pipes/address-pipe.pipe';
import { ModalResponse } from '../../../core/types/modal-response';
import { StatusStepperComponent } from "../../../customer/components/status-stepper/status-stepper.component";
import { Customer } from '../../../core/types/customer';
import { EquipCategory } from './../../../core/types/equip-category';
import { EquipCategoryService } from '../../../core/utils/equip-category.service';

@Component({
  selector: 'app-visualize-service-employee',
  standalone: true,
  imports: [ButtonComponent, NavbarComponent, FooterComponent, CommonModule, StatusStepperComponent, CpfMaskPipe, AddressPipePipe],
  providers: [RequestsService, CustomerService, EquipCategoryService],
  templateUrl: './visualize-service-employee.component.html',
  styleUrl: './visualize-service-employee.component.css'
})
export class VisualizeServiceEmployeeComponent {
  private serviceId!: number;
  open: boolean = false;
  approved: boolean = false;
  paid: boolean = false;
  request: Request;
  customer: Customer;
  equipCategory: EquipCategory;

  @ViewChild(StatusStepperComponent) statusStepper!: StatusStepperComponent;

  constructor(private modal: ModalService,
    private view: ViewContainerRef,
    private route: ActivatedRoute,
    private requestsService: RequestsService,
    private customerService: CustomerService,
    private equipCategoryService: EquipCategoryService,
  ) {
    this.initializeData();
    this.request = {} as Request;
    this.customer = {} as Customer;
    this.equipCategory = {} as EquipCategory;
  }

  async initializeData() {
    try {
      this.serviceId = Number.parseInt(this.route.snapshot.paramMap.get("id") || '');
      this.request = await this.requestsService.getRequestById(this.serviceId);
      this.customer = await this.customerService.getCustomer(this.request.customerId);
      this.equipCategory = await this.equipCategoryService.getEquipCategory(this.request.equipCategoryId);
      this.checkStatus();
    } catch (error) {
      console.error(error);
    }
  }

  checkStatus() {
    this.statusStepper.setStatusSteps(this.request.status);
    switch (this.request.status[this.request.status.length - 1].category) {
      case 'open':
        this.open = true;
        break;
      case 'approved':
      case 'redirected':
        this.approved = true;
        break;
      case 'paid':
        this.paid = true;
        break;
      default:
        this.open = false;
        this.approved = false;
        this.paid = false;
        break;
    }
  }

  onFix = () => {
    const data = {
      title: 'Realizar manutenção',
      message: 'Informe a descrição do serviço realizado',
      label: 'Confirmar',
    };
    this.modal.open(this.view, ModalType.INPUT, data).subscribe((value: ModalResponse) => {
      if (value.assert) {
        const newData = {
          title: 'Orientações',
          message: 'Informe as orientações para o cliente',
          label: 'Enviar',
        }
        this.modal.open(this.view, ModalType.INPUT, newData).subscribe((value: ModalResponse) => {
          if (value.assert) {
            this.request.status.push({
              requestStatusId: '5',
              dateTime: new Date(),
              category: 'fixed',
              senderEmployee: '',
              inChargeEmployee: 'Alisson Gabriel',
              request: {} as Request
            });
            this.checkStatus();
          }
        });
      }
    });
  };

  onRedirect = () => {
    const data = {
      title: 'Serviço Redirecionado',
      message: 'Por favor, informe o nome do funcionario a redirecionar',
      label: 'Redirecionar',
    };
    this.modal.open(this.view, ModalType.SELECT_EMPLOYEE, data).subscribe((value: ModalResponse) => {
      if (value.assert) {
        this.request.status.push({
          requestStatusId: '4',
          dateTime: new Date(),
          category: 'redirected',
          senderEmployee: 'Alisson Gabriel',
          inChargeEmployee: value.message || '',
          request: {} as Request
        });
        this.checkStatus();
      }
    });
  };

  onBudget = () => {
    const data = {
      title: 'Orçamento',
      message: 'Por favor, confira o valor do orçamento',
      label: 'Orçar',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value: ModalResponse) => {
      if (value.assert) {
        this.request.status.push({
          requestStatusId: '2',
          dateTime: new Date(),
          category: 'budgeted',
          senderEmployee: '',
          inChargeEmployee: 'Alisson Gabriel',
          request: {} as Request
        });
        this.checkStatus();
      }
    });
  };

  onPaid = () => {
    const data = {
      title: 'Finalização',
      message: 'Você confirma a finalização do serviço? Tem certeza mesmo?',
      label: 'Finalizar'
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value: ModalResponse) => {
      if (value.assert) {
        this.request.status.push({
          requestStatusId: '6',
          dateTime: new Date(),
          category: 'finalized',
          senderEmployee: '',
          inChargeEmployee: 'Alisson Gabriel',
          request: {} as Request
        });
        this.checkStatus();
      }
    });
  };

  styles = {
    main: 'container mx-auto p-4 max-w-4xl min-h-screen', // Adiciona max-width
    submain: 'mb-4 px-8 p-4 border rounded-lg shadow-sm flex flex-wrap bg-white',
    submain2: 'mb-4 p-4 border rounded-lg shadow-sm bg-white',
    title: 'text-2xl font-bold mb-4 text-center',
    subtitle: 'text-2xl font-bold mb-4 basis-full',
    basisHalf: 'basis-1/2 mb-4',
    basisFull: 'basis-full mb-4',
    semibold: 'font-semibold mb-2',
    textWrap: 'break-words overflow-hidden', // Adiciona quebra de texto e oculta o excesso
    textContainer: 'max-w-full', // Define a largura máxima do contêiner de texto
  }
}
