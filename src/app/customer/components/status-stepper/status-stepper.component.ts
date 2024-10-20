import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
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
export class StatusStepperComponent {
  public statusList: RequestStatus[] = [];
  private completedSteps: number = 0;
  staticSteps: RequestStatus[] = this.getStaticSteps();

  constructor(private cdr: ChangeDetectorRef) { }

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
  public setStatusSteps(steps: RequestStatus[]): void {
    this.completedSteps = steps.length;
    const combinedSteps = [...steps];
    this.staticSteps.forEach(staticStep => {
      if (!combinedSteps.some(step => step.category === staticStep.category)) {
        combinedSteps.push(staticStep);
      }
    });
    this.statusList = combinedSteps;
    this.cdr.detectChanges();
  }

  // Retorna a classe CSS para o elemento <li> baseado no índice
  getLiClass(index: number): string {
    const isLastIndex = index === this.statusList.length - 1;
    const itemCategory = this.statusList[index].category;
    const isComplete = index < this.completedSteps;

    if (isLastIndex) {
      return `${this.style.liEnd}`; // ou uma nova classe específica para o último item
    }
    return isComplete ? `${this.style.liComplete} ${statusTextColor[itemCategory]}` : `${this.style.liIncomplete} ${statusTextColor[itemCategory]}`;
  }

  // Retorna o valor do ícone para o elemento <span> baseado no índice
  getSpanValue(index: number): string {
    const isIncomplete = index === this.completedSteps;
    return isIncomplete ? "hourglass_top" : index < this.completedSteps ? "check" : "hourglass_empty";
  }

  // Retorna a classe CSS para o elemento <span> baseado na categoria e índice
  getSpanClass(category: string, index: number): string {
    const isComplete = index < this.completedSteps;
    const incompleteClass = `${statusBGColor[category]} border-white text-white`;
    const completeClass = `bg-white ${statusBorderColor[category]} ${statusTextColor[category]}`;

    return `${this.style.span} ${isComplete ? incompleteClass : completeClass}`;
  }

  // Retorna o rótulo do passo baseado na categoria
  getStepLabel(category: string): string {
    return statusMap[category];
  }

  // Retorna a classe CSS para o cabeçalho do popover baseado na categoria
  getPopoverHeadClass(category: string): string {
    return `${statusBGColor[category]} ${statusBorderColor[category]} ${this.style.popoverHead}`;
  }

  // Retorna o texto do popover baseado no índice
  getPopoverText(index: number): string {
    const isComplete = index < this.completedSteps;
    const inProgress = index === this.completedSteps;
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

  showPopover(event: MouseEvent, index: number): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    if (!currentTarget) return;
    const popover = document.querySelector(`#popover-${index}`) as HTMLElement;
    popover.classList.remove('hidden');
  }

  hidePopover(event: MouseEvent, index: number): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    if (!currentTarget) return;
    const popover = document.querySelector(`#popover-${index}`) as HTMLElement;
    popover.classList.add('hidden');
  }

  // CSS classes
  style = {
    container: "mx-auto",
    title: "text-xl font-bold mb-6 text-gray-800 flex items-center justify-between",
    ol: "flex flex-col gap-2 items-start justify-center w-full text-xs text-gray-900 font-medium sm:text-base",
    liComplete: "z-0 flex w-full relative after:content-[''] after:w-0.5 after:h-6 after:inline-block after:absolute after:top-12 after:left-7 after:bg-green-600",
    liIncomplete: "z-0 flex w-full relative  after:content-[''] after:w-0.5 after:h-6 after:inline-block after:absolute after:top-12 after:left-7 after:bg-gray-200",
    liEnd: "z-0 flex relative",
    item: "block whitespace-nowrap z-20 m-2 cursor-pointer flex items-center gap-2",
    span: "w-6 h-6 border-2 rounded-full flex justify-center items-center mx-auto text-sm lg:w-10 lg:h-10 material-icons-round",
    pop: "absolute translate-x-40 hidden z-10 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800",
    popoverHead: "px-3 py-2 border-b rounded-t-lg ",
    popoverTitle: "font-bold text-white"
  }
}
