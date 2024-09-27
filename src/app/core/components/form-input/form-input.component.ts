import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


type FormTextInputType = 'text' | 'password' | 'email' | 'number' | 'date';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})

export class FormInputComponent {
  @Input() type: FormTextInputType = 'text';
  @Input() placeholder?: string;
  @Input() control?: FormControl;
  input = "shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline";
  eye: string = "absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none hover:text-blue-600 dark:text-neutral-600 dark:hover:text-blue-500";
  icon: string = 'visibility_off';
  visibility: boolean = false;

  toggleVisibility(): void {
    this.icon = this.visibility ? `visibility_off` : `visibility`;
    this.visibility = !this.visibility;
    this.type = this.visibility ? 'text' : 'password';
  }
}
