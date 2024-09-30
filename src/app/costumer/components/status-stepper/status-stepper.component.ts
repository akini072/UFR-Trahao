import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RequestStatus } from '../../../core/types/request-status';
import { Request } from '../../../core/types/request';
import { statusMap } from '../../../core/types/status-map';
import { statusBGColor, statusBorderColor, statusTextColor } from '../../../core/types/status-color';

@Component({
  selector: 'app-status-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-stepper.component.html',
  styleUrls: ['./status-stepper.component.css'],
})
export class StatusStepperComponent implements OnInit {
  @Input() statusList: RequestStatus[] = [];
  private originalStatusList: RequestStatus[] = [];
  staticSteps: RequestStatus[] = this.getStaticSteps();


  ngOnInit(): void {
    this.originalStatusList = [...this.statusList];
    this.statusList = this.getCombinedSteps();
  }

  // Retorna os passos estáticos padrão
  private getStaticSteps(): RequestStatus[] {
    const defaultRequest: Request = {} as Request;
    const currentDate = new Date();
    return [
      { requestStatusId: '', dateTime: currentDate, category: 'budgeted', senderEmployee: '', inChargeEmployee: '', request: defaultRequest },
      { requestStatusId: '', dateTime: currentDate, category: 'approved', senderEmployee: '', inChargeEmployee: '', request: defaultRequest },
      { requestStatusId: '', dateTime: currentDate, category: 'fixed', senderEmployee: '', inChargeEmployee: '', request: defaultRequest },
      { requestStatusId: '', dateTime: currentDate, category: 'paid', senderEmployee: '', inChargeEmployee: '', request: defaultRequest },
      { requestStatusId: '', dateTime: currentDate, category: 'finalized', senderEmployee: '', inChargeEmployee: '', request: defaultRequest }
    ];
  }

  // Combina os passos estáticos com os passos da lista de status
  private getCombinedSteps(): RequestStatus[] {
    const combinedSteps = [...this.statusList];
    this.staticSteps.forEach(staticStep => {
      if (!combinedSteps.some(step => step.category === staticStep.category)) {
        combinedSteps.push(staticStep);
      }
    });
    return combinedSteps;
  }

  // Retorna a classe CSS para o elemento <li> baseado no índice
  getLiClass(index: number): string {
    const isLastIndex = index === this.statusList.length - 1;
    const itemCategory = this.statusList[index].category;
    const isComplete = index < this.originalStatusList.length;

    if (isLastIndex) {
      return `${this.liEnd}`; // ou uma nova classe específica para o último item
    }
    return isComplete ? `${this.liComplete} ${statusTextColor[itemCategory]}` : `${this.liIncomplete} ${statusTextColor[itemCategory]}`;
  }

  // Retorna o valor do ícone para o elemento <span> baseado no índice
  getSpanValue(index: number): string {
    const isIncomplete = index === this.originalStatusList.length;
    return isIncomplete ? "hourglass_top" : index < this.originalStatusList.length ? "check" : "hourglass_empty";
  }

  // Retorna a classe CSS para o elemento <span> baseado na categoria e índice
  getSpanClass(category: string, index: number): string {
    const isComplete = index < this.originalStatusList.length;
    const incompleteClass = `${statusBGColor[category]} border-white text-white`;
    const completeClass = `bg-white ${statusBorderColor[category]} ${statusTextColor[category]}`;

    return `${this.span} ${isComplete ? incompleteClass : completeClass}`;
  }

  // Retorna o rótulo do passo baseado na categoria
  getStepLabel(category: string): string {
    return statusMap[category];
  }

  // Retorna a classe CSS para o cabeçalho do popover baseado na categoria
  getPopoverHeadClass(category: string): string {
    return `${statusBGColor[category]} ${statusBorderColor[category]} ${this.popoverHead}`;
  }

  // Retorna o texto do popover baseado no índice
  getPopoverText(index: number): string {
    const isComplete = index < this.originalStatusList.length;
    const inProgress = index === this.originalStatusList.length;
    const category = this.statusList[index].category;
    const dateTimeText = `${this.statusList[index].dateTime.toLocaleDateString('pt-BR')} às ${this.statusList[index].dateTime.toLocaleTimeString('pt-BR')}`;

    if (isComplete) {
      return this.getCompletePopoverText(category, index, dateTimeText);
    } else if (inProgress) {
      return `Em andamento`;
    } else {
      return `Aguardando fase anterior`;
    }
  }

  // Retorna o texto completo do popover para passos completos
  private getCompletePopoverText(category: string, index: number, dateTimeText: string): string {
    const statusText = statusMap[category];
    const senderEmployee = this.statusList[index].senderEmployee;
    const inChargeEmployee = this.statusList[index].inChargeEmployee;

    if (category === 'redirected') {
      return `${statusText} por ${senderEmployee} para ${inChargeEmployee} em ${dateTimeText}`;
    }

    if (category !== 'open' && category !== 'paid' && category !== 'rejected' && category !== 'approved') {
      return `${statusText} por ${inChargeEmployee} em ${dateTimeText}`;
    }

    return dateTimeText;
  }

  // CSS classes
  ol: string = "flex items-center justify-center text-xs text-gray-900 font-medium sm:text-base";
  liComplete: string = "z-0 flex w-full relative after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-8 after:bg-green-600";
  liIncomplete: string = "z-0 flex w-full relative after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-8 after:bg-gray-200";
  liEnd: string = "z-0 flex relative";
  item: string = "block whitespace-nowrap z-20";
  span: string = "w-6 h-6 border-2 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10 material-icons-round";
  pop: string = "absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800";
  popoverHead: string = "px-3 py-2 border-b rounded-t-lg ";
  popoverTitle: string = "font-bold text-white";
}
