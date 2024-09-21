import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-modal-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../modal.component.html'
})
export class ModalInputComponent extends ModalComponent {

  override ngOnInit(): void {
    this.showInput = true;
    this.showCancel = false;
    console.log(this.showInput);
  }

  override checkModal(): { [key: string]: boolean; } {
    return { [this.modal]: true, 'border-red-300': true };
  }

  override resolve() {
    
  }

}
