import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-modal-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../modal.component.html',
})
export class ModalMessageComponent extends ModalComponent {

  override checkModal(): { [key: string]: boolean; } {
    return { [this.modal]: true, 'border-green-300': true };
  }

  override resolve() {
    
  }

}
