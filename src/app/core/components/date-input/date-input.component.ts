import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { CustomValidator } from '../../utils/custom-validators';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent implements OnChanges {
  @Input() id?: string;
  @Input() placeholder?: string;
  @Input() validations?: string[];
  @Input() control?: FormControl;

  errorMessage: string = '';

  style = {
    input: "shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline",
    error: 'text-red-500 text-sm italic',
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validations'] || changes['control']) {
      this.configureValidators();
      if (this.control) {
        this.control.statusChanges.subscribe(() => {
          this.updateErrorMessage();
        });
      }
    }
  }

  private configureValidators(): void {
    const customValidator = new CustomValidator();
    const validators: ValidatorFn[] = [];
    if (this.validations) {
      this.validations.forEach((validation) => {
        if (validation === 'required') {
          validators.push(Validators.required);
        }
        if (validation === 'age') {
          validators.push(customValidator.ageValidator());
        }
      });
    }
    if (this.control) {
      this.control.setValidators(validators);
      this.control.updateValueAndValidity();
    }
  }

  configureMask(): string {
    const value = this.control?.value;
    if (value) {
      const date = new Date(value);
      return date.toLocaleDateString('pt-BR');
    }
    return '';
  }

  private updateErrorMessage(): void {
    const errorType = this.control?.errors ? Object.keys(this.control.errors)[0] : null;

    switch (errorType) {
      case 'required':
        this.errorMessage = 'Campo obrigatório';
        break;
      case 'invalidDate':
        this.errorMessage = 'Data inválida';
        break;
      default:
        this.errorMessage = '';
        break;
    }
  }
}
