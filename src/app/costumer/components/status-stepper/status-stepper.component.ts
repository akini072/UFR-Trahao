import { CommonModule } from '@angular/common';
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
  styleUrls: ['./status-stepper.component.css']
})
export class StatusStepperComponent implements OnInit {
  @Input() statusList: RequestStatus[] = [];
  private originalStatusList: RequestStatus[] = [];
  staticSteps: RequestStatus[] = this.getStaticSteps();

  ngOnInit(): void {
    this.originalStatusList = [...this.statusList];
    this.statusList = this.getCombinedSteps();
  }

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

  private getCombinedSteps(): RequestStatus[] {
    const combinedSteps = [...this.statusList];
    this.staticSteps.forEach(staticStep => {
      if (!combinedSteps.some(step => step.category === staticStep.category)) {
        combinedSteps.push(staticStep);
      }
    });
    return combinedSteps;
  }

  getLiClass(index: number): string {
    const isLastIndex = index === this.statusList.length - 1;
    const itemCategory = this.statusList[index].category;
    const isComplete = index < this.originalStatusList.length;

    if (isLastIndex) {
      return `${this.liEnd}`; // ou uma nova classe específica para o último item
    }
    return isComplete ? `${this.liComplete} ${statusTextColor[itemCategory]}` : `${this.liIncomplete} ${statusTextColor[itemCategory]}`;
  }

  getSpanValue(index: number): string {
    const isLastOriginalIndex = index === this.originalStatusList.length;
    return isLastOriginalIndex ? "hourglass_top" : index < this.originalStatusList.length ? "check" : "hourglass_empty";
  }

  getSpanClass(category: string, index: number): string {
    const isComplete = index < this.originalStatusList.length;
    const incompleteClass = `${statusBGColor[category]} border-white text-white`;
    const completeClass = `bg-white ${statusBorderColor[category]} ${statusTextColor[category]}`;

    return `${this.span} ${isComplete ? incompleteClass : completeClass}`;
  }

  getStepLabel(category: string): string {
    return statusMap[category];
  }

  // CSS classes
  ol: string = "flex items-center justify-center text-xs text-gray-900 font-medium sm:text-base";
  liComplete: string = "z-0 flex w-full relative after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-8 after:bg-green-600";
  liIncomplete: string = "z-0 flex w-full relative after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-8 after:bg-gray-200";
  liEnd: string = "z-0 flex w-full relative";
  item: string = "block whitespace-nowrap z-20";
  span: string = "w-6 h-6 border-2 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10 material-icons-round";
}
