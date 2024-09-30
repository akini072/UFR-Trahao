import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';
import { FormInputComponent } from '../../form-input/form-input.component';

@Component({
  selector: 'app-modal-input',
  standalone: true,
  imports: [CommonModule, FormInputComponent],
  templateUrl: '../modal.component.html',
})
export class ModalInputComponent extends ModalComponent implements OnInit {
  ngOnInit(): void {
    this.showInput = true;
    this.showCancel = true;
  }

  override checkModal(): { [key: string]: boolean } {
    return { [this.modal]: true, 'border-red-300': true };
  }

  override resolve() {}
}
