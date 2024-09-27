import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy, Pipe } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { CustomValidator } from '../../utils/custom-validators';
import { CepMaskPipe } from '../../utils/pipes/cepMask/cep-mask.pipe';
import { CpfMaskPipe } from '../../utils/pipes/cpfMask/cpf-mask.pipe';


type FormTextInputType = 'text' | 'password' | 'email' | 'number' | 'date';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormInputComponent {
  @Input() type: FormTextInputType = 'text';
  @Input() validations?: string[];
  @Input() placeholder?: string;
  @Input() mask?: string;
  @Input() control?: FormControl;
  input = "shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline";
  eye: string = "absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none hover:text-blue-600 dark:text-neutral-600 dark:hover:text-blue-500";
  icon: string = 'visibility_off';
  error: string = 'text-red-500 text-sm italic';
  visibility: boolean = false;

  ngOnInit() {
    this.configureValidators();
    if(this.control){
      this.control?.valueChanges.subscribe((value) => {
        this.control?.setValue(this.configureMask(), { emitEvent: false });
      });
    }
  }

  configureValidators(): void {
    const customValidator = new CustomValidator();
    const validators: ValidatorFn[] = [];
    if (this.validations) {
      this.validations.forEach((validation) => {
        if (validation === 'required') {
          validators.push(Validators.required);
        }
        if (validation === 'email') {
          validators.push(Validators.email);
        }
        if (validation === 'cpf') {
          validators.push(customValidator.cpfValidator());
        }
        if (validation === 'cep') {
          validators.push(customValidator.cepValidator());
        }
        if (validation === 'number'){
          validators.push(Validators.pattern('^[0-9]*$'));
        }
      });
    }
    this.control?.setValidators(validators);
    this.control?.updateValueAndValidity();
  }

  configureMask(): string {
    if (this.mask === 'cpf') {
      return new CpfMaskPipe().transform(this.control?.value);
    }
    if (this.mask === 'cep') {
      return new CepMaskPipe().transform(this.control?.value);
    }
    return this.control?.value;
  }

  getErrorMessage(): string {
    if (this.control?.hasError('email')) {
      return 'Email inválido';
    }
    if (this.control?.hasError('invalidCpf')) {
      return 'CPF inválido';
    }
    if (this.control?.hasError('invalidCep')) {
      return 'CEP inválido';
    }
    if (this.control?.hasError('pattern')) {
      return 'Apenas números são permitidos';
    }
    return '';
  }

  toggleVisibility(): void {
    this.icon = this.visibility ? `visibility_off` : `visibility`;
    this.visibility = !this.visibility;
    this.type = this.visibility ? 'text' : 'password';
  }
}
