import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';
import { FormInputComponent } from '../../form-input/form-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [CommonModule, FormInputComponent, ReactiveFormsModule],
  templateUrl: '../modal.component.html',
})
export class ModalConfirmComponent extends ModalComponent implements OnInit{

  ngOnInit(): void {
    this.showCancel = true;
  }

  override checkModal(): { [key: string]: boolean; } {
    return { [this.style.modal]: true, 'border-yellow-400': true };
  }

  override resolve(): void {
    this.lifeCycle.next({ assert: true });
    this.lifeCycle.complete();
  }

}
