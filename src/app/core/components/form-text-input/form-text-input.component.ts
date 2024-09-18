import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';


type FormTextInputType = 'text' | 'password' | 'email' | 'number' | 'date';

@Component({
  selector: 'app-form-text-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-text-input.component.html',
  styleUrls: ['./form-text-input.component.css'],
  providers: [DatePipe]
})

export class FormTextInputComponent {
  @Input() type: FormTextInputType = "text";
  @Input() placeholder: string | undefined;
  @Input() value: string | undefined;
  formattedDate: string | undefined;

  input = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  inputPassword = `${this.input} `;
  inputDate = `${this.input} `;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    if (this.type === 'date' && this.value) {
      this.formattedDate = this.datePipe.transform(this.value, 'dd-MM-yyyy')!;
    }
  }

  getInputTextClass(type: FormTextInputType | undefined): string {
    let inputTextClass: string;
    switch (type) {
      case 'text':
        inputTextClass = this.inputPassword;
        break;
      case 'password':
        inputTextClass = this.inputPassword;
        break;
      case 'email':
        inputTextClass = this.input;
        break;
      case 'number':
        inputTextClass = this.input;
        break;
      default:
        inputTextClass = this.input;
        break;
    }
    return inputTextClass;
  }

}
