import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { NavbarComponent, FooterComponent, ButtonComponent } from '../../../core/components';
import { StatusStepperComponent } from '../../components/status-stepper/status-stepper.component';
import { Request, EquipCategory, requestUpdate } from '../../../core/types';
import { ModalService, ModalType, ModalResponse } from '../../../core/components/modal';
import { RequestsService } from '../../../core/utils/requests.service';
import { BrCurrencyPipe } from '../../../core/utils/pipes';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-visualize-service',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    CommonModule,
    StatusStepperComponent,
    BrCurrencyPipe
  ],
  providers: [RequestsService],
  templateUrl: './visualize-service.component.html',
  styleUrl: './visualize-service.component.css',
})
export class VisualizeServiceComponent {
  serviceId!: number;
  budgeted: boolean = false;
  finalized: boolean = false;
  rejected: boolean = false;
  open: boolean = false;
  pageTitle: string = '';
  request: Request;
  equipCategory: EquipCategory;

  @ViewChild(StatusStepperComponent) statusStepper!: StatusStepperComponent;

  constructor(
    private modal: ModalService,
    private view: ViewContainerRef,
    private route: ActivatedRoute,
    private requestsService: RequestsService,
  ) {
    this.request = {} as Request;
    this.equipCategory = {} as EquipCategory;
    this.loadData();
  }

  async loadData() {
    try {
      this.serviceId = Number.parseInt(this.route.snapshot.paramMap.get("id") || '');
      this.request = await lastValueFrom(this.requestsService.getRequestById(this.serviceId));
      this.equipCategory = this.request.equipCategory;
      this.checkStatus();
    } catch (error) {
      console.error(error);
    }
  }

  onReject = () => {
    const data = {
      title: 'Serviço Recusado',
      message: 'Por favor, informe o motivo da rejeição',
      label: 'Recusar',
    };
    this.modal.open(this.view, ModalType.INPUT, data).subscribe((value: ModalResponse) => {
      if (value.assert) {
        const update = new requestUpdate(this.request.requestId, "budgeted", "rejected", Date.now());
        update.rejectionReason = value.message as string;
        this.requestsService.updateRequestStatus(update).subscribe(() => {
          this.loadData();
        });
      }
    });
  }

  onApprove = () => {
    const data = {
      title: 'Serviço Aprovado',
      message: 'Serviço aprovado no valor de R$ ' + this.request.budget + '.',
      label: 'Aprovar',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value: ModalResponse) => {
      if (value.assert) {
        const update = new requestUpdate(this.request.requestId, "budgeted", "approved", Date.now());
        this.requestsService.updateRequestStatus(update).subscribe(() => {
          this.loadData();
        });
      }
    });
  }

  onPay = () => {
    const data = {
      title: 'Pagar serviço',
      message: 'Confirmar pagamento?',
      label: 'Pagar',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value: ModalResponse) => {
      if (value.assert) {
        const update = new requestUpdate(this.request.requestId, "fixed", "paid", Date.now());
        this.requestsService.updateRequestStatus(update).subscribe(() => {
          this.loadData();
        });
      }
    });
  };

  onRescue = () => {
    const data = {
      title: 'Resgatar Serviço',
      message: 'Deseja resgatar e aprovar esse serviço?',
      label: 'Resgatar',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value: ModalResponse) => {
      if (value.assert) {
        const update = new requestUpdate(this.request.requestId, "rejected", "approved", Date.now());
        this.requestsService.updateRequestStatus(update).subscribe(() => {
          this.loadData();
        });
      }
    });
  }

  checkStatus() {
    this.statusStepper.setStatusSteps(this.request.status);
    switch (this.request.status[this.request.status.length - 1].category) {
      case 'open':
        this.rejected = false;
        this.finalized = false;
        this.budgeted = false;
        this.open = true;
        this.pageTitle = 'Serviço aberto';
        break;
      case 'fixed':
        this.finalized = true;
        this.budgeted = false;
        this.rejected = false;
        this.open = false;
        this.pageTitle = 'Pagar Serviço';
        break;
      case 'budgeted':
        this.budgeted = true;
        this.finalized = false;
        this.rejected = false;
        this.open = false;
        this.pageTitle = 'Serviço orçado';
        break;
      case 'rejected':
        this.rejected = true;
        this.finalized = false;
        this.budgeted = false;
        this.open = false;
        this.pageTitle = 'Orçamento rejeitado';
        break;
      default:
        this.rejected = false;
        this.finalized = false;
        this.budgeted = false;
        this.open = false;
        this.pageTitle = 'Visualizar Serviço';
        break;
    }
  }

  styles = {
    main: 'container mx-auto p-4 max-w-4xl min-h-screen', // Adiciona max-width
    submain: 'mb-4 px-8 p-4 border rounded-lg shadow-sm flex flex-wrap bg-white w-full max-w-4xl',
    submain2: 'mb-4 px-8 p-4 border rounded-lg shadow-sm bg-white w-full max-w-4xl',
    title: 'text-2xl font-bold mb-4 text-center',
    subtitle: 'text-2xl font-bold mb-4 basis-full',
    basisHalf: 'basis-1/2 mb-4',
    basisFull: 'basis-full mb-4',
    semibold: 'font-semibold mb-2',
    budget: 'font-semibold text-2xl text-primary-7',
    textWrap: 'break-words overflow-hidden', // Adiciona quebra de texto e oculta o excesso
    textContainer: 'max-w-full', // Define a largura máxima do contêiner de texto
  };
}
