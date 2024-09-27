import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';


type FormTextInputType = 'text' | 'password' | 'email' | 'number' | 'date';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
  providers: [DatePipe]
})

export class FormInputComponent {
  @Input() type: FormTextInputType = 'text';
  @Input() placeholder: string | undefined;
  @Input() value: string | undefined;
  formattedDate: string | undefined;
  input = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  eye: string = "absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500";
  icon: string = 'visibility_off';
  visibility: boolean = false;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    if (this.type === 'date' && this.value) {
      this.formattedDate = this.datePipe.transform(this.value, 'dd-MM-yyyy')!;
    }
  }

  toggleVisibility(): void {
    this.visibility = !this.visibility;
    this.icon = this.visibility ? `visibility_off` : `visibility`;
    this.type = this.visibility ? 'text' : 'password';
  }
}
