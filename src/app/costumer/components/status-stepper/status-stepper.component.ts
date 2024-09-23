import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RequestStatus } from '../../../core/types/request-status';
import { Request } from '../../../core/types/request';
import { statusMap } from '../../../core/types/status-map';
import { statusColorMap } from './../../../core/types/status-color-map';

@Component({
  selector: 'app-status-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-stepper.component.html',
  styleUrls: ['./status-stepper.component.css']
})
export class StatusStepperComponent {
  @Input() statusList!: RequestStatus[];
  originalStatusList = this.statusList;

  staticSteps: RequestStatus[] = [
    {
      requestStatusId: '',
      dateTime: new Date(),
      category: 'budgeted',
      senderEmployee: '',
      inChargeEmployee: '',
      request: {} as Request
    },
    {
      requestStatusId: '',
      dateTime: new Date(),
      category: 'approved',
      senderEmployee: '',
      inChargeEmployee: '',
      request: {} as Request
    },
    {
      requestStatusId: '',
      dateTime: new Date(),
      category: 'fixed',
      senderEmployee: '',
      inChargeEmployee: '',
      request: {} as Request
    },
    {
      requestStatusId: '',
      dateTime: new Date(),
      category: 'paid',
      senderEmployee: '',
      inChargeEmployee: '',
      request: {} as Request
    },
    {
      requestStatusId: '',
      dateTime: new Date(),
      category: 'finalized',
      senderEmployee: '',
      inChargeEmployee: '',
      request: {} as Request
    }
  ];

  ngOnInit() {
    this.originalStatusList = this.statusList;
    const combinedSteps = [...this.statusList];
    this.staticSteps.forEach(staticStep => {
      const existingIndex = combinedSteps.findIndex(step => step.category === staticStep.category);
      if (existingIndex === -1) {
        combinedSteps.push(staticStep);
      }
    });
    this.statusList = combinedSteps;
  }

  ol: string = "flex items-center justify-center text-xs text-gray-900 font-medium sm:text-base ";
  liComplete: string = "flex w-full relative text-indigo-600 ";
  liIncomplete: string = "flex w-full relative text-gray-900 ";
  liEnd: string = "flex relative text-gray-900";
  item: string = "block whitespace-nowrap z-10";
  span: string = "w-6 h-6 border-2 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10 ";


  getLiClass(index: number): string {
    if (index === this.statusList.length - 1) {
      return this.liEnd;
    }
    if (index < this.originalStatusList.length) {
      return this.liComplete;
    }
    return this.liIncomplete;
  }

  getSpanClass(category: string, index: number): string {
    console.log(this.originalStatusList.length);
    return `${this.span} ${index >= this.originalStatusList.length ? this.getCompleteColor(category) : this.getIncompleteColor(category)}`;
  }

  getStepLabel(category: string): string {
    return statusMap[category];
  }

  getIncompleteColor(category: string): string {
    return `bg-${statusColorMap[category]}
            border-${statusColorMap[category]}
            text-white`;
  }

  getCompleteColor(category: string): string {
    return `text-${statusColorMap[category]}
            border-${statusColorMap[category]}
            bg-white`;
  }
}
