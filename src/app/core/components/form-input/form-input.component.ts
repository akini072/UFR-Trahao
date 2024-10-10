import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy, Pipe } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { CustomValidator } from '../../utils/custom-validators';
import { CepMaskPipe } from '../../utils/pipes/cepMask/cep-mask.pipe';
import { CpfMaskPipe } from '../../utils/pipes/cpfMask/cpf-mask.pipe';

type FormTextInputType = 'text' | 'password' | 'email' | 'number';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormInputComponent {
  @Input() id?: string;
  @Input() type: FormTextInputType = 'text';
  @Input() validations?: string[];
  @Input() placeholder?: string;
  @Input() mask?: string;
  @Input() control?: FormControl;

  icon: string = 'visibility_off';
  visibility: boolean = false;
  errorMessage: string = '';

  style = {
    input: "shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline",
    eye: "absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none hover:text-blue-600 dark:text-neutral-600 dark:hover:text-blue-500",
    error: 'text-red-500 text-sm italic',
  }

  ngOnInit() {
    this.configureValidators();
    if(this.control){
      // Inscreve-se nas mudanças de valor do controle para aplicar a máscara configurada e as mensagens de erro
      this.control?.valueChanges.subscribe((value) => {
        this.control?.setValue(this.configureMask(), { emitEvent: false });
      });
      this.control?.statusChanges.subscribe(() => {
        this.updateErrorMessage();
      });
    }
  }

  /**
   * Configura os validadores com base nas validações fornecidas.
   */
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

  /**
   * Aplica a máscara configurada ao valor do controle.
   * @returns O valor do controle com a máscara aplicada.
   */
  configureMask(): string {
    if (this.mask === 'cpf') {
      return new CpfMaskPipe().transform(this.control?.value);
    }
    if (this.mask === 'cep') {
      return new CepMaskPipe().transform(this.control?.value);
    }
    return this.control?.value;
  }

  /**
   * Retorna a mensagem de erro apropriada com base nos erros do controle.
   */
  updateErrorMessage(): void {
    const errorType = this.control?.errors ? Object.keys(this.control.errors)[0] : null;
    
    switch (errorType) {
      case 'email':
        this.errorMessage = 'Email inválido';
        break;
      case 'invalidCpf':
        this.errorMessage = 'CPF inválido';
        break;
      case 'invalidCep':
        this.errorMessage = 'CEP inválido';
        break;
      case 'pattern':
        this.errorMessage = 'Apenas números são permitidos';
        break;
      default:
        this.errorMessage = '';
        break;
    }
  }

  /**
   * Alterna a visibilidade do campo de entrada (usado para campos de senha).
   */
  toggleVisibility(): void {
    this.icon = this.visibility ? `visibility_off` : `visibility`;
    this.visibility = !this.visibility;
    this.type = this.visibility ? 'text' : 'password';
  }
}