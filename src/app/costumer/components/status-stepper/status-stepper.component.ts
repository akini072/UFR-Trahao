import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RequestStatus } from '../../../core/types/request-status';
import { statusMap } from '../../../core/types/status-map';

@Component({
  selector: 'app-status-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-stepper.component.html',
  styleUrls: ['./status-stepper.component.css']
})
export class StatusStepperComponent {
  @Input() statusList!: RequestStatus[];

  ol: string = "flex items-center justify-center text-xs text-gray-900 font-medium sm:text-base";
  item: string = "block whitespace-nowrap z-10";
  liStart: string = "flex w-full relative text-indigo-600 after:content-[''] after:w-full after:h-0.5 after:bg-indigo-600 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4";
  liMiddle: string = "flex w-full relative text-gray-900 after:content-[''] after:w-full after:h-0.5 after:bg-gray-200 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4";
  liEnd: string = "flex relative text-gray-900";
  incomplete: string = "w-6 h-6 bg-gray-50 border-2 border-gray-200 rounded-full flex justify-center items-center mx-auto mb-3 text-sm lg:w-10 lg:h-10";
  wip: string = "w-6 h-6 bg-indigo-50 border-2 border-indigo-600 rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-indigo-600 lg:w-10 lg:h-10";
  complete: string = "w-6 h-6 bg-indigo-600 border-2 border-indigo-600 rounded-full flex justify-center items-center mx-auto mb-3 text-sm text-white lg:w-10 lg:h-10";

  staticSteps = ['open', 'budgeted', 'approved', 'fixed', 'paid', 'finalized'];

  getLiClass(index: number): string {
    if (index === 0) {
      return this.liStart;
    } else if (index === this.statusList.length - 1) {
      return this.liEnd;
    }
    return this.liMiddle;
  }

  getSpanClass(category: string, index: number): string {
    const currentStepIndex = this.statusList.findIndex(status => this.staticSteps.includes(status.category));
    if (index < currentStepIndex) {
      return this.complete;
    } else if (index === currentStepIndex) {
      return this.wip;
    } else {
      return this.incomplete;
    }
  }

  getStepLabel(category: string): string {
    return statusMap[category];
  }
}
