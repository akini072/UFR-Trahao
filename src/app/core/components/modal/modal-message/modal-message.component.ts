import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';
import { FormInputComponent } from '../../form-input/form-input.component';

@Component({
  selector: 'app-modal-message',
  standalone: true,
  imports: [CommonModule, FormInputComponent],
  templateUrl: '../modal.component.html',
})
export class ModalMessageComponent extends ModalComponent {

  override checkModal(): { [key: string]: boolean; } {
    return { [this.style.modal]: true, 'border-green-300': true };
  }

  override resolve(): void {
    this.lifeCycle.next({ assert: true });
    this.lifeCycle.complete();
  }

}
