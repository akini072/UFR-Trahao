import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';
import { FormInputComponent } from '../../form-input/form-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-error',
  standalone: true,
  imports: [CommonModule, FormInputComponent, ReactiveFormsModule],
  templateUrl: '../modal.component.html',
})
export class ModalErrorComponent extends ModalComponent {

  override checkModal(): { [key: string]: boolean; } {
    return { [this.style.modal]: true, 'border-red-600': true };
  }

  override resolve(): void {
    this.lifeCycle.next({ assert: true });
    this.lifeCycle.complete();
  }

}
