import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';
import { FormInputComponent } from '../../form-input/form-input.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-select',
  standalone: true,
  imports: [CommonModule, FormInputComponent, ReactiveFormsModule],
  templateUrl: '../modal.component.html',
})
export class ModalSelectEmployee extends ModalComponent implements OnInit {

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      employee: new FormControl(''),
    });
    this.inputControl = this.formGroup.get('employee') as FormControl;
    this.showSelectEmployee = true;
    this.showCancel = true;
  }

  override checkModal(): { [key: string]: boolean } {
    return { [this.style.modal]: true, 'border-red-300': true };
  }

  override resolve(): void {
    if (this.formGroup.valid) {
      this.error = false;
      this.lifeCycle.next({ assert: true, message: this.inputControl.value });
      this.lifeCycle.complete();
    } else{
      this.error = true;
    }
  }
}
