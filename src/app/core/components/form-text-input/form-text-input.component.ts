import { Component, Input } from '@angular/core';

interface FormTextInput {
  status?: string;

}

@Component({
  selector: 'app-form-text-input',
  standalone: true,
  imports: [],
  templateUrl: './form-text-input.component.html',
  styleUrl: './form-text-input.component.css'
})
export class FormTextInputComponent {
  @Input() type: string | undefined;
  @Input() status: string | undefined;
  @Input() placeholder: string | undefined;

  input = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  intputPassword = `${this.input} `;

  getInputTextClass(status: string | undefined): string {
    let inputTextClass : string;
    switch (status) {
      case 'senha':
        inputTextClass =  this.intputPassword;
        break;
      default:
        inputTextClass =  this.input;
        break;
    }
    return inputTextClass;
  }

  formTextInput: FormTextInput[] = [
    { status: 'valid' },
    { status: 'invalid' }
  ];
}
